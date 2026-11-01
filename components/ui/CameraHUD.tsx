'use client';

import React from 'react';
import { FACTORY_STAGES } from '@/lib/constants';

interface CameraHUDProps {
  scrollProgress: number; // 0 to 1
  activeStageIndex: number;
}

export default function CameraHUD({ scrollProgress, activeStageIndex }: CameraHUDProps) {
  const currentStage = FACTORY_STAGES[Math.min(activeStageIndex, FACTORY_STAGES.length - 1)];

  // Active tour stage label
  const tourStages = [
    'RAW MATERIAL',
    'STITCHING (50K PCS)',
    'QUALITY & PACKAGING',
  ];

  // Camera depth coordinates calculation
  const depthZ = Math.round((14 - scrollProgress * 164) * 10) / 10;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-8 select-none">
      {/* Top Left HUD Telemetry */}
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-slate-300 uppercase">
              LIVE TOUR // {currentStage?.zoneCode || 'ZONE 01'}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[9px] font-mono text-slate-500 tracking-wider">
            <span>DEPTH: {depthZ}m</span>
            <span>•</span>
            <span>CAPACITY: 50,000 PCS/MO</span>
            <span>•</span>
            <span>STATUS: NOMINAL</span>
          </div>
        </div>

        {/* Top Right Stage Numeric Indicator */}
        <div className="flex flex-col items-end">
          <span className="text-xl sm:text-2xl font-bold font-mono text-white tracking-widest">
            {String(Math.min(activeStageIndex + 1, 3)).padStart(2, '0')}{' '}
            <span className="text-xs text-slate-600">/ 03</span>
          </span>
          <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
            {tourStages[Math.min(activeStageIndex, tourStages.length - 1)]}
          </span>
        </div>
      </div>

      {/* Center Left Factory Tour Milestone Tracker (Desktop Only) */}
      <div className="hidden lg:flex flex-col gap-2.5 my-auto max-w-[180px]">
        <span className="text-[8px] font-mono tracking-ultra text-slate-600 uppercase mb-1">
          MANUFACTURING PIPELINE
        </span>
        {tourStages.map((stageName, idx) => {
          const isActive = idx === activeStageIndex;
          const isPassed = idx < activeStageIndex;
          return (
            <div key={idx} className="flex items-center gap-2 group">
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-white scale-125'
                    : isPassed
                    ? 'bg-slate-600'
                    : 'bg-white/10'
                }`}
              />
              <span
                className={`text-[9px] font-mono tracking-widest uppercase transition-colors duration-300 ${
                  isActive
                    ? 'text-white font-semibold'
                    : isPassed
                    ? 'text-slate-500'
                    : 'text-slate-700'
                }`}
              >
                {String(idx + 1).padStart(2, '0')} {stageName}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom HUD Bar */}
      <div className="w-full flex items-center justify-between text-[9px] font-mono text-slate-500 border-t border-white/5 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-slate-400 rounded-sm" />
          <span className="tracking-widest">SLATE APPARELS</span>
        </div>

        {/* Linear Progress Indicator */}
        <div className="w-32 sm:w-64 h-[2px] bg-white/10 relative overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-75"
            style={{ width: `${Math.min(scrollProgress * 100, 100)}%` }}
          />
        </div>

        <div className="hidden sm:block tracking-widest">
          {Math.round(scrollProgress * 100)}% COMPLETE
        </div>
      </div>
    </div>
  );
}
