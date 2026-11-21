'use client';

import React from 'react';
import { Trophy, Award, Star, Flame, Eye, Sparkles } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function ClipperLeaderboardPage() {
  const topClippers = [
    {
      rank: 1,
      name: 'Ananya Joshi',
      handle: '@ananya_edits',
      tier: 'MASTER',
      views: '4,850,000',
      earned: '₹2,45,000',
      rating: 4.99,
      clips: 64,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    },
    {
      rank: 2,
      name: 'Aarav Sharma',
      handle: '@aarav.viralcuts',
      tier: 'ELITE',
      views: '3,120,000',
      earned: '₹1,64,200',
      rating: 4.96,
      clips: 42,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    },
    {
      rank: 3,
      name: 'Rohit Varma',
      handle: '@rohit_shortsedits',
      tier: 'PRO_CLIPPER',
      views: '1,940,000',
      earned: '₹89,000',
      rating: 4.88,
      clips: 28,
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    },
    {
      rank: 4,
      name: 'Vikram Sen',
      handle: '@vikramcuts',
      tier: 'PRO_CLIPPER',
      views: '1,250,000',
      earned: '₹62,500',
      rating: 4.85,
      clips: 21,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Top Clipper Leaderboard
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/70">
          Rankings updated every 24 hours based on total verified organic views and brand satisfaction.
        </p>
      </div>

      <div className="rounded-2xl bg-[#140c26] border border-purple-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-purple-200">
            <thead className="bg-[#100720] border-b border-purple-900/40 uppercase font-mono text-[10px] text-purple-400">
              <tr>
                <th className="py-3.5 px-4">Rank</th>
                <th className="py-3.5 px-4">Clipper</th>
                <th className="py-3.5 px-4">Tier Status</th>
                <th className="py-3.5 px-4">Verified Views</th>
                <th className="py-3.5 px-4">Total Earned</th>
                <th className="py-3.5 px-4">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30">
              {topClippers.map((c) => (
                <tr key={c.rank} className="hover:bg-purple-950/20 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-white">
                    {c.rank === 1 ? (
                      <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
                        🥇 1
                      </span>
                    ) : c.rank === 2 ? (
                      <span className="w-7 h-7 rounded-full bg-slate-300/20 text-slate-300 flex items-center justify-center border border-slate-300/40">
                        🥈 2
                      </span>
                    ) : c.rank === 3 ? (
                      <span className="w-7 h-7 rounded-full bg-amber-700/20 text-amber-600 flex items-center justify-center border border-amber-700/40">
                        🥉 3
                      </span>
                    ) : (
                      `#${c.rank}`
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover border border-purple-500/30" />
                      <div>
                        <div className="font-bold text-white">{c.name}</div>
                        <div className="text-[10px] text-purple-400">{c.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-950/80 text-cyan-400 border border-purple-800/50">
                      {c.tier}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-cyan-400" /> {c.views}
                  </td>
                  <td className="py-4 px-4 font-extrabold text-emerald-400 font-display">
                    {c.earned}
                  </td>
                  <td className="py-4 px-4 font-bold text-amber-400">
                    ★ {c.rating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
