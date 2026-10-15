'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
  {
    name: 'HOODIES',
    tagline: '320–380 GSM Brushed Heavyweight Fleece',
    image: '/images/products/oversized-hoodies-1.jpg',
    href: '/shop?category=HOODIES',
    itemCount: '4 Styles',
    badge: 'HOT',
  },
  {
    name: 'JACKETS',
    tagline: 'Down Puffers, Varsity Bombers & Selvedge Denim',
    image: '/images/products/puffer-jackets-1.jpg',
    href: '/shop?category=JACKETS',
    itemCount: '4 Styles',
    badge: 'WINTER',
  },
  {
    name: 'T-SHIRTS',
    tagline: '240 GSM Drop Shoulder & Enzymatic Biowash',
    image: '/images/products/oversized-t-shirt-drop-shoulder-1.jpg',
    href: '/shop?category=T-SHIRTS',
    itemCount: '2 Styles',
    badge: 'ESSENTIAL',
  },
  {
    name: 'TRACKSUITS',
    tagline: 'OmniHeat Thermal & Heavy Fleece Sets',
    image: '/images/products/omniheat-tracksuits-1.jpg',
    href: '/shop?category=TRACKSUITS',
    itemCount: '2 Styles',
    badge: 'SET',
  },
  {
    name: 'TRACKPANTS',
    tagline: 'Architectural Balloon Cut & Cargo Joggers',
    image: '/images/products/balloon-fit-trackpants-1.jpg',
    href: '/shop?category=TRACKPANTS',
    itemCount: '3 Styles',
  },
  {
    name: 'SWEATERS',
    tagline: '7-Gauge Computerized Jacquard Knits',
    image: '/images/products/sweaters-1.jpg',
    href: '/shop?category=SWEATERS',
    itemCount: '1 Style',
  },
  {
    name: 'POLOS',
    tagline: '240 GSM Honeycomb Pique Cotton',
    image: '/images/products/polo-tshirt-1.jpg',
    href: '/shop?category=POLOS',
    itemCount: '1 Style',
  },
  {
    name: 'BEANIES',
    tagline: '4-Dart Ribbed Fisherman Cuffed Beanies',
    image: '/images/products/beanies-1.jpg',
    href: '/shop?category=BEANIES',
    itemCount: '1 Style',
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 sm:py-24 bg-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-mono font-bold tracking-widest text-slate-700 uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#05f26c]" />
              CURATED SILHOUETTES
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 uppercase font-sans tracking-tight">
              SHOP BY CATEGORY
            </h2>
          </div>

          <Link
            href="/shop"
            className="text-xs font-mono font-bold text-slate-900 hover:text-[#047857] flex items-center gap-1.5 uppercase transition-colors"
          >
            <span>VIEW ALL 18 STYLES</span>
            <ArrowUpRight className="w-4 h-4 text-[#05f26c]" />
          </Link>
        </div>

        {/* Categories Grid (4 across on large) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 hover:border-slate-400 hover:shadow-soft transition-all duration-300 aspect-[3/4] flex flex-col justify-end p-4 sm:p-5"
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                unoptimized
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all" />

              {/* Top Badge */}
              {cat.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#05f26c] text-[#0b0f19]">
                    {cat.badge}
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="relative z-10">
                <div className="text-[10px] font-mono text-slate-300 tracking-wider uppercase mb-1">
                  {cat.itemCount}
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-mono text-white tracking-wide uppercase flex items-center justify-between">
                  <span>{cat.name}</span>
                  <span className="text-[#05f26c] opacity-0 group-hover:opacity-100 transition-opacity">
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
