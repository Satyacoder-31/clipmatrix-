import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const [
      totalUsers,
      totalBrands,
      totalClippers,
      totalCampaigns,
      activeCampaigns,
      totalSubmissions,
      approvedSubmissions,
      viewsVerifiedSubmissions,
      allSubmissions,
      pendingWithdrawals,
      completedWithdrawals,
      recentAuditLogs,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'BRAND' } }),
      prisma.user.count({ where: { role: 'CLIPPER' } }),
      prisma.campaign.count(),
      prisma.campaign.count({ where: { status: 'ACTIVE' } }),
      prisma.submission.count(),
      prisma.submission.count({ where: { status: 'APPROVED' } }),
      prisma.submission.count({ where: { status: 'VIEWS_VERIFIED' } }),
      prisma.submission.findMany({
        select: {
          verifiedViews: true,
          rewardEarned: true,
          platform: true,
          submittedAt: true,
        },
      }),
      prisma.withdrawal.findMany({
        where: { status: 'PENDING' },
      }),
      prisma.withdrawal.findMany({
        where: { status: 'PROCESSED' },
      }),
      prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 8,
        include: { admin: { select: { name: true, email: true } } },
      }),
    ]);

    // Aggregate totals
    const totalVerifiedViews = allSubmissions.reduce((acc, s) => acc + (s.verifiedViews || 0), 0);
    const totalClipperEarnings = allSubmissions.reduce((acc, s) => acc + (s.rewardEarned || 0), 0);
    const totalPendingPayoutAmount = pendingWithdrawals.reduce((acc, w) => acc + w.amount, 0);
    const totalCompletedPayoutAmount = completedWithdrawals.reduce((acc, w) => acc + w.amount, 0);

    // Platform distribution
    const platformBreakdown: Record<string, number> = {};
    for (const sub of allSubmissions) {
      platformBreakdown[sub.platform] = (platformBreakdown[sub.platform] || 0) + 1;
    }

    // Platform commission estimate (15%)
    const estimatedPlatformRevenue = Math.round(totalClipperEarnings * 0.176); // 15% margin on campaign volume

    return NextResponse.json({
      metrics: {
        totalUsers,
        totalBrands,
        totalClippers,
        totalCampaigns,
        activeCampaigns,
        totalSubmissions,
        approvedSubmissions,
        viewsVerifiedSubmissions,
        totalVerifiedViews,
        totalClipperEarnings,
        totalPendingPayoutAmount,
        totalCompletedPayoutAmount,
        estimatedPlatformRevenue,
        platformBreakdown,
      },
      recentAuditLogs,
    });
  } catch (error) {
    console.error('Admin metrics error:', error);
    return NextResponse.json({ error: 'Failed to calculate platform metrics' }, { status: 500 });
  }
}
