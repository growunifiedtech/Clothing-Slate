'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Truck, CheckCircle2 } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#06080e] via-[#090d16] to-[#0d1320] text-slate-100 pt-8 pb-16 sm:pb-24 border-b border-slate-800 select-none">
      {/* Background Subtle Neon Cyber Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00ff87]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Retail Editorial Info (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 shadow-neon-sm text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00ff87] shadow-neon animate-pulse" />
              <span className="font-extrabold text-[#00ff87] uppercase tracking-wider">
                WHERE IDEAS BECOME APPAREL
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 font-bold">RETAIL STORE</span>
            </div>

            {/* Massive Heading */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white uppercase font-sans leading-[1.08]">
              PURE COTTON. <br />
              <span className="relative inline-block text-white">
                PRECISION FIT.
                <span className="absolute left-0 bottom-1 w-full h-3 bg-[#00ff87]/30 -z-10 -rotate-1 shadow-neon-sm" />
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed font-sans">
              Heavyweight 340–420 GSM fleece hoodies, drop shoulder t-shirts, selvedge denim jackets, and tailored joggers crafted in New Delhi. Direct retail purchasing with free express home delivery across India.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-neon"
              >
                <span>SHOP RETAIL DROPS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/shop?category=HOODIES"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <span>WINTER HOODIES</span>
              </Link>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-5 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-slate-700 text-slate-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <span>TRACK ORDER</span>
              </Link>
            </div>

            {/* 3 Retail Highlights */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-white">
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
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-white flex items-center gap-1">
                  <span>7 DAYS</span>
                  <CheckCircle2 className="w-4 h-4 text-[#00ff87]" />
                </div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">EASY EXCHANGE</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Product Montage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Card */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-slate-900 border-2 border-slate-700 shadow-2xl">
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
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#00ff87] uppercase block">
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
                    className="p-3 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] transition-all shadow-neon-sm"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Floating Second Card (Selvedge Denim Jacket) */}
              <div className="hidden sm:flex absolute -bottom-6 -left-8 p-3 rounded-2xl bg-[#0d1320] border border-slate-700 shadow-2xl items-center gap-3">
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
                  <span className="text-[9px] font-mono font-bold text-[#00ff87] uppercase block">14 OZ RIGID DENIM</span>
                  <div className="text-xs font-mono font-bold text-white">DENIM JACKETS</div>
                  <span className="text-[11px] font-mono text-slate-300 font-bold">₹1,699</span>
                </div>
              </div>

              {/* Top Floating Badge */}
              <div className="absolute -top-4 -right-4 px-4 py-1.5 rounded-full bg-[#00ff87] text-[#06080e] font-mono text-xs font-black tracking-wider shadow-neon">
                ★ 100% COMBED COTTON
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
