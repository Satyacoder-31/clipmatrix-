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
  X,
  KeyRound,
  Copy,
  RefreshCw,
  Image as ImageIcon,
  Upload,
} from 'lucide-react';
import Link from 'next/link';
import { generateCampaignAccessCode } from '@/lib/campaign-code';

const PHOTO_PRESETS = [
  { name: 'Creator', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80' },
  { name: 'Podcast', url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80' },
  { name: 'Tech & AI', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80' },
  { name: 'Finance', url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80' },
  { name: 'Lifestyle', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80' },
];

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [editingCamp, setEditingCamp] = useState<any>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editThumbnail, setEditThumbnail] = useState('');
  const [newCpm, setNewCpm] = useState(0.50);
  const [newBudget, setNewBudget] = useState(1500);
  const [editAccessCode, setEditAccessCode] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  // Add Campaign Modal State
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [brands, setBrands] = useState<any[]>([]);
  const [creating, setCreating] = useState(false);

  // New Campaign Form Fields
  const [newTitle, setNewTitle] = useState('');
  const [newBrandId, setNewBrandId] = useState('');
  const [newAccessCode, setNewAccessCode] = useState(() => generateCampaignAccessCode());
  const [newIndustry, setNewIndustry] = useState('Creator Economy');
  const [newDescription, setNewDescription] = useState('');
  const [newCampBudget, setNewCampBudget] = useState('1500');
  const [newCampCpm, setNewCampCpm] = useState('0.50');
  const [newTargetViews, setNewTargetViews] = useState('3000000');
  const [newSourceUrl, setNewSourceUrl] = useState('');
  const [newDriveUrl, setNewDriveUrl] = useState('');
  const [newGuidelines, setNewGuidelines] = useState('Extract punchy hooks, add bold 2-word animated subtitles, and keep edits between 15-45s.');
  const [newHashtags, setNewHashtags] = useState('#ad #viral');
  const [newPlatforms, setNewPlatforms] = useState<string[]>(['INSTAGRAM', 'TIKTOK', 'YOUTUBE']);
  const [newThumbnail, setNewThumbnail] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80');

  const fetchCampaigns = () => {
    setLoading(true);
    fetch('/api/campaigns?status=ALL')
      .then((r) => r.json())
      .then((data) => {
        if (data.campaigns) setCampaigns(data.campaigns);
      })
      .finally(() => setLoading(false));
  };

  const fetchBrands = () => {
    fetch('/api/admin/users?role=BRAND')
      .then((r) => r.json())
      .then((d) => {
        if (d.users) {
          setBrands(d.users);
          if (d.users.length > 0 && !newBrandId) {
            setNewBrandId(d.users[0].id);
          }
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchCampaigns();
    fetchBrands();
  }, []);

  // Upload image helper (converts to base64 data URL)
  const handleImageUpload = (file: File, setter: (url: string) => void) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file must be under 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setter(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Update target views automatically when budget or CPM changes
  const handleBudgetChange = (b: string) => {
    setNewCampBudget(b);
    const bNum = parseFloat(b) || 0;
    const cpmNum = parseFloat(newCampCpm) || 0.5;
    if (cpmNum > 0) {
      setNewTargetViews(String(Math.round((bNum / cpmNum) * 1000)));
    }
  };

  const handleCpmChange = (c: string) => {
    setNewCampCpm(c);
    const bNum = parseFloat(newCampBudget) || 0;
    const cpmNum = parseFloat(c) || 0.5;
    if (cpmNum > 0) {
      setNewTargetViews(String(Math.round((bNum / cpmNum) * 1000)));
    }
  };

  const handleTogglePlatform = (p: string) => {
    if (newPlatforms.includes(p)) {
      if (newPlatforms.length > 1) {
        setNewPlatforms(newPlatforms.filter((x) => x !== p));
      }
    } else {
      setNewPlatforms([...newPlatforms, p]);
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setCreating(true);
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          brandId: newBrandId,
          industry: newIndustry,
          description: newDescription || newTitle,
          totalBudget: parseFloat(newCampBudget) || 1000,
          cpmRate: parseFloat(newCampCpm) || 0.50,
          targetViews: parseInt(newTargetViews) || 2000000,
          allowedPlatforms: newPlatforms.join(','),
          sourceVideoUrl: newSourceUrl,
          driveAssetsUrl: newDriveUrl,
          thumbnailUrl: newThumbnail,
          guidelines: newGuidelines,
          requiredHashtags: newHashtags,
          accessCode: newAccessCode.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setToastMsg(`❌ ${data.error || 'Failed to create campaign'}`);
        return;
      }

      const createdCode = data.campaign?.accessCode || newAccessCode;
      setToastMsg(
        `✅ Campaign "${newTitle}" published! Brand Access Code: ${createdCode}`
      );
      setAddModalOpen(false);
      // Reset form
      setNewTitle('');
      setNewDescription('');
      setNewAccessCode(generateCampaignAccessCode());
      fetchCampaigns();
    } catch {
      setToastMsg('❌ An error occurred during campaign creation.');
    } finally {
      setCreating(false);
    }
  };

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
    if (!editTitle.trim()) {
      setToastMsg('❌ Campaign name cannot be empty');
      return;
    }
    setSavingEdit(true);
    try {
      const res = await fetch(`/api/campaigns/${editingCamp.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle.trim(),
          thumbnailUrl: editThumbnail.trim(),
          cpmRate: Number(newCpm),
          totalBudget: Number(newBudget),
          ...(editAccessCode.trim() ? { accessCode: editAccessCode.trim() } : {}),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setToastMsg(`✅ Updated "${editTitle.trim()}" successfully!`);
        setEditingCamp(null);
        fetchCampaigns();
      } else {
        setToastMsg(`❌ ${data.error || 'Failed to update campaign'}`);
      }
    } catch {
      setToastMsg('Failed to update campaign settings');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleCopyCode = (id: string, code: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
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

  const totalBudget = campaigns.reduce((sum, c) => sum + (c.totalBudget || 0), 0);
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
            Campaign Controls & Budget Allocation
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Create, post, and manage all creator campaigns. Brand sponsors track views while admins govern budgets.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => {
              fetchBrands();
              setAddModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 transition-all text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add Campaign</span>
          </button>

          <Link
            href="/dashboard/admin/submissions"
            className="px-4 py-2.5 rounded-xl font-bold text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/10 transition-all text-xs flex items-center gap-2 cursor-pointer"
          >
            <Film className="w-4 h-4 text-cyan-300" />
            <span>Review Clips ↗</span>
          </Link>
        </div>
      </div>

      {toastMsg && (
        <div className="p-4 rounded-xl bg-purple-950/90 border border-purple-500/40 text-xs text-white flex items-center justify-between shadow-lg">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg('')} className="text-purple-300 hover:text-white font-bold cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* KPI Metric Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400">Total Campaign Budget</div>
          <div className="text-2xl font-black text-white font-display">
            ${totalBudget.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-400 font-mono">Disbursed upon campaign conclusion</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400">Active Campaigns</div>
          <div className="text-2xl font-black text-cyan-400 font-display">
            {activeCount} / {campaigns.length}
          </div>
          <div className="text-xs text-purple-300 font-mono">Live on Clipper Marketplace</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400">Verified Organic Views</div>
          <div className="text-2xl font-black text-emerald-400 font-display">
            {totalVerifiedViews.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 font-mono">Audited via Social APIs</div>
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

      {/* Campaign Cards */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <span className="inline-block w-8 h-8 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-[#0c1022] border border-white/[0.08] space-y-3">
          <FolderKanban className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white font-display">No campaigns found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Click "+ Add Campaign" above to post the first creator brief to the marketplace.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((camp) => (
            <div
              key={camp.id}
              className="p-6 rounded-3xl bg-gradient-to-b from-[#0f1322]/90 via-[#0a0d18]/95 to-[#060810] border border-white/[0.08] hover:border-purple-500/30 transition-all space-y-4 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/[0.04] border border-white/10 text-purple-300">
                      {camp.industry || 'Creator'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Brand: <strong className="text-white">{camp.brand?.name || 'Clip Matrix Partner'}</strong>
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      camp.status === 'ACTIVE'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {camp.status}
                  </span>
                </div>

                {camp.thumbnailUrl && (
                  <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-white/10 bg-slate-900 group">
                    <img
                      src={camp.thumbnailUrl}
                      alt={camp.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                )}

                <h3 className="text-lg font-bold text-white font-display">{camp.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {camp.description}
                </p>

                {/* Brand Analytics Access Code Pill */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-purple-950/35 border border-purple-500/25 text-xs">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-[11px] text-slate-300">Brand Access Code:</span>
                    <span className="font-mono font-bold text-cyan-300 tracking-wider">
                      {camp.accessCode || 'NOT SET'}
                    </span>
                  </div>
                  {camp.accessCode && (
                    <button
                      type="button"
                      onClick={() => handleCopyCode(camp.id, camp.accessCode)}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedCodeId === camp.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-300">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">Budget Pool</div>
                    <div className="font-bold text-white font-mono mt-0.5">${(camp.totalBudget || 0).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">CPM Rate</div>
                    <div className="font-bold text-cyan-400 font-mono mt-0.5">${Number(camp.cpmRate || 0.50).toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">Verified Views</div>
                    <div className="font-bold text-emerald-400 font-mono mt-0.5">{(camp.verifiedViews || 0).toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-white/[0.06] text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(camp.id, camp.status)}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
                  >
                    {camp.status === 'ACTIVE' ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-amber-400" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Resume</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setEditingCamp(camp);
                      setEditTitle(camp.title || '');
                      setEditThumbnail(camp.thumbnailUrl || '');
                      setNewCpm(camp.cpmRate || 0.50);
                      setNewBudget(camp.totalBudget || 1500);
                      setEditAccessCode(camp.accessCode || generateCampaignAccessCode());
                    }}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/25 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Campaign</span>
                  </button>
                </div>

                <a
                  href={`/campaigns/${camp.slug || camp.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
                >
                  <span>Preview Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Campaign Modal */}
      {editingCamp && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0e0c26] border border-cyan-500/40 p-5 sm:p-7 space-y-4 shadow-2xl my-auto relative">
            <button
              onClick={() => setEditingCamp(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white font-bold cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold border border-cyan-500/30 mb-2">
                <Edit3 className="w-3.5 h-3.5" />
                <span>EDIT CAMPAIGN CONTROLS</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Edit Campaign Details
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Update campaign name, cover photo, CPM rates, budget allocation, and brand access code.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Campaign Name / Title */}
              <div>
                <label className="text-purple-300 font-semibold block mb-1">
                  Campaign Name / Title *
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="e.g. Vikram Barick's clipping"
                  className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-cyan-400 font-medium text-sm"
                />
              </div>

              {/* Campaign Photo / Cover Image */}
              <div>
                <label className="text-purple-300 font-semibold block mb-1">
                  Campaign Photo / Cover Image
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3.5 rounded-2xl bg-black/40 border border-white/10">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-900 border border-white/10 shrink-0">
                    {editThumbnail ? (
                      <img
                        src={editThumbnail}
                        alt="Campaign Cover"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-1">
                        <ImageIcon className="w-6 h-6" />
                        <span className="text-[9px]">No Photo</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      value={editThumbnail}
                      onChange={(e) => setEditThumbnail(e.target.value)}
                      placeholder="Paste image URL (https://...)"
                      className="w-full p-2.5 text-xs rounded-xl bg-white/[0.04] border border-white/10 text-white outline-none focus:border-cyan-400 font-mono"
                    />

                    <div className="flex flex-wrap items-center gap-2">
                      <label className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, setEditThumbnail);
                          }}
                        />
                      </label>

                      {editThumbnail && (
                        <button
                          type="button"
                          onClick={() => setEditThumbnail('')}
                          className="px-2.5 py-1 text-[11px] text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10 cursor-pointer"
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-slate-400">Presets:</span>
                      {PHOTO_PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => setEditThumbnail(preset.url)}
                          className="px-2 py-0.5 rounded text-[10px] bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 cursor-pointer transition-colors"
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CPM Rate & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-purple-300 font-semibold block mb-1">
                    CPM Rate ($ per 1,000 views)
                  </label>
                  <input
                    type="number"
                    step="any"
                    min="0.01"
                    value={newCpm}
                    onChange={(e) => setNewCpm(Number(e.target.value))}
                    className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-sm outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-purple-300 font-semibold block mb-1">
                    Total Campaign Budget ($)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={newBudget}
                    onChange={(e) => setNewBudget(Number(e.target.value))}
                    className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-sm outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Access Code */}
              <div>
                <label className="text-purple-300 font-semibold flex items-center justify-between mb-1">
                  <span>Brand Analytics Access Code</span>
                  <button
                    type="button"
                    onClick={() => setEditAccessCode(generateCampaignAccessCode())}
                    className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Regenerate</span>
                  </button>
                </label>
                <input
                  type="text"
                  value={editAccessCode}
                  onChange={(e) => setEditAccessCode(e.target.value.toUpperCase())}
                  placeholder="e.g. CLM-MQFZGK"
                  className="w-full p-3 rounded-xl bg-black/40 border border-cyan-500/30 text-cyan-300 font-mono uppercase text-sm outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingCamp(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={savingEdit}
                onClick={handleSaveBudget}
                className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/25 cursor-pointer disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>{savingEdit ? 'Saving Changes...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Campaign Modal (Admin Only) */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0d091e] border border-purple-500/40 p-5 sm:p-8 space-y-6 shadow-2xl my-auto relative">
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white font-bold cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ADMIN CAMPAIGN DISPATCH</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Post New Campaign Brief
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Configure rates, assign to a brand sponsor, and publish to the clipper marketplace.
              </p>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4 text-xs">
              {/* Brand Sponsor & Access Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-purple-300 font-semibold block mb-1">Brand Sponsor</label>
                  <select
                    value={newBrandId}
                    onChange={(e) => setNewBrandId(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    {brands.length === 0 ? (
                      <option value="">Default Brand Partner</option>
                    ) : (
                      brands.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.email})
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-purple-300 font-semibold flex items-center justify-between mb-1">
                    <span>Brand Access Code *</span>
                    <button
                      type="button"
                      onClick={() => setNewAccessCode(generateCampaignAccessCode())}
                      className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Generate</span>
                    </button>
                  </label>
                  <input
                    type="text"
                    required
                    value={newAccessCode}
                    onChange={(e) => setNewAccessCode(e.target.value.toUpperCase())}
                    placeholder="e.g. CLM-839201"
                    className="w-full p-3 rounded-xl bg-black/40 border border-cyan-500/30 text-cyan-300 font-mono uppercase placeholder-slate-500 outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Title & Industry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-purple-300 font-semibold block mb-1">Campaign Title *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Brendan Backstrom Clipping #11"
                    className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-purple-300 font-semibold block mb-1">Industry / Category</label>
                  <select
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="Creator Economy">Creator Economy</option>
                    <option value="Tech & AI">Tech & AI</option>
                    <option value="FinTech">FinTech</option>
                    <option value="Gaming & Esports">Gaming & Esports</option>
                    <option value="Music & Beats">Music & Beats</option>
                    <option value="Lifestyle & Fitness">Lifestyle & Fitness</option>
                    <option value="UGC & E-Commerce">UGC & E-Commerce</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-purple-300 font-semibold block mb-1">Campaign Description</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Clip the highest-converting moments, podcast highlights, and viral insights..."
                  className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              {/* Budget, CPM, and Target Views */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-purple-300 font-semibold block mb-1">Total Budget ($)</label>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={newCampBudget}
                    onChange={(e) => handleBudgetChange(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white font-mono outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-purple-300 font-semibold block mb-1">CPM Rate ($ / 1k views)</label>
                  <input
                    type="number"
                    min="0.01"
                    step="any"
                    value={newCampCpm}
                    onChange={(e) => handleCpmChange(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white font-mono outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-purple-300 font-semibold block mb-1">Target Views</label>
                  <input
                    type="number"
                    value={newTargetViews}
                    onChange={(e) => setNewTargetViews(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white font-mono outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Allowed Platforms */}
              <div>
                <label className="text-purple-300 font-semibold block mb-1.5">Eligible Channels</label>
                <div className="flex flex-wrap gap-2">
                  {['INSTAGRAM', 'TIKTOK', 'YOUTUBE', 'FACEBOOK'].map((p) => {
                    const active = newPlatforms.includes(p);
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handleTogglePlatform(p)}
                        className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold border transition-all cursor-pointer ${
                          active
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                            : 'bg-white/[0.03] text-slate-400 border-white/10'
                        }`}
                      >
                        {active ? '✓ ' : ''}{p}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Source Video & Drive Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-purple-300 font-semibold block mb-1">Master Source Video URL</label>
                  <input
                    type="url"
                    value={newSourceUrl}
                    onChange={(e) => setNewSourceUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=... or Google Drive"
                    className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-purple-300 font-semibold block mb-1">Drive / Asset Assets Folder</label>
                  <input
                    type="url"
                    value={newDriveUrl}
                    onChange={(e) => setNewDriveUrl(e.target.value)}
                    placeholder="https://drive.google.com/drive/folders/..."
                    className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Campaign Cover Photo / Thumbnail */}
              <div>
                <label className="text-purple-300 font-semibold block mb-1">
                  Campaign Cover Photo / Thumbnail
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3.5 rounded-2xl bg-black/40 border border-white/10">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-900 border border-white/10 shrink-0">
                    {newThumbnail ? (
                      <img
                        src={newThumbnail}
                        alt="Campaign Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-1">
                        <ImageIcon className="w-6 h-6" />
                        <span className="text-[9px]">No Photo</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      value={newThumbnail}
                      onChange={(e) => setNewThumbnail(e.target.value)}
                      placeholder="Paste image URL (https://...)"
                      className="w-full p-2.5 text-xs rounded-xl bg-white/[0.04] border border-white/10 text-white outline-none focus:border-cyan-400 font-mono"
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, setNewThumbnail);
                          }}
                        />
                      </label>
                      {newThumbnail && (
                        <button
                          type="button"
                          onClick={() => setNewThumbnail('')}
                          className="px-2.5 py-1 text-[11px] text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10 cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                      <div className="flex items-center gap-1.5 ml-auto">
                        <span className="text-[10px] text-slate-400">Presets:</span>
                        {PHOTO_PRESETS.map((preset) => (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={() => setNewThumbnail(preset.url)}
                            className="px-2 py-0.5 rounded text-[10px] bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 cursor-pointer transition-colors"
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guidelines */}
              <div>
                <label className="text-purple-300 font-semibold block mb-1">Clipping Rules & Guidelines</label>
                <textarea
                  rows={2}
                  value={newGuidelines}
                  onChange={(e) => setNewGuidelines(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={creating}
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 hover:opacity-90 transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{creating ? 'Publishing...' : 'Publish Campaign'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
