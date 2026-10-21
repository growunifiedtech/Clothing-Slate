'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Product, CATEGORIES_LIST } from '@/lib/products-data';
import ProductCard from '@/components/store/ProductCard';
import ProductQuickViewModal from '@/components/store/ProductQuickViewModal';
import {
  Filter,
  ArrowUpDown,
  RefreshCw,
  X,
  Sparkles,
  Truck,
  ShieldCheck,
  Check,
  SlidersHorizontal,
} from 'lucide-react';

const getCategoryBadgeStyle = (cat: string) => {
  switch (cat.toUpperCase()) {
    case 'HOODIES': return 'bg-[#ff007f] text-white shadow-neon-pink-sm border-[#ff007f]';
    case 'JACKETS': return 'bg-[#00f0ff] text-[#06080e] shadow-neon-cyan-sm border-[#00f0ff]';
    case 'T-SHIRTS': return 'bg-[#00ff87] text-[#06080e] shadow-neon-sm border-[#00ff87]';
    case 'TRACKSUITS': return 'bg-[#b026ff] text-white shadow-neon-purple-sm border-[#b026ff]';
    case 'TRACKPANTS': return 'bg-[#00bfff] text-[#06080e] border-[#00bfff]';
    case 'SWEATERS': return 'bg-[#ff6b00] text-white border-[#ff6b00] shadow-[0_0_15px_rgba(255,107,0,0.35)]';
    case 'POLOS': return 'bg-[#faff00] text-[#06080e] border-[#faff00] shadow-neon-yellow';
    case 'BEANIES': return 'bg-[#ff1493] text-white shadow-neon-pink-sm border-[#ff1493]';
    default: return 'bg-[#00ff87] text-[#06080e] shadow-neon-sm border-[#00ff87]';
  }
};

