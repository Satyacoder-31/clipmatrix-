'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowUpRight,
  LayoutDashboard,
  ChevronDown,
  Flame,
  Layers,
  BarChart3,
  Star,
  Sparkles,
} from 'lucide-react';

interface DropdownItem {
  label: string;
  href: string;
  desc?: string;
  icon?: any;
}

interface NavItem {
  label: string;
  href: string;
  id: string; // for scroll spy
  dropdown?: DropdownItem[];
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Use IntersectionObserver for 60fps ScrollSpy with ZERO layout thrashing
    const sectionIds = [
      'hero',
      'clippers',
      'brands',
      'campaigns',
      'how-it-works',
      'case-studies',
      'dashboard-demo',
      'pricing',
      'about',
      'reviews',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) setUser(data.user);
        else setUser(null);
      })
      .catch(() => setUser(null));
  }, [pathname]);

  const navLinks: NavItem[] = [
    { label: 'Clippers', href: '#clippers', id: 'clippers' },
    { label: 'For Brands', href: '#brands', id: 'brands' },
    { label: 'About', href: '#about', id: 'about' },
    {
      label: 'Work With Us',
      href: '#campaigns',
      id: 'campaigns',
      dropdown: [
        { label: 'Live Brand Campaigns', href: '#campaigns', desc: 'Browse high-budget active briefs', icon: Flame },
        { label: 'How It Works', href: '#how-it-works', desc: 'Decentralized clipping workflow', icon: Layers },
        { label: 'Clipper Hub & Earning', href: '#clippers', desc: 'Creator payout calculator', icon: Sparkles },
      ],
    },
    {
      label: 'Case Studies',
      href: '#case-studies',
      id: 'case-studies',
      dropdown: [
        { label: 'Client Proof & Metrics', href: '#case-studies', desc: 'Aether AI & KicksDrop case files', icon: BarChart3 },
        { label: 'Interactive Dashboard Demo', href: '#dashboard-demo', desc: 'Live Brand & Clipper preview', icon: LayoutDashboard },
      ],
    },
    {
      label: 'Compare',
      href: '#pricing',
      id: 'pricing',
      dropdown: [
        { label: 'ROI & CPM Simulator', href: '#pricing', desc: 'Calculate views & return on ad spend', icon: BarChart3 },
        { label: 'Agency vs Clip Matrix', href: '#brands', desc: 'Escrow vs fixed upfront retainers', icon: Layers },
      ],
    },
    {
      label: 'Resources',
      href: '#reviews',
      id: 'reviews',
      dropdown: [
        { label: 'Client Reviews (890+)', href: '#reviews', desc: '5-star founder & editor testimonials', icon: Star },
        { label: 'Ecosystem Vision', href: '#about', desc: 'Our decentralized mission & ethos', icon: Sparkles },
      ],
    },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (pathname !== '/') {
        window.location.href = `/${href}`;
        return;
      }
      if (typeof window !== 'undefined' && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(href, { offset: -85, duration: 1.4 });
        setMobileMenuOpen(false);
        setOpenDropdown(null);
        window.history.pushState(null, '', href);
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        const navHeight = 85;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setMobileMenuOpen(false);
        setOpenDropdown(null);
        window.history.pushState(null, '', href);
      }
    }
  };

  const getDashboardUrl = () => {
    if (!user) return '/auth/login';
    if (user.role === 'ADMIN') return '/dashboard/admin';
    if (user.role === 'BRAND') return '/dashboard/brand';
    return '/dashboard/clipper';
  };

  // Helper to determine if link or its dropdown children match activeSection
  const isLinkActive = (item: NavItem) => {
    if (item.id === activeSection) return true;
    if (item.label === 'Work With Us' && (activeSection === 'campaigns' || activeSection === 'how-it-works')) return true;
    if (item.label === 'Case Studies' && (activeSection === 'case-studies' || activeSection === 'dashboard-demo')) return true;
    if (item.label === 'Compare' && activeSection === 'pricing') return true;
    if (item.label === 'Resources' && (activeSection === 'reviews' || activeSection === 'about')) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 pt-3 pb-2 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-full transition-all duration-300 px-4 sm:px-6 py-2 flex items-center justify-between border ${isScrolled
          ? 'bg-[#0d071a]/92 backdrop-blur-2xl border-purple-500/35 shadow-2xl shadow-purple-950/70'
          : 'bg-[#110922]/80 backdrop-blur-xl border-purple-500/20 shadow-xl shadow-purple-950/40'
          }`}
      >
        {/* Brand Logo: Clean transparent Clip Matrix logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-3 group shrink-0"
        >
          <img
            src="/clipmatrix-logo.png"
            alt="Clip Matrix Logo"
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain group-hover:scale-105 transition-transform drop-shadow-[0_0_14px_rgba(0,212,255,0.65)]"
          />
          <span className="font-black text-white text-base sm:text-lg font-display tracking-tight hidden sm:inline">
            CLIP<span className="text-[#00D4FF] drop-shadow-[0_0_12px_rgba(0,212,255,0.7)]">MATRIX</span>
          </span>
        </a>

        {/* Center Nav Links - Matching user reference image with dropdown carats */}
        <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
          {navLinks.map((item) => {
            const hasDropdown = item.dropdown && item.dropdown.length > 0;
            const active = isLinkActive(item);

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasDropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${active
                    ? 'text-white bg-purple-600/30 font-semibold shadow-[0_0_12px_rgba(168,85,247,0.35)] border border-purple-400/30'
                    : 'text-purple-200/80 hover:text-white hover:bg-white/[0.06]'
                    }`}
                >
                  <span>{item.label}</span>
                  {hasDropdown && (
                    <ChevronDown
                      className={`w-3 h-3 text-purple-300/60 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180 text-white' : ''
                        }`}
                    />
                  )}
                </a>

                {/* Dropdown Menu */}
                {hasDropdown && openDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 w-64 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="rounded-2xl bg-[#0f071f]/95 backdrop-blur-2xl border border-purple-500/30 p-2 shadow-2xl shadow-purple-950/80 space-y-1">
                      {item.dropdown?.map((sub) => {
                        const Icon = sub.icon;
                        return (
                          <a
                            key={sub.label}
                            href={sub.href}
                            onClick={(e) => handleNavClick(e, sub.href)}
                            className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-purple-600/20 transition-colors group cursor-pointer"
                          >
                            {Icon && (
                              <div className="w-7 h-7 rounded-lg bg-purple-900/40 border border-purple-700/40 flex items-center justify-center text-purple-300 group-hover:text-fuchsia-300 shrink-0 mt-0.5">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                            )}
                            <div>
                              <div className="text-xs font-semibold text-white group-hover:text-purple-200">
                                {sub.label}
                              </div>
                              {sub.desc && (
                                <div className="text-[10px] text-purple-300/60 leading-tight mt-0.5">
                                  {sub.desc}
                                </div>
                              )}
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right CTA Button: Book a call matching user screenshot */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <a
              href={getDashboardUrl()}
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-glow-purple flex items-center gap-1.5 border border-purple-400/40"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{user.role === 'ADMIN' ? 'Admin Panel' : 'Dashboard'}</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          ) : (
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-5 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#8b5cf6] hover:opacity-95 transition-all shadow-lg shadow-fuchsia-600/30 flex items-center gap-1.5 border border-fuchsia-300/30 group cursor-pointer"
            >
              <span>Book a call</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-purple-200 hover:text-white hover:bg-white/5"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-6xl mx-auto mt-2 rounded-3xl bg-[#0e071c]/98 backdrop-blur-2xl border border-purple-500/30 p-5 space-y-4 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-2.5 rounded-xl transition-colors ${isLinkActive(link)
                  ? 'bg-purple-600/30 text-white font-bold border border-purple-500/40'
                  : 'text-purple-200 hover:text-white hover:bg-white/5'
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-purple-900/40 flex items-center justify-between gap-3">
            <a
              href="/auth/login"
              className="flex-1 py-2.5 rounded-xl text-center text-xs font-semibold text-purple-200 bg-white/5"
            >
              Sign In
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="flex-1 py-2.5 rounded-xl text-center text-xs font-bold text-white bg-gradient-to-r from-[#d946ef] to-[#8b5cf6]"
            >
              Book a call ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
