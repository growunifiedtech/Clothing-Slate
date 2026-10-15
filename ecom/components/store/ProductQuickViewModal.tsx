'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products-data';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { X, ShoppingBag, Star, ShieldCheck, ArrowRight, Zap, Check } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery (Half width) */}
        <div className="w-full md:w-1/2 p-6 bg-slate-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-200 shadow-sm">
            <Image
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              fill
              unoptimized
              className="object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold bg-[#05f26c] text-[#0b0f19] shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImageIdx === idx ? 'border-slate-900 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
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
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
              <span className="uppercase">{product.category} • {product.season}</span>
              <div className="flex items-center gap-1 text-slate-800">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-slate-400">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 uppercase font-sans mb-3">
              {product.name}
            </h2>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-extrabold font-mono text-slate-900">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm font-mono text-slate-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
              <span className="text-xs font-mono font-bold text-[#047857] bg-[#05f26c]/15 px-2 py-0.5 rounded">
                Save {discountPercent}%
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed mb-6 font-sans">
              {product.description}
            </p>

            {/* Color Swatch Selection */}
            <div className="mb-4">
              <div className="text-xs font-mono font-bold uppercase text-slate-700 mb-2 flex justify-between">
                <span>Color: {selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-2 transition-all ${
                      selectedColor === c.name
                        ? 'border-slate-900 bg-slate-900 text-white font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
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
              <div className="text-xs font-mono font-bold uppercase text-slate-700 mb-2 flex justify-between">
                <span>Select Size</span>
                <span className="text-slate-400 font-normal">True to fit</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 rounded-lg border text-xs font-mono font-bold transition-all ${
                      selectedSize === s
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Bulk Volume Tier Pricing Table */}
            <div className="mb-6 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-900 uppercase mb-2">
                <Zap className="w-3.5 h-3.5 text-[#047857]" />
                B2B Volume Tier Pricing
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono">
                {product.bulkTiers.map((tier) => (
                  <div
                    key={tier.minQty}
                    className="p-2 rounded-lg bg-white border border-slate-200"
                  >
                    <div className="text-slate-500">{tier.minQty}+ Units</div>
                    <div className="font-bold text-slate-900">{formatPrice(tier.pricePerUnit)}/ea</div>
                    <div className="text-[10px] text-[#047857]">-{tier.discountPercentage}% OFF</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <div className="flex gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-slate-200 rounded-xl px-2 bg-slate-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-2 text-slate-500 hover:text-slate-900"
                >
                  -
                </button>
                <span className="px-3 font-mono font-bold text-xs">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-2 text-slate-500 hover:text-slate-900"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAdd}
                className="flex-1 py-3 rounded-xl bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO BAG ({formatPrice(product.price * quantity)})</span>
              </button>
            </div>

            <Link
              href={`/product/${product.id}`}
              onClick={onClose}
              className="block text-center text-xs font-mono text-slate-500 hover:text-slate-900 pt-1"
            >
              View Full Product Details & Technical Specs →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
