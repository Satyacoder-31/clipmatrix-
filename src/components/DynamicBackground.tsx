'use client';

import React from 'react';
import CybertronPlanet from './CybertronPlanet';

export default function DynamicBackground() {
  return (
    <div
      aria-hidden="true"
      style={{ contain: 'paint', willChange: 'transform' }}
      className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#07020f]"
    >
      {/* 1. Deep Ambient Radial Gradient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(88,28,135,0.4),rgba(7,2,15,0.98))]" />

      {/* 2. Continuously Moving Cyber-Matrix Perspective Grid (GPU accelerated) */}
      <div className="absolute inset-0 opacity-30">
        <div className="matrix-moving-grid absolute inset-0" />
      </div>

      {/* 3. THE CYBERTRON PLANETARY SYSTEM - PROMINENT, BOLD & 60FPS SMOOTH */}
      <CybertronPlanet />

      {/* 4. Ambient Glowing Corona Orbs (Hardware-accelerated CSS) */}
      <div
        className="absolute -top-24 -left-24 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-700/35 via-fuchsia-600/25 to-transparent blur-[120px] pointer-events-none"
        style={{ transform: 'translate3d(0,0,0)' }}
      />
      <div
        className="absolute top-20 -right-24 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-cyan-500/25 via-purple-600/20 to-transparent blur-[120px] pointer-events-none"
        style={{ transform: 'translate3d(0,0,0)' }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-[650px] h-[650px] rounded-full bg-gradient-to-r from-purple-900/25 via-fuchsia-900/20 to-transparent blur-[130px] pointer-events-none"
        style={{ transform: 'translate3d(0,0,0)' }}
      />
    </div>
  );
}
