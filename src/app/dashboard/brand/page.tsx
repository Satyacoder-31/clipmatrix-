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
  Lock,
  Unlock,
  KeyRound,
  AlertCircle,
} from 'lucide-react';
import { formatNumber, getStatusBadge } from '@/lib/utils';
import Link from 'next/link';

export default function BrandOverviewPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessCode, setAccessCode] = useState('');
  const [unlocking, setUnlocking] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      fetch('/api/submissions').then((r) => r.json()),
      fetch('/api/campaigns').then((r) => r.json()),
    ])
      .then(([subData, campData]) => {
        if (subData.submissions) setSubmissions(subData.submissions);
        if (campData.campaigns) setCampaigns(campData.campaigns);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUnlockByCode = async (code: string, campaignId?: string) => {
    const clean = code.trim();
    if (!clean) {
      setFeedback({ type: 'error', message: 'Enter a valid campaign access code first.' });
      return;
    }

    setUnlocking(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/brand/unlock-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: clean, ...(campaignId ? { campaignId } : {}) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeedback({ type: 'error', message: data.error || 'Invalid access code.' });
      } else {
        setFeedback({
          type: 'success',
          message: `Analytics unlocked for "${data.campaignTitle}"!`,
        });
        setAccessCode('');
        loadData();
      }
    } catch {
      setFeedback({ type: 'error', message: 'Failed to verify access code.' });
    } finally {
      setUnlocking(false);
    }
  };

  const unlockedCampaigns = campaigns.filter((c) => c.isUnlocked);
  const totalVerifiedViews = unlockedCampaigns.reduce((acc, c) => acc + (c.verifiedViews || 0), 0);
  const totalTargetViews = unlockedCampaigns.reduce((acc, c) => acc + (c.targetViews || 0), 0);
  const completionPercent =
    totalTargetViews > 0 ? Math.min(100, Math.round((totalVerifiedViews / totalTargetViews) * 100)) : 0;

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
            View real-time verified views and social clips for campaigns unlocked with your access code.
          </p>
        </div>

        <Link
          href="/dashboard/brand/campaigns"
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-90 transition-all shadow-lg shadow-purple-600/25 flex items-center gap-2 self-start sm:self-auto cursor-pointer shrink-0"
        >
          <FolderKanban className="w-4 h-4" />
          <span>All Registered Campaigns ({campaigns.length})</span>
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
            <CheckCircle2 className="w-4 h-4 text-purple-400" /> Unlocked Campaigns
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {unlockedCampaigns.length} / {campaigns.length}
          </div>
          <div className="text-[10px] text-purple-300/70 font-mono">Registered by Admins</div>
        </div>
      </div>

      {/* Access Code Unlock Widget + Registered Campaign List */}
      <div className="rounded-2xl bg-[#140c26] border border-purple-900/50 p-6 space-y-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-purple-900/40">
          <div>
            <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-cyan-400" />
              <span>Registered Campaigns Directory</span>
            </h2>
            <p className="text-xs text-purple-300/70 mt-0.5">
              All campaigns registered by Admins appear below. Enter your campaign access code to check analytics.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUnlockByCode(accessCode);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
              placeholder="Enter access code (e.g. CLM-...)"
              className="px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-white placeholder-slate-500 text-xs font-mono uppercase focus:outline-none focus:border-cyan-400 w-52"
            />
            <button
              type="submit"
              disabled={unlocking}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
            >
              {unlocking ? 'Unlocking...' : 'Unlock'}
            </button>
          </form>
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
              feedback.type === 'success'
                ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                : 'bg-rose-500/15 border border-rose-500/40 text-rose-300'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {loading ? (
          <div className="py-8 text-center text-xs text-slate-400 font-mono">Loading campaigns...</div>
        ) : campaigns.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No campaigns have been registered yet. Once an Admin publishes a campaign, it will list here.
          </div>
        ) : (
          <div className="divide-y divide-purple-900/30 text-xs">
            {campaigns.map((camp) => (
              <div key={camp.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-sm">{camp.title}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.04] border border-white/10 text-purple-300">
                      {camp.industry}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold inline-flex items-center gap-1 ${
                        camp.isUnlocked
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {camp.isUnlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                      <span>{camp.isUnlocked ? 'Unlocked' : 'Code Required'}</span>
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Status: <span className="text-slate-200">{camp.status}</span> • Platforms:{' '}
                    <span className="text-slate-200">{camp.allowedPlatforms}</span>
                  </div>
                </div>

                {camp.isUnlocked ? (
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-cyan-400 text-sm font-mono">
                        {(camp.verifiedViews || 0).toLocaleString()} Views
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono">
                        {camp.completionPercent || 0}% of {(camp.targetViews || 0).toLocaleString()} target
                      </div>
                    </div>
                    <Link
                      href={`/dashboard/brand/submissions?campaignId=${camp.id}`}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 font-semibold transition-colors"
                    >
                      Analytics →
                    </Link>
                  </div>
                ) : (
                  <Link
                    href="/dashboard/brand/campaigns"
                    className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-amber-300 font-semibold text-xs self-start sm:self-auto"
                  >
                    Enter Code to Unlock →
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Live Social Media Posts & Creator Accounts Table */}
      <div className="rounded-2xl bg-[#140c26] border border-purple-900/50 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
          <div>
            <h2 className="text-base font-bold text-white font-display">Recent Live Social Media Posts</h2>
            <p className="text-xs text-purple-300/70">
              Live short-form content circulating across creator social accounts for your unlocked campaigns.
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
            <h4 className="text-sm font-bold text-white font-display">
              {unlockedCampaigns.length === 0 ? 'Unlock a Campaign to View Clips' : 'No Clips Submitted Yet'}
            </h4>
            <p className="text-xs text-purple-300/70 max-w-sm mx-auto">
              {unlockedCampaigns.length === 0
                ? 'Enter your campaign access code above to reveal verified creator accounts and video views.'
                : 'As clippers post reels and shorts for your unlocked campaigns, their social accounts and verified view counts will appear here.'}
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
