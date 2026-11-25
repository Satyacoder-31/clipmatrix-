import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { normalizeAccessCode } from '@/lib/campaign-code';

/**
 * Unlocks a registered campaign's view analytics for the authenticated Brand (or previewing Admin)
 * when the matching campaign accessCode is presented.
 */
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'BRAND' && user.role !== 'ADMIN')) {
      return NextResponse.json(
        { error: 'Unauthorized: Brand login required to unlock campaign analytics.' },
        { status: 403 }
      );
    }

    const { code, campaignId } = await request.json();
    const cleanCode = typeof code === 'string' ? normalizeAccessCode(code) : '';

    if (!cleanCode) {
      return NextResponse.json({ error: 'Please enter a valid campaign access code.' }, { status: 400 });
    }

    let campaign = null;
    if (campaignId) {
      const target = await prisma.campaign.findUnique({ where: { id: campaignId } });
      if (target && target.accessCode && normalizeAccessCode(target.accessCode) === cleanCode) {
        campaign = target;
      }
    } else {
      campaign = await prisma.campaign.findFirst({
        where: { accessCode: { equals: cleanCode, mode: 'insensitive' } },
      });
    }

    if (!campaign) {
      return NextResponse.json(
        { error: 'Invalid campaign access code. Please verify the code shared by your Clip Matrix Admin.' },
        { status: 403 }
      );
    }

    await prisma.brandCampaignAccess.upsert({
      where: {
        brandId_campaignId: {
          brandId: user.id,
          campaignId: campaign.id,
        },
      },
      update: { unlockedAt: new Date() },
      create: {
        brandId: user.id,
        campaignId: campaign.id,
      },
    });

    return NextResponse.json({
      success: true,
      campaignId: campaign.id,
      campaignTitle: campaign.title,
    });
  } catch (error) {
    console.error('Error unlocking campaign:', error);
    return NextResponse.json({ error: 'Failed to verify access code.' }, { status: 500 });
  }
}

/**
 * Re-locks a campaign from the current user's unlocked view list.
 */
export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'BRAND' && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');
    if (!campaignId) {
      return NextResponse.json({ error: 'campaignId is required' }, { status: 400 });
    }

    await prisma.brandCampaignAccess.deleteMany({
      where: { brandId: user.id, campaignId },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to lock campaign' }, { status: 500 });
  }
}
