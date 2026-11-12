'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { useAuth } from '@/lib/auth-context';
import { ECOM_PRODUCTS, Product } from '@/lib/products-data';
import { formatPrice } from '@/lib/utils';
import AuthModal from '@/components/auth/AuthModal';
import {
  ShoppingBag,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Truck,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers,
  ArrowUpRight,
  Flame,
  Check,
  ChevronUp,
  SlidersHorizontal,
  Phone,
  Mail,
  MapPin,
  Clock,
  Compass,
} from 'lucide-react';

export default function GenZLandingPage() {
  const router = useRouter();
  const { openCart, cartTotalCount, addToCart, showToast } = useStore();
  const { user } = useAuth();

  // Active section tracking for navbar highlight
  const [activeNav, setActiveNav] = useState<'hero' | 'collections' | 'winter' | 'atelier' | 'catalog'>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Selected sizes for featured winter drop cards
  const [selectedWinterSizes, setSelectedWinterSizes] = useState<{ [productId: string]: string }>({
    'oversized-hoodies': 'L',
    'denim-jackets': 'L',
    'puffer-jackets': 'L',
    'omniheat-tracksuits': 'L',
  });

  // Catalog category filter state
  const [catalogCategory, setCatalogCategory] = useState<string>('ALL');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sections: ('hero' | 'collections' | 'winter' | 'atelier' | 'catalog')[] = [
        'hero',
        'collections',
        'winter',
        'atelier',
        'catalog',
      ];

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNav(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: 'hero' | 'collections' | 'winter' | 'atelier' | 'catalog') => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveNav(id);
    }
  };

  const handleQuickAdd = (product: Product, size?: string) => {
    const chosenSize = size || product.sizes[0] || 'L';
    const chosenColor = product.colors[0]?.name || 'Pitch Black';
    addToCart(product, chosenSize, chosenColor, 1);
    showToast(`${product.name} (${chosenSize}) added to bag!`);
    openCart();
  };

  // Filtered products for catalog section
  const filteredProducts =
    catalogCategory === 'ALL'
      ? ECOM_PRODUCTS
      : ECOM_PRODUCTS.filter((p) => p.category === catalogCategory);

  // Featured Winter Drops products
  const winterProducts = [
    ECOM_PRODUCTS.find((p) => p.id === 'oversized-hoodies') || ECOM_PRODUCTS[3],
    ECOM_PRODUCTS.find((p) => p.id === 'denim-jackets') || ECOM_PRODUCTS[7],
    ECOM_PRODUCTS.find((p) => p.id === 'puffer-jackets') || ECOM_PRODUCTS[9],
    ECOM_PRODUCTS.find((p) => p.id === 'omniheat-tracksuits') || ECOM_PRODUCTS[12],
  ].filter(Boolean) as Product[];

  return (
    <div className="relative w-full min-h-screen bg-[#05070c] text-slate-100 selection:bg-[#00ff87] selection:text-[#05070c]">

      {/* ======================================================== */}
      {/* 1. STICKY GEN-Z HIGH-FASHION SOLID NEON NAVBAR            */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-50 w-full px-3 sm:px-6 lg:px-8 py-3 bg-[#05070c]/90 backdrop-blur-xl border-b border-slate-800/80 transition-all select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Brand Mark (Glides to Hero) */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2.5 group flex-shrink-0 text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-black text-white group-hover:border-[#00ff87] group-hover:shadow-neon transition-all">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-wider text-white uppercase font-sans leading-none flex items-center gap-1.5">
                SLATE APPARELS
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] shadow-neon-sm animate-pulse" />
              </span>
              <span className="text-[8px] font-mono text-slate-400 uppercase mt-0.5 hidden xs:block">
                NEW DELHI // 100% COMBED COTTON
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links: Solid Neon Highlights on Active */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-2.5 text-xs font-mono uppercase font-black">
            {/* 1. HERO / EDITORIAL */}
            <button
              onClick={() => scrollToSection('hero')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                activeNav === 'hero'
                  ? 'bg-white text-[#05070c] border-white shadow-lg'
                  : 'bg-slate-900/70 text-slate-300 border-slate-800 hover:border-slate-600 hover:text-white'
              }`}
            >
              LOOKBOOK
            </button>

            {/* 2. COLLECTIONS (Solid Neon Cyan) */}
            <button
              onClick={() => scrollToSection('collections')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                activeNav === 'collections'
                  ? 'bg-[#00f0ff] text-[#05070c] border-[#00f0ff] shadow-neon-cyan'
                  : 'bg-slate-900/70 text-slate-300 border-slate-800 hover:border-[#00f0ff] hover:text-[#00f0ff]'
              }`}
            >
              COLLECTIONS
            </button>

            {/* 3. WINTER DROPS (Solid Neon Hot Pink) */}
            <button
              onClick={() => scrollToSection('winter')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                activeNav === 'winter'
                  ? 'bg-[#ff007f] text-white border-[#ff007f] shadow-neon-pink'
                  : 'bg-slate-900/70 text-slate-300 border-slate-800 hover:border-[#ff007f] hover:text-[#ff007f]'
              }`}
            >
              WINTER DROPS
            </button>

            {/* 4. ATELIER SPECS (Solid Neon Lime) */}
            <button
              onClick={() => scrollToSection('atelier')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                activeNav === 'atelier'
                  ? 'bg-[#00ff87] text-[#05070c] border-[#00ff87] shadow-neon'
                  : 'bg-slate-900/70 text-slate-300 border-slate-800 hover:border-[#00ff87] hover:text-[#00ff87]'
              }`}
            >
              ATELIER SPECS
            </button>

            {/* 5. CATALOG (Solid Neon Yellow) */}
            <button
              onClick={() => scrollToSection('catalog')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                activeNav === 'catalog'
                  ? 'bg-[#faff00] text-[#05070c] border-[#faff00] shadow-neon-yellow'
                  : 'bg-slate-900/70 text-slate-300 border-slate-800 hover:border-[#faff00] hover:text-[#faff00]'
              }`}
            >
              CATALOG (18)
            </button>
          </nav>

          {/* Right Action Icons: Login + Cart Bag + Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            {/* Firebase Auth / Account Profile */}
            {user ? (
              <Link
                href="/dashboard"
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-[#ff007f] text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5"
                title="Account Dashboard"
              >
                <div className="w-4 h-4 rounded-full bg-[#ff007f] text-[#05070c] text-[9px] font-black flex items-center justify-center">
                  {(user.displayName || user.email || 'U').slice(0, 1).toUpperCase()}
                </div>
                <span className="hidden lg:inline">{user.displayName || user.email?.split('@')[0]}</span>
              </Link>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-[#00f0ff] text-slate-300 hover:text-[#00f0ff] font-mono text-xs font-bold transition-all"
              >
                LOGIN
              </button>
            )}

            {/* Shopping Bag Trigger */}
            <button
              onClick={openCart}
              className="relative px-3 py-1.5 rounded-xl bg-[#00ff87] text-[#05070c] hover:bg-[#00f0ff] font-mono font-black text-xs uppercase flex items-center gap-1.5 transition-all shadow-neon hover:shadow-neon-cyan"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">BAG</span>
              {cartTotalCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#ff007f] text-white text-[9px] font-black flex items-center justify-center ml-0.5 shadow-neon-pink-sm">
                  {cartTotalCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#ff007f]" /> : <Menu className="w-5 h-5 text-[#00f0ff]" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer: Huge Gen-Z Solid Neon Typography */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#080c16] border border-slate-800 shadow-2xl animate-in fade-in slide-in-from-top-3">
            <div className="flex flex-col gap-2 font-mono font-black text-sm uppercase">
              <button
                onClick={() => scrollToSection('hero')}
                className="w-full text-left px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white flex items-center justify-between"
              >
                <span>01 // LOOKBOOK EDITORIAL</span>
                <span className="text-[10px] text-slate-400">4 MODELS</span>
              </button>
              <button
                onClick={() => scrollToSection('collections')}
                className="w-full text-left px-4 py-2.5 rounded-xl bg-slate-900 border border-[#00f0ff]/50 text-[#00f0ff] flex items-center justify-between"
              >
                <span>02 // COLLECTIONS</span>
                <span className="text-[10px]">6 SILHOUETTES</span>
              </button>
              <button
                onClick={() => scrollToSection('winter')}
                className="w-full text-left px-4 py-2.5 rounded-xl bg-slate-900 border border-[#ff007f]/50 text-[#ff007f] flex items-center justify-between"
              >
                <span>03 // WINTER DROPS</span>
                <span className="text-[10px]">AW26 MATRIX</span>
              </button>
              <button
                onClick={() => scrollToSection('atelier')}
                className="w-full text-left px-4 py-2.5 rounded-xl bg-slate-900 border border-[#00ff87]/50 text-[#00ff87] flex items-center justify-between"
              >
                <span>04 // ATELIER SPECS</span>
                <span className="text-[10px]">OKHLA FACTORY</span>
              </button>
              <button
                onClick={() => scrollToSection('catalog')}
                className="w-full text-left px-4 py-2.5 rounded-xl bg-slate-900 border border-[#faff00]/50 text-[#faff00] flex items-center justify-between"
              >
                <span>05 // CATALOG</span>
                <span className="text-[10px]">18 STYLES</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ======================================================== */}
      {/* SECTION 1: HERO - 100vh FULL-SCREEN 4-MODELS LINEUP      */}
      {/* ======================================================== */}
      <section
        id="hero"
        className="relative w-full h-[calc(100dvh-65px)] min-h-[600px] overflow-hidden bg-[#05070c] flex flex-col justify-between"
      >
        {/* Ambient atmospheric backdrop layer for zero edge borders */}
        <div className="absolute inset-0 w-full h-full scale-105 blur-2xl opacity-35 pointer-events-none">
          <Image
            src="/images/hero-models-crew-wide-fullbody.jpg"
            alt=""
            fill
            unoptimized
            className="object-cover object-center"
          />
        </div>

        {/* Primary sharp high-definition 4K editorial campaign image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-models-crew-wide-fullbody.jpg"
            alt="Slate Apparels - 4 Streetwear Models (2 Women, 2 Men)"
            fill
            priority
            unoptimized
            className="object-cover object-[50%_58%]"
          />
        </div>

        {/* Top subtle fade under navbar */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#05070c]/70 to-transparent pointer-events-none z-10" />

        {/* Bottom Hero Control Bar: Gen Z Quick Navigation */}
        <div className="relative z-20 mt-auto px-4 sm:px-8 pb-6 sm:pb-8 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090d16]/85 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#00ff87] shadow-neon animate-pulse" />
            <span className="font-bold text-white">AW26 RUNWAY LINEUP</span>
            <span className="text-slate-500">//</span>
            <span className="text-[#00f0ff] hidden xs:inline">100% COMBED COTTON</span>
            <span className="text-slate-500 hidden xs:inline">//</span>
            <span className="text-[#ff007f] hidden sm:inline">ZERO SHRINKAGE</span>
          </div>

          <button
            onClick={() => scrollToSection('collections')}
            className="group px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-[#00f0ff] text-white hover:text-[#05070c] border border-slate-700 hover:border-[#00f0ff] font-mono font-black text-xs uppercase flex items-center gap-2 transition-all shadow-xl hover:shadow-neon-cyan"
          >
            <span>EXPLORE SILHOUETTES</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: COLLECTIONS - "FACTORY SILHOUETTES" (CYAN)     */}
      {/* ======================================================== */}
      <section id="collections" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#070b14] border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header with Solid Neon Cyan */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] font-mono font-black text-xs uppercase tracking-widest mb-3 shadow-neon-cyan-sm">
                <span>// 01 ARCHITECTURAL SILHOUETTES</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-sans tracking-tight">
                CURATED APPAREL COLLECTIONS
              </h2>
              <p className="text-slate-400 font-mono text-xs sm:text-sm mt-2">
                ENGINEERED IN NEW DELHI // HEAVYWEIGHT 100% COMBED COTTON CUTS
              </p>
            </div>

            <button
              onClick={() => scrollToSection('catalog')}
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#00f0ff] hover:text-white uppercase tracking-wider transition-colors"
            >
              <span>BROWSE ALL 18 STYLES</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6 Silhouettes Grid: Multiple Solid Neon Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. HOODIES (Solid Neon Pink) */}
            <div className="group relative rounded-3xl bg-slate-900/90 border-2 border-slate-800 hover:border-[#ff007f] hover:shadow-neon-pink p-5 transition-all flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-800">
                  <Image
                    src="/images/products/oversized-hoodies-1.jpg"
                    alt="Heavyweight Fleece Hoodies"
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#ff007f] text-white font-mono font-black text-[10px] uppercase shadow-neon-pink-sm">
                    380 GSM FLEECE
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md font-mono text-xs font-bold text-[#00ff87]">
                    FROM ₹1,499
                  </div>
                </div>
                <h3 className="text-xl font-black uppercase text-white font-sans group-hover:text-[#ff007f] transition-colors">
                  OVERSIZED HOODIES
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-1">
                  Double-knit brushed combed cotton with seamless kangaroo pouch, dropped shoulder seam, and zero-pilling bio-wash.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">4 STYLES AVAILABLE</span>
                <Link
                  href="/shop?category=HOODIES"
                  className="px-3.5 py-1.5 rounded-xl bg-[#ff007f]/15 hover:bg-[#ff007f] text-[#ff007f] hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <span>SHOP HOODIES</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 2. JACKETS & DENIM (Solid Neon Cyan) */}
            <div className="group relative rounded-3xl bg-slate-900/90 border-2 border-slate-800 hover:border-[#00f0ff] hover:shadow-neon-cyan p-5 transition-all flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-800">
                  <Image
                    src="/images/products/denim-jackets-1.jpg"
                    alt="14 Oz Selvedge Denim Jackets"
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#00f0ff] text-[#05070c] font-mono font-black text-[10px] uppercase shadow-neon-cyan-sm">
                    14 OZ SELVEDGE
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md font-mono text-xs font-bold text-[#00ff87]">
                    FROM ₹1,699
                  </div>
                </div>
                <h3 className="text-xl font-black uppercase text-white font-sans group-hover:text-[#00f0ff] transition-colors">
                  DENIM & BOMBER JACKETS
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-1">
                  Rigid selvedge cotton denim with antique brass shanks, reinforced chest flaps, and boxy silhouette.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">4 STYLES AVAILABLE</span>
                <Link
                  href="/shop?category=JACKETS"
                  className="px-3.5 py-1.5 rounded-xl bg-[#00f0ff]/15 hover:bg-[#00f0ff] text-[#00f0ff] hover:text-[#05070c] font-mono text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <span>SHOP JACKETS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 3. T-SHIRTS (Solid Neon Lime) */}
            <div className="group relative rounded-3xl bg-slate-900/90 border-2 border-slate-800 hover:border-[#00ff87] hover:shadow-neon p-5 transition-all flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-800">
                  <Image
                    src="/images/products/oversized-t-shirt-drop-shoulder-1.jpg"
                    alt="240 GSM Drop Shoulder Tees"
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#00ff87] text-[#05070c] font-mono font-black text-[10px] uppercase shadow-neon-sm">
                    240 GSM JERSEY
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md font-mono text-xs font-bold text-[#00ff87]">
                    FROM ₹699
                  </div>
                </div>
                <h3 className="text-xl font-black uppercase text-white font-sans group-hover:text-[#00ff87] transition-colors">
                  OVERSIZED TEES
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-1">
                  100% combed ringspun cotton with high-density 1.25" rib collar and relaxed drape designed to retain shape.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">3 STYLES AVAILABLE</span>
                <Link
                  href="/shop?category=T-SHIRTS"
                  className="px-3.5 py-1.5 rounded-xl bg-[#00ff87]/15 hover:bg-[#00ff87] text-[#00ff87] hover:text-[#05070c] font-mono text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <span>SHOP TEES</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 4. TRACKSUITS (Solid Neon Electric Purple) */}
            <div className="group relative rounded-3xl bg-slate-900/90 border-2 border-slate-800 hover:border-[#b026ff] hover:shadow-neon-purple p-5 transition-all flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-800">
                  <Image
                    src="/images/products/omniheat-tracksuits-1.jpg"
                    alt="Omniheat Tech Tracksuits"
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#b026ff] text-white font-mono font-black text-[10px] uppercase shadow-neon-purple-sm">
                    OMNIHEAT TECH
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md font-mono text-xs font-bold text-[#00ff87]">
                    FROM ₹2,499
                  </div>
                </div>
                <h3 className="text-xl font-black uppercase text-white font-sans group-hover:text-[#b026ff] transition-colors">
                  PERFORMANCE TRACKSUITS
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-1">
                  Thermal composite fleece jacket + matching articulated trackpants engineered for sub-zero street movement.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">2 STYLES AVAILABLE</span>
                <Link
                  href="/shop?category=TRACKSUITS"
                  className="px-3.5 py-1.5 rounded-xl bg-[#b026ff]/15 hover:bg-[#b026ff] text-[#b026ff] hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <span>SHOP TRACKSUITS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 5. BALLOON TRACKPANTS (Solid Neon Safety Orange) */}
            <div className="group relative rounded-3xl bg-slate-900/90 border-2 border-slate-800 hover:border-[#ff6b00] hover:shadow-neon-orange p-5 transition-all flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-800">
                  <Image
                    src="/images/products/balloon-fit-trackpants-1.jpg"
                    alt="Balloon Fit Streetwear Trackpants"
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#ff6b00] text-white font-mono font-black text-[10px] uppercase shadow-neon-orange">
                    340 GSM BRUSHED
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md font-mono text-xs font-bold text-[#00ff87]">
                    FROM ₹1,199
                  </div>
                </div>
                <h3 className="text-xl font-black uppercase text-white font-sans group-hover:text-[#ff6b00] transition-colors">
                  BALLOON TRACKPANTS
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-1">
                  Relaxed balloon leg with tailored ankle cinch, extra deep pockets, and thick cotton elastic waistband.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">3 STYLES AVAILABLE</span>
                <Link
                  href="/shop?category=TRACKPANTS"
                  className="px-3.5 py-1.5 rounded-xl bg-[#ff6b00]/15 hover:bg-[#ff6b00] text-[#ff6b00] hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <span>SHOP TRACKPANTS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 6. SWEATERS (Solid Neon Electric Yellow) */}
            <div className="group relative rounded-3xl bg-slate-900/90 border-2 border-slate-800 hover:border-[#faff00] hover:shadow-neon-yellow p-5 transition-all flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-800">
                  <Image
                    src="/images/products/sweaters-1.jpg"
                    alt="Brushed Cotton Knit Sweaters"
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#faff00] text-[#05070c] font-mono font-black text-[10px] uppercase shadow-neon-yellow">
                    WAFFLE KNIT
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md font-mono text-xs font-bold text-[#00ff87]">
                    FROM ₹1,599
                  </div>
                </div>
                <h3 className="text-xl font-black uppercase text-white font-sans group-hover:text-[#faff00] transition-colors">
                  KNIT SWEATERS
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-1">
                  Thermal waffle-weave knit structure crafted with combed cotton yarns for lightweight warmth and durability.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">1 STYLE AVAILABLE</span>
                <Link
                  href="/shop?category=SWEATERS"
                  className="px-3.5 py-1.5 rounded-xl bg-[#faff00]/15 hover:bg-[#faff00] text-[#faff00] hover:text-[#05070c] font-mono text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <span>SHOP SWEATERS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: WINTER DROPS - "AW26 MATRIX" (PINK & ORANGE)  */}
      {/* ======================================================== */}
      <section id="winter" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#05070c] border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#ff007f]/10 border border-[#ff007f] text-[#ff007f] font-mono font-black text-xs uppercase tracking-widest mb-3 shadow-neon-pink-sm">
                <span>// 02 LIMITED RUN // WINTER MATRIX</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-sans tracking-tight">
                HEAVYWEIGHT FLEECE & OUTERWEAR
              </h2>
              <p className="text-slate-400 font-mono text-xs sm:text-sm mt-2">
                SUB-ZERO THERMAL PROTECTION // COMBED SILICON BIO-WASH // ZERO PILLING
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#ff007f] shadow-neon-pink-sm animate-ping" />
              <span>LIVE ATELIER STOCK: READY FOR DISPATCH</span>
            </div>
          </div>

          {/* 4 Featured Winter Drop Cards with Size Picker & Add to Bag */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {winterProducts.map((product) => {
              const selectedSize = selectedWinterSizes[product.id] || product.sizes[0] || 'L';

              return (
                <div
                  key={product.id}
                  className="rounded-3xl bg-[#090d16] border-2 border-slate-800 hover:border-[#ff007f] transition-all p-5 flex flex-col justify-between shadow-2xl group"
                >
                  <div>
                    {/* Image with Tag */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-900">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#ff007f] text-white font-mono font-black text-[9px] uppercase shadow-neon-pink-sm">
                        {product.specifications.gsm || '380 GSM'}
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 font-mono text-[10px] text-slate-300">
                        {product.colors[0]?.name || 'Pitch Black'}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-extrabold text-base text-white uppercase font-sans line-clamp-1 group-hover:text-[#ff007f] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans mt-1 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price in INR */}
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-xl font-black text-[#00ff87] font-mono">
                        {formatPrice(product.price)}
                      </span>
                      {product.compareAtPrice > product.price && (
                        <span className="text-xs text-slate-500 line-through font-mono">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>

                    {/* Size Selector Pills */}
                    <div className="mt-4">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1.5 font-bold">
                        SELECT SIZE:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.sizes.slice(0, 4).map((size) => (
                          <button
                            key={size}
                            onClick={() =>
                              setSelectedWinterSizes((prev) => ({ ...prev, [product.id]: size }))
                            }
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                              selectedSize === size
                                ? 'bg-[#ff007f] text-white border border-[#ff007f] shadow-neon-pink-sm'
                                : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-500'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Add to Bag Button */}
                  <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col gap-2">
                    <button
                      onClick={() => handleQuickAdd(product, selectedSize)}
                      className="w-full py-2.5 rounded-xl bg-[#00ff87] hover:bg-[#00f0ff] text-[#05070c] font-mono font-black text-xs uppercase flex items-center justify-center gap-2 shadow-neon transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>ADD TO BAG ({selectedSize})</span>
                    </button>
                    <Link
                      href={`/product/${product.id}`}
                      className="text-center font-mono text-[10px] text-slate-400 hover:text-white uppercase transition-colors"
                    >
                      VIEW TECH PACK →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: ATELIER SPECS - "FACTORY TELEMETRY" (LIME)    */}
      {/* ======================================================== */}
      <section id="atelier" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#080d1a] border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#00ff87]/10 border border-[#00ff87] text-[#00ff87] font-mono font-black text-xs uppercase tracking-widest mb-3 shadow-neon-sm">
                <span>// 03 MANUFACTURING TRANSPARENCY</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-sans tracking-tight">
                NEW DELHI ATELIER SPECIFICATIONS
              </h2>
              <p className="text-slate-400 font-mono text-xs sm:text-sm mt-2">
                PLOT 27, OKHLA PHASE 1, NEW DELHI - 110025 // 100% COMBED COTTON DIRECT RETAIL
              </p>
            </div>

            <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-[#00ff87]/40 text-[#00ff87] font-mono text-xs font-bold">
              GST & IEC CERTIFIED ATELIER
            </div>
          </div>

          {/* 6 Brutalist Technical Spec Modules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
            
            {/* Spec 1: Cotton Fiber (Lime) */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-slate-800 hover:border-[#00ff87] hover:shadow-neon transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-[#00ff87] uppercase tracking-wider">01 // RAW FIBER</span>
                <span className="w-2 h-2 rounded-full bg-[#00ff87] shadow-neon-sm" />
              </div>
              <h4 className="text-lg font-black text-white uppercase font-sans">
                100% COMBED RINGSPUN
              </h4>
              <p className="text-xs text-slate-300 font-sans mt-2">
                Long-staple Indian cotton carded and combed to strip away impurities and short fibers. Pre-treated with bio-enzymatic wash for zero residual shrinkage and silk-like hand feel.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400">
                0% SYNTHETIC FILLER // ORGANIC BIO-WASH
              </div>
            </div>

            {/* Spec 2: GSM Spectrum (Cyan) */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-slate-800 hover:border-[#00f0ff] hover:shadow-neon-cyan transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-[#00f0ff] uppercase tracking-wider">02 // FABRIC DENSITY</span>
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-neon-cyan-sm" />
              </div>
              <h4 className="text-lg font-black text-white uppercase font-sans">
                220 GSM TO 450 GSM
              </h4>
              <p className="text-xs text-slate-300 font-sans mt-2">
                Calibrated weight spectrum: 240 GSM for boxy summer drape, 380 GSM double-knit brushed fleece for all-day thermal retention, and 450 GSM ripstop for severe sub-zero weather.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400">
                LAB-CERTIFIED WEIGHT VERIFICATION
              </div>
            </div>

            {/* Spec 3: Stitch Integrity (Pink) */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-slate-800 hover:border-[#ff007f] hover:shadow-neon-pink transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-[#ff007f] uppercase tracking-wider">03 // SEAM ENGINEERING</span>
                <span className="w-2 h-2 rounded-full bg-[#ff007f] shadow-neon-pink-sm" />
              </div>
              <h4 className="text-lg font-black text-white uppercase font-sans">
                5-THREAD OVERLOCK
              </h4>
              <p className="text-xs text-slate-300 font-sans mt-2">
                Heavy industrial twin-needle topstitch across collar, cuffs, and hem. Bartacked stress points along pockets and fly zippers to withstand high-torque everyday wear.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400">
                1.25" HEAVY LYCRA-REINFORCED RIB
              </div>
            </div>

            {/* Spec 4: Logistics Telemetry (Yellow) */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-slate-800 hover:border-[#faff00] hover:shadow-neon-yellow transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-[#faff00] uppercase tracking-wider">04 // DISPATCH LOGISTICS</span>
                <span className="w-2 h-2 rounded-full bg-[#faff00] shadow-neon-yellow" />
              </div>
              <h4 className="text-lg font-black text-white uppercase font-sans">
                BLUEDART AIR EXPRESS
              </h4>
              <p className="text-xs text-slate-300 font-sans mt-2">
                Direct dispatch from Okhla Phase 1 facility within 24 hours. Free express shipping across India on all orders over ₹999. Live SMS tracking and tamper-proof security seals.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400">
                DELHI NCR 24H // METROS 48H
              </div>
            </div>

            {/* Spec 5: Tax & Legal (Orange) */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-slate-800 hover:border-[#ff6b00] hover:shadow-neon-orange transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-[#ff6b00] uppercase tracking-wider">05 // STATUTORY COMPLIANCE</span>
                <span className="w-2 h-2 rounded-full bg-[#ff6b00] shadow-neon-orange" />
              </div>
              <h4 className="text-lg font-black text-white uppercase font-sans">
                GSTIN & IEC REGISTERED
              </h4>
              <p className="text-xs text-slate-300 font-sans mt-2">
                Full 5% apparel GST input tax invoice issued with every order. Verified manufacturing license under Directorate of Industries, Govt. of NCT of Delhi.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400">
                OFFICIAL B2C & B2B TAX INVOICING
              </div>
            </div>

            {/* Spec 6: Wash & Longevity (Purple) */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-slate-800 hover:border-[#b026ff] hover:shadow-neon-purple transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-[#b026ff] uppercase tracking-wider">06 // FABRIC LONGEVITY</span>
                <span className="w-2 h-2 rounded-full bg-[#b026ff] shadow-neon-purple-sm" />
              </div>
              <h4 className="text-lg font-black text-white uppercase font-sans">
                100+ WASH STABILITY
              </h4>
              <p className="text-xs text-slate-300 font-sans mt-2">
                Dyed with colorfast reactive pigments resistant to fading and bleeding. Machine wash cold (30°C), tumble dry low. Engineered to maintain its boxy silhouette wash after wash.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400">
                ZERO SIDE-SEAM TORQUE / TWISTING
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 5: CATALOG - "FULL 18 STYLES INVENTORY" (YELLOW)  */}
      {/* ======================================================== */}
      <section id="catalog" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#05070c] border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#faff00]/10 border border-[#faff00] text-[#faff00] font-mono font-black text-xs uppercase tracking-widest mb-3 shadow-neon-yellow">
                <span>// 04 COMPLETE RETAIL CATALOG</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-sans tracking-tight">
                FULL APPAREL INVENTORY (18 STYLES)
              </h2>
              <p className="text-slate-400 font-mono text-xs sm:text-sm mt-2">
                DIRECT PURCHASE // PAN-INDIA EXPRESS SHIPPING // 7-DAY HASSLE-FREE EXCHANGE
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-[#faff00] text-slate-200 hover:text-[#faff00] font-mono text-xs font-bold transition-all"
            >
              <span>OPEN ADVANCED SHOP FILTERS</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category Filter Pills: Solid Neon Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none font-mono text-xs font-bold uppercase">
            {[
              { id: 'ALL', label: 'ALL STYLES (18)' },
              { id: 'HOODIES', label: 'HOODIES (4)' },
              { id: 'JACKETS', label: 'JACKETS (4)' },
              { id: 'T-SHIRTS', label: 'T-SHIRTS (3)' },
              { id: 'TRACKSUITS', label: 'TRACKSUITS (2)' },
              { id: 'TRACKPANTS', label: 'TRACKPANTS (3)' },
              { id: 'SWEATERS', label: 'SWEATERS (1)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCatalogCategory(cat.id)}
                className={`px-4 py-2 rounded-xl border whitespace-nowrap transition-all ${
                  catalogCategory === cat.id
                    ? 'bg-[#faff00] text-[#05070c] border-[#faff00] shadow-neon-yellow font-black'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-600 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-[#00ff87] p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:shadow-neon"
              >
                <div>
                  {/* Product Image */}
                  <Link href={`/product/${product.id}`} className="block relative aspect-square rounded-2xl overflow-hidden mb-3 bg-slate-800">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#ff007f] text-white font-mono font-black text-[9px] uppercase shadow-neon-pink-sm">
                        {product.badge}
                      </span>
                    )}
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[9px] text-[#00f0ff]">
                      {product.specifications.gsm?.split(' ')[0] || '100% COTTON'}
                    </span>
                  </Link>

                  {/* Category & Title */}
                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase block font-bold">
                    {product.category}
                  </span>
                  <Link href={`/product/${product.id}`} className="font-extrabold text-xs sm:text-sm text-white uppercase font-sans line-clamp-1 group-hover:text-[#00ff87] transition-colors mt-0.5">
                    {product.name}
                  </Link>

                  {/* Price */}
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-sm sm:text-base font-black text-[#00ff87] font-mono">
                      {formatPrice(product.price)}
                    </span>
                    {product.compareAtPrice > product.price && (
                      <span className="text-[10px] text-slate-500 line-through font-mono">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Add Button */}
                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => handleQuickAdd(product)}
                    className="flex-1 py-1.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-[#00ff87] text-slate-200 hover:text-[#05070c] font-mono font-black text-[10px] sm:text-xs uppercase flex items-center justify-center gap-1.5 transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>ADD</span>
                  </button>
                  <Link
                    href={`/product/${product.id}`}
                    className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title="View Details"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 6: BRUTALIST GEN-Z STREETWEAR FOOTER              */}
      {/* ======================================================== */}
      <footer className="w-full bg-[#04060a] text-slate-400 border-t border-slate-800 select-none">
        
        {/* Solid Multi-Neon Spectrum Stripe */}
        <div className="h-1 w-full flex">
          <div className="flex-1 bg-[#00ff87]" />
          <div className="flex-1 bg-[#00f0ff]" />
          <div className="flex-1 bg-[#ff007f]" />
          <div className="flex-1 bg-[#b026ff]" />
          <div className="flex-1 bg-[#faff00]" />
          <div className="flex-1 bg-[#ff6b00]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Col 1: Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-black text-white text-xs">
                  S
                </div>
                <span className="font-black text-sm tracking-wider text-white uppercase font-sans">
                  SLATE APPARELS
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct-to-consumer luxury retail streetwear atelier. 100% combed cotton, heavyweight fleece, selvedge twill, and technical outerwear.
              </p>
              <div className="mt-4 text-[11px] font-mono text-[#00ff87]">
                NEW DELHI // EST. 2026
              </div>
            </div>

            {/* Col 2: Navigation Anchors */}
            <div>
              <h5 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-3">
                // SECTIONS
              </h5>
              <div className="flex flex-col gap-2 text-xs font-mono">
                <button onClick={() => scrollToSection('hero')} className="text-left text-slate-400 hover:text-white transition-colors">
                  → 01 LOOKBOOK EDITORIAL
                </button>
                <button onClick={() => scrollToSection('collections')} className="text-left text-slate-400 hover:text-[#00f0ff] transition-colors">
                  → 02 CURATED COLLECTIONS
                </button>
                <button onClick={() => scrollToSection('winter')} className="text-left text-slate-400 hover:text-[#ff007f] transition-colors">
                  → 03 WINTER DROPS MATRIX
                </button>
                <button onClick={() => scrollToSection('atelier')} className="text-left text-slate-400 hover:text-[#00ff87] transition-colors">
                  → 04 ATELIER SPECS
                </button>
                <button onClick={() => scrollToSection('catalog')} className="text-left text-slate-400 hover:text-[#faff00] transition-colors">
                  → 05 FULL CATALOG (18)
                </button>
              </div>
            </div>

            {/* Col 3: Customer Care & Atelier Address */}
            <div>
              <h5 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-3">
                // ATELIER HOTLINE
              </h5>
              <div className="flex flex-col gap-2.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#00ff87]" />
                  <span>WhatsApp: +91 98112 00000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>care@slateapparels.com</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#ff007f] flex-shrink-0 mt-0.5" />
                  <span>Plot 27, Okhla Phase 1, New Delhi - 110025</span>
                </div>
              </div>
            </div>

            {/* Col 4: Trust & Dispatch Badges */}
            <div>
              <h5 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-3">
                // SATISFACTION
              </h5>
              <div className="flex flex-col gap-2 text-xs font-mono text-slate-400">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-bold text-[#00ff87] block">FREE DISPATCH OVER ₹999</span>
                  <span className="text-[10px]">Bluedart Express Priority Air</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-bold text-[#00f0ff] block">7-DAY EASY EXCHANGE</span>
                  <span className="text-[10px]">Doorstep reverse pickup across India</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Back to Top */}
          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <div>
              © 2026 SLATE APPARELS INC. ALL RIGHTS RESERVED. GST REGISTERED.
            </div>
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <span>BACK TO TOP</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* FIREBASE AUTH MODAL */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          router.push('/checkout');
        }}
      />
    </div>
  );
}