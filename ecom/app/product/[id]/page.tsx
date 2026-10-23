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

const getCategoryColor = (cat: string) => {
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
    <div className="bg-[#06080e] min-h-screen py-8 sm:py-12 select-none text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
          <Link href="/" className="hover:text-[#00f0ff] transition-colors">
            HOME
          </Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className={`hover:underline font-bold transition-colors ${getCategoryColor(product.category)}`}>
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-white font-bold truncate max-w-xs">{product.name}</span>
        </div>

        {/* 2-Column Product Detail Layout */}
        <div className="bg-[#0b0f19] rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Gallery Media (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Viewport: Strict aspect-[4/5] formatting */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg">
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
                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase shadow-md ${
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
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
                  isFavorite
                    ? 'bg-[#ff007f]/20 text-[#ff007f] border border-[#ff007f] shadow-neon-pink-sm scale-110'
                    : 'bg-[#06080e]/80 text-slate-300 hover:text-[#ff007f] hover:border-[#ff007f]/60 hover:bg-[#06080e] border border-slate-700'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#ff007f] text-[#ff007f]' : ''}`} />
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
                        ? 'border-[#00f0ff] scale-105 shadow-neon-cyan-sm'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill unoptimized className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Factory Authenticity Notice */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs font-mono text-slate-300">
              <ShieldCheck className="w-5 h-5 text-[#00f0ff] flex-shrink-0" />
              <span>
                Fabricated at Okhla Industrial Hub, New Delhi. Pre-shrunk & enzymatic washed for zero post-production shrinkage.
              </span>
            </div>
          </div>

          {/* Right Column: Specifications & Purchasing (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span className={`uppercase tracking-widest font-extrabold ${getCategoryColor(product.category)}`}>
                  {product.category} • {product.season}
                </span>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Star className="w-4 h-4 fill-[#faff00] text-[#faff00]" />
                  <span className="font-bold text-white">{product.rating}</span>
                  <span className="text-slate-500 font-mono">({product.reviewsCount} verified reviews)</span>
                </div>
              </div>

              {/* Title & SKU */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white uppercase font-sans tracking-tight mb-2">
                {product.name}
              </h1>
              <span className="text-[11px] font-mono text-slate-400 uppercase block mb-4">
                SKU: {product.sku} • {product.specifications.gsm || product.fabric}
              </span>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 mb-4">
                <span className="text-3xl font-mono font-extrabold text-white">
                  {formatPrice(product.price)}
                </span>
                <span className="text-base font-mono text-slate-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-extrabold bg-[#ff007f]/20 text-[#ff007f] border border-[#ff007f]/40 shadow-neon-pink-sm">
                  SAVE {discountPercent}%
                </span>
                <span className="text-[11px] font-mono text-slate-400 ml-auto hidden sm:block">
                  Incl. 5% GST
                </span>
              </div>

              {/* Live Stock Status Indicator */}
              <div className="mb-6">
                {product.stockCount === 0 ? (
                  <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/50 text-xs font-mono text-red-300 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="font-bold">OUT OF STOCK:</span>
                    <span>Currently sold out. Fresh production run scheduled at Okhla facility.</span>
                  </div>
                ) : product.stockCount < 20 ? (
                  <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/50 text-xs font-mono text-amber-300 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                    <span className="font-bold">LOW STOCK ALERT:</span>
                    <span>Only {product.stockCount} units remaining in factory inventory!</span>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-[#00ff87] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00ff87]" />
                    <span className="font-bold">IN STOCK:</span>
                    <span className="text-slate-300">{product.stockCount} units ready for immediate BlueDart dispatch.</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Swatch Selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs font-mono font-bold uppercase text-slate-300 mb-2.5">
                  <span>Colorway: <strong className="text-white">{selectedColor}</strong></span>
                  <span className="text-slate-400 font-normal">{product.colors.length} shades available</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`px-3.5 py-2 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all ${
                        selectedColor === c.name
                          ? 'border-[#00f0ff] bg-[#00f0ff]/15 text-[#00f0ff] font-bold shadow-neon-cyan-sm'
                          : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
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
                <div className="flex justify-between items-center text-xs font-mono font-bold uppercase text-slate-300 mb-2.5">
                  <span>Select Size</span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-[#ff007f] hover:underline flex items-center gap-1 font-bold"
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
                          ? 'border-[#00f0ff] bg-[#00f0ff] text-[#06080e] shadow-neon-cyan-sm'
                          : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Retail Value Props */}
              <div className="mb-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <Truck className="w-4 h-4 text-[#00f0ff]" />
                  <span>Free shipping on orders ₹999+</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00ff87]" />
                  <span>7-day easy size exchange</span>
                </div>
              </div>
            </div>

            {/* Purchasing & Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-slate-700 rounded-xl px-3 bg-slate-900">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={product.stockCount === 0}
                    className="p-2 text-slate-400 hover:text-white font-bold disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="px-3 font-mono font-bold text-sm text-white">
                    {product.stockCount === 0 ? 0 : quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    disabled={product.stockCount === 0 || quantity >= product.stockCount}
                    className="p-2 text-slate-400 hover:text-white font-bold disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.stockCount === 0}
                  className={`flex-1 py-4 rounded-xl font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    product.stockCount === 0
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      : 'bg-[#00ff87] hover:bg-[#00f0ff] text-[#06080e] hover:text-black shadow-neon hover:shadow-neon-cyan'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {product.stockCount === 0
                      ? 'CURRENTLY OUT OF STOCK'
                      : `ADD TO BAG (${formatPrice(product.price * quantity)})`}
                  </span>
                </button>
              </div>

              {/* Direct Buy Now & WhatsApp Row */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleBuyNow}
                  disabled={product.stockCount === 0}
                  className={`py-3.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all ${
                    product.stockCount === 0
                      ? 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                      : 'bg-[#ff007f] hover:bg-[#b026ff] text-black hover:text-white shadow-neon-pink hover:shadow-neon-purple'
                  }`}
                >
                  {product.stockCount === 0 ? 'UNAVAILABLE' : '⚡ BUY NOW (EXPRESS)'}
                </button>

                <a
                  href={`https://wa.me/919599084873?text=Hello%20Slate%20Apparels%2C%20I%20have%20an%20inquiry%20regarding%20${encodeURIComponent(
                    product.name
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 rounded-xl bg-slate-900 hover:bg-[#00ff87]/15 text-[#00ff87] border border-[#00ff87]/40 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-neon-sm"
                >
                  <MessageSquare className="w-4 h-4 text-[#00ff87]" />
                  <span>WHATSAPP SUPPORT</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications Accordion Table */}
        <div className="mt-12 bg-[#0b0f19] rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl">
          <h3 className="font-mono font-bold text-lg uppercase text-white mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#00ff87]" />
            TECHNICAL SPECIFICATIONS & TEXTILE MATRIX
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">FABRIC WEIGHT:</span>
                <span className="font-bold text-white">{product.specifications.gsm || product.fabric}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">COMPOSITION:</span>
                <span className="font-bold text-white">{product.specifications.composition}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">SILHOUETTE / FIT:</span>
                <span className="font-bold text-white">{product.specifications.fit}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">WEAVE STRUCTURE:</span>
                <span className="font-bold text-white">{product.specifications.weave || 'Ring-spun compact knit'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">WASH CARE:</span>
                <span className="font-bold text-white">{product.specifications.washCare || 'Machine wash cold 30°C'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">MANUFACTURING ORIGIN:</span>
                <span className="font-bold text-white">New Delhi, India (GST / IEC Certified)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8 pb-3 border-b border-slate-800">
              <h3 className="font-mono font-bold text-xl uppercase text-white">
                RELATED DROPS IN {product.category}
              </h3>
              <Link
                href={`/shop?category=${product.category}`}
                className="text-xs font-mono font-bold text-[#00ff87] hover:underline uppercase"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#0b0f19] rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-700 text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-mono font-bold text-base uppercase text-white">
                SIZE CHART & MEASUREMENTS (INCHES)
              </h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="text-slate-400 hover:text-white font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4 font-sans">
              Measurements taken flat. All Slate Apparels garments adhere to international sizing tolerances.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-2">SIZE</th>
                    <th className="pb-2">CHEST</th>
                    <th className="pb-2">LENGTH</th>
                    <th className="pb-2">SHOULDER</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="py-2 font-bold text-[#00ff87]">S</td>
                    <td className="py-2 text-slate-300">40&quot;</td>
                    <td className="py-2 text-slate-300">28&quot;</td>
                    <td className="py-2 text-slate-300">20&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-[#00ff87]">M</td>
                    <td className="py-2 text-slate-300">42&quot;</td>
                    <td className="py-2 text-slate-300">29&quot;</td>
                    <td className="py-2 text-slate-300">21&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-[#00ff87]">L</td>
                    <td className="py-2 text-slate-300">44&quot;</td>
                    <td className="py-2 text-slate-300">30&quot;</td>
                    <td className="py-2 text-slate-300">22&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-[#00ff87]">XL</td>
                    <td className="py-2 text-slate-300">46&quot;</td>
                    <td className="py-2 text-slate-300">31&quot;</td>
                    <td className="py-2 text-slate-300">23&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-[#00ff87]">2XL</td>
                    <td className="py-2 text-slate-300">48&quot;</td>
                    <td className="py-2 text-slate-300">32&quot;</td>
                    <td className="py-2 text-slate-300">24&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setShowSizeGuide(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#00ff87] text-[#06080e] font-mono text-xs font-extrabold uppercase shadow-neon"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
