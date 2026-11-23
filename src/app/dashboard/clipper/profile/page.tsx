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

  // OAuth Setup Modals
  const [showGoogleSetupModal, setShowGoogleSetupModal] = useState(false);
  const [showMetaSetupModal, setShowMetaSetupModal] = useState(false);
  const [googleClientId, setGoogleClientId] = useState('');
  const [googleClientSecret, setGoogleClientSecret] = useState('');
  const [metaAppId, setMetaAppId] = useState('');
  const [metaAppSecret, setMetaAppSecret] = useState('');
  const [savingOAuthConfig, setSavingOAuthConfig] = useState(false);
  const [copiedRedirect, setCopiedRedirect] = useState(false);

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

    // Check search params on return from OAuth
    const connected = searchParams.get('connected');
    const handle = searchParams.get('handle');
    const error = searchParams.get('error');
    const setupGoogle = searchParams.get('setupGoogle');
    const setupMeta = searchParams.get('setupMeta');

    if (connected === 'youtube' && handle) {
      setToastMsg(`✅ Verified! Connected ${handle} with official YouTube Studio Analytics view access granted.`);
      setTimeout(() => setToastMsg(''), 6000);
    } else if (connected === 'instagram' && handle) {
      setToastMsg(`✅ Verified! Connected ${handle} with official Instagram Professional Insights view access granted.`);
      setTimeout(() => setToastMsg(''), 6000);
    } else if (error) {
      setToastMsg(`❌ Authentication notice: ${error}`);
      setTimeout(() => setToastMsg(''), 6000);
    }

    if (setupGoogle === 'true') {
      setShowGoogleSetupModal(true);
    } else if (setupMeta === 'true') {
      setShowMetaSetupModal(true);
    }
  }, [searchParams]);

  const handleOpenVerifyModal = (platName: string) => {
    setVerifyModalPlatform(platName);
    setNewHandleInput('');
    setGrantStudioViewAccess(true);
  };

  // Direct Redirect to Official Google Consent Screen
  const handleRedirectToGoogle = () => {
    window.location.href = '/api/auth/youtube';
  };

  // Direct Redirect to Official Meta / Instagram Consent Screen
  const handleRedirectToMeta = () => {
    window.location.href = '/api/auth/instagram';
  };

  // Save OAuth credentials & immediately proceed
  const handleSaveGoogleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleClientId.trim()) return;

    setSavingOAuthConfig(true);
    try {
      const res = await fetch('/api/auth/oauth-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          googleClientId: googleClientId.trim(),
          googleClientSecret: googleClientSecret.trim(),
        }),
      });

      if (res.ok) {
        setShowGoogleSetupModal(false);
        setToastMsg('⚡ Google Cloud credentials saved! Redirecting to Google account consent screen...');
        setTimeout(() => {
          window.location.href = '/api/auth/youtube';
        }, 1200);
      } else {
        setToastMsg('❌ Failed to save Google credentials');
      }
    } catch {
      setToastMsg('❌ An error occurred saving credentials');
    } finally {
      setSavingOAuthConfig(false);
    }
  };

  const handleCopyRedirectUri = (uri: string) => {
    navigator.clipboard.writeText(uri);
    setCopiedRedirect(true);
    setTimeout(() => setCopiedRedirect(false), 2000);
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

      {/* Main Link Channel Modal (With Direct Google/Meta OAuth Redirect) */}
      {verifyModalPlatform && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#0c1022] border border-cyan-500/40 p-6 sm:p-7 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setVerifyModalPlatform(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
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
                  Connect {verifyModalPlatform} & Grant View Access
                </h3>
                <p className="text-xs text-slate-400">
                  {verifyModalPlatform === 'YouTube'
                    ? 'Authenticate with Google to grant read-only YouTube Studio Analytics access.'
                    : verifyModalPlatform === 'Instagram'
                    ? 'Authenticate with Meta to grant read-only Instagram Insights access.'
                    : 'Link and verify your social handle.'}
                </p>
              </div>
            </div>

            {/* Direct Google OAuth Button for YouTube */}
            {verifyModalPlatform === 'YouTube' && (
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleRedirectToGoogle}
                  className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-lg shadow-white/10 hover:shadow-white/20 cursor-pointer"
                >
                  <GoogleIcon className="w-5 h-5" />
                  <span>Authorize with Google (YouTube Studio)</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-slate-600" />
                </button>

                <div className="p-4 rounded-2xl bg-[#131b33] border border-purple-500/30 space-y-2 text-xs">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>How it works:</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Clicking the button above redirects you to Google's official sign-in screen (<span className="text-cyan-300 font-mono">accounts.google.com</span>). Choose the Google account that manages your YouTube channel. ClipMatrix is granted read-only permission to view your Studio demographics.
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">OAuth Credentials not set?</span>
                    <button
                      type="button"
                      onClick={() => setShowGoogleSetupModal(true)}
                      className="text-cyan-400 hover:underline font-mono"
                    >
                      Configure GOOGLE_CLIENT_ID ⚙️
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Direct Meta OAuth Button for Instagram */}
            {verifyModalPlatform === 'Instagram' && (
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleRedirectToMeta}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-lg shadow-pink-500/20 cursor-pointer"
                >
                  <InstagramIcon className="w-5 h-5 text-white" />
                  <span>Authorize with Meta (Instagram Insights)</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-white/70" />
                </button>

                <div className="p-4 rounded-2xl bg-[#131b33] border border-purple-500/30 space-y-2 text-xs">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>How it works:</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Redirects to Meta Graph API login to authenticate your Instagram professional account and stream authentic audience demographics.
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Meta App not configured?</span>
                    <button
                      type="button"
                      onClick={() => setShowMetaSetupModal(true)}
                      className="text-pink-400 hover:underline font-mono"
                    >
                      Configure META_APP_ID ⚙️
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Other platforms: Manual Handle Linking */}
            {verifyModalPlatform !== 'YouTube' && verifyModalPlatform !== 'Instagram' && (
              <form onSubmit={handleRedirectToGoogle} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-300 font-semibold mb-1 block">
                    {verifyModalPlatform} Handle or Profile URL
                  </label>
                  <input
                    type="text"
                    required
                    value={newHandleInput}
                    onChange={(e) => setNewHandleInput(e.target.value)}
                    placeholder="@handle"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    autoFocus
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setVerifyModalPlatform(null)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setVerifyModalPlatform(null)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 transition-all cursor-pointer"
                  >
                    Link Account
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Google Cloud Console Credentials Setup Modal */}
      {showGoogleSetupModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-[#0e1428] border border-red-500/40 p-6 sm:p-8 space-y-5 shadow-2xl relative text-slate-200">
            <button
              onClick={() => setShowGoogleSetupModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="w-10 h-10 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
                <GoogleIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  Google Cloud OAuth Credentials Setup
                </h3>
                <p className="text-xs text-slate-400">
                  Required to redirect clippers directly to the Google Account consent screen.
                </p>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-3 text-xs bg-black/40 p-4 rounded-2xl border border-white/5">
              <div className="font-bold text-white flex items-center gap-2">
                <span>Setup Steps in Google Cloud Console:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                <li>
                  Go to{' '}
                  <a
                    href="https://console.cloud.google.com/apis/credentials"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 underline font-semibold inline-flex items-center gap-0.5"
                  >
                    Google Cloud Console Credentials <ExternalLink className="w-3 h-3 inline" />
                  </a>
                </li>
                <li>
                  Click <strong>Create Credentials</strong> → <strong>OAuth client ID</strong> → Select <strong>Web application</strong>.
                </li>
                <li>
                  Add this exact <strong>Authorized redirect URI</strong>:
                  <div className="mt-1 flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-white/10 font-mono text-[10px] text-cyan-300">
                    <span className="truncate flex-1">{youtubeCallbackUri}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyRedirectUri(youtubeCallbackUri)}
                      className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white shrink-0 cursor-pointer flex items-center gap-1"
                    >
                      {copiedRedirect ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedRedirect ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </li>
                <li>
                  Enable <strong>YouTube Data API v3</strong> and <strong>YouTube Analytics API</strong> under APIs & Services.
                </li>
              </ol>
            </div>

            {/* Credentials Input Form */}
            <form onSubmit={handleSaveGoogleCredentials} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">GOOGLE_CLIENT_ID</label>
                <input
                  type="text"
                  required
                  value={googleClientId}
                  onChange={(e) => setGoogleClientId(e.target.value)}
                  placeholder="e.g. 123456789-abcdef.apps.googleusercontent.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">GOOGLE_CLIENT_SECRET</label>
                <input
                  type="password"
                  required
                  value={googleClientSecret}
                  onChange={(e) => setGoogleClientSecret(e.target.value)}
                  placeholder="e.g. GOCSPX-abc123xyz..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGoogleSetupModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingOAuthConfig}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-600 via-purple-600 to-cyan-500 hover:opacity-90 transition-all cursor-pointer shadow-lg disabled:opacity-50 flex items-center gap-2"
                >
                  {savingOAuthConfig ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Saving & Connecting...</span>
                    </>
                  ) : (
                    <span>Save & Proceed to Google Sign-In</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Meta App Setup Modal */}
      {showMetaSetupModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-[#0e1428] border border-pink-500/40 p-6 sm:p-8 space-y-5 shadow-2xl relative text-slate-200">
            <button
              onClick={() => setShowMetaSetupModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="w-10 h-10 rounded-2xl bg-pink-600/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  Meta for Developers App Setup
                </h3>
                <p className="text-xs text-slate-400">
                  Required to redirect clippers directly to the Meta / Instagram login screen.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs bg-black/40 p-4 rounded-2xl border border-white/5">
              <div className="font-bold text-white">Setup in Meta for Developers:</div>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-[11px]">
                <li>
                  Go to{' '}
                  <a
                    href="https://developers.facebook.com/apps"
                    target="_blank"
                    rel="noreferrer"
                    className="text-pink-400 underline font-semibold"
                  >
                    Meta for Developers Apps
                  </a>
                </li>
                <li>Create an App with <strong>Instagram Graph API</strong> permissions.</li>
                <li>
                  Add this Valid OAuth Redirect URI:
                  <div className="mt-1 flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-white/10 font-mono text-[10px] text-pink-300">
                    <span className="truncate flex-1">{instagramCallbackUri}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyRedirectUri(instagramCallbackUri)}
                      className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white shrink-0 cursor-pointer"
                    >
                      {copiedRedirect ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </li>
              </ol>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await fetch('/api/auth/oauth-config', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ metaAppId, metaAppSecret }),
                });
                setShowMetaSetupModal(false);
                window.location.href = '/api/auth/instagram';
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">META_APP_ID</label>
                <input
                  type="text"
                  required
                  value={metaAppId}
                  onChange={(e) => setMetaAppId(e.target.value)}
                  placeholder="e.g. 123456789012345"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">META_APP_SECRET</label>
                <input
                  type="password"
                  required
                  value={metaAppSecret}
                  onChange={(e) => setMetaAppSecret(e.target.value)}
                  placeholder="e.g. abcdef123456789..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-pink-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMetaSetupModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 transition-all cursor-pointer shadow-lg"
                >
                  Save & Proceed to Meta Login
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
