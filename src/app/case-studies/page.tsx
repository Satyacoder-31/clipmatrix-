'use client';

import React from 'react';
import { TrendingUp, Eye, ArrowUpRight, Award, Play, CheckCircle } from 'lucide-react';

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      brand: 'Aether AI Technologies',
      industry: 'Tech & Multimodal AI',
      title: 'How Aether AI Scaled From 0 to 1.8M Verified Views in 18 Days',
      metric1: '1,850,000+',
      label1: 'Verified Views',
      metric2: '₹0.11',
      label2: 'Average CPV',
      metric3: '14,200',
      label3: 'Freemium Signups',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      summary:
        'Aether AI provided a 45-minute technical keynote demo. 24 Clip Matrix clippers cut 48 retention-optimized vertical hooks highlighting prompt comparison versus traditional 3D software.',
      quote: 'Clip Matrix delivered 10x more organic reach than traditional agency retainers at half the cost.',
      author: 'Devika Nair, VP Growth',
    },
    {
      brand: 'KicksDrop India',
      industry: 'D2C Fashion & Sneakers',
      title: 'Generating ₹28 Lakhs in Sneaker GMV via Travis Scott ASMR Unboxings',
      metric1: '920,000+',
      label1: 'Verified Views',
      metric2: '4.8x',
      label2: 'Verified ROAS',
      metric3: '1,420',
      label3: 'Sneaker Orders',
      thumbnail: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
      summary:
        'By distributing ASMR sound-design edits and price comparison clips across Instagram Reels and TikTok, KicksDrop dominated limited drop hype without running expensive Meta ads.',
      quote: 'The escrow protection and CPM model gave us total transparency. We paid strictly for verified reach.',
      author: 'Rohan Singhania, Founder',
    },
    {
      brand: 'Founders Unplugged',
      industry: 'Podcasts & Media',
      title: 'Exploding YouTube Shorts Subscribers from 12k to 140k in 60 Days',
      metric1: '4,200,000+',
      label1: 'Verified Views',
      metric2: '128,000',
      label2: 'New Channel Subs',
      metric3: '₹0.08',
      label3: 'Effective CPV',
      thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
      summary:
        'Our network extracted 85 controversial founder soundbites with punchy captions and dramatic scores, sparking thousands of organic shares.',
      quote: 'Our podcast ranking shot to the top 5 on Spotify and Apple Podcasts entirely through clipped Shorts.',
      author: 'Sameer Sen, Host & Producer',
    },
  ];

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/60 uppercase tracking-widest font-mono">
          Proven Virality Metrics
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
          Case Studies & <span className="text-gradient-neon">Campaign Proof</span>
        </h1>
        <p className="text-purple-200/70 text-base">
          Explore real data breakdowns, view metrics, and cost-per-view comparisons from top-performing clipping campaigns.
        </p>
      </div>

      <div className="space-y-12">
        {caseStudies.map((cs, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-[#130a24] border border-purple-900/50 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center hover:border-purple-500/40 transition-all shadow-xl"
          >
            <div className="lg:col-span-5 relative aspect-video sm:aspect-square lg:aspect-auto h-full min-h-[260px] rounded-2xl overflow-hidden bg-black">
              <img src={cs.thumbnail} alt={cs.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-white/90 font-medium italic">
                "{cs.quote}" — <span className="font-bold text-white">{cs.author}</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-widest text-purple-400">
                  {cs.brand} • {cs.industry}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight">{cs.title}</h2>
                <p className="text-sm text-purple-200/70 leading-relaxed">{cs.summary}</p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-purple-900/40">
                <div className="p-3.5 rounded-xl bg-[#1b1033] border border-purple-800/40 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-display">{cs.metric1}</div>
                  <div className="text-[11px] text-purple-300/70 mt-0.5">{cs.label1}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#1b1033] border border-purple-800/40 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-display">{cs.metric2}</div>
                  <div className="text-[11px] text-cyan-300/70 mt-0.5">{cs.label2}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#1b1033] border border-purple-800/40 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-display">{cs.metric3}</div>
                  <div className="text-[11px] text-emerald-300/70 mt-0.5">{cs.label3}</div>
                </div>
              </div>

              <div>
                <a
                  href="/auth/register-brand"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300 hover:text-white transition-colors group"
                >
                  <span>Launch similar campaign for your brand</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
