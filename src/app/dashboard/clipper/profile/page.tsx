'use client';

import React, { useState, useEffect } from 'react';
import {
  User,
  CheckCircle2,
  Trash2,
  Plus,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  X,
  Check,
  Save,
  Wallet,
  BarChart3,
  Globe2,
  Users,
  Eye,
  Lock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

function InstagramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function YouTubeIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function XIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

interface ConnectedAccount {
  id: string;
  platform: 'Instagram' | 'TikTok' | 'YouTube' | 'X' | 'Facebook';
  handle: string;
  verified: boolean;
  addedAt: string;
  studioViewAccess?: boolean;
  accessScope?: string;
  adminAccessStatus?: 'ACTIVE' | 'PENDING' | 'REVOKED';
  demographics?: {
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

export default function ClipperProfilePage() {
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  const [verifyModalPlatform, setVerifyModalPlatform] = useState<string | null>(null);
  const [newHandleInput, setNewHandleInput] = useState('');
  const [grantStudioViewAccess, setGrantStudioViewAccess] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Demographics preview modal state
  const [inspectingAccount, setInspectingAccount] = useState<ConnectedAccount | null>(null);

  const [upiId, setUpiId] = useState('satya@okaxis');
  const [editingSoftware, setEditingSoftware] = useState('CapCut, Premiere Pro, After Effects');

  const platforms = [
    { name: 'Instagram', icon: InstagramIcon, color: 'text-pink-500', bg: 'hover:bg-pink-500/10' },
    { name: 'TikTok', icon: TikTokIcon, color: 'text-cyan-400', bg: 'hover:bg-cyan-500/10' },
    { name: 'YouTube', icon: YouTubeIcon, color: 'text-red-500', bg: 'hover:bg-red-500/10' },
    { name: 'X', icon: XIcon, color: 'text-white', bg: 'hover:bg-white/10' },
    { name: 'Facebook', icon: FacebookIcon, color: 'text-blue-500', bg: 'hover:bg-blue-500/10' },
  ];

  // Fetch connected accounts from API
  const fetchAccounts = () => {
    setLoadingAccounts(true);
    fetch('/api/clipper/accounts')
      .then((r) => r.json())
      .then((data) => {
        if (data.accounts) {
          setConnectedAccounts(data.accounts);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingAccounts(false));
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleOpenVerifyModal = (platName: string) => {
    setVerifyModalPlatform(platName);
    setNewHandleInput('');
    setGrantStudioViewAccess(true);
  };

  const handleVerifyAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHandleInput.trim() || !verifyModalPlatform) return;

    setVerifying(true);
    try {
      const res = await fetch('/api/clipper/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: verifyModalPlatform,
          handle: newHandleInput.trim(),
          grantStudioViewAccess,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setConnectedAccounts((prev) => [data.account, ...prev]);
        setToastMsg(data.message || `✅ Successfully linked ${verifyModalPlatform} account!`);
        setVerifyModalPlatform(null);
        setNewHandleInput('');
      } else {
        setToastMsg(`❌ ${data.error || 'Failed to verify account'}`);
      }
    } catch {
      setToastMsg('❌ An error occurred linking account');
    } finally {
      setVerifying(false);
      setTimeout(() => setToastMsg(''), 5000);
    }
  };

  const handleDeleteAccount = async (id: string, handle: string) => {
    if (confirm(`Unlink and revoke admin view access for ${handle}?`)) {
      try {
        await fetch(`/api/clipper/accounts?id=${id}`, { method: 'DELETE' });
        setConnectedAccounts((prev) => prev.filter((a) => a.id !== id));
        setToastMsg(`Revoked and removed ${handle}.`);
      } catch {
        setToastMsg('Failed to remove account.');
      } finally {
        setTimeout(() => setToastMsg(''), 3000);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Page Header */}
      <div className="pb-4 border-b border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Profile & Connected Accounts</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Connect your YouTube & Instagram channels with Studio view access so ClipMatrix Admin can track authentic demographics and approve instant CPM payouts.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-purple-500/10 border border-purple-500/30 text-purple-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin Studio Access: Active</span>
            </span>
          </div>
        </div>
      </div>

      {toastMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg('')} className="text-emerald-400 hover:text-white font-bold ml-2">
            ✕
          </button>
        </div>
      )}

      {/* Top Section: Social Accounts / Add New Account */}
      <div className="rounded-3xl bg-gradient-to-b from-[#0f1322]/90 via-[#0a0d18]/95 to-[#060810] border border-white/[0.08] p-6 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-cyan-300 font-display uppercase tracking-wider">
              Connect Creator Channel
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click a platform below to grant YT Studio or Instagram Insights read-only view access to Admin.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 self-start sm:self-auto">
            {connectedAccounts.length} Verified Channels
          </span>
        </div>

        {/* 5 Social Platform Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {platforms.map((p) => {
            const IconComponent = p.icon;
            const isYT = p.name === 'YouTube';
            const isIG = p.name === 'Instagram';

            return (
              <button
                key={p.name}
                type="button"
                onClick={() => handleOpenVerifyModal(p.name)}
                className="p-4 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-cyan-400/50 hover:from-purple-500/10 hover:to-cyan-500/10 transition-all flex flex-col items-center justify-center gap-2.5 group cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:-translate-y-0.5 relative"
              >
                {(isYT || isIG) && (
                  <span className="absolute top-2 right-2 text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Studio
                  </span>
                )}
                <div className={`p-2.5 rounded-xl bg-white/[0.05] ${p.color} group-hover:scale-110 transition-transform shadow-inner`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white">{p.name}</span>
                <span className="text-[10px] text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">+ Link & Grant</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Active Linked Creator Profiles */}
      <div className="rounded-3xl bg-gradient-to-b from-[#0f1322]/90 via-[#0a0d18]/95 to-[#060810] border border-white/[0.08] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <div>
            <h2 className="text-base font-bold text-white font-display">Active Linked Channels & View Permissions</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Admin tracks live demographics (country split, age, gender) and retention directly via these connections.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {connectedAccounts.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No accounts linked yet. Click YouTube or Instagram above to connect your channel.
            </div>
          ) : (
            connectedAccounts.map((acc) => {
              const platformMeta = platforms.find((p) => p.name === acc.platform);
              const IconComp = platformMeta ? platformMeta.icon : YouTubeIcon;
              const iconColor = platformMeta ? platformMeta.color : 'text-red-500';
              const isYT = acc.platform === 'YouTube';
              const isIG = acc.platform === 'Instagram';

              return (
                <div
                  key={acc.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <div className={`p-3 rounded-2xl bg-white/[0.04] ${iconColor} shrink-0 border border-white/5`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white font-display">{acc.platform}</span>
                        <span className="text-xs font-mono font-bold text-cyan-300 truncate">{acc.handle}</span>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Verified</span>
                        </div>
                      </div>

                      {/* Studio Analytics View Access Badge */}
                      <div className="flex flex-wrap items-center gap-2 text-[11px]">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono">
                          <Eye className="w-3 h-3 text-cyan-400" />
                          <span>
                            {isYT
                              ? 'YT Studio Analytics: View Access Active'
                              : isIG
                              ? 'Instagram Insights: View Access Active'
                              : 'Analytics View Access: Active'}
                          </span>
                        </span>

                        <span className="text-slate-400">•</span>
                        <span className="text-slate-400 text-[10px]">
                          Admin Scopes: <span className="font-mono text-slate-300">{isYT ? 'yt-analytics.readonly' : isIG ? 'instagram_manage_insights' : 'public'}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
                    {acc.demographics && (
                      <button
                        type="button"
                        onClick={() => setInspectingAccount(acc)}
                        className="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Inspect Shared Demographics</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDeleteAccount(acc.id, acc.handle)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer border border-transparent hover:border-rose-500/20"
                      title="Unlink and revoke access"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* UPI & Payout Channels Card */}
      <div className="p-6 rounded-3xl bg-[#0c1022] border border-white/[0.08] space-y-4 shadow-xl">
        <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
          <Wallet className="w-4 h-4 text-emerald-400" />
          <span>Payout & Bank Routing Settings</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Default UPI ID (for instant earnings withdrawal)</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Preferred Video Editing Suite</label>
            <input
              type="text"
              value={editingSoftware}
              onChange={(e) => setEditingSoftware(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Verify & Link Modal with Studio Analytics View Access Grant */}
      {verifyModalPlatform && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#0c1022] border border-cyan-500/40 p-6 sm:p-7 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setVerifyModalPlatform(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-inner">
                {verifyModalPlatform === 'YouTube' ? (
                  <YouTubeIcon className="w-6 h-6 text-red-500" />
                ) : verifyModalPlatform === 'Instagram' ? (
                  <InstagramIcon className="w-6 h-6 text-pink-500" />
                ) : (
                  <ShieldCheck className="w-6 h-6" />
                )}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  Link {verifyModalPlatform} & Grant Admin View Access
                </h3>
                <p className="text-xs text-slate-400">
                  Enables ClipMatrix Admin to track authentic demographics directly.
                </p>
              </div>
            </div>

            <form onSubmit={handleVerifyAccount} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">
                  {verifyModalPlatform} Handle or Channel URL
                </label>
                <input
                  type="text"
                  required
                  value={newHandleInput}
                  onChange={(e) => setNewHandleInput(e.target.value)}
                  placeholder={
                    verifyModalPlatform === 'YouTube'
                      ? '@mychannel or https://youtube.com/@channel'
                      : verifyModalPlatform === 'Instagram'
                      ? '@myreels_handle'
                      : '@handle'
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
              </div>

              {/* Explicit Admin View Access Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-[#131b33] to-[#0c1224] border border-purple-500/30 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-bold text-white">
                      {verifyModalPlatform === 'YouTube'
                        ? 'YouTube Studio Analytics View Access'
                        : verifyModalPlatform === 'Instagram'
                        ? 'Instagram Professional Insights View Access'
                        : 'Platform Analytics View Access'}
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={grantStudioViewAccess}
                      onChange={(e) => setGrantStudioViewAccess(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Grants ClipMatrix Admin read-only view permission (
                  <span className="font-mono text-cyan-300">
                    {verifyModalPlatform === 'YouTube' ? 'yt-analytics.readonly' : 'instagram_manage_insights'}
                  </span>
                  ) to track your live metrics without requesting creator login passwords:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                  <div className="flex items-center gap-1.5 bg-black/30 p-2 rounded-lg border border-white/5">
                    <Globe2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Audience Countries & Tier-1 %</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/30 p-2 rounded-lg border border-white/5">
                    <Users className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Age Brackets & Gender Ratio</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/30 p-2 rounded-lg border border-white/5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Retention Curve & Watch Time</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/30 p-2 rounded-lg border border-white/5">
                    <Lock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>Zero Edit Rights (View-Only)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setVerifyModalPlatform(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={verifying}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 transition-all shadow-lg shadow-purple-500/25 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {verifying ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Linking & Granting Access...</span>
                    </>
                  ) : (
                    <span>Confirm Link & Grant View Access</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Shared Demographics Modal */}
      {inspectingAccount && inspectingAccount.demographics && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-[#0c1022] border border-purple-500/40 p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setInspectingAccount(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    Shared {inspectingAccount.platform} Studio Demographics
                  </h3>
                  <div className="text-xs text-cyan-300 font-mono">
                    {inspectingAccount.handle} • Admin View Access: ACTIVE
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Live Studio Sync
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              These are the exact verified creator metrics shared with the ClipMatrix Admin to calculate your CPM payouts and verify audience quality:
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[10px] text-slate-400">Tier-1 Traffic</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                  {inspectingAccount.demographics.tier1Percent}%
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[10px] text-slate-400">Avg Retention</div>
                <div className="text-base font-bold text-cyan-300 font-mono mt-0.5">
                  {inspectingAccount.demographics.retentionRate}%
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[10px] text-slate-400">Private Shares</div>
                <div className="text-base font-bold text-purple-300 font-mono mt-0.5">
                  {inspectingAccount.demographics.sharesCount.toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[10px] text-slate-400">Total Reach</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">
                  {inspectingAccount.demographics.reachCount.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Geographic Breakdown */}
            <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-xs font-bold text-white flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Geographic Distribution (Studio Telemetry)</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  {inspectingAccount.demographics.tier1Percent}% Tier-1 Qualified
                </span>
              </div>
              <div className="space-y-1.5 pt-1">
                {inspectingAccount.demographics.topCountries.map((c) => (
                  <div key={c.country} className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span>{c.country}</span>
                      {c.isTier1 && <span className="text-[9px] text-cyan-300 font-mono font-bold bg-cyan-500/10 px-1 rounded">★ Tier-1</span>}
                    </span>
                    <span className="font-mono font-bold text-white">{c.percent}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-purple-400" /> Age Brackets
                </span>
                <div className="space-y-1 font-mono text-[11px] text-slate-300">
                  {inspectingAccount.demographics.ageGroups.map((ag) => (
                    <div key={ag.group} className="flex justify-between">
                      <span>{ag.group}:</span>
                      <span className="text-white font-bold">{ag.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5 flex flex-col justify-between">
                <span className="font-bold text-slate-300">Gender Ratio</span>
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-cyan-300">♂ Male</span>
                    <span className="text-white font-bold">{inspectingAccount.demographics.gender.male}%</span>
                  </div>
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-pink-300">♀ Female</span>
                    <span className="text-white font-bold">{inspectingAccount.demographics.gender.female}%</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Avg Duration: {inspectingAccount.demographics.avgWatchDuration}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setInspectingAccount(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
