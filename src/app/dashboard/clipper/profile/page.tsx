'use client';

import React, { useState } from 'react';
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

export default function ClipperProfilePage() {
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([
    { id: '1', platform: 'YouTube', handle: '@daxraps30', verified: true, addedAt: '2026-11-15' },
    { id: '2', platform: 'YouTube', handle: '@DaxEditz30', verified: true, addedAt: '2026-11-18' },
    { id: '3', platform: 'YouTube', handle: '@DaxForever31', verified: true, addedAt: '2026-11-20' },
    { id: '4', platform: 'YouTube', handle: '@DaxHits31', verified: true, addedAt: '2026-11-22' },
    { id: '5', platform: 'Instagram', handle: '@satya.viralclips', verified: true, addedAt: '2026-11-21' },
  ]);

  const [verifyModalPlatform, setVerifyModalPlatform] = useState<string | null>(null);
  const [newHandleInput, setNewHandleInput] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const [upiId, setUpiId] = useState('satya@okaxis');
  const [editingSoftware, setEditingSoftware] = useState('CapCut, Premiere Pro, After Effects');

  const platforms = [
    { name: 'Instagram', icon: InstagramIcon, color: 'text-pink-500', bg: 'hover:bg-pink-500/10' },
    { name: 'TikTok', icon: TikTokIcon, color: 'text-cyan-400', bg: 'hover:bg-cyan-500/10' },
    { name: 'YouTube', icon: YouTubeIcon, color: 'text-red-500', bg: 'hover:bg-red-500/10' },
    { name: 'X', icon: XIcon, color: 'text-white', bg: 'hover:bg-white/10' },
    { name: 'Facebook', icon: FacebookIcon, color: 'text-blue-500', bg: 'hover:bg-blue-500/10' },
  ];

  const handleOpenVerifyModal = (platName: string) => {
    setVerifyModalPlatform(platName);
    setNewHandleInput('');
  };

  const handleVerifyAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHandleInput.trim() || !verifyModalPlatform) return;

    setVerifying(true);
    setTimeout(() => {
      const handleClean = newHandleInput.trim().startsWith('@')
        ? newHandleInput.trim()
        : `@${newHandleInput.trim()}`;

      const newAcc: ConnectedAccount = {
        id: Date.now().toString(),
        platform: verifyModalPlatform as any,
        handle: handleClean,
        verified: true,
        addedAt: new Date().toISOString().split('T')[0],
      };

      setConnectedAccounts((prev) => [newAcc, ...prev]);
      setVerifying(false);
      setVerifyModalPlatform(null);
      setNewHandleInput('');
      setToastMsg(`✅ Successfully verified and linked ${verifyModalPlatform} account (${handleClean})!`);
      setTimeout(() => setToastMsg(''), 4000);
    }, 1000);
  };

  const handleDeleteAccount = (id: string, handle: string) => {
    if (confirm(`Unlink and remove ${handle}?`)) {
      setConnectedAccounts((prev) => prev.filter((a) => a.id !== id));
      setToastMsg(`Removed ${handle}.`);
      setTimeout(() => setToastMsg(''), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Page Header */}
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Profile & Accounts</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Verify and link your social media handles (YouTube, Instagram, TikTok, X) to qualify for instant clip payouts.
        </p>
      </div>

      {toastMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg('')} className="text-emerald-400 hover:text-white font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Top Section: Social Accounts / Add New Account matching Image 2 */}
      <div className="rounded-3xl bg-[#0c1022] border border-white/[0.08] p-6 space-y-4 shadow-xl">
        <div>
          <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider text-slate-400">
            Social Accounts
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Add New Account</p>
        </div>

        {/* 5 Social Platform Tiles matching Image 2 */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {platforms.map((p) => {
            const IconComponent = p.icon;
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => handleOpenVerifyModal(p.name)}
                className={`p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/50 ${p.bg} transition-all flex flex-col items-center justify-center gap-2.5 group cursor-pointer`}
              >
                <div className={`p-2 rounded-xl bg-white/[0.04] ${p.color} group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white">{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Connected Accounts matching Image 2 */}
      <div className="rounded-3xl bg-[#0c1022] border border-white/[0.08] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <h2 className="text-base font-bold text-white font-display">Connected Accounts</h2>
          <span className="text-xs font-mono text-cyan-400 font-bold">
            {connectedAccounts.length} Verified Channels
          </span>
        </div>

        <div className="space-y-2.5">
          {connectedAccounts.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No accounts linked yet. Click any platform above to verify your handle.
            </div>
          ) : (
            connectedAccounts.map((acc) => {
              const platformMeta = platforms.find((p) => p.name === acc.platform);
              const IconComp = platformMeta ? platformMeta.icon : YouTubeIcon;
              const iconColor = platformMeta ? platformMeta.color : 'text-red-500';

              return (
                <div
                  key={acc.id}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-xl bg-white/[0.04] ${iconColor} shrink-0`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white font-display">{acc.platform}</div>
                      <div className="text-xs text-slate-400 font-mono truncate">{acc.handle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold font-mono">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Verified</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteAccount(acc.id, acc.handle)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
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

      {/* Verify Social Account Modal */}
      {verifyModalPlatform && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0c1022] border border-cyan-500/40 p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setVerifyModalPlatform(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Link & Verify {verifyModalPlatform}
                </h3>
                <p className="text-xs text-slate-400">Ensure this handle matches the account you post clips to.</p>
              </div>
            </div>

            <form onSubmit={handleVerifyAccount} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">
                  {verifyModalPlatform} Handle or Channel URL
                </label>
                <input
                  type="text"
                  value={newHandleInput}
                  onChange={(e) => setNewHandleInput(e.target.value)}
                  placeholder={
                    verifyModalPlatform === 'YouTube'
                      ? '@mychannel or https://youtube.com/@channel'
                      : verifyModalPlatform === 'Instagram'
                      ? '@myreels_handle'
                      : '@handle'
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-[11px] text-cyan-200/80 leading-relaxed">
                ⚡ Once verified, our scraper automatically validates all clips submitted under this handle and applies
                your CPM payouts.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setVerifyModalPlatform(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={verifying}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#00B887] hover:bg-[#009E74] transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {verifying ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Verifying Handle...</span>
                    </>
                  ) : (
                    <span>Verify & Link Account</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
