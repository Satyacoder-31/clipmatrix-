'use client';

import React from 'react';

export default function CybertronPlanet() {
  return (
    <div
      style={{ contain: 'layout paint' }}
      className="absolute top-[70px] sm:top-[50px] left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] lg:w-[1100px] h-[700px] sm:h-[950px] lg:h-[1100px] pointer-events-none z-0 flex items-center justify-center select-none overflow-visible"
    >
      {/* 1. Deep Atmospheric Planetary Nebula Glow Behind Cybertron (Pure Radial Gradient - Zero CPU Filter cost) */}
      <div className="absolute w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.45)_0%,rgba(217,70,239,0.22)_35%,rgba(6,182,212,0.12)_55%,transparent_75%)] -z-10" />

      {/* 2. Outer Giant Energy Ring (Tilted 3D Orbit - GPU compositor rotation) */}
      <div
        className="absolute w-[800px] sm:w-[1050px] lg:w-[1250px] h-[800px] sm:h-[1050px] lg:h-[1250px] rounded-full border border-purple-500/40 -z-5"
        style={{
          transform: 'rotateX(72deg) rotateY(-18deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Orbiting Satellite Node 1 */}
        <div className="w-full h-full relative animate-cybertron-orbit">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_16px_#22d3ee] border-2 border-white flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          {/* Glowing particle trail */}
          <div className="absolute top-2 left-[52%] w-12 h-1 bg-gradient-to-r from-cyan-400 to-transparent" />
        </div>
      </div>

      {/* 3. Middle Segmented Cyber-Ring with Mechanical Notches */}
      <div
        className="absolute w-[700px] sm:w-[920px] lg:w-[1080px] h-[700px] sm:h-[920px] lg:h-[1080px] rounded-full -z-5"
        style={{
          transform: 'rotateX(72deg) rotateY(-18deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-dashed border-fuchsia-500/50 relative animate-cybertron-orbit-reverse">
          {/* Secondary Orbiting Satellite Node */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-fuchsia-400 shadow-[0_0_16px_#e879f9] border border-white" />
        </div>
      </div>

      {/* 4. THE CYBERTRON PLANET CORE SPHERE */}
      <div className="relative w-[380px] sm:w-[540px] lg:w-[620px] h-[380px] sm:h-[540px] lg:h-[620px] rounded-full overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.6),inset_0_0_70px_rgba(147,51,234,0.85)] border border-purple-400/60 bg-[#0e061c]">
        {/* 4a. Base 3D Sphere Shading (Atmospheric Shadow & Rim Light) */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_25%,_rgba(192,132,252,0.5)_0%,_rgba(59,7,100,0.85)_45%,_rgba(10,3,24,0.98)_85%)] z-10" />

        {/* 4b. Intense Upper Atmosphere Rim Flare */}
        <div className="absolute -top-10 -left-10 w-[120%] h-48 bg-gradient-to-b from-cyan-400/35 via-fuchsia-500/20 to-transparent z-20 pointer-events-none" />

        {/* 4c. Continuous Looping Cybernetic Circuit Texture (Cybertron Grid) - 100% GPU Accelerated */}
        <div
          style={{ willChange: 'transform' }}
          className="absolute inset-0 w-[200%] h-full opacity-80 z-15 mix-blend-screen animate-cybertron-circuits"
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Seamless Cybertron Circuit Pattern */}
              <pattern
                id="cybertron-circuits-pattern"
                width="190"
                height="190"
                patternUnits="userSpaceOnUse"
              >
                {/* Circuit Grid Lines */}
                <path
                  d="M 0 30 L 70 30 L 95 55 L 150 55 M 30 0 L 30 80 L 60 110 L 60 190 M 110 30 L 110 120 L 140 150 L 190 150 M 95 190 L 95 140 L 120 115 L 190 115 M 10 140 L 50 140 L 80 170 L 80 190"
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="1.8"
                  opacity="0.9"
                />
                {/* Glowing Hexagonal Power Hubs */}
                <polygon
                  points="70,30 75,22 85,22 90,30 85,38 75,38"
                  fill="#06b6d4"
                  opacity="0.95"
                />
                <polygon
                  points="140,150 145,142 155,142 160,150 155,158 145,158"
                  fill="#d946ef"
                  opacity="0.95"
                />
                <circle cx="60" cy="110" r="4.5" fill="#38bdf8" />
                <circle cx="120" cy="115" r="3.5" fill="#f472b6" />
                <circle cx="30" cy="80" r="3" fill="#a855f7" />
                <circle cx="110" cy="120" r="4" fill="#06b6d4" />

                {/* Sub-circuits */}
                <path
                  d="M 5 5 L 25 25 M 170 170 L 185 185 M 180 10 L 165 25"
                  stroke="#e879f9"
                  strokeWidth="1.2"
                  opacity="0.75"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cybertron-circuits-pattern)" />
          </svg>
        </div>

        {/* 4d. Glowing Molten Energon Fissures / Continental Chasms */}
        <div className="absolute inset-0 z-18 pointer-events-none mix-blend-screen opacity-85 animate-cybertron-fissure">
          <svg className="w-full h-full" viewBox="0 0 600 600" fill="none">
            {/* Primary Glowing Energon Trench */}
            <path
              d="M 80 220 Q 220 180 340 260 T 520 280 M 140 320 Q 260 380 400 340 T 540 400 M 240 100 Q 280 240 290 380 T 320 520"
              stroke="#06b6d4"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Secondary Pink Fissure */}
            <path
              d="M 180 140 Q 320 190 390 120 T 480 200 M 120 420 Q 240 440 360 480"
              stroke="#d946ef"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* 4e. Internal Spherical Shadowing to create true 3D curvature */}
        <div className="absolute inset-0 rounded-full shadow-[inset_-40px_-50px_120px_rgba(0,0,0,0.95),inset_25px_25px_70px_rgba(192,132,252,0.45)] z-25 pointer-events-none" />

        {/* 4f. Pulsing Energon Core Glow (Pure Radial Gradient) */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.35)_0%,rgba(217,70,239,0.2)_40%,transparent_70%)] z-12 pointer-events-none" />
      </div>

      {/* 5. Front Half of Outer Orbital Rings (Passes in front of Cybertron) */}
      <div
        className="absolute w-[800px] sm:w-[1050px] lg:w-[1250px] h-[800px] sm:h-[1050px] lg:h-[1250px] rounded-full border-t-2 border-r-2 border-cyan-400/70 z-30 pointer-events-none"
        style={{
          transform: 'rotateX(72deg) rotateY(-18deg)',
          clipPath: 'polygon(0% 45%, 100% 45%, 100% 100%, 0% 100%)',
          boxShadow: '0 0 25px rgba(6, 182, 212, 0.5)',
        }}
      />

      {/* 6. Orbiting Cyber-Moon (Moonbase 1) */}
      <div className="absolute top-12 right-4 sm:right-16 w-20 sm:w-28 h-20 sm:h-28 rounded-full z-20 shadow-[0_0_25px_rgba(6,182,212,0.5),inset_0_0_20px_rgba(59,7,100,0.8)] border border-cyan-400/50 overflow-hidden bg-[#0c0418] animate-cybertron-moon">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,_rgba(6,182,212,0.6)_0%,_rgba(15,6,30,0.95)_75%)]" />
        <div className="absolute inset-0 opacity-60">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <path
              d="M 10 30 L 40 30 L 60 50 L 90 50 M 30 70 L 60 70 L 80 90 M 50 10 L 50 40 L 70 60"
              stroke="#22d3ee"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="40" cy="30" r="3" fill="#e879f9" />
            <circle cx="60" cy="70" r="2.5" fill="#38bdf8" />
          </svg>
        </div>
        {/* Moon Ring */}
        <div
          className="absolute -inset-4 rounded-full border border-cyan-400/40"
          style={{ transform: 'rotateX(75deg)' }}
        />
      </div>
    </div>
  );
}
