'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Premium inertial momentum smooth scrolling
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
  }, []);

  return <>{children}</>;
}
