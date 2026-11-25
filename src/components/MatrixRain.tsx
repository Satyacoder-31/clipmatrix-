'use client';

import React, { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Characters matching reference design: predominantly numeric and hex digits
    const characters = '0123456789ABCDEF0123456789';
    const fontSize = 16;
    const colSpacing = 28; // Distinct spacing between columns matching reference image
    const columns = Math.ceil(width / colSpacing);

    // Per-column state
    const drops: number[] = [];
    const speeds: number[] = [];
    const columnColors: string[] = [];

    // Calm palette without harsh strobe/glint flashes
    const colors = [
      'rgba(37, 99, 235, 0.45)',  // Primary Blue #2563EB
      'rgba(124, 58, 237, 0.48)', // Primary Purple #7C3AED
      'rgba(0, 212, 255, 0.45)',  // Accent Cyan #00D4FF
      'rgba(99, 102, 241, 0.42)', // Indigo
      'rgba(56, 189, 248, 0.45)', // Sky blue
    ];

    const maxRows = Math.ceil(height / fontSize);

    // Randomize initial drops across full screen height so it is immediately visible on first paint
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * maxRows);
      speeds[i] = 0.5 + Math.random() * 0.55;
      columnColors[i] = colors[Math.floor(Math.random() * colors.length)];
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newCols = Math.ceil(width / colSpacing);
      const newMaxRows = Math.ceil(height / fontSize);
      if (newCols > drops.length) {
        for (let i = drops.length; i < newCols; i++) {
          drops[i] = Math.floor(Math.random() * newMaxRows);
          speeds[i] = 0.5 + Math.random() * 0.55;
          columnColors[i] = colors[Math.floor(Math.random() * colors.length)];
        }
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let lastDraw = 0;
    const fps = 26;
    const interval = 1000 / fps;

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      const delta = currentTime - lastDraw;
      if (delta < interval) return;
      lastDraw = currentTime - (delta % interval);

      // Smooth trailing fade matching background color
      ctx.fillStyle = 'rgba(7, 10, 26, 0.14)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `600 ${fontSize}px 'Space Grotesk', 'Courier New', monospace`;
      ctx.shadowBlur = 0;

      for (let i = 0; i < columns; i++) {
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * colSpacing;
        const y = drops[i] * fontSize;

        // Steady per-column color (no random white/neon strobe flashes)
        ctx.fillStyle = columnColors[i];
        ctx.fillText(char, x, y);

        // Reset to top when off screen
        if (y > height && Math.random() > 0.96) {
          drops[i] = 0;
        }

        drops[i] += speeds[i];
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-55"
      style={{ willChange: 'transform' }}
    />
  );
}
