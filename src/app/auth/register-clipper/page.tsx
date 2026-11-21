'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Scissors, ArrowRight, Lock, Mail, Instagram, Youtube, Zap } from 'lucide-react';

export default function RegisterClipperPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [youtubeHandle, setYoutubeHandle] = useState('');
  const [editingSoftware, setEditingSoftware] = useState('CapCut, Premiere Pro');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [upiId, setUpiId] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: 'CLIPPER',
          name,
          email,
          password,
          instagramHandle,
          youtubeHandle,
          editingSoftware,
          portfolioUrl,
          upiId,
          city,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      router.push('/dashboard/clipper');
      router.refresh();
    } catch {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-xl rounded-3xl bg-[#120a22] border border-purple-900/60 p-8 sm:p-10 space-y-6 shadow-2xl shadow-purple-950/80">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto">
            <Scissors className="w-6 h-6 -rotate-45" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Register as a Clipper</h1>
          <p className="text-xs text-purple-200/70">
            Cut viral clips for high-paying brand campaigns and withdraw guaranteed CPM rewards via UPI.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-purple-300 font-medium">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs text-purple-300 font-medium">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav@gmail.com"
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-purple-300 font-medium">Instagram Handle</label>
              <input
                type="text"
                value={instagramHandle}
                onChange={(e) => setInstagramHandle(e.target.value)}
                placeholder="@aarav.viralcuts"
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs text-purple-300 font-medium">YouTube Channel Handle</label>
              <input
                type="text"
                value={youtubeHandle}
                onChange={(e) => setYoutubeHandle(e.target.value)}
                placeholder="@AaravClipsHQ"
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-purple-300 font-medium">Editing Software</label>
              <input
                type="text"
                value={editingSoftware}
                onChange={(e) => setEditingSoftware(e.target.value)}
                placeholder="CapCut, Premiere, DaVinci"
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs text-purple-300 font-medium">UPI ID for Payouts</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourhandle@okhdfcbank"
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-purple-300 font-medium">Password *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-glow-purple flex items-center justify-center gap-2 text-sm"
          >
            <span>{loading ? 'Registering...' : 'Join Clipper Network'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-purple-300/70">
          Already have an account?{' '}
          <a href="/auth/login" className="text-purple-400 font-semibold hover:text-white underline">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
