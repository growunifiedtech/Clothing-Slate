'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Product, CATEGORIES_LIST } from '@/lib/products-data';
import ProductCard from '@/components/store/ProductCard';
import ProductQuickViewModal from '@/components/store/ProductQuickViewModal';
import { Filter, ArrowUpDown, RefreshCw, X, Sparkles } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'ALL';
  const initialSearch = searchParams.get('q') || '';

  const { products } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSeason, setSelectedSeason] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchFilter, setSearchFilter] = useState(initialSearch);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered & Sorted List
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
        const matchesSeason = selectedSeason === 'ALL' || p.season === selectedSeason;
        const matchesSearch =
          !searchFilter.trim() ||
          p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
          p.fabric.toLowerCase().includes(searchFilter.toLowerCase()) ||
          p.category.toLowerCase().includes(searchFilter.toLowerCase());

        return matchesCategory && matchesSeason && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedSeason, sortBy, searchFilter]);

  const resetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedSeason('ALL');
    setSortBy('featured');
    setSearchFilter('');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8 pb-4 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">
                SLATE APPARELS // PRODUCTION INVENTORY
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 uppercase font-sans tracking-tight">
                {selectedCategory === 'ALL' ? 'COMPLETE CATALOG' : `${selectedCategory} COLLECTION`}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                Showing {filteredProducts.length} of {products.length} Drops
              </span>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden px-3.5 py-1.5 rounded-full bg-[#0b0f19] text-white text-xs font-mono font-bold flex items-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5 text-[#05f26c]" />
                <span>FILTERS</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Sidebar Filters (3 cols) + Products Grid (9 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="font-mono font-bold text-xs uppercase text-slate-900 flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-[#05f26c]" />
                  FILTERS
                </span>
                <button
                  onClick={resetFilters}
                  className="text-[10px] font-mono text-slate-500 hover:text-slate-900 underline uppercase"
                >
                  RESET
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="font-mono text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  CATEGORIES
                </h4>
                <div className="space-y-1 text-xs font-mono">
                  {CATEGORIES_LIST.map((cat) => {
                    const count =
                      cat === 'ALL'
                        ? products.length
                        : products.filter((p) => p.category === cat).length;
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
                          isSelected
                            ? 'bg-slate-900 text-white font-bold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Season Filter */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-mono text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  SEASON DROP
                </h4>
                <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                  {['ALL', 'Winter', 'Summer', 'All Season'].map((sea) => (
                    <button
                      key={sea}
                      onClick={() => setSelectedSeason(sea)}
                      className={`px-3 py-1 rounded-lg border text-xs transition-colors ${
                        selectedSeason === sea
                          ? 'bg-slate-900 text-white border-slate-900 font-bold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {sea}
                    </button>
                  ))}
                </div>
              </div>

              {/* B2B Wholesale Notice */}
              <div className="pt-4 border-t border-slate-100 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 space-y-1.5">
                <span className="font-bold text-slate-900 text-[11px] block uppercase">
                  ⚡ BULK TIER PRICING READY
                </span>
                <p className="text-[11px] text-slate-500 font-sans">
                  Discounts automatically apply in bag:
                  <br />• 5+ units: 15% OFF
                  <br />• 20+ units: 30% OFF
                  <br />• 50+ units: 40% OFF
                </p>
              </div>
            </div>
          </div>

          {/* Right Product Grid Area (9 cols) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Sort & Search Toolbar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Category Pills (Quick scroll) */}
              <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs font-mono font-bold uppercase">
                {CATEGORIES_LIST.slice(0, 5).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg transition-colors flex-shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-[#0b0f19] text-white'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  SORT:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-slate-800 cursor-pointer"
                >
                  <option value="featured">FEATURED DROPS</option>
                  <option value="price-asc">PRICE: LOW TO HIGH</option>
                  <option value="price-desc">PRICE: HIGH TO LOW</option>
                  <option value="rating">HIGHEST RATED</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-slate-200">
                <RefreshCw className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="font-mono font-bold text-base uppercase text-slate-900">
                  No products matched your criteria
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try resetting the category filter or searching for another keyword.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-bold uppercase transition-all shadow-md"
                >
                  SHOW ALL PRODUCTS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono text-xs">Loading Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
