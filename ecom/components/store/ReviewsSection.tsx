'use client';

import React from 'react';
import { Star, CheckCircle2, ThumbsUp } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Kabir Singhania',
    role: 'Verified Retail Buyer (Bengaluru)',
    text: 'Purchased the 380 GSM Oversized Hoodie in Onyx Black. The cotton weight, double-layered structured hood, and drop shoulder drape are better than imported luxury streetwear brands. True to size and super warm.',
    rating: 5,
    verified: true,
    product: 'Heavy Fleece Oversized Pullover Hoodie',
  },
  {
    name: 'Devika Mehra',
    role: 'Verified Retail Buyer (Mumbai)',
    text: 'Ordered two 240 GSM drop shoulder t-shirts. The enzymatic biowash makes the fabric incredibly soft against the skin, and zero shrinkage after multiple machine washes. Fast BlueDart air shipping!',
    rating: 5,
    verified: true,
    product: 'Oversized Heavyweight T-Shirt (Drop Shoulder)',
  },
  {
    name: 'Rohan Talwar',
    role: 'Verified Retail Buyer (New Delhi)',
    text: 'The OmniHeat reflective tracksuit is phenomenal for winter workouts and street styling. BlueDart tracking arrived on SMS within 4 hours of placing the order. Customer team on WhatsApp was also very helpful.',
    rating: 5,
    verified: true,
    product: 'OmniHeat Thermal Reflective Tracksuit Set',
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#090d16] border-b border-slate-800 select-none relative overflow-hidden">
      {/* Background cyber glow */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#00ff87]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-mono font-bold tracking-widest text-[#00ff87] uppercase mb-3 shadow-neon-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
            AUTHENTIC CUSTOMER TESTIMONIALS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase font-sans tracking-tight">
            VERIFIED RETAIL REVIEWS
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 font-sans">
            Hear from streetwear enthusiasts across India who wear Slate Apparels every day.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-[#0b0f19] border border-slate-800 hover:border-[#00ff87]/60 shadow-lg hover:shadow-neon-sm flex flex-col justify-between transition-all"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-6">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs font-mono uppercase text-white">
                      {rev.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono">{rev.role}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#00ff87] bg-[#00ff87]/10 border border-[#00ff87]/30 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3 text-[#00ff87]" />
                    VERIFIED BUYER
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-2 truncate">
                  Drop: {rev.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
