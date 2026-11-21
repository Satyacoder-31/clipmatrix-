import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const wallet = await prisma.wallet.findUnique({
      where: { userId: user.id },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    return NextResponse.json({ wallet });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch wallet' }, { status: 500 });
  }
}

// Deposit simulation (e.g. Brands adding funds via Razorpay mock)
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { amount, paymentMethod } = await request.json();
    const depositAmount = parseFloat(amount);

    if (isNaN(depositAmount) || depositAmount <= 0) {
      return NextResponse.json({ error: 'Invalid deposit amount' }, { status: 400 });
    }

    const updatedWallet = await prisma.$transaction(async (tx) => {
      const wallet = await tx.wallet.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          balance: depositAmount,
          lifetimeSpent: 0,
        },
        update: {
          balance: { increment: depositAmount },
        },
      });

      await tx.transaction.create({
        data: {
          walletId: wallet.id,
          userId: user.id,
          amount: depositAmount,
          type: 'DEPOSIT',
          status: 'COMPLETED',
          description: `Wallet top-up via ${paymentMethod || 'Razorpay UPI/NetBanking'}`,
        },
      });

      return wallet;
    });

    return NextResponse.json({ success: true, wallet: updatedWallet });
  } catch (error) {
    return NextResponse.json({ error: 'Deposit failed' }, { status: 500 });
  }
}
