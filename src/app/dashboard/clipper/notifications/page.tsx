'use client';

import React from 'react';
import { Bell, CheckCircle2, DollarSign, Sparkles, Video, Clock } from 'lucide-react';

export default function ClipperNotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: 'Views Verified & Escrow Released',
      desc: '120,500 views verified on Nova AI Video breakdown. ₹14,460 credited to your wallet.',
      time: '2 hours ago',
      type: 'PAYOUT',
      icon: DollarSign,
      color: 'text-[#00B887] bg-[#00B887]/15 border-[#00B887]/30',
    },
    {
      id: 2,
      title: 'Clip Submission Approved',
      desc: 'Your Reel "Coding with Voice: Cursor 2.0 Reaction" was approved by DevFlow Inc.',
      time: '1 day ago',
      type: 'APPROVAL',
      icon: CheckCircle2,
      color: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30',
    },
    {
      id: 3,
      title: 'New High-CPM Campaign Live',
      desc: 'FinEdge Capital launched a ₹75,000 budget campaign with ₹150 CPM rate.',
      time: '2 days ago',
      type: 'CAMPAIGN',
      icon: Sparkles,
      color: 'text-purple-400 bg-purple-500/15 border-purple-500/30',
    },
    {
      id: 4,
      title: 'Weekly Leaderboard Milestone',
      desc: 'Congratulations! You reached Rank #4 on the India Elite Clipper Leaderboard.',
      time: '4 days ago',
      type: 'SYSTEM',
      icon: Video,
      color: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Notifications</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time verification alerts, escrow payout credits, and new brand campaign briefs.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] hover:border-white/20 transition-all flex items-start gap-4"
            >
              <div className={`p-2.5 rounded-xl border ${item.color} shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 shrink-0 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
