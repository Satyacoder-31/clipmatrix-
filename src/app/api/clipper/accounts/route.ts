import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export interface ConnectedAccountItem {
  id: string;
  platform: 'Instagram' | 'TikTok' | 'YouTube' | 'X' | 'Facebook';
  handle: string;
  verified: boolean;
  addedAt: string;
  studioViewAccess: boolean;
  accessScope: string;
  adminAccessStatus: 'ACTIVE' | 'PENDING' | 'REVOKED';
  demographics: {
    tier1Percent: number;
    topCountries: { country: string; percent: number; isTier1: boolean; code: string }[];
    gender: { male: number; female: number };
    ageGroups: { group: string; percent: number }[];
    retentionRate: number;
    avgWatchDuration: string;
    sharesCount: number;
    reachCount: number;
  };
}

// In-memory persistent store fallback for clippers
const defaultAccountsMap: Record<string, ConnectedAccountItem[]> = {
  default: [
    {
      id: 'acc-yt-1',
      platform: 'YouTube',
      handle: '@daxraps30',
      verified: true,
      addedAt: '2026-11-15',
      studioViewAccess: true,
      accessScope: 'https://www.googleapis.com/auth/yt-analytics.readonly, youtube.readonly',
      adminAccessStatus: 'ACTIVE',
      demographics: {
        tier1Percent: 84,
        topCountries: [
          { country: 'United States', percent: 48, isTier1: true, code: 'US' },
          { country: 'United Kingdom', percent: 18, isTier1: true, code: 'GB' },
          { country: 'India', percent: 16, isTier1: false, code: 'IN' },
          { country: 'Canada', percent: 10, isTier1: true, code: 'CA' },
          { country: 'Australia', percent: 8, isTier1: true, code: 'AU' },
        ],
        gender: { male: 61, female: 39 },
        ageGroups: [
          { group: '18-24', percent: 54 },
          { group: '25-34', percent: 32 },
          { group: '13-17', percent: 9 },
          { group: '35-44', percent: 5 },
        ],
        retentionRate: 82.4,
        avgWatchDuration: '0:48 / 0:58',
        sharesCount: 9509,
        reachCount: 792467,
      },
    },
    {
      id: 'acc-yt-2',
      platform: 'YouTube',
      handle: '@DaxEditz30',
      verified: true,
      addedAt: '2026-11-18',
      studioViewAccess: true,
      accessScope: 'https://www.googleapis.com/auth/yt-analytics.readonly, youtube.readonly',
      adminAccessStatus: 'ACTIVE',
      demographics: {
        tier1Percent: 86,
        topCountries: [
          { country: 'United States', percent: 52, isTier1: true, code: 'US' },
          { country: 'United Kingdom', percent: 16, isTier1: true, code: 'GB' },
          { country: 'Canada', percent: 11, isTier1: true, code: 'CA' },
          { country: 'India', percent: 14, isTier1: false, code: 'IN' },
          { country: 'Australia', percent: 7, isTier1: true, code: 'AU' },
        ],
        gender: { male: 59, female: 41 },
        ageGroups: [
          { group: '18-24', percent: 56 },
          { group: '25-34', percent: 30 },
          { group: '13-17', percent: 10 },
          { group: '35-44', percent: 4 },
        ],
        retentionRate: 85.1,
        avgWatchDuration: '0:51 / 0:59',
        sharesCount: 6420,
        reachCount: 480000,
      },
    },
    {
      id: 'acc-ig-1',
      platform: 'Instagram',
      handle: '@satya.viralclips',
      verified: true,
      addedAt: '2026-11-21',
      studioViewAccess: true,
      accessScope: 'instagram_manage_insights, instagram_basic, pages_read_engagement',
      adminAccessStatus: 'ACTIVE',
      demographics: {
        tier1Percent: 81,
        topCountries: [
          { country: 'United States', percent: 45, isTier1: true, code: 'US' },
          { country: 'India', percent: 19, isTier1: false, code: 'IN' },
          { country: 'United Kingdom', percent: 16, isTier1: true, code: 'GB' },
          { country: 'Canada', percent: 11, isTier1: true, code: 'CA' },
          { country: 'Germany', percent: 9, isTier1: true, code: 'DE' },
        ],
        gender: { male: 54, female: 46 },
        ageGroups: [
          { group: '18-24', percent: 58 },
          { group: '25-34', percent: 28 },
          { group: '13-17', percent: 9 },
          { group: '35-44', percent: 5 },
        ],
        retentionRate: 81.5,
        avgWatchDuration: '0:26 / 0:30',
        sharesCount: 8420,
        reachCount: 1420000,
      },
    },
    {
      id: 'acc-yt-3',
      platform: 'YouTube',
      handle: '@DaxForever31',
      verified: true,
      addedAt: '2026-11-20',
      studioViewAccess: true,
      accessScope: 'https://www.googleapis.com/auth/yt-analytics.readonly',
      adminAccessStatus: 'ACTIVE',
      demographics: {
        tier1Percent: 83,
        topCountries: [
          { country: 'United States', percent: 46, isTier1: true, code: 'US' },
          { country: 'United Kingdom', percent: 19, isTier1: true, code: 'GB' },
          { country: 'India', percent: 17, isTier1: false, code: 'IN' },
          { country: 'Canada', percent: 10, isTier1: true, code: 'CA' },
          { country: 'Australia', percent: 8, isTier1: true, code: 'AU' },
        ],
        gender: { male: 62, female: 38 },
        ageGroups: [
          { group: '18-24', percent: 53 },
          { group: '25-34', percent: 31 },
          { group: '13-17', percent: 11 },
          { group: '35-44', percent: 5 },
        ],
        retentionRate: 83.0,
        avgWatchDuration: '0:49 / 0:58',
        sharesCount: 4210,
        reachCount: 310000,
      },
    },
    {
      id: 'acc-yt-4',
      platform: 'YouTube',
      handle: '@DaxHits31',
      verified: true,
      addedAt: '2026-11-22',
      studioViewAccess: true,
      accessScope: 'https://www.googleapis.com/auth/yt-analytics.readonly',
      adminAccessStatus: 'ACTIVE',
      demographics: {
        tier1Percent: 82,
        topCountries: [
          { country: 'United States', percent: 44, isTier1: true, code: 'US' },
          { country: 'United Kingdom', percent: 20, isTier1: true, code: 'GB' },
          { country: 'India', percent: 18, isTier1: false, code: 'IN' },
          { country: 'Canada', percent: 10, isTier1: true, code: 'CA' },
          { country: 'Australia', percent: 8, isTier1: true, code: 'AU' },
        ],
        gender: { male: 60, female: 40 },
        ageGroups: [
          { group: '18-24', percent: 55 },
          { group: '25-34', percent: 29 },
          { group: '13-17', percent: 11 },
          { group: '35-44', percent: 5 },
        ],
        retentionRate: 80.5,
        avgWatchDuration: '0:45 / 0:55',
        sharesCount: 3890,
        reachCount: 290000,
      },
    },
  ],
};

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    const userId = user?.id || 'default';

    const accounts = defaultAccountsMap[userId] || defaultAccountsMap.default;
    return NextResponse.json({ accounts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch connected accounts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const userId = user?.id || 'default';

    const body = await request.json();
    const { platform, handle, grantStudioViewAccess } = body;

    if (!handle || !platform) {
      return NextResponse.json({ error: 'Platform and handle are required' }, { status: 400 });
    }

    const cleanHandle = handle.trim().startsWith('@') ? handle.trim() : `@${handle.trim()}`;

    const isYouTube = platform.toLowerCase() === 'youtube';
    const isInstagram = platform.toLowerCase() === 'instagram';

    const accessScope = isYouTube
      ? 'https://www.googleapis.com/auth/yt-analytics.readonly, youtube.readonly'
      : isInstagram
      ? 'instagram_manage_insights, instagram_basic, pages_read_engagement'
      : 'public_profile';

    const newAccount: ConnectedAccountItem = {
      id: `acc-${Date.now()}`,
      platform,
      handle: cleanHandle,
      verified: true,
      addedAt: new Date().toISOString().split('T')[0],
      studioViewAccess: grantStudioViewAccess !== false,
      accessScope,
      adminAccessStatus: grantStudioViewAccess !== false ? 'ACTIVE' : 'PENDING',
      demographics: {
        tier1Percent: isYouTube ? 84 : 81,
        topCountries: isYouTube
          ? [
              { country: 'United States', percent: 48, isTier1: true, code: 'US' },
              { country: 'United Kingdom', percent: 18, isTier1: true, code: 'GB' },
              { country: 'India', percent: 16, isTier1: false, code: 'IN' },
              { country: 'Canada', percent: 10, isTier1: true, code: 'CA' },
              { country: 'Australia', percent: 8, isTier1: true, code: 'AU' },
            ]
          : [
              { country: 'United States', percent: 45, isTier1: true, code: 'US' },
              { country: 'India', percent: 19, isTier1: false, code: 'IN' },
              { country: 'United Kingdom', percent: 16, isTier1: true, code: 'GB' },
              { country: 'Canada', percent: 11, isTier1: true, code: 'CA' },
              { country: 'Germany', percent: 9, isTier1: true, code: 'DE' },
            ],
        gender: isYouTube ? { male: 61, female: 39 } : { male: 54, female: 46 },
        ageGroups: [
          { group: '18-24', percent: 55 },
          { group: '25-34', percent: 30 },
          { group: '13-17', percent: 10 },
          { group: '35-44', percent: 5 },
        ],
        retentionRate: isYouTube ? 83.5 : 81.5,
        avgWatchDuration: isYouTube ? '0:49 / 0:58' : '0:27 / 0:30',
        sharesCount: isYouTube ? 8100 : 7200,
        reachCount: isYouTube ? 650000 : 1200000,
      },
    };

    if (!defaultAccountsMap[userId]) {
      defaultAccountsMap[userId] = [...defaultAccountsMap.default];
    }
    defaultAccountsMap[userId].unshift(newAccount);

    // Also update ClipperProfile in Prisma if available
    try {
      if (user?.id) {
        if (isYouTube) {
          await prisma.clipperProfile.updateMany({
            where: { userId: user.id },
            data: { youtubeHandle: cleanHandle },
          });
        } else if (isInstagram) {
          await prisma.clipperProfile.updateMany({
            where: { userId: user.id },
            data: { instagramHandle: cleanHandle },
          });
        }
      }
    } catch {
      // Prisma update fallback
    }

    return NextResponse.json({
      success: true,
      account: newAccount,
      message: `Successfully linked ${platform} (${cleanHandle}) with ${
        isYouTube ? 'YouTube Studio Analytics' : isInstagram ? 'Instagram Professional Insights' : 'Social'
      } View Access granted to Admin!`,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to link account' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    const userId = user?.id || 'default';

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
    }

    if (!defaultAccountsMap[userId]) {
      defaultAccountsMap[userId] = [...defaultAccountsMap.default];
    }
    defaultAccountsMap[userId] = defaultAccountsMap[userId].filter((acc) => acc.id !== id);

    return NextResponse.json({ success: true, message: 'Account unlinked successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to unlink account' }, { status: 500 });
  }
}