const getSeasonBadgeStyle = (season: string) => {
  switch (season) {
    case 'Winter': return 'bg-[#00f0ff] text-[#06080e] border-[#00f0ff] shadow-neon-cyan-sm';
    case 'Summer': return 'bg-[#ff6b00] text-white border-[#ff6b00] shadow-[0_0_12px_rgba(255,107,0,0.35)]';
    case 'All Season': return 'bg-[#b026ff] text-white border-[#b026ff] shadow-neon-purple-sm';
    default: return 'bg-[#00ff87] text-[#06080e] border-[#00ff87] shadow-neon-sm';
  }
};

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlCategory = searchParams.get('category') || 'ALL';
  const urlSearch = searchParams.get('q') || '';

  const { products } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [selectedSeason, setSelectedSeason] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchFilter, setSearchFilter] = useState(urlSearch);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Synchronize state when URL params change (e.g., via Navbar links or browser back/forward)
  useEffect(() => {
    const cat = searchParams.get('category');
    setSelectedCategory(cat || 'ALL');
  }, [searchParams]);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchFilter(q);
    }
  }, [searchParams]);

  // Handle category selection and URL update
  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'ALL') {
      router.push('/shop');
    } else {
      router.push(`/shop?category=${encodeURIComponent(cat)}`);
    }
  };

  // Remove active category filter
  const handleRemoveCategory = () => {
    handleSelectCategory('ALL');
  };

  // Filtered & Sorted List
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'ALL' || p.category.toUpperCase() === selectedCategory.toUpperCase();
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
    router.push('/shop');
  };

  return (
    <div className="bg-[#06080e] min-h-screen py-6 sm:py-12 select-none text-slate-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-6 sm:mb-8 pb-4 border-b border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#00ff87] uppercase block mb-1">
                SLATE APPARELS // RETAIL PRODUCTION DROPS
              </span>
              <h1 className="text-2xl sm:text-5xl font-extrabold text-white uppercase font-sans tracking-tight">
                {selectedCategory === 'ALL' ? 'COMPLETE RETAIL CATALOG' : `${selectedCategory} COLLECTION`}
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs font-mono font-bold text-slate-300 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-full shadow-neon-sm">
                Showing {filteredProducts.length} Drops
              </span>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-3.5 py-1.5 rounded-full bg-[#00ff87] text-[#06080e] text-xs font-mono font-extrabold flex items-center gap-1.5 shadow-neon-sm active:scale-95 transition-all"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>FILTERS {selectedCategory !== 'ALL' ? '(1)' : ''}</span>
              </button>
            </div>
          </div>

          {/* Active Filter Pill Bar (with prominent Remove Option) */}
          {(selectedCategory !== 'ALL' || searchFilter.trim() || selectedSeason !== 'ALL') && (
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-slate-400 font-bold uppercase text-[11px]">ACTIVE FILTERS:</span>

              {selectedCategory !== 'ALL' && (
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-extrabold ${getCategoryBadgeStyle(selectedCategory)}`}>
                  <span>CATEGORY: {selectedCategory}</span>
                  <button
                    onClick={handleRemoveCategory}
                    className="hover:opacity-75 transition-opacity p-0.5 ml-1"
                    title="Remove category filter"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {selectedSeason !== 'ALL' && (
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-extrabold ${getSeasonBadgeStyle(selectedSeason)}`}>
                  <span>SEASON: {selectedSeason}</span>
                  <button
                    onClick={() => setSelectedSeason('ALL')}
                    className="hover:opacity-75 transition-opacity p-0.5 ml-1"
                    title="Remove season filter"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {searchFilter.trim() && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
                  <span>KEYWORD: &quot;{searchFilter}&quot;</span>
                  <button
                    onClick={() => {
                      setSearchFilter('');
                      router.push('/shop');
                    }}
                    className="hover:opacity-75 transition-opacity p-0.5 ml-1"
                    title="Clear search filter"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <button
                onClick={resetFilters}
                className="text-[11px] text-[#00f0ff] hover:underline uppercase font-bold ml-auto"
              >
                CLEAR ALL FILTERS
              </button>
            </div>
          )}
        </div>

        {/* 2-Column Layout: Sidebar Filters (3 cols) + Products Grid (9 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-[#0b0f19] rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6 sticky top-24">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <span className="font-mono font-bold text-xs uppercase text-white flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-[#ff007f]" />
                  FILTERS
                </span>
                <button
                  onClick={resetFilters}
                  className="text-[10px] font-mono text-slate-400 hover:text-[#00f0ff] underline uppercase transition-colors"
                >
                  RESET
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                  CATEGORIES
                </h4>
                <div className="space-y-1 text-xs font-mono max-h-72 overflow-y-auto pr-1">
                  {CATEGORIES_LIST.map((cat) => {
                    const count =
                      cat === 'ALL'
                        ? products.length
                        : products.filter((p) => p.category === cat).length;
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => handleSelectCategory(cat)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-all ${
                          isSelected
                            ? `${getCategoryBadgeStyle(cat)} font-extrabold`
                            : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`text-[10px] ${isSelected ? 'opacity-90 font-bold' : 'text-slate-500'}`}>
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
                          ? `${getSeasonBadgeStyle(sea)} font-bold`
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
                <span className="font-bold text-[#00f0ff] text-[11px] block uppercase flex items-center gap-1">
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
            <div className="bg-[#0b0f19] rounded-2xl p-3 sm:p-4 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Category Pills (Quick scroll) */}
              <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs font-mono font-bold uppercase scrollbar-none">
                {CATEGORIES_LIST.slice(0, 6).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleSelectCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg transition-all flex-shrink-0 text-xs ${
                      selectedCategory === cat
                        ? `${getCategoryBadgeStyle(cat)} font-extrabold`
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
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

            {/* Products Grid: 2 columns on mobile, 3 on lg */}
            {filteredProducts.length === 0 ? (
              <div className="bg-[#0b0f19] rounded-2xl p-12 sm:p-16 text-center border border-slate-800">
                <RefreshCw className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h3 className="font-mono font-bold text-base uppercase text-white">
                  No drops matched criteria
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Try removing the category filter or searching for a different keyword.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-bold uppercase transition-all shadow-neon"
                >
                  SHOW ALL DROPS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
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

      {/* Mobile Filter Slide-Over Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full sm:max-w-md bg-[#090d16] border border-slate-700 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 space-y-5 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <span className="font-mono font-bold text-sm uppercase text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#00ff87]" />
                FILTER DROPS
              </span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Categories in Mobile Filter */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-xs font-bold uppercase text-slate-300">CATEGORIES</span>
                {selectedCategory !== 'ALL' && (
                  <button
                    onClick={handleRemoveCategory}
                    className="text-[11px] font-mono text-[#00f0ff] hover:underline"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {CATEGORIES_LIST.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleSelectCategory(cat)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? `${getCategoryBadgeStyle(cat)} font-extrabold`
                          : 'border-slate-800 bg-slate-900 text-slate-300'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Season Filter in Mobile Filter */}
            <div className="pt-3 border-t border-slate-800">
              <span className="font-mono text-xs font-bold uppercase text-slate-300 block mb-2">SEASON DROP</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {['ALL', 'Winter', 'Summer', 'All Season'].map((sea) => (
                  <button
                    key={sea}
                    onClick={() => setSelectedSeason(sea)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      selectedSeason === sea
                        ? `${getSeasonBadgeStyle(sea)} font-extrabold`
                        : 'border-slate-800 bg-slate-900 text-slate-300'
                    }`}
                  >
                    {sea}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort in Mobile Filter */}
            <div className="pt-3 border-t border-slate-800">
              <span className="font-mono text-xs font-bold uppercase text-slate-300 block mb-2">SORT ORDER</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs font-mono font-bold text-white focus:outline-none focus:border-[#00ff87]"
              >
                <option value="featured">FEATURED DROPS</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
                <option value="rating">HIGHEST RATED</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800 flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono text-xs font-bold uppercase"
              >
                RESET ALL
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-xl bg-[#00ff87] text-[#06080e] font-mono text-xs font-extrabold uppercase shadow-neon-sm"
              >
                APPLY ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

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
