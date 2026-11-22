'use client';

import React from 'react';
import {
  BookOpen,
  Sparkles,
  TrendingUp,
  Target,
  Layers,
  ArrowRight,
  CheckCircle2,
  PlusCircle,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

export default function BrandAcademyPage() {
  const guides = [
    {
      id: 1,
      tag: 'CREATIVE BRIEFING',
      title: 'How to Write a Creator Brief That Drives 5M+ Views',
      readTime: '6 min read',
      points: [
        'Provide raw high-energy footage with clean timestamped hooks (e.g. founder debates, product reveals).',
        'Specify 1 crystal-clear CTA: link in bio, promo code, or official hashtag.',
        'Avoid restrictive corporate scripts; clippers perform best when given creative freedom over comedic hooks and sound design.',
      ],
    },
    {
      id: 2,
      tag: 'ECONOMIC MODELING',
      title: 'CPM vs Fixed Bounty vs Milestone Pool: Which Scales Best?',
      readTime: '8 min read',
      points: [
        'Performance CPM (₹100 - ₹200 CPM) is ideal for mass awareness and virality without paying for low-view duds.',
        'Leaderboard prize pools (₹25,000 to #1 clipper) create fierce competition and incentivize 10x output from top tier editors.',
        'Hybrid models with minimum floor guarantees encourage top-rated veteran clippers to prioritize your brief.',
      ],
    },
    {
      id: 3,
      tag: 'PAID AMPLIFICATION',
      title: 'Turning Organic Viral Clips into 4x ROAS Meta Spark Ads',
      readTime: '7 min read',
      points: [
        'Identify clips exceeding 100K organic views with positive comment sentiment.',
        'Request creator spark code authorization directly within the Clip Matrix dashboard.',
        'Run creator-posted spark ads directly against your core target demographic for lower CPA.',
      ],
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#160b36] via-[#0d0c26] to-[#070a1a] border border-purple-500/30 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>GROWTH & SCALING PLAYBOOK</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Brand Academy & Virality Guides
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 max-w-2xl leading-relaxed">
            Case studies, creative frameworks, and distribution strategies to turn short-form video clipping into a predictable organic customer acquisition channel.
          </p>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="space-y-6">
        {guides.map((guide) => (
          <div
            key={guide.id}
            className="p-6 sm:p-7 rounded-3xl bg-[#0c1022] border border-white/[0.08] hover:border-purple-500/40 transition-all space-y-4 group shadow-xl"
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                {guide.tag}
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {guide.readTime}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
              {guide.title}
            </h2>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
              <div className="text-[11px] font-mono font-bold text-purple-400 uppercase tracking-wider">
                Key Strategic Takeaways:
              </div>
              <ul className="space-y-1.5 pl-1">
                {guide.points.map((pt, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#170c38] to-[#0c1432] border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-bold text-white font-display">
            Ready to Launch Your Next Viral Campaign?
          </h3>
          <p className="text-xs sm:text-sm text-purple-200/70">
            Define your budget, lock it in escrow, and recruit top performing video editors.
          </p>
        </div>
        <Link
          href="/dashboard/brand/campaigns/new"
          className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 transition-all text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Campaign Brief</span>
        </Link>
      </div>
    </div>
  );
}
