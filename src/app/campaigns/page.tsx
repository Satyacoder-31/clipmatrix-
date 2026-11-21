'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Flame,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Tag,
  DollarSign,
  CheckCircle,
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function MarketplacePage() {
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
      if (data.campaigns) setCampaigns(data.campaigns);
    } catch (e) {
      console.error(e);
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
    <div className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 text-purple-300 text-xs font-semibold border border-purple-800/50">
          <Flame className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
          <span>Live Bounty & CPM Campaigns</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Explore Viral <span className="text-gradient-neon">Campaign Marketplace</span>
        </h1>
        <p className="text-purple-200/70 text-sm sm:text-base max-w-2xl">
          Browse verified brand campaigns, check reward structures, download long-form source footage, and submit your
          published edits.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Search by campaign title, brand name, or hashtags (e.g. #AetherAI)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0e071c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-glow-purple"
          >
            Search
          </button>
        </form>

        {/* Filter Badges & Selectors */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-purple-900/40 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-purple-400 font-medium">Platform:</span>
            {['ALL', 'INSTAGRAM', 'YOUTUBE', 'TIKTOK'].map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  platform === p
                    ? 'bg-purple-600 text-white shadow-glow-purple'
                    : 'bg-[#1e1338] text-purple-300 hover:text-white'
                }`}
              >
                {p === 'ALL' ? 'All Platforms' : p === 'INSTAGRAM' ? 'Instagram' : p === 'YOUTUBE' ? 'YouTube' : 'TikTok'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#1e1338] border border-purple-800/40 text-purple-200 text-xs focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="Tech & AI">Tech & AI</option>
              <option value="Fashion & Sneakers">Fashion & Sneakers</option>
              <option value="Podcasts & Media">Podcasts & Media</option>
              <option value="Fitness & Health">Fitness & Health</option>
            </select>

            <select
              value={rewardModel}
              onChange={(e) => setRewardModel(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#1e1338] border border-purple-800/40 text-purple-200 text-xs focus:outline-none"
            >
              <option value="ALL">All Models</option>
              <option value="CPM">CPM Rewards</option>
              <option value="FIXED">Fixed Clip Bounty</option>
              <option value="HYBRID">Hybrid (Base + CPM)</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#1e1338] border border-purple-800/40 text-purple-200 text-xs focus:outline-none"
            >
              <option value="latest">Latest Campaigns</option>
              <option value="budget">Highest Budget</option>
              <option value="reward">Highest CPM Payout</option>
              <option value="views">Most Views</option>
            </select>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      {loading ? (
        <div className="text-center py-20 text-purple-300">Loading active campaigns...</div>
      ) : campaigns.length === 0 ? (
        <div className="text-center py-20 bg-[#120a22] rounded-2xl border border-purple-900/40 space-y-3">
          <p className="text-white font-medium">No campaigns found matching your filter criteria.</p>
          <button
            onClick={() => {
              setPlatform('ALL');
              setIndustry('ALL');
              setRewardModel('ALL');
              setSearch('');
            }}
            className="text-xs text-purple-400 underline hover:text-purple-200"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((camp) => {
            const budgetPercent = Math.min(
              100,
              Math.round(((camp.totalBudget - camp.remainingBudget) / camp.totalBudget) * 100)
            );

            return (
              <div
                key={camp.id}
                className="rounded-2xl bg-[#140c26] border border-purple-900/50 hover:border-purple-500/50 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                    <img
                      src={camp.thumbnailUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'}
                      alt={camp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 backdrop-blur-md text-white border border-white/10 uppercase">
                      {camp.industry}
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-600 text-white shadow-glow-purple">
                      {camp.rewardModel}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs text-purple-300">
                      <span>{camp.brand?.name || 'Verified Brand'}</span>
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Clock className="w-3 h-3 text-purple-400" />
                        Active
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white line-clamp-2 font-display group-hover:text-purple-300 transition-colors">
                      {camp.title}
                    </h3>

                    <p className="text-xs text-purple-200/70 line-clamp-2 leading-relaxed">
                      {camp.description}
                    </p>

                    {/* Reward Box */}
                    <div className="p-3.5 rounded-xl bg-[#1a1130] border border-purple-800/40 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-purple-400 uppercase font-mono">Clipper Reward</div>
                        <div className="text-base font-extrabold text-emerald-400 font-display">
                          {camp.rewardModel === 'CPM'
                            ? `₹${camp.cpmRate} / 1k views`
                            : camp.rewardModel === 'FIXED'
                            ? `₹${camp.rewardPerClip} / clip`
                            : `₹${camp.rewardPerClip} + ₹${camp.cpmRate} CPM`}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-purple-400 uppercase font-mono">Escrow Pool</div>
                        <div className="text-xs font-bold text-white">₹{camp.totalBudget.toLocaleString('en-IN')}</div>
                      </div>
                    </div>

                    {/* Budget Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] text-purple-300/80">
                        <span>Campaign Claimed</span>
                        <span>{budgetPercent}% Claimed</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#201438] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                          style={{ width: `${budgetPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <a
                    href={`/campaigns/${camp.slug || camp.id}`}
                    className="w-full py-3 rounded-xl text-xs font-semibold text-center text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center justify-center gap-1.5 shadow-glow-purple"
                  >
                    <span>View Campaign Guidelines & Assets</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
