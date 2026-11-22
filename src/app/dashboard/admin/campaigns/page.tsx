'use client';

import React, { useState, useEffect } from 'react';
import {
  FolderKanban,
  Check,
  Pause,
  Play,
  Eye,
  ExternalLink,
  Search,
  PlusCircle,
  TrendingUp,
  DollarSign,
  Users,
  Film,
  Sparkles,
  ShieldCheck,
  Edit3,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [editingCamp, setEditingCamp] = useState<any>(null);
  const [newCpm, setNewCpm] = useState(150);
  const [newBudget, setNewBudget] = useState(50000);
  const [toastMsg, setToastMsg] = useState('');

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
    try {
      const res = await fetch(`/api/campaigns/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setToastMsg(`Campaign status updated to ${newStatus}`);
        fetchCampaigns();
      }
    } catch {
      setToastMsg('Failed to update campaign status');
    }
  };

  const handleSaveBudget = async () => {
    if (!editingCamp) return;
    try {
      const res = await fetch(`/api/campaigns/${editingCamp.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cpmRate: Number(newCpm),
          totalBudget: Number(newBudget),
        }),
      });
      if (res.ok) {
        setToastMsg(`Updated ${editingCamp.title} settings successfully!`);
        setEditingCamp(null);
        fetchCampaigns();
      }
    } catch {
      setToastMsg('Failed to update campaign budget');
    }
  };

  const filtered = campaigns.filter((camp) => {
    const matchesStatus = statusFilter === 'ALL' || camp.status === statusFilter;
    const matchesSearch =
      !search ||
      camp.title?.toLowerCase().includes(search.toLowerCase()) ||
      camp.brand?.name?.toLowerCase().includes(search.toLowerCase()) ||
      camp.industry?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalEscrow = campaigns.reduce((sum, c) => sum + (c.totalBudget || 0), 0);
  const activeCount = campaigns.filter((c) => c.status === 'ACTIVE').length;
  const totalVerifiedViews = campaigns.reduce((sum, c) => sum + (c.verifiedViews || 0), 0);

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold border border-cyan-500/25 mb-2">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>GLOBAL CAMPAIGN MANAGER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Campaign Controls & Escrow Allocation
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitor all brand briefs, adjust escrow caps, toggle campaign visibility, and inspect live submissions.
          </p>
        </div>

        <Link
          href="/dashboard/admin/submissions"
          className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 transition-all text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 self-start sm:self-auto"
        >
          <Film className="w-4 h-4 text-cyan-300" />
          <span>Review Video Clips ↗</span>
        </Link>
      </div>

      {toastMsg && (
        <div className="p-4 rounded-xl bg-purple-950/90 border border-purple-500/40 text-xs text-white flex items-center justify-between shadow-lg">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg('')} className="text-purple-300 hover:text-white font-bold">
            ✕
          </button>
        </div>
      )}

      {/* KPI Metric Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400">Total Escrow Vaulted</div>
          <div className="text-2xl font-black text-white font-display">
            ₹{totalEscrow.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-emerald-400 font-mono">100% Locked & Protected</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400">Active Campaigns</div>
          <div className="text-2xl font-black text-cyan-400 font-display">
            {activeCount} / {campaigns.length}
          </div>
          <div className="text-xs text-purple-300">Live on Clipper Marketplace</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400">Verified Organic Views</div>
          <div className="text-2xl font-black text-emerald-400 font-display">
            {totalVerifiedViews.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400">Audited via Social APIs</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 rounded-2xl bg-[#0c1022] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search campaigns by title, sponsor brand, or category..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs outline-none focus:border-cyan-400 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs">
          {['ALL', 'ACTIVE', 'PAUSED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md'
                  : 'bg-white/[0.03] text-slate-300 hover:text-white border border-white/[0.06]'
              }`}
            >
              {st === 'ALL' ? 'All Status' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign Cards / Table */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <span className="inline-block w-8 h-8 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-[#0c1022] border border-white/[0.08] space-y-2">
          <FolderKanban className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No campaigns found</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((camp) => (
            <div
              key={camp.id}
              className="p-5 sm:p-6 rounded-3xl bg-[#0c1022] border border-white/[0.08] hover:border-purple-500/40 transition-all space-y-4 shadow-xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      {camp.industry || 'Tech & AI'}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-purple-300 font-semibold">{camp.brand?.name || 'Sponsor Brand'}</span>
                    <span className="text-slate-500">•</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        camp.status === 'ACTIVE'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {camp.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display">{camp.title}</h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] text-slate-400">Total Budget</div>
                      <div className="font-bold text-white font-mono mt-0.5">
                        ₹{camp.totalBudget?.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] text-slate-400">Remaining Escrow</div>
                      <div className="font-bold text-emerald-400 font-mono mt-0.5">
                        ₹{camp.remainingBudget?.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] text-slate-400">Reward Model</div>
                      <div className="font-bold text-cyan-300 font-mono mt-0.5">
                        ₹{camp.cpmRate || 150} {camp.rewardModel}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] text-slate-400">Verified Views</div>
                      <div className="font-bold text-white font-mono mt-0.5">
                        {camp.verifiedViews?.toLocaleString() || 0}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Controls */}
                <div className="flex flex-wrap lg:flex-col items-stretch gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleStatus(camp.id, camp.status)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      camp.status === 'ACTIVE'
                        ? 'bg-amber-600/80 hover:bg-amber-600'
                        : 'bg-emerald-600 hover:bg-emerald-500'
                    }`}
                  >
                    {camp.status === 'ACTIVE' ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pause Campaign</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Activate</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setEditingCamp(camp);
                      setNewCpm(camp.cpmRate || 150);
                      setNewBudget(camp.totalBudget || 50000);
                    }}
                    className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Edit Rates</span>
                  </button>

                  <Link
                    href={`/dashboard/admin/submissions?campaignId=${camp.id}`}
                    className="px-4 py-2 rounded-xl bg-purple-950/70 hover:bg-purple-900 border border-purple-500/30 text-xs font-bold text-purple-200 hover:text-white flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Film className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Review Clips</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Budget Modal */}
      {editingCamp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0e0c26] border border-cyan-500/40 p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-display">
              Edit Campaign Rates & Budget
            </h3>
            <p className="text-xs text-slate-300">
              Modifying settings for <strong className="text-white">{editingCamp.title}</strong>
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-purple-300 font-mono">CPM Rate (₹ per 1,000 views)</label>
                <input
                  type="number"
                  min="50"
                  value={newCpm}
                  onChange={(e) => setNewCpm(Number(e.target.value))}
                  className="w-full mt-1 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-sm outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs text-purple-300 font-mono">Total Escrow Budget (₹)</label>
                <input
                  type="number"
                  min="5000"
                  value={newBudget}
                  onChange={(e) => setNewBudget(Number(e.target.value))}
                  className="w-full mt-1 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-sm outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingCamp(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveBudget}
                className="px-5 py-2.5 rounded-xl font-bold text-white bg-cyan-600 hover:bg-cyan-500 text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
              >
                <Check className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
