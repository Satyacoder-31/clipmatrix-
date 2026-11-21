'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  Scissors,
  Sparkles,
  Flame,
  ArrowUpRight,
  ArrowRight,
  Play,
  TrendingUp,
  ShieldCheck,
  Zap,
  CheckCircle,
  Eye,
  Award,
  Video,
  BarChart3,
  Users,
  Building2,
  ChevronRight,
  Star,
  Instagram,
  Youtube,
  Infinity as InfinityIcon,
  Facebook,
  Check,
  Clock,
  Layers,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Send,
  Sliders,
  DollarSign,
  FileText,
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function HomePage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [filteredPlatform, setFilteredPlatform] = useState('ALL');
  const [activeTab, setActiveTab] = useState<'brand' | 'clipper'>('brand');

  // Scroll animations hooks
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ROI Calculator state
  const [calcBudget, setCalcBudget] = useState(100000);
  const [calcCpm, setCalcCpm] = useState(120);
  const [calcAov, setCalcAov] = useState(1800);
  const [calcConversion, setCalcConversion] = useState(1.2);

  // Clipper Simulator state
  const [viewsSim, setViewsSim] = useState(150000);

  // Brand Simulator state
  const [prevTitle, setPrevTitle] = useState('Aether AI 2.0 Global Launch');
  const [prevIndustry, setPrevIndustry] = useState('Tech & AI');
  const [prevBudget, setPrevBudget] = useState(150000);
  const [prevCpm, setPrevCpm] = useState(140);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactDate, setContactDate] = useState('');
  const [contactTime, setContactTime] = useState('14:00');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  useEffect(() => {
    fetch('/api/campaigns')
      .then((res) => res.json())
      .then((data) => {
        if (data.campaigns) setCampaigns(data.campaigns);
      })
      .catch(() => {});
  }, []);

  // ROI computations
  const estimatedViews = Math.floor((calcBudget / calcCpm) * 1000);
  const estimatedCostPerView = (calcBudget / estimatedViews).toFixed(2);
  const estimatedClicks = Math.floor(estimatedViews * 0.022);
  const estimatedConversions = Math.floor(estimatedClicks * (calcConversion / 100));
  const estimatedRevenue = estimatedConversions * calcAov;
  const estimatedRoas = (estimatedRevenue / calcBudget).toFixed(1);

  // Clipper earnings
  const potentialClipperEarnings = Math.floor((viewsSim / 1000) * 140);

  // Brand estimated views
  const brandEstimatedViews = Math.floor((prevBudget / prevCpm) * 1000);

  const displayedCampaigns = campaigns.filter((c) => {
    if (filteredPlatform === 'ALL') return true;
    return c.allowedPlatforms?.includes(filteredPlatform);
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          company: contactCompany,
          message: contactMessage,
          date: contactDate,
          time: contactTime,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setContactSubmitted(true);
      }
    } catch {
      alert('Failed to send consultation inquiry');
    } finally {
      setContactLoading(false);
    }
  };

  const smoothScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const navHeight = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', id);
    }
  };

  return (
    <div className="relative overflow-hidden bg-transparent scroll-smooth">
      {/* Top Radiant Neon Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#9333ea] via-[#e879f9] to-[#38bdf8] origin-left z-[60] shadow-[0_0_12px_#c026d3]"
        style={{ scaleX }}
      />

      {/* =========================================================================
          SECTION 1: HERO SECTION
          ========================================================================= */}
      <section
        id="hero"
        className="relative pt-8 pb-20 lg:pt-14 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center scroll-mt-24"
      >

        {/* Top Floating Ecosystem Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-[#150a2b]/90 backdrop-blur-2xl border border-purple-500/40 text-xs font-medium text-purple-200 shadow-[0_0_25px_rgba(168,85,247,0.25)] mb-8"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-white font-semibold">Decentralized Short-Form Distribution</span>
          <span className="text-purple-400/50">•</span>
          <span className="text-emerald-400 font-mono font-bold">100% Escrow Protected</span>
          <span className="text-purple-400/50 hidden sm:inline">•</span>
          <span className="text-purple-300 hidden sm:inline">Instant UPI Cashouts</span>
        </motion.div>

        {/* Central High-Impact Headline - Original, Bold & Distinct */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-white tracking-[-0.035em] text-center leading-[1.06] max-w-5xl font-display"
        >
          Turn Long-Form Videos Into <br />
          <span className="bg-gradient-to-r from-[#f472b6] via-[#c084fc] to-[#38bdf8] bg-clip-text text-transparent">
            Millions of Viral Short Views
          </span>
        </motion.h1>

        {/* Supporting Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-sm sm:text-lg text-purple-200/80 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          Connect your podcasts, product demos, and keynotes with over{' '}
          <strong className="text-white font-semibold">3,400+ vetted video editors</strong>. Clippers craft 3-second
          retention hooks, publish across <strong className="text-white font-semibold">Reels, Shorts & TikTok</strong>, and
          receive guaranteed CPM payouts locked safely in escrow.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8 w-full sm:w-auto"
        >
          <button
            onClick={() => smoothScroll('#brands')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#7c3aed] hover:opacity-95 transition-all shadow-lg shadow-fuchsia-600/30 flex items-center justify-center gap-2 group cursor-pointer border border-fuchsia-300/30"
          >
            <Sparkles className="w-4 h-4 text-fuchsia-200" />
            <span>Launch a Campaign</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => smoothScroll('#clippers')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold text-purple-100 hover:text-white bg-[#150a29] hover:bg-[#1f0e3d] transition-all border border-purple-500/40 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Scissors className="w-4 h-4 -rotate-45 text-purple-400" />
            <span>Join as a Clipper</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => smoothScroll('#campaigns')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Active Bounties (₹32.5L Escrow)</span>
          </button>
        </motion.div>

        {/* Live Social Proof Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-purple-300/80"
        >
          <div className="flex -space-x-2">
            {[
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Creator avatar"
                className="w-7 h-7 rounded-full border-2 border-[#07020f] object-cover"
              />
            ))}
          </div>
          <span>
            Joined by <strong className="text-white">3,420+ clippers</strong> across India
          </span>
          <span className="text-purple-500">•</span>
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <span>★ 4.9/5 Rating</span>
            <span className="text-purple-300/70 font-normal">(890+ Brand Reviews)</span>
          </div>
        </motion.div>

        {/* =====================================================================
            HERO VISUAL SHOWCASE: 3D DYNAMIC VIRAL CLIP CARDS & PIPELINE
            ===================================================================== */}
        <div className="mt-14 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Vertical Clip Card (Podcast / Founder Hook) */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotateY: 10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-4 rounded-3xl bg-gradient-to-b from-[#1c0e35] to-[#100720] border border-purple-500/30 p-4 shadow-2xl shadow-purple-950/70 text-left relative overflow-hidden group hover:border-purple-400/60 transition-all"
          >
            <div className="relative aspect-[9/14] sm:aspect-[9/13] rounded-2xl overflow-hidden bg-black/80">
              <img
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80"
                alt="Podcast viral clip"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />

              {/* Platform & Status Badge */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-pink-600 text-white shadow-md flex items-center gap-1">
                  <Instagram className="w-3 h-3" /> Instagram Reels
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  VERIFIED
                </span>
              </div>

              {/* Play icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-glow-purple group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>

              {/* Hook Caption */}
              <div className="absolute bottom-16 left-3 right-3">
                <div className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-white">
                  "The #1 reason 90% of SaaS startups fail within 12 months..."
                </div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-white/90">
                <span className="flex items-center gap-1 text-purple-300">
                  <Eye className="w-3.5 h-3.5 text-purple-400" /> 1.48M Views
                </span>
                <span className="text-emerald-400 font-mono font-bold">+₹20,720 Earned</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs px-1">
              <span className="text-purple-300/80">Clipper: <strong className="text-white">@nikhil.cuts</strong></span>
              <span className="text-xs font-mono text-cyan-400 font-semibold">CPM: ₹140</span>
            </div>
          </motion.div>

          {/* Center Pipeline Visualizer (1 Long Video ➔ 48 Viral Clips ➔ Mass Reach) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-4 rounded-3xl bg-[#120724]/90 backdrop-blur-xl border border-purple-500/30 p-6 shadow-2xl space-y-6 text-left"
          >
            <div className="flex items-center justify-between border-b border-purple-900/40 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">The Virality Engine</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-600/30 text-purple-300 border border-purple-500/40">
                LIVE PIPELINE
              </span>
            </div>

            <div className="space-y-4">
              {/* Pipeline Step 1 */}
              <div className="p-3.5 rounded-2xl bg-[#1a0e33] border border-purple-800/40 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">1. Ingest Raw Long Video</div>
                  <div className="text-[11px] text-purple-300/70">YouTube Link, Podcast URL, or Raw MP4</div>
                </div>
              </div>

              {/* Connecting Pulse Line */}
              <div className="flex justify-center -my-2">
                <div className="w-0.5 h-6 bg-gradient-to-b from-purple-500 to-cyan-400" />
              </div>

              {/* Pipeline Step 2 */}
              <div className="p-3.5 rounded-2xl bg-[#1a0e33] border border-purple-800/40 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Scissors className="w-5 h-5 -rotate-45" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">2. 1,200+ Clippers Cut Hooks</div>
                  <div className="text-[11px] text-purple-300/70">30 to 100+ high-retention variations</div>
                </div>
              </div>

              {/* Connecting Pulse Line */}
              <div className="flex justify-center -my-2">
                <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-400 to-emerald-400" />
              </div>

              {/* Pipeline Step 3 */}
              <div className="p-3.5 rounded-2xl bg-[#1a0e33] border border-purple-800/40 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">3. Verified Views & Escrow Release</div>
                  <div className="text-[11px] text-purple-300/70">Audited API sync • Zero ad fatigue</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => smoothScroll('#how-it-works')}
              className="w-full py-3 rounded-xl text-xs font-bold text-center text-purple-200 hover:text-white bg-purple-950/60 hover:bg-purple-900/60 border border-purple-700/50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Complete Engine Architecture</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Right Vertical Clip Card (Tech / D2C Launch Hook) */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-4 rounded-3xl bg-gradient-to-b from-[#1c0e35] to-[#100720] border border-purple-500/30 p-4 shadow-2xl shadow-purple-950/70 text-left relative overflow-hidden group hover:border-purple-400/60 transition-all"
          >
            <div className="relative aspect-[9/14] sm:aspect-[9/13] rounded-2xl overflow-hidden bg-black/80">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"
                alt="Tech AI viral clip"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />

              {/* Platform & Status Badge */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-600 text-white shadow-md flex items-center gap-1">
                  <Youtube className="w-3 h-3" /> YouTube Shorts
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                  TOP VIRAL
                </span>
              </div>

              {/* Play icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-glow-purple group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>

              {/* Hook Caption */}
              <div className="absolute bottom-16 left-3 right-3">
                <div className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-white">
                  "This 3D generative model renders full scenes in 4 seconds flat..."
                </div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-white/90">
                <span className="flex items-center gap-1 text-cyan-300">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" /> 920K Views
                </span>
                <span className="text-amber-400 font-mono font-bold">3.8x ROAS</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs px-1">
              <span className="text-purple-300/80">Brand: <strong className="text-white">Aether AI 2.0</strong></span>
              <span className="text-xs font-mono text-emerald-400 font-semibold">CPV: ₹0.11</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: STATISTICS COUNTERS
          ========================================================================= */}
      <section className="relative py-12 bg-[#0c0517]/80 backdrop-blur-md border-y border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              { label: 'Verified Views', value: '84.5M+', color: 'text-white' },
              { label: 'Active Clippers', value: '3,420+', color: 'text-purple-400' },
              { label: 'Campaigns Ran', value: '240+', color: 'text-white' },
              { label: 'Brands Onboarded', value: '120+', color: 'text-cyan-400' },
              { label: 'Clipper Payouts', value: '₹1.8Cr+', color: 'text-emerald-400' },
              { label: 'Approved Clips', value: '18,500+', color: 'text-white' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-4 rounded-2xl bg-purple-950/20 border border-purple-900/40 hover:border-purple-600/50 transition-colors"
              >
                <div className={`text-2xl sm:text-3xl font-extrabold ${stat.color} font-display`}>{stat.value}</div>
                <div className="text-xs text-purple-300/80 font-medium mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FOR BRANDS (#brands)
          ========================================================================= */}
      <section id="brands" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/60 uppercase tracking-widest font-mono">
            For Brands & Fast-Growing Agencies
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Scale Your Brand Through <span className="text-gradient-neon">Thousands of Short-Form Creators.</span>
          </h2>
          <p className="text-purple-200/70 text-base leading-relaxed">
            Forget overpriced agency retainers and unpredictable influencer sponsorships. Distribute hundreds of viral
            Reels and Shorts with guaranteed CPM and 100% escrow-backed performance.
          </p>
        </motion.div>

        {/* 3 Brand Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: ShieldCheck,
              title: 'Pay Only For Verified Reach',
              desc: 'Every rupee spent is tied directly to verified views audited by our API sync. Zero wasted spend on flat fees that fail to generate traction.',
              color: 'text-purple-400',
              bg: 'bg-purple-600/20 border-purple-500/30',
            },
            {
              icon: Zap,
              title: 'Decentralized Organic Virality',
              desc: 'Hundreds of distinct creator accounts publish in parallel, exponentially increasing your chances of triggering recommendation algorithms on Reels & Shorts.',
              color: 'text-cyan-400',
              bg: 'bg-cyan-600/20 border-cyan-500/30',
            },
            {
              icon: Layers,
              title: '1-Click Submission Approvals',
              desc: 'Review submitted video URLs directly inside your brand dashboard. Watch previews, check hashtags, approve or request edits with custom notes in one click.',
              color: 'text-pink-400',
              bg: 'bg-pink-600/20 border-pink-500/30',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-[#130a24] border border-purple-900/50 hover:border-purple-500/40 transition-all space-y-4"
              >
                <div className={`w-12 h-12 rounded-2xl ${item.bg} border flex items-center justify-center ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">{item.title}</h3>
                <p className="text-sm text-purple-200/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#110822] border border-purple-900/50 p-6 sm:p-10 space-y-6"
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Clip Matrix vs Traditional Influencer Agencies
            </h3>
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
                  <td className="py-4 px-4 font-medium text-white">Creative Variations</td>
                  <td className="py-4 px-4 font-semibold text-emerald-400 bg-purple-950/20">30 to 100+ unique clips</td>
                  <td className="py-4 px-4 text-slate-400">Only 2 to 4 sponsored posts</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Turnaround Speed</td>
                  <td className="py-4 px-4 font-semibold text-emerald-400 bg-purple-950/20">24 - 48 Hours to Launch</td>
                  <td className="py-4 px-4 text-slate-400">3 to 6 weeks of contracts & delays</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Interactive Campaign Creation Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-br from-[#180e2f] to-[#100720] border border-purple-500/30 p-6 sm:p-10 space-y-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-purple-900/40">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">Live Campaign Configurator</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1 font-display">
                Preview Your Next Campaign Brief
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-purple-300">Projected Reach</span>
              <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-display">
                {brandEstimatedViews.toLocaleString()} Verified Views
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
                <label className="text-xs text-purple-300 font-medium">Industry Category</label>
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
                <div className="text-xs font-mono text-purple-400 uppercase">Live Clipper Card Preview</div>
                <div className="text-lg font-bold text-white font-display">{prevTitle}</div>
                <div className="text-xs text-purple-300">
                  Industry: <span className="text-white font-semibold">{prevIndustry}</span> • Model:{' '}
                  <span className="text-emerald-400 font-bold">CPM (₹{prevCpm}/1k views)</span>
                </div>
                <div className="text-xs text-purple-300/80 leading-relaxed">
                  Clippers will cut 9:16 vertical clips from your video links and receive ₹{prevCpm} per 1,000 verified
                  views directly via escrow.
                </div>
              </div>

              <a
                href="/auth/register-brand"
                className="w-full py-3.5 rounded-xl font-bold text-center text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-glow-purple block text-xs"
              >
                Launch This Campaign as Brand
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          SECTION 4: FOR CLIPPERS (#clippers)
          ========================================================================= */}
      <section id="clippers" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/60 uppercase tracking-widest font-mono">
            Editor & Creator Monetization
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Your Editing Skills <span className="text-gradient-neon">Deserve to Get Paid.</span>
          </h2>
          <p className="text-purple-200/70 text-base leading-relaxed">
            Discover brand campaigns, download source footage, edit engaging 9:16 vertical hooks, publish them on your
            pages, and withdraw guaranteed CPM rewards directly via UPI.
          </p>
        </motion.div>

        {/* Clipper Simulator Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-br from-[#180e2f] to-[#100720] border border-purple-500/30 p-6 sm:p-10 space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400">Earnings Calculator</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              How Much Can You Earn Per Viral Clip?
            </h3>
            <p className="text-purple-200/70 text-xs sm:text-sm">
              Drag the slider to calculate your estimated payout based on verified views.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Verified Views on Your Clip</span>
                <span className="text-white font-bold font-mono text-base">{viewsSim.toLocaleString()} Views</span>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={viewsSim}
                onChange={(e) => setViewsSim(Number(e.target.value))}
                className="w-full accent-purple-500 h-2 bg-[#201438] rounded-lg cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-[#140b26] border border-purple-900/40">
                <div className="text-xs text-purple-300">Campaign CPM Rate</div>
                <div className="text-xl font-bold text-purple-400 mt-1">₹140 / 1k views</div>
              </div>
              <div className="p-4 rounded-xl bg-[#140b26] border border-purple-900/40">
                <div className="text-xs text-purple-300">Calculated Payout</div>
                <div className="text-2xl font-extrabold text-emerald-400 mt-1 font-display">
                  ₹{potentialClipperEarnings.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#140b26] border border-purple-900/40">
                <div className="text-xs text-purple-300">Withdrawal Speed</div>
                <div className="text-xl font-bold text-cyan-400 mt-1">Instant via UPI</div>
              </div>
            </div>

            <div className="text-center pt-2">
              <a
                href="/auth/register-clipper"
                className="px-8 py-3.5 rounded-full font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-glow-purple inline-block text-xs"
              >
                Register as a Clipper & Start Earning
              </a>
            </div>
          </div>
        </motion.div>

        {/* 3 Clipper Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: CheckCircle2,
              title: 'No Need to Hunt for Clients',
              desc: 'Stop sending cold DMs. High-budget brands are already live on Clip Matrix with ready-to-clip source footage and locked escrow funds.',
              color: 'text-purple-400',
            },
            {
              icon: Zap,
              title: 'Instant UPI Settlements',
              desc: 'No waiting 60 days for brand invoice clearance. Once your clip performance is verified, cash out straight to your PhonePe, GPay, or Paytm.',
              color: 'text-emerald-400',
            },
            {
              icon: Award,
              title: 'Leaderboards & Elite Bonuses',
              desc: 'Top editors unlock higher CPM rates, exclusive private campaigns, and monthly performance rewards.',
              color: 'text-pink-400',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-[#130a24] border border-purple-900/50 space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white font-display">{item.title}</h3>
                <p className="text-sm text-purple-200/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CAMPAIGN MARKETPLACE (#campaigns)
          ========================================================================= */}
      <section id="campaigns" className="py-24 bg-[#0a0415]/80 backdrop-blur-md border-y border-purple-900/30 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">Live Marketplace</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 font-display">
                Featured Brand Campaigns Active Now
              </h2>
              <p className="text-purple-200/70 text-sm mt-1">
                Browse verified campaigns, download source footage, and submit your live video URLs.
              </p>
            </div>

            {/* Platform filter tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#130826] border border-purple-900/50">
              {['ALL', 'INSTAGRAM', 'YOUTUBE', 'TIKTOK'].map((p) => (
                <button
                  key={p}
                  onClick={() => setFilteredPlatform(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filteredPlatform === p
                      ? 'bg-purple-600 text-white shadow-glow-purple'
                      : 'text-purple-300 hover:text-white'
                  }`}
                >
                  {p === 'ALL' ? 'All Platforms' : p === 'INSTAGRAM' ? 'Reels' : p === 'YOUTUBE' ? 'Shorts' : 'TikTok'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedCampaigns.map((camp, idx) => {
              const budgetPercent = Math.min(
                100,
                Math.round(((camp.totalBudget - camp.remainingBudget) / camp.totalBudget) * 100)
              );

              return (
                <motion.div
                  key={camp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="rounded-2xl bg-[#130b24] border border-purple-900/50 hover:border-purple-500/50 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
                >
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden bg-black/60">
                      <img
                        src={camp.thumbnailUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'}
                        alt={camp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 backdrop-blur-md text-white border border-white/10 uppercase">
                        {camp.industry}
                      </div>
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-600 text-white shadow-glow-purple">
                        {camp.rewardModel}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="text-xs text-purple-300 font-medium">{camp.brand?.name || 'Verified Brand'}</div>
                      <h3 className="text-base font-bold text-white line-clamp-2 font-display group-hover:text-purple-300 transition-colors">
                        {camp.title}
                      </h3>

                      <div className="bg-[#1b1035] p-3 rounded-xl border border-purple-800/40 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-purple-300/70 uppercase">Clipper Reward</div>
                          <div className="text-sm font-bold text-emerald-400">
                            {camp.rewardModel === 'CPM'
                              ? `₹${camp.cpmRate} / 1k views`
                              : camp.rewardModel === 'FIXED'
                              ? `₹${camp.rewardPerClip} / clip`
                              : `₹${camp.rewardPerClip} + CPM`}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-purple-300/70 uppercase">Total Budget</div>
                          <div className="text-xs font-semibold text-white">₹{camp.totalBudget?.toLocaleString('en-IN')}</div>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-[11px] text-purple-300/80">
                          <span>Claimed</span>
                          <span>{budgetPercent}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#201438] overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" style={{ width: `${budgetPercent}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <a
                      href={`/campaigns/${camp.slug || camp.id}`}
                      className="w-full py-2.5 rounded-xl text-xs font-semibold text-center text-white bg-purple-600/80 hover:bg-purple-600 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>View Guidelines & Assets</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: HOW IT WORKS (#how-it-works)
          ========================================================================= */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/60 uppercase tracking-widest font-mono">
            Decentralized Distribution Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-display">
            How The <span className="text-gradient-neon">Clip Matrix Engine</span> Works
          </h2>
          <p className="text-purple-200/70 text-base">
            From raw long-form footage to millions of distributed short-form views in four streamlined steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: '01',
              title: 'Brands Upload & Fund',
              desc: 'Companies submit long-form podcasts, tech launches, or product demos and lock campaign rewards in platform escrow.',
              color: 'text-purple-400',
              bg: 'bg-purple-600/20 border-purple-500/30',
            },
            {
              num: '02',
              title: 'Clippers Craft Edits',
              desc: 'Over 1,200 vetted editors access source assets, apply 3-second psychological retention hooks, captions, and music.',
              color: 'text-cyan-400',
              bg: 'bg-cyan-600/20 border-cyan-500/30',
            },
            {
              num: '03',
              title: 'Decentralized Posting',
              desc: 'Editors publish directly on their organic social pages (Instagram Reels, YouTube Shorts, TikTok) and submit post URLs.',
              color: 'text-pink-400',
              bg: 'bg-pink-600/20 border-pink-500/30',
            },
            {
              num: '04',
              title: 'Verified Views & Payout',
              desc: 'Our automated API sync & audit team verify real views. Guaranteed CPM rewards are released directly via UPI or Bank.',
              color: 'text-emerald-400',
              bg: 'bg-emerald-600/20 border-emerald-500/30',
            },
          ].map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-[#140c26] border border-purple-900/50 hover:border-purple-500/50 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl ${step.bg} border flex items-center justify-center ${step.color} font-bold font-mono text-lg mb-4 group-hover:scale-110 transition-transform`}>
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">{step.title}</h3>
              <p className="text-sm text-purple-200/70 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: CASE STUDIES (#case-studies)
          ========================================================================= */}
      <section id="case-studies" className="py-24 bg-[#0a0415]/80 backdrop-blur-md border-y border-purple-900/30 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/60 uppercase tracking-widest font-mono">
              Proven Virality Metrics
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
              Case Studies & <span className="text-gradient-neon">Campaign Proof</span>
            </h2>
            <p className="text-purple-200/70 text-base">
              Explore real data breakdowns, view metrics, and cost-per-view comparisons from top-performing clipping campaigns.
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                brand: 'Aether AI Technologies',
                industry: 'Tech & Multimodal AI',
                title: 'How Aether AI Scaled From 0 to 1.8M Verified Views in 18 Days',
                metric1: '1,850,000+',
                label1: 'Verified Views',
                metric2: '₹0.11',
                label2: 'Average CPV',
                metric3: '14,200',
                label3: 'Freemium Signups',
                thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
                summary: '24 Clip Matrix clippers cut 48 retention-optimized vertical hooks highlighting prompt comparison versus traditional 3D software.',
                quote: 'Clip Matrix delivered 10x more organic reach than traditional agency retainers at half the cost.',
                author: 'Devika Nair, VP Growth',
              },
              {
                brand: 'KicksDrop India',
                industry: 'D2C Fashion & Sneakers',
                title: 'Generating ₹28 Lakhs in Sneaker GMV via Travis Scott ASMR Unboxings',
                metric1: '920,000+',
                label1: 'Verified Views',
                metric2: '4.8x',
                label2: 'Verified ROAS',
                metric3: '1,420',
                label3: 'Sneaker Orders',
                thumbnail: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
                summary: 'By distributing ASMR sound-design edits and price comparison clips across Reels and TikTok, KicksDrop dominated limited drop hype.',
                quote: 'The escrow protection and CPM model gave us total transparency. We paid strictly for verified reach.',
                author: 'Rohan Singhania, Founder',
              },
            ].map((cs, idx) => (
              <motion.div
                key={cs.brand}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="rounded-3xl bg-[#130a24] border border-purple-900/50 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center hover:border-purple-500/40 transition-all shadow-xl"
              >
                <div className="lg:col-span-5 relative aspect-video sm:aspect-square lg:aspect-auto h-full min-h-[240px] rounded-2xl overflow-hidden bg-black">
                  <img src={cs.thumbnail} alt={cs.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  <div className="absolute bottom-4 left-4 right-4 text-xs text-white/90 font-medium italic">
                    "{cs.quote}" — <span className="font-bold text-white">{cs.author}</span>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <div className="text-xs font-mono uppercase tracking-widest text-purple-400">
                      {cs.brand} • {cs.industry}
                    </div>
                    <h3 className="text-2xl font-bold text-white font-display leading-tight">{cs.title}</h3>
                    <p className="text-sm text-purple-200/70 leading-relaxed">{cs.summary}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2 border-t border-purple-900/40">
                    <div className="p-3.5 rounded-xl bg-[#1b1033] border border-purple-800/40 text-center">
                      <div className="text-xl sm:text-2xl font-extrabold text-white font-display">{cs.metric1}</div>
                      <div className="text-[11px] text-purple-300/70 mt-0.5">{cs.label1}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#1b1033] border border-purple-800/40 text-center">
                      <div className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-display">{cs.metric2}</div>
                      <div className="text-[11px] text-cyan-300/70 mt-0.5">{cs.label2}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#1b1033] border border-purple-800/40 text-center">
                      <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-display">{cs.metric3}</div>
                      <div className="text-[11px] text-emerald-300/70 mt-0.5">{cs.label3}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: DASHBOARD DEMO PREVIEW (#dashboard-demo)
          ========================================================================= */}
      <section id="dashboard-demo" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-4"
        >
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/60 uppercase tracking-widest font-mono">
            Interactive Product Preview
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-display">
            Built For Real Scale, Transparency & Escrow
          </h2>
          <p className="text-purple-200/70 text-base">
            Skip messy spreadsheets. Toggle between the brand command center and clipper earnings below.
          </p>

          <div className="inline-flex p-1.5 rounded-xl bg-[#140c24] border border-purple-900/50 mt-4">
            <button
              onClick={() => setActiveTab('brand')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'brand' ? 'bg-purple-600 text-white shadow-glow-purple' : 'text-purple-300 hover:text-white'
              }`}
            >
              Brand Analytics Center
            </button>
            <button
              onClick={() => setActiveTab('clipper')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'clipper' ? 'bg-purple-600 text-white shadow-glow-purple' : 'text-purple-300 hover:text-white'
              }`}
            >
              Clipper Earnings Dashboard
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-[#10061e] border border-purple-700/30 p-4 sm:p-8 shadow-2xl shadow-purple-950/60"
        >
          <div className="flex items-center justify-between pb-6 border-b border-purple-900/40">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-purple-300/80 hidden sm:inline">
                clipmatrix.in/dashboard/{activeTab === 'brand' ? 'brand/analytics' : 'clipper/earnings'}
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live DB Sync Online
            </span>
          </div>

          {activeTab === 'brand' ? (
            <div className="pt-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#180e2e] border border-purple-900/50">
                  <div className="text-xs text-purple-300">Campaign Expenditure</div>
                  <div className="text-2xl font-bold text-white mt-1">₹3,50,000</div>
                  <div className="text-[11px] text-emerald-400 mt-1">100% Escrow Verified</div>
                </div>
                <div className="p-4 rounded-xl bg-[#180e2e] border border-purple-900/50">
                  <div className="text-xs text-purple-300">Total Verified Views</div>
                  <div className="text-2xl font-bold text-purple-400 mt-1">2.45M</div>
                  <div className="text-[11px] text-cyan-400 mt-1">₹0.14 Cost Per View</div>
                </div>
                <div className="p-4 rounded-xl bg-[#180e2e] border border-purple-900/50">
                  <div className="text-xs text-purple-300">Approved Short Clips</div>
                  <div className="text-2xl font-bold text-white mt-1">48 Clips</div>
                  <div className="text-[11px] text-purple-300/80 mt-1">From 18 Top Editors</div>
                </div>
                <div className="p-4 rounded-xl bg-[#180e2e] border border-purple-900/50">
                  <div className="text-xs text-purple-300">Pending Review Queue</div>
                  <div className="text-2xl font-bold text-amber-400 mt-1">6 Submissions</div>
                  <div className="text-[11px] text-amber-300/80 mt-1">Awaiting 1-Click Approval</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#180e2e] border border-purple-900/50">
                  <div className="text-xs text-purple-300">Available Balance</div>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">₹28,450</div>
                  <div className="text-[11px] text-purple-300/80 mt-1">Ready for Instant UPI</div>
                </div>
                <div className="p-4 rounded-xl bg-[#180e2e] border border-purple-900/50">
                  <div className="text-xs text-purple-300">Lifetime Earnings</div>
                  <div className="text-2xl font-bold text-white mt-1">₹1,64,200</div>
                  <div className="text-[11px] text-purple-400 mt-1">Across 14 Campaigns</div>
                </div>
                <div className="p-4 rounded-xl bg-[#180e2e] border border-purple-900/50">
                  <div className="text-xs text-purple-300">Pending Verification</div>
                  <div className="text-2xl font-bold text-amber-400 mt-1">₹8,200</div>
                  <div className="text-[11px] text-purple-300/80 mt-1">2 Clips in 48h Window</div>
                </div>
                <div className="p-4 rounded-xl bg-[#180e2e] border border-purple-900/50">
                  <div className="text-xs text-purple-300">Clipper Tier Level</div>
                  <div className="text-2xl font-bold text-cyan-400 mt-1">ELITE</div>
                  <div className="text-[11px] text-cyan-300 mt-1">4.96/5.00 Rating</div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* =========================================================================
          SECTION 9: PRICING & ROI SIMULATOR (#pricing)
          ========================================================================= */}
      <section id="pricing" className="py-24 bg-[#0a0415]/80 backdrop-blur-md border-y border-purple-900/30 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/60 uppercase tracking-widest font-mono">
              Transparent Performance Pricing
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
              Calculate Your Viral Reach & <span className="text-gradient-neon">ROAS Return</span>
            </h2>
            <p className="text-purple-200/70 text-base">
              100% escrow-backed. No agency markup, no retainer lock-in. Your money stays protected until clips deliver.
            </p>
          </motion.div>

          {/* Calculator Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-200">Campaign Budget</span>
                  <span className="text-white font-bold font-mono">₹{calcBudget.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="1000000"
                  step="10000"
                  value={calcBudget}
                  onChange={(e) => setCalcBudget(Number(e.target.value))}
                  className="w-full accent-purple-500 h-2 bg-[#1f1035] rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-200">Target CPM Rate (Cost per 1k Views)</span>
                  <span className="text-white font-bold font-mono">₹{calcCpm}</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="200"
                  step="10"
                  value={calcCpm}
                  onChange={(e) => setCalcCpm(Number(e.target.value))}
                  className="w-full accent-purple-500 h-2 bg-[#1f1035] rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-200">Average Product Price / Subscription</span>
                  <span className="text-white font-bold font-mono">₹{calcAov.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  value={calcAov}
                  onChange={(e) => setCalcAov(Number(e.target.value))}
                  className="w-full accent-purple-500 h-2 bg-[#1f1035] rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="lg:col-span-6 p-8 rounded-3xl bg-gradient-to-br from-[#180e2f] to-[#0e061c] border border-purple-500/30 shadow-2xl shadow-purple-950/80 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-purple-900/40">
                <span className="text-xs uppercase font-mono tracking-wider text-purple-300">Projected Performance</span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Escrow Guaranteed
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#110722] border border-purple-900/40">
                  <div className="text-xs text-purple-300">Projected Views</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">
                    {formatNumber(estimatedViews)}
                  </div>
                  <div className="text-[10px] text-purple-400 mt-1">Across 15-40 clips</div>
                </div>

                <div className="p-4 rounded-xl bg-[#110722] border border-purple-900/40">
                  <div className="text-xs text-purple-300">Cost Per View (CPV)</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 mt-1 font-display">
                    ₹{estimatedCostPerView}
                  </div>
                  <div className="text-[10px] text-cyan-300/70 mt-1">vs ₹1.20 Meta Ads</div>
                </div>

                <div className="p-4 rounded-xl bg-[#110722] border border-purple-900/40">
                  <div className="text-xs text-purple-300">Projected Revenue</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1 font-display">
                    ₹{estimatedRevenue.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-emerald-300/70 mt-1">Based on {estimatedConversions} sales</div>
                </div>

                <div className="p-4 rounded-xl bg-[#110722] border border-purple-900/40">
                  <div className="text-xs text-purple-300">Estimated ROAS</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1 font-display">
                    {estimatedRoas}x
                  </div>
                  <div className="text-[10px] text-amber-300/70 mt-1">Return on Ad Spend</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => smoothScroll('#contact')}
                  className="w-full py-4 rounded-xl text-center font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-glow-purple block text-sm cursor-pointer"
                >
                  Book Campaign Strategy Call
                </button>
              </div>
            </div>
          </div>

          {/* 3 Escrow Pricing Packages */}
          <div className="pt-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">Fixed Escrow Bundles</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Transparent Packages for Every Stage
              </h3>
              <p className="text-purple-200/70 text-xs sm:text-sm">
                Choose a pre-configured escrow pool or request a custom enterprise allocation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Starter Escrow Pilot',
                  price: '₹50,000',
                  subtitle: 'Ideal for testing vertical clipping efficiency',
                  views: '350K – 500K Views',
                  clips: '10 – 20 Approved Clips',
                  features: [
                    '100% Escrow Protection',
                    'Standard 48-Hour Review Window',
                    'Instagram Reels & YouTube Shorts',
                    'Automatic View Verification API',
                    'Direct Clipper Messaging',
                  ],
                  popular: false,
                  cta: 'Start with Pilot',
                },
                {
                  name: 'Growth Surge Syndicate',
                  price: '₹1,50,000',
                  subtitle: 'Best for product launches & scale',
                  views: '1.2M – 1.8M Views',
                  clips: '30 – 60 Elite Submissions',
                  features: [
                    '100% Escrow Protection',
                    'Priority 24-Hour Review Queue',
                    'Reels, Shorts & TikTok Distribution',
                    'Top Tier-1 Vetted Editors',
                    'Dedicated Campaign Architect',
                    'Real-Time Engagement Tracking',
                  ],
                  popular: true,
                  cta: 'Launch Growth Surge',
                },
                {
                  name: 'Enterprise Dominance',
                  price: '₹5,00,000+',
                  subtitle: 'For national brands & podcast networks',
                  views: '4M – 7M+ Guaranteed Views',
                  clips: '100+ Custom Produced Edits',
                  features: [
                    '100% Escrow Protection',
                    'Custom CPM & Bonus Incentives',
                    'Full Commercial Whitelist Rights',
                    'Top 1% Sound Designers & Editors',
                    'Dedicated Key Account Director',
                    'Weekly Creative Strategy Sprints',
                  ],
                  popular: false,
                  cta: 'Talk to Enterprise Lead',
                },
              ].map((tier, idx) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all ${
                    tier.popular
                      ? 'bg-gradient-to-b from-[#20103a] to-[#140827] border-2 border-purple-500 shadow-2xl shadow-purple-950/90'
                      : 'bg-[#120822] border border-purple-900/50 hover:border-purple-600/40'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-fuchsia-600 to-purple-600 shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-bold text-white font-display">{tier.name}</h4>
                      <p className="text-xs text-purple-300/70 mt-0.5">{tier.subtitle}</p>
                    </div>

                    <div className="pt-2 pb-1 border-b border-purple-900/40">
                      <div className="text-3xl font-extrabold text-white font-display">{tier.price}</div>
                      <div className="text-[11px] text-emerald-400 font-semibold mt-1">Escrow Deposit Locked</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center py-1">
                      <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-900/40">
                        <div className="text-xs font-bold text-purple-300">{tier.views}</div>
                        <div className="text-[10px] text-purple-400/70">Est. Reach</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-900/40">
                        <div className="text-xs font-bold text-cyan-300">{tier.clips}</div>
                        <div className="text-[10px] text-purple-400/70">Volume</div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-purple-400">Included Features</div>
                      <ul className="space-y-2 text-xs text-purple-200/80">
                        {tier.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => smoothScroll('#contact')}
                      className={`w-full py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        tier.popular
                          ? 'bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] text-white hover:opacity-95 shadow-glow-purple'
                          : 'bg-purple-900/40 hover:bg-purple-800/60 text-white border border-purple-700/50'
                      }`}
                    >
                      {tier.cta}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: ABOUT (#about)
          ========================================================================= */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/60 uppercase tracking-widest font-mono">
            Ecosystem Vision
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            About <span className="text-gradient-neon">Clip Matrix</span>
          </h2>
          <p className="text-purple-200/70 text-base leading-relaxed">
            We are rebuilding creator marketing from the ground up on decentralized, performance-based CPM foundations.
          </p>
        </motion.div>

        <div className="p-8 sm:p-12 rounded-3xl bg-[#140c26] border border-purple-900/50 space-y-6">
          <h3 className="text-2xl font-bold text-white font-display">Our Mission</h3>
          <p className="text-sm text-purple-200/80 leading-relaxed">
            Traditional influencer agencies charge bloated upfront retainers for 2-3 sponsored posts with zero guarantee of
            reach. Meanwhile, thousands of talented video editors and aspiring creators struggle to monetize their high-retention
            editing skills.
          </p>
          <p className="text-sm text-purple-200/80 leading-relaxed">
            Clip Matrix bridges this divide. Brands deposit funds securely in escrow, clippers turn long-form founder
            interviews and product demos into viral 9:16 vertical hooks, and rewards are released strictly upon verified view
            performance.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: REVIEWS / TESTIMONIALS (#reviews)
          ========================================================================= */}
      <section id="reviews" className="py-24 bg-[#0a0415]/80 backdrop-blur-md border-y border-purple-900/30 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/60 uppercase tracking-widest font-mono">
              ★ Client Reviews (890+)
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
              Loved By High-Growth Brands & Editors
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'We scaled Aether AI from zero to 1.8M verified views in less than 3 weeks. Our budget only paid for verified views delivered by genuine clippers.',
                name: 'Devika Nair',
                role: 'VP Marketing, Aether AI',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
              },
              {
                quote: 'As an editor, finding clients was a nightmare. On Clip Matrix, I just pick high-potential founder clips, edit hooks in CapCut, post them, and withdraw straight to UPI.',
                name: 'Aarav Sharma',
                role: 'Elite Clipper (4.96 Rating)',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
              },
              {
                quote: 'The escrow protection gave our finance team 100% confidence. If a clip doesn’t reach views, our budget doesn’t get exhausted. It completely changes creator economics in India.',
                name: 'Rohan Singhania',
                role: 'Founder, KicksDrop India',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
              },
            ].map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#130a24] border border-purple-900/50 space-y-4"
              >
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-purple-200/80 leading-relaxed italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-purple-900/40">
                  <div className="w-10 h-10 rounded-full bg-purple-700 overflow-hidden">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{t.name}</div>
                    <div className="text-[11px] text-purple-300/70">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12: CONTACT & CONSULTATION (#contact)
          ========================================================================= */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/60 uppercase tracking-widest font-mono">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Book a Strategy Call or <span className="text-gradient-neon">Send Inquiry</span>
          </h2>
          <p className="text-purple-200/70 text-base">
            Whether you want to launch a 10M-view clipping campaign or partner with our creator roster, our team responds within 2 business hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact info cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#130a24] border border-purple-900/50 space-y-6">
              <h3 className="text-xl font-bold text-white font-display">Contact Details</h3>

              <div className="space-y-4 text-sm text-purple-200/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-purple-400 font-medium">Email</div>
                    <div className="text-white font-semibold">support@clipmatrix.in</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-cyan-400 font-medium">Business Line</div>
                    <div className="text-white font-semibold">+91 98201 44520</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-600/20 text-pink-400 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-pink-400 font-medium">Headquarters</div>
                    <div className="text-white font-semibold">Indiranagar, Bengaluru, Karnataka, India</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e071c] border border-purple-900/40 text-xs text-purple-300 space-y-2">
              <div className="font-bold text-white">⚡ Response Time Guarantee</div>
              <p>Our campaign architects reply within 2 business hours between 9:00 AM - 8:00 PM IST.</p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-[#140c26] border border-purple-900/50">
            {contactSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">Consultation Reserved!</h3>
                <p className="text-purple-200/80 text-sm max-w-md mx-auto">
                  Thank you, {contactName}! Our creator strategy team will contact you to review your campaign goals.
                </p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="text-xs text-purple-400 underline hover:text-purple-200"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-white font-display mb-2">Book Consultation or Send Inquiry</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-purple-300 font-medium">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e071c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-purple-300 font-medium">Business Email *</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="vikram@brand.com"
                      className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-purple-300 font-medium">Company or Channel Name</label>
                  <input
                    type="text"
                    value={contactCompany}
                    onChange={(e) => setContactCompany(e.target.value)}
                    placeholder="e.g. ZenPulse Nutrition"
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-purple-300 font-medium">Preferred Consultation Date (Optional)</label>
                    <input
                      type="date"
                      value={contactDate}
                      onChange={(e) => setContactDate(e.target.value)}
                      className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-purple-300 font-medium">Preferred Time (IST)</label>
                    <input
                      type="time"
                      value={contactTime}
                      onChange={(e) => setContactTime(e.target.value)}
                      className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-purple-300 font-medium">Campaign Goals or Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell us about your product, podcast, or source footage, and estimated campaign budget..."
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactLoading}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-glow-purple flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{contactLoading ? 'Sending...' : 'Submit Inquiry & Reserve Slot'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13: FINAL DUAL CTA
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-r from-[#1c0c35] via-[#120722] to-[#1c0c35] border border-purple-500/40 p-8 sm:p-14 text-center overflow-hidden shadow-2xl shadow-purple-950/80"
        >
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
              Your Next Viral Campaign Starts Here.
            </h2>
            <p className="text-purple-200/80 text-base">
              Join hundreds of high-growth brands and thousands of editors dominating short-form video algorithms.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href="/auth/register-brand"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all shadow-glow-purple flex items-center justify-center gap-2"
              >
                <Building2 className="w-5 h-5" /> Start as a Brand
              </a>
              <a
                href="/auth/register-clipper"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-purple-200 bg-[#25103d] hover:bg-[#311550] hover:text-white transition-all border border-purple-700/60 flex items-center justify-center gap-2"
              >
                <Scissors className="w-5 h-5 -rotate-45" /> Start as a Clipper
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
