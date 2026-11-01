'use client';

import React, { useState, useEffect } from 'react';
import { soundEngine } from '@/lib/audio';

interface LoadingScreenProps {
  onEnter: () => void;
}

export default function LoadingScreen({ onEnter }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          return 100;
        }
        // Realistic progress ramp
        const step = Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    setHasStarted(true);
    // Initialize sound engine on first user interaction
    try {
      soundEngine?.init();
    } catch (e) {
      // Audio fallback
    }
    setTimeout(() => {
      onEnter();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#040507] text-[#f8fafc] px-6 py-12 transition-opacity duration-700 select-none ${
        hasStarted ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Telemetry */}
      <div className="w-full flex justify-between items-center text-[10px] sm:text-xs text-slate-500 font-mono tracking-widest border-b border-white/5 pb-4">
        <span>SLATE APPARELS</span>
      </div>

      {/* Center Brand Monolith */}
      <div className="text-center my-auto flex flex-col items-center max-w-2xl">
        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[11px] font-mono tracking-widest text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          MANUFACTURING • WHOLESALE • EXPORT
        </div>

        <h1 className="text-4xl sm:text-7xl font-bold tracking-widest text-white uppercase mb-4 drop-shadow-2xl">
          SLATE APPARELS
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 tracking-ultra uppercase max-w-lg mb-10 font-mono">
          HIGH-PRECISION B2B APPAREL PRODUCTION FACILITY
        </p>

        {/* Progress Bar or Enter Button */}
        {!isReady ? (
          <div className="w-64 sm:w-80 flex flex-col items-center gap-3">
            <div className="w-full h-[2px] bg-slate-900 overflow-hidden relative">
              <div
                className="h-full bg-white transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="w-full flex justify-between text-[11px] font-mono text-slate-500">
              <span>LOADING 3D EXPERIENCE</span>
              <span className="text-white font-semibold">{progress}%</span>
            </div>
          </div>
        ) : (
          <button
            onClick={handleStart}
            className="group relative px-8 py-3.5 rounded-none border border-white/30 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 font-mono text-xs tracking-widest uppercase flex items-center gap-3 overflow-hidden shadow-2xl"
          >
            <span className="relative z-10 font-semibold tracking-ultra">ENTER FACTORY TOUR</span>
            <span className="relative z-10 text-base group-hover:translate-x-1 transition-transform">→</span>
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </button>
        )}

        {isReady && (
          <p className="mt-4 text-[11px] font-mono text-slate-500 tracking-widest animate-bounce">
            SCROLL DOWN TO ADVANCE CAMERA
          </p>
        )}
      </div>

      {/* Bottom Credentials Footer */}
      <div className="w-full flex justify-center items-center text-[10px] font-mono text-slate-600 border-t border-white/5 pt-4">
        <span>GST REGISTERED • IMPORT EXPORT CODE (IEC) • UDYAM</span>
      </div>
    </div>
  );
}
