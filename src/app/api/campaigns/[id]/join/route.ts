import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Please login to join this campaign' }, { status: 401 });
    }

    if (user.role !== 'CLIPPER' && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Only Clippers can join campaigns' }, { status: 403 });
    }

    const campaign = await prisma.campaign.findFirst({
      where: { OR: [{ id: params.id }, { slug: params.id }] },
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    if (campaign.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'This campaign is currently not accepting new clippers' }, { status: 400 });
    }

    // Check existing participation
    const existing = await prisma.campaignParticipation.findUnique({
      where: {
        campaignId_clipperId: {
          campaignId: campaign.id,
          clipperId: user.id,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ success: true, message: 'You have already joined this campaign', participation: existing });
    }

    const participation = await prisma.campaignParticipation.create({
      data: {
        campaignId: campaign.id,
        clipperId: user.id,
        status: 'ACTIVE',
      },
    });

    // Send notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: `Joined: ${campaign.title}`,
        message: 'You have successfully joined the campaign. Review the source footage & guidelines to start creating clips!',
        type: 'CAMPAIGN',
        link: `/campaigns/${campaign.slug}`,
      },
    });

    return NextResponse.json({ success: true, participation });
  } catch (error) {
    console.error('Error joining campaign:', error);
    return NextResponse.json({ error: 'Failed to join campaign' }, { status: 500 });
  }
}
