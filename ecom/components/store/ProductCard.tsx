'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products-data';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { Heart, ShoppingBag, Eye, Star, Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [isHovered, setIsHovered] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-slate-400 hover:shadow-soft transition-all duration-300 flex flex-col justify-between overflow-hidden select-none"
    >
      <div>
        {/* Visual Media Header */}
        <div className="relative aspect-[3/4] w-full bg-slate-100 overflow-hidden">
          <Link href={`/product/${product.id}`} className="block w-full h-full">
            {/* Primary Image */}
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              unoptimized
              className={`object-cover object-center transition-all duration-700 ${
                isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
              }`}
            />

            {/* Secondary Image on Hover */}
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt={product.name}
                fill
                unoptimized
                className={`object-cover object-center absolute inset-0 transition-all duration-700 ${
                  isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                }`}
              />
            )}
          </Link>

          {/* Badges: Top Left */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
            {product.badge && (
              <span
                className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-extrabold uppercase tracking-widest shadow-sm border ${
                  product.badge === 'BESTSELLER'
                    ? 'bg-[#05f26c] text-[#0b0f19] border-[#05f26c]'
                    : product.badge === 'NEW DROP'
                    ? 'bg-[#00f0ff] text-[#0b0f19] border-[#00f0ff]'
                    : product.badge === 'HEAVYWEIGHT'
                    ? 'bg-[#0b0f19] text-white border-white/20'
                    : 'bg-[#b026ff] text-white border-[#b026ff]'
                }`}
              >
                {product.badge}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-white text-slate-900 border border-slate-200">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Top Right: Wishlist Heart & Quick View */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
            <button
              onClick={handleToggleFavorite}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
                isFavorite
                  ? 'bg-red-50 text-red-500 border border-red-200 scale-110'
                  : 'bg-white/90 backdrop-blur-sm text-slate-600 hover:text-slate-950 hover:bg-white'
              }`}
              title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
            </button>

            {onQuickView && (
              <button
                onClick={handleOpenQuickView}
                className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-slate-600 hover:text-slate-950 hover:bg-white flex items-center justify-center transition-all shadow-md opacity-0 group-hover:opacity-100"
                title="Quick Look"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Bottom Hover Action: Quick Add To Bag Pill */}
          <div className="absolute bottom-3 inset-x-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleQuickAdd}
              className="w-full py-2.5 rounded-xl bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>QUICK ADD ({selectedSize})</span>
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="p-4 sm:p-5">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1.5">
            <span className="uppercase tracking-widest">{product.category}</span>
            <div className="flex items-center gap-1 text-slate-700">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-slate-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link href={`/product/${product.id}`}>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#047857] transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Fabric Specification Snippet */}
          <p className="text-[11px] text-slate-500 line-clamp-1 mt-1 font-sans">
            {product.specifications.gsm || product.fabric}
          </p>

          {/* Color Swatch Dots */}
          <div className="flex items-center gap-1.5 mt-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedColor(color.name);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor === color.name
                    ? 'ring-2 ring-slate-900 ring-offset-1 scale-110'
                    : 'border-slate-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="text-[10px] font-mono text-slate-400 ml-1">
              {product.colors.length} shades
            </span>
          </div>

          {/* Sizes Row */}
          <div className="flex items-center gap-1 mt-2.5 overflow-x-auto pb-0.5">
            {product.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSize(size);
                }}
                className={`px-1.5 py-0.5 text-[9px] font-mono rounded border transition-colors ${
                  selectedSize === size
                    ? 'bg-slate-900 text-white border-slate-900 font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {size}
              </button>
            ))}
            {product.sizes.length > 5 && (
              <span className="text-[9px] font-mono text-slate-400">+{product.sizes.length - 5}</span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Price Row */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-base font-extrabold font-mono text-slate-900">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs font-mono text-slate-400 line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        </div>

        {/* Bulk Wholesale Indicator */}
        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#047857] font-semibold bg-[#05f26c]/10 px-2 py-0.5 rounded">
          <Zap className="w-2.5 h-2.5 text-[#047857]" />
          TIER DISCOUNTS
        </span>
      </div>
    </div>
  );
}
