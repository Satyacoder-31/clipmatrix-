import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { calculateSubmissionReward } from '@/lib/rewards';

/**
 * Super Admin & Engine View Verification Endpoint
 * Verifies view counts, generates audit snapshots, calculates performance rewards,
 * updates clipper wallet balance and brand escrow ledger.
 */
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required for verification' }, { status: 403 });
    }

    const { submissionId, verifiedViews, likes, comments, shares, verificationMethod, notes } = await request.json();

    if (!submissionId || verifiedViews === undefined) {
      return NextResponse.json({ error: 'Submission ID and verified views count are required' }, { status: 400 });
    }

    const viewsNum = parseInt(verifiedViews, 10);
    if (isNaN(viewsNum) || viewsNum < 0) {
      return NextResponse.json({ error: 'Invalid verified views number' }, { status: 400 });
    }

    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        campaign: {
          include: { brand: true },
        },
        clipper: {
          include: { wallet: true },
        },
      },
    });

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    const campaign = submission.campaign;

    // Calculate reward using flexible reward engine
    const rewardCalculation = calculateSubmissionReward(
      {
        rewardModel: campaign.rewardModel,
        rewardPerClip: campaign.rewardPerClip,
        cpmRate: campaign.cpmRate,
        milestoneRulesJson: campaign.milestoneRulesJson,
        maxRewardPerClip: campaign.maxRewardPerClip,
        remainingBudget: campaign.remainingBudget + submission.rewardEarned, // Allow re-calculating delta
      },
      viewsNum
    );

    const newReward = rewardCalculation.rewardAmount;
    const rewardDelta = newReward - submission.rewardEarned;

    // Execute atomic update
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create View Snapshot
      const snapshot = await tx.viewSnapshot.create({
        data: {
          submissionId: submission.id,
          viewCount: viewsNum,
          likes: parseInt(likes) || Math.floor(viewsNum * 0.08),
          comments: parseInt(comments) || Math.floor(viewsNum * 0.004),
          shares: parseInt(shares) || Math.floor(viewsNum * 0.015),
          verifiedBy: verificationMethod || 'MANUAL_AUDIT',
          notes: notes || rewardCalculation.calculationDetails,
        },
      });

      // 2. Update Submission
      const updatedSub = await tx.submission.update({
        where: { id: submission.id },
        data: {
          verifiedViews: viewsNum,
          rewardEarned: newReward,
          status: 'VIEWS_VERIFIED',
          verifiedAt: new Date(),
          isPaid: true,
          reviewNotes: notes ? `${submission.reviewNotes || ''}\n${notes}` : submission.reviewNotes,
        },
      });

      // 3. Update Campaign verified views and remaining budget
      const viewDelta = viewsNum - submission.verifiedViews;
      await tx.campaign.update({
        where: { id: campaign.id },
        data: {
          verifiedViews: { increment: Math.max(0, viewDelta) },
          remainingBudget: { decrement: Math.max(0, rewardDelta) },
        },
      });

      // 4. Credit Clipper Wallet
      if (rewardDelta > 0) {
        await tx.wallet.upsert({
          where: { userId: submission.clipperId },
          create: {
            userId: submission.clipperId,
            balance: rewardDelta,
            lifetimeEarned: rewardDelta,
          },
          update: {
            balance: { increment: rewardDelta },
            lifetimeEarned: { increment: rewardDelta },
          },
        });

        // Clipper transaction record
        const clipperWallet = await tx.wallet.findUnique({ where: { userId: submission.clipperId } });
        if (clipperWallet) {
          await tx.transaction.create({
            data: {
              walletId: clipperWallet.id,
              userId: submission.clipperId,
              amount: rewardDelta,
              type: 'REWARD_CREDIT',
              status: 'COMPLETED',
              description: `Verified Reward for clip ${submission.submissionNumber}: ${rewardCalculation.calculationDetails}`,
              referenceId: submission.id,
            },
          });
        }

        // Deduct from Brand Escrow
        await tx.wallet.update({
          where: { userId: campaign.brandId },
          data: {
            escrowBalance: { decrement: Math.max(0, rewardDelta) },
          },
        });

        // Notify Clipper
        await tx.notification.create({
          data: {
            userId: submission.clipperId,
            title: `💰 ₹${rewardDelta.toLocaleString('en-IN')} Credited!`,
            message: `Verified ${viewsNum.toLocaleString()} views on "${campaign.title}". Reward has been added to your withdrawable balance.`,
            type: 'REWARD',
            link: '/dashboard/clipper/earnings',
          },
        });
      }

      // 5. Admin Audit Log
      await tx.auditLog.create({
        data: {
          adminId: user.id,
          action: 'VERIFY_VIEWS_AND_CREDIT',
          entity: 'Submission',
          entityId: submission.id,
          details: `Verified ${viewsNum} views for ${submission.submissionNumber}. Reward: ₹${newReward}. Method: ${verificationMethod || 'MANUAL_AUDIT'}.`,
        },
      });

      return { snapshot, updatedSub, rewardCalculation };
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: `Verified ${viewsNum.toLocaleString()} views. Clipper credited with ₹${newReward.toLocaleString('en-IN')}`,
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Failed to verify views' }, { status: 500 });
  }
}
