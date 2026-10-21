'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products-data';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { X, ShoppingBag, Star, ShieldCheck, ArrowRight, Truck, Check } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

const getCategoryColor = (cat?: string) => {
  switch (cat?.toUpperCase()) {
    case 'HOODIES': return 'text-[#ff007f]';
    case 'JACKETS': return 'text-[#00f0ff]';
    case 'T-SHIRTS': return 'text-[#00ff87]';
    case 'TRACKSUITS': return 'text-[#b026ff]';
    case 'TRACKPANTS': return 'text-[#00bfff]';
    case 'SWEATERS': return 'text-[#ff6b00]';
    case 'POLOS': return 'text-[#faff00]';
    case 'BEANIES': return 'text-[#ff1493]';
    default: return 'text-[#00ff87]';
  }
};

export default function ProductQuickViewModal({ product, onClose }: ProductQuickViewModalProps) {
  const { addToCart } = useStore();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  const discountPercent = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-[#0b0f19] rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery (Half width) */}
        <div className="w-full md:w-1/2 p-6 bg-[#06080e] flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-sm">
            <Image
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              fill
              unoptimized
              className="object-cover object-center"
            />
            {product.badge && (
              <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-mono font-extrabold uppercase shadow-md ${
                product.badge === 'BESTSELLER'
                  ? 'bg-[#00ff87] text-[#06080e] shadow-neon-sm'
                  : product.badge === 'NEW DROP'
                  ? 'bg-[#00f0ff] text-[#06080e] shadow-neon-cyan-sm'
                  : product.badge === 'HOT SELLER'
                  ? 'bg-[#ff007f] text-white shadow-neon-pink-sm'
                  : product.badge === 'HEAVYWEIGHT'
                  ? 'bg-[#faff00] text-[#06080e] shadow-neon-yellow'
                  : 'bg-[#b026ff] text-white shadow-neon-purple-sm'
              }`}>
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-14 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImageIdx === idx ? 'border-[#00f0ff] scale-105 shadow-neon-cyan-sm' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill unoptimized className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Specs & Actions (Half width) */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className={`uppercase font-extrabold ${getCategoryColor(product.category)}`}>
                {product.category} • {product.season}
              </span>
              <div className="flex items-center gap-1 text-slate-300">
                <Star className="w-3.5 h-3.5 fill-[#faff00] text-[#faff00]" />
                <span className="font-bold text-white">{product.rating}</span>
                <span className="text-slate-500">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white uppercase font-sans mb-3">
              {product.name}
            </h2>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-extrabold font-mono text-white">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm font-mono text-slate-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
              <span className="text-xs font-mono font-extrabold text-[#ff007f] bg-[#ff007f]/20 border border-[#ff007f]/40 px-2 py-0.5 rounded shadow-neon-pink-sm">
                Save {discountPercent}%
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed mb-6 font-sans">
              {product.description}
            </p>

            {/* Color Swatch Selection */}
            <div className="mb-4">
              <div className="text-xs font-mono font-bold uppercase text-slate-300 mb-2 flex justify-between">
                <span>Colorway: <strong className="text-white">{selectedColor}</strong></span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-2 transition-all ${
                      selectedColor === c.name
                        ? 'border-[#00f0ff] bg-[#00f0ff]/15 text-[#00f0ff] font-bold shadow-neon-cyan-sm'
                        : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-white/40"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="text-xs font-mono font-bold uppercase text-slate-300 mb-2 flex justify-between">
                <span>Select Size</span>
                <span className="text-slate-400 font-normal">True to Indian Standard Size</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 rounded-lg border text-xs font-mono font-bold transition-all ${
                      selectedSize === s
                        ? 'border-[#00f0ff] bg-[#00f0ff] text-[#06080e] shadow-neon-cyan-sm'
                        : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Retail Perks Callout */}
            <div className="mb-6 p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#00f0ff] uppercase">
                <Truck className="w-3.5 h-3.5 text-[#00f0ff]" />
                FREE EXPRESS HOME DELIVERY OVER ₹999
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                7-day easy size exchange guarantee • BlueDart air courier express dispatch from Okhla, New Delhi.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="flex gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-slate-700 rounded-xl px-2 bg-slate-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-2 text-slate-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-3 font-mono font-bold text-xs text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-2 text-slate-400 hover:text-white"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#00ff87] to-[#00f0ff] hover:from-[#00f0ff] hover:to-[#ff007f] text-[#06080e] hover:text-white font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-neon hover:shadow-neon-pink"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO BAG ({formatPrice(product.price * quantity)})</span>
              </button>
            </div>

            <Link
              href={`/product/${product.id}`}
              onClick={onClose}
              className="block text-center text-xs font-mono text-slate-400 hover:text-[#00f0ff] pt-1"
            >
              View Full Product Details & Technical Specs →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
