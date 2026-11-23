'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle,
  Eye,
  FileText,
  Play,
  Share2,
  ShieldCheck,
  Video,
  Download,
  ExternalLink,
  Scissors,
  Check,
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const fetchCampaign = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/campaigns/${params.id}`);
      const data = await res.json();
      if (data.campaign) {
        setCampaign(data.campaign);
        setIsJoined(data.campaign.isJoined);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [params.id]);

  const handleJoinCampaign = async () => {
    try {
      setJoining(true);
      const res = await fetch(`/api/campaigns/${params.id}/join`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        setIsJoined(true);
        router.push(`/dashboard/clipper/submit?campaignId=${params.id}`);
      } else {
        // Even if unauthorized or already joined, navigate to the streamlined submission page
        router.push(`/dashboard/clipper/submit?campaignId=${params.id}`);
      }
    } catch {
      router.push(`/dashboard/clipper/submit?campaignId=${params.id}`);
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return <div className="text-center py-32 text-purple-300">Loading campaign brief...</div>;
  }

  if (!campaign) {
    return (
      <div className="text-center py-32 space-y-4">
        <p className="text-white text-lg">Campaign not found.</p>
        <a href="/campaigns" className="text-purple-400 underline">
          Return to Marketplace
        </a>
      </div>
    );
  }

  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Back button */}
      <div>
        <a
          href="/campaigns"
          className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Campaign Marketplace
        </a>
      </div>

      {/* Main Campaign Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#1b1033] to-[#120924] border border-purple-500/30 p-6 sm:p-10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-950/80 text-purple-300 border border-purple-700/60 uppercase">
              {campaign.industry}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              Active Escrow Pool
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-purple-300/80">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Escrow Guaranteed by Clip Matrix
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="text-sm font-semibold text-purple-300 flex items-center gap-2">
              <Building2 className="w-4 h-4" /> {campaign.brand?.name}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display leading-tight">
              {campaign.title}
            </h1>
            <p className="text-sm sm:text-base text-purple-200/80 leading-relaxed max-w-3xl">
              {campaign.description}
            </p>
          </div>

          {/* Join / Submit Callout Box */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#140b26] border border-purple-800/50 space-y-4 text-center">
            <div className="text-xs uppercase font-mono text-purple-400">Reward Structure</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-display">
              {campaign.rewardModel === 'CPM'
                ? `₹${campaign.cpmRate} / 1k views`
                : campaign.rewardModel === 'FIXED'
                ? `₹${campaign.rewardPerClip} / clip`
                : `₹${campaign.rewardPerClip} + ₹${campaign.cpmRate} CPM`}
            </div>
            <div className="text-xs text-purple-300">
              Remaining Escrow Pool: <strong className="text-white">₹{campaign.remainingBudget.toLocaleString('en-IN')}</strong>
            </div>

            {isJoined ? (
              <div className="space-y-2">
                <div className="py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> You are participating in this campaign
                </div>
                <a
                  href={`/dashboard/clipper/submit?campaignId=${campaign.id}`}
                  className="w-full py-3 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-glow-purple block text-xs"
                >
                  Submit Live Video URL
                </a>
              </div>
            ) : (
              <button
                onClick={handleJoinCampaign}
                disabled={joining}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-glow-purple text-sm flex items-center justify-center gap-2"
              >
                <Scissors className="w-4 h-4 -rotate-45" />
                <span>{joining ? 'Joining...' : 'Join Campaign & Start Clipping'}</span>
              </button>
            )}

            {message && <div className="text-xs text-purple-300 pt-1">{message}</div>}
          </div>
        </div>
      </div>

      {/* Grid: Guidelines, Source Footage, Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Guidelines & Hooks */}
        <div className="lg:col-span-8 space-y-8">
          {/* Creative Instructions */}
          <div className="p-8 rounded-3xl bg-[#140c26] border border-purple-900/50 space-y-4">
            <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" /> Creative Guidelines & Editing Rules
            </h2>
            <div className="text-sm text-purple-200/80 leading-relaxed whitespace-pre-line bg-[#0e071c] p-5 rounded-2xl border border-purple-900/40">
              {campaign.guidelines}
            </div>
          </div>

          {/* Hook Suggestions */}
          {campaign.hookSuggestions && (
            <div className="p-8 rounded-3xl bg-[#140c26] border border-purple-900/50 space-y-4">
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Play className="w-5 h-5 text-pink-400" /> Suggested 3-Second Retention Hooks
              </h2>
              <div className="text-sm text-purple-200/80 leading-relaxed whitespace-pre-line bg-[#0e071c] p-5 rounded-2xl border border-purple-900/40 font-mono text-xs">
                {campaign.hookSuggestions}
              </div>
            </div>
          )}

          {/* Prohibited Content */}
          {campaign.prohibitedContent && (
            <div className="p-8 rounded-3xl bg-[#140c26] border border-purple-900/50 space-y-3">
              <h2 className="text-lg font-bold text-rose-400 font-display">Prohibited Content Rules</h2>
              <p className="text-sm text-purple-200/80 leading-relaxed">{campaign.prohibitedContent}</p>
            </div>
          )}
        </div>

        {/* Right Column: Source Assets & Specs */}
        <div className="lg:col-span-4 space-y-6">
          {/* Download & Source Footage Card */}
          <div className="p-6 rounded-3xl bg-[#140c26] border border-purple-900/50 space-y-5">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Video className="w-4 h-4 text-cyan-400" /> Source Footage & Assets
            </h3>

            {campaign.sourceVideoUrl && (
              <a
                href={campaign.sourceVideoUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-[#1b1133] hover:bg-[#251747] transition-colors border border-purple-800/40 flex items-center justify-between text-xs text-white"
              >
                <span>Watch Source Footage (YouTube/Vimeo)</span>
                <ExternalLink className="w-4 h-4 text-purple-400" />
              </a>
            )}

            {campaign.driveAssetsUrl && (
              <a
                href={campaign.driveAssetsUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-[#1b1133] hover:bg-[#251747] transition-colors border border-purple-800/40 flex items-center justify-between text-xs text-white"
              >
                <span>Raw Assets Folder (Google Drive)</span>
                <ExternalLink className="w-4 h-4 text-cyan-400" />
              </a>
            )}

            {campaign.rawVideoDownloadUrl && (
              <a
                href={campaign.rawVideoDownloadUrl}
                download
                className="p-3.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 transition-colors border border-purple-700/50 flex items-center justify-between text-xs text-white"
              >
                <span>Direct Raw MP4 Download</span>
                <Download className="w-4 h-4 text-emerald-400" />
              </a>
            )}
          </div>

          {/* Campaign Specs Card */}
          <div className="p-6 rounded-3xl bg-[#140c26] border border-purple-900/50 space-y-4 text-xs">
            <h3 className="text-base font-bold text-white font-display">Technical Specs</h3>

            <div className="divide-y divide-purple-900/30 text-purple-200">
              <div className="py-2.5 flex justify-between">
                <span>Aspect Ratio</span>
                <span className="font-bold text-white">{campaign.aspectRatio} Vertical</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span>Duration</span>
                <span className="font-bold text-white">
                  {campaign.minDurationSec}s - {campaign.maxDurationSec}s
                </span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span>Allowed Platforms</span>
                <span className="font-bold text-purple-400">{campaign.allowedPlatforms}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span>Required Hashtags</span>
                <span className="font-mono text-[11px] text-cyan-300">{campaign.requiredHashtags}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
