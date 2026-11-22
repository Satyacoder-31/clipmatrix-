'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Disable smooth scroll interception in dashboard so native inner container scrolling works perfectly
    if (pathname?.startsWith('/dashboard')) {
      return;
    }

    // Premium inertial momentum smooth scrolling for public website pages
    // "when scrolled it should scroll a bit more automatically"
    const lenis = new Lenis({
      duration: 1.4, // Inertial glide duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1.25, // Amplifies scroll so it travels a bit further and glides gracefully
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Expose lenis globally for anchor clicks and navigation jumps
    (window as any).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, [pathname]);

  return <>{children}</>;
}
