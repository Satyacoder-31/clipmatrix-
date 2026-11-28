'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Instagram, Youtube, Mail, Flame } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer inside dashboard after login
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }
  return (
    <footer className="relative bg-[#07020f] border-t border-purple-950/60 overflow-hidden pt-16 pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-3">
              <img
                src="/clipmatrix-logo.png"
                alt="Clip Matrix Logo"
                className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(124,58,237,0.55)]"
              />
              <span className="text-xl font-extrabold text-white font-display tracking-tight">
                CLIP <span className="text-[#00D4FF]">MATRIX</span>
              </span>
            </div>
            <p className="text-xs text-purple-200/60 leading-relaxed">
              Scaling long-form content and brand revenue through short-form creator & clipping distribution.
            </p>
          </div>

          {/* Action Button & Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#8b5cf6] hover:opacity-95 transition-all shadow-lg shadow-fuchsia-600/30 flex items-center gap-1.5 border border-fuchsia-300/30"
            >
              <span>Book a call.</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-purple-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-purple-300 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="mailto:byclipmatrix@gmail.com"
                className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-purple-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 5-Column Navigation Grid matching Sponz reference */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10">
          {/* Column 1: SERVICES */}
          <div className="space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">
              Services
            </div>
            <ul className="space-y-2 text-xs text-white/60">
              <li>
                <a href="#clippers" className="hover:text-white transition-colors">
                  Clipping & Editing
                </a>
              </li>
              <li>
                <a href="#brands" className="hover:text-white transition-colors">
                  Viral Clipping Campaigns
                </a>
              </li>
              <li>
                <a href="#brands" className="hover:text-white transition-colors">
                  Short-Form Video Editing
                </a>
              </li>
              <li>
                <a href="#campaigns" className="hover:text-white transition-colors">
                  Bounty Clipping
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Plan a campaign
                </a>
              </li>
              <li>
                <a href="/blog" className="text-purple-300 font-medium hover:text-purple-200 transition-colors">
                  Viral Clipping Agency Guide
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition-colors">
                  Clipping buyer’s guide
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-white transition-colors">
                  Case Studies & Proof
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: CAMPAIGNS */}
          <div className="space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">
              Campaigns
            </div>
            <ul className="space-y-2 text-xs text-white/60">
              <li>
                <a
                  href="#campaigns"
                  className="text-purple-300 font-semibold hover:text-purple-200 transition-colors flex items-center gap-1"
                >
                  <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                  <span>Live Brand Campaigns</span>
                </a>
              </li>
              <li>
                <a href="#brands" className="hover:text-white transition-colors">
                  For Brands & Agencies
                </a>
              </li>
              <li>
                <a href="#campaigns" className="hover:text-white transition-colors">
                  D2C & Beauty Brands
                </a>
              </li>
              <li>
                <a href="#campaigns" className="hover:text-white transition-colors">
                  Podcast & Founder Clips
                </a>
              </li>
              <li>
                <a href="#campaigns" className="hover:text-white transition-colors">
                  Fashion & Apparel
                </a>
              </li>
              <li>
                <a href="#campaigns" className="hover:text-white transition-colors">
                  Fitness & Wellness
                </a>
              </li>
              <li>
                <a href="#campaigns" className="hover:text-white transition-colors">
                  Tech & AI Brands
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: PLATFORMS */}
          <div className="space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">
              Platforms
            </div>
            <ul className="space-y-2 text-xs text-white/60">
              <li>
                <a href="#campaigns" className="hover:text-white transition-colors">
                  TikTok Agency
                </a>
              </li>
              <li>
                <a href="#campaigns" className="hover:text-white transition-colors">
                  Instagram Reels Agency
                </a>
              </li>
              <li>
                <a href="#campaigns" className="hover:text-white transition-colors">
                  YouTube Shorts Clipping
                </a>
              </li>
              <li>
                <a href="#campaigns" className="hover:text-white transition-colors">
                  Multi-Platform Virality
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: COMPANY */}
          <div className="space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">
              Company
            </div>
            <ul className="space-y-2 text-xs text-white/60">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Clip Matrix
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-white transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className="text-amber-300 font-semibold hover:text-amber-200 transition-colors"
                >
                  ★ Client Reviews (890+)
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#clippers"
                  className="hover:text-white transition-colors text-purple-300 font-medium"
                >
                  Join as Creator / Influencer
                </a>
              </li>
              <li>
                <a
                  href="/auth/register-clipper"
                  className="hover:text-white transition-colors text-cyan-300 font-medium"
                >
                  Join as a Clipper / Editor
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: RESOURCES */}
          <div className="space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">
              Resources
            </div>
            <ul className="space-y-2 text-xs text-white/60">
              <li>
                <a href="/blog" className="hover:text-white transition-colors">
                  Blog & Rate Cards
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  ROI Calculator
                </a>
              </li>
              <li>
                <a href="#dashboard-demo" className="hover:text-white transition-colors">
                  Client Dashboard Demo
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition-colors">
                  What is Clipping?
                </a>
              </li>
              <li>
                <a href="#brands" className="hover:text-white transition-colors">
                  Compare Alternatives
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06] text-xs text-white/40">
          <div>© {new Date().getFullYear()} Clip Matrix (clipmatrix.in). All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="/payout-policy" className="hover:text-white transition-colors">
              Payout Policy
            </a>
            <a href="mailto:byclipmatrix@gmail.com" className="hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
