'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  RefreshCw,
  UserCheck,
  XCircle,
  Link2,
  Plus,
  X,
  ExternalLink,
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'brand' | 'clipper'>('brand');
  const [playingShowcase, setPlayingShowcase] = useState<'ig' | 'yt' | null>(null);

  // ROI Calculator state
  const [calcBudget, setCalcBudget] = useState(2500);
  const [calcCpm, setCalcCpm] = useState(0.5);

  // Clipper Simulator state
  const [viewsSim, setViewsSim] = useState(150000);
  const [cpmSim, setCpmSim] = useState(0.5);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactDate, setContactDate] = useState('');
  const [contactTime, setContactTime] = useState('14:00');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);



  // ROI computations
  const estimatedViews = Math.floor((calcBudget / calcCpm) * 1000);
  const estimatedCostPerView = (calcBudget / estimatedViews).toFixed(2);

  // Clipper earnings
  const potentialClipperEarnings = Number(((viewsSim / 1000) * cpmSim).toFixed(2));



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
    if (typeof window !== 'undefined' && (window as any).__lenis) {
      (window as any).__lenis.scrollTo(id, { offset: -85, duration: 1.4 });
      window.history.pushState(null, '', id);
      return;
    }
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
    <div className="relative overflow-hidden bg-transparent">
      {/* =========================================================================
          SECTION 1: HERO SECTION - 3 ATTRACTIVE LINES & VIRAL SHOWCASE
          ========================================================================= */}
      <section
        id="hero"
        className="relative pt-10 pb-20 lg:pt-16 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center scroll-mt-24"
      >
        {/* Brand Badge featuring improved logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-purple-500/40 bg-[#120826]/90 backdrop-blur-xl mb-6 shadow-[0_0_25px_rgba(124,58,237,0.35)] group hover:border-[#00D4FF]/50 transition-all cursor-default"
        >
          <img
            src="/clipmatrix-logo.png"
            alt="Clip Matrix Monogram"
            className="w-5 h-5 object-contain drop-shadow-[0_0_8px_rgba(0,212,255,0.7)] group-hover:scale-110 transition-transform"
          />
          <span className="text-xs font-mono font-bold tracking-widest text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text uppercase">
            THE PERFORMANCE CREATOR NETWORK
          </span>
        </motion.div>

        {/* Central High-Impact Headline - Responsive 3-line lockup that fits cleanly across all viewports */}
        <h1
          className="w-full max-w-5xl mx-auto px-2 text-[clamp(1.45rem,3.6vw,3.35rem)] font-black text-white tracking-[-0.025em] text-center leading-[1.15] uppercase space-y-1"
          style={{ fontFamily: "'Plus Jakarta Sans', 'Syne', sans-serif", fontWeight: 900 }}
        >
          {/* Line 1: Pure White Thick Statement */}
          <span className="block text-white">
            VIRAL CLIPPING AGENCY
          </span>

          {/* Line 2: Balanced Gradient Headline */}
          <span className="block bg-gradient-to-r from-[#fed7aa] via-[#f472b6] to-[#38bdf8] bg-clip-text text-transparent py-0.5">
            INFLUENCER MARKETING PLATFORM
          </span>

          {/* Line 3: Signature Brand Finish */}
          <span className="flex flex-wrap items-center justify-center gap-x-3">
            <span className="text-white">SCALE VIEWS WITH</span>
            <span
              className="bg-gradient-to-r from-[#c084fc] via-[#e879f9] to-[#00d4ff] bg-clip-text text-transparent inline-block font-black"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Syne', sans-serif", fontWeight: 900 }}
            >
              CLIP MATRIX.
            </span>
          </span>
        </h1>

        {/* Supporting Narrative */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-purple-200/85 max-w-3xl mx-auto leading-relaxed font-normal">
          Clip Matrix is India's top <strong className="text-white font-semibold">viral clipping agency</strong> and{' '}
          <strong className="text-white font-semibold">influencer marketing platform</strong> for{' '}
          <strong className="text-white font-semibold">creators</strong>. We turn long videos into viral Reels and YouTube
          Shorts. Vetted clippers share your clips to drive real views. You get clear CPM rates and safe escrow payouts.
        </p>

        {/* Action Buttons matching User Reference */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8 w-full sm:w-auto">
          <a
            href="/auth/register-clipper"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#9333ea] via-[#c026d3] to-[#7c3aed] hover:opacity-95 transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 group cursor-pointer border border-fuchsia-300/30"
          >
            <Scissors className="w-4 h-4 -rotate-45 text-white" />
            <span>Join as a Clipper</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <button
            onClick={() => smoothScroll('#brands')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-bold text-white bg-[#150a29] hover:bg-[#1f0e3d] transition-all border border-purple-500/40 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Launch Campaign</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <a
            href="/campaigns"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Discover Campaigns</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

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
                loading="lazy"
                decoding="async"
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
          {/* Left Vertical Clip Card (Real Instagram Reel: DcsnbnfvynC) */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotateY: 10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-4 rounded-3xl bg-gradient-to-b from-[#1c0e35] to-[#100720] border border-purple-500/30 p-4 shadow-2xl shadow-purple-950/70 text-left relative overflow-hidden group hover:border-purple-400/60 transition-all"
          >
            <div className="relative aspect-[9/14] sm:aspect-[9/13] rounded-2xl overflow-hidden bg-black/80">
              {playingShowcase === 'ig' ? (
                <>
                  <iframe
                    src="https://www.instagram.com/reel/DcsnbnfvynC/embed/"
                    title="Instagram Reel showcase"
                    className="w-full h-full border-0 bg-black"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                  <button
                    type="button"
                    onClick={() => setPlayingShowcase(null)}
                    aria-label="Close Reel preview"
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/80 hover:bg-black border border-white/25 flex items-center justify-center text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <img
                    src="/showcase-ig-reel.jpg"
                    alt="Instagram Reel by @theprakharworld"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/55" />

                  {/* Platform & Status Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-pink-600 text-white shadow-md flex items-center gap-1">
                      <Instagram className="w-3 h-3" /> Instagram Reels
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      VERIFIED
                    </span>
                  </div>

                  {/* Interactive Play Button */}
                  <button
                    type="button"
                    onClick={() => setPlayingShowcase('ig')}
                    aria-label="Play Instagram Reel"
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-glow-purple group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </button>

                  {/* Hook Caption */}
                  <div className="absolute bottom-14 left-3 right-3 pointer-events-none">
                    <div className="p-2.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/10 text-xs font-semibold text-white line-clamp-2">
                      "Sonam Wangchuk (born September 1, 1966, in Uleytokpo, near Alchi, Ladakh)..."
                    </div>
                  </div>

                  {/* Bottom Metrics Bar */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-white/90 pointer-events-none">
                    <span className="flex items-center gap-1 text-purple-300">
                      <Eye className="w-3.5 h-3.5 text-purple-400" /> 1.97M Views
                    </span>
                    <span className="text-emerald-400 font-mono font-bold">+$986 Earned</span>
                  </div>
                </>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs px-1 gap-2">
              <a
                href="https://www.instagram.com/reel/DcsnbnfvynC/?stkn=MWE5MHd5NTJrOHA4NQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300/80 hover:text-white inline-flex items-center gap-1 truncate transition-colors"
              >
                <span>Clipper: <strong className="text-white">@theprakharworld</strong></span>
                <ExternalLink className="w-3 h-3 text-purple-400 shrink-0" />
              </a>
              <span className="text-xs font-mono text-cyan-400 font-semibold shrink-0">CPM: $0.50</span>
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

          {/* Right Vertical Clip Card (Real YouTube Short: UdSdSV0xytM) */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-4 rounded-3xl bg-gradient-to-b from-[#1c0e35] to-[#100720] border border-purple-500/30 p-4 shadow-2xl shadow-purple-950/70 text-left relative overflow-hidden group hover:border-purple-400/60 transition-all"
          >
            <div className="relative aspect-[9/14] sm:aspect-[9/13] rounded-2xl overflow-hidden bg-black/80">
              {playingShowcase === 'yt' ? (
                <>
                  <iframe
                    src="https://www.youtube.com/embed/UdSdSV0xytM?autoplay=1&playsinline=1"
                    title="YouTube Short showcase"
                    className="w-full h-full border-0 bg-black"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <button
                    type="button"
                    onClick={() => setPlayingShowcase(null)}
                    aria-label="Close YouTube Short preview"
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/80 hover:bg-black border border-white/25 flex items-center justify-center text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <img
                    src="https://i.ytimg.com/vi/UdSdSV0xytM/oardefault.jpg"
                    alt="YouTube Short by @Daxmessage"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/55" />

                  {/* Platform & Status Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-600 text-white shadow-md flex items-center gap-1">
                      <Youtube className="w-3 h-3" /> YouTube Shorts
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                      TOP VIRAL
                    </span>
                  </div>

                  {/* Interactive Play Button */}
                  <button
                    type="button"
                    onClick={() => setPlayingShowcase('yt')}
                    aria-label="Play YouTube Short"
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-glow-purple group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </button>

                  {/* Hook Caption */}
                  <div className="absolute bottom-14 left-3 right-3 pointer-events-none">
                    <div className="p-2.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/10 text-xs font-semibold text-white line-clamp-2">
                      "Snoop & Em couldn't believe @Thatsdax said THIS... 🤐🔥"
                    </div>
                  </div>

                  {/* Bottom Metrics Bar */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-white/90 pointer-events-none">
                    <span className="flex items-center gap-1 text-cyan-300">
                      <Eye className="w-3.5 h-3.5 text-cyan-400" /> 792K Views
                    </span>
                    <span className="text-amber-400 font-mono font-bold">+$396 Earned</span>
                  </div>
                </>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs px-1 gap-2">
              <a
                href="https://www.youtube.com/shorts/UdSdSV0xytM"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300/80 hover:text-white inline-flex items-center gap-1 truncate transition-colors"
              >
                <span>Clipper: <strong className="text-white">@Daxmessage</strong></span>
                <ExternalLink className="w-3 h-3 text-cyan-400 shrink-0" />
              </a>
              <span className="text-xs font-mono text-emerald-400 font-semibold shrink-0">CPM: $0.50</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: STATISTICS COUNTERS
          ========================================================================= */}
      <section className="relative py-12 bg-[#0c0517]/90 border-y border-purple-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              { label: 'Verified Views', value: '84.5M+', color: 'text-white' },
              { label: 'Active Clippers', value: '3,420+', color: 'text-purple-400' },
              { label: 'Campaigns Ran', value: '240+', color: 'text-white' },
              { label: 'Brands Onboarded', value: '120+', color: 'text-cyan-400' },
              { label: 'Clipper Payouts', value: '$250,000+', color: 'text-emerald-400' },
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
              Drag the sliders to calculate your estimated payout based on verified views and campaign CPM rate.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-6">
              {/* Slider 1: Views */}
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
                <div className="flex justify-between text-[11px] text-purple-300/60 font-mono">
                  <span>10K Views</span>
                  <span>500K Views</span>
                  <span>1,000,000 Views</span>
                </div>
              </div>

              {/* Slider 2: CPM Rate */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-200">Campaign CPM Rate</span>
                  <span className="text-cyan-300 font-bold font-mono text-base">${cpmSim.toFixed(2)} / 1k views</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="3.00"
                  step="0.05"
                  value={cpmSim}
                  onChange={(e) => setCpmSim(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-2 bg-[#201438] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-purple-300/60 font-mono">
                  <span>$0.10 (Entry)</span>
                  <span>$1.50 (High Impact)</span>
                  <span>$3.00 (Elite / Brand Sponsor)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-[#140b26] border border-purple-900/40">
                <div className="text-xs text-purple-300">Campaign CPM Rate</div>
                <div className="text-xl font-bold text-cyan-400 mt-1">${cpmSim.toFixed(2)} / 1k views</div>
              </div>
              <div className="p-4 rounded-xl bg-[#140b26] border border-purple-900/40">
                <div className="text-xs text-purple-300">Calculated Payout</div>
                <div className="text-2xl font-extrabold text-emerald-400 mt-1 font-display">
                  ${potentialClipperEarnings.toLocaleString('en-US', { minimumFractionDigits: potentialClipperEarnings % 1 !== 0 ? 2 : 0, maximumFractionDigits: 2 })}
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
      <section id="case-studies" className="py-24 bg-[#0a0415]/90 border-y border-purple-900/40 px-4 sm:px-6 lg:px-8 scroll-mt-24">
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-[#130a24] border border-purple-900/50 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center hover:border-purple-500/40 transition-all shadow-xl"
          >
            <div className="lg:col-span-5 relative aspect-video sm:aspect-square lg:aspect-auto h-full min-h-[240px] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src="https://yt3.googleusercontent.com/ytc/AIdro_m5kGCbZq6Kd5kNkvVxqmD-6jFm0QZ-5xZHE5qHlVqZ1Q=s900-c-k-c0x00ffffff-no-rj"
                alt="Yash Gupta – Trader & Media Creator"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-white/90 font-medium italic">
                &quot;Clip Matrix gave me 10x more organic reach on my trading content than any agency could deliver — and I only paid for verified views.&quot; — <span className="font-bold text-white">Yash Gupta, Founder</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-widest text-purple-400">
                  Yash Gupta • Podcasts &amp; Media
                </div>
                <h3 className="text-2xl font-bold text-white font-display leading-tight">
                  How Yash Gupta Scaled From 0 to 1.98M Verified Views With Clip Matrix Clippers
                </h3>
                <p className="text-sm text-purple-200/70 leading-relaxed">
                  Clip Matrix clippers cut retention-optimized vertical hooks from Yash Gupta&apos;s long-form trading and podcast content, distributing them across Instagram Reels and YouTube Shorts for maximum organic reach.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-purple-900/40">
                <div className="p-3.5 rounded-xl bg-[#1b1033] border border-purple-800/40 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-display">1,985,789+</div>
                  <div className="text-[11px] text-purple-300/70 mt-0.5">Verified Views</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#1b1033] border border-purple-800/40 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-display">$0.50 CPM</div>
                  <div className="text-[11px] text-cyan-300/70 mt-0.5">Average CPV</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#1b1033] border border-purple-800/40 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-display">$1,500</div>
                  <div className="text-[11px] text-emerald-300/70 mt-0.5">Total Budget</div>
                </div>
              </div>
            </div>
          </motion.div>
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
            Launch and manage your campaigns
          </h2>
          <p className="text-purple-200/70 text-base">
            One dashboard for every campaign: budget, views and creators, verified and live.
          </p>

          <div className="inline-flex p-1.5 rounded-xl bg-[#140c24] border border-purple-900/50 mt-4">
            <button
              onClick={() => setActiveTab('brand')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'brand' ? 'bg-purple-600 text-white shadow-glow-purple' : 'text-purple-300 hover:text-white'
                }`}
            >
              Launch & Manage
            </button>
            <button
              onClick={() => setActiveTab('clipper')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'clipper' ? 'bg-purple-600 text-white shadow-glow-purple' : 'text-purple-300 hover:text-white'
                }`}
            >
              Track & Verify
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#10061e] border border-purple-700/30 p-4 sm:p-8 shadow-2xl shadow-purple-950/60"
        >
          {/* Top Window Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-purple-900/40 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-purple-300/80 hidden sm:inline">
                clipmatrix.in/dashboard/campaigns
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => smoothScroll('#contact')}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-pink-600 hover:bg-pink-500 text-white transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Campaign</span>
              </button>

              <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white flex items-center gap-1.5">
                <span className="text-purple-400">Available:</span>
                <span className="font-bold text-emerald-400">$4,400</span>
              </div>
            </div>
          </div>

          {/* Main Dashboard Layout */}
          <div className="pt-6 space-y-8">
            {/* Top Stat Banner: 17% more views than you paid for & Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-2xl bg-[#180e2e]/90 border border-purple-900/50 p-6">
              <div className="lg:col-span-4 space-y-4 text-left">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight leading-snug">
                    17% more views <br />
                    <span className="text-gradient-neon">than you paid for</span>
                  </h3>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between pb-2 border-b border-purple-900/30">
                    <span className="text-xs text-purple-300">Verified views</span>
                    <span className="text-xl font-bold font-mono text-cyan-300">21.6M</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-purple-900/30">
                    <span className="text-xs text-purple-300">Spent in escrow</span>
                    <span className="text-xl font-bold font-mono text-emerald-400">$34,000</span>
                  </div>
                  <button
                    onClick={() => smoothScroll('#contact')}
                    className="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1 pt-1 transition-colors cursor-pointer"
                  >
                    <span>View full telemetry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Chart Visualizer */}
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center justify-end gap-1.5">
                  {['7D', '30D', '90D', 'All time'].map((range, i) => (
                    <span
                      key={range}
                      className={`px-3 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-all ${i === 1
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-white/5 text-purple-300 hover:bg-white/10'
                        }`}
                    >
                      {range}
                    </span>
                  ))}
                </div>

                <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full rounded-xl bg-black/40 border border-purple-900/40 p-4 overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 500 150" fill="none">
                    <defs>
                      <linearGradient id="dashPinkGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 10 130 Q 80 120 140 100 T 260 70 T 360 15 T 420 45 T 490 20"
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 10 130 Q 80 120 140 100 T 260 70 T 360 15 T 420 45 T 490 20 L 490 150 L 10 150 Z"
                      fill="url(#dashPinkGrad)"
                    />
                    {/* Glowing Apex Node */}
                    <circle cx="360" cy="15" r="5" fill="#f472b6" className="animate-ping origin-center" />
                    <circle cx="360" cy="15" r="5" fill="#f472b6" />
                    <circle cx="490" cy="20" r="5" fill="#f472b6" />
                  </svg>

                  <div className="absolute top-3 left-4 text-[10px] font-mono text-purple-400">
                    Peak: 2.14M views / day
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          SECTION 9: PRICING & ROI SIMULATOR (#pricing)
          ========================================================================= */}
      <section id="pricing" className="py-24 bg-[#0a0415]/90 border-y border-purple-900/40 px-4 sm:px-6 lg:px-8 scroll-mt-24">
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
              Calculate Your Viral Reach & <span className="text-gradient-neon">Campaign ROI</span>
            </h2>
            <p className="text-purple-200/70 text-base">
              100% escrow-backed. No agency markup, no retainer lock-in. Your money stays protected until clips deliver.
            </p>
          </motion.div>

          {/* Calculator – budget & CPM sliders with projected views */}
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Campaign Budget</span>
                <span className="text-white font-bold font-mono">${calcBudget.toLocaleString('en-US')}</span>
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
                <span className="text-white font-bold font-mono">${calcCpm}</span>
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

            {/* Projected Views + CPV in a simple row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#180e2f] to-[#0e061c] border border-purple-500/30 text-center">
                <div className="text-xs text-purple-300 uppercase font-mono tracking-wider">Projected Views</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-display">
                  {formatNumber(estimatedViews)}
                </div>
                <div className="text-[10px] text-purple-400 mt-1">Across 15-40 clips</div>
              </div>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#180e2f] to-[#0e061c] border border-purple-500/30 text-center">
                <div className="text-xs text-purple-300 uppercase font-mono tracking-wider">Cost Per View (CPV)</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 mt-2 font-display">
                  ${estimatedCostPerView}
                </div>
                <div className="text-[10px] text-cyan-300/70 mt-1">vs $1.80 Meta Ads</div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => smoothScroll('#contact')}
                className="px-10 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-glow-purple text-sm cursor-pointer"
              >
                Book Campaign Strategy Call
              </button>
            </div>
          </div>

          {/* =========================================================================
              VIEW VERIFICATION & ANTI-FRAUD ENGINE (From Video Reference)
              "Every view is checked. Only real ones get paid."
              ========================================================================= */}
          <div className="pt-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest font-mono">
                Real-Time Anti-Fraud Engine
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight">
                Every view is checked. <span className="text-gradient-neon">Only real ones get paid.</span>
              </h3>
              <p className="text-purple-200/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Every post is checked the moment it's submitted, then re-checked for as long as it's live. Anything suspicious is stopped before it reaches your budget.
              </p>
            </div>

            {/* Interactive 4-Stage Verification Workflow Container */}
            <div className="rounded-3xl bg-[#120826]/90 border border-purple-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              {/* Connecting Dotted Line (Desktop) */}
              <div className="hidden lg:block absolute top-[110px] left-[15%] right-[15%] h-[2px] border-t-2 border-dotted border-purple-500/30 -z-0 pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {/* ---------------- STAGE 1: SUBMITTED ---------------- */}
                <div className="flex flex-col space-y-5">
                  <div className="rounded-2xl bg-[#180d32] border border-purple-500/30 p-5 shadow-xl hover:border-purple-400/60 transition-all text-left space-y-4 min-h-[220px] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-fuchsia-300">
                        <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-ping inline-block" />
                        <span>New submission</span>
                      </div>
                      <div className="flex items-center gap-2.5 mt-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                          A
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">@animeclips</div>
                          <div className="text-[10px] text-purple-300/60">just now</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="px-3 py-2 rounded-xl bg-[#241347] border border-purple-500/30 flex items-center gap-2 text-xs text-purple-200 font-mono">
                        <Link2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Post link added</span>
                      </div>

                      <div className="flex items-center justify-between px-1 text-purple-400">
                        <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[11px] font-bold text-white">🎵</span>
                        <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[11px] font-bold text-pink-400">📷</span>
                        <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[11px] font-bold text-red-400">▶</span>
                        <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[11px] font-bold text-white">𝕏</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left space-y-1">
                    <h4 className="text-lg font-bold text-white font-display">Submitted</h4>
                    <p className="text-xs text-purple-200/70 leading-relaxed">
                      A creator posts to your campaign and submits it for review.
                    </p>
                  </div>
                </div>

                {/* ---------------- STAGE 2: CHECKED ---------------- */}
                <div className="flex flex-col space-y-5">
                  <div className="rounded-2xl bg-[#180d32] border border-purple-500/30 p-5 shadow-xl hover:border-cyan-400/60 transition-all relative flex flex-col items-center justify-center min-h-[220px]">
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 uppercase tracking-wide">
                      AI scan
                    </div>

                    {/* Concentric Radar Scanner */}
                    <div className="relative w-32 h-32 rounded-full border border-dashed border-cyan-500/40 flex items-center justify-center mt-3">
                      <div className="w-20 h-20 rounded-full border border-cyan-400/30 flex items-center justify-center bg-cyan-950/20">
                        <ShieldCheck className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_12px_#22d3ee]" />
                      </div>

                      {/* Radar Orbital Badges */}
                      <span className="absolute -top-2 left-0 px-2 py-0.5 rounded-md text-[9px] font-mono bg-[#221344] border border-cyan-500/40 text-cyan-200 shadow-sm">
                        Engagement
                      </span>
                      <span className="absolute top-1/2 -right-4 -translate-y-1/2 px-2 py-0.5 rounded-md text-[9px] font-mono bg-[#221344] border border-cyan-500/40 text-cyan-200 shadow-sm">
                        Trust score
                      </span>
                      <span className="absolute -bottom-2.5 left-4 px-2 py-0.5 rounded-md text-[9px] font-mono bg-[#221344] border border-cyan-500/40 text-cyan-200 shadow-sm">
                        Device match
                      </span>
                    </div>
                  </div>

                  <div className="text-left space-y-1">
                    <h4 className="text-lg font-bold text-white font-display">Checked</h4>
                    <p className="text-xs text-purple-200/70 leading-relaxed">
                      AI scans every post for bot activity and fraud, then checks it against your brief.
                    </p>
                  </div>
                </div>

                {/* ---------------- STAGE 3: RE-CHECKED ---------------- */}
                <div className="flex flex-col space-y-5">
                  <div className="rounded-2xl bg-[#180d32] border border-purple-500/30 p-5 shadow-xl hover:border-emerald-400/60 transition-all text-left space-y-3 min-h-[220px] flex flex-col justify-between relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                        <span>Live post</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                        <RefreshCw className="w-2.5 h-2.5 animate-spin duration-3000" /> Re-checked 24/7
                      </span>
                    </div>

                    {/* Telemetry Line Chart */}
                    <div className="relative py-2">
                      <svg className="w-full h-16" viewBox="0 0 160 50" fill="none">
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 5 42 Q 40 38 75 25 T 150 8"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 5 42 Q 40 38 75 25 T 150 8 L 150 50 L 5 50 Z"
                          fill="url(#chartGrad)"
                        />
                        {/* Glowing Data Nodes */}
                        <circle cx="5" cy="42" r="3" fill="#10b981" />
                        <circle cx="45" cy="36" r="3" fill="#10b981" />
                        <circle cx="85" cy="22" r="3" fill="#10b981" />
                        <circle cx="120" cy="14" r="3" fill="#10b981" />
                        <circle cx="150" cy="8" r="4" fill="#34d399" className="animate-ping origin-center" />
                        <circle cx="150" cy="8" r="4" fill="#34d399" />
                      </svg>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-purple-900/40">
                      <span className="font-semibold text-white">Views</span>
                      <span className="text-[11px] text-purple-300/70 font-mono">Checked 2 min ago</span>
                    </div>
                  </div>

                  <div className="text-left space-y-1">
                    <h4 className="text-lg font-bold text-white font-display">Re-checked</h4>
                    <p className="text-xs text-purple-200/70 leading-relaxed">
                      Every live post is checked again on each refresh, 24/7.
                    </p>
                  </div>
                </div>

                {/* ---------------- STAGE 4: DECIDED ---------------- */}
                <div className="flex flex-col space-y-5">
                  <div className="rounded-2xl bg-[#180d32] border border-purple-500/30 p-5 shadow-xl hover:border-fuchsia-400/60 transition-all flex flex-col justify-center gap-3 min-h-[220px]">
                    <div className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-center justify-center gap-2 shadow-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Approved</span>
                    </div>

                    <div className="px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-600/25 border border-purple-400/40 text-purple-200 flex items-center justify-center gap-2 shadow-sm">
                      <UserCheck className="w-4 h-4 text-purple-300" />
                      <span>Human review</span>
                    </div>

                    <div className="px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-500/15 border border-rose-500/40 text-rose-300 flex items-center justify-center gap-2 shadow-sm">
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>Rejected</span>
                    </div>
                  </div>

                  <div className="text-left space-y-1">
                    <h4 className="text-lg font-bold text-white font-display">Decided</h4>
                    <p className="text-xs text-purple-200/70 leading-relaxed">
                      Likely fraud is rejected automatically. Anything unclear goes to a moderator.
                    </p>
                  </div>
                </div>
              </div>
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
      <section id="reviews" className="py-24 bg-[#0a0415]/90 border-y border-purple-900/40 px-4 sm:px-6 lg:px-8 scroll-mt-24">
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
                quote: 'Clip Matrix clippers turned my long-form trading content into viral Reels and Shorts. I hit nearly 2M verified views in weeks — paying only for real, verified reach.',
                name: 'Yash Gupta',
                role: 'Founder, Yash Gupta Trading',
                avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_m5kGCbZq6Kd5kNkvVxqmD-6jFm0QZ-5xZHE5qHlVqZ1Q=s900-c-k-c0x00ffffff-no-rj',
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
                    <img src={t.avatar} alt={t.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
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
