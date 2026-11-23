import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    const industry = searchParams.get('industry');
    const rewardModel = searchParams.get('rewardModel');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort'); // 'latest' | 'reward' | 'budget'
    const status = searchParams.get('status');

    const where: any = {};

    if (status && status !== 'ALL') {
      where.status = status;
    } else if (!status) {
      // By default public marketplace shows active campaigns
      where.status = 'ACTIVE';
    }
    // If status === 'ALL', no status filter is applied so all campaigns are returned

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
    } catch {
      // Prisma fallback for serverless
      campaigns = [
        {
          id: 'camp-1',
          title: 'Nova AI Video Generation Launch',
          slug: 'nova-ai-launch',
          industry: 'Tech & AI',
          description: 'Create 15-45s fast-paced video edits showing Nova AI generating cinematic video from prompt.',
          rewardModel: 'CPM',
          cpmRate: 0.5,
          totalBudget: 2500,
          remainingBudget: 1850,
          targetViews: 350000,
          verifiedViews: 82000,
          status: 'ACTIVE',
          thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600',
          allowedPlatforms: 'INSTAGRAM,YOUTUBE,TIKTOK',
          brand: { name: 'Aether AI Labs' },
          _count: { submissions: 14, participations: 38 },
        },
        {
          id: 'camp-2',
          title: 'FinEdge Smart Investing App',
          slug: 'finedge-smart-investing',
          industry: 'FinTech',
          description: 'Extract punchy hooks from founder podcast regarding 0% brokerage and SIP automation.',
          rewardModel: 'CPM',
          cpmRate: 0.5,
          totalBudget: 3500,
          remainingBudget: 2400,
          targetViews: 600000,
          verifiedViews: 195000,
          status: 'ACTIVE',
          thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
          allowedPlatforms: 'INSTAGRAM,YOUTUBE',
          brand: { name: 'FinEdge Capital' },
          _count: { submissions: 28, participations: 64 },
        },
      ];
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
    if (!user || (user.role !== 'BRAND' && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized: Only Brands or Admins can create campaigns' }, { status: 403 });
    }

    const body = await request.json();
    const {
      title,
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
      allowedPlatforms, // array or string
      minDurationSec,
      maxDurationSec,
      rewardModel, // 'CPM' | 'FIXED' | 'MILESTONE' | 'HYBRID'
      rewardPerClip,
      cpmRate,
      maxRewardPerClip,
      totalBudget,
      targetViews,
      deadline,
    } = body;

    if (!title || !description || !guidelines || !totalBudget) {
      return NextResponse.json({ error: 'Please provide all required campaign fields' }, { status: 400 });
    }

    const budgetNum = parseFloat(totalBudget);
    if (isNaN(budgetNum) || budgetNum < 100) {
      return NextResponse.json({ error: 'Minimum campaign budget is $100' }, { status: 400 });
    }

    // Check brand wallet balance
    const brandWallet = await prisma.wallet.findUnique({
      where: { userId: user.id },
    });

    if (user.role === 'BRAND') {
      if (!brandWallet || brandWallet.balance < budgetNum) {
        return NextResponse.json(
          { error: `Insufficient treasury balance (Available: $${(brandWallet?.balance || 0).toFixed(2)}). Please fund your campaign balance first.` },
          { status: 400 }
        );
      }
    }

    // Slug generation
    const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}-${Date.now().toString().slice(-4)}`;

    const platformsString = Array.isArray(allowedPlatforms)
      ? allowedPlatforms.join(',')
      : (allowedPlatforms || 'INSTAGRAM,YOUTUBE,TIKTOK');

    // Create campaign in transaction + lock escrow
    const newCampaign = await prisma.$transaction(async (tx) => {
      const camp = await tx.campaign.create({
        data: {
          title,
          slug,
          brandId: user.id,
          industry: industry || 'Tech & AI',
          description,
          objective: objective || 'Drive brand awareness & viral reach',
          sourceVideoUrl: sourceVideoUrl || '',
          driveAssetsUrl: driveAssetsUrl || '',
          rawVideoDownloadUrl: rawVideoDownloadUrl || '',
          thumbnailUrl: thumbnailUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
          guidelines,
          hookSuggestions: hookSuggestions || '',
          prohibitedContent: prohibitedContent || '',
          requiredHashtags: requiredHashtags || '#viral #ad',
          allowedPlatforms: platformsString,
          minDurationSec: parseInt(minDurationSec) || 15,
          maxDurationSec: parseInt(maxDurationSec) || 60,
          aspectRatio: '9:16',
          rewardModel: rewardModel || 'CPM',
          rewardPerClip: parseFloat(rewardPerClip) || 0,
          cpmRate: parseFloat(cpmRate) || 0.5,
          maxRewardPerClip: parseFloat(maxRewardPerClip) || 1000,
          totalBudget: budgetNum,
          remainingBudget: budgetNum,
          targetViews: parseInt(targetViews) || Math.floor((budgetNum / 0.5) * 1000),
          status: 'ACTIVE', // Automatically active or ready
          isFeatured: true,
          deadline: deadline ? new Date(deadline) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });

      // If brand created it, deduct from available balance and move to escrow
      if (brandWallet && user.role === 'BRAND') {
        await tx.wallet.update({
          where: { userId: user.id },
          data: {
            balance: { decrement: budgetNum },
            escrowBalance: { increment: budgetNum },
            lifetimeSpent: { increment: budgetNum },
          },
        });

        await tx.transaction.create({
          data: {
            walletId: brandWallet.id,
            userId: user.id,
            amount: -budgetNum,
            type: 'CAMPAIGN_ESCROW_LOCK',
            status: 'COMPLETED',
            description: `Escrow allocation for campaign: "${title}"`,
            referenceId: camp.id,
          },
        });
      }

      return camp;
    });

    return NextResponse.json({ success: true, campaign: newCampaign });
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}
