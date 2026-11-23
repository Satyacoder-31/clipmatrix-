import { NextResponse } from 'next/server';
import { scrapeVideoMetrics } from '@/lib/scrapers';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

/**
 * Real-Time Scraper & Audience Demographics Endpoint
 * Audits YouTube Shorts & Instagram Reels live URLs, extracting:
 * - Real-time Views, Likes, Comments, Shares
 * - Audience Demographics (Top Countries, Tier-1 %, Gender, Age brackets)
 * - Bot/Fraud anomaly scoring
 */
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: Please log in' }, { status: 401 });
    }

    const { url, submissionId } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Valid video URL is required' }, { status: 400 });
    }

    // Run scraper and demographic engine
    const stats = await scrapeVideoMetrics(url);

    // If submission ID is provided, persist demographic snapshot notes
    if (submissionId) {
      try {
        await prisma.submission.update({
          where: { id: submissionId },
          data: {
            ...(stats.viewCount > 0 ? { reportedViews: stats.viewCount } : {}),
            likesCount: stats.likeCount,
            commentsCount: stats.commentCount,
            sharesCount: stats.shareCount,
            reviewNotes: `Scraped by ${stats.verificationMethod} at ${new Date().toISOString()}.\nTier-1 Audience: ${stats.demographics.tier1Percent}% (Multiplier: ${stats.demographics.cpmMultiplier}x).\nFraud Score: ${stats.demographics.fraudScore}/100.`,
          },
        });
      } catch {
        // Fallback if in-memory demo mode or submission not found
      }
    }

    return NextResponse.json({
      success: true,
      stats,
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
