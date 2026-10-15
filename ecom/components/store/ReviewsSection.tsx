'use client';

import React from 'react';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Kabir Singhania',
    role: 'Founder, NEOM Streetwear (Bengaluru)',
    text: 'We ordered 300 units of the 380 GSM Oversized Hoodies for our winter launch. The cotton density, weight, and double-layered structured hood are unmatched in India. Sold out in 72 hours.',
    rating: 5,
    verified: true,
    product: 'Heavy Fleece Oversized Pullover Hoodie',
  },
  {
    name: 'Devika Mehra',
    role: 'Creative Director, VORTEX Apparel (Mumbai)',
    text: 'The 240 GSM drop shoulder t-shirts are hands down the finest streetwear blanks on the market. Zero shrinkage after commercial wash testing and the neck rib holds its shape completely.',
    rating: 5,
    verified: true,
    product: 'Oversized Heavyweight T-Shirt (Drop Shoulder)',
  },
  {
    name: 'Rohan Talwar',
    role: 'Wholesale Buyer (New Delhi)',
    text: 'Fast dispatch, reliable GST billing, and great communication on WhatsApp. Their OmniHeat tracksuits and balloon fit trackpants are moving very fast in our retail outlets.',
    rating: 5,
    verified: true,
    product: 'OmniHeat Thermal Reflective Tracksuit Set',
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-16 sm:py-24 bg-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-mono font-bold tracking-widest text-slate-700 uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#05f26c]" />
            TESTED & TRUSTED BY APPAREL BRANDS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 uppercase font-sans tracking-tight">
            VERIFIED INDUSTRY REVIEWS
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-sans">
            Hear from streetwear founders, retail buyers, and creative labels who produce with Slate.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-soft flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mb-6">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs font-mono uppercase text-slate-950">
                      {rev.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-mono">{rev.role}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#047857] bg-[#05f26c]/10 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3 text-[#047857]" />
                    VERIFIED
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-2 truncate">
                  Style: {rev.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
