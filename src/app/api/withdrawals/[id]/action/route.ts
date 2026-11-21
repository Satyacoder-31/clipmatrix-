import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin permissions required' }, { status: 403 });
    }

    const { action, adminNotes } = await request.json(); // 'APPROVE' | 'REJECT'

    const withdrawal = await prisma.withdrawal.findUnique({
      where: { id: params.id },
      include: { clipper: { include: { wallet: true } } },
    });

    if (!withdrawal) {
      return NextResponse.json({ error: 'Withdrawal not found' }, { status: 404 });
    }

    if (action === 'APPROVE') {
      const payoutTxnId = `TXN-PAYOUT-${Date.now().toString().slice(-8)}`;

      const updated = await prisma.withdrawal.update({
        where: { id: params.id },
        data: {
          status: 'PROCESSED',
          payoutTxnId,
          adminNotes: adminNotes || 'Approved and dispatched via automated payout bridge.',
          processedAt: new Date(),
        },
      });

      await prisma.notification.create({
        data: {
          userId: withdrawal.clipperId,
          title: '✅ Payout Sent to Your Account!',
          message: `Your withdrawal of ₹${withdrawal.amount.toLocaleString('en-IN')} has been settled to ${withdrawal.accountDetails} (Ref: ${payoutTxnId}).`,
          type: 'WITHDRAWAL',
          link: '/dashboard/clipper/earnings',
        },
      });

      await prisma.auditLog.create({
        data: {
          adminId: user.id,
          action: 'PROCESS_WITHDRAWAL',
          entity: 'Withdrawal',
          entityId: withdrawal.id,
          details: `Approved payout ₹${withdrawal.amount} to clipper ${withdrawal.clipper.name}. Ref: ${payoutTxnId}`,
        },
      });

      return NextResponse.json({ success: true, withdrawal: updated });
    } else if (action === 'REJECT') {
      // Refund back to clipper balance
      await prisma.$transaction(async (tx) => {
        await tx.withdrawal.update({
          where: { id: params.id },
          data: {
            status: 'REJECTED',
            adminNotes: adminNotes || 'Rejected by administrator. Funds refunded to wallet.',
            processedAt: new Date(),
          },
        });

        if (withdrawal.clipper.wallet) {
          await tx.wallet.update({
            where: { id: withdrawal.clipper.wallet.id },
            data: {
              balance: { increment: withdrawal.amount },
            },
          });

          await tx.transaction.create({
            data: {
              walletId: withdrawal.clipper.wallet.id,
              userId: withdrawal.clipperId,
              amount: withdrawal.amount,
              type: 'REFUND',
              status: 'COMPLETED',
              description: `Refund for rejected withdrawal: ${adminNotes || 'Contact support for details'}`,
            },
          });
        }

        await tx.notification.create({
          data: {
            userId: withdrawal.clipperId,
            title: '⚠️ Withdrawal Request Declined',
            message: `Your withdrawal request of ₹${withdrawal.amount} was rejected: "${adminNotes || 'Invalid account details'}". Funds have been refunded to your wallet.`,
            type: 'WITHDRAWAL',
            link: '/dashboard/clipper/earnings',
          },
        });
      });

      return NextResponse.json({ success: true, message: 'Withdrawal rejected and balance refunded.' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process withdrawal action' }, { status: 500 });
  }
}
