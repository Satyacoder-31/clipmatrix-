'use client';

import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  ShieldCheck,
  Zap,
  TrendingUp,
  Layers,
  ArrowRight,
  Eye,
  ChevronDown,
  ChevronUp,
  FileVideo,
  Sparkles,
} from 'lucide-react';

export default function ForBrandsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Campaign Preview Interactive State
  const [prevTitle, setPrevTitle] = useState('Aether AI 2.0 Global Launch');
  const [prevIndustry, setPrevIndustry] = useState('Tech & AI');
  const [prevBudget, setPrevBudget] = useState(150000);
  const [prevCpm, setPrevCpm] = useState(140);
  const [prevPlatforms, setPrevPlatforms] = useState(['Instagram Reels', 'YouTube Shorts']);

  const estimatedViews = Math.floor((prevBudget / prevCpm) * 1000);

  const brandFaqs = [
    {
      q: 'How does escrow protection work on Clip Matrix?',
      a: 'When you launch a campaign, your budget is deposited into a secure escrow wallet. Funds are only deducted when a clipper’s video submission is approved and its verified views are audited through our API checks. If your campaign ends with unused budget, the remaining balance can be refunded or rolled over instantly.',
    },
    {
      q: 'Do I get digital usage rights for paid ads (Spark Ads / Meta Whitelisting)?',
      a: 'Yes! All campaigns run on Clip Matrix include organic distribution rights as well as digital advertising whitelisting rights for the top-performing clips, allowing your growth team to scale them as Meta Ads or TikTok Spark Ads.',
    },
    {
      q: 'How do you verify authentic views and prevent bot traffic?',
      a: 'We monitor view velocity, audience retention curves, comment-to-view ratios, and direct API snapshots from Instagram Graph API and YouTube Data API. Any abnormal spike or bot activity is automatically flagged and rejected from CPM payouts.',
    },
    {
      q: 'What type of source footage should my brand provide?',
      a: 'Any long-form video works: podcast episodes, founder interviews, product demos, keynote recordings, webinar sessions, or raw unboxings. Our clippers extract the highest-impact moments and build retention-optimized vertical hooks.',
    },
  ];

  return (
    <div className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-purple-700/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-200 text-xs font-semibold">
          <Building2 className="w-3.5 h-3.5 text-purple-400" />
          <span>Brand & Agency Command Suite</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
          Scale Your Brand Through <span className="text-gradient-neon">Thousands of Short-Form Creators.</span>
        </h1>

        <p className="text-lg text-purple-200/80 max-w-2xl mx-auto leading-relaxed">
          Forget overpriced agency retainers and unpredictable influencer sponsorships. Distribute hundreds of viral
          Reels and Shorts with guaranteed CPM and 100% escrow-backed performance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="/auth/register-brand"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-glow-purple flex items-center justify-center gap-2"
          >
            <span>Create Brand Account</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-medium text-purple-200 bg-[#160d29] hover:bg-[#221440] transition-colors border border-purple-800/60"
          >
            Book Strategy Call
          </a>
        </div>
      </div>

      {/* Brand Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-[#130a24] border border-purple-900/50 hover:border-purple-500/40 transition-all space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">Pay Only For Verified Reach</h3>
          <p className="text-sm text-purple-200/70 leading-relaxed">
            Every rupee spent is tied directly to verified views audited by our API sync. Zero wasted spend on flat
            influencer fees that fail to generate traction.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#130a24] border border-purple-900/50 hover:border-purple-500/40 transition-all space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">Decentralized Organic Virality</h3>
          <p className="text-sm text-purple-200/70 leading-relaxed">
            Rather than posting all clips on your brand page, hundreds of distinct creator accounts publish in parallel,
            exponentially increasing your chances of triggering recommendation algorithms.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#130a24] border border-purple-900/50 hover:border-purple-500/40 transition-all space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">1-Click Submission Approvals</h3>
          <p className="text-sm text-purple-200/70 leading-relaxed">
            Review submitted video URLs directly inside your brand dashboard. Watch previews, check hashtags, approve or
            request edits with custom notes in one click.
          </p>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="rounded-3xl bg-[#110822] border border-purple-900/50 p-6 sm:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Clip Matrix vs Traditional Influencer Agencies
          </h2>
          <p className="text-purple-200/70 text-sm">See how performance clipping radically improves marketing ROI.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-purple-200">
            <thead>
              <tr className="border-b border-purple-900/50 text-xs uppercase font-mono text-purple-400">
                <th className="py-4 px-4">Feature / Metric</th>
                <th className="py-4 px-4 text-purple-300 font-bold bg-purple-950/40 rounded-t-xl">Clip Matrix Network</th>
                <th className="py-4 px-4 text-slate-400">Traditional Agency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30">
              <tr>
                <td className="py-4 px-4 font-medium text-white">Pricing Model</td>
                <td className="py-4 px-4 font-semibold text-emerald-400 bg-purple-950/20">Guaranteed CPM (₹80 - ₹150)</td>
                <td className="py-4 px-4 text-slate-400">Fixed ₹1L - ₹5L Upfront Retainer</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-medium text-white">Financial Security</td>
                <td className="py-4 px-4 font-semibold text-emerald-400 bg-purple-950/20">100% Escrow Protection</td>
                <td className="py-4 px-4 text-slate-400">Paid in advance with zero guarantee</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-medium text-white">Number of Creative Variations</td>
                <td className="py-4 px-4 font-semibold text-emerald-400 bg-purple-950/20">30 to 100+ unique clips</td>
                <td className="py-4 px-4 text-slate-400">Only 2 to 4 sponsored posts</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-medium text-white">Turnaround Speed</td>
                <td className="py-4 px-4 font-semibold text-emerald-400 bg-purple-950/20">24 - 48 Hours to Launch</td>
                <td className="py-4 px-4 text-slate-400">3 to 6 weeks of contracts & delays</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-medium text-white">Ad Whitelisting (Spark Ads)</td>
                <td className="py-4 px-4 font-semibold text-emerald-400 bg-purple-950/20">Included by default</td>
                <td className="py-4 px-4 text-slate-400">Additional 30% - 50% licensing fee</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Campaign Creation Preview */}
      <div className="rounded-3xl bg-gradient-to-br from-[#180e2f] to-[#100720] border border-purple-500/30 p-6 sm:p-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-purple-900/40">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400">Interactive Simulator</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 font-display">
              Preview Your Next Campaign Brief
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xs text-purple-300">Projected Reach</span>
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-display">
              {estimatedViews.toLocaleString()} Views
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-purple-300 font-medium">Campaign Title</label>
              <input
                type="text"
                value={prevTitle}
                onChange={(e) => setPrevTitle(e.target.value)}
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#120824] border border-purple-800/50 text-white text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-purple-300 font-medium">Industry</label>
              <select
                value={prevIndustry}
                onChange={(e) => setPrevIndustry(e.target.value)}
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#120824] border border-purple-800/50 text-white text-sm"
              >
                <option>Tech & AI</option>
                <option>Fashion & Sneakers</option>
                <option>Podcasts & Media</option>
                <option>Fitness & Health</option>
                <option>Fintech & SaaS</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-purple-300 font-medium">Campaign Escrow Budget (₹)</label>
              <input
                type="number"
                value={prevBudget}
                onChange={(e) => setPrevBudget(Number(e.target.value))}
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#120824] border border-purple-800/50 text-white text-sm"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#120822] border border-purple-800/40 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-mono text-purple-400 uppercase">Live Card Preview for Clippers</div>
              <div className="text-lg font-bold text-white font-display">{prevTitle}</div>
              <div className="text-xs text-purple-300">
                Industry: <span className="text-white font-semibold">{prevIndustry}</span> • Model:{' '}
                <span className="text-emerald-400 font-bold">CPM (₹{prevCpm}/1k views)</span>
              </div>
              <div className="text-xs text-purple-300/80 leading-relaxed">
                Clippers will cut 9:16 vertical clips from your video links and receive ₹{prevCpm} per 1,000 verified
                views.
              </div>
            </div>

            <a
              href="/auth/register-brand"
              className="w-full py-3 rounded-xl font-bold text-center text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-glow-purple"
            >
              Launch This Campaign Now
            </a>
          </div>
        </div>
      </div>

      {/* Brand FAQs */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">Frequently Asked Questions</h2>
          <p className="text-purple-200/70 text-sm">Everything you need to know about launching campaigns.</p>
        </div>

        <div className="space-y-3">
          {brandFaqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl bg-[#140b26] border border-purple-900/50 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between text-white font-semibold text-sm hover:text-purple-300 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-purple-200/70 leading-relaxed border-t border-purple-900/30 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
