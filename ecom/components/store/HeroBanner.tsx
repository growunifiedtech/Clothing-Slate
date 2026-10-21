'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Truck, CheckCircle2 } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#06080e] via-[#090d16] to-[#0d1320] text-slate-100 pt-8 pb-16 sm:pb-24 border-b border-slate-800 select-none">
      {/* Background Multi-Neon Cyber Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#ff007f]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-[#00ff87]/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#b026ff]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Retail Editorial Info (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-neon-pink-sm text-xs font-mono backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#ff007f] shadow-neon-pink animate-pulse" />
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] via-[#b026ff] to-[#00f0ff] uppercase tracking-wider">
                WHERE IDEAS BECOME APPAREL
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-[#00ff87] font-bold text-[10px] uppercase tracking-wider">NEW DELHI RETAIL</span>
            </div>

            {/* Massive Heading */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white uppercase font-sans leading-[1.08]">
              PURE COTTON. <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f0ff] to-[#ff007f]">
                PRECISION FIT.
                <span className="absolute left-0 bottom-1 w-full h-3 bg-gradient-to-r from-[#00f0ff]/30 via-[#b026ff]/30 to-[#ff007f]/30 -z-10 -rotate-1 shadow-neon-cyan-sm" />
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed font-sans">
              Heavyweight 340–420 GSM fleece hoodies, drop shoulder t-shirts, selvedge denim jackets, and tailored joggers crafted in New Delhi. Direct retail purchasing with free express home delivery across India.
            </p>

            {/* Action CTAs with Multi-Neon Styling */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#00ff87] to-[#00f0ff] text-[#06080e] hover:from-[#00f0ff] hover:to-[#ff007f] hover:text-white font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-neon hover:shadow-neon-pink"
              >
                <span>SHOP RETAIL DROPS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/shop?category=HOODIES"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-[#ff007f]/10 border border-[#ff007f]/40 hover:border-[#ff007f] text-slate-200 hover:text-[#ff007f] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-neon-pink-sm"
              >
                <span>WINTER HOODIES</span>
              </Link>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-5 py-4 rounded-xl bg-slate-900/90 hover:bg-[#00f0ff]/10 border border-slate-700 hover:border-[#00f0ff] text-slate-300 hover:text-[#00f0ff] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-neon-cyan-sm"
              >
                <span>TRACK ORDER</span>
              </Link>
            </div>

            {/* 3 Retail Highlights */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-[#00f0ff]">
                  ₹599+
                </div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">RETAIL PRICING</div>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-[#00ff87] flex items-center gap-1">
                  <span>FREE</span>
                  <Truck className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">ON ORDERS ₹999+</div>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-[#ff007f] flex items-center gap-1">
                  <span>7 DAYS</span>
                  <CheckCircle2 className="w-4 h-4 text-[#ff007f]" />
                </div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">EASY EXCHANGE</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Product Montage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Card */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-slate-900 border-2 border-slate-700/90 hover:border-[#ff007f]/50 transition-all shadow-2xl">
                <Image
                  src="/images/products/oversized-hoodies-2.jpg"
                  alt="Slate Oversized Hoodies"
                  fill
                  unoptimized
                  priority
                  className="object-cover object-center"
                />

                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080e]/90 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Retail Price Pill */}
                <div className="absolute bottom-5 inset-x-5 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#ff007f] uppercase block">
                      FEATURED RETAIL DROP
                    </span>
                    <h4 className="text-sm font-bold text-white uppercase font-mono">
                      OVERSIZED HOODIES
                    </h4>
                    <span className="text-xs font-mono font-extrabold text-[#00ff87]">
                      ₹1,499 <span className="line-through text-slate-500 font-normal ml-1">₹2,299</span>
                    </span>
                  </div>

                  <Link
                    href="/product/oversized-hoodies"
                    className="p-3 rounded-xl bg-gradient-to-r from-[#00ff87] to-[#00f0ff] hover:from-[#ff007f] hover:to-[#b026ff] text-[#06080e] hover:text-white transition-all shadow-neon-sm hover:shadow-neon-pink"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Floating Second Card (Selvedge Denim Jacket) */}
              <div className="hidden sm:flex absolute -bottom-6 -left-8 p-3 rounded-2xl bg-[#0d1320] border border-[#00f0ff]/30 shadow-2xl items-center gap-3">
                <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 border border-slate-700">
                  <Image
                    src="/images/products/denim-jackets-1.jpg"
                    alt="Slate Denim Jackets"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="pr-3">
                  <span className="text-[9px] font-mono font-bold text-[#00f0ff] uppercase block">14 OZ RIGID DENIM</span>
                  <div className="text-xs font-mono font-bold text-white">DENIM JACKETS</div>
                  <span className="text-[11px] font-mono text-[#00ff87] font-bold">₹1,699</span>
                </div>
              </div>

              {/* Top Floating Badge */}
              <div className="absolute -top-4 -right-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#ff007f] via-[#b026ff] to-[#00f0ff] text-white font-mono text-xs font-black tracking-wider shadow-neon-pink">
                ★ 100% COMBED COTTON
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
