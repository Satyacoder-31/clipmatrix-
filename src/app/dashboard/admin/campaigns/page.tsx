'use client';

import React, { useState, useEffect } from 'react';
import { FolderKanban, Check, Pause, Play, Eye, ExternalLink } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = () => {
    setLoading(true);
    fetch('/api/campaigns?status=ALL')
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
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Global Campaign Moderation
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/70">
          Review campaigns created by brands, pause/resume delivery, and monitor remaining escrow.
        </p>
      </div>

      <div className="rounded-2xl bg-[#140c26] border border-purple-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-purple-200">
            <thead className="bg-[#100720] border-b border-purple-900/40 uppercase font-mono text-[10px] text-purple-400">
              <tr>
                <th className="py-3.5 px-4">Campaign</th>
                <th className="py-3.5 px-4">Brand</th>
                <th className="py-3.5 px-4">Reward Model</th>
                <th className="py-3.5 px-4">Total / Remaining Budget</th>
                <th className="py-3.5 px-4">Verified Views</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30">
              {campaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-purple-950/20 transition-colors">
                  <td className="py-4 px-4 font-bold text-white max-w-xs truncate">{camp.title}</td>
                  <td className="py-4 px-4 text-purple-300">{camp.brand?.name}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950/80 text-cyan-400 border border-purple-800/50">
                      {camp.rewardModel} (₹{camp.rewardModel === 'CPM' ? camp.cpmRate : camp.rewardPerClip})
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono">
                    <span className="text-white font-bold">₹{camp.totalBudget.toLocaleString('en-IN')}</span> /{' '}
                    <span className="text-emerald-400">₹{camp.remainingBudget.toLocaleString('en-IN')}</span>
                  </td>
                  <td className="py-4 px-4 font-bold text-cyan-400 font-display">
                    {formatNumber(camp.verifiedViews || 0)}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        camp.status === 'ACTIVE'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}
                    >
                      {camp.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(camp.id, camp.status)}
                        className="px-2.5 py-1 rounded text-[11px] font-medium bg-purple-900/60 hover:bg-purple-800 text-white border border-purple-700/50"
                      >
                        {camp.status === 'ACTIVE' ? 'Pause' : 'Activate'}
                      </button>
                      <a
                        href={`/campaigns/${camp.slug || camp.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded text-purple-400 hover:text-white"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
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
