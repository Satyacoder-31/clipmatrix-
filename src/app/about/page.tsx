import React from 'react';
import { Sparkles, Users, Award, ShieldCheck, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/60 uppercase tracking-widest font-mono">
          Ecosystem Architecture
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
          About <span className="text-gradient-neon">Clip Matrix</span>
        </h1>
        <p className="text-purple-200/70 text-base">
          We are rebuilding creator marketing from the ground up on decentralized, performance-based CPM foundations.
        </p>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl bg-[#140c26] border border-purple-900/50 space-y-6">
        <h2 className="text-2xl font-bold text-white font-display">Our Mission</h2>
        <p className="text-sm text-purple-200/80 leading-relaxed">
          Traditional influencer agencies charge bloated upfront retainers for 2-3 sponsored posts with zero guarantee of
          reach. Meanwhile, thousands of talented video editors and aspiring creators struggle to monetize their high-retention
          editing skills.
        </p>
        <p className="text-sm text-purple-200/80 leading-relaxed">
          Clip Matrix bridges this divide. Brands deposit funds securely in escrow, clippers turn long-form founder
          interviews and product demos into viral 9:16 vertical hooks, and rewards are released strictly upon verified view
          performance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="p-6 rounded-2xl bg-[#120a22] border border-purple-900/40 space-y-2">
          <div className="text-3xl font-extrabold text-white font-display">100M+</div>
          <div className="text-xs text-purple-300">Verified Organic Views</div>
        </div>
        <div className="p-6 rounded-2xl bg-[#120a22] border border-purple-900/40 space-y-2">
          <div className="text-3xl font-extrabold text-emerald-400 font-display">$10,000+</div>
          <div className="text-xs text-purple-300">Paid to Independent Clippers</div>
        </div>
        <div className="p-6 rounded-2xl bg-[#120a22] border border-purple-900/40 space-y-2">
          <div className="text-3xl font-extrabold text-cyan-400 font-display">500+</div>
          <div className="text-xs text-purple-300">Vetted Editors in Network</div>
        </div>
      </div>
    </div>
  );
}
