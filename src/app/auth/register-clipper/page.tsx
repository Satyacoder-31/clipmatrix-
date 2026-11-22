'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShieldCheck, Zap, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ClipperDiscordLoginPage() {
  const [discordUsername, setDiscordUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDiscordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!discordUsername.trim()) {
      setError('Please enter your Discord username');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discordUsername: discordUsername.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Discord authentication failed');
        setLoading(false);
        return;
      }

      router.push('/dashboard/clipper');
      router.refresh();
    } catch {
      setError('An unexpected connection error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      {/* Ambient background glows */}
      <div className="absolute w-[500px] h-[500px] bg-[#5865F2]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none translate-x-32" />

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
            Log in with your Discord username to instantly access brand briefs, claim viral clipping campaigns, and receive verified CPM escrow payouts.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-left animate-in fade-in">
            {error}
          </div>
        )}

        {/* Discord Single-Field Login Form */}
        <form onSubmit={handleDiscordLogin} className="space-y-4 text-left">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/90 flex items-center justify-between">
              <span>Discord Username</span>
              <span className="text-[11px] text-[#8ea1e1] font-mono">Instant Access</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5865F2] font-bold text-base font-mono">
                @
              </span>
              <input
                type="text"
                required
                value={discordUsername}
                onChange={(e) => setDiscordUsername(e.target.value)}
                placeholder="your_discord_username"
                className="w-full pl-9 pr-4 py-3.5 rounded-2xl bg-[#060818]/90 border border-[#5865F2]/30 focus:border-[#5865F2] focus:ring-2 focus:ring-[#5865F2]/25 text-white placeholder-white/30 text-sm font-medium outline-none transition-all"
                autoFocus
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !discordUsername.trim()}
            className="w-full py-4 rounded-2xl font-bold text-white bg-[#5865F2] hover:bg-[#4752C4] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_25px_rgba(88,101,242,0.4)] hover:shadow-[0_0_35px_rgba(88,101,242,0.6)] flex items-center justify-center gap-2.5 text-sm cursor-pointer group"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 127.14 96.36">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
                </svg>
                <span>Login with Discord</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Clipper Guarantee Badges */}
        <div className="pt-4 border-t border-white/[0.08] space-y-2.5 text-xs text-left text-slate-300/80">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Instant Clipper approval with Discord ID</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#5865F2] shrink-0" />
            <span>Direct access to active brand campaigns</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Guaranteed CPM payouts via UPI & Escrow</span>
          </div>
        </div>
      </div>
    </div>
  );
}
