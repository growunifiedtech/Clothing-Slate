'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { useAuth } from '@/lib/auth-context';
import { CATEGORIES_LIST, Product } from '@/lib/products-data';
import { formatPrice } from '@/lib/utils';
import ProductQuickViewModal from '@/components/store/ProductQuickViewModal';
import AuthModal from '@/components/auth/AuthModal';
import {
  ShoppingBag,
  Zap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Volume2,
  VolumeX,
  Eye,
  Heart,
  ShieldCheck,
  Truck,
  Ruler,
  Layers,
  X,
  SlidersHorizontal,
  Flame,
  MessageSquare,
  ChevronDown,
  ExternalLink,
  ChevronRight,
  Maximize2,
} from 'lucide-react';

interface ModelHotspot {
  id: string; // product id in store
  modelLabel: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice: number;
  specs: string;
  position: {
    left: string; // percentage across 0-100%
    top: string;  // percentage from top 0-100%
  };
  solidNeonColor: string; // hex
  solidNeonName: string;
  bgSolid: string;
  borderSolid: string;
  textSolid: string;
  shadowSolid: string;
  image: string;
  sizes: string[];
}

const MODEL_HOTSPOTS: ModelHotspot[] = [
  {
    id: 'oversized-hoodies',
    modelLabel: 'MODEL 01 // FEMALE',
    name: 'OVERSIZED HEAVY HOODIE',
    category: 'HOODIES',
    price: 1499,
    compareAtPrice: 2299,
    specs: '380 GSM // Brushed Heavy Fleece // Dropped Shoulders',
    position: { left: '16%', top: '38%' },
    solidNeonColor: '#ff007f', // Solid Neon Pink
    solidNeonName: 'pink',
    bgSolid: 'bg-[#ff007f]',
    borderSolid: 'border-[#ff007f]',
    textSolid: 'text-[#ff007f]',
    shadowSolid: 'shadow-neon-pink',
    image: '/images/products/oversized-hoodies-1.jpg',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },
  {
    id: 'denim-jackets',
    modelLabel: 'MODEL 02 // MALE',
    name: 'SELVEDGE DENIM TRUCKER',
    category: 'JACKETS',
    price: 1699,
    compareAtPrice: 2899,
    specs: '14 Oz Rigid Twill // Solid Brass Hardware // Selvedge ID',
    position: { left: '38%', top: '34%' },
    solidNeonColor: '#00f0ff', // Solid Neon Cyan
    solidNeonName: 'cyan',
    bgSolid: 'bg-[#00f0ff]',
    borderSolid: 'border-[#00f0ff]',
    textSolid: 'text-[#00f0ff]',
    shadowSolid: 'shadow-neon-cyan',
    image: '/images/products/denim-jackets-1.jpg',
    sizes: ['M', 'L', 'XL', '2XL'],
  },
  {
    id: 'puffer-jackets',
    modelLabel: 'MODEL 03 // FEMALE',
    name: 'THERMAL MATTE PUFFER',
    category: 'JACKETS',
    price: 2199,
    compareAtPrice: 3499,
    specs: '450 GSM Micro-Fil // Hydrophobic Ripstop // Storm Hood',
    position: { left: '62%', top: '36%' },
    solidNeonColor: '#ff6b00', // Solid Neon Orange
    solidNeonName: 'orange',
    bgSolid: 'bg-[#ff6b00]',
    borderSolid: 'border-[#ff6b00]',
    textSolid: 'text-[#ff6b00]',
    shadowSolid: 'shadow-[0_0_20px_rgba(255,107,0,0.6)]',
    image: '/images/products/puffer-jackets-1.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'oversized-t-shirt-drop-shoulder',
    modelLabel: 'MODEL 04 // MALE',
    name: 'DROP SHOULDER T-SHIRT',
    category: 'T-SHIRTS',
    price: 699,
    compareAtPrice: 1199,
    specs: '240 GSM Pure Combed Cotton // 1.25" Lycra Ribbed Collar',
    position: { left: '84%', top: '42%' },
    solidNeonColor: '#00ff87', // Solid Neon Lime
    solidNeonName: 'lime',
    bgSolid: 'bg-[#00ff87]',
    borderSolid: 'border-[#00ff87]',
    textSolid: 'text-[#00ff87]',
    shadowSolid: 'shadow-neon',
    image: '/images/products/oversized-t-shirt-drop-shoulder-1.jpg',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },
];

