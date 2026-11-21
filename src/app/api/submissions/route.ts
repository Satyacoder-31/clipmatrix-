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

    const submissions = await prisma.submission.findMany({
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
    const {
      campaignId,
      platform, // INSTAGRAM, YOUTUBE, TIKTOK
      videoUrl,
      title,
      caption,
      postAccountHandle,
      thumbnailUrl,
      submissionNotes,
      initialViews,
    } = body;

    if (!campaignId || !platform || !videoUrl || !title) {
      return NextResponse.json({ error: 'Missing required submission fields' }, { status: 400 });
    }

    // Validate campaign exists and is active
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { brand: true },
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
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
