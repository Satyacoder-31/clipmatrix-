import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    const id = params.id;

    const campaign = await prisma.campaign.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }],
      },
      include: {
        brand: {
          select: {
            id: true,
            name: true,
            avatar: true,
            brandProfile: true,
          },
        },
        participations: user ? { where: { clipperId: user.id } } : false,
        submissions: {
          orderBy: { submittedAt: 'desc' },
          take: 10,
          include: {
            clipper: {
              select: {
                id: true,
                name: true,
                avatar: true,
                clipperProfile: true,
              },
            },
          },
        },
        _count: {
          select: {
            submissions: true,
            participations: true,
          },
        },
      },
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    const isJoined = user && campaign.participations && campaign.participations.length > 0;

    return NextResponse.json({
      campaign: {
        ...campaign,
        isJoined: Boolean(isJoined),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load campaign' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'BRAND' && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { status, isFeatured, cpmRate, rewardPerClip } = await request.json();

    const campaign = await prisma.campaign.findUnique({
      where: { id: params.id },
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    // Brands can only edit their own campaigns unless Admin
    if (user.role === 'BRAND' && campaign.brandId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const updated = await prisma.campaign.update({
      where: { id: params.id },
      data: {
        ...(status ? { status } : {}),
        ...(typeof isFeatured === 'boolean' && user.role === 'ADMIN' ? { isFeatured } : {}),
        ...(cpmRate ? { cpmRate: parseFloat(cpmRate) } : {}),
        ...(rewardPerClip ? { rewardPerClip: parseFloat(rewardPerClip) } : {}),
      },
    });

    return NextResponse.json({ success: true, campaign: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 });
  }
}
