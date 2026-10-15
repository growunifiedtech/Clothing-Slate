'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Layers, Truck } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50 to-white pt-8 pb-16 sm:pb-24 border-b border-slate-200 select-none">
      {/* Background Subtle Grid & Neon Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute -top-40 right-1/4 w-96 h-96 bg-[#05f26c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Editorial Typography (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Drop Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#05f26c] shadow-neon-sm animate-pulse" />
              <span className="font-bold text-slate-900 uppercase">AUTUMN/WINTER &apos;26 DROPS LIVE</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">240–450 GSM HEAVYWEIGHT</span>
            </div>

            {/* Massive Heading */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-950 uppercase font-sans leading-[1.08]">
              ENGINEERED FOR <br />
              <span className="relative inline-block text-slate-950">
                MODERN BRANDS.
                <span className="absolute left-0 bottom-1 w-full h-3 bg-[#05f26c]/30 -z-10 -rotate-1" />
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Heavy-density combed cotton fleece, selvedge denim, selvedge thermal tracksuits, and luxury knitwear crafted in New Delhi. Direct single-piece dispatch & volume wholesale tiers.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-lifted"
              >
                <span>EXPLORE ALL DROPS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white border border-slate-200 text-slate-800 hover:border-slate-900 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>CUSTOMER DASHBOARD</span>
              </Link>

              <Link
                href="/admin"
                className="w-full sm:w-auto px-5 py-4 rounded-xl bg-[#05f26c]/15 border border-[#05f26c]/40 text-[#047857] hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4" />
                <span>ADMIN CONSOLE</span>
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-slate-900">
                  50,000+
                </div>
                <div className="text-[11px] font-mono text-slate-500 uppercase">MONTHLY PIECES</div>
              </div>
              <div className="border-l border-slate-200 pl-4">
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-slate-900">
                  380 GSM
                </div>
                <div className="text-[11px] font-mono text-slate-500 uppercase">CUSTOM FLEECE</div>
              </div>
              <div className="border-l border-slate-200 pl-4">
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-[#047857] flex items-center gap-1">
                  <span>48H</span>
                  <Truck className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-mono text-slate-500 uppercase">EXPRESS DISPATCH</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Product Montage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Card */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-2xl">
                <Image
                  src="/images/products/oversized-hoodies-1.jpg"
                  alt="Slate Heavy Fleece Oversized Hoodie"
                  fill
                  unoptimized
                  priority
                  className="object-cover object-center"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Float Pill */}
                <div className="absolute bottom-5 inset-x-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#047857] uppercase block">
                      FEATURED DROP // 380 GSM
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 uppercase font-mono">
                      OVERSIZED PULLOVER HOODIE
                    </h4>
                    <span className="text-xs font-mono font-extrabold text-slate-900">
                      ₹1,499 <span className="line-through text-slate-400 font-normal">₹2,499</span>
                    </span>
                  </div>

                  <Link
                    href="/product/oversized-hoodies"
                    className="p-3 rounded-xl bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] transition-all shadow-md"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Floating Second Card (Denim Selvedge Badge) */}
              <div className="hidden sm:flex absolute -bottom-6 -left-8 p-3 rounded-2xl bg-white border border-slate-200 shadow-xl items-center gap-3">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <Image
                    src="/images/products/denim-jackets-1.jpg"
                    alt="Denim Selvedge"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="pr-2">
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block">13.5 OZ RIGID</span>
                  <div className="text-xs font-mono font-bold text-slate-900">SELVEDGE TRUCKER</div>
                  <span className="text-[10px] font-mono text-[#047857] font-semibold">Ready to Ship</span>
                </div>
              </div>

              {/* Top Floating Badge */}
              <div className="absolute -top-4 -right-4 px-3.5 py-1.5 rounded-full bg-[#05f26c] text-[#0b0f19] border border-white font-mono text-xs font-extrabold tracking-wider shadow-neon">
                ★ 100% COMBED COTTON
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
