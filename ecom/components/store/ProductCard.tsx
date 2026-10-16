'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products-data';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { Heart, ShoppingBag, Eye, Star, CheckCircle2 } from 'lucide-react';

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
      className="group relative bg-[#0b0f19] rounded-2xl border border-slate-800 hover:border-[#00ff87]/80 hover:shadow-neon-sm transition-all duration-300 flex flex-col justify-between overflow-hidden select-none h-full"
    >
      <div>
        {/* Visual Media Header: Strict uniform aspect-[4/5] container */}
        <div className="relative aspect-[4/5] w-full bg-slate-900 overflow-hidden">
          <Link href={`/product/${product.id}`} className="block w-full h-full relative">
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
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
            {product.stockCount === 0 ? (
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-mono font-extrabold uppercase tracking-widest bg-red-600 text-white shadow-md">
                SOLD OUT
              </span>
            ) : product.stockCount < 20 ? (
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-mono font-extrabold uppercase tracking-widest bg-amber-400 text-[#06080e] shadow-md animate-pulse">
                ONLY {product.stockCount} LEFT
              </span>
            ) : product.badge ? (
              <span
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-mono font-extrabold uppercase tracking-widest shadow-md ${
                  product.badge === 'BESTSELLER'
                    ? 'bg-[#00ff87] text-[#06080e]'
                    : product.badge === 'NEW DROP'
                    ? 'bg-[#00f0ff] text-[#06080e]'
                    : product.badge === 'HEAVYWEIGHT'
                    ? 'bg-[#faff00] text-[#06080e]'
                    : 'bg-white text-[#06080e]'
                }`}
              >
                {product.badge}
              </span>
            ) : null}
            {discountPercent > 0 && product.stockCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-mono font-bold bg-[#06080e]/90 text-slate-200 border border-slate-700 backdrop-blur-sm">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Top Right: Wishlist Heart & Quick View */}
          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex flex-col gap-1.5 z-10">
            <button
              onClick={handleToggleFavorite}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
                isFavorite
                  ? 'bg-red-500/20 text-red-400 border border-red-500 scale-110'
                  : 'bg-[#06080e]/80 backdrop-blur-sm text-slate-300 hover:text-white hover:bg-[#06080e] border border-slate-700'
              }`}
              title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
            </button>

            {onQuickView && (
              <button
                onClick={handleOpenQuickView}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#06080e]/80 backdrop-blur-sm text-slate-300 hover:text-white hover:bg-[#06080e] border border-slate-700 hidden sm:flex items-center justify-center transition-all shadow-md opacity-0 group-hover:opacity-100"
                title="Quick Look"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Bottom Hover Action: Quick Add To Bag Button (Desktop) */}
          <div className="hidden sm:block absolute bottom-3 inset-x-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleQuickAdd}
              disabled={product.stockCount === 0}
              className={`w-full py-2.5 rounded-xl font-mono text-[11px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                product.stockCount === 0
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] shadow-neon'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{product.stockCount === 0 ? 'SOLD OUT' : `QUICK ADD (${selectedSize})`}</span>
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="p-3 sm:p-5">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
            <span className="uppercase tracking-widest text-[#00ff87] font-bold">{product.category}</span>
            <div className="flex items-center gap-1 text-slate-300">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-slate-500">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link href={`/product/${product.id}`}>
            <h3 className="font-bold text-sm text-white group-hover:text-[#00ff87] transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Fabric Specification Snippet */}
          <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-sans">
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
                    ? 'ring-2 ring-[#00ff87] ring-offset-1 ring-offset-[#0b0f19] scale-110'
                    : 'border-slate-600 hover:scale-105'
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
                    ? 'bg-[#00ff87] text-[#06080e] border-[#00ff87] font-bold'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
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
      <div className="px-3 pb-3 sm:px-5 sm:pb-5 pt-2.5 sm:pt-3 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-baseline gap-1.5 sm:gap-2">
          <span className="text-sm sm:text-base font-extrabold font-mono text-white">
            {formatPrice(product.price)}
          </span>
          <span className="text-[10px] sm:text-xs font-mono text-slate-500 line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        </div>

        {/* Mobile Quick Add / Retail Delivery Indicator */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleQuickAdd}
            disabled={product.stockCount === 0}
            className="sm:hidden p-1.5 rounded-lg bg-[#00ff87] text-[#06080e] disabled:bg-slate-800 disabled:text-slate-500 shadow-neon-sm active:scale-95 transition-all"
            title={product.stockCount === 0 ? 'Sold Out' : 'Quick Add to Bag'}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-[#00ff87] font-semibold bg-[#00ff87]/10 px-2 py-0.5 rounded border border-[#00ff87]/20">
            <CheckCircle2 className="w-2.5 h-2.5 text-[#00ff87]" />
            RETAIL PIECE
          </span>
        </div>
      </div>
    </div>
  );
}
