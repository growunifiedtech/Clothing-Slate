'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { Product } from '@/lib/products-data';
import { formatPrice } from '@/lib/utils';
import ProductCard from '@/components/store/ProductCard';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  MessageSquare,
  ArrowRight,
  Zap,
  CheckCircle2,
  Ruler,
  Layers,
  X,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const { products, addToCart, toggleWishlist, isInWishlist } = useStore();

  const product = products.find((p) => p.id === productId) || products[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
  );

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    router.push('/checkout');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            HOME
          </Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-slate-900 transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate max-w-xs">{product.name}</span>
        </div>

        {/* 2-Column Product Detail Layout */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Gallery Media (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Viewport */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
              <Image
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                fill
                unoptimized
                priority
                className="object-cover object-center"
              />

              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#05f26c] text-[#0b0f19] shadow-neon-sm">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
                  isFavorite
                    ? 'bg-red-50 text-red-500 border border-red-200 scale-110'
                    : 'bg-white/90 text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImageIdx === idx
                        ? 'border-slate-900 scale-105 shadow-sm'
                        : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill unoptimized className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Factory Quality Notice */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs font-mono text-slate-600">
              <ShieldCheck className="w-5 h-5 text-[#047857] flex-shrink-0" />
              <span>
                Fabricated at Okhla Industrial Hub, New Delhi. Pre-shrunk & enzymatic washed for zero post-production shrinkage.
              </span>
            </div>
          </div>

          {/* Right Column: Specifications & Purchasing (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
                <span className="uppercase tracking-widest">{product.category} • {product.season}</span>
                <div className="flex items-center gap-1.5 text-slate-900">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-slate-400 font-mono">({product.reviewsCount} verified reviews)</span>
                </div>
              </div>

              {/* Title & SKU */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 uppercase font-sans tracking-tight mb-2">
                {product.name}
              </h1>
              <span className="text-[11px] font-mono text-slate-400 uppercase block mb-4">
                SKU: {product.sku} • {product.specifications.gsm || product.fabric}
              </span>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
                <span className="text-3xl font-mono font-extrabold text-slate-950">
                  {formatPrice(product.price)}
                </span>
                <span className="text-base font-mono text-slate-400 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#05f26c]/20 text-[#047857]">
                  SAVE {discountPercent}%
                </span>
                <span className="text-[11px] font-mono text-slate-500 ml-auto hidden sm:block">
                  Incl. 5% GST
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Swatch Selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs font-mono font-bold uppercase text-slate-800 mb-2.5">
                  <span>Colorway: <strong className="text-slate-950">{selectedColor}</strong></span>
                  <span className="text-slate-400 font-normal">{product.colors.length} shades available</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`px-3.5 py-2 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all ${
                        selectedColor === c.name
                          ? 'border-slate-950 bg-slate-950 text-white font-bold shadow-sm'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-white/50"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector with Size Guide Trigger */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs font-mono font-bold uppercase text-slate-800 mb-2.5">
                  <span>Select Size</span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-[#047857] hover:underline flex items-center gap-1 font-bold"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>SIZE GUIDE</span>
                  </button>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2.5 rounded-xl border text-xs font-mono font-bold uppercase transition-all ${
                        selectedSize === s
                          ? 'border-slate-950 bg-slate-950 text-white shadow-sm'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bulk Volume Discount Table */}
              <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-900 uppercase">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#047857]" />
                    AUTOMATIC VOLUME TIER DISCOUNTS
                  </span>
                  <span className="text-[10px] text-[#047857]">APPLIES IN BAG</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5 text-center text-xs font-mono">
                  {product.bulkTiers.map((tier) => (
                    <div
                      key={tier.minQty}
                      className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm"
                    >
                      <div className="text-[10px] text-slate-500 uppercase">{tier.minQty}+ Pieces</div>
                      <div className="text-sm font-bold text-slate-900 my-0.5">
                        {formatPrice(tier.pricePerUnit)}/ea
                      </div>
                      <div className="text-[10px] font-bold text-[#047857]">
                        -{tier.discountPercentage}% OFF
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Purchasing & Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div className="flex gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-slate-200 rounded-xl px-3 bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-slate-500 hover:text-slate-900 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 font-mono font-bold text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-slate-500 hover:text-slate-900 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 rounded-xl bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lifted"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG ({formatPrice(product.price * quantity)})</span>
                </button>
              </div>

              {/* Direct Buy Now & WhatsApp Row */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleBuyNow}
                  className="py-3 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-900 hover:text-white text-slate-900 font-mono text-xs font-bold uppercase tracking-wider transition-all"
                >
                  BUY NOW (EXPRESS CHECKOUT)
                </button>

                <a
                  href={`https://wa.me/919599084873?text=Hello%20Slate%20Apparels%2C%20I%20am%20interested%20in%20a%20bulk%20order%20for%20${encodeURIComponent(
                    product.name
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  <span>WHATSAPP PRODUCTION DESK</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications Accordion Table */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft">
          <h3 className="font-mono font-bold text-lg uppercase text-slate-950 mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#047857]" />
            TECHNICAL SPECIFICATIONS & TEXTILE MATRIX
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">FABRIC WEIGHT:</span>
                <span className="font-bold text-slate-900">{product.specifications.gsm || product.fabric}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">COMPOSITION:</span>
                <span className="font-bold text-slate-900">{product.specifications.composition}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">SILHOUETTE / FIT:</span>
                <span className="font-bold text-slate-900">{product.specifications.fit}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">WEAVE STRUCTURE:</span>
                <span className="font-bold text-slate-900">{product.specifications.weave || 'Ring-spun compact knit'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">WASH CARE:</span>
                <span className="font-bold text-slate-900">{product.specifications.washCare || 'Machine wash cold 30°C'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">MANUFACTURING ORIGIN:</span>
                <span className="font-bold text-slate-900">New Delhi, India (GST / IEC Certified)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8 pb-3 border-b border-slate-200">
              <h3 className="font-mono font-bold text-xl uppercase text-slate-950">
                RELATED DROPS IN {product.category}
              </h3>
              <Link
                href={`/shop?category=${product.category}`}
                className="text-xs font-mono font-bold text-[#047857] hover:underline uppercase"
              >
                VIEW CATEGORY →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-mono font-bold text-base uppercase text-slate-900">
                SIZE CHART & MEASUREMENTS (INCHES)
              </h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="text-slate-400 hover:text-slate-900 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4 font-sans">
              Measurements taken flat. All Slate Apparels garments adhere to international sizing tolerances.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400">
                    <th className="pb-2">SIZE</th>
                    <th className="pb-2">CHEST</th>
                    <th className="pb-2">LENGTH</th>
                    <th className="pb-2">SHOULDER</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2 font-bold text-slate-900">S</td>
                    <td className="py-2">40&quot;</td>
                    <td className="py-2">28&quot;</td>
                    <td className="py-2">20&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-900">M</td>
                    <td className="py-2">42&quot;</td>
                    <td className="py-2">29&quot;</td>
                    <td className="py-2">21&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-900">L</td>
                    <td className="py-2">44&quot;</td>
                    <td className="py-2">30&quot;</td>
                    <td className="py-2">22&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-900">XL</td>
                    <td className="py-2">46&quot;</td>
                    <td className="py-2">31&quot;</td>
                    <td className="py-2">23&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-900">2XL</td>
                    <td className="py-2">48&quot;</td>
                    <td className="py-2">32&quot;</td>
                    <td className="py-2">24&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setShowSizeGuide(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold uppercase"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
