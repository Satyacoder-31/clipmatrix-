export interface AudienceDemographics {
  topCountries: {
    country: string;
    code: string;
    percent: number;
    isTier1: boolean;
  }[];
  tier1Percent: number; // e.g. 62% from US/UK/CA/AU/NZ
  cpmMultiplier: number; // e.g. 1.25x for high Tier-1 traffic
  gender: {
    male: number;
    female: number;
    other?: number;
  };
  ageGroups: {
    group: '13-17' | '18-24' | '25-34' | '35-44' | '45+';
    percent: number;
  }[];
  estimatedRetentionRate: number; // e.g. 78% watch time
  engagementRate: number; // (likes + comments) / views * 100
  fraudScore: number; // 0 - 100 (0 = authentic, 100 = suspected bots)
  fraudFlags: string[];
  source: 'OFFICIAL_API' | 'AUDIENCE_INTELLIGENCE' | 'BEHAVIORAL_MODEL';
  isModeledEstimate?: boolean;
  oauthRequiredNotice?: string;
}

export interface ScrapedVideoStats {
  platform: 'YOUTUBE' | 'INSTAGRAM' | 'TIKTOK' | 'UNKNOWN';
  videoId: string;
  originalUrl: string;
  title: string;
  authorHandle: string;
  authorName: string;
  thumbnailUrl: string;
  publishedAt: string;
  durationSeconds?: number;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  sharesIsPrivateToCreator?: boolean;
  demographics: AudienceDemographics;
  verificationMethod: string;
  scrapedAt: string;
}
