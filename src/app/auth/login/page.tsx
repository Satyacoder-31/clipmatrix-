'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Scissors,
  Building2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  LogOut,
  Lock,
} from 'lucide-react';

function LoginPortalHubContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checking, setChecking] = useState(false);

  // Redirect if portal query param was explicitly passed (e.g. ?portal=brand or ?portal=admin)
  useEffect(() => {
    const portal = searchParams.get('portal')?.toLowerCase();
    if (portal === 'brand') router.replace('/auth/brand');
    else if (portal === 'admin') router.replace('/auth/admin');
    else if (portal === 'clipper') router.replace('/auth/register-clipper');
  }, [searchParams, router]);

  const handleLogout = async () => {
    setChecking(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    setChecking(false);
    router.push('/');
    router.refresh();
  };

  const portals = [
    {
      id: 'clipper',
      title: 'Clipper Login',
      badge: 'DISCORD ONLY',
      description:
        'Connect directly via Discord OAuth to join active brand campaigns, submit viral Reels & Shorts, and withdraw CPM earnings.',
      href: '/auth/register-clipper',
      cta: 'Continue with Discord',
      iconType: 'discord' as const,
      highlights: ['1-Click Discord OAuth Sign In', 'Access campaign raw video kits', 'Automated API view payouts'],
      cardBorder: 'border-[#5865F2]/35 hover:border-[#5865F2]/75',
      cardGlow: 'hover:shadow-[0_0_40px_rgba(88,101,242,0.22)]',
      badgeStyle: 'bg-[#5865F2]/20 text-[#9aa8ff] border-[#5865F2]/40',
      iconBox: 'bg-[#5865F2] text-white shadow-[0_0_20px_rgba(88,101,242,0.45)]',
      ctaStyle: 'bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-lg shadow-[#5865F2]/25',
    },
    {
      id: 'brand',
      title: 'Brand / Creator Login',
      badge: 'ID & PASSWORD',
      description:
        'Sign in with your Brand credentials to monitor real-time campaign views, completion progress, and posting clipper accounts.',
      href: '/auth/brand',
      cta: 'Sign In as Brand / Creator',
      iconType: 'brand' as const,
      highlights: ['Live view & reach telemetry', 'Campaign completion milestones', 'Verified clipper account handles'],
      cardBorder: 'border-purple-500/35 hover:border-purple-400/75',
      cardGlow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.22)]',
      badgeStyle: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      iconBox:
        'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]',
      ctaStyle:
        'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25',
    },
    {
      id: 'admin',
      title: 'Admin Login',
      badge: 'COMMAND GATEWAY',
      description:
        'Restricted portal for platform administrators to publish campaigns, audit view counts, and approve payouts.',
      href: '/auth/admin',
      cta: 'Sign In as Admin',
      iconType: 'admin' as const,
      highlights: ['Create & manage all campaigns', 'Live Apify & YouTube API audits', 'Approve wallet withdrawals'],
      cardBorder: 'border-cyan-500/35 hover:border-cyan-400/75',
      cardGlow: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]',
      badgeStyle: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40',
      iconBox: 'bg-gradient-to-br from-cyan-500 to-purple-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]',
      ctaStyle:
        'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/20',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 relative">
      {/* Ambient glows */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl space-y-6 relative z-10">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-1 text-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group font-semibold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-cyan-400" />
            <span>Back to Main Website</span>
          </Link>

          <button
            onClick={handleLogout}
            disabled={checking}
            type="button"
            className="inline-flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors font-semibold cursor-pointer py-1.5 px-3 rounded-xl hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Clear Session & Home</span>
          </button>
        </div>

        {/* Gateway Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Select Your Access Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight">
            Sign In to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Clip Matrix</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed">
            Choose your account portal below. Clippers sign in via Discord; Brands, Creators, and Admins use their portal credentials.
          </p>
        </div>

        {/* Three Dedicated Login Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-2">
          {portals.map((p) => (
            <div
              key={p.id}
              className={`rounded-3xl bg-[#0c071c]/90 backdrop-blur-2xl border ${p.cardBorder} ${p.cardGlow} p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden`}
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${p.iconBox}`}>
                    {p.iconType === 'discord' ? (
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 127.14 96.36">
                        <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
                      </svg>
                    ) : p.iconType === 'brand' ? (
                      <Building2 className="w-6 h-6" />
                    ) : (
                      <ShieldCheck className="w-6 h-6" />
                    )}
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border tracking-wider ${p.badgeStyle}`}
                  >
                    {p.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-white font-display">{p.title}</h2>
                  <p className="text-xs text-slate-300/80 leading-relaxed">{p.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                  {p.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 space-y-2.5">
                <Link
                  href={p.href}
                  className={`w-full py-3.5 px-5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${p.ctaStyle}`}
                >
                  {p.iconType !== 'discord' && <Lock className="w-3.5 h-3.5 opacity-80" />}
                  <span>{p.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                {p.id === 'brand' && (
                  <div className="text-center text-[11px] text-slate-400">
                    New Brand?{' '}
                    <Link href="/auth/register-brand" className="text-purple-300 hover:text-white underline font-semibold">
                      Create Brand Account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats Bar */}
        <div className="rounded-2xl bg-[#100922]/75 border border-purple-500/20 px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-purple-400 -rotate-45" />
            <span>
              <strong className="text-white">$10,000+</strong> distributed via escrow-protected CPM payouts
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            500+ Verified Clippers • Real-Time Apify & YouTube Audits
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-8 text-slate-400 text-sm">
          Loading login portals...
        </div>
      }
    >
      <LoginPortalHubContent />
    </Suspense>
  );
}
