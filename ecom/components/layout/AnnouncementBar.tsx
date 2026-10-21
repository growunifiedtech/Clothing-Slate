'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Phone } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#06080e] text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#ff007f]/20 via-[#b026ff]/20 to-[#00f0ff]/20 text-[#ff007f] font-mono text-[10px] font-bold border border-[#ff007f]/40 shadow-neon-pink-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff007f] animate-pulse" />
            SLATE RETAIL DROP
          </span>
          <span className="hidden sm:inline font-mono text-[11px] text-slate-300">
            ⚡ FREE EXPRESS HOME DELIVERY OVER ₹999 • CODE <strong className="text-[#faff00] bg-[#faff00]/10 px-1.5 py-0.5 rounded border border-[#faff00]/30 font-bold">NEON10</strong> (10% OFF)
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
          <a
            href="https://wa.me/919599084873"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 hover:text-[#00ff87] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#00ff87]" />
            <span className="text-slate-300 hover:text-[#00ff87]">+91 9599084873</span>
          </a>
          <span className="hidden md:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span className="text-[#00f0ff]">GST & IEC VERIFIED</span>
          </span>
          <Link
            href="/admin"
            className="text-[10px] uppercase font-bold text-slate-400 hover:text-[#ff007f] transition-colors border-l border-slate-800 pl-3"
          >
            ADMIN CONSOLE →
          </Link>
        </div>
      </div>
    </div>
  );
}
