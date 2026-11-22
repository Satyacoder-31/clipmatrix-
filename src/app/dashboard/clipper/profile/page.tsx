'use client';

import React, { useState } from 'react';
import { User, ShieldCheck, Instagram, Youtube, Sparkles, CheckCircle2, Wallet, Save } from 'lucide-react';

export default function ClipperProfilePage() {
  const [discordUsername, setDiscordUsername] = useState('Satyaaaa');
  const [instagram, setInstagram] = useState('@satya.edits');
  const [youtube, setYoutube] = useState('@satyaclips');
  const [software, setSoftware] = useState('CapCut, Premiere Pro, After Effects');
  const [upiId, setUpiId] = useState('satya@okaxis');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Profile & Accounts</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Manage your verified creator handles, Discord identity, editing credentials, and UPI payout routing.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Profile updated successfully! Payout channels verified.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* User Monogram Header Card */}
        <div className="p-6 rounded-3xl bg-[#0c1022] border border-white/[0.08] flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-[#00B887] text-white font-black flex items-center justify-center text-3xl shadow-xl shadow-emerald-500/20 shrink-0">
            S
          </div>
          <div className="text-center sm:text-left space-y-1 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-xl font-bold text-white font-display">Satyaaaa</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00B887]/15 text-[#00B887] border border-[#00B887]/30 uppercase font-mono w-fit mx-auto sm:mx-0">
                VERIFIED CLIPPER
              </span>
            </div>
            <p className="text-xs text-slate-400">Connected Discord Account: Satyaaaa#0001</p>
            <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-300">
              <span className="font-semibold text-emerald-400">★ 4.96 Rating</span>
              <span className="text-white/20">•</span>
              <span>18 Campaigns Completed</span>
              <span className="text-white/20">•</span>
              <span>100% Payout Success Rate</span>
            </div>
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <span>Discord Handle</span>
            </label>
            <input
              type="text"
              value={discordUsername}
              onChange={(e) => setDiscordUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00B887]"
            />
          </div>

          <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Instagram className="w-3.5 h-3.5 text-rose-400" />
              <span>Instagram Page / Handle</span>
            </label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00B887]"
            />
          </div>

          <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Youtube className="w-3.5 h-3.5 text-red-500" />
              <span>YouTube Channel URL</span>
            </label>
            <input
              type="text"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00B887]"
            />
          </div>

          <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-[#00B887]" />
              <span>UPI ID for Verified Escrow Payouts</span>
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00B887]"
            />
          </div>

          <div className="md:col-span-2 p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              Primary Editing Suite & Hardware
            </label>
            <input
              type="text"
              value={software}
              onChange={(e) => setSoftware(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00B887]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-2xl font-bold text-white bg-[#00B887] hover:bg-[#009E74] transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer text-sm"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Changes</span>
        </button>
      </form>
    </div>
  );
}
