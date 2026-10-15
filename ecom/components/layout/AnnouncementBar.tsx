'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Truck, ShieldCheck } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#0b0f19] text-[#f8fafc] text-xs py-2 px-4 border-b border-white/10 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#05f26c]/15 text-[#05f26c] font-mono text-[10px] font-bold border border-[#05f26c]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#05f26c] animate-pulse" />
            AUTUMN/WINTER &apos;26 DROP
          </span>
          <span className="hidden sm:inline text-slate-300 font-mono text-[11px]">
            ⚡ FREE EXPRESS SHIPPING ON ALL ORDERS ABOVE ₹1,999 • USE CODE <strong className="text-white bg-white/10 px-1 py-0.5 rounded">NEON10</strong>
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
          <span className="hidden md:flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#05f26c]" />
            PAN-INDIA AIR FREIGHT
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00f0ff]" />
            GST & IEC CERTIFIED
          </span>
          <Link
            href="/admin"
            className="text-[10px] uppercase font-bold text-slate-300 hover:text-[#05f26c] transition-colors border-l border-white/20 pl-3"
          >
            ADMIN CONSOLE →
          </Link>
        </div>
      </div>
    </div>
  );
}