export default function SingleFullScreenLandingPage() {
  const router = useRouter();
  const { products, addToCart, isInWishlist, toggleWishlist, openCart, showToast, cartTotalCount } = useStore();
  const { user } = useAuth();

  // Active Hotspot Pin state (for mobile / desktop tap)
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>('oversized-hoodies');
  const [selectedSize, setSelectedSize] = useState<{ [key: string]: string }>({
    'oversized-hoodies': 'M',
    'denim-jackets': 'L',
    'puffer-jackets': 'M',
    'oversized-t-shirt-drop-shoulder': 'L',
  });

  // 3D Perspective Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Sound effects toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Section Panels / Flyout Drawers
  const [activeSection, setActiveSection] = useState<'COLLECTIONS' | 'LOOKBOOK' | 'ATELIER' | 'WINTER' | null>(null);

  // Modals
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [addedHotspotId, setAddedHotspotId] = useState<string | null>(null);

  // Web Audio click synthesizer
  const playClickSound = (pitch = 480) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.4, audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {}
  };

  // Mouse move 3D tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setTilt({
      x: Math.max(-10, Math.min(10, x * 14)), // tilt degree
      y: Math.max(-10, Math.min(10, -y * 14)),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleSelectHotspot = (id: string) => {
    playClickSound(520);
    setActiveHotspotId(activeHotspotId === id ? null : id);
  };

  const handleSelectSize = (hotspotId: string, size: string) => {
    playClickSound(600);
    setSelectedSize((prev) => ({ ...prev, [hotspotId]: size }));
  };

  const handleAddToCart = (hotspot: ModelHotspot) => {
    playClickSound(660);
    const prod = products.find((p) => p.id === hotspot.id);
    if (prod) {
      const size = selectedSize[hotspot.id] || hotspot.sizes[0];
      addToCart(prod, size, prod.colors[0]?.name || 'Standard', 1);
    }
    setAddedHotspotId(hotspot.id);
    setTimeout(() => setAddedHotspotId(null), 1500);
  };

  const handleBuyNow = (hotspot: ModelHotspot) => {
    playClickSound(740);
    const prod = products.find((p) => p.id === hotspot.id);
    if (prod) {
      const size = selectedSize[hotspot.id] || hotspot.sizes[0];
      addToCart(prod, size, prod.colors[0]?.name || 'Standard', 1);
    }
    if (!user) {
      setShowAuthModal(true);
    } else {
      router.push('/checkout');
    }
  };

  const handleOpenSection = (section: 'COLLECTIONS' | 'LOOKBOOK' | 'ATELIER' | 'WINTER') => {
    playClickSound(560);
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[100dvh] min-h-[640px] overflow-hidden bg-[#05070c] text-slate-100 select-none flex flex-col justify-between"
      style={{ perspective: '1200px' }}
    >
      {/* ======================================================== */}
      {/* 1. INTERACTIVE FULL-SCREEN 3D IMAGE CANVAS (THE 4 MODELS) */}
      {/* ======================================================== */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale3d(1.04, 1.04, 1.04)`,
        }}
      >
        {/* The Massive Photographic Campaign Lineup */}
        <Image
          src="/images/hero-models-crew.jpg"
          alt="Slate Apparels - 4 Models Streetwear Lineup (2 Women, 2 Men)"
          fill
          priority
          unoptimized
          className="object-cover object-center"
        />

        {/* Cinematic Vignette & Edge Scrim (Allows solid neon typography & pins to pop) */}
        <div className="absolute inset-0 bg-[#05070c]/30 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#05070c]/90 via-[#05070c]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05070c] via-[#05070c]/60 to-transparent pointer-events-none" />

        {/* Floating Architectural Background Watermark */}
        <div className="absolute top-1/4 inset-x-0 flex items-center justify-center pointer-events-none opacity-25">
          <span className="font-sans font-black text-6xl sm:text-9xl xl:text-[14rem] tracking-tighter text-white uppercase select-none">
            SLATE
          </span>
        </div>

        {/* ======================================================== */}
        {/* 2. THE 4 3D INTERACTIVE MODEL HOTSPOTS                   */}
        {/* ======================================================== */}
        {MODEL_HOTSPOTS.map((hotspot) => {
          const isSelected = activeHotspotId === hotspot.id;
          const isAdded = addedHotspotId === hotspot.id;
          const currentSize = selectedSize[hotspot.id] || hotspot.sizes[0];

          return (
            <div
              key={hotspot.id}
              className="absolute z-30 transition-all duration-300"
              style={{
                left: hotspot.position.left,
                top: hotspot.position.top,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Pulsing Solid Neon Pin Target */}
              <button
                onClick={() => handleSelectHotspot(hotspot.id)}
                className={`relative group p-2.5 rounded-full backdrop-blur-md border-2 transition-all flex items-center justify-center ${
                  isSelected
                    ? `${hotspot.bgSolid} text-[#05070c] ${hotspot.borderSolid} scale-125 shadow-lg`
                    : 'bg-[#05070c]/80 text-white border-slate-750 hover:scale-110'
                }`}
                style={{
                  boxShadow: isSelected ? `0 0 25px ${hotspot.solidNeonColor}` : undefined,
                }}
                title={`Inspect ${hotspot.name}`}
              >
                {/* Ping pulse wave around button */}
                <span
                  className="absolute inset-0 rounded-full animate-ping opacity-60"
                  style={{ backgroundColor: hotspot.solidNeonColor }}
                />
                <span className="relative font-mono font-black text-xs leading-none">
                  {isSelected ? '✕' : '+'}
                </span>
              </button>

              {/* Floating Solid Neon Mini Tag above Pin */}
              <div
                onClick={() => handleSelectHotspot(hotspot.id)}
                className={`cursor-pointer mt-1.5 px-2 py-0.5 rounded font-mono text-[9px] font-black uppercase tracking-wider shadow-md transition-all whitespace-nowrap ${
                  isSelected
                    ? `${hotspot.bgSolid} text-[#05070c]`
                    : 'bg-[#05070c]/90 text-white border border-slate-700 hover:border-white'
                }`}
              >
                {hotspot.name} // {formatPrice(hotspot.price)}
              </div>

              {/* 3D FLOATING PRODUCT CARD (EMERGES ON PIN CLICK) */}
              {isSelected && (
                <div
                  className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-64 sm:w-72 p-4 rounded-2xl bg-[#090d16]/95 backdrop-blur-xl border-2 text-white shadow-2xl z-40 animate-in fade-in zoom-in-95 duration-200"
                  style={{ borderColor: hotspot.solidNeonColor }}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span
                      className="text-[9px] font-mono font-black px-2 py-0.5 rounded uppercase"
                      style={{ backgroundColor: hotspot.solidNeonColor, color: '#05070c' }}
                    >
                      {hotspot.modelLabel}
                    </span>
                    <button
                      onClick={() => setActiveHotspotId(null)}
                      className="text-slate-400 hover:text-white text-xs font-mono"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-2.5">
                    <h3 className="font-mono font-black text-sm uppercase text-white leading-tight">
                      {hotspot.name}
                    </h3>
                    <p className="text-[10px] font-mono text-slate-300 mt-1 leading-snug">
                      {hotspot.specs}
                    </p>
                  </div>

                  {/* Price Row */}
                  <div className="flex items-baseline gap-2 mt-2 pt-2 border-t border-slate-800">
                    <span className="text-xl font-mono font-black text-white">
                      {formatPrice(hotspot.price)}
                    </span>
                    <span className="text-xs font-mono text-slate-500 line-through">
                      {formatPrice(hotspot.compareAtPrice)}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-[#00ff87] ml-auto">
                      IN STOCK
                    </span>
                  </div>

                  {/* Size Selector */}
                  <div className="mt-2.5">
                    <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block mb-1">
                      SELECT SIZE:
                    </span>
                    <div className="grid grid-cols-5 gap-1 text-[11px] font-mono">
                      {hotspot.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSelectSize(hotspot.id, s)}
                          className={`py-1 rounded-lg border font-bold transition-all ${
                            currentSize === s
                              ? `${hotspot.bgSolid} text-[#05070c] ${hotspot.borderSolid}`
                              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3 space-y-1.5">
                    <button
                      onClick={() => handleBuyNow(hotspot)}
                      className="w-full py-2.5 rounded-xl bg-[#00ff87] hover:bg-[#00f0ff] text-[#05070c] font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-neon"
                    >
                      <Zap className="w-3.5 h-3.5 fill-[#05070c]" />
                      <span>⚡ BUY NOW ({currentSize})</span>
                    </button>

                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => handleAddToCart(hotspot)}
                        className={`py-2 rounded-xl border text-[11px] font-mono font-bold uppercase transition-all ${
                          isAdded
                            ? 'bg-[#ff007f] text-white border-[#ff007f]'
                            : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                        }`}
                      >
                        {isAdded ? '✓ IN BAG' : '+ ADD TO BAG'}
                      </button>

                      <Link
                        href={`/product/${hotspot.id}`}
                        className="py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-[#00f0ff] text-[11px] font-mono font-bold uppercase text-center flex items-center justify-center gap-1"
                      >
                        <span>DETAILS</span>
                        <ChevronRight className="w-3 h-3 text-[#00f0ff]" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 3. TOP INTERACTIVE NAVBAR WHERE EACH SECTION OPENS       */}
      {/* ======================================================== */}
      <div className="relative z-40 px-3 sm:px-6 lg:px-8 pt-3">
        <header className="max-w-7xl mx-auto rounded-2xl bg-[#090d16]/90 backdrop-blur-xl border border-slate-800 px-4 sm:px-6 py-2.5 sm:py-3 shadow-2xl flex items-center justify-between gap-4">
          
          {/* Brand Mark */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-black text-white group-hover:border-[#00ff87] group-hover:shadow-neon transition-all">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-wider text-white uppercase font-sans leading-none">
                SLATE APPARELS
              </span>
              <span className="text-[8px] font-mono text-slate-400 uppercase mt-0.5">
                NEW DELHI // 100% COMBED COTTON
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Where each section opens) */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3 text-xs font-mono uppercase font-bold">
            <button
              onClick={() => handleOpenSection('COLLECTIONS')}
              className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                activeSection === 'COLLECTIONS'
                  ? 'bg-[#00f0ff] text-[#05070c] border-[#00f0ff] shadow-neon-cyan'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>COLLECTIONS</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeSection === 'COLLECTIONS' ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={() => handleOpenSection('WINTER')}
              className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                activeSection === 'WINTER'
                  ? 'bg-[#ff007f] text-white border-[#ff007f] shadow-neon-pink'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>WINTER DROPS</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeSection === 'WINTER' ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={() => handleOpenSection('LOOKBOOK')}
              className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                activeSection === 'LOOKBOOK'
                  ? 'bg-[#b026ff] text-white border-[#b026ff] shadow-neon-purple'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>3D LOOKBOOK</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeSection === 'LOOKBOOK' ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={() => handleOpenSection('ATELIER')}
              className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                activeSection === 'ATELIER'
                  ? 'bg-[#00ff87] text-[#05070c] border-[#00ff87] shadow-neon'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>ATELIER SPECS</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeSection === 'ATELIER' ? 'rotate-180' : ''}`} />
            </button>

            <Link
              href="/shop"
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-[#faff00] hover:text-[#faff00] transition-all"
            >
              CATALOG (18)
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playClickSound(600);
              }}
              className={`p-2 rounded-xl border transition-all ${
                soundEnabled
                  ? 'bg-[#faff00] text-[#05070c] border-[#faff00] shadow-neon-yellow'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
              title="Toggle Audio Feedback"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* User Profile / Firebase Auth Button */}
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
              className="relative px-3 py-1.5 sm:py-2 rounded-xl bg-[#00ff87] text-[#05070c] hover:bg-[#00f0ff] hover:text-black font-mono font-black text-xs uppercase flex items-center gap-1.5 transition-all shadow-neon hover:shadow-neon-cyan"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">BAG</span>
              {cartTotalCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#ff007f] text-white text-[9px] font-black flex items-center justify-center ml-0.5 shadow-neon-pink-sm">
                  {cartTotalCount}
                </span>
              )}
            </button>
          </div>
        </header>
      </div>

      {/* ======================================================== */}
      {/* 4. EXPANDABLE SECTION DRAWERS OVER THE 3D STAGE          */}
      {/* ======================================================== */}
      {activeSection && (
        <div className="absolute inset-x-3 sm:inset-x-6 lg:inset-x-8 top-20 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="max-w-7xl mx-auto rounded-3xl bg-[#090d16]/98 backdrop-blur-2xl border-2 border-slate-700 shadow-2xl p-5 sm:p-7 relative text-slate-100">
            {/* Close Button */}
            <button
              onClick={() => setActiveSection(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            {/* SECTION: COLLECTIONS */}
            {activeSection === 'COLLECTIONS' && (
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#00f0ff] block">
                      FACTORY SILHOUETTES
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black uppercase text-white font-sans">
                      CURATED APPAREL COLLECTIONS
                    </h2>
                  </div>
                  <Link
                    href="/shop"
                    onClick={() => setActiveSection(null)}
                    className="text-xs font-mono font-bold text-[#00f0ff] hover:underline flex items-center gap-1"
                  >
                    <span>VIEW ALL 18 STYLES</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  {[
                    { name: 'HOODIES', count: '4 Styles', color: 'border-[#ff007f] hover:bg-[#ff007f]/10 text-[#ff007f]', img: '/images/products/oversized-hoodies-1.jpg' },
                    { name: 'JACKETS', count: '4 Styles', color: 'border-[#00f0ff] hover:bg-[#00f0ff]/10 text-[#00f0ff]', img: '/images/products/denim-jackets-1.jpg' },
                    { name: 'T-SHIRTS', count: '3 Styles', color: 'border-[#00ff87] hover:bg-[#00ff87]/10 text-[#00ff87]', img: '/images/products/oversized-t-shirt-drop-shoulder-1.jpg' },
                    { name: 'TRACKSUITS', count: '2 Styles', color: 'border-[#b026ff] hover:bg-[#b026ff]/10 text-[#b026ff]', img: '/images/products/omniheat-tracksuits-1.jpg' },
                    { name: 'TRACKPANTS', count: '3 Styles', color: 'border-[#ff6b00] hover:bg-[#ff6b00]/10 text-[#ff6b00]', img: '/images/products/balloon-fit-trackpants-1.jpg' },
                    { name: 'SWEATERS', count: '1 Style', color: 'border-[#faff00] hover:bg-[#faff00]/10 text-[#faff00]', img: '/images/products/sweaters-1.jpg' },
                  ].map((cat) => (
                    <Link
                      key={cat.name}
                      href={`/shop?category=${cat.name}`}
                      onClick={() => setActiveSection(null)}
                      className={`group p-3 rounded-2xl bg-slate-900 border transition-all ${cat.color}`}
                    >
                      <div className="relative aspect-square rounded-xl overflow-hidden mb-2 bg-slate-800">
                        <Image
                          src={cat.img}
                          alt={cat.name}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="font-mono font-bold text-xs uppercase text-white group-hover:text-inherit">
                        {cat.name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        {cat.count}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION: WINTER DROPS */}
            {activeSection === 'WINTER' && (
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#ff007f] block">
                      AUTUMN/WINTER MATRIX
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black uppercase text-white font-sans">
                      HEAVYWEIGHT FLEECE & OUTERWEAR
                    </h2>
                  </div>
                  <Link
                    href="/shop?category=HOODIES"
                    onClick={() => setActiveSection(null)}
                    className="text-xs font-mono font-bold text-[#ff007f] hover:underline"
                  >
                    EXPLORE FLEECE →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-[#ff007f]/50">
                    <span className="text-[10px] font-bold text-[#ff007f] uppercase block">DENSE FLEECE</span>
                    <h4 className="text-base font-black text-white mt-1">380 GSM OVERSIZED HOODIE</h4>
                    <p className="text-xs text-slate-300 font-sans mt-1">Double-knit cotton with kangaroo pocket and tailored dropped shoulder.</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-black text-[#00ff87]">₹1,499</span>
                      <Link href="/product/oversized-hoodies" onClick={() => setActiveSection(null)} className="text-xs text-[#ff007f] hover:underline">
                        BUY NOW →
                      </Link>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-[#00f0ff]/50">
                    <span className="text-[10px] font-bold text-[#00f0ff] uppercase block">SELVEDGE TWILL</span>
                    <h4 className="text-base font-black text-white mt-1">14 OZ DENIM TRUCKER</h4>
                    <p className="text-xs text-slate-300 font-sans mt-1">Industrial heavy twill with antiqued solid brass hardware.</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-black text-[#00ff87]">₹1,699</span>
                      <Link href="/product/denim-jackets" onClick={() => setActiveSection(null)} className="text-xs text-[#00f0ff] hover:underline">
                        BUY NOW →
                      </Link>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-[#ff6b00]/50">
                    <span className="text-[10px] font-bold text-[#ff6b00] uppercase block">INSULATION</span>
                    <h4 className="text-base font-black text-white mt-1">450 GSM PUFFER JACKET</h4>
                    <p className="text-xs text-slate-300 font-sans mt-1">Down alternative sub-zero protection with matte ripstop.</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-black text-[#00ff87]">₹2,199</span>
                      <Link href="/product/puffer-jackets" onClick={() => setActiveSection(null)} className="text-xs text-[#ff6b00] hover:underline">
                        BUY NOW →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION: 3D LOOKBOOK */}
            {activeSection === 'LOOKBOOK' && (
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#b026ff] block">
                      CAMPAIGN VISUALS
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black uppercase text-white font-sans">
                      2026 EDITORIAL LOOKBOOK
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-slate-400">4 MODELS // OKHLA STUDIO</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {MODEL_HOTSPOTS.map((h) => (
                    <div key={h.id} className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 group">
                      <Image
                        src={h.image}
                        alt={h.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-transparent" />
                      <div className="absolute bottom-3 inset-x-3">
                        <span className="text-[9px] font-mono font-black uppercase text-[#00f0ff] block">
                          {h.modelLabel}
                        </span>
                        <h4 className="text-xs font-mono font-black text-white truncate">{h.name}</h4>
                        <span className="text-xs font-mono text-[#00ff87] font-bold">{formatPrice(h.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION: ATELIER SPECS */}
            {activeSection === 'ATELIER' && (
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#00ff87] block">
                      MANUFACTURING TELEMETRY
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black uppercase text-white font-sans">
                      NEW DELHI ATELIER SPECIFICATIONS
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-[#00ff87] font-bold">100% COMBED COTTON</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">COTTON ORIGIN</span>
                    <h4 className="font-bold text-white text-sm mt-1">100% COMBED RINGSPUN</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Long-staple fibers, pre-shrunk with silicon bio-wash for zero pilling.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">GSM SPECTRUM</span>
                    <h4 className="font-bold text-[#00f0ff] text-sm mt-1">220 GSM TO 450 GSM</h4>
                    <p className="text-[11px] text-slate-400 mt-1">From heavyweight boxy tees to dense brushed fleece outerwear.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">DISPATCH PROMISE</span>
                    <h4 className="font-bold text-[#00ff87] text-sm mt-1">BLUEDART EXPRESS AIR</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Free express delivery across India on all orders over ₹999.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">LEGAL COMPLIANCE</span>
                    <h4 className="font-bold text-[#faff00] text-sm mt-1">GST & IEC CERTIFIED</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Plot 27, Okhla Phase 1, New Delhi - 110025. Official tax invoice included.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. BOTTOM COMMAND TELEMETRY BAR                          */}
      {/* ======================================================== */}
      <div className="relative z-30 px-3 sm:px-6 lg:px-8 pb-3">
        <div className="max-w-7xl mx-auto rounded-2xl bg-[#090d16]/90 backdrop-blur-xl border border-slate-800 px-4 sm:px-6 py-2.5 sm:py-3 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          
          {/* Left: Model Guide Helper */}
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-ping" />
            <span className="text-[11px]">
              INTERACTIVE 3D CAMPAIGN: <strong className="text-white">TAP ANY [+] PIN ON THE 4 MODELS TO SHOP THEIR FIT</strong>
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <a
              href="https://wa.me/919599084873?text=Hello%20Slate%20Apparels%2C%20I%20have%20an%20inquiry%20regarding%20retail%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-[#00ff87] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#00ff87]" />
              <span className="text-[11px]">WHATSAPP (+91 9599084873)</span>
            </a>

            <Link
              href="/shop"
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#00ff87] text-[#05070c] font-black uppercase text-xs tracking-wider transition-all flex items-center gap-1.5 shadow-md hover:shadow-neon"
            >
              <span>BROWSE ALL 18 STYLES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* QUICK VIEW TECHNICAL MODAL */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

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
