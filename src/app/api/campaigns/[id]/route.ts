import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { normalizeAccessCode } from '@/lib/campaign-code';

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
    const sanitizedCampaign =
      user?.role === 'ADMIN' ? campaign : (({ accessCode: _omit, ...rest }) => rest)(campaign);

    return NextResponse.json({
      campaign: {
        ...sanitizedCampaign,
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
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Only Admins can update campaign controls.' }, { status: 403 });
    }

    const { status, isFeatured, cpmRate, rewardPerClip, totalBudget, accessCode } = await request.json();

    const campaign = await prisma.campaign.findUnique({
      where: { id: params.id },
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    let updatedCode: string | undefined;
    if (typeof accessCode === 'string' && accessCode.trim()) {
      const normalized = normalizeAccessCode(accessCode);
      const conflict = await prisma.campaign.findFirst({
        where: { accessCode: normalized, NOT: { id: params.id } },
      });
      if (conflict) {
        return NextResponse.json({ error: 'Access code already in use by another campaign.' }, { status: 400 });
      }
      updatedCode = normalized;
    }

    const updateData: any = {
      ...(status ? { status } : {}),
      ...(typeof isFeatured === 'boolean' ? { isFeatured } : {}),
      ...(cpmRate ? { cpmRate: parseFloat(cpmRate) } : {}),
      ...(rewardPerClip ? { rewardPerClip: parseFloat(rewardPerClip) } : {}),
      ...(updatedCode ? { accessCode: updatedCode } : {}),
    };

    if (totalBudget) {
      const parsedBudget = parseFloat(totalBudget);
      const effectiveCpm = cpmRate ? parseFloat(cpmRate) : campaign.cpmRate || 0.5;
      updateData.totalBudget = parsedBudget;
      updateData.remainingBudget = Math.max(0, parsedBudget - (campaign.totalBudget - campaign.remainingBudget));
      if (effectiveCpm > 0) {
        updateData.targetViews = Math.floor((parsedBudget / effectiveCpm) * 1000);
      }
    }

    const updated = await prisma.campaign.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({ success: true, campaign: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 });
  }
}
