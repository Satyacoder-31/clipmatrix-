import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const where = user.role === 'ADMIN' ? {} : { clipperId: user.id };

    const withdrawals = await prisma.withdrawal.findMany({
      where,
      orderBy: { requestedAt: 'desc' },
      include: {
        clipper: {
          select: {
            id: true,
            name: true,
            email: true,
            clipperProfile: true,
          },
        },
      },
    });

    return NextResponse.json({ withdrawals });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch withdrawals' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'CLIPPER' && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized: Only clippers can request withdrawals' }, { status: 403 });
    }

    const { amount, method, accountDetails } = await request.json();
    const withdrawAmount = parseFloat(amount);

    if (isNaN(withdrawAmount) || withdrawAmount < 500) {
      return NextResponse.json({ error: 'Minimum withdrawal amount is ₹500' }, { status: 400 });
    }

    if (!accountDetails) {
      return NextResponse.json({ error: 'Please provide UPI ID or bank account details' }, { status: 400 });
    }

    const wallet = await prisma.wallet.findUnique({
      where: { userId: user.id },
    });

    if (!wallet || wallet.balance < withdrawAmount) {
      return NextResponse.json({ error: `Insufficient balance (Available: ₹${wallet?.balance || 0})` }, { status: 400 });
    }

    // Deduct balance and create withdrawal request
    const withdrawal = await prisma.$transaction(async (tx) => {
      await tx.wallet.update({
        where: { userId: user.id },
        data: {
          balance: { decrement: withdrawAmount },
        },
      });

      const w = await tx.withdrawal.create({
        data: {
          clipperId: user.id,
          amount: withdrawAmount,
          method: method || 'UPI',
          accountDetails,
          status: 'PENDING',
        },
      });

      await tx.transaction.create({
        data: {
          walletId: wallet.id,
          userId: user.id,
          amount: -withdrawAmount,
          type: 'WITHDRAWAL',
          status: 'PENDING',
          description: `Withdrawal request (${method || 'UPI'}) to ${accountDetails}`,
          referenceId: w.id,
        },
      });

      return w;
    });

    return NextResponse.json({ success: true, withdrawal });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit withdrawal request' }, { status: 500 });
  }
}
