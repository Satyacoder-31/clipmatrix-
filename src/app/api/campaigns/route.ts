import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { generateCampaignAccessCode, normalizeAccessCode } from '@/lib/campaign-code';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    const industry = searchParams.get('industry');
    const rewardModel = searchParams.get('rewardModel');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort'); // 'latest' | 'reward' | 'budget'
    const status = searchParams.get('status');
    const portal = searchParams.get('portal');

    const where: any = {};

    const user = await getCurrentUser();
    const isBrandView = user?.role === 'BRAND' || (user?.role === 'ADMIN' && portal === 'brand');
    const brandId = searchParams.get('brandId');

    // Note: In Brand directory view, list ALL registered campaigns so users can see the registry
    // and unlock campaigns belonging to them via access code.
    if (brandId && !isBrandView) {
      where.brandId = brandId;
    }

    if (status && status !== 'ALL') {
      where.status = status;
    } else if (!status) {
      if (isBrandView) {
        where.status = { in: ['ACTIVE', 'PAUSED', 'COMPLETED'] };
      } else {
        // By default public/clipper marketplace shows active campaigns
        where.status = 'ACTIVE';
      }
    }

    if (platform && platform !== 'ALL') {
      where.allowedPlatforms = { contains: platform };
    }

    if (industry && industry !== 'ALL') {
      where.industry = industry;
    }

    if (rewardModel && rewardModel !== 'ALL') {
      where.rewardModel = rewardModel;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { requiredHashtags: { contains: search } },
      ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'budget') {
      orderBy = { totalBudget: 'desc' };
    } else if (sort === 'reward') {
      orderBy = { cpmRate: 'desc' };
    } else if (sort === 'views') {
      orderBy = { verifiedViews: 'desc' };
    }

    let campaigns: any[] = [];
    try {
      campaigns = await prisma.campaign.findMany({
        where,
        orderBy,
        include: {
          brand: {
            select: {
              id: true,
              name: true,
              avatar: true,
              brandProfile: true,
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
    } catch (e) {
      console.error('Failed to query campaigns from prisma:', e);
      campaigns = [];
    }

    // For BRAND directory view: return all registered campaigns, gating analytics behind unlock access code
    if (isBrandView && user) {
      const accesses = await prisma.brandCampaignAccess.findMany({
        where: { brandId: user.id },
        select: { campaignId: true },
      });
      const unlockedSet = new Set(accesses.map((a) => a.campaignId));

      const sanitizedCampaigns = campaigns.map((c) => {
        const isUnlocked = unlockedSet.has(c.id);
        const brandLabel = c.brand?.brandProfile?.companyName || c.brand?.name || 'Verified Partner';

        if (!isUnlocked) {
          // Locked campaign: show listing info + lock state, hide analytics & metrics
          return {
            id: c.id,
            title: c.title,
            slug: c.slug,
            industry: c.industry,
            thumbnailUrl: c.thumbnailUrl,
            allowedPlatforms: c.allowedPlatforms,
            status: c.status,
            createdAt: c.createdAt,
            brandLabel,
            isUnlocked: false,
            targetViews: null,
            verifiedViews: null,
            completionPercent: null,
            _count: null,
          };
        }

        const targetViews = c.targetViews || 0;
        const verifiedViews = c.verifiedViews || 0;
        const completionPercent =
          targetViews > 0 ? Math.min(100, Math.round((verifiedViews / targetViews) * 100)) : 0;

        return {
          id: c.id,
          title: c.title,
          slug: c.slug,
          industry: c.industry,
          description: c.description,
          objective: c.objective,
          thumbnailUrl: c.thumbnailUrl,
          allowedPlatforms: c.allowedPlatforms,
          targetViews,
          verifiedViews,
          completionPercent,
          status: c.status,
          createdAt: c.createdAt,
          sourceVideoUrl: c.sourceVideoUrl,
          driveAssetsUrl: c.driveAssetsUrl,
          guidelines: c.guidelines,
          brandLabel,
          isUnlocked: true,
          _count: c._count,
        };
      });
      return NextResponse.json({ campaigns: sanitizedCampaigns });
    }

    // Strip accessCode for non-admin users (clippers / public)
    if (user?.role !== 'ADMIN') {
      const publicCampaigns = campaigns.map(({ accessCode: _omit, ...rest }) => rest);
      return NextResponse.json({ campaigns: publicCampaigns });
    }

    return NextResponse.json({ campaigns });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    // Only administrators can manage and post campaigns
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized: Campaigns are managed and posted by Clip Matrix Administrators only.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      title,
      brandId: requestedBrandId,
      industry,
      description,
      objective,
      sourceVideoUrl,
      driveAssetsUrl,
      rawVideoDownloadUrl,
      thumbnailUrl,
      guidelines,
      hookSuggestions,
      prohibitedContent,
      requiredHashtags,
      allowedPlatforms,
      minDurationSec,
      maxDurationSec,
      rewardModel,
      rewardPerClip,
      cpmRate,
      maxRewardPerClip,
      totalBudget,
      targetViews,
      deadline,
      accessCode: requestedAccessCode,
    } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Campaign title and description are required' }, { status: 400 });
    }

    // Determine or generate unique Brand Access Code
    let normalizedCode = requestedAccessCode ? normalizeAccessCode(String(requestedAccessCode)) : '';
    if (normalizedCode) {
      const existingCode = await prisma.campaign.findUnique({ where: { accessCode: normalizedCode } });
      if (existingCode) {
        return NextResponse.json(
          { error: 'That campaign access code is already assigned to another campaign.' },
          { status: 400 }
        );
      }
    } else {
      // Generate guaranteed unique access code
      for (let attempt = 0; attempt < 5; attempt++) {
        const candidate = generateCampaignAccessCode();
        const collision = await prisma.campaign.findUnique({ where: { accessCode: candidate } });
        if (!collision) {
          normalizedCode = candidate;
          break;
        }
      }
      if (!normalizedCode) {
        normalizedCode = `CLM-${Date.now().toString(36).toUpperCase()}`;
      }
    }

    // Determine target brand sponsor
    let assignedBrandId = requestedBrandId;
    if (!assignedBrandId) {
      const defaultBrand = await prisma.user.findFirst({ where: { role: 'BRAND' } });
      assignedBrandId = defaultBrand ? defaultBrand.id : user.id;
    }

    const budgetNum = parseFloat(totalBudget) || 1000;
    const cpmNum = parseFloat(cpmRate) || 0.50;
    const targetViewsNum = parseInt(targetViews) || Math.floor((budgetNum / (cpmNum || 0.5)) * 1000);

    const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}-${Date.now().toString().slice(-4)}`;

    const platformsString = Array.isArray(allowedPlatforms)
      ? allowedPlatforms.join(',')
      : (allowedPlatforms || 'INSTAGRAM,YOUTUBE,TIKTOK');

    const newCampaign = await prisma.campaign.create({
      data: {
        title,
        slug,
        brandId: assignedBrandId,
        accessCode: normalizedCode,
        industry: industry || 'Tech & AI',
        description: description || title,
        objective: objective || 'Drive brand awareness & viral reach',
        sourceVideoUrl: sourceVideoUrl || '',
        driveAssetsUrl: driveAssetsUrl || '',
        rawVideoDownloadUrl: rawVideoDownloadUrl || '',
        thumbnailUrl: thumbnailUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        guidelines: guidelines || 'Create high-engagement vertical clips adhering to platform guidelines.',
        hookSuggestions: hookSuggestions || '',
        prohibitedContent: prohibitedContent || '',
        requiredHashtags: requiredHashtags || '#viral #ad',
        allowedPlatforms: platformsString,
        minDurationSec: parseInt(minDurationSec) || 15,
        maxDurationSec: parseInt(maxDurationSec) || 60,
        aspectRatio: '9:16',
        rewardModel: rewardModel || 'CPM',
        rewardPerClip: parseFloat(rewardPerClip) || 0,
        cpmRate: cpmNum,
        maxRewardPerClip: parseFloat(maxRewardPerClip) || 1000,
        totalBudget: budgetNum,
        remainingBudget: budgetNum,
        targetViews: targetViewsNum,
        status: 'ACTIVE',
        isFeatured: true,
        deadline: deadline ? new Date(deadline) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json({ success: true, campaign: newCampaign });
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}
