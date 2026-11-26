'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  CheckCircle2,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  X,
  Check,
  Save,
  Wallet,
  ArrowRight,
  Smartphone,
  Layers,
  Edit3,
  Film,
  Calendar,
  Globe2,
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
}

function ClipperProfileInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  // Clipper Details states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const [editingSoftware, setEditingSoftware] = useState('CapCut, Premiere Pro');
  const [experienceYears, setExperienceYears] = useState('1-3 years');
  const [clipperLevel, setClipperLevel] = useState('CLIPPER');
  const [approvedViews, setApprovedViews] = useState(0);
  const [tierInfo, setTierInfo] = useState<{
    code: string;
    label: string;
    minViews: number;
    badgeColor: string;
    nextTier: string | null;
    viewsNeeded: number;
  } | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  // Modal state for linking other accounts
  const [verifyModalPlatform, setVerifyModalPlatform] = useState<string | null>(null);
  const [newHandleInput, setNewHandleInput] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const platforms = [
    { name: 'Instagram', icon: InstagramIcon, color: 'text-pink-500', bg: 'hover:bg-pink-500/10' },
    { name: 'YouTube', icon: YouTubeIcon, color: 'text-red-500', bg: 'hover:bg-red-500/10' },
    { name: 'TikTok', icon: TikTokIcon, color: 'text-cyan-400', bg: 'hover:bg-cyan-500/10' },
    { name: 'X', icon: XIcon, color: 'text-white', bg: 'hover:bg-white/10' },
    { name: 'Facebook', icon: FacebookIcon, color: 'text-blue-500', bg: 'hover:bg-blue-500/10' },
  ];

  // Fetch connected accounts and user profile
  const fetchProfileAndAccounts = async () => {
    try {
      setLoadingAccounts(true);
      const [accRes, meRes] = await Promise.all([
        fetch('/api/clipper/accounts'),
        fetch('/api/auth/me'),
      ]);

      const accData = await accRes.json();
      if (accData.accounts) {
        setConnectedAccounts(accData.accounts);
      }

      const meData = await meRes.json();
      if (meData.user) {
        setName(meData.user.name || '');
        setEmail(meData.user.email || '');
        setPhone(meData.user.phone || '');
        setAvatar(meData.user.avatar || '');
        if (meData.user.clipperProfile) {
          setEditingSoftware(meData.user.clipperProfile.editingSoftware || 'CapCut, Premiere Pro');
          setExperienceYears(meData.user.clipperProfile.experienceYears || '1-3 years');
          setClipperLevel(meData.user.clipperProfile.level || 'CLIPPER');
          setApprovedViews(meData.user.clipperProfile.approvedViews || 0);
          setTierInfo(meData.user.clipperProfile.tierInfo || null);
        }
      }
    } catch {
      // Fallback
    } finally {
      setLoadingAccounts(false);
    }
  };

  useEffect(() => {
    fetchProfileAndAccounts();

    // Check search params on return from OAuth if any
    const connected = searchParams.get('connected');
    const handle = searchParams.get('handle');
    const error = searchParams.get('error');

    if (connected === 'youtube' && handle) {
      setToastMsg(`✅ Verified! Connected ${handle} with official YouTube Channel access.`);
      setTimeout(() => setToastMsg(''), 6000);
    } else if (connected === 'instagram' && handle) {
      setToastMsg(`✅ Verified! Connected ${handle} with official Instagram Profile access.`);
      setTimeout(() => setToastMsg(''), 6000);
    } else if (error) {
      setToastMsg(`❌ Authentication notice: ${error}`);
      setTimeout(() => setToastMsg(''), 6000);
    }
  }, [searchParams]);

  const handleOpenVerifyModal = (platName: string) => {
    if (platName === 'YouTube') {
      window.location.href = '/api/auth/youtube';
      return;
    }
    if (platName === 'Instagram') {
      window.location.href = '/api/auth/instagram';
      return;
    }

    setVerifyModalPlatform(platName);
    setNewHandleInput('');
  };

  const handleAllowAccess = async () => {
    if (!verifyModalPlatform) return;
    const trimmed = newHandleInput.trim();
    if (!trimmed) {
      setToastMsg('❌ Please enter a valid handle or username');
      return;
    }
    setVerifying(true);

    let handle = trimmed;
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
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setToastMsg(`✅ Connected ${handle} (${verifyModalPlatform})`);
        setVerifyModalPlatform(null);
        setNewHandleInput('');
        fetchProfileAndAccounts();
      } else {
        setToastMsg(`❌ ${data.error || 'Failed to connect account'}`);
      }
    } catch {
      setToastMsg('❌ Failed to connect account');
    } finally {
      setVerifying(false);
      setTimeout(() => setToastMsg(''), 6000);
    }
  };

  const handleDeleteAccount = async (id: string, handle: string) => {
    if (confirm(`Unlink ${handle} from your profile?`)) {
      try {
        await fetch(`/api/clipper/accounts?id=${id}`, { method: 'DELETE' });
        setConnectedAccounts((prev) => prev.filter((a) => a.id !== id));
        setToastMsg(`Unlinked ${handle}.`);
      } catch {
        setToastMsg('Failed to remove account.');
      } finally {
        setTimeout(() => setToastMsg(''), 3000);
      }
    }
  };

  const handleSaveProfileDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const res = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          editingSoftware,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setToastMsg('✅ Profile details updated successfully!');
        setIsEditingProfile(false);
      } else {
        setToastMsg(`❌ ${data.error || 'Failed to update profile'}`);
      }
    } catch {
      setToastMsg('❌ Error updating profile details');
    } finally {
      setSavingProfile(false);
      setTimeout(() => setToastMsg(''), 5000);
    }
  };

  const initialLetter = (name || 'Clipper').trim().charAt(0).toUpperCase();

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="pb-4 border-b border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Profile & Accounts
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Manage your personal creator profile and link multiple social media accounts for submitting clips.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/clipper/earnings"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-400 hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Wallet className="w-4 h-4" />
              <span>Earnings & Payouts →</span>
            </Link>
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

      {/* SECTION 1: CLIPPER DETAILS CARD */}
      <div className="rounded-3xl bg-gradient-to-b from-[#11162a]/95 via-[#0b1020]/95 to-[#060810] border border-cyan-500/30 p-6 sm:p-7 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Creator Avatar */}
            {avatar ? (
              <img
                src={avatar}
                alt={name || 'Clipper'}
                className="w-16 h-16 rounded-2xl object-cover shadow-lg shadow-cyan-500/20 shrink-0 border-2 border-cyan-500/40"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-cyan-500/20 shrink-0">
                {initialLetter}
              </div>
            )}

            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                  {name || 'Verified Clipper'}
                </h2>
                {clipperLevel === 'ELITE_CLIPPER' ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                    <span>👑 Elite Clipper</span>
                  </span>
                ) : clipperLevel === 'PRO_CLIPPER' ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    <span>⚡ Pro Clipper</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                    <span>Clipper</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono">{email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isEditingProfile ? 'Cancel Editing' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Tier Status & Progression Milestone Bar */}
        <div className="mt-4 pt-4 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Total Approved Views</span>
              <span className="font-mono font-bold text-white text-sm">
                {approvedViews.toLocaleString('en-US')}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Current Tier:</span>
              <span
                className={
                  clipperLevel === 'ELITE_CLIPPER'
                    ? 'text-amber-400 font-bold'
                    : clipperLevel === 'PRO_CLIPPER'
                    ? 'text-cyan-400 font-bold'
                    : 'text-purple-400 font-bold'
                }
              >
                {clipperLevel === 'ELITE_CLIPPER'
                  ? 'Elite Clipper (2M+ views)'
                  : clipperLevel === 'PRO_CLIPPER'
                  ? 'Pro Clipper (500K+ views)'
                  : 'Clipper (<500K views)'}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Next Milestone</span>
              <span className="font-mono text-cyan-300 text-xs font-semibold">
                {clipperLevel === 'ELITE_CLIPPER'
                  ? '👑 Max Tier Achieved'
                  : clipperLevel === 'PRO_CLIPPER'
                  ? `${Math.max(0, 2000000 - approvedViews).toLocaleString()} views to Elite`
                  : `${Math.max(0, 500000 - approvedViews).toLocaleString()} views to Pro`}
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  clipperLevel === 'ELITE_CLIPPER'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                    : clipperLevel === 'PRO_CLIPPER'
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                    : 'bg-gradient-to-r from-purple-500 to-cyan-400'
                }`}
                style={{
                  width:
                    clipperLevel === 'ELITE_CLIPPER'
                      ? '100%'
                      : clipperLevel === 'PRO_CLIPPER'
                      ? `${Math.min(100, Math.max(8, ((approvedViews - 500000) / 1500000) * 100))}%`
                      : `${Math.min(100, Math.max(8, (approvedViews / 500000) * 100))}%`,
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>0</span>
              <span>500K (Pro Clipper)</span>
              <span>2M+ (Elite Clipper)</span>
            </div>
          </div>
        </div>

        {/* Profile Info Edit Form (if toggled) */}
        {isEditingProfile && (
          <form onSubmit={handleSaveProfileDetails} className="space-y-4 pt-1 border-t border-white/10">
            <div className="space-y-1.5 max-w-sm">
              <label className="text-xs font-bold text-slate-300">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex justify-start gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingProfile}
                className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:opacity-90 disabled:opacity-50 cursor-pointer"
              >
                {savingProfile ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* SECTION 2: SOCIAL ACCOUNTS (Add New Account) */}
      <div className="rounded-3xl bg-gradient-to-b from-[#0f1322]/90 via-[#0a0d18]/95 to-[#060810] border border-white/[0.08] p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-cyan-300 font-display uppercase tracking-wider">
              Social Accounts
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Add new social media channels to submit clips from your personal handles.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 self-start sm:self-auto">
            {connectedAccounts.length} Connected
          </span>
        </div>

        {/* 5 Social Platform Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {platforms.map((p) => {
            const IconComponent = p.icon;
            const isYT = p.name === 'YouTube';
            const isIG = p.name === 'Instagram';

            if (isYT || isIG) {
              return (
                <a
                  key={p.name}
                  href={isYT ? '/api/auth/youtube' : '/api/auth/instagram'}
                  className="p-4 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-cyan-400/50 hover:from-purple-500/10 hover:to-cyan-500/10 transition-all flex flex-col items-center justify-center gap-2.5 group cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:-translate-y-0.5 relative text-center"
                >
                  <span className="absolute top-2 right-2 text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    OAuth
                  </span>
                  <div className={`p-2.5 rounded-xl bg-white/[0.05] ${p.color} group-hover:scale-110 transition-transform shadow-inner`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-white">{p.name}</span>
                  <span className="text-[10px] text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                    {isYT ? 'Connect Google' : 'Connect Meta'}
                  </span>
                </a>
              );
            }

            return (
              <button
                key={p.name}
                type="button"
                onClick={() => handleOpenVerifyModal(p.name)}
                className="p-4 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-cyan-400/50 hover:from-purple-500/10 hover:to-cyan-500/10 transition-all flex flex-col items-center justify-center gap-2.5 group cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:-translate-y-0.5 relative"
              >
                <div className={`p-2.5 rounded-xl bg-white/[0.05] ${p.color} group-hover:scale-110 transition-transform shadow-inner`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white">{p.name}</span>
                <span className="text-[10px] text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                  + Add Handle
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: CONNECTED ACCOUNTS LIST */}
      <div className="rounded-3xl bg-gradient-to-b from-[#0f1322]/90 via-[#0a0d18]/95 to-[#060810] border border-white/[0.08] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <div>
            <h2 className="text-base font-bold text-white font-display">Connected Accounts</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              These channels are linked to your profile for video moderation and tracking.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {connectedAccounts.length === 0 ? (
            <div className="py-12 px-4 text-center rounded-2xl bg-white/[0.01] border border-dashed border-white/10 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300">
                <Globe2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-white font-display">No connected accounts yet</div>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Link your YouTube or Instagram channels above to enable video moderation and clip submission tracking.
                </p>
              </div>
            </div>
          ) : (
            connectedAccounts.map((acc) => {
              const platformMeta = platforms.find((p) => p.name === acc.platform);
              const IconComp = platformMeta ? platformMeta.icon : YouTubeIcon;
              const iconColor = platformMeta ? platformMeta.color : 'text-red-500';

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
                          <span>Connected</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>All approved video earnings from this channel consolidate to your profile</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => handleDeleteAccount(acc.id, acc.handle)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer border border-transparent hover:border-rose-500/20"
                      title="Unlink account"
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

      {/* Payout Notice Card pointing to Earnings Section */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-cyan-950/30 to-[#0e1428] border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-display">Looking to connect Payment Methods?</h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Head to the <strong>Earnings & Payouts</strong> page to connect your UPI ID or Bank Account for campaign conclusion payments.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/clipper/earnings"
          className="px-5 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:opacity-90 transition-all text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 shrink-0 self-start sm:self-auto"
        >
          <span>Go to Earnings</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Manual Link Modal for TikTok / X / Facebook */}
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
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center shadow-inner">
                {verifyModalPlatform === 'TikTok' ? (
                  <TikTokIcon className="w-6 h-6 text-cyan-400" />
                ) : verifyModalPlatform === 'X' ? (
                  <XIcon className="w-6 h-6 text-white" />
                ) : (
                  <FacebookIcon className="w-6 h-6 text-blue-500" />
                )}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  Connect {verifyModalPlatform} Account
                </h3>
                <p className="text-xs text-slate-400">
                  Link your handle to submit clips and accumulate earnings into your profile.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                Enter your {verifyModalPlatform} handle:
              </label>
              <input
                type="text"
                value={newHandleInput}
                onChange={(e) => setNewHandleInput(e.target.value)}
                placeholder={`e.g. @yourcreatorname`}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                autoFocus
              />
            </div>

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
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 text-white transition-all cursor-pointer disabled:opacity-50"
              >
                {verifying ? 'Connecting...' : 'Connect Account'}
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
