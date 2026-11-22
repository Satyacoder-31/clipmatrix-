'use client';

import React, { useState } from 'react';
import { Share2, Users, DollarSign, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';

export default function ClipperReferralsPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = 'https://clip-matrix.vercel.app/auth/register-clipper?ref=satya';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Referrals Program</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Invite editor friends and video clippers. Earn 5% lifetime bonus on all verified payouts they generate.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase font-mono">Referred Clippers</div>
          <div className="text-2xl sm:text-3xl font-black text-white font-display">12</div>
          <div className="text-[11px] text-emerald-400 font-semibold">9 active in brand campaigns</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase font-mono">Total Bonus Earned</div>
          <div className="text-2xl sm:text-3xl font-black text-[#00B887] font-display">₹18,450</div>
          <div className="text-[11px] text-slate-400">Paid out via UPI</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase font-mono">Commission Share</div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-display">5.0%</div>
          <div className="text-[11px] text-slate-400">Tier 2 Elite Creator rate</div>
        </div>
      </div>

      {/* Referral Link Box */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c1022] to-[#121836] border border-[#00B887]/30 space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00B887]" />
            <span>Your Personal Clipper Invite Link</span>
          </h3>
          <p className="text-xs text-slate-400">
            Share this link on Discord, Telegram, or WhatsApp with other video editors to automatically link their account to your referral code.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-slate-200 text-xs sm:text-sm font-mono outline-none"
          />
          <button
            onClick={copyToClipboard}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-white bg-[#00B887] hover:bg-[#009E74] transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer text-sm shadow-md shadow-emerald-500/20"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
