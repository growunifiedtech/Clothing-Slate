'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { X, MessageSquare, ArrowRight, ShieldCheck, Box, Layers, RefreshCw } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onRequestQuote: (product: Product) => void;
  onOpenCustomizer: (product: Product) => void;
}

export default function ProductModal({
  product,
  onClose,
  onRequestQuote,
  onOpenCustomizer,
}: ProductModalProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors[0] || 'Jet Black'
  );

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in select-none">
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#07090e] border border-white/15 rounded-none shadow-2xl flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white bg-black/60 border border-white/10 hover:border-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Fast High-Res Visual Media */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 bg-[#040507]">
          {/* Header Status Bar */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 text-[10px] font-mono tracking-widest uppercase border border-white/10 bg-white/5 text-slate-300">
              PRODUCT GALLERY // 0{activeImageIdx + 1} OF {String(product.images.length).padStart(2, '0')}
            </span>

            <span className="text-[10px] font-mono text-slate-500 uppercase">
              {product.category}
            </span>
          </div>

          {/* Main Visual Display with unoptimized instant loading */}
          <div className="relative aspect-square w-full rounded-none overflow-hidden bg-black flex items-center justify-center">
            <Image
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              fill
              unoptimized
              priority
              className="object-cover object-center transition-all duration-300"
            />
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-16 h-16 border flex-shrink-0 transition-all ${
                    activeImageIdx === idx ? 'border-white scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill unoptimized className="object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Specifications & B2B Inquiry Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-[#07090e]">
          <div>
            {/* Header / Subcategory */}
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mb-1 tracking-widest uppercase">
              <span>{product.subcategory}</span>
              <span>•</span>
              <span>{product.season} SEASON</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-white uppercase font-display mb-3">
              {product.name}
            </h2>

            {/* Price & MOQ Banners */}
            <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/10 mb-6">
              <div>
                <div className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                  PRICE RANGE
                </div>
                <div className="text-lg font-bold font-mono text-white">
                  {product.price}
                </div>
              </div>
              <div className="w-[1px] h-8 bg-white/10 mx-2" />
              <div>
                <div className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                  MINIMUM ORDER QTY
                </div>
                <div className="text-xs font-mono text-slate-200 uppercase">
                  {product.moq}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Technical Specifications */}
            <div className="space-y-2 mb-6 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-500">FABRIC SPEC:</span>
                <span className="text-slate-200 text-right max-w-[240px]">{product.fabric}</span>
              </div>
              {product.specifications?.gsm && (
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-500">WEIGHT / GSM:</span>
                  <span className="text-slate-200">{product.specifications.gsm}</span>
                </div>
              )}
              {product.specifications?.fit && (
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-500">SILHOUETTE / FIT:</span>
                  <span className="text-slate-200">{product.specifications.fit}</span>
                </div>
              )}
            </div>

            {/* Monochromatic Color Selection */}
            <div className="mb-6">
              <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-2 flex justify-between">
                <span>AVAILABLE COLORWAYS:</span>
                <span className="text-white">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-2.5 py-1 text-[11px] font-mono tracking-wider border transition-all ${
                      selectedColor === c
                        ? 'border-white bg-white text-black font-semibold'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/30'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Available Sizes */}
            <div className="mb-6">
              <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-2">
                STANDARD SIZES ({product.sizes.length} SIZES)
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((s) => (
                  <span
                    key={s}
                    className="w-9 h-8 border border-white/15 bg-white/[0.02] flex items-center justify-center font-mono text-xs text-white"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onClose();
                onRequestQuote(product);
              }}
              className="w-full py-3 border border-white bg-white text-black hover:bg-slate-200 font-mono text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>REQUEST BULK QUOTE (WHATSAPP)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={`https://wa.me/919599084873?text=Hello%20Slate%20Apparels%2C%20I%20am%20interested%20in%20a%20bulk%20quote%20for%20${encodeURIComponent(
                  product.name
                )}.%20Please%20share%20MOQ%20and%20pricing.`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WHATSAPP</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onOpenCustomizer(product);
                }}
                className="py-2.5 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>CUSTOMIZE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
