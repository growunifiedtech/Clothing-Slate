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
import { ArrowRight, Sparkles, Zap, Flame } from 'lucide-react';

export default function HomePage() {
  const { products } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('ALL');

  const filterTabs = ['ALL', 'HOODIES', 'JACKETS', 'T-SHIRTS', 'TRACKSUITS', 'TRACKPANTS'];

  const displayedProducts = products
    .filter((p) => {
      if (activeCategoryTab === 'ALL') return true;
      return p.category === activeCategoryTab;
    })
    .slice(0, 8);

  return (
    <div className="select-none">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Featured Categories Grid */}
      <FeaturedCategories />

      {/* 3. Featured Products Drop Showcase */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Tab Selector */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200 gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[10px] font-mono font-bold tracking-widest text-slate-700 uppercase border border-slate-200 shadow-sm mb-2">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                TRENDING AUTUMN/WINTER RELEASES
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 uppercase font-sans tracking-tight">
                FEATURED PRODUCTION DROPS
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs font-mono font-bold uppercase">
              {filterTabs.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryTab(cat)}
                  className={`px-3.5 py-1.5 rounded-full transition-all flex-shrink-0 ${
                    activeCategoryTab === cat
                      ? 'bg-[#0b0f19] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-950 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid (4 across) */}
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
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lifted"
            >
              <span>VIEW FULL 18 STYLES CATALOG</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. B2B Wholesale Banner */}
      <WholesaleBanner />

      {/* 5. Verified Client Reviews */}
      <ReviewsSection />

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
