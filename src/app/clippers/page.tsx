'use client';

import React, { useState } from 'react';
import {
  Scissors,
  CheckCircle2,
  Zap,
  TrendingUp,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Award,
  Smartphone,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function ForClippersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [viewsSim, setViewsSim] = useState(150000);
  const cpmRate = 140; // ₹140 per 1k views

  const grossEarnings = (viewsSim / 1000) * cpmRate;
  const platformFee = grossEarnings * 0.03;
  const potentialEarnings = Math.floor(grossEarnings - platformFee);

  const clipperFaqs = [
    {
      q: 'How and when do I get paid?',
      a: 'Once your submitted social media post link (Reel, Short, or TikTok) is approved and reaches the verified view threshold, rewards are credited directly to your withdrawable wallet balance. You can request payouts anytime starting at just ₹500 directly via UPI (PhonePe, Google Pay, Paytm) or IMPS Bank Transfer.',
    },
    {
      q: 'Do I need a large personal follower count to earn?',
      a: 'No! Short-form algorithms on Instagram Reels and YouTube Shorts recommend videos primarily based on retention, watch-time, and psychological hook quality rather than existing follower counts. Even fresh accounts can generate 500k+ views with good editing.',
    },
    {
      q: 'Which video editing software is allowed?',
      a: 'You can use any tool of your choice: CapCut (Desktop or Mobile), Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro, or After Effects. We value video pacing, clear dynamic captions, and crisp audio hooks.',
    },
    {
      q: 'How does Clip Matrix verify views?',
      a: 'Our platform connects to official social platform data endpoints and runs scheduled audit checkpoints. We verify authentic viewer engagement and reject artificial bots or duplicate links.',
    },
  ];

  return (
    <div className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-purple-700/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-200 text-xs font-semibold">
          <Scissors className="w-3.5 h-3.5 text-purple-400 -rotate-45" />
          <span>Editor & Creator Monetization Hub</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
          Your Editing Skills <span className="text-gradient-neon">Deserve to Get Paid.</span>
        </h1>

        <p className="text-lg text-purple-200/80 max-w-2xl mx-auto leading-relaxed">
          Discover high-paying brand campaigns, download source footage, edit viral 9:16 clips, publish them on your
          pages, and withdraw guaranteed CPM rewards straight to your UPI.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="/auth/register-clipper"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-glow-purple flex items-center justify-center gap-2"
          >
            <span>Register as a Clipper</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/campaigns"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-medium text-purple-200 bg-[#160d29] hover:bg-[#221440] transition-colors border border-purple-800/60"
          >
            Browse Active Campaigns
          </a>
        </div>
      </div>

      {/* Interactive Clipper Earnings Simulator */}
      <div className="rounded-3xl bg-gradient-to-br from-[#180e2f] to-[#100720] border border-purple-500/30 p-6 sm:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400">Earnings Calculator</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            How Much Can You Earn Per Viral Clip?
          </h2>
          <p className="text-purple-200/70 text-sm">
            Drag the slider to calculate your estimated payout based on verified views.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-purple-200">Verified Views on Your Clip</span>
              <span className="text-white font-bold font-mono text-base">{viewsSim.toLocaleString()} Views</span>
            </div>
            <input
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={viewsSim}
              onChange={(e) => setViewsSim(Number(e.target.value))}
              className="w-full accent-purple-500 h-2 bg-[#201438] rounded-lg cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-[#140b26] border border-purple-900/40">
              <div className="text-xs text-purple-300">Campaign CPM Rate</div>
              <div className="text-xl font-bold text-purple-400 mt-1">₹{cpmRate} / 1k views</div>
            </div>
            <div className="p-4 rounded-xl bg-[#140b26] border border-purple-900/40">
              <div className="text-xs text-purple-300">Calculated Payout</div>
              <div className="text-2xl font-extrabold text-emerald-400 mt-1 font-display">
                ₹{potentialEarnings.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-purple-300/70 font-mono mt-0.5">
                Net earnings (3% platform fee: -₹{Math.floor(platformFee).toLocaleString('en-IN')})
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#140b26] border border-purple-900/40">
              <div className="text-xs text-purple-300">Withdrawal Speed</div>
              <div className="text-xl font-bold text-cyan-400 mt-1">Instant via UPI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Clipper Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-[#130a24] border border-purple-900/50 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">No Need to Hunt for Clients</h3>
          <p className="text-sm text-purple-200/70 leading-relaxed">
            Stop sending cold DMs. High-budget brands are already live on Clip Matrix with ready-to-clip source footage
            and locked escrow funds.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#130a24] border border-purple-900/50 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">Instant UPI Settlements</h3>
          <p className="text-sm text-purple-200/70 leading-relaxed">
            No waiting 60 days for brand invoice clearance. Once your clip performance is verified, cash out straight to
            your phone UPI ID.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#130a24] border border-purple-900/50 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">Leaderboards & Elite Bonuses</h3>
          <p className="text-sm text-purple-200/70 leading-relaxed">
            Top editors earn badges (Pro, Elite, Master) unlocking higher CPM rates, exclusive private campaigns, and
            monthly performance prizes.
          </p>
        </div>
      </div>

      {/* Clipper FAQs */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">Clipper Questions Answered</h2>
          <p className="text-purple-200/70 text-sm">Everything you need to know to start clipping.</p>
        </div>

        <div className="space-y-3">
          {clipperFaqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl bg-[#140b26] border border-purple-900/50 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between text-white font-semibold text-sm hover:text-purple-300 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-purple-200/70 leading-relaxed border-t border-purple-900/30 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
