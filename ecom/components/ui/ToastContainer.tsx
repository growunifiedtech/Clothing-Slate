'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { CheckCircle2, Zap } from 'lucide-react';

export default function ToastContainer() {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0b0f19] text-white text-xs font-mono font-bold shadow-2xl border border-[#05f26c]/50">
        <span className="w-2 h-2 rounded-full bg-[#05f26c] animate-pulse" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
