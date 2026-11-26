import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getClipperTier } from '@/lib/rewards';

export async function GET() {
  try {
    // Fetch all clippers with their approved/verified submissions
    const clippers = await prisma.user.findMany({
      where: { role: 'CLIPPER' },
      select: {
        id: true,
        name: true,
        avatar: true,
        clipperProfile: {
          select: {
            instagramHandle: true,
            youtubeHandle: true,
            tiktokHandle: true,
            level: true,
            rating: true,
          },
        },
        submissions: {
          where: {
            status: { in: ['APPROVED', 'VIEWS_VERIFIED', 'PAID'] },
          },
          select: {
            verifiedViews: true,
            rewardEarned: true,
          },
        },
        wallet: {
          select: {
            lifetimeEarned: true,
            balance: true,
          },
        },
      },
    });

    // Aggregate stats per clipper
    const ranked = clippers
      .map((c) => {
        const totalViews = c.submissions.reduce((sum, s) => sum + (s.verifiedViews || 0), 0);
        const totalEarned = c.submissions.reduce((sum, s) => sum + (s.rewardEarned || 0), 0);
        const handle =
          c.clipperProfile?.instagramHandle ||
          c.clipperProfile?.youtubeHandle ||
          c.clipperProfile?.tiktokHandle ||
          `@${c.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;

        return {
          id: c.id,
          name: c.name,
          handle,
          tier: getClipperTier(totalViews).label,
          views: totalViews,
          earned: totalEarned,
          rating: c.clipperProfile?.rating || 4.9,
          clips: c.submissions.length,
          avatar: c.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        };
      })
      .filter((c) => c.views > 0 || c.clips > 0)
      .sort((a, b) => b.views - a.views)
      .map((c, idx) => ({
        ...c,
        rank: idx + 1,
      }));

    return NextResponse.json({ clippers: ranked });
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return NextResponse.json({ clippers: [] });
  }
}
