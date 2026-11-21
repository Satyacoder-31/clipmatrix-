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

      {/* 2. Continuously Moving Cyber-Matrix Perspective Grid (GPU Compositor Accelerated) */}
      <div className="absolute inset-0 opacity-25">
        <div className="matrix-moving-grid" />
      </div>

      {/* 3. THE CYBERTRON PLANETARY SYSTEM - PROMINENT, BOLD & 60-120FPS GPU SMOOTH */}
      <CybertronPlanet />

      {/* 4. Ambient Glowing Corona Orbs (Pure Radial Gradients - Zero CPU filter overhead) */}
      <div
        className="absolute -top-24 -left-24 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.28)_0%,rgba(192,38,211,0.12)_40%,transparent_70%)] pointer-events-none"
      />
      <div
        className="absolute top-20 -right-24 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.2)_0%,rgba(147,51,234,0.1)_40%,transparent_70%)] pointer-events-none"
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(88,28,135,0.22)_0%,rgba(217,70,239,0.08)_45%,transparent_70%)] pointer-events-none"
      />
    </div>
  );
}
