const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Clip Matrix database seeding...');

  // Clean existing data
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.withdrawal.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.viewSnapshot.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.campaignParticipation.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.brandProfile.deleteMany();
  await prisma.clipperProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.platformSetting.deleteMany();

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create Super Admin
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@clipmatrix.com',
      name: 'Matrix Core Administrator',
      passwordHash,
      role: 'ADMIN',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      wallet: {
        create: {
          balance: 245000, // Platform treasury
          pendingBalance: 0,
          escrowBalance: 610000,
          lifetimeEarned: 1850000,
          lifetimeSpent: 0,
        },
      },
    },
  });

  // 2. Create Brand Users
  const brand1 = await prisma.user.create({
    data: {
      email: 'brand@clipmatrix.com',
      name: 'Aether AI Labs',
      passwordHash,
      role: 'BRAND',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      brandProfile: {
        create: {
          companyName: 'Aether AI Technologies',
          industry: 'Tech & AI',
          companySize: '51-200',
          website: 'https://aetherai.tech',
          logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
          isVerified: true,
          description: 'Next-generation multimodal reasoning and productivity suite for creators and developers.',
        },
      },
      wallet: {
        create: {
          balance: 45000,
          pendingBalance: 0,
          escrowBalance: 150000,
          lifetimeEarned: 0,
          lifetimeSpent: 350000,
        },
      },
    },
  });

  const brand2 = await prisma.user.create({
    data: {
      email: 'pulse@kicksdrop.com',
      name: 'KicksDrop Streetwear',
      passwordHash,
      role: 'BRAND',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=150&auto=format&fit=crop&q=80',
      brandProfile: {
        create: {
          companyName: 'KicksDrop Retail Private Limited',
          industry: 'D2C Fashion & Sneakers',
          companySize: '11-50',
          website: 'https://kicksdrop.in',
          logoUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=150&auto=format&fit=crop&q=80',
          isVerified: true,
          description: 'India’s premier verified limited sneaker drop and streetwear hub.',
        },
      },
      wallet: {
        create: {
          balance: 20000,
          pendingBalance: 0,
          escrowBalance: 80000,
          lifetimeEarned: 0,
          lifetimeSpent: 120000,
        },
      },
    },
  });

  const brand3 = await prisma.user.create({
    data: {
      email: 'founders@theunplugged.io',
      name: 'The Founders Unplugged',
      passwordHash,
      role: 'BRAND',
      status: 'ACTIVE',
      brandProfile: {
        create: {
          companyName: 'Unplugged Media Studios',
          industry: 'Podcasts & Media',
          website: 'https://unpluggedpod.com',
          isVerified: true,
          description: 'Top Indian startup podcast breaking down 100M revenue builders with zero filter.',
        },
      },
      wallet: {
        create: {
          balance: 15000,
          pendingBalance: 0,
          escrowBalance: 120000,
          lifetimeEarned: 0,
          lifetimeSpent: 220000,
        },
      },
    },
  });

  // 3. Create Clipper Users
  const clipper1 = await prisma.user.create({
    data: {
      email: 'clipper@clipmatrix.com',
      name: 'Aarav Sharma',
      passwordHash,
      role: 'CLIPPER',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      clipperProfile: {
        create: {
          instagramHandle: '@aarav.viralcuts',
          youtubeHandle: '@AaravClipsHQ',
          tiktokHandle: '@aaravedits',
          portfolioUrl: 'https://behance.net/aaravcuts',
          editingSoftware: 'Premiere Pro, CapCut, After Effects',
          experienceYears: '3+ years',
          preferredLangs: 'English, Hindi',
          upiId: 'aarav@okaxis',
          bankName: 'HDFC Bank',
          bankAccountNumber: '50100492819283',
          bankIfsc: 'HDFC0000128',
          city: 'Bengaluru',
          country: 'India',
          isVerified: true,
          level: 'ELITE',
          rating: 4.96,
        },
      },
      wallet: {
        create: {
          balance: 28450,
          pendingBalance: 8200,
          escrowBalance: 0,
          lifetimeEarned: 164200,
          lifetimeSpent: 0,
        },
      },
    },
  });

  const clipper2 = await prisma.user.create({
    data: {
      email: 'rohit.edits@gmail.com',
      name: 'Rohit Varma',
      passwordHash,
      role: 'CLIPPER',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      clipperProfile: {
        create: {
          instagramHandle: '@rohit_shortsedits',
          youtubeHandle: '@RohitCuts',
          editingSoftware: 'CapCut Desktop, DaVinci Resolve',
          experienceYears: '2 years',
          preferredLangs: 'Hindi, English',
          upiId: 'rohit@paytm',
          city: 'Mumbai',
          level: 'PRO_CLIPPER',
          rating: 4.88,
        },
      },
      wallet: {
        create: {
          balance: 14200,
          pendingBalance: 4500,
          escrowBalance: 0,
          lifetimeEarned: 89000,
          lifetimeSpent: 0,
        },
      },
    },
  });

  const clipper3 = await prisma.user.create({
    data: {
      email: 'ananya.reels@gmail.com',
      name: 'Ananya Joshi',
      passwordHash,
      role: 'CLIPPER',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      clipperProfile: {
        create: {
          instagramHandle: '@ananya_edits',
          youtubeHandle: '@AnanyaVibes',
          editingSoftware: 'Premiere Pro, CapCut',
          experienceYears: '4 years',
          preferredLangs: 'English, Marathi',
          upiId: 'ananya@oksbi',
          city: 'Pune',
          level: 'MASTER',
          rating: 4.99,
        },
      },
      wallet: {
        create: {
          balance: 42100,
          pendingBalance: 12000,
          escrowBalance: 0,
          lifetimeEarned: 245000,
          lifetimeSpent: 0,
        },
      },
    },
  });

  // 4. Create Campaigns
  const campaign1 = await prisma.campaign.create({
    data: {
      title: 'Aether AI 2.0 - Turn Prompts Into Cinematic 4K Reality',
      slug: 'aether-ai-2-cinematic-launch',
      brandId: brand1.id,
      industry: 'Tech & AI',
      description: 'Highlight the insane capability of Aether AI 2.0 where users generate 4K hyper-realistic video in 10 seconds. Focus on comparison hooks ("Stop paying $500 for stock footage...").',
      objective: 'Generate 1M+ views across YouTube Shorts & Instagram Reels to drive 10,000 freemium app signups.',
      sourceVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      driveAssetsUrl: 'https://drive.google.com/drive/folders/aether-ai-raw-footage-4k',
      rawVideoDownloadUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      guidelines: `1. First 3 seconds MUST have a high-retention visual hook or bold text statement.
2. Fast-paced pacing (transitions every 1.5 - 2.5 seconds).
3. Clear call-to-action: "Link in bio to try Aether AI for free".
4. Add trending dynamic captions (yellow/white highlights).`,
      hookSuggestions: '• "Nobody is talking about what AI just did to Hollywood..."\n• "I replaced a $10,000 video shoot with this single prompt"\n• "Top 3 insane features in Aether 2.0 you missed"',
      prohibitedContent: 'No political commentary, no misleading pricing claims, no adult content.',
      requiredHashtags: '#AetherAI #AICreators #TechTok #VideoEditing #FutureTech',
      allowedPlatforms: 'INSTAGRAM,YOUTUBE,TIKTOK',
      minDurationSec: 15,
      maxDurationSec: 50,
      aspectRatio: '9:16',
      rewardModel: 'CPM',
      rewardPerClip: 0,
      cpmRate: 140, // ₹140 per 1,000 verified views
      maxRewardPerClip: 20000,
      totalBudget: 150000,
      remainingBudget: 114000,
      targetViews: 1000000,
      verifiedViews: 257000,
      status: 'ACTIVE',
      isFeatured: true,
      deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
    },
  });

  const campaign2 = await prisma.campaign.create({
    data: {
      title: 'KicksDrop Travis Scott Air Jordan 1 Low Drop Hype',
      slug: 'kicksdrop-travis-scott-jordan-hype',
      brandId: brand2.id,
      industry: 'Fashion & Sneakers',
      description: 'Create hyper-engaging unboxing, styling, and price-check clips for the exclusive Travis Scott x Air Jordan 1 Low drop on KicksDrop.',
      objective: 'Drive viral streetwear hype on Instagram Reels and TikTok, with direct app download CTA.',
      sourceVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      driveAssetsUrl: 'https://drive.google.com/drive/folders/kicksdrop-travis-unboxing-hd',
      thumbnailUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80',
      guidelines: 'Focus on ASMR shoe sounds, close-up stitching details, and retail vs resell price comparisons.',
      hookSuggestions: '• "Did KicksDrop just drop these for retail?!"\n• "Is this the sneaker of the year?"',
      prohibitedContent: 'Do not promote fake or replica sneakers.',
      requiredHashtags: '#KicksDrop #SneakerHead #Jordan1 #SneakerIndia #Streetwear',
      allowedPlatforms: 'INSTAGRAM,TIKTOK',
      minDurationSec: 15,
      maxDurationSec: 45,
      aspectRatio: '9:16',
      rewardModel: 'HYBRID',
      rewardPerClip: 500, // ₹500 base approval + ₹100/1k views
      cpmRate: 100,
      maxRewardPerClip: 12000,
      totalBudget: 80000,
      remainingBudget: 58000,
      targetViews: 600000,
      verifiedViews: 184000,
      status: 'ACTIVE',
      isFeatured: true,
      deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
    },
  });

  const campaign3 = await prisma.campaign.create({
    data: {
      title: 'Founders Unplugged Ep #44: $0 to $100M ARR In 3 Years',
      slug: 'founders-unplugged-100m-arr-story',
      brandId: brand3.id,
      industry: 'Podcasts & Media',
      description: 'Clip the most mind-blowing founder insights, controversial business opinions, and funding stories from our 2-hour deep dive interview with Nikhil Kamath & Kunal Shah.',
      objective: 'Maximize channel subscriber growth and clip virality across YouTube Shorts and Reels.',
      sourceVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      driveAssetsUrl: 'https://drive.google.com/drive/folders/unplugged-ep44-raw-4k',
      thumbnailUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80',
      guidelines: 'Use bold captions with punchy colors. Cut directly to the juice—no intro banter. Add subtle dramatic background music during emotional peaks.',
      hookSuggestions: '• "Kunal Shah just revealed the dark truth of Indian startup funding..."\n• "The single advice that saved my business from bankruptcy"',
      requiredHashtags: '#FoundersUnplugged #StartupIndia #BusinessTips #PodcastClips #Entrepreneur',
      allowedPlatforms: 'INSTAGRAM,YOUTUBE',
      minDurationSec: 25,
      maxDurationSec: 60,
      aspectRatio: '9:16',
      rewardModel: 'CPM',
      rewardPerClip: 0,
      cpmRate: 120, // ₹120 per 1k views
      maxRewardPerClip: 15000,
      totalBudget: 120000,
      remainingBudget: 88000,
      targetViews: 800000,
      verifiedViews: 260000,
      status: 'ACTIVE',
      isFeatured: true,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  });

  const campaign4 = await prisma.campaign.create({
    data: {
      title: 'ZenPulse 100% Whey Isolate: The Lab Test Truth',
      slug: 'zenpulse-whey-isolate-lab-tested',
      brandId: brand1.id,
      industry: 'Fitness & Health',
      description: 'Expose amino-spiked protein brands vs authentic third-party certified isolate. High educational and trust-building hooks.',
      objective: 'Drives verified fitness creators and clippers to educate gym goers on reading nutrition labels.',
      sourceVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
      guidelines: 'Show certified test certificates on screen. Keep enthusiastic and scientific.',
      requiredHashtags: '#ZenPulse #ProteinReview #FitnessIndia #GymTok #Supplements',
      allowedPlatforms: 'INSTAGRAM,YOUTUBE,TIKTOK',
      minDurationSec: 20,
      maxDurationSec: 55,
      aspectRatio: '9:16',
      rewardModel: 'FIXED',
      rewardPerClip: 800, // ₹800 flat approved clip bounty
      cpmRate: 0,
      maxRewardPerClip: 800,
      totalBudget: 60000,
      remainingBudget: 42000,
      targetViews: 300000,
      verifiedViews: 90000,
      status: 'ACTIVE',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  // 5. Create Participations
  await prisma.campaignParticipation.create({
    data: {
      campaignId: campaign1.id,
      clipperId: clipper1.id,
      status: 'ACTIVE',
    },
  });

  await prisma.campaignParticipation.create({
    data: {
      campaignId: campaign2.id,
      clipperId: clipper1.id,
      status: 'ACTIVE',
    },
  });

  await prisma.campaignParticipation.create({
    data: {
      campaignId: campaign3.id,
      clipperId: clipper2.id,
      status: 'ACTIVE',
    },
  });

  await prisma.campaignParticipation.create({
    data: {
      campaignId: campaign1.id,
      clipperId: clipper3.id,
      status: 'ACTIVE',
    },
  });

  // 6. Create Real Submissions with View Snapshots
  const sub1 = await prisma.submission.create({
    data: {
      submissionNumber: 'CLM-SUB-2001',
      campaignId: campaign1.id,
      clipperId: clipper1.id,
      platform: 'INSTAGRAM',
      videoUrl: 'https://www.instagram.com/reel/C8_zX8yP9kL/',
      title: 'Aether AI 2.0 Mind-Blowing VFX Prompt Comparison',
      caption: 'The future of video is here and it is faster than you think 🔥 Try Aether AI link in bio! #AetherAI #AICreator',
      postAccountHandle: '@aarav.viralcuts',
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
      submissionNotes: 'Achieved explosive retention in the first 48 hours using 3-tier hook formula.',
      reportedViews: 188000,
      verifiedViews: 185000,
      likesCount: 14200,
      commentsCount: 680,
      sharesCount: 3100,
      rewardEarned: 25900, // 185k views / 1k * ₹140 = ₹25,900
      isPaid: true,
      status: 'VIEWS_VERIFIED',
      submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      reviewedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      verifiedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      paidAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      reviewNotes: 'Exceptional retention pacing and seamless brand link placement. Verified via Instagram Graph API snapshot.',
    },
  });

  // Add snapshots for sub1
  await prisma.viewSnapshot.createMany({
    data: [
      {
        submissionId: sub1.id,
        viewCount: 22000,
        likes: 1800,
        comments: 95,
        shares: 410,
        verifiedBy: 'API_SYNC',
        notes: '24-hour verification checkpoint',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      },
      {
        submissionId: sub1.id,
        viewCount: 94000,
        likes: 7200,
        comments: 340,
        shares: 1650,
        verifiedBy: 'API_SYNC',
        notes: '48-hour viral spike checkpoint',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        submissionId: sub1.id,
        viewCount: 185000,
        likes: 14200,
        comments: 680,
        shares: 3100,
        verifiedBy: 'MANUAL_AUDIT',
        notes: 'Final settlement audit passed. High genuine Indian audience engagement.',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ],
  });

  const sub2 = await prisma.submission.create({
    data: {
      submissionNumber: 'CLM-SUB-2002',
      campaignId: campaign2.id,
      clipperId: clipper1.id,
      platform: 'INSTAGRAM',
      videoUrl: 'https://www.instagram.com/reel/C9_A2B3C4D5/',
      title: 'Travis Scott Jordan 1 Low Unboxing ASMR + Price Check',
      caption: 'Retail vs Resell is insane 🤯 Grab exclusive pairs on @KicksDrop #KicksDrop #Sneakers',
      postAccountHandle: '@aarav.viralcuts',
      thumbnailUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&auto=format&fit=crop&q=80',
      reportedViews: 65000,
      verifiedViews: 62000,
      likesCount: 5200,
      commentsCount: 210,
      sharesCount: 890,
      rewardEarned: 6700, // ₹500 base + (62k * ₹100/1k) = ₹6,700
      isPaid: false,
      status: 'APPROVED',
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      reviewedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      reviewNotes: 'Great shoe audio and crisp typography. 48h performance window currently ticking.',
    },
  });

  const sub3 = await prisma.submission.create({
    data: {
      submissionNumber: 'CLM-SUB-2003',
      campaignId: campaign3.id,
      clipperId: clipper2.id,
      platform: 'YOUTUBE',
      videoUrl: 'https://www.youtube.com/shorts/sampleShort123',
      title: 'The Brutal Reality of Startup Valuations (Founders Unplugged)',
      caption: 'Why 99% of pitch decks get rejected within 60 seconds. Subscribe for more! #FoundersUnplugged',
      postAccountHandle: '@RohitCuts',
      thumbnailUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&auto=format&fit=crop&q=80',
      reportedViews: 12500,
      verifiedViews: 0,
      rewardEarned: 0,
      status: 'PENDING_REVIEW',
      submittedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      submissionNotes: 'Newly posted clip gaining fast initial traction in tech feeds.',
    },
  });

  const sub4 = await prisma.submission.create({
    data: {
      submissionNumber: 'CLM-SUB-2004',
      campaignId: campaign1.id,
      clipperId: clipper3.id,
      platform: 'YOUTUBE',
      videoUrl: 'https://www.youtube.com/shorts/ananyaAetherShort',
      title: 'Hollywood VFX Artists React to Aether AI 2.0',
      caption: 'Can you tell which shot was made by AI? #AetherAI #VFX',
      postAccountHandle: '@AnanyaVibes',
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
      reportedViews: 72000,
      verifiedViews: 72000,
      rewardEarned: 10080,
      status: 'VIEWS_VERIFIED',
      isPaid: true,
      submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      reviewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      verifiedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  });

  // 7. Create Withdrawal Requests
  await prisma.withdrawal.create({
    data: {
      clipperId: clipper1.id,
      amount: 15000,
      method: 'UPI',
      accountDetails: 'aarav@okaxis',
      status: 'PROCESSED',
      payoutTxnId: 'UPI-RAZORPAY-8921894291',
      adminNotes: 'Instant UPI payout completed via RazorpayX Payouts.',
      requestedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      processedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000),
    },
  });

  await prisma.withdrawal.create({
    data: {
      clipperId: clipper1.id,
      amount: 10000,
      method: 'UPI',
      accountDetails: 'aarav@okaxis',
      status: 'PENDING',
      adminNotes: 'Awaiting admin settlement queue review.',
      requestedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hrs ago
    },
  });

  // 8. Create Transactions
  const wallet1 = await prisma.wallet.findUnique({ where: { userId: clipper1.id } });
  if (wallet1) {
    await prisma.transaction.create({
      data: {
        walletId: wallet1.id,
        userId: clipper1.id,
        amount: 25900,
        type: 'REWARD_CREDIT',
        status: 'COMPLETED',
        description: 'Reward payout for verified views on Aether AI 2.0 (CLM-SUB-2001)',
        referenceId: sub1.id,
      },
    });

    await prisma.transaction.create({
      data: {
        walletId: wallet1.id,
        userId: clipper1.id,
        amount: -15000,
        type: 'WITHDRAWAL',
        status: 'COMPLETED',
        description: 'UPI Withdrawal to aarav@okaxis (UPI-RAZORPAY-8921894291)',
      },
    });
  }

  // 9. Platform Settings
  await prisma.platformSetting.createMany({
    data: [
      { key: 'PLATFORM_COMMISSION_PERCENT', value: '15', category: 'FINANCIAL', description: 'Percentage cut platform retains on campaigns' },
      { key: 'MINIMUM_WITHDRAWAL_INR', value: '500', category: 'FINANCIAL', description: 'Minimum balance in INR required for withdrawal request' },
      { key: 'MINIMUM_CAMPAIGN_BUDGET_INR', value: '10000', category: 'FINANCIAL', description: 'Minimum budget required to launch a brand campaign' },
      { key: 'AUTO_VERIFY_INTERVAL_HOURS', value: '12', category: 'VERIFICATION', description: 'Frequency of automated social API syncs' },
      { key: 'SUPPORT_EMAIL', value: 'support@clipmatrix.in', category: 'GENERAL', description: 'Primary platform support email' },
    ],
  });

  // 10. Notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: clipper1.id,
        title: '🎉 Views Verified & Payout Credited!',
        message: 'Your clip for "Aether AI 2.0" reached 185,000 verified views. ₹25,900 credited to your wallet balance!',
        type: 'REWARD',
        link: '/dashboard/clipper/earnings',
      },
      {
        userId: brand1.id,
        title: '🔥 High-Performing Submission Alert',
        message: 'Aarav Sharma submitted a high-performing clip delivering 185,000 views on YouTube Shorts.',
        type: 'SUBMISSION',
        link: '/dashboard/brand/submissions',
      },
      {
        userId: adminUser.id,
        title: '⚡ Pending Payout Request Needs Approval',
        message: 'Clipper Aarav Sharma requested a ₹10,000 UPI withdrawal to aarav@okaxis.',
        type: 'WITHDRAWAL',
        link: '/dashboard/admin/withdrawals',
      },
    ],
  });

  // 11. Initial Audit Logs
  await prisma.auditLog.createMany({
    data: [
      {
        adminId: adminUser.id,
        action: 'VERIFY_VIEWS_AND_CREDIT',
        entity: 'Submission',
        entityId: sub1.id,
        details: 'Admin verified 185,000 views and triggered ₹25,900 credit to clipper wallet.',
      },
      {
        adminId: adminUser.id,
        action: 'APPROVE_CAMPAIGN',
        entity: 'Campaign',
        entityId: campaign1.id,
        details: 'Approved campaign "Aether AI 2.0" with ₹1,50,000 budget allocation.',
      },
    ],
  });

  console.log('✅ Clip Matrix database seeded successfully!');
  console.log('Admin account: admin@clipmatrix.com / password123');
  console.log('Brand account: brand@clipmatrix.com / password123');
  console.log('Clipper account: clipper@clipmatrix.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
