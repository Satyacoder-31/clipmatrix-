'use client';

import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  Eye,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  FolderKanban,
  Sparkles,
  Share2,
} from 'lucide-react';
import { formatNumber, getStatusBadge } from '@/lib/utils';
import Link from 'next/link';

export default function BrandOverviewPage() {
  const [user, setUser] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/me').then((r) => r.json()),
      fetch('/api/submissions').then((r) => r.json()),
      fetch('/api/campaigns').then((r) => r.json()),
    ])
      .then(([userData, subData, campData]) => {
        if (userData.user) setUser(userData.user);
        if (subData.submissions) setSubmissions(subData.submissions);
        if (campData.campaigns) setCampaigns(campData.campaigns);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalVerifiedViews = submissions.reduce((acc, s) => acc + (s.verifiedViews || 0), 0);
  const totalTargetViews = campaigns.reduce((acc, c) => acc + (c.targetViews || 0), 0);
  const completionPercent = totalTargetViews > 0
    ? Math.min(100, Math.round((totalVerifiedViews / totalTargetViews) * 100))
    : (campaigns.length > 0 ? 0 : 0);

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BRAND AUDIT TELEMETRY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Campaign Reach & Performance Analytics
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
            Real-time verified views, video clips, and creator social distribution across your campaigns.
          </p>
        </div>

        <Link
          href="/dashboard/brand/campaigns"
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-90 transition-all shadow-lg shadow-purple-600/25 flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <FolderKanban className="w-4 h-4" />
          <span>Track Campaigns</span>
        </Link>
      </div>

      {/* KPI Cards - Zero Budget / Currency, Focused on Views & Reach */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-1">
          <div className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-cyan-400" /> Total Verified Views
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display">
            {formatNumber(totalVerifiedViews ?? 0)}
          </div>
          <div className="text-[10px] text-cyan-300/70 font-mono">Organic Audited Views</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-1">
          <div className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> Campaign Completion
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">
            {completionPercent}%
          </div>
          <div className="text-[10px] text-emerald-300/70 font-mono">
            {totalVerifiedViews.toLocaleString()} / {(totalTargetViews || 0).toLocaleString()} Views
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-1">
          <div className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
            <Share2 className="w-4 h-4 text-pink-400" /> Viral Social Clips
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {submissions.length} Clips
          </div>
          <div className="text-[10px] text-pink-300/70 font-mono">Circulating on Feeds</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-1">
          <div className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400" /> Active Campaigns
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {campaigns.length} Briefs
          </div>
          <div className="text-[10px] text-purple-300/70 font-mono">Managed by Clip Matrix Admins</div>
        </div>
      </div>

      {/* Live Social Media Posts & Creator Accounts Table */}
      <div className="rounded-2xl bg-[#140c26] border border-purple-900/50 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
          <div>
            <h2 className="text-base font-bold text-white font-display">Recent Live Social Media Posts</h2>
            <p className="text-xs text-purple-300/70">
              Live short-form content circulating across creator social accounts.
            </p>
          </div>
          <Link
            href="/dashboard/brand/submissions"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
          >
            <span>View All Social Clips</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400 font-mono">
            Loading live social metrics...
          </div>
        ) : submissions.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Share2 className="w-8 h-8 text-purple-400 mx-auto opacity-50" />
            <h4 className="text-sm font-bold text-white font-display">No Clips Submitted Yet</h4>
            <p className="text-xs text-purple-300/70 max-w-sm mx-auto">
              As clippers post reels and shorts for your active briefs, their social accounts and verified view counts will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-purple-900/30 text-xs">
            {submissions.slice(0, 6).map((sub) => {
              const badge = getStatusBadge(sub.status);
              return (
                <div key={sub.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-purple-400">{sub.submissionNumber}</span>
                      <span className="text-purple-400">•</span>
                      <span className="font-bold text-white">{sub.title}</span>
                    </div>
                    <div className="text-purple-300/70 text-[11px] flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-cyan-300 font-mono">
                        Account: {sub.clipperAccount || '@creator'}
                      </span>
                      <span>•</span>
                      <span className="text-purple-300 font-semibold">{sub.platform}</span>
                      <span>•</span>
                      <a
                        href={sub.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 hover:underline inline-flex items-center gap-1 font-semibold"
                      >
                        <span>Watch Post</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-white text-sm font-mono">
                        {(sub.verifiedViews || 0).toLocaleString()} Views
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono">Verified Reach</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${badge.classes}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
