'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Flame,
  CheckCircle2,
  Clock,
  Play,
  Download,
  Lightbulb,
  TrendingUp,
  ArrowRight,
  Layers,
  Compass,
} from 'lucide-react';
import Link from 'next/link';

export default function ClipperAcademyPage() {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'HOOKS' | 'EDITING' | 'ALGORITHM'>('ALL');

  const lessons = [
    {
      id: 1,
      category: 'HOOKS',
      title: 'The 3-Second Hook Architecture: Stopping the Infinite Scroll',
      duration: '6 min read',
      difficulty: 'Beginner to Pro',
      summary:
        'A forensic breakdown of psychological pattern interrupts, dynamic text velocity, and audio transitions that stop Instagram & YouTube Shorts viewers from swiping past.',
      keyTakeaways: [
        'Open with high cognitive dissonance (provocative question or unexpected visual motion in frame 0).',
        'Use sound design (riser + whoosh + bass impact) within the first 600ms.',
        'Keep subtitle pace between 1.5 to 2.2 words per second with highlighted karaoke keywords.',
      ],
    },
    {
      id: 2,
      category: 'ALGORITHM',
      title: 'Targeting Tier-1 Audiences for 3x Higher CPM Multipliers',
      duration: '8 min read',
      difficulty: 'Advanced',
      summary:
        'How to optimize audio choices, English subtitle terminology, and posting windows to get your clips distributed across US, UK, and Tier-1 Indian metro audiences.',
      keyTakeaways: [
        'Use sound tracks trending in the US region rather than localized memes to unlock global distribution.',
        'Add neutral global English subtitles with clear terminology without heavy regional colloquialisms.',
        'Schedule publishing between 6:30 PM - 9:30 PM EST to catch evening peak engagement in the Americas.',
      ],
    },
    {
      id: 3,
      category: 'EDITING',
      title: 'CapCut & Premiere Pro Master Export Presets (Zero Blur)',
      duration: '5 min read',
      difficulty: 'Essential',
      summary:
        'Avoid Instagram and YouTube compression artifacts with the exact bitrate, colorspace, and resolution configurations tested on 50M+ views.',
      keyTakeaways: [
        'Resolution: 1080 x 1920 (Vertical 9:16). Never upload 4K downscales directly as Instagram applies aggressive compression.',
        'Frame Rate: 60 FPS constant frame rate (CFR). Avoid variable frame rate (VFR).',
        'Bitrate: Target 15-20 Mbps VBR 2-Pass, Codec H.264 / AAC 320 kbps.',
      ],
    },
    {
      id: 4,
      category: 'HOOKS',
      title: 'Pattern Interrupts: Zoom Cuts, Sound FX, and B-Roll Timing',
      duration: '7 min read',
      difficulty: 'Intermediate',
      summary:
        'Why changing the visual stimulus every 2.4 seconds is the mathematical sweet spot for 85%+ retention curves on vertical video.',
      keyTakeaways: [
        'Never let a single static camera angle run longer than 3 seconds without a punch-in (115% zoom).',
        'Overlay contextual B-roll, green-screen memes, or cinematic overlays during key punchlines.',
        'Use subtle background ambient pads (synthwave or lofi) at -24dB to hold auditory continuity.',
      ],
    },
  ];

  const filteredLessons =
    selectedCategory === 'ALL'
      ? lessons
      : lessons.filter((l) => l.category === selectedCategory);

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#160b36] via-[#0d0c26] to-[#070a1a] border border-purple-500/30 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>VIRAL CLIPPING MASTERCLASS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Clipping Academy & Playbooks
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 max-w-2xl leading-relaxed">
            Proven editing blueprints, retention formulas, and algorithmic secrets engineered to help Clip Matrix creators scale to 10M+ views and maximize monthly CPM earnings.
          </p>
        </div>
      </div>

      {/* Quick Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { label: 'All Modules', val: 'ALL' },
          { label: '🔥 Hook Architecture', val: 'HOOKS' },
          { label: '🎬 Editing & Exports', val: 'EDITING' },
          { label: '📈 Algorithm & Reach', val: 'ALGORITHM' },
        ].map((cat) => (
          <button
            key={cat.val}
            onClick={() => setSelectedCategory(cat.val as any)}
            className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat.val
                ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-purple-500/20'
                : 'bg-[#0c1022] border border-white/10 text-slate-300 hover:text-white hover:border-purple-500/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Lesson Guides Grid */}
      <div className="space-y-6">
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="p-6 sm:p-7 rounded-3xl bg-[#0c1022] border border-white/[0.08] hover:border-purple-500/40 transition-all space-y-4 group shadow-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                  {lesson.category}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {lesson.duration}
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                {lesson.difficulty}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
              {lesson.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed">
              {lesson.summary}
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
              <div className="text-[11px] font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Core Implementation Checklist:</span>
              </div>
              <ul className="space-y-1.5 pl-1">
                {lesson.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#170c38] to-[#0c1432] border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-bold text-white font-display">
            Put These Hooks to Work Today
          </h3>
          <p className="text-xs sm:text-sm text-purple-200/70">
            Browse active sponsor briefs on the Campaign Marketplace and submit your first viral clip.
          </p>
        </div>
        <Link
          href="/dashboard/clipper/campaigns"
          className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 transition-all text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 shrink-0"
        >
          <Compass className="w-4 h-4" />
          <span>Launch Campaign Marketplace</span>
        </Link>
      </div>
    </div>
  );
}
