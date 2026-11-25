'use client';

import React, { useState, useEffect } from 'react';
import {
  FolderKanban,
  ArrowUpRight,
  Sparkles,
  Film,
  Lock,
  Unlock,
  KeyRound,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import Link from 'next/link';

export default function BrandCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTab, setFilterTab] = useState<'ALL' | 'UNLOCKED' | 'LOCKED'>('ALL');
  const [globalCode, setGlobalCode] = useState('');
  const [cardCodes, setCardCodes] = useState<Record<string, string>>({});
  const [unlockingId, setUnlockingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

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

  const handleUnlock = async (code: string, campaignId?: string) => {
    const clean = code.trim();
    if (!clean) {
      setFeedback({ type: 'error', message: 'Please enter the campaign access code provided by Admin.' });
      return;
    }

    setUnlockingId(campaignId || 'GLOBAL');
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
          message: `Unlocked analytics for "${data.campaignTitle}"!`,
        });
        if (campaignId) {
          setCardCodes((prev) => ({ ...prev, [campaignId]: '' }));
        } else {
          setGlobalCode('');
        }
        fetchCampaigns();
      }
    } catch {
      setFeedback({ type: 'error', message: 'Failed to verify access code.' });
    } finally {
      setUnlockingId(null);
    }
  };

  const handleLock = async (campaignId: string, title: string) => {
    try {
      const res = await fetch(`/api/brand/unlock-campaign?campaignId=${encodeURIComponent(campaignId)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: `Locked analytics view for "${title}".` });
        fetchCampaigns();
      }
    } catch {}
  };

  const unlockedCount = campaigns.filter((c) => c.isUnlocked).length;
  const lockedCount = campaigns.filter((c) => !c.isUnlocked).length;

  const displayed = campaigns.filter((c) => {
    if (filterTab === 'UNLOCKED') return c.isUnlocked;
    if (filterTab === 'LOCKED') return !c.isUnlocked;
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-2">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>REGISTERED CAMPAIGNS DIRECTORY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            All Registered Campaigns & Code Access
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
            Browse all campaigns posted by Clip Matrix Admins and enter your campaign access code to unlock live analytics.
          </p>
        </div>

        <Link
          href="/dashboard/brand/submissions"
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-white/[0.05] hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer shrink-0"
        >
          <Film className="w-4 h-4 text-cyan-400" />
          <span>View Social Clips</span>
        </Link>
      </div>

      {/* Quick Access Code Unlock Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUnlock(globalCode);
        }}
        className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/50 via-[#120b2a] to-cyan-950/30 border border-purple-500/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Unlock Campaign Analytics with Code</div>
            <div className="text-[11px] text-slate-400">
              Enter the unique access code shared by your Admin to view reach & clip accounts.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={globalCode}
            onChange={(e) => setGlobalCode(e.target.value.toUpperCase())}
            placeholder="e.g. CLM-4829"
            className="flex-1 sm:w-44 px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder-slate-500 text-xs font-mono uppercase focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            disabled={unlockingId === 'GLOBAL'}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>{unlockingId === 'GLOBAL' ? 'Checking...' : 'Unlock'}</span>
          </button>
        </div>
      </form>

      {feedback && (
        <div
          className={`p-3.5 rounded-2xl text-xs font-medium flex items-center justify-between gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
              : 'bg-rose-500/15 border border-rose-500/40 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button type="button" onClick={() => setFeedback(null)} className="font-bold hover:text-white cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      {campaigns.length > 0 && (
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setFilterTab('ALL')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              filterTab === 'ALL'
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow'
                : 'bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.06]'
            }`}
          >
            All Registered ({campaigns.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab('UNLOCKED')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              filterTab === 'UNLOCKED'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.06]'
            }`}
          >
            Unlocked ({unlockedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab('LOCKED')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              filterTab === 'LOCKED'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.06]'
            }`}
          >
            Locked ({lockedCount})
          </button>
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-xs text-slate-400 font-mono">
          Loading registered campaigns...
        </div>
      ) : displayed.length === 0 ? (
        <div className="rounded-3xl bg-gradient-to-b from-[#110e26]/90 via-[#0a0818]/95 to-[#060410] border border-purple-500/30 p-12 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
            <Sparkles className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">No Campaigns Registered Yet</h3>
          <p className="text-xs text-purple-200/70 max-w-sm mx-auto leading-relaxed">
            Once an Admin registers a new campaign, it will appear in this directory so you can unlock your campaign analytics with your access code.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayed.map((camp) => {
            if (!camp.isUnlocked) {
              const codeVal = cardCodes[camp.id] || '';
              return (
                <div
                  key={camp.id}
                  className="p-6 rounded-3xl bg-gradient-to-b from-[#0f1322]/90 via-[#0a0d18]/95 to-[#060810] border border-white/[0.08] hover:border-amber-500/35 transition-all space-y-5 flex flex-col justify-between shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950/80 border border-purple-800/50 text-purple-300">
                        {camp.industry || 'Creator Economy'}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>LOCKED</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white font-display">{camp.title}</h3>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-dashed border-white/15 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <KeyRound className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Enter the access code for this campaign to view its live view analytics and clips.</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={codeVal}
                          onChange={(e) =>
                            setCardCodes((prev) => ({ ...prev, [camp.id]: e.target.value.toUpperCase() }))
                          }
                          placeholder="Enter access code..."
                          className="flex-1 px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white placeholder-slate-500 text-xs font-mono uppercase focus:outline-none focus:border-cyan-400"
                        />
                        <button
                          type="button"
                          disabled={unlockingId === camp.id}
                          onClick={() => handleUnlock(codeVal, camp.id)}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 shrink-0"
                        >
                          {unlockingId === camp.id ? 'Verifying...' : 'Unlock Analytics'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between border-t border-white/[0.06] text-xs">
                    <div className="text-[11px] text-slate-400 font-mono">
                      Platforms: <span className="text-white font-semibold">{camp.allowedPlatforms || 'INSTAGRAM,TIKTOK,YOUTUBE'}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">Status: {camp.status}</span>
                  </div>
                </div>
              );
            }

            const targetViews = camp.targetViews || 0;
            const verifiedViews = camp.verifiedViews || 0;
            const completionPercent =
              camp.completionPercent !== undefined && camp.completionPercent !== null
                ? camp.completionPercent
                : targetViews > 0
                ? Math.min(100, Math.round((verifiedViews / targetViews) * 100))
                : 0;

            return (
              <div
                key={camp.id}
                className="p-6 rounded-3xl bg-gradient-to-b from-[#0f1322]/90 via-[#0a0d18]/95 to-[#060810] border border-cyan-500/30 hover:border-cyan-400/60 transition-all space-y-5 flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950/80 border border-purple-800/50 text-purple-300">
                        {camp.industry || 'Creator Economy'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <Unlock className="w-3 h-3" />
                        <span>UNLOCKED</span>
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 ${
                        camp.status === 'ACTIVE'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : camp.status === 'COMPLETED'
                          ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          camp.status === 'ACTIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'
                        }`}
                      />
                      <span>{camp.status}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display">{camp.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{camp.description}</p>

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
                  <button
                    type="button"
                    onClick={() => handleLock(camp.id, camp.title)}
                    className="text-[11px] font-mono text-slate-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Lock Campaign</span>
                  </button>

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
