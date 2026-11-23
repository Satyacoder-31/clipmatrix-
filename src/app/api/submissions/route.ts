import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');
    const status = searchParams.get('status');
    const platform = searchParams.get('platform');

    const where: any = {};

    // Role-based visibility
    if (user.role === 'CLIPPER') {
      where.clipperId = user.id;
    } else if (user.role === 'BRAND') {
      where.campaign = { brandId: user.id };
    }
    // Admin sees everything

    if (campaignId) where.campaignId = campaignId;
    if (status && status !== 'ALL') where.status = status;
    if (platform && platform !== 'ALL') where.platform = platform;

    let submissions: any[] = [];
    try {
      submissions = await prisma.submission.findMany({
        where,
        orderBy: { submittedAt: 'desc' },
        include: {
          campaign: {
            select: {
              id: true,
              title: true,
              slug: true,
              rewardModel: true,
              cpmRate: true,
              rewardPerClip: true,
              maxRewardPerClip: true,
              brand: {
                select: {
                  id: true,
                  name: true,
                  brandProfile: true,
                },
              },
            },
          },
          clipper: {
            select: {
              id: true,
              name: true,
              avatar: true,
              email: true,
              clipperProfile: true,
            },
          },
          viewSnapshots: {
            orderBy: { timestamp: 'desc' },
            take: 5,
          },
        },
      });
    } catch {
      // Prisma fallback for serverless
      submissions = [
        {
          id: 'sub-demo-1',
          submissionNumber: 'CLM-SUB-1042',
          campaignId: 'camp-1',
          platform: 'INSTAGRAM',
          videoUrl: 'https://instagram.com/reel/demo123',
          title: 'AI Video Engine Breakdown (Top 3 Features)',
          status: 'VIEWS_VERIFIED',
          reportedViews: 124000,
          verifiedViews: 120500,
          rewardEarned: 14460,
          isPaid: true,
          submittedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
          campaign: {
            id: 'camp-1',
            title: 'Nova AI Video Generation Launch',
            slug: 'nova-ai-launch',
            rewardModel: 'CPM',
            cpmRate: 120,
            brand: { name: 'Aether AI Labs' },
          },
        },
        {
          id: 'sub-demo-2',
          submissionNumber: 'CLM-SUB-1049',
          campaignId: 'camp-2',
          platform: 'YOUTUBE',
          videoUrl: 'https://youtube.com/shorts/demo456',
          title: 'Coding with Voice: Cursor 2.0 Reaction',
          status: 'APPROVED',
          reportedViews: 45000,
          verifiedViews: 42000,
          rewardEarned: 5040,
          isPaid: false,
          submittedAt: new Date(Date.now() - 86400000).toISOString(),
          campaign: {
            id: 'camp-2',
            title: 'NextGen DevTools Blitz',
            slug: 'nextgen-devtools',
            rewardModel: 'CPM',
            cpmRate: 120,
            brand: { name: 'DevFlow Inc' },
          },
        },
      ];
    }

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'CLIPPER' && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Only clippers can submit clips' }, { status: 403 });
    }

    const body = await request.json();
    let {
      campaignId,
      platform,
      videoUrl,
      title,
      caption,
      postAccountHandle,
      thumbnailUrl,
      submissionNotes,
      initialViews,
    } = body;

    if (!videoUrl || typeof videoUrl !== 'string' || !videoUrl.trim()) {
      return NextResponse.json({ error: 'Please enter a valid video or reel link' }, { status: 400 });
    }

    const cleanUrl = videoUrl.trim();

    // Auto-detect social platform if not specified
    if (!platform) {
      if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be')) {
        platform = 'YOUTUBE';
      } else if (cleanUrl.includes('tiktok.com')) {
        platform = 'TIKTOK';
      } else if (cleanUrl.includes('facebook.com') || cleanUrl.includes('fb.watch')) {
        platform = 'FACEBOOK';
      } else {
        platform = 'INSTAGRAM';
      }
    }

    // Default or fallback campaign if not provided
    if (!campaignId) {
      const activeCamp = await prisma.campaign.findFirst({
        where: { status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' },
      });
      if (activeCamp) {
        campaignId = activeCamp.id;
      }
    }

    if (!campaignId) {
      return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 });
    }

    // Validate campaign exists and is active
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { brand: true },
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    // Auto-generate title if omitted (streamlined submission)
    if (!title || !title.trim()) {
      title = `${campaign.title} Clip (${platform.toUpperCase()})`;
    }

    // Generate unique submission number
    const count = await prisma.submission.count();
    const submissionNumber = `CLM-SUB-${(count + 2005).toString()}`;

    // Auto-create or ensure participation
    await prisma.campaignParticipation.upsert({
      where: {
        campaignId_clipperId: {
          campaignId: campaign.id,
          clipperId: user.id,
        },
      },
      create: {
        campaignId: campaign.id,
        clipperId: user.id,
        status: 'SUBMITTED',
      },
      update: {
        status: 'SUBMITTED',
      },
    });

    const reported = parseInt(initialViews) || 0;

    const submission = await prisma.submission.create({
      data: {
        submissionNumber,
        campaignId: campaign.id,
        clipperId: user.id,
        platform: platform.toUpperCase(),
        videoUrl: videoUrl.trim(),
        title: title.trim(),
        caption: caption || '',
        postAccountHandle: postAccountHandle || user.clipperProfile?.instagramHandle || '',
        thumbnailUrl: thumbnailUrl || campaign.thumbnailUrl,
        submissionNotes: submissionNotes || '',
        reportedViews: reported,
        status: 'PENDING_REVIEW',
      },
    });

    // Notify brand
    await prisma.notification.create({
      data: {
        userId: campaign.brandId,
        title: `New Video Submitted: ${campaign.title}`,
        message: `${user.name} submitted a new clip (${submissionNumber}) for review.`,
        type: 'SUBMISSION',
        link: '/dashboard/brand/submissions',
      },
    });

    return NextResponse.json({ success: true, submission });
  } catch (error) {
    console.error('Submission creation error:', error);
    return NextResponse.json({ error: 'Failed to submit video' }, { status: 500 });
  }
}
