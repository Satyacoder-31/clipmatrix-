'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, Eye } from 'lucide-react';
import Link from 'next/link';

interface LeaderboardClipper {
  id: string;
  rank: number;
  name: string;
  handle: string;
  tier: string;
  views: number;
  earned: number;
  rating: number;
  clips: number;
  avatar: string;
}

export default function ClipperLeaderboardPage() {
  const [clippers, setClippers] = useState<LeaderboardClipper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((r) => r.json())
      .then((data) => {
        if (data.clippers) {
          setClippers(data.clippers);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Top Clipper Leaderboard
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/70">
          Rankings updated in real time based on total verified organic views and approved earnings.
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl bg-[#140c26] border border-purple-900/50 p-12 text-center text-xs text-purple-300 font-mono">
          Loading leaderboard rankings...
        </div>
      ) : clippers.length === 0 ? (
        <div className="rounded-3xl bg-gradient-to-b from-[#110e26]/90 via-[#0a0818]/95 to-[#060410] border border-purple-500/30 p-12 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
            <Trophy className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">Viral Leaderboard is Fresh</h3>
          <p className="text-xs text-purple-200/70 max-w-sm mx-auto leading-relaxed">
            No clips have been verified yet. Submit your video clips to active campaigns to claim the #1 spot on the leaderboard!
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard/clipper/campaigns"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 transition-all shadow-lg shadow-purple-600/30 cursor-pointer"
            >
              Browse Campaigns
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#140c26] border border-purple-900/50 overflow-hidden shadow-2xl">
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
                {clippers.map((c) => (
                  <tr key={c.id} className="hover:bg-purple-950/20 transition-colors">
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
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-9 h-9 rounded-full object-cover border border-purple-500/30"
                        />
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
                    <td className="py-4 px-4 font-bold text-white">
                      <div className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{c.views.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-extrabold text-emerald-400 font-display">
                      ${c.earned.toFixed(2)}
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
      )}
    </div>
  );
}
