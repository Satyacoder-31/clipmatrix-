'use client';

import React, { useState } from 'react';
import { Check, ShieldCheck, Zap, Sparkles, Building2 } from 'lucide-react';

export default function PricingPage() {
  const [calcBudget, setCalcBudget] = useState(150000);
  const [calcCpm, setCalcCpm] = useState(120);

  const estimatedViews = Math.floor((calcBudget / calcCpm) * 1000);
  const estimatedClips = Math.round(estimatedViews / 35000) || 15;

  const packages = [
    {
      name: 'Starter Viral',
      price: '₹50,000',
      escrow: '₹50,000 Locked in Escrow',
      target: '350,000 - 500,000 Views',
      description: 'Ideal for early-stage startups and podcasts looking to test decentralized short-form distribution.',
      features: [
        'Guaranteed CPM (₹120 - ₹140)',
        'Up to 15-20 approved short clips',
        'Instagram Reels & YouTube Shorts',
        'Automated API view tracking',
        'Standard 48-hour launch',
        'Organic & Spark Ad usage rights',
      ],
      popular: false,
    },
    {
      name: 'Scale Matrix',
      price: '₹1,50,000',
      escrow: '₹1,50,000 Locked in Escrow',
      target: '1,000,000 - 1,400,000 Views',
      description: 'For high-growth D2C brands and funded tech companies needing rapid multi-platform market dominance.',
      features: [
        'Preferred CPM rate (₹100 - ₹120)',
        '35 - 50+ approved short clips',
        'Instagram Reels, Shorts & TikTok',
        'Priority review queue & fast approvals',
        'Dedicated Campaign Strategist',
        'Full digital ad whitelisting rights',
        'Real-time CSV analytics export',
      ],
      popular: true,
    },
    {
      name: 'Dominance Enterprise',
      price: '₹5,00,000+',
      escrow: 'Custom Escrow Schedule',
      target: '4,000,000 - 6,000,000+ Views',
      description: 'For top enterprise brands, OTT launches, and major podcasts requiring massive viral reach.',
      features: [
        'Lowest CPM rate (₹80 - ₹100)',
        '100+ creative variations',
        'Access to Top 5% Master Clippers',
        'Multi-language localization (Hindi, Eng, etc.)',
        'Dedicated Slack channel & SLA',
        'Custom milestone reward structures',
        'Custom NDAs & digital asset protections',
      ],
      popular: false,
    },
  ];

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/60 uppercase tracking-widest font-mono">
          Transparent Performance Pricing
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
          Pay Only For <span className="text-gradient-neon">Verified Real Views</span>
        </h1>
        <p className="text-purple-200/70 text-base">
          100% escrow-backed. No agency markup, no retainer lock-in. Your money stays protected until clips deliver.
        </p>
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-8 flex flex-col justify-between space-y-6 transition-all relative ${
              pkg.popular
                ? 'bg-[#180e2f] border-2 border-purple-500 shadow-glow-purple'
                : 'bg-[#130a24] border border-purple-900/50 hover:border-purple-600/40'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold bg-purple-600 text-white uppercase tracking-wider shadow-glow-purple">
                Most Popular for Scale
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white font-display">{pkg.name}</h3>
                <div className="text-3xl font-extrabold text-white font-display mt-2">{pkg.price}</div>
                <div className="text-xs text-emerald-400 font-medium mt-1">{pkg.escrow}</div>
              </div>

              <div className="p-3 rounded-xl bg-[#0e061a] border border-purple-900/50 text-xs text-purple-300 font-mono">
                🎯 Target: <strong className="text-white">{pkg.target}</strong>
              </div>

              <p className="text-xs text-purple-200/70 leading-relaxed">{pkg.description}</p>

              <div className="pt-4 border-t border-purple-900/40 space-y-2.5">
                {pkg.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs text-purple-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <a
                href="/auth/register-brand"
                className={`w-full py-3.5 rounded-xl text-center text-xs font-bold block transition-all ${
                  pkg.popular
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-glow-purple'
                    : 'bg-[#1f1338] hover:bg-[#2c1b50] text-purple-200 hover:text-white'
                }`}
              >
                Launch With This Package
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
