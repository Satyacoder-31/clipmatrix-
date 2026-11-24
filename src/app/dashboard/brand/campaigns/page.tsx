'use client';

import React, { useState, useEffect } from 'react';
import { FolderKanban, ArrowUpRight, Eye, Sparkles, ExternalLink, Film } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import Link from 'next/link';

export default function BrandCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = () => {
    setLoading(true);
    fetch('/api/campaigns')
      .then((r) => r.json())
      .then((data) => {
        if (data.campaigns) setCampaigns(data.campaigns);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-2">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>CAMPAIGN DELIVERY TRACKER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Active Brand Campaigns & Reach
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
            Track live campaigns managed and posted by Clip Matrix Administrators. Monitor verified views and completion progress.
          </p>
        </div>

        <Link
          href="/dashboard/brand/submissions"
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-white/[0.05] hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Film className="w-4 h-4 text-cyan-400" />
          <span>View All Social Clips</span>
        </Link>
      </div>

      {loading ? (
        <div className="py-20 text-center text-xs text-slate-400 font-mono">
          Loading campaign tracking metrics...
        </div>
      ) : campaigns.length === 0 ? (
        <div className="rounded-3xl bg-gradient-to-b from-[#110e26]/90 via-[#0a0818]/95 to-[#060410] border border-purple-500/30 p-12 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
            <Sparkles className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">No Active Campaigns</h3>
          <p className="text-xs text-purple-200/70 max-w-sm mx-auto leading-relaxed">
            There are currently no active campaigns assigned to your brand. Contact your Clip Matrix Administrator to post and launch new video clipping campaigns.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((camp) => {
            const targetViews = camp.targetViews || 0;
            const verifiedViews = camp.verifiedViews || 0;
            const completionPercent = camp.completionPercent !== undefined
              ? camp.completionPercent
              : (targetViews > 0 ? Math.min(100, Math.round((verifiedViews / targetViews) * 100)) : 0);

            return (
              <div
                key={camp.id}
                className="p-6 rounded-3xl bg-gradient-to-b from-[#0f1322]/90 via-[#0a0d18]/95 to-[#060810] border border-white/[0.08] hover:border-purple-500/40 transition-all space-y-5 flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950/80 border border-purple-800/50 text-purple-300">
                      {camp.industry || 'Creator Economy'}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 ${
                        camp.status === 'ACTIVE'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : camp.status === 'COMPLETED'
                          ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${camp.status === 'ACTIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
                      <span>{camp.status}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display">{camp.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {camp.description}
                  </p>

                  {/* Views & Telemetry Grid - Zero Budget Numbers */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-slate-400">Target Views</div>
                      <div className="text-base font-bold text-white font-mono mt-0.5">
                        {formatNumber(targetViews)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase text-slate-400">Verified Views</div>
                      <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">
                        {formatNumber(verifiedViews)}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar: Campaign Completion */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Delivery Progress</span>
                      <span className="font-bold text-cyan-300">{completionPercent}% Delivered</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/[0.04] p-0.5 border border-white/5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                        style={{ width: `${completionPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-white/[0.06] text-xs">
                  <div className="text-[11px] text-slate-400 font-mono">
                    Platforms: <span className="text-white font-semibold">{camp.allowedPlatforms || 'INSTAGRAM,TIKTOK,YOUTUBE'}</span>
                  </div>

                  <Link
                    href={`/dashboard/brand/submissions?campaignId=${camp.id}`}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 group"
                  >
                    <span>View Social Clips</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
