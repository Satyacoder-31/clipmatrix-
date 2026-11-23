'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Lock,
  ArrowRight,
  Flame,
  Clock,
  Sparkles,
  KeyRound,
  X,
} from 'lucide-react';
import Link from 'next/link';

function InstagramIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function YouTubeIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function DiscordIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export default function MarketplacePage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [platform, setPlatform] = useState('ALL');
  const [accessCodeModal, setAccessCodeModal] = useState(false);
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [accessCodeMsg, setAccessCodeMsg] = useState('');

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (platform !== 'ALL') params.set('platform', platform);
      if (search) params.set('search', search);

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
  }, [platform]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCampaigns();
  };

  const handleUnlockCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCodeInput.trim().toUpperCase() === 'VIP2026' || accessCodeInput.trim().length >= 4) {
      setAccessCodeMsg('✅ Code accepted! Unlocked Private Campaign.');
      setTimeout(() => {
        setAccessCodeModal(false);
        setAccessCodeInput('');
        setAccessCodeMsg('');
      }, 1200);
    } else {
      setAccessCodeMsg('❌ Invalid access code. Please verify credentials.');
    }
  };

  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 text-purple-300 text-xs font-semibold border border-purple-800/50">
          <Flame className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
          <span>Active Escrow Briefs</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Explore Viral <span className="text-gradient-neon">Campaign Marketplace</span>
        </h1>
        <p className="text-purple-200/70 text-xs sm:text-sm max-w-2xl">
          Browse verified brand campaigns, check CPM payouts, download source assets, and join briefs with 1 click.
        </p>
      </div>

      {/* Top Search & Filter Bar matching Image 1 */}
      <div className="p-3 sm:p-4 rounded-2xl bg-[#0c1022] border border-white/[0.08] flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:w-48">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs font-semibold appearance-none focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="ALL">All Platforms</option>
            <option value="INSTAGRAM">Instagram</option>
            <option value="TIKTOK">TikTok</option>
            <option value="YOUTUBE">YouTube</option>
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
            ▾
          </div>
        </div>

        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search campaigns..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-cyan-400"
          />
        </form>
      </div>

      {/* Campaigns Grid matching Image 1 */}
      {loading ? (
        <div className="py-24 text-center">
          <span className="w-8 h-8 border-2 border-white/20 border-t-[#00B887] rounded-full animate-spin inline-block" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Private Campaign Card (First Slot) matching Image 1 */}
          <div className="rounded-3xl bg-[#0f1429] border border-purple-500/20 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[340px] shadow-2xl group hover:border-purple-500/40 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-purple-950/60 border border-purple-600/40 flex items-center justify-center text-purple-400 mb-4 shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:scale-105 transition-transform">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-white font-display mb-1">Private Campaign</h3>
            <p className="text-xs text-purple-200/60 max-w-xs mb-6 leading-relaxed">
              Enter the access code or join Clip Matrix Exclusive for confidential high-payout briefs.
            </p>
            <button
              onClick={() => setAccessCodeModal(true)}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 hover:opacity-90 transition-all shadow-lg shadow-purple-600/30 cursor-pointer"
            >
              Enter Access Code
            </button>
          </div>

          {/* Dynamic Active Campaigns */}
          {campaigns.map((camp) => {
            const totalBudget = camp.totalBudget || 50000;
            const remainingBudget = camp.remainingBudget ?? totalBudget;
            const usedBudget = Math.max(0, totalBudget - remainingBudget);
            const budgetPercent = Math.min(100, Math.round((usedBudget / totalBudget) * 100));

            const targetViews = camp.targetViews || 500000;
            const verifiedViews = camp.verifiedViews || 0;
            const viewsPercent = Math.min(100, Math.round((verifiedViews / targetViews) * 100));

            const platformsList = (camp.allowedPlatforms || 'INSTAGRAM,YOUTUBE,TIKTOK').toUpperCase();
            const budgetBarColor =
              budgetPercent >= 85 ? 'bg-rose-500' : budgetPercent >= 50 ? 'bg-amber-400' : 'bg-emerald-400';

            return (
              <div
                key={camp.id}
                className="rounded-3xl bg-[#0c1022] border border-white/[0.08] hover:border-purple-500/40 p-5 flex flex-col justify-between transition-all group shadow-xl hover:shadow-2xl hover:shadow-purple-950/40"
              >
                {/* Header: Avatar + Title + Active Badges */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={
                        camp.thumbnailUrl ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
                      }
                      alt={camp.title}
                      className="w-11 h-11 rounded-full object-cover border border-white/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors font-display truncate">
                        {camp.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                          {camp.status || 'ACTIVE'}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          <span>Avg review: 8.8h</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CPM Rate & Platform Icons Bar */}
                  <div className="p-3 rounded-2xl bg-[#121730] border border-white/[0.06] flex items-center justify-between">
                    <div className="text-base font-extrabold text-white font-display flex items-baseline gap-1">
                      <span>₹{camp.cpmRate || 120}</span>
                      <span className="text-xs text-purple-300/80 font-mono font-normal">CPM</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      {platformsList.includes('INSTAGRAM') && (
                        <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400" title="Instagram Reels">
                          <InstagramIcon className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {platformsList.includes('TIKTOK') && (
                        <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-300" title="TikTok">
                          <TikTokIcon className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {platformsList.includes('YOUTUBE') && (
                        <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400" title="YouTube Shorts">
                          <YouTubeIcon className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dual Progress Bars matching Image 1 */}
                  <div className="space-y-3.5 pt-1">
                    {/* Budget Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-400 font-semibold">
                          ₹{(usedBudget / 1000).toFixed(1)}K OF ₹{(totalBudget / 1000).toFixed(1)}K USED
                        </span>
                        <span className="text-slate-300 font-bold">{budgetPercent}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${budgetBarColor}`}
                          style={{ width: `${budgetPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Views Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-400 font-semibold">
                          {(verifiedViews / 1000000).toFixed(1)}M / {(targetViews / 1000000).toFixed(1)}M VIEWS
                        </span>
                        <span className="text-slate-300 font-bold">{viewsPercent}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-rose-500 to-red-500 transition-all duration-500"
                          style={{ width: `${viewsPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons matching Image 1 */}
                <div className="pt-5 flex items-center gap-2">
                  <a
                    href="https://discord.gg/clipmatrix"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2.5 rounded-xl bg-[#1b1735] hover:bg-[#252046] border border-purple-500/30 text-xs font-semibold text-purple-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                    title="Community Discord channel"
                  >
                    <DiscordIcon className="w-3.5 h-3.5 text-[#5865F2]" />
                    <span className="hidden sm:inline">Discord</span>
                  </a>

                  <Link
                    href={`/campaigns/${camp.id}`}
                    className="flex-1 py-2.5 rounded-xl text-center text-xs font-bold text-white bg-[#00B887] hover:bg-[#009E74] transition-all shadow-md shadow-emerald-500/25 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>+ Join Campaign</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Access Code Modal */}
      {accessCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0c1022] border border-purple-500/40 p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setAccessCodeModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">Enter Campaign Passcode</h3>
                <p className="text-xs text-slate-400">Unlock private brand campaigns & VIP CPM rates.</p>
              </div>
            </div>

            {accessCodeMsg && (
              <div className="p-3 rounded-xl bg-purple-950/70 border border-purple-700/50 text-xs text-white">
                {accessCodeMsg}
              </div>
            )}

            <form onSubmit={handleUnlockCode} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">VIP Access Code</label>
                <input
                  type="text"
                  value={accessCodeInput}
                  onChange={(e) => setAccessCodeInput(e.target.value)}
                  placeholder="e.g. VIP2026 or BRAND-ACCESS"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAccessCodeModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#00B887] hover:bg-[#009E74] transition-all shadow-md shadow-emerald-500/20"
                >
                  Unlock Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
