'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const CATEGORIES = [
  {
    name: 'HOODIES',
    tagline: '320–380 GSM Brushed Heavyweight Fleece',
    image: '/images/products/oversized-hoodies-1.jpg',
    href: '/shop?category=HOODIES',
    itemCount: '4 Styles',
    badge: 'HOT DROP',
    badgeColor: 'bg-[#00ff87] text-[#06080e]',
  },
  {
    name: 'JACKETS',
    tagline: 'Down Puffers, Selvedge Denim & Varsity Bombers',
    image: '/images/products/puffer-jackets-1.jpg',
    href: '/shop?category=JACKETS',
    itemCount: '4 Styles',
    badge: 'WINTER',
    badgeColor: 'bg-[#00f0ff] text-[#06080e]',
  },
  {
    name: 'T-SHIRTS',
    tagline: '240 GSM Drop Shoulder Heavy Cotton Tees',
    image: '/images/products/oversized-t-shirt-drop-shoulder-1.jpg',
    href: '/shop?category=T-SHIRTS',
    itemCount: '2 Styles',
    badge: 'ESSENTIAL',
    badgeColor: 'bg-[#faff00] text-[#06080e]',
  },
  {
    name: 'TRACKSUITS',
    tagline: 'OmniHeat Thermal & Heavy Fleece Sets',
    image: '/images/products/omniheat-tracksuits-1.jpg',
    href: '/shop?category=TRACKSUITS',
    itemCount: '2 Styles',
    badge: 'FULL SET',
    badgeColor: 'bg-[#00ff87] text-[#06080e]',
  },
  {
    name: 'TRACKPANTS',
    tagline: 'Architectural Balloon Fit & Relaxed Joggers',
    image: '/images/products/balloon-fit-trackpants-1.jpg',
    href: '/shop?category=TRACKPANTS',
    itemCount: '3 Styles',
    badge: 'STREETWEAR',
    badgeColor: 'bg-[#00f0ff] text-[#06080e]',
  },
  {
    name: 'SWEATERS',
    tagline: '7-Gauge Jacquard Computerized Knits',
    image: '/images/products/sweaters-1.jpg',
    href: '/shop?category=SWEATERS',
    itemCount: '1 Style',
    badge: 'PREMIUM',
    badgeColor: 'bg-white text-[#06080e]',
  },
  {
    name: 'POLOS',
    tagline: '240 GSM Honeycomb Pique Cotton',
    image: '/images/products/polo-tshirt-1.jpg',
    href: '/shop?category=POLOS',
    itemCount: '1 Style',
    badge: 'CLASSIC',
    badgeColor: 'bg-[#faff00] text-[#06080e]',
  },
  {
    name: 'BEANIES',
    tagline: '4-Dart Ribbed Fisherman Cuffed Beanies',
    image: '/images/products/beanies-1.jpg',
    href: '/shop?category=BEANIES',
    itemCount: '1 Style',
    badge: 'ACCESSORY',
    badgeColor: 'bg-[#00ff87] text-[#06080e]',
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 sm:py-24 bg-[#090d16] border-b border-slate-800 select-none relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#00ff87]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#00f0ff]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-mono font-bold tracking-widest text-[#00ff87] uppercase mb-2 shadow-neon-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
              CURATED RETAIL SILHOUETTES
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase font-sans tracking-tight">
              SHOP BY CATEGORY
            </h2>
          </div>

          <Link
            href="/shop"
            className="text-xs font-mono font-bold text-slate-300 hover:text-[#00ff87] flex items-center gap-1.5 uppercase transition-colors"
          >
            <span>VIEW ALL 18 STYLES</span>
            <ArrowUpRight className="w-4 h-4 text-[#00ff87]" />
          </Link>
        </div>

        {/* Categories Grid (4 across on desktop, aspect-[3/4] perfectly aligned) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-[#00ff87]/80 hover:shadow-neon-sm transition-all duration-300 aspect-[3/4] flex flex-col justify-end p-4 sm:p-5"
            >
              {/* Background Product Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                unoptimized
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Scrim for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-[#06080e]/40 to-transparent group-hover:from-[#06080e]/95 transition-all" />

              {/* Top Badge */}
              {cat.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${cat.badgeColor}`}>
                    {cat.badge}
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="relative z-10">
                <div className="text-[10px] font-mono text-slate-400 tracking-wider uppercase mb-1">
                  {cat.itemCount}
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-mono text-white tracking-wide uppercase flex items-center justify-between">
                  <span>{cat.name}</span>
                  <span className="text-[#00ff87] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </h3>
                <p className="text-[11px] text-slate-300 font-sans line-clamp-1 mt-1 opacity-90">
                  {cat.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
