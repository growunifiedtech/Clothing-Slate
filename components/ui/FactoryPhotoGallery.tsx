'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';

interface PhotoItem {
  id: string;
  title: string;
  location: string;
  image: string;
  caption: string;
}

const FACTORY_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-2',
    title: 'FABRIC ROLL INVENTORY & QC',
    location: 'WAREHOUSE // RAW TEXTILE DOCK',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=75&fm=webp',
    caption: 'Curated organic cotton terry, fleece, and pique knits staged for inspection.',
  },
  {
    id: 'photo-4',
    title: 'QUALITY AUDIT & MEASUREMENT',
    location: 'ZONE 04 // INSPECTION BENCH',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=75&fm=webp',
    caption: 'Individual piece measurement audit verifying tolerance against client grade rules.',
  },
  {
    id: 'photo-5',
    title: 'STEAM FINISHING & PRESSING',
    location: 'ZONE 05 // FINISHING SECTION',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=75&fm=webp',
    caption: 'High-pressure vacuum steam finishing for crisp silhouette drape and presentation.',
  },
  {
    id: 'photo-6',
    title: 'BRAND PACKAGING & DISPATCH',
    location: 'ZONE 07 // EXPORT LOGISTICS',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=75&fm=webp',
    caption: 'Palletized master cartons labeled for nationwide freight and direct sea/air export.',
  },
];

export default function FactoryPhotoGallery() {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  return (
    <section id="factory" className="relative z-20 bg-[#040507] text-[#f8fafc] py-28 sm:py-36 px-5 sm:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              PHYSICAL MANUFACTURING REALITY
            </div>
            <h2 className="text-3xl sm:text-6xl font-bold tracking-tight text-white uppercase font-display">
              INSIDE SLATE
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl font-light">
              Actual production environments, quality inspection benches, and active assembly workflows at our New Delhi facility.
            </p>
          </div>
        </div>

        {/* Photography Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACTORY_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative aspect-[4/3] bg-[#090b10] border border-white/10 hover:border-white/40 overflow-hidden cursor-pointer transition-all duration-300"
            >
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
              />

              {/* Monochromatic Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-black/30 to-transparent pointer-events-none" />

              {/* Photo Meta */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono tracking-widest text-white/80 bg-black/70 px-2 py-0.5 border border-white/10">
                    {photo.location}
                  </span>
                  <div className="w-8 h-8 rounded-none border border-white/20 bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold font-mono tracking-widest text-white uppercase mb-1">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-light line-clamp-1">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#080a0f] border border-white/20 p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 border border-white/10 bg-black/40"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full mb-4 border border-white/10 bg-black">
              <Image
                src={activePhoto.image}
                alt={activePhoto.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/10 pt-4">
              <div>
                <span className="text-[9px] font-mono text-slate-400 tracking-widest block uppercase mb-0.5">
                  {activePhoto.location}
                </span>
                <h4 className="text-base font-bold font-mono text-white tracking-widest uppercase">
                  {activePhoto.title}
                </h4>
              </div>
              <p className="text-xs text-slate-400 font-light max-w-md">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
