'use client';

import React from 'react';
import MatrixRain from './MatrixRain';

export default function DynamicBackground() {
  return (
    <div
      aria-hidden="true"
      style={{ contain: 'paint', willChange: 'transform' }}
      className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#070a1a]"
    >
      {/* 1. Deep Ambient Radial Gradient Vignette (#070A1A / #0A0E24) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_80%_at_50%_-15%,rgba(37,99,235,0.12),rgba(7,10,26,0.99))]" />

      {/* 2. Continuously Moving Cyber-Matrix Perspective Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="matrix-moving-grid" />
      </div>

      {/* 3. CONTINUOUS MATRIX NUMBER / CODE RAIN (Constantly dropping top to bottom) */}
      <MatrixRain />

      {/* 4. Ambient Glowing Corona Orbs in Subdued Primary Purple (#7C3AED) & Cyan (#00D4FF) */}
      <div
        className="absolute -top-28 -left-28 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.14)_0%,rgba(37,99,235,0.06)_45%,transparent_70%)] pointer-events-none"
      />
      <div
        className="absolute top-1/4 -right-24 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.10)_0%,rgba(37,99,235,0.05)_45%,transparent_70%)] pointer-events-none"
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.10)_0%,rgba(0,212,255,0.04)_45%,transparent_70%)] pointer-events-none"
      />

      {/* 5. Deep Darkening Overlay for improved text contrast */}
      <div className="absolute inset-0 bg-[#070a1a]/35" />
    </div>
  );
}
