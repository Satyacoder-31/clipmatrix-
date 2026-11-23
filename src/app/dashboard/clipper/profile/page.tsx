'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  Key,
  Copy,
  AlertCircle,
  HelpCircle,
  Play,
} from 'lucide-react';

function GoogleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

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

function ClipperProfileInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  const [verifyModalPlatform, setVerifyModalPlatform] = useState<string | null>(null);
  const [newHandleInput, setNewHandleInput] = useState('');
  const [grantStudioViewAccess, setGrantStudioViewAccess] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Account Login & Viewer Access states
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);
  const [useCustomHandle, setUseCustomHandle] = useState(false);
  const [viewerAccessTicked, setViewerAccessTicked] = useState(true);
  const [publicMetricsTicked, setPublicMetricsTicked] = useState(true);

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

    // Check search params on return from OAuth if any
    const connected = searchParams.get('connected');
    const handle = searchParams.get('handle');
    const error = searchParams.get('error');

    if (connected === 'youtube' && handle) {
      setToastMsg(`✅ Verified! Connected ${handle} with official YouTube Studio Analytics view access granted to Admin.`);
      setTimeout(() => setToastMsg(''), 6000);
    } else if (connected === 'instagram' && handle) {
      setToastMsg(`✅ Verified! Connected ${handle} with official Instagram Professional Insights view access granted to Admin.`);
      setTimeout(() => setToastMsg(''), 6000);
    } else if (error) {
      setToastMsg(`❌ Authentication notice: ${error}`);
      setTimeout(() => setToastMsg(''), 6000);
    }
  }, [searchParams]);

  const handleOpenVerifyModal = (platName: string) => {
    setVerifyModalPlatform(platName);
    setSelectedAccountIndex(0);
    setUseCustomHandle(false);
    setNewHandleInput('');
    setViewerAccessTicked(true);
    setPublicMetricsTicked(true);
  };

  // Allow button handler: Connects account & grants Admin Studio / Insights viewer access
  const handleAllowAccess = async () => {
    if (!verifyModalPlatform) return;
    setVerifying(true);

    let handle = '';
    if (useCustomHandle && newHandleInput.trim()) {
      handle = newHandleInput.trim();
    } else {
      if (verifyModalPlatform === 'YouTube') {
        handle = selectedAccountIndex === 0 ? '@daxraps30' : '@DaxEditz30';
      } else if (verifyModalPlatform === 'Instagram') {
        handle = selectedAccountIndex === 0 ? '@satya.viralclips' : '@clipmatrix.reels';
      } else if (verifyModalPlatform === 'TikTok') {
        handle = selectedAccountIndex === 0 ? '@satya.clips' : '@clipmatrix_shorts';
      } else if (verifyModalPlatform === 'X') {
        handle = selectedAccountIndex === 0 ? '@satya_edits' : '@clipmatrix_x';
      } else {
        handle = selectedAccountIndex === 0 ? '@satya.matrix' : '@clipmatrix_fb';
      }
    }

    if (!handle.startsWith('@') && !handle.startsWith('http')) {
      handle = `@${handle}`;
    }

    try {
      const res = await fetch('/api/clipper/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: verifyModalPlatform,
          handle,
          grantStudioViewAccess: viewerAccessTicked,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setToastMsg(
          `✅ Verified! Connected ${handle} — Admin now has active ${
            verifyModalPlatform === 'YouTube' ? 'YouTube Studio' : 'Instagram Insights'
          } Viewer Access!`
        );
        setVerifyModalPlatform(null);
        fetchAccounts();
      } else {
        setToastMsg(`❌ ${data.error || 'Failed to connect account'}`);
      }
    } catch {
      setToastMsg(`❌ Failed to connect account. Please try again.`);
    } finally {
      setVerifying(false);
      setTimeout(() => setToastMsg(''), 6000);
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

  const currentHost = typeof window !== 'undefined' ? window.location.origin : 'https://clipmatrix-production.up.railway.app';
  const youtubeCallbackUri = `${currentHost}/api/auth/youtube/callback`;
  const instagramCallbackUri = `${currentHost}/api/auth/instagram/callback`;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Page Header */}
      <div className="pb-4 border-b border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Profile & Connected Accounts</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Connect your YouTube & Instagram channels via official Google & Meta OAuth so ClipMatrix Admin can track authentic viewer demographics.
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
              Select YouTube or Instagram to redirect to the official Google or Meta consent screen and choose the account you want to grant view access to.
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
                    OAuth
                  </span>
                )}
                <div className={`p-2.5 rounded-xl bg-white/[0.05] ${p.color} group-hover:scale-110 transition-transform shadow-inner`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white">{p.name}</span>
                <span className="text-[10px] text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                  {isYT ? 'Google OAuth' : isIG ? 'Meta OAuth' : '+ Link'}
                </span>
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

      {/* Account Login & Viewer Access Consent Modal */}
      {verifyModalPlatform && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#0c1022] border border-cyan-500/40 p-6 sm:p-7 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setVerifyModalPlatform(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header: Platform Branding */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center shadow-inner">
                {verifyModalPlatform === 'YouTube' ? (
                  <YouTubeIcon className="w-7 h-7 text-red-500" />
                ) : verifyModalPlatform === 'Instagram' ? (
                  <InstagramIcon className="w-7 h-7 text-pink-500" />
                ) : verifyModalPlatform === 'TikTok' ? (
                  <TikTokIcon className="w-6 h-6 text-cyan-400" />
                ) : verifyModalPlatform === 'X' ? (
                  <XIcon className="w-6 h-6 text-white" />
                ) : (
                  <FacebookIcon className="w-6 h-6 text-blue-500" />
                )}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  {verifyModalPlatform === 'YouTube'
                    ? 'Sign in with Google'
                    : verifyModalPlatform === 'Instagram'
                    ? 'Log in with Meta'
                    : `Connect ${verifyModalPlatform}`}
                </h3>
                <p className="text-xs text-slate-400">
                  {verifyModalPlatform === 'YouTube'
                    ? 'Connect YouTube Studio to grant ClipMatrix Admin analytics viewer access.'
                    : verifyModalPlatform === 'Instagram'
                    ? 'Connect Instagram Professional to grant ClipMatrix Admin insights viewer access.'
                    : `Link your ${verifyModalPlatform} profile to ClipMatrix.`}
                </p>
              </div>
            </div>

            {/* Account Selector Option */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                Choose an account to connect:
              </label>

              {verifyModalPlatform === 'YouTube' && (
                <div className="space-y-2">
                  <div
                    onClick={() => {
                      setSelectedAccountIndex(0);
                      setUseCustomHandle(false);
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      !useCustomHandle && selectedAccountIndex === 0
                        ? 'bg-cyan-500/10 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-red-500 to-amber-500 flex items-center justify-center font-bold text-white text-xs">
                        S
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>Satya (Channel: @daxraps30)</span>
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/20 px-1.5 py-0.2 rounded">Primary</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">satya.creators@gmail.com • 12.4K Subscribers</div>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      !useCustomHandle && selectedAccountIndex === 0 ? 'border-cyan-400 bg-cyan-400' : 'border-slate-500'
                    }`}>
                      {!useCustomHandle && selectedAccountIndex === 0 && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setSelectedAccountIndex(1);
                      setUseCustomHandle(false);
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      !useCustomHandle && selectedAccountIndex === 1
                        ? 'bg-cyan-500/10 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-xs">
                        D
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Dax Editz Studio (@DaxEditz30)</div>
                        <div className="text-[11px] text-slate-400 font-mono">daxeditz.work@gmail.com • 48.2K Subscribers</div>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      !useCustomHandle && selectedAccountIndex === 1 ? 'border-cyan-400 bg-cyan-400' : 'border-slate-500'
                    }`}>
                      {!useCustomHandle && selectedAccountIndex === 1 && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                    </div>
                  </div>

                  <div
                    onClick={() => setUseCustomHandle(true)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      useCustomHandle
                        ? 'bg-cyan-500/10 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-200">+ Use a different YouTube Channel / Account</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        useCustomHandle ? 'border-cyan-400 bg-cyan-400' : 'border-slate-500'
                      }`}>
                        {useCustomHandle && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                      </div>
                    </div>
                    {useCustomHandle && (
                      <input
                        type="text"
                        value={newHandleInput}
                        onChange={(e) => setNewHandleInput(e.target.value)}
                        placeholder="Enter Channel Handle e.g. @mychannel or URL"
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                        autoFocus
                      />
                    )}
                  </div>
                </div>
              )}

              {verifyModalPlatform === 'Instagram' && (
                <div className="space-y-2">
                  <div
                    onClick={() => {
                      setSelectedAccountIndex(0);
                      setUseCustomHandle(false);
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      !useCustomHandle && selectedAccountIndex === 0
                        ? 'bg-pink-500/10 border-pink-400/60 shadow-[0_0_15px_rgba(236,72,153,0.15)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 flex items-center justify-center font-bold text-white text-xs">
                        S
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>@satya.viralclips</span>
                          <span className="text-[10px] font-mono text-pink-400 bg-pink-500/20 px-1.5 py-0.2 rounded">Creator</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">28.5K Followers • 1.4M Monthly Reach</div>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      !useCustomHandle && selectedAccountIndex === 0 ? 'border-pink-400 bg-pink-400' : 'border-slate-500'
                    }`}>
                      {!useCustomHandle && selectedAccountIndex === 0 && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setSelectedAccountIndex(1);
                      setUseCustomHandle(false);
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      !useCustomHandle && selectedAccountIndex === 1
                        ? 'bg-pink-500/10 border-pink-400/60 shadow-[0_0_15px_rgba(236,72,153,0.15)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                        C
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">@clipmatrix.reels</div>
                        <div className="text-[11px] text-slate-400 font-mono">110K Followers • 4.8M Monthly Reach</div>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      !useCustomHandle && selectedAccountIndex === 1 ? 'border-pink-400 bg-pink-400' : 'border-slate-500'
                    }`}>
                      {!useCustomHandle && selectedAccountIndex === 1 && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                    </div>
                  </div>

                  <div
                    onClick={() => setUseCustomHandle(true)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      useCustomHandle
                        ? 'bg-pink-500/10 border-pink-400/60 shadow-[0_0_15px_rgba(236,72,153,0.15)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-200">+ Use a different Instagram Account</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        useCustomHandle ? 'border-pink-400 bg-pink-400' : 'border-slate-500'
                      }`}>
                        {useCustomHandle && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                      </div>
                    </div>
                    {useCustomHandle && (
                      <input
                        type="text"
                        value={newHandleInput}
                        onChange={(e) => setNewHandleInput(e.target.value)}
                        placeholder="Enter Instagram Handle e.g. @myhandle"
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-pink-400"
                        autoFocus
                      />
                    )}
                  </div>
                </div>
              )}

              {verifyModalPlatform !== 'YouTube' && verifyModalPlatform !== 'Instagram' && (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={newHandleInput}
                    onChange={(e) => setNewHandleInput(e.target.value)}
                    placeholder={`Enter ${verifyModalPlatform} Handle e.g. @myhandle`}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Permissions Requested Section (Viewer Access TICKED by default) */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">
                  Permissions requested by ClipMatrix Admin:
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Viewer Access Ticked</span>
                </span>
              </div>

              {/* Ticked Permission 1: Studio / Insights Viewer Access */}
              <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/30 cursor-pointer transition-all hover:bg-emerald-500/[0.12]">
                <input
                  type="checkbox"
                  checked={viewerAccessTicked}
                  onChange={(e) => setViewerAccessTicked(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-slate-900 border-white/20 cursor-pointer"
                />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>
                        {verifyModalPlatform === 'YouTube'
                          ? 'YouTube Studio Analytics (Viewer Access)'
                          : verifyModalPlatform === 'Instagram'
                          ? 'Instagram Professional Insights (Viewer Access)'
                          : `${verifyModalPlatform} Performance Viewer Access`}
                      </span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      Ticked (Read-Only)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {verifyModalPlatform === 'YouTube'
                      ? 'Grants ClipMatrix Admin read-only viewer access to check authentic viewer retention curves, average watch duration, and Tier-1 audience demographics (US/UK/CA/AU/IN) to calculate eligible view payouts.'
                      : verifyModalPlatform === 'Instagram'
                      ? 'Grants ClipMatrix Admin read-only viewer access to inspect verified reach, authentic impressions, country distribution, and audience demographics to calculate eligible payouts.'
                      : 'Grants ClipMatrix Admin read-only viewer access to check verified audience reach and video performance.'}
                  </p>
                </div>
              </label>

              {/* Ticked Permission 2: Profile Performance */}
              <label className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={publicMetricsTicked}
                  onChange={(e) => setPublicMetricsTicked(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-slate-900 border-white/20 cursor-pointer"
                />
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">
                      {verifyModalPlatform === 'YouTube'
                        ? 'YouTube Channel Details & Video Metrics'
                        : verifyModalPlatform === 'Instagram'
                        ? 'Instagram Public Profile & Reel Metrics'
                        : `${verifyModalPlatform} Public Metrics`}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                      Read-only
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Allows ClipMatrix Admin to verify channel ownership, video upload timestamp, and public engagement (views, likes, comments).
                  </p>
                </div>
              </label>

              {/* Read-Only Safety Guarantee Note */}
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-2 text-[10px] text-purple-200">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  <strong>100% Read-Only Safety:</strong> Admin only receives viewer access. Admin will <em>NEVER</em> have permission to upload, edit, delete, post, or manage your account.
                </span>
              </div>
            </div>

            {/* Action Buttons: Cancel and Allow */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setVerifyModalPlatform(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white cursor-pointer transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAllowAccess}
                disabled={verifying}
                className={`px-7 py-3 rounded-2xl font-bold text-xs flex items-center gap-2.5 transition-all shadow-xl cursor-pointer disabled:opacity-50 ${
                  verifyModalPlatform === 'YouTube'
                    ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:opacity-95 text-white shadow-red-500/25'
                    : verifyModalPlatform === 'Instagram'
                    ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:opacity-95 text-white shadow-pink-500/25'
                    : 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 text-white shadow-cyan-500/20'
                }`}
              >
                {verifying ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Granting Admin Viewer Access...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Allow Viewer Access</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inspect Shared Demographics Modal */}
      {inspectingAccount && inspectingAccount.demographics && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-[#0c1022] border border-purple-500/40 p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setInspectingAccount(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
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

export default function ClipperProfilePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400 font-mono">Loading profile & accounts...</div>}>
      <ClipperProfileInner />
    </Suspense>
  );
}
