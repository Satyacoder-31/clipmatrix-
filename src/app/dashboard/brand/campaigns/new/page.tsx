'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, ArrowRight, Video, FileText, DollarSign, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CreateCampaignPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState('Tech & AI');
  const [description, setDescription] = useState('');
  const [objective, setObjective] = useState('');
  const [sourceVideoUrl, setSourceVideoUrl] = useState('');
  const [driveAssetsUrl, setDriveAssetsUrl] = useState('');
  const [guidelines, setGuidelines] = useState('');
  const [hookSuggestions, setHookSuggestions] = useState('');
  const [prohibitedContent, setProhibitedContent] = useState('');
  const [requiredHashtags, setRequiredHashtags] = useState('#ad #viral');
  const [allowedPlatforms, setAllowedPlatforms] = useState('INSTAGRAM,YOUTUBE');
  const [rewardModel, setRewardModel] = useState('CPM');
  const [cpmRate, setCpmRate] = useState('120');
  const [rewardPerClip, setRewardPerClip] = useState('500');
  const [totalBudget, setTotalBudget] = useState('50000');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          industry,
          description,
          objective,
          sourceVideoUrl,
          driveAssetsUrl,
          guidelines,
          hookSuggestions,
          prohibitedContent,
          requiredHashtags,
          allowedPlatforms,
          rewardModel,
          cpmRate: parseFloat(cpmRate),
          rewardPerClip: parseFloat(rewardPerClip),
          totalBudget: parseFloat(totalBudget),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create campaign');
        setLoading(false);
        return;
      }

      router.push('/dashboard/brand/campaigns');
      router.refresh();
    } catch {
      setError('An error occurred during campaign creation');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Launch a Viral Clipping Campaign
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/70">
          Upload source footage, set guidelines, configure CPM or bounty rewards, and lock escrow.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
          {error}
        </div>
      )}

      {/* Step Indicators */}
      <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-center">
        <button
          type="button"
          onClick={() => setStep(1)}
          className={`p-3 rounded-xl border transition-all ${
            step === 1 ? 'bg-purple-600 text-white border-purple-400' : 'bg-[#140c26] text-purple-300 border-purple-900/40'
          }`}
        >
          1. Basics
        </button>
        <button
          type="button"
          onClick={() => setStep(2)}
          className={`p-3 rounded-xl border transition-all ${
            step === 2 ? 'bg-purple-600 text-white border-purple-400' : 'bg-[#140c26] text-purple-300 border-purple-900/40'
          }`}
        >
          2. Footage & Assets
        </button>
        <button
          type="button"
          onClick={() => setStep(3)}
          className={`p-3 rounded-xl border transition-all ${
            step === 3 ? 'bg-purple-600 text-white border-purple-400' : 'bg-[#140c26] text-purple-300 border-purple-900/40'
          }`}
        >
          3. Guidelines
        </button>
        <button
          type="button"
          onClick={() => setStep(4)}
          className={`p-3 rounded-xl border transition-all ${
            step === 4 ? 'bg-purple-600 text-white border-purple-400' : 'bg-[#140c26] text-purple-300 border-purple-900/40'
          }`}
        >
          4. Budget & Escrow
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-[#140c26] border border-purple-900/50 space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white font-display">Campaign Overview</h2>
            <div>
              <label className="text-xs text-purple-300 font-medium">Campaign Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Aether AI 2.0 Global Viral Launch"
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-purple-300 font-medium">Industry Category *</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm"
                >
                  <option>Tech & AI</option>
                  <option>Fashion & Sneakers</option>
                  <option>Podcasts & Media</option>
                  <option>Fitness & Health</option>
                  <option>Fintech & SaaS</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-purple-300 font-medium">Primary Objective</label>
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  placeholder="e.g. Drive 10,000 app downloads & viral buzz"
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-purple-300 font-medium">Campaign Description *</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of your product, founder speech, or launch..."
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm"
              />
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 text-xs flex items-center gap-1.5"
              >
                <span>Next: Footage Links</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white font-display">Source Footage & Raw Assets</h2>
            <div>
              <label className="text-xs text-purple-300 font-medium">Primary Source Video Link (YouTube / Vimeo / Cloudflare)</label>
              <input
                type="url"
                value={sourceVideoUrl}
                onChange={(e) => setSourceVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-purple-300 font-medium">Google Drive / Dropbox Folder (Logos, raw 4K clips, fonts)</label>
              <input
                type="url"
                value={driveAssetsUrl}
                onChange={(e) => setDriveAssetsUrl(e.target.value)}
                placeholder="https://drive.google.com/drive/folders/..."
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm"
              />
            </div>
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-purple-300 bg-white/5"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 text-xs flex items-center gap-1.5"
              >
                <span>Next: Creative Rules</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white font-display">Creative Guidelines & Retention Hooks</h2>
            <div>
              <label className="text-xs text-purple-300 font-medium">Instructions & Editing Rules *</label>
              <textarea
                rows={3}
                required
                value={guidelines}
                onChange={(e) => setGuidelines(e.target.value)}
                placeholder="e.g. Cut to 9:16 vertical. First 3s must feature dynamic text hook. Fast-paced cuts every 2 seconds."
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-purple-300 font-medium">Suggested 3-Second Hooks</label>
              <input
                type="text"
                value={hookSuggestions}
                onChange={(e) => setHookSuggestions(e.target.value)}
                placeholder="e.g. 'Stop paying $500 for stock footage...'"
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-purple-300 font-medium">Required Hashtags</label>
                <input
                  type="text"
                  value={requiredHashtags}
                  onChange={(e) => setRequiredHashtags(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-purple-300 font-medium">Prohibited Content</label>
                <input
                  type="text"
                  value={prohibitedContent}
                  onChange={(e) => setProhibitedContent(e.target.value)}
                  placeholder="e.g. No fake discount claims"
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm"
                />
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-purple-300 bg-white/5"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 text-xs flex items-center gap-1.5"
              >
                <span>Next: Budget & Escrow</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-white font-display">Campaign Budget & Reward Model</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-purple-300 font-medium">Reward Structure *</label>
                <select
                  value={rewardModel}
                  onChange={(e) => setRewardModel(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm"
                >
                  <option value="CPM">Guaranteed CPM Rate</option>
                  <option value="FIXED">Fixed Bounty Per Clip</option>
                  <option value="HYBRID">Hybrid (Base + CPM)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-purple-300 font-medium">
                  {rewardModel === 'FIXED' ? 'Reward Per Clip (₹)' : 'CPM Rate (₹ / 1,000 views)'}
                </label>
                <input
                  type="number"
                  value={rewardModel === 'FIXED' ? rewardPerClip : cpmRate}
                  onChange={(e) =>
                    rewardModel === 'FIXED' ? setRewardPerClip(e.target.value) : setCpmRate(e.target.value)
                  }
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-purple-300 font-medium">Campaign Total Budget (₹) *</label>
                <input
                  type="number"
                  min="5000"
                  step="5000"
                  required
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1b1133] border border-purple-700/40 text-xs text-purple-200 space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Escrow Allocation Notice
              </div>
              <p className="text-purple-300/80">
                ₹{Number(totalBudget).toLocaleString('en-IN')} will be transferred to campaign escrow. Unclaimed balance
                can be refunded or rolled over anytime.
              </p>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-purple-300 bg-white/5"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-glow-purple text-xs flex items-center gap-1.5"
              >
                <span>{loading ? 'Locking Escrow & Launching...' : 'Confirm & Launch Campaign'}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
