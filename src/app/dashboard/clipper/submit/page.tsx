'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Video, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export default function SubmitClipPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState('');
  const [platform, setPlatform] = useState('INSTAGRAM');
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [postAccountHandle, setPostAccountHandle] = useState('');
  const [initialViews, setInitialViews] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<any>(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetch('/api/campaigns')
      .then((r) => r.json())
      .then((data) => {
        if (data.campaigns) {
          setCampaigns(data.campaigns);
          const paramId = searchParams.get('campaignId');
          if (paramId) {
            setSelectedCampaignId(paramId);
          } else if (data.campaigns.length > 0) {
            setSelectedCampaignId(data.campaigns[0].id);
          }
        }
      });
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId: selectedCampaignId,
          platform,
          videoUrl,
          title,
          caption,
          postAccountHandle,
          initialViews: parseInt(initialViews) || 0,
          submissionNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to submit clip');
        setLoading(false);
        return;
      }

      setSuccess(data.submission);
    } catch {
      setError('An error occurred submitting the clip');
    } finally {
      setLoading(false);
    }
  };

  const selectedCampaign = campaigns.find((c) => c.id === selectedCampaignId);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Submit Published Clip</h1>
        <p className="text-xs sm:text-sm text-purple-200/70">
          Enter your live Instagram Reel, YouTube Short, or TikTok link to initiate verification.
        </p>
      </div>

      {success ? (
        <div className="p-8 rounded-3xl bg-[#140c26] border border-purple-900/50 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white font-display">Clip Submitted Successfully!</h2>
          <div className="text-xs text-purple-300 font-mono">Submission ID: {success.submissionNumber}</div>
          <p className="text-xs text-purple-200/70 max-w-md mx-auto leading-relaxed">
            Your submission has been queued for brand review and scheduled for view verification sync. Track its progress
            in your Submissions tab.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <a
              href="/dashboard/clipper/submissions"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-glow-purple"
            >
              View My Submissions
            </a>
            <button
              onClick={() => {
                setSuccess(null);
                setVideoUrl('');
                setTitle('');
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-medium text-purple-300 bg-white/5 hover:bg-white/10"
            >
              Submit Another Clip
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#140c26] border border-purple-900/50 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              {error}
            </div>
          )}

          {/* Campaign Selector */}
          <div>
            <label className="text-xs text-purple-300 font-medium">Select Campaign *</label>
            <select
              value={selectedCampaignId}
              onChange={(e) => setSelectedCampaignId(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e071c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
            >
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.rewardModel} - {c.brand?.name})
                </option>
              ))}
            </select>
            {selectedCampaign && (
              <div className="mt-2 text-[11px] text-purple-300/80 bg-[#1b1133] p-2.5 rounded-lg border border-purple-800/40 flex items-center justify-between">
                <span>
                  Rate:{' '}
                  <strong className="text-emerald-400">
                    {selectedCampaign.rewardModel === 'CPM'
                      ? `₹${selectedCampaign.cpmRate} / 1k views`
                      : `₹${selectedCampaign.rewardPerClip} Fixed`}
                  </strong>
                </span>
                <span>
                  Required Tags: <strong className="text-cyan-300">{selectedCampaign.requiredHashtags}</strong>
                </span>
              </div>
            )}
          </div>

          {/* Social Platform */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-purple-300 font-medium">Social Platform *</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e071c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="INSTAGRAM">Instagram Reels</option>
                <option value="YOUTUBE">YouTube Shorts</option>
                <option value="TIKTOK">TikTok</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-purple-300 font-medium">Post Account Handle</label>
              <input
                type="text"
                value={postAccountHandle}
                onChange={(e) => setPostAccountHandle(e.target.value)}
                placeholder="@yourpagehandle"
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e071c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Video URL */}
          <div>
            <label className="text-xs text-purple-300 font-medium">Live Post URL *</label>
            <input
              type="url"
              required
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.instagram.com/reel/C8_zX8yP9kL/ or https://youtube.com/shorts/..."
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e071c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Title and Views */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-purple-300 font-medium">Clip Hook Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Prompt Comparison Hook"
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e071c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs text-purple-300 font-medium">Current View Count (At Submission)</label>
              <input
                type="number"
                value={initialViews}
                onChange={(e) => setInitialViews(e.target.value)}
                placeholder="e.g. 5200"
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e071c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Caption & Notes */}
          <div>
            <label className="text-xs text-purple-300 font-medium">Caption Used</label>
            <textarea
              rows={2}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Copy of caption and hashtags posted on your social page..."
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e071c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs text-purple-300 font-medium">Notes for Brand Reviewer</label>
            <input
              type="text"
              value={submissionNotes}
              onChange={(e) => setSubmissionNotes(e.target.value)}
              placeholder="e.g. Highlighted first 3 seconds retention hook as per brief."
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e071c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-glow-purple flex items-center justify-center gap-2 text-sm"
          >
            <span>{loading ? 'Submitting to Queue...' : 'Submit Clip for Verification'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}
