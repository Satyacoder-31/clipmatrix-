'use client';

import React from 'react';

export default function DynamicBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#070a1a]"
    >
      {/* Clean static radial ambient lighting without distracting flashing/matrix animations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_-15%,rgba(37,99,235,0.12),rgba(7,10,26,0.98))]" />
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.09)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 -right-28 w-[540px] h-[540px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.07)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[#070a1a]/30" />
    </div>
  );
}
