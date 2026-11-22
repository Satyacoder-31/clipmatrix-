'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, ShieldCheck, Zap, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

function DiscordClipperContent() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');

  const getErrorMessage = () => {
    if (!errorParam) return null;
    switch (errorParam) {
      case 'cancelled':
        return 'Discord authorization was cancelled or interrupted.';
      case 'token_failed':
        return 'Failed to verify authorization with Discord servers.';
      case 'missing_credentials':
        return 'Discord Client credentials are being configured.';
      default:
        return 'An error occurred during Discord authentication. Please try again.';
    }
  };

  const errorMessage = getErrorMessage();

  return (
    <div className="w-full max-w-md rounded-3xl bg-[#0e1026]/90 backdrop-blur-2xl border border-[#5865F2]/30 p-8 sm:p-10 space-y-7 shadow-2xl shadow-indigo-950/80 relative z-10 text-center">
      {/* Brand & Discord Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-2 rounded-2xl bg-[#160B3E]/90 border border-purple-500/40 shadow-[0_0_15px_rgba(124,58,237,0.4)] flex items-center justify-center">
            <img
              src="/clipmatrix-logo.png"
              alt="Clip Matrix Logo"
              className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(0,212,255,0.7)]"
            />
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <div className="w-12 h-12 rounded-2xl bg-[#5865F2]/20 border border-[#5865F2]/40 flex items-center justify-center text-[#5865F2] shadow-[0_0_20px_rgba(88,101,242,0.35)]">
            {/* Official Discord Gamepad Icon */}
            <svg className="w-7 h-7 fill-current" viewBox="0 0 127.14 96.36">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
            </svg>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5865F2]/15 border border-[#5865F2]/30 text-[#8ea1e1] text-[11px] font-mono font-bold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5865F2] animate-pulse" />
          <span>DISCORD CLIPPER GATEWAY</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
          Join as a Clipper
        </h1>
        <p className="text-xs text-slate-300/80 leading-relaxed max-w-sm mx-auto">
          Authenticate directly with your Discord account to claim viral clipping campaigns, access long-form media libraries, and receive guaranteed escrow CPM payouts.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-left flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Direct 1-Click Discord Login Button - NO INPUT FIELD */}
      <div className="space-y-4">
        <a
          href="/api/auth/discord"
          className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-[#5865F2] hover:bg-[#4752C4] transition-all duration-200 shadow-[0_0_25px_rgba(88,101,242,0.4)] hover:shadow-[0_0_35px_rgba(88,101,242,0.6)] flex items-center justify-center gap-3 text-base cursor-pointer group hover:scale-[1.01] active:scale-[0.99]"
        >
          <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 127.14 96.36">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
          </svg>
          <span>Login with Discord</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>

        {/* Instant Demo Preview Option */}
        <div className="pt-1">
          <a
            href="/api/auth/discord?demo=true"
            className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5 font-medium underline-offset-4 hover:underline"
          >
            <span>Preview Clipper Dashboard (Demo Mode)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Clipper Benefits & Guarantees */}
      <div className="pt-4 border-t border-white/[0.08] space-y-2.5 text-xs text-left text-slate-300/80">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Direct 1-Click Discord Authentication</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#5865F2] shrink-0" />
          <span>Access verified brand campaigns & video assets</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Guaranteed CPM payouts via UPI & Escrow</span>
        </div>
      </div>

      {/* Brand Sign In Footer Link */}
      <div className="text-center text-xs text-purple-300/70 pt-2 border-t border-white/[0.05]">
        Are you a Brand or Agency?{' '}
        <Link href="/auth/login" className="text-cyan-400 font-semibold hover:text-white underline">
          Sign In Here
        </Link>
      </div>
    </div>
  );
}

export default function ClipperDiscordLoginPage() {
  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      {/* Ambient background glows */}
      <div className="absolute w-[500px] h-[500px] bg-[#5865F2]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none translate-x-32" />

      <Suspense fallback={
        <div className="w-full max-w-md rounded-3xl bg-[#0e1026]/90 border border-[#5865F2]/30 p-8 text-center text-white">
          <span className="inline-block w-8 h-8 border-2 border-white/20 border-t-[#5865F2] rounded-full animate-spin" />
        </div>
      }>
        <DiscordClipperContent />
      </Suspense>
    </div>
  );
}
