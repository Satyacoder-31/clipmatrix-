import { NextResponse } from 'next/server';
import { scrapeVideoMetrics } from '@/lib/scrapers';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { calculateSubmissionReward } from '@/lib/rewards';

/**
 * Admin-Only Live Scraper & Analytics Refresh Endpoint
 * Paid scrapers (e.g. Apify Instagram Scraper) are strictly gated to explicit Admin refresh.
 * Until refreshed by Admin, Brands and Clippers continue to see the previously stored views.
 */
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized: Only Admins can trigger live analytics refresh.' },
        { status: 403 }
      );
    }

    const { url, submissionId } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Valid video URL is required' }, { status: 400 });
    }

    // Run scraper and demographic engine
    const stats = await scrapeVideoMetrics(url);
    const freshViews =
      stats.viewCount && stats.viewCount > 0
        ? stats.viewCount
        : stats.likeCount > 0
        ? Math.round(stats.likeCount * 15.3)
        : 0;

    let updatedSubmission: any = null;

    if (submissionId) {
      const existing = await prisma.submission.findUnique({
        where: { id: submissionId },
        include: { campaign: true },
      });

      if (existing) {
        const isPublished =
          existing.status === 'APPROVED' ||
          existing.status === 'VIEWS_VERIFIED' ||
          existing.status === 'PAID' ||
          existing.verifiedViews > 0;

        // Only overwrite views when scraper yielded a positive count; preserve previously scraped views otherwise
        const nextReported = freshViews > 0 ? freshViews : existing.reportedViews;
        const nextVerified =
          isPublished && freshViews > 0 ? freshViews : existing.verifiedViews;

        const viewDelta =
          isPublished && freshViews > 0 ? freshViews - (existing.verifiedViews || 0) : 0;

        // If submission already settled views/reward, adjust reward delta under campaign fixed-budget cap
        let nextReward = existing.rewardEarned;
        let rewardDelta = 0;
        if ((existing.status === 'VIEWS_VERIFIED' || existing.status === 'PAID') && viewDelta > 0) {
          const calc = calculateSubmissionReward(
            {
              rewardModel: existing.campaign.rewardModel,
              rewardPerClip: existing.campaign.rewardPerClip,
              cpmRate: existing.campaign.cpmRate,
              milestoneRulesJson: existing.campaign.milestoneRulesJson,
              maxRewardPerClip: existing.campaign.maxRewardPerClip,
              remainingBudget: existing.campaign.remainingBudget + existing.rewardEarned,
            },
            nextVerified
          );
          nextReward = Math.max(existing.rewardEarned, calc.rewardAmount);
          rewardDelta = Math.max(0, nextReward - existing.rewardEarned);
        }

        const shouldUpdateTitle =
          Boolean(stats.title) &&
          (existing.title.includes('Clip (') || existing.title === existing.campaign.title);

        updatedSubmission = await prisma.$transaction(async (tx) => {
          const sub = await tx.submission.update({
            where: { id: submissionId },
            data: {
              reportedViews: nextReported,
              ...(isPublished && freshViews > 0
                ? { verifiedViews: nextVerified, verifiedAt: new Date() }
                : {}),
              ...(rewardDelta > 0 ? { rewardEarned: nextReward } : {}),
              likesCount: stats.likeCount > 0 ? stats.likeCount : existing.likesCount,
              commentsCount: stats.commentCount > 0 ? stats.commentCount : existing.commentsCount,
              sharesCount: stats.shareCount > 0 ? stats.shareCount : existing.sharesCount,
              ...(stats.authorHandle && (!existing.postAccountHandle || existing.postAccountHandle === '@creator')
                ? { postAccountHandle: stats.authorHandle }
                : {}),
              ...(stats.thumbnailUrl ? { thumbnailUrl: stats.thumbnailUrl } : {}),
              ...(shouldUpdateTitle ? { title: stats.title } : {}),
              reviewNotes: `Refreshed by Admin (${stats.verificationMethod}) at ${new Date().toISOString()}.\nLive Views: ${nextReported.toLocaleString()}.`,
            },
          });

          if (viewDelta !== 0 || rewardDelta > 0) {
            const nextCampaignViews = Math.max(0, (existing.campaign.verifiedViews || 0) + viewDelta);
            const nextRemainingBudget = Math.max(0, (existing.campaign.remainingBudget || 0) - rewardDelta);
            const exhausted = rewardDelta > 0 && nextRemainingBudget <= 0;

            await tx.campaign.update({
              where: { id: existing.campaignId },
              data: {
                verifiedViews: nextCampaignViews,
                ...(rewardDelta > 0 ? { remainingBudget: nextRemainingBudget } : {}),
                ...(exhausted ? { status: 'COMPLETED' } : {}),
              },
            });
          }

          if (rewardDelta > 0) {
            await tx.wallet.upsert({
              where: { userId: existing.clipperId },
              create: {
                userId: existing.clipperId,
                balance: rewardDelta,
                lifetimeEarned: rewardDelta,
              },
              update: {
                balance: { increment: rewardDelta },
                lifetimeEarned: { increment: rewardDelta },
              },
            });
          }

          await tx.viewSnapshot.create({
            data: {
              submissionId: existing.id,
              viewCount: nextReported,
              likes: stats.likeCount || 0,
              comments: stats.commentCount || 0,
              shares: stats.shareCount || 0,
              verifiedBy: stats.verificationMethod,
              notes: 'Admin-triggered live analytics refresh',
            },
          });

          return sub;
        });
      }
    }

    return NextResponse.json({
      success: true,
      stats: {
        ...stats,
        viewCount: freshViews > 0 ? freshViews : stats.viewCount,
      },
      submission: updatedSubmission,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || 'Failed to scrape video metrics and demographics',
      },
      { status: 500 }
    );
  }
}
