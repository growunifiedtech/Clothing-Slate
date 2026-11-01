'use client';

import React from 'react';
import { Tag, Sparkles, Box, Scissors, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

interface PrivateLabelSectionProps {
  onStartCustomCollection: () => void;
}

export default function PrivateLabelSection({ onStartCustomCollection }: PrivateLabelSectionProps) {
  const features = [
    {
      icon: Tag,
      title: 'CUSTOM WOVEN LABELS',
      desc: 'High-density 50-denier damask woven neck labels with heat-sealed ultrasonic cut edges that eliminate neck irritation.'
    },
    {
      icon: Scissors,
      title: 'BESPOKE SILHOUETTES',
      desc: 'Custom cut-and-sew pattern grading, tech pack translation, and proprietary fit development for luxury fashion brands.'
    },
    {
      icon: Sparkles,
      title: 'PRECISION EMBROIDERY & PRINT',
      desc: 'Screen printing, high-density 3D puff, chenille patch applique, vintage mineral washing, and laser distressing.'
    },
    {
      icon: Box,
      title: 'RETAIL-READY PACKAGING',
      desc: 'Custom matte frosted ziplock polybags, foil-stamped hangtags with waxed safety cords, and branded shipping mailers.'
    },
    {
      icon: Layers,
      title: 'FLEXIBLE LINE CAPACITY',
      desc: 'Low-barrier sampling followed by seamless ramp-up to bulk production runs scaling up to 50,000 units per month.'
    },
    {
      icon: CheckCircle2,
      title: 'EXPORT-GRADE QUALITY',
      desc: 'Strict 4-tier inspection audits, shrinkage control, and color-fastness testing compliant with domestic and international standards.'
    }
  ];

  return (
    <section id="private-label" className="relative z-20 bg-[#040507] text-[#f8fafc] py-28 sm:py-36 px-5 sm:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Brand Sequence */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            END-TO-END OEM & ODM PRIVATE LABELING
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-3xl sm:text-6xl font-bold tracking-tight text-white uppercase font-display mb-4">
            <span className="text-slate-500">YOUR BRAND.</span>
            <span className="text-slate-400">YOUR LABEL.</span>
            <span className="text-white">YOUR PRODUCT.</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-widest uppercase font-mono mt-2 mb-6">
            WE MANUFACTURE IT.
          </h3>

          <p className="text-slate-400 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed mb-8">
            From woven damask neck labels and debossed leather patches to custom garment cuts, we engineer full private-label apparel ready for global brand distribution.
          </p>

          <button
            onClick={onStartCustomCollection}
            className="px-8 py-4 border border-white bg-white text-black hover:bg-slate-200 font-mono text-xs tracking-widest uppercase font-bold inline-flex items-center gap-2 transition-all shadow-xl"
          >
            <span>BUILD YOUR COLLECTION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Core Private-Label Capability Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-[#07090e] border border-white/10 hover:border-white/30 transition-all group"
              >
                <div className="w-10 h-10 border border-white/20 bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black transition-colors">
                  <Icon className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </div>
                <h4 className="text-sm font-bold text-white tracking-widest uppercase font-mono mb-2">
                  {feat.title}
                </h4>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
