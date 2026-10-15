'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Product, CATEGORIES_LIST } from '@/lib/products-data';
import ProductCard from '@/components/store/ProductCard';
import ProductQuickViewModal from '@/components/store/ProductQuickViewModal';
import { Filter, ArrowUpDown, RefreshCw, X, Sparkles, Truck, ShieldCheck } from 'lucide-react';

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
    <div className="bg-[#06080e] min-h-screen py-8 sm:py-12 select-none text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8 pb-4 border-b border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#00ff87] uppercase block mb-1">
                SLATE APPARELS // RETAIL PRODUCTION DROPS
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white uppercase font-sans tracking-tight">
                {selectedCategory === 'ALL' ? 'COMPLETE RETAIL CATALOG' : `${selectedCategory} COLLECTION`}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-slate-300 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-full shadow-neon-sm">
                Showing {filteredProducts.length} of {products.length} Drops
              </span>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden px-3.5 py-1.5 rounded-full bg-[#00ff87] text-[#06080e] text-xs font-mono font-extrabold flex items-center gap-1.5 shadow-neon-sm"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>FILTERS</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Sidebar Filters (3 cols) + Products Grid (9 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-[#0b0f19] rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <span className="font-mono font-bold text-xs uppercase text-white flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-[#00ff87]" />
                  FILTERS
                </span>
                <button
                  onClick={resetFilters}
                  className="text-[10px] font-mono text-slate-400 hover:text-[#00ff87] underline uppercase transition-colors"
                >
                  RESET
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
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
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-all ${
                          isSelected
                            ? 'bg-[#00ff87] text-[#06080e] font-extrabold shadow-neon-sm'
                            : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-[#06080e]/80' : 'text-slate-500'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Season Filter */}
              <div className="pt-4 border-t border-slate-800">
                <h4 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                  SEASON DROP
                </h4>
                <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                  {['ALL', 'Winter', 'Summer', 'All Season'].map((sea) => (
                    <button
                      key={sea}
                      onClick={() => setSelectedSeason(sea)}
                      className={`px-3 py-1.5 rounded-lg border text-xs transition-colors ${
                        selectedSeason === sea
                          ? 'bg-[#00ff87] text-[#06080e] border-[#00ff87] font-bold shadow-neon-sm'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-600'
                      }`}
                    >
                      {sea}
                    </button>
                  ))}
                </div>
              </div>

              {/* Retail Promise Box */}
              <div className="pt-4 border-t border-slate-800 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
                <span className="font-bold text-[#00ff87] text-[11px] block uppercase flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" />
                  RETAIL DELIVERY PERKS
                </span>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  • Single-piece purchase directly from factory
                  <br />• Free delivery on orders over ₹999
                  <br />• 7-day hassle-free size exchange
                </p>
              </div>
            </div>
          </div>

          {/* Right Product Grid Area (9 cols) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Sort & Search Toolbar */}
            <div className="bg-[#0b0f19] rounded-2xl p-4 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Category Pills (Quick scroll) */}
              <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs font-mono font-bold uppercase">
                {CATEGORIES_LIST.slice(0, 5).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex-shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-[#00ff87] text-[#06080e]'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  SORT:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-[#00ff87] cursor-pointer"
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
              <div className="bg-[#0b0f19] rounded-2xl p-16 text-center border border-slate-800">
                <RefreshCw className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h3 className="font-mono font-bold text-base uppercase text-white">
                  No products matched your criteria
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Try resetting the category filter or searching for another keyword.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-bold uppercase transition-all shadow-neon"
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
    <Suspense fallback={<div className="p-12 text-center font-mono text-xs text-slate-400">Loading Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
