'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Product } from '@/lib/products-data';
import HeroBanner from '@/components/store/HeroBanner';
import FeaturedCategories from '@/components/store/FeaturedCategories';
import ProductCard from '@/components/store/ProductCard';
import ProductQuickViewModal from '@/components/store/ProductQuickViewModal';
import WholesaleBanner from '@/components/store/WholesaleBanner';
import ReviewsSection from '@/components/store/ReviewsSection';
import { ArrowRight, Flame } from 'lucide-react';

export default function HomePage() {
  const { products } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('ALL');

  const filterTabs = [
    { name: 'ALL', activeClass: 'bg-[#00ff87] text-[#06080e] shadow-neon' },
    { name: 'HOODIES', activeClass: 'bg-[#ff007f] text-white shadow-neon-pink' },
    { name: 'JACKETS', activeClass: 'bg-[#00f0ff] text-[#06080e] shadow-neon-cyan' },
    { name: 'T-SHIRTS', activeClass: 'bg-[#00ff87] text-[#06080e] shadow-neon' },
    { name: 'TRACKSUITS', activeClass: 'bg-[#b026ff] text-white shadow-neon-purple' },
    { name: 'TRACKPANTS', activeClass: 'bg-[#ff6b00] text-white shadow-[0_0_20px_rgba(255,107,0,0.4)]' },
  ];

  const displayedProducts = products
    .filter((p) => {
      if (activeCategoryTab === 'ALL') return true;
      return p.category === activeCategoryTab;
    })
    .slice(0, 8);

  return (
    <div className="select-none bg-[#06080e] text-slate-100 min-h-screen">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Featured Categories Grid */}
      <FeaturedCategories />

      {/* 3. Featured Products Drop Showcase */}
      <section className="py-16 sm:py-24 bg-[#06080e] border-b border-slate-800 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00ff87]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header & Tab Selector */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-800 gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-[10px] font-mono font-bold tracking-widest text-[#00ff87] uppercase border border-slate-700 shadow-neon-sm mb-2">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                TRENDING AUTUMN/WINTER RELEASES
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase font-sans tracking-tight">
                FEATURED PRODUCTION DROPS
              </h2>
            </div>

            {/* Category Filter Pills with Solid Distinct Neons */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs font-mono font-bold uppercase">
              {filterTabs.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategoryTab(cat.name)}
                  className={`px-3.5 py-1.5 rounded-full transition-all flex-shrink-0 font-mono text-xs ${
                    activeCategoryTab === cat.name
                      ? `${cat.activeClass} font-black`
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid (4 across, perfectly aligned with aspect-[4/5] photos) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>

          {/* Bottom View All Link */}
          <div className="mt-12 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#00f0ff] hover:text-black font-mono text-xs font-black uppercase tracking-wider transition-all shadow-neon hover:shadow-neon-cyan"
            >
              <span>VIEW FULL 18 STYLES CATALOG</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Retail Club & Custom Personalization Banner */}
      <WholesaleBanner />

      {/* 5. Verified Retail Customer Reviews */}
      <ReviewsSection />

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
