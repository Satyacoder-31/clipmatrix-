'use client';

import React from 'react';
import MatrixRain from './MatrixRain';

export default function DynamicBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#070a1a]"
    >
      {/* Clean static radial ambient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_-15%,rgba(37,99,235,0.10),rgba(7,10,26,0.98))]" />

      {/* Steady falling Matrix numbers effect (without white strobe flashes or harsh glows) */}
      <MatrixRain />

      {/* Subtle darkening overlay for clean text contrast */}
      <div className="absolute inset-0 bg-[#070a1a]/30" />
    </div>
  );
}
