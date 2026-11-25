import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const submission = await prisma.submission.findUnique({
      where: { id: params.id },
      include: {
        campaign: true,
        clipper: {
          include: { clipperProfile: true, wallet: true },
        },
        viewSnapshots: {
          orderBy: { timestamp: 'desc' },
        },
      },
    });

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json({ submission });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch submission' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status, reviewNotes, rejectionReason, verifiedViews, rewardAmount } = await request.json();

    const submission = await prisma.submission.findUnique({
      where: { id: params.id },
      include: { campaign: true, clipper: { include: { wallet: true } } },
    });

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    // Permission check: Brand can only review submissions for their campaign; Admin can review anything
    if (user.role === 'BRAND' && submission.campaign.brandId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Calculate reward and verified views to sync when approved/verified
    let creditedReward = 0;
    let resolvedVerifiedViews = submission.verifiedViews || 0;
    if (status === 'APPROVED' || status === 'VIEWS_VERIFIED') {
      resolvedVerifiedViews =
        typeof verifiedViews === 'number'
          ? verifiedViews
          : submission.verifiedViews > 0
          ? submission.verifiedViews
          : submission.reportedViews || 0;

      if (typeof rewardAmount === 'number' && rewardAmount > 0) {
        creditedReward = Number(rewardAmount.toFixed(2));
      } else {
        const rate = submission.campaign.cpmRate > 0 ? submission.campaign.cpmRate : 0.5;
        creditedReward = Number(((resolvedVerifiedViews / 1000) * rate).toFixed(2));
      }
    }

    const viewDelta =
      status === 'APPROVED' || status === 'VIEWS_VERIFIED'
        ? Math.max(0, resolvedVerifiedViews - (submission.verifiedViews || 0))
        : 0;

    const updated = await prisma.$transaction(async (tx) => {
      // 1. Update submission
      const sub = await tx.submission.update({
        where: { id: params.id },
        data: {
          ...(status ? { status } : {}),
          ...(reviewNotes !== undefined ? { reviewNotes } : {}),
          ...(rejectionReason !== undefined ? { rejectionReason } : {}),
          ...(status === 'APPROVED' || status === 'VIEWS_VERIFIED'
            ? { verifiedViews: resolvedVerifiedViews, verifiedAt: new Date() }
            : typeof verifiedViews === 'number'
            ? { verifiedViews }
            : {}),
          ...(creditedReward > 0 ? { rewardEarned: creditedReward, isPaid: true } : {}),
          reviewedAt: new Date(),
        },
      });

      // Sync campaign verifiedViews whenever newly approved/verified views are added
      if (viewDelta > 0) {
        await tx.campaign.update({
          where: { id: submission.campaignId },
          data: { verifiedViews: { increment: viewDelta } },
        });
      }

      // 2. Credit to user's central wallet (all accounts merge to this one user)
      if (creditedReward > 0 && submission.rewardEarned === 0) {
        await tx.wallet.upsert({
          where: { userId: submission.clipperId },
          create: {
            userId: submission.clipperId,
            balance: creditedReward,
            lifetimeEarned: creditedReward,
          },
          update: {
            balance: { increment: creditedReward },
            lifetimeEarned: { increment: creditedReward },
          },
        });

        const wallet = await tx.wallet.findUnique({ where: { userId: submission.clipperId } });
        if (wallet) {
          await tx.transaction.create({
            data: {
              walletId: wallet.id,
              userId: submission.clipperId,
              amount: creditedReward,
              type: 'REWARD_CREDIT',
              status: 'COMPLETED',
              description: `Approved reward for clip ${submission.submissionNumber} (${submission.campaign.title})`,
              referenceId: submission.id,
            },
          });
        }

        // Decrement campaign remaining budget and complete campaign if budget exhausted
        const willExhaustBudget = (submission.campaign.remainingBudget - creditedReward) <= 0;
        await tx.campaign.update({
          where: { id: submission.campaignId },
          data: {
            remainingBudget: { decrement: creditedReward },
            ...(willExhaustBudget ? { status: 'COMPLETED' } : {}),
          },
        });
      }

      return sub;
    });

    // Notify clipper about status update
    let message = `Your submission (${submission.submissionNumber}) status changed to ${status}.`;
    if (status === 'REJECTED' && rejectionReason) {
      message = `Your submission was rejected: "${rejectionReason}". Please review guidelines and submit an update.`;
    } else if (status === 'APPROVED') {
      message = creditedReward > 0
        ? `Congratulations! Your clip was approved. $${creditedReward.toFixed(2)} has been credited to your earnings!`
        : `Congratulations! Your clip was approved. View tracking is active.`;
    }

    await prisma.notification.create({
      data: {
        userId: submission.clipperId,
        title: `Submission Update: ${status}`,
        message,
        type: 'SUBMISSION',
        link: '/dashboard/clipper/submissions',
      },
    });

    return NextResponse.json({ success: true, submission: updated, creditedReward });
  } catch (error) {
    console.error('Failed to update submission:', error);
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 });
  }
}
