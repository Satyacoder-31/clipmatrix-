'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Users,
  Send,
  Video,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  Trophy,
  BarChart3,
  ListFilter,
  Sparkles,
} from 'lucide-react';

// Platform SVG Icons
const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const YouTubeIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const FacebookIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function SubmitClipPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'submissions' | 'stats' | 'leaderboard'>('submissions');
  const [mySubmissions, setMySubmissions] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Load campaigns
  useEffect(() => {
    fetch('/api/campaigns')
      .then((r) => r.json())
      .then((data) => {
        if (data.campaigns && data.campaigns.length > 0) {
          setCampaigns(data.campaigns);
          const paramId = searchParams.get('campaignId');
          if (paramId && data.campaigns.some((c: any) => c.id === paramId)) {
            setSelectedCampaignId(paramId);
          } else {
            setSelectedCampaignId(data.campaigns[0].id);
          }
        }
      })
      .catch(() => {});
  }, [searchParams]);

  // Load user submissions for this campaign
  const fetchMySubmissions = (campaignId: string) => {
    if (!campaignId) return;
    fetch(`/api/submissions?campaignId=${campaignId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.submissions) {
          setMySubmissions(data.submissions);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (selectedCampaignId) {
      fetchMySubmissions(selectedCampaignId);
    }
  }, [selectedCampaignId]);

  // Auto-detect platform from videoUrl
  const detectPlatform = (url: string) => {
    const lower = url.toLowerCase();
    if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'YouTube';
    if (lower.includes('tiktok.com')) return 'TikTok';
    if (lower.includes('facebook.com') || lower.includes('fb.watch')) return 'Facebook';
    if (lower.includes('instagram.com')) return 'Instagram';
    return null;
  };

  const detected = detectPlatform(videoUrl);

  const currentCampaign = campaigns.find((c) => c.id === selectedCampaignId) || {
    id: selectedCampaignId || 'camp-default',
    title: 'Brendan Backstrom Clipping #10',
    description: 'Brendan Backstrom Clipping #10',
    cpmRate: 120, // ₹120 or $1
    totalBudget: 10000,
    remainingBudget: 2915,
    targetViews: 10000000,
    verifiedViews: 8765909,
    status: 'ACTIVE',
    avgReview: '8.8h',
    minViewsForPayout: '100,000 views',
  };

  // Budget calculations
  const totalBudget = currentCampaign.totalBudget || 10000;
  const remainingBudget = currentCampaign.remainingBudget !== undefined ? currentCampaign.remainingBudget : 2915;
  const usedBudget = Math.max(0, totalBudget - remainingBudget);
  const budgetUsedPercent = Math.min(100, Math.round((usedBudget / (totalBudget || 1)) * 100));

  // View calculations
  const targetViews = currentCampaign.targetViews || 10000000;
  const verifiedViews = currentCampaign.verifiedViews || 8765909;
  const viewProgressPercent = Math.min(100, Math.round((verifiedViews / (targetViews || 1)) * 100));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;

    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId: selectedCampaignId || currentCampaign.id,
          videoUrl: videoUrl.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setFeedback({ type: 'error', message: data.error || 'Failed to submit link' });
      } else {
        setFeedback({
          type: 'success',
          message: `Content URL submitted successfully! (ID: ${data.submission.submissionNumber})`,
        });
        setVideoUrl('');
        fetchMySubmissions(selectedCampaignId || currentCampaign.id);
      }
    } catch {
      setFeedback({ type: 'error', message: 'An error occurred while submitting' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 pb-20">
      {/* Top Header / Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-4">
        {/* Back Button */}
        <Link
          href="/dashboard/clipper/campaigns"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#00B887] hover:bg-[#009E74] transition-all shadow-md shadow-emerald-500/20 mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Campaigns</span>
        </Link>

        {/* Campaign Title & Metadata Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
                {currentCampaign.title}
              </h1>
              {campaigns.length > 1 && (
                <select
                  value={selectedCampaignId}
                  onChange={(e) => setSelectedCampaignId(e.target.value)}
                  className="bg-[#121722] border border-slate-700/60 text-xs text-slate-300 rounded-lg px-2.5 py-1 outline-none focus:border-emerald-500"
                >
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.id}>
                      Switch: {c.title}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {currentCampaign.description || currentCampaign.title}
            </p>

            {/* Meta Row: TBD - Rate - Submissions */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-3 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>TBD</span>
              </span>
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>₹{currentCampaign.cpmRate || 120} CPM</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>{mySubmissions.length} total submissions</span>
              </span>
            </div>
          </div>
        </div>

        {/* Submissions Pill Badge */}
        <div className="mt-4">
          <span className="inline-block px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#00B887]">
            Submissions
          </span>
        </div>
      </div>

      {/* Main Grid: Content Submission (Left) & Campaign Details (Right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-2">
        {/* Left Column (8 cols): Single URL Submission Card & Tabs */}
        <div className="lg:col-span-8 space-y-8">
          {/* Submit Your Content Card */}
          <div className="rounded-2xl bg-[#121722] border border-slate-800/80 p-8 sm:p-10 text-center shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-display">
              Submit Your Content
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Paste your content URL below. We'll automatically detect the platform.
            </p>

            {/* Single Input Form - No other video information requested */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-1 w-full">
                  <input
                    type="url"
                    required
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.instagram.com/p/..."
                    className="w-full px-4 py-3 rounded-xl bg-[#090d14] border border-slate-700/70 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00B887] transition-all"
                  />
                  {detected && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      {detected} Detected
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-white bg-[#00B887] hover:bg-[#009E74] transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 text-sm disabled:opacity-50 shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting...' : 'Submit'}</span>
                </button>
              </div>

              {feedback && (
                <div
                  className={`mt-4 p-3 rounded-xl text-xs font-medium flex items-center justify-center gap-2 ${
                    feedback.type === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                      : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : null}
                  <span>{feedback.message}</span>
                </div>
              )}
            </form>
          </div>

          {/* Bottom Tabs: My Submissions, My Stats, Leaderboard */}
          <div className="pt-2">
            <div className="flex items-center gap-8 border-b border-slate-800 text-sm font-semibold mb-6">
              <button
                onClick={() => setActiveTab('submissions')}
                className={`pb-3 transition-colors relative cursor-pointer ${
                  activeTab === 'submissions'
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>My Submissions</span>
                {activeTab === 'submissions' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00B887]" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('stats')}
                className={`pb-3 transition-colors relative cursor-pointer ${
                  activeTab === 'stats'
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>My Stats</span>
                {activeTab === 'stats' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00B887]" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`pb-3 transition-colors relative cursor-pointer ${
                  activeTab === 'leaderboard'
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Leaderboard</span>
                {activeTab === 'leaderboard' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00B887]" />
                )}
              </button>
            </div>

            {/* Tab: My Submissions */}
            {activeTab === 'submissions' && (
              <div>
                {mySubmissions.length === 0 ? (
                  <div className="py-16 text-center rounded-2xl bg-[#0d111a] border border-slate-800/60 flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800/60 flex items-center justify-center text-slate-500 mb-3">
                      <Video className="w-7 h-7" />
                    </div>
                    <p className="text-xs text-slate-400">
                      No submissions yet. Paste your content link above to submit your first clip.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {mySubmissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-4 rounded-xl bg-[#121722] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-all"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-mono font-bold text-emerald-400">
                              {sub.submissionNumber}
                            </span>
                            <span className="text-slate-500">•</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-slate-300">
                              {sub.platform}
                            </span>
                            <span className="text-slate-500">•</span>
                            <span className="text-slate-400">
                              {new Date(sub.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-xs font-mono text-slate-300 truncate max-w-md">
                            {sub.videoUrl}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              sub.status === 'VIEWS_VERIFIED'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : sub.status === 'APPROVED'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                : sub.status === 'REJECTED'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}
                          >
                            {sub.status === 'VIEWS_VERIFIED'
                              ? 'Verified'
                              : sub.status === 'APPROVED'
                              ? 'Approved'
                              : sub.status === 'REJECTED'
                              ? 'Rejected'
                              : 'Pending Review'}
                          </span>

                          <a
                            href={sub.videoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: My Stats */}
            {activeTab === 'stats' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#121722] border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">Total Views Generated</div>
                  <div className="text-2xl font-bold text-white font-display">
                    {mySubmissions.reduce((acc, s) => acc + (s.verifiedViews || 0), 0).toLocaleString()}
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-[#121722] border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">Total Earned</div>
                  <div className="text-2xl font-bold text-emerald-400 font-display">
                    ₹{mySubmissions.reduce((acc, s) => acc + (s.rewardEarned || 0), 0).toLocaleString()}
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-[#121722] border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">Approved Clips</div>
                  <div className="text-2xl font-bold text-white font-display">
                    {mySubmissions.filter((s) => s.status === 'APPROVED' || s.status === 'VIEWS_VERIFIED').length}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Leaderboard */}
            {activeTab === 'leaderboard' && (
              <div className="rounded-2xl bg-[#121722] border border-slate-800 p-4 space-y-2">
                {[
                  { rank: 1, name: 'Aarav Sharma', views: '4.2M views', earnings: '₹5,040' },
                  { rank: 2, name: 'Ananya Joshi', views: '2.8M views', earnings: '₹3,360' },
                  { rank: 3, name: 'Rohit Varma', views: '1.9M views', earnings: '₹2,280' },
                ].map((clipper) => (
                  <div
                    key={clipper.rank}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#090d14] text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-emerald-400 w-5">#{clipper.rank}</span>
                      <span className="font-semibold text-white">{clipper.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-slate-400">{clipper.views}</span>
                      <span className="font-bold text-emerald-400">{clipper.earnings}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar (4 cols): CAMPAIGN DETAILS & SUPPORTED PLATFORMS */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: CAMPAIGN DETAILS */}
          <div className="rounded-2xl bg-[#121722] border border-slate-800/80 p-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              CAMPAIGN DETAILS
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Status</span>
                <span className="font-semibold text-[#00B887]">Active</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">CPM Rate</span>
                <span className="font-semibold text-white">₹{currentCampaign.cpmRate || 120}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Budget</span>
                <span className="font-semibold text-white">
                  ₹{totalBudget.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Avg Review Time</span>
                <span className="font-semibold text-[#00B887]">{currentCampaign.avgReview || '8.8h'}</span>
              </div>

              {/* Progress 1: Budget Used */}
              <div className="pt-1 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Budget Used</span>
                  <span className="font-bold text-[#00B887]">
                    ₹{usedBudget.toLocaleString()} ({budgetUsedPercent}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00B887] rounded-full transition-all duration-500"
                    style={{ width: `${budgetUsedPercent}%` }}
                  />
                </div>
              </div>

              {/* Progress 2: View Progress */}
              <div className="pt-1 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">View Progress</span>
                  <span className="font-bold text-[#38bdf8]">
                    {verifiedViews.toLocaleString()} / {targetViews.toLocaleString()} ({viewProgressPercent}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#38bdf8] rounded-full transition-all duration-500"
                    style={{ width: `${viewProgressPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                <span className="text-slate-400">Min. Views for Payout</span>
                <span className="font-semibold text-white">
                  {currentCampaign.minViewsForPayout || '100,000 views'}
                </span>
              </div>
            </div>
          </div>

          {/* Card: SUPPORTED PLATFORMS */}
          <div className="rounded-2xl bg-[#121722] border border-slate-800/80 p-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              SUPPORTED PLATFORMS
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#090d14] border border-slate-800 text-slate-300">
                <InstagramIcon className="w-4 h-4 text-pink-500" />
                <span>Instagram</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#090d14] border border-slate-800 text-slate-300">
                <TikTokIcon className="w-4 h-4 text-cyan-400" />
                <span>TikTok</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#090d14] border border-slate-800 text-slate-300">
                <YouTubeIcon className="w-4 h-4 text-red-500" />
                <span>YouTube</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#090d14] border border-slate-800 text-slate-300">
                <FacebookIcon className="w-4 h-4 text-blue-500" />
                <span>Facebook</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating "Need help?" Pill Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setHelpOpen(!helpOpen)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs text-white bg-[#00B887] hover:bg-[#009E74] transition-all shadow-xl shadow-emerald-500/25 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Need help?</span>
        </button>

        {helpOpen && (
          <div className="absolute bottom-12 right-0 w-80 p-4 rounded-2xl bg-[#121722] border border-slate-700 shadow-2xl text-xs space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="font-bold text-white">Clip Matrix Clipper Support</span>
              <button
                onClick={() => setHelpOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Have questions about clipping guidelines, payouts, or view verification? Join our 24/7 Discord community or reach our support team.
            </p>
            <div className="pt-1">
              <a
                href="https://discord.gg/clipmatrix"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-center block"
              >
                Open Discord Support
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
