'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Flame,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  DollarSign,
  CheckCircle2,
  ExternalLink,
  Video,
} from 'lucide-react';
import Link from 'next/link';

export default function ClipperCampaignMarketplacePage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [platform, setPlatform] = useState('ALL');
  const [industry, setIndustry] = useState('ALL');
  const [rewardModel, setRewardModel] = useState('ALL');
  const [sort, setSort] = useState('latest');

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (platform !== 'ALL') params.set('platform', platform);
      if (industry !== 'ALL') params.set('industry', industry);
      if (rewardModel !== 'ALL') params.set('rewardModel', rewardModel);
      if (search) params.set('search', search);
      if (sort) params.set('sort', sort);

      const res = await fetch(`/api/campaigns?${params.toString()}`);
      const data = await res.json();
      if (data.campaigns && data.campaigns.length > 0) {
        setCampaigns(data.campaigns);
      } else {
        // Fallback demo campaigns if serverless DB is empty
        setCampaigns([
          {
            id: 'camp-1',
            title: 'Nova AI Video Generation Launch',
            slug: 'nova-ai-launch',
            industry: 'Tech & AI',
            description: 'Create 15-45s fast-paced video edits showing Nova AI generating cinematic video from prompt.',
            rewardModel: 'CPM',
            cpmRate: 150,
            totalBudget: 50000,
            remainingBudget: 38500,
            targetViews: 350000,
            verifiedViews: 82000,
            status: 'ACTIVE',
            thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600',
            allowedPlatforms: 'INSTAGRAM,YOUTUBE,TIKTOK',
            brand: { name: 'Aether AI Labs' },
          },
          {
            id: 'camp-2',
            title: 'FinEdge Smart Investing App',
            slug: 'finedge-smart-investing',
            industry: 'FinTech',
            description: 'Extract punchy hooks from founder podcast regarding 0% brokerage and SIP automation.',
            rewardModel: 'CPM',
            cpmRate: 120,
            totalBudget: 75000,
            remainingBudget: 52000,
            targetViews: 600000,
            verifiedViews: 195000,
            status: 'ACTIVE',
            thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
            allowedPlatforms: 'INSTAGRAM,YOUTUBE',
            brand: { name: 'FinEdge Capital' },
          },
          {
            id: 'camp-3',
            title: 'Cursor 2.0 AI Code Editor Blitz',
            slug: 'cursor-code-blitz',
            industry: 'Developer Tools',
            description: 'Showcase voice coding, agentic refactors, and terminal auto-fix moments from top engineer streams.',
            rewardModel: 'CPM',
            cpmRate: 140,
            totalBudget: 60000,
            remainingBudget: 41000,
            targetViews: 450000,
            verifiedViews: 110000,
            status: 'ACTIVE',
            thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600',
            allowedPlatforms: 'YOUTUBE,TIKTOK',
            brand: { name: 'DevFlow Inc' },
          },
        ]);
      }
    } catch {
      // Fallback
      setCampaigns([
        {
          id: 'camp-1',
          title: 'Nova AI Video Generation Launch',
          slug: 'nova-ai-launch',
          industry: 'Tech & AI',
          description: 'Create 15-45s fast-paced video edits showing Nova AI generating cinematic video from prompt.',
          rewardModel: 'CPM',
          cpmRate: 150,
          totalBudget: 50000,
          remainingBudget: 38500,
          targetViews: 350000,
          verifiedViews: 82000,
          status: 'ACTIVE',
          thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600',
          allowedPlatforms: 'INSTAGRAM,YOUTUBE,TIKTOK',
          brand: { name: 'Aether AI Labs' },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [platform, industry, rewardModel, sort]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCampaigns();
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold border border-cyan-500/25 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ESCROW-LOCKED BRIEFS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Campaign Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Claim live brand campaigns, download raw footage, and clip viral short-form videos with guaranteed CPM payouts.
          </p>
        </div>

        <Link
          href="/dashboard/clipper/submit"
          className="px-5 py-2.5 rounded-xl font-bold text-white bg-[#00B887] hover:bg-[#009E74] transition-all shadow-md shadow-emerald-500/20 text-xs flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Video className="w-4 h-4" />
          <span>Submit Clip ↗</span>
        </Link>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="p-4 rounded-2xl bg-[#0c1022] border border-white/[0.08] flex flex-col md:flex-row items-center gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search campaigns by brand, game, podcast, or niche..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs outline-none focus:border-[#00B887] transition-all"
          />
        </form>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 outline-none cursor-pointer"
          >
            <option value="ALL">All Platforms</option>
            <option value="INSTAGRAM">Instagram Reels</option>
            <option value="YOUTUBE">YouTube Shorts</option>
            <option value="TIKTOK">TikTok</option>
          </select>

          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 outline-none cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            <option value="Tech & AI">Tech & AI</option>
            <option value="FinTech">FinTech</option>
            <option value="Developer Tools">Developer Tools</option>
            <option value="E-Commerce">E-Commerce</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 outline-none cursor-pointer"
          >
            <option value="latest">Newest First</option>
            <option value="reward">Highest CPM</option>
            <option value="budget">Highest Budget</option>
          </select>
        </div>
      </div>

      {/* Campaign Cards Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <span className="inline-block w-8 h-8 border-2 border-white/20 border-t-[#00B887] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="rounded-3xl bg-[#0c1022] border border-white/[0.08] hover:border-purple-500/40 overflow-hidden flex flex-col justify-between transition-all group shadow-xl"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={camp.thumbnailUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600'}
                    alt={camp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1022] via-[#0c1022]/30 to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-cyan-300">
                    {camp.industry || 'Tech & AI'}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-400">
                    ₹{camp.cpmRate || 120} CPM
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="text-xs text-purple-400 font-mono font-semibold">
                    {camp.brand?.name || 'Verified Brand Sponsor'}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-display line-clamp-1">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-slate-300/80 line-clamp-2 leading-relaxed">
                    {camp.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                  <span>Escrow Budget</span>
                  <span className="font-bold text-white font-mono">₹{camp.totalBudget?.toLocaleString('en-IN') || '50,000'}</span>
                </div>

                <Link
                  href={`/dashboard/clipper/submit?campaignId=${camp.id}`}
                  className="w-full py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 transition-all text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/20"
                >
                  <span>Submit Video Clip</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
