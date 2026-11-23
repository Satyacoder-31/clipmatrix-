'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCheck,
  Eye,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Flame,
  ArrowRight,
  Zap,
  Globe2,
  Users,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { ScrapedVideoStats } from '@/lib/scrapers/types';

export default function AdminVerificationPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [selectedSub, setSelectedSub] = useState<any>(null);
  const [verifiedViews, setVerifiedViews] = useState('');
  const [method, setMethod] = useState('INSTAGRAM_GRAPH_API');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [scrapedData, setScrapedData] = useState<ScrapedVideoStats | null>(null);
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [msg, setMsg] = useState('');

  const loadSubmissions = () => {
    setLoading(true);
    fetch('/api/submissions')
      .then((r) => r.json())
      .then((data) => {
        if (data.submissions) {
          setSubmissions(data.submissions);
          if (data.submissions.length > 0 && !selectedSub) {
            setSelectedSub(data.submissions[0]);
            setVideoUrlInput(data.submissions[0].videoUrl || '');
            setVerifiedViews(data.submissions[0].reportedViews?.toString() || '100000');
          }
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleSelectSub = (sub: any) => {
    setSelectedSub(sub);
    setVideoUrlInput(sub.videoUrl || '');
    setVerifiedViews(sub.reportedViews > 0 ? sub.reportedViews.toString() : '120000');
    setScrapedData(null);
    setMsg('');
  };

  const handleAutoScrape = async () => {
    const targetUrl = videoUrlInput.trim() || selectedSub?.videoUrl;
    if (!targetUrl) {
      setMsg('❌ Please enter or select a video URL to scrape.');
      return;
    }
    setScraping(true);
    setMsg('');

    try {
      const res = await fetch('/api/verification/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: targetUrl,
          submissionId: selectedSub?.id || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMsg(`❌ Scraper Error: ${data.error || 'Failed to scrape video'}`);
      } else {
        const stats: ScrapedVideoStats = data.stats;
        setScrapedData(stats);
        setVerifiedViews(stats.viewCount.toString());
        setMethod(stats.verificationMethod);
        setNotes(
          `Scraped live via ${stats.verificationMethod}. Tier-1 Audience: ${stats.demographics.tier1Percent}%. Fraud Score: ${stats.demographics.fraudScore}/100.`
        );
        setMsg(`⚡ Successfully scraped live stats & audience demographics from ${stats.platform}!`);
      }
    } catch {
      setMsg('❌ Failed to run live scraper.');
    } finally {
      setScraping(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;
    setVerifying(true);
    setMsg('');

    try {
      const res = await fetch('/api/verification/verify-views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: selectedSub.id,
          verifiedViews: parseInt(verifiedViews, 10),
          verificationMethod: method,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMsg(`❌ Error: ${data.error || 'Failed to verify'}`);
      } else {
        setMsg(`✅ ${data.message}`);
        loadSubmissions();
      }
    } catch {
      setMsg('❌ Failed to run verification');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          View Verification & Performance Settlement Engine
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/70">
          Audit authentic video views, generate timeline snapshots, calculate CPM rewards, and credit clipper wallets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Submissions List */}
        <div className="lg:col-span-5 rounded-2xl bg-[#140c26] border border-purple-900/50 p-4 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-purple-400 pb-2 border-b border-purple-900/40">
            Select Submission to Audit
          </div>

          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {submissions.map((sub) => {
              const isSelected = selectedSub?.id === sub.id;
              return (
                <div
                  key={sub.id}
                  onClick={() => handleSelectSub(sub)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-950/90 border-purple-400 shadow-glow-purple'
                      : 'bg-[#100720] border-purple-900/40 hover:border-purple-600/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-purple-400">{sub.submissionNumber}</span>
                    <span className="font-bold text-emerald-400">{sub.platform}</span>
                  </div>
                  <div className="text-xs font-bold text-white mt-1 line-clamp-1">{sub.title}</div>
                  <div className="text-[11px] text-purple-300/70 mt-1 flex justify-between">
                    <span>By: {sub.clipper?.name}</span>
                    <span className="font-semibold text-cyan-400">{sub.verifiedViews?.toLocaleString()} Views</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Audit & Execution Workbench */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#140c26] border border-purple-900/50 space-y-6">
          {selectedSub ? (
            <form onSubmit={handleVerify} className="space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-purple-900/40">
                <div>
                  <span className="text-[10px] font-mono uppercase text-purple-400">Auditing Submission</span>
                  <h2 className="text-lg font-bold text-white font-display">{selectedSub.title}</h2>
                </div>
                <a
                  href={selectedSub.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-1"
                >
                  <span>Open Video URL</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {msg && <div className="p-3.5 rounded-xl bg-purple-950/80 border border-purple-700/60 text-xs text-white">{msg}</div>}

              {/* Campaign Reward Specs */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#0e071c] border border-purple-900/40 text-center text-xs">
                <div>
                  <div className="text-[10px] text-purple-400">Reward Model</div>
                  <div className="font-bold text-white mt-0.5">{selectedSub.campaign?.rewardModel}</div>
                </div>
                <div>
                  <div className="text-[10px] text-purple-400">CPM Rate</div>
                  <div className="font-bold text-emerald-400 mt-0.5">₹{selectedSub.campaign?.cpmRate} / 1k</div>
                </div>
                <div>
                  <div className="text-[10px] text-purple-400">Current Earned</div>
                  <div className="font-bold text-white mt-0.5">₹{selectedSub.rewardEarned?.toLocaleString('en-IN')}</div>
                </div>
              </div>

              {/* ⚡ Live Scraper & Demographics Trigger */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#170a36] to-[#0c1635] border border-cyan-500/30 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5 font-display">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      <span>Real-Time Scraper & Audience Demographics Engine</span>
                    </div>
                    <div className="text-[11px] text-purple-200/70">
                      Extracts live views, likes, comments, Tier-1 country split & fraud flags.
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAutoScrape}
                    disabled={scraping}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 shrink-0 cursor-pointer"
                  >
                    {scraping ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Auditing Platform...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Auto-Scrape Live Metrics</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Editable Video URL to Scrape */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  <input
                    type="text"
                    value={videoUrlInput}
                    onChange={(e) => setVideoUrlInput(e.target.value)}
                    placeholder="https://www.youtube.com/shorts/... or https://www.instagram.com/reel/..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#090d20] border border-cyan-500/30 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                  />
                  {videoUrlInput && (
                    <a
                      href={videoUrlInput}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-white/5 border border-white/10 text-cyan-300 hover:text-white"
                      title="Open Video URL"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Demographics & Insights Inspection Panel */}
              {scrapedData && (
                <div className="p-5 rounded-2xl bg-[#0a0f24] border border-cyan-500/40 space-y-4 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-[10px] border border-cyan-500/30">
                        {scrapedData.platform}
                      </span>
                      <span className="text-xs text-white font-bold">{scrapedData.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Engine: {scrapedData.verificationMethod}
                    </span>
                  </div>

                  {/* Scraped Numbers Grid */}
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-[10px] text-slate-400">Live Views</div>
                      <div className="text-sm font-bold text-white font-mono mt-0.5">
                        {scrapedData.viewCount.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-[10px] text-slate-400">Likes</div>
                      <div className="text-sm font-bold text-white font-mono mt-0.5">
                        {scrapedData.likeCount.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-[10px] text-slate-400">Comments</div>
                      <div className="text-sm font-bold text-white font-mono mt-0.5">
                        {scrapedData.commentCount.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-[10px] text-slate-400">Engagement</div>
                      <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                        {scrapedData.demographics.engagementRate}%
                      </div>
                    </div>
                  </div>

                  {/* Demographics: Top Countries & Tier 1 Multiplier */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Audience Geography Breakdown</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px] border border-emerald-500/30">
                        Tier-1 Traffic: {scrapedData.demographics.tier1Percent}% ({scrapedData.demographics.cpmMultiplier}x CPM Bonus)
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {scrapedData.demographics.topCountries.map((c) => (
                        <div
                          key={c.code}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 border ${
                            c.isTier1
                              ? 'bg-purple-950/60 border-purple-500/40 text-purple-200'
                              : 'bg-white/[0.03] border-white/10 text-slate-300'
                          }`}
                        >
                          <span className="font-bold">{c.code}:</span>
                          <span>{c.percent}%</span>
                          {c.isTier1 && <span className="text-[9px] text-cyan-300 font-bold">★ Tier 1</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Demographics: Age & Gender */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-cyan-400" />
                        <span>Age Demographics</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
                        {scrapedData.demographics.ageGroups.map((ag) => (
                          <span key={ag.group} className="bg-white/5 px-1.5 py-0.5 rounded">
                            {ag.group}: {ag.percent}%
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-300">Gender Distribution</div>
                      <div className="flex items-center gap-3 text-[11px] font-mono text-slate-300">
                        <span className="text-cyan-300 font-bold">♂ Male {scrapedData.demographics.gender.male}%</span>
                        <span className="text-pink-300 font-bold">♀ Female {scrapedData.demographics.gender.female}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Anti-Fraud Status Banner */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck
                        className={`w-4 h-4 ${
                          scrapedData.demographics.fraudScore < 20 ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      />
                      <span className="text-slate-300">
                        Fraud Telemetry Score:{' '}
                        <strong className="text-white">{scrapedData.demographics.fraudScore} / 100</strong>
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        scrapedData.demographics.fraudScore < 20
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {scrapedData.demographics.fraudScore < 20 ? 'AUTHENTIC TRAFFIC' : 'FLAGGED FOR REVIEW'}
                    </span>
                  </div>
                </div>
              )}

              {/* View Input Field */}
              <div>
                <label className="text-xs text-purple-300 font-medium">New Verified View Count *</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={verifiedViews}
                  onChange={(e) => setVerifiedViews(e.target.value)}
                  placeholder="e.g. 185000"
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-base font-mono font-bold focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Verification Method */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-purple-300 font-medium">Verification Method</label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-xs"
                  >
                    <option value="INSTAGRAM_GRAPH_API">Instagram Graph API Audit</option>
                    <option value="YOUTUBE_DATA_API">YouTube Data API Snapshot</option>
                    <option value="TIKTOK_CREATOR_API">TikTok Developer API</option>
                    <option value="MANUAL_AUDIT">Manual Staff Audit</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-purple-300 font-medium">Audit Notes / Reason</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Verified organic Indian audience retention spike."
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-xs"
                  />
                </div>
              </div>

              {/* Real-time calculated reward display */}
              <div className="p-4 rounded-2xl bg-[#1b1035] border border-purple-700/50 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-purple-300 uppercase font-mono">Calculated Reward Output</div>
                  <div className="text-2xl font-extrabold text-emerald-400 font-display">
                    ₹
                    {(
                      Math.floor(
                        (parseInt(verifiedViews || '0', 10) / 1000) * (selectedSub.campaign?.cpmRate || 120)
                      ) || 0
                    ).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-right text-[11px] text-purple-300/80">
                  Will credit to: <strong className="text-white">{selectedSub.clipper?.name}</strong>
                </div>
              </div>

              <button
                type="submit"
                disabled={verifying}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-glow-purple flex items-center justify-center gap-2 text-xs"
              >
                <CheckCheck className="w-4 h-4" />
                <span>{verifying ? 'Executing Settlement...' : 'Verify Views & Credit Clipper Wallet'}</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-20 text-purple-300/70">Select a submission from the list to audit.</div>
          )}
        </div>
      </div>
    </div>
  );
}
