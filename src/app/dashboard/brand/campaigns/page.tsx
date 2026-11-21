'use client';

import React, { useState, useEffect } from 'react';
import { FolderKanban, PlusCircle, ArrowUpRight, Clock, Pause, Play } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function BrandCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = () => {
    setLoading(true);
    fetch('/api/campaigns')
      .then((r) => r.json())
      .then((data) => {
        if (data.campaigns) setCampaigns(data.campaigns);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    await fetch(`/api/campaigns/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchCampaigns();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Manage Brand Campaigns</h1>
          <p className="text-xs sm:text-sm text-purple-200/70">
            Control live status, monitor remaining escrow pools, and inspect clipper participant counts.
          </p>
        </div>
        <a
          href="/dashboard/brand/campaigns/new"
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-glow-purple self-start sm:self-auto"
        >
          + Launch Campaign
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((camp) => {
          const budgetPercent = Math.min(
            100,
            Math.round(((camp.totalBudget - camp.remainingBudget) / camp.totalBudget) * 100)
          );

          return (
            <div
              key={camp.id}
              className="p-6 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-950/80 border border-purple-800/50 text-purple-300">
                    {camp.industry}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      camp.status === 'ACTIVE'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}
                  >
                    {camp.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-display">{camp.title}</h3>

                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#0e071c] border border-purple-900/40 text-center">
                  <div>
                    <div className="text-[10px] text-purple-400">Total Escrow</div>
                    <div className="text-xs font-bold text-white">₹{camp.totalBudget?.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-purple-400">Remaining</div>
                    <div className="text-xs font-bold text-emerald-400">
                      ₹{camp.remainingBudget?.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-purple-400">Verified Views</div>
                    <div className="text-xs font-bold text-cyan-400">{formatNumber(camp.verifiedViews || 0)}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-purple-300">
                    <span>Budget Utilized</span>
                    <span>{budgetPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#201438] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-400"
                      style={{ width: `${budgetPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-purple-900/40 text-xs">
                <button
                  onClick={() => handleToggleStatus(camp.id, camp.status)}
                  className="text-purple-300 hover:text-white flex items-center gap-1 font-medium"
                >
                  {camp.status === 'ACTIVE' ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Pause Campaign
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Resume Campaign
                    </>
                  )}
                </button>

                <a
                  href={`/campaigns/${camp.slug || camp.id}`}
                  className="text-purple-400 hover:underline flex items-center gap-1"
                >
                  <span>Public Page</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
