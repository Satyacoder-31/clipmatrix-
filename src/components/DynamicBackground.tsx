'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CybertronPlanet from './CybertronPlanet';

export default function DynamicBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#07020f]"
    >
      {/* 1. Deep Ambient Radial Gradient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(88,28,135,0.35),rgba(7,2,15,0.98))]" />

      {/* 2. Continuously Moving Cyber-Matrix Perspective Grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="matrix-moving-grid absolute inset-0" />
      </div>

      {/* 3. THE CYBERTRON PLANETARY SYSTEM - PROMINENT & HIGH VISIBILITY */}
      <CybertronPlanet />

      {/* 4. Floating Morphing Aurora Orbs in Continuous Loop */}
      {/* Orb 1: Magenta / Fuchsia (Top Left to Center) */}
      <motion.div
        animate={{
          x: [-60, 80, -20, -60],
          y: [-40, 60, -30, -40],
          scale: [1, 1.25, 0.9, 1],
          opacity: [0.35, 0.6, 0.35, 0.35],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-20 -left-20 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full bg-gradient-to-tr from-[#9333ea]/45 via-[#d946ef]/35 to-[#c026d3]/20 blur-[130px]"
      />

      {/* Orb 2: Electric Cyan / Sky (Top Right to Center) */}
      <motion.div
        animate={{
          x: [40, -70, 30, 40],
          y: [-20, 70, -40, -20],
          scale: [0.9, 1.2, 1, 0.9],
          opacity: [0.25, 0.45, 0.3, 0.25],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-10 -right-20 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-gradient-to-bl from-[#06b6d4]/30 via-[#3b82f6]/20 to-[#8b5cf6]/20 blur-[140px]"
      />

      {/* Orb 3: Deep Royal Purple & Indigo (Mid-Center Pulse) */}
      <motion.div
        animate={{
          x: [-40, 50, -60, -40],
          y: [30, -40, 50, 30],
          scale: [1.1, 0.85, 1.2, 1.1],
          opacity: [0.3, 0.5, 0.35, 0.3],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        className="absolute top-1/3 left-1/4 w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] rounded-full bg-gradient-to-r from-[#7c3aed]/30 via-[#a855f7]/25 to-transparent blur-[150px]"
      />

      {/* 5. Drifting Matrix Particles / Video Pixels */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: '10%', top: '15%', size: 3, dur: 14, delay: 0 },
          { left: '25%', top: '40%', size: 4, dur: 18, delay: 2 },
          { left: '40%', top: '25%', size: 2, dur: 12, delay: 4 },
          { left: '55%', top: '65%', size: 3, dur: 16, delay: 1 },
          { left: '70%', top: '20%', size: 4, dur: 20, delay: 3 },
          { left: '85%', top: '50%', size: 3, dur: 15, delay: 5 },
          { left: '15%', top: '75%', size: 2, dur: 17, delay: 2 },
          { left: '32%', top: '85%', size: 4, dur: 22, delay: 0 },
          { left: '65%', top: '80%', size: 3, dur: 19, delay: 4 },
          { left: '80%', top: '90%', size: 2, dur: 13, delay: 1 },
          { left: '48%', top: '10%', size: 3, dur: 21, delay: 3 },
          { left: '92%', top: '30%', size: 4, dur: 16, delay: 2 },
          { left: '5%', top: '55%', size: 2, dur: 15, delay: 5 },
          { left: '60%', top: '35%', size: 3, dur: 18, delay: 6 },
        ].map((pt, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -90, -180, 0],
              x: [0, i % 2 === 0 ? 15 : -15, 0],
              opacity: [0.2, 0.8, 0.3, 0.2],
              scale: [1, 1.4, 0.9, 1],
            }}
            transition={{
              duration: pt.dur,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: pt.delay,
            }}
            style={{
              left: pt.left,
              top: pt.top,
              width: `${pt.size}px`,
              height: `${pt.size}px`,
            }}
            className="absolute rounded-full bg-gradient-to-tr from-cyan-400 to-fuchsia-300 shadow-[0_0_10px_#22d3ee]"
          />
        ))}
      </div>

      {/* 6. Subtle Horizontal Energy Wave Scanline (Simulating Audio / Video Timeline Sync) */}
      <motion.div
        animate={{
          y: ['-10%', '110%'],
          opacity: [0, 0.2, 0.35, 0.2, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent blur-md pointer-events-none"
      />
    </div>
  );
}
