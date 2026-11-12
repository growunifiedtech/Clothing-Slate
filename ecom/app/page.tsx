'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { useAuth } from '@/lib/auth-context';
import { Product } from '@/lib/products-data';
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
  ChevronRight,
  Flame,
  MessageSquare,
  RefreshCw,
  Box,
} from 'lucide-react';

interface FlagshipDrop {
  id: string;
  dropNumber: string;
  title: string;
  subtitle: string;
  category: string;
  price: number;
  compareAtPrice: number;
  gsm: number;
  gsmLabel: string;
  fiber: string;
  fit: string;
  badge: string;
  badgeColor: string; // solid neon hex
  solidNeonColor: string; // main solid neon
  solidNeonName: string;
  bgSolid: string;
  textSolid: string;
  borderSolid: string;
  shadowSolid: string;
  secondarySolid: {
    hex: string;
    text: string;
    border: string;
    bg: string;
  };
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  batchCode: string;
  stockLeft: number;
  temperatureRange: string;
}

const FLAGSHIP_DROPS: FlagshipDrop[] = [
  {
    id: 'oversized-hoodies',
    dropNumber: 'DROP // 01',
    title: 'OVERSIZED HEAVY HOODIE',
    subtitle: 'Brushed Heavyweight Fleece with Architectural Double-Layered Hood',
    category: 'HOODIES',
    price: 1499,
    compareAtPrice: 2299,
    gsm: 380,
    gsmLabel: '380 GSM // EXTRA DENSE FLEECE',
    fiber: '100% COMBED RINGSPUN COTTON',
    fit: 'DRAMATIC BOXY // DROPPED SHOULDERS',
    badge: 'HOT RETAIL DROP',
    badgeColor: '#ff007f', // Solid Neon Pink
    solidNeonColor: '#ff007f',
    solidNeonName: 'pink',
    bgSolid: 'bg-[#ff007f]',
    textSolid: 'text-[#ff007f]',
    borderSolid: 'border-[#ff007f]',
    shadowSolid: 'shadow-neon-pink',
    secondarySolid: {
      hex: '#00ff87', // Solid Neon Lime
      text: 'text-[#00ff87]',
      border: 'border-[#00ff87]',
      bg: 'bg-[#00ff87]',
    },
    images: [
      '/images/products/oversized-hoodies-1.jpg',
      '/images/products/oversized-hoodies-2.jpg',
      '/images/products/hoodies-regular-fit-1.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Onyx Black', hex: '#0f1115' },
      { name: 'Heather Gray', hex: '#6b7280' },
      { name: 'Dusty Rose', hex: '#9d6b7b' },
      { name: 'Sage Green', hex: '#4a5d4e' },
    ],
    batchCode: 'DL-HD-380',
    stockLeft: 14,
    temperatureRange: '8°C — 18°C WINTER',
  },
  {
    id: 'denim-jackets',
    dropNumber: 'DROP // 02',
    title: 'SELVEDGE DENIM TRUCKER',
    subtitle: '14 Oz Rigid Selvedge Twill with Antiqued Solid Brass Hardware',
    category: 'JACKETS',
    price: 1699,
    compareAtPrice: 2899,
    gsm: 420,
    gsmLabel: '14 OZ // 420 GSM RIGID TWILL',
    fiber: '100% PURE INDIGO RINGSPUN COTTON',
    fit: 'TAILORED INDUSTRIAL RELAXED',
    badge: 'WINTER SELVEDGE',
    badgeColor: '#00f0ff', // Solid Neon Cyan
    solidNeonColor: '#00f0ff',
    solidNeonName: 'cyan',
    bgSolid: 'bg-[#00f0ff]',
    textSolid: 'text-[#00f0ff]',
    borderSolid: 'border-[#00f0ff]',
    shadowSolid: 'shadow-neon-cyan',
    secondarySolid: {
      hex: '#faff00', // Solid Neon Yellow
      text: 'text-[#faff00]',
      border: 'border-[#faff00]',
      bg: 'bg-[#faff00]',
    },
    images: [
      '/images/products/denim-jackets-1.jpg',
      '/images/products/denim-jackets-2.jpg',
      '/images/products/denim-jackets-3.jpg',
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Deep Indigo', hex: '#1e293b' },
      { name: 'Washed Stone', hex: '#475569' },
      { name: 'Raw Black', hex: '#0a0a0a' },
    ],
    batchCode: 'DL-DM-14OZ',
    stockLeft: 9,
    temperatureRange: '10°C — 22°C ALL SEASON',
  },
  {
    id: 'puffer-jackets',
    dropNumber: 'DROP // 03',
    title: 'THERMAL DOWN PUFFER',
    subtitle: 'Sub-Zero Micro-Fil Insulation with Matte Water-Repellent Ripstop',
    category: 'JACKETS',
    price: 2199,
    compareAtPrice: 3499,
    gsm: 450,
    gsmLabel: '450 GSM // EXTREME SUB-ZERO',
    fiber: 'MATTE HYDROPHOBIC DWR RIPSTOP',
    fit: 'STRUCTURED CROPPED PUFF',
    badge: 'SUB-ZERO SHIELD',
    badgeColor: '#ff6b00', // Solid Neon Orange
    solidNeonColor: '#ff6b00',
    solidNeonName: 'orange',
    bgSolid: 'bg-[#ff6b00]',
    textSolid: 'text-[#ff6b00]',
    borderSolid: 'border-[#ff6b00]',
    shadowSolid: 'shadow-[0_0_25px_rgba(255,107,0,0.5)]',
    secondarySolid: {
      hex: '#00f0ff', // Solid Neon Cyan
      text: 'text-[#00f0ff]',
      border: 'border-[#00f0ff]',
      bg: 'bg-[#00f0ff]',
    },
    images: [
      '/images/products/puffer-jackets-1.jpg',
      '/images/products/puffer-jackets-2.jpg',
      '/images/products/puffer-jackets-3.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Matte Obsidian', hex: '#0f172a' },
      { name: 'Arctic Ice', hex: '#94a3b8' },
      { name: 'Earth Clay', hex: '#78350f' },
    ],
    batchCode: 'DL-PF-450',
    stockLeft: 7,
    temperatureRange: '2°C — 14°C WINTER PEAK',
  },
  {
    id: 'oversized-t-shirt-drop-shoulder',
    dropNumber: 'DROP // 04',
    title: 'DROP SHOULDER T-SHIRT',
    subtitle: '240 GSM Heavy Bio-Wash Cotton with 1.25" Lycra Ribbed High Collar',
    category: 'T-SHIRTS',
    price: 699,
    compareAtPrice: 1199,
    gsm: 240,
    gsmLabel: '240 GSM // HEAVYWEIGHT JERSEY',
    fiber: '100% COMBED COMPACT COTTON',
    fit: 'ARCHITECTURAL BOX CUT',
    badge: 'CORE ESSENTIAL',
    badgeColor: '#00ff87', // Solid Neon Lime
    solidNeonColor: '#00ff87',
    solidNeonName: 'lime',
    bgSolid: 'bg-[#00ff87]',
    textSolid: 'text-[#00ff87]',
    borderSolid: 'border-[#00ff87]',
    shadowSolid: 'shadow-neon',
    secondarySolid: {
      hex: '#b026ff', // Solid Neon Purple
      text: 'text-[#b026ff]',
      border: 'border-[#b026ff]',
      bg: 'bg-[#b026ff]',
    },
    images: [
      '/images/products/oversized-t-shirt-drop-shoulder-1.jpg',
      '/images/products/oversized-t-shirt-drop-shoulder-2.jpg',
      '/images/products/biowash-t-shirt-1.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Sage Olive', hex: '#63705d' },
      { name: 'Pitch Black', hex: '#111317' },
      { name: 'Slate Smoke', hex: '#718096' },
      { name: 'Chalk White', hex: '#f7fafc' },
    ],
    batchCode: 'DL-TS-240',
    stockLeft: 28,
    temperatureRange: '18°C — 36°C ALL SEASON',
  },
  {
    id: 'omniheat-tracksuits',
    dropNumber: 'DROP // 05',
    title: 'OMNIHEAT THERMAL SET',
    subtitle: 'Thermal Metallic Lining with Double-Knit High-Neck Wind Protection',
    category: 'TRACKSUITS',
    price: 2299,
    compareAtPrice: 3599,
    gsm: 340,
    gsmLabel: '340 GSM // REFLECTIVE THERMAL',
    fiber: 'INTERLOCK THERMAL COMPOSITE',
    fit: 'STREET ATHLETIC TAPER',
    badge: 'THERMAL MATRIX',
    badgeColor: '#b026ff', // Solid Neon Purple
    solidNeonColor: '#b026ff',
    solidNeonName: 'purple',
    bgSolid: 'bg-[#b026ff]',
    textSolid: 'text-[#b026ff]',
    borderSolid: 'border-[#b026ff]',
    shadowSolid: 'shadow-neon-purple',
    secondarySolid: {
      hex: '#ff007f', // Solid Neon Pink
      text: 'text-[#ff007f]',
      border: 'border-[#ff007f]',
      bg: 'bg-[#ff007f]',
    },
    images: [
      '/images/products/omniheat-tracksuits-1.jpg',
      '/images/products/omniheat-tracksuits-2.jpg',
      '/images/products/omniheat-tracksuits-3.jpg',
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Stealth Black', hex: '#0a0a0a' },
      { name: 'Silver Charcoal', hex: '#374151' },
      { name: 'Navy Cobalt', hex: '#1e3a8a' },
    ],
    batchCode: 'DL-TK-340',
    stockLeft: 11,
    temperatureRange: '5°C — 16°C WINTER RUN',
  },
];

export default function SingleFullScreenLandingPage() {
  const router = useRouter();
  const { products, addToCart, isInWishlist, toggleWishlist, openCart, showToast } = useStore();
  const { user } = useAuth();

  // Active Drop state
  const [activeDropIndex, setActiveDropIndex] = useState(0);
  const activeDrop = FLAGSHIP_DROPS[activeDropIndex];

  // Active angle image index
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Selected options for purchasing
  const [selectedSize, setSelectedSize] = useState<string>(activeDrop.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(activeDrop.colors[0]?.name || '');

  // Sound effects toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Modals
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Feedback animation state
  const [justAdded, setJustAdded] = useState(false);

  // Reset selected options when switching drops
  useEffect(() => {
    setActiveImageIdx(0);
    setSelectedSize(activeDrop.sizes[0] || 'M');
    setSelectedColor(activeDrop.colors[0]?.name || '');
  }, [activeDropIndex, activeDrop]);

  // Find linked product in store data
  const storeProduct = useMemo(() => {
    return products.find((p) => p.id === activeDrop.id) || products[0];
  }, [products, activeDrop.id]);

  const isFavorite = isInWishlist(storeProduct?.id || activeDrop.id);

  // Web Audio click synthesizer (Zero external dependencies)
  const playClickSound = (pitch = 440) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {
      // Audio autoplay policy catch
    }
  };

  const handleSelectDrop = (index: number) => {
    playClickSound(520);
    setActiveDropIndex(index);
  };

  const handleSelectAngle = (idx: number) => {
    playClickSound(480);
    setActiveImageIdx(idx);
  };

  const handleSelectSize = (s: string) => {
    playClickSound(580);
    setSelectedSize(s);
  };

  const handleSelectColor = (c: string) => {
    playClickSound(540);
    setSelectedColor(c);
  };

  const handleAddToCart = () => {
    playClickSound(640);
    if (storeProduct) {
      addToCart(storeProduct, selectedSize, selectedColor, 1);
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleBuyNow = () => {
    playClickSound(720);
    if (storeProduct) {
      addToCart(storeProduct, selectedSize, selectedColor, 1);
    }
    if (!user) {
      setShowAuthModal(true);
    } else {
      router.push('/checkout');
    }
  };

  const handleToggleFavorite = () => {
    playClickSound(600);
    toggleWishlist(storeProduct?.id || activeDrop.id);
  };

  const discountPercent = Math.round(
    ((activeDrop.compareAtPrice - activeDrop.price) / activeDrop.compareAtPrice) * 100
  );

  return (
    <div className="relative w-full min-h-[calc(100dvh-5.5rem)] lg:h-[calc(100dvh-5.5rem)] lg:overflow-hidden bg-[#05070c] text-slate-100 flex flex-col justify-between select-none">
      
      {/* 1. TOP SOLID NEON COMMAND STRIP */}
      <div className="border-b border-slate-850 bg-[#080c14] px-3 sm:px-6 py-2 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#ff007f] text-[#05070c] font-black text-[10px] tracking-wider flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            FLAGSHIP DROP {activeDropIndex + 1}/5
          </span>
          <span className="hidden sm:inline text-slate-400 text-[11px]">
            ATELIER // <strong className="text-white">OKHLA, NEW DELHI</strong>
          </span>
          <span className="text-slate-600 hidden md:inline">•</span>
          <span className="hidden md:inline text-[11px] text-[#00ff87] font-bold">
            100% COMBED COTTON DIRECT RETAIL
          </span>
          <span className="text-slate-600 hidden lg:inline">•</span>
          <span className="hidden lg:inline text-[11px] text-[#00f0ff]">
            DISPATCH VIA BLUEDART AIR (₹0 OVER ₹999)
          </span>
        </div>

        {/* Audio Toggle & Quick Telemetry */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) playClickSound(600);
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase transition-all ${
              soundEnabled
                ? 'bg-[#faff00] text-[#05070c] shadow-neon-yellow'
                : 'bg-slate-900 text-slate-400 border border-slate-700'
            }`}
            title="Toggle Tactile Terminal Audio"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden xs:inline">{soundEnabled ? 'SFX ON' : 'SFX MUTED'}</span>
          </button>

          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-white hover:text-[#00ff87] transition-colors"
          >
            <span>CATALOG (18)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00ff87]" />
          </Link>
        </div>
      </div>

      {/* 2. MAIN FULL-SCREEN SHOWCASE GRID (3-COLUMN LUXURY TERMINAL) */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: DROP NAVIGATOR & TEXTILE MATRIX (3.5 COLS) */}
        {/* ======================================================== */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-3.5 lg:space-y-4">
          
          {/* Drop Navigation Tabs (5 Solid Neon Badges) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
              <span>SELECT FLAGSHIP SILHOUETTE</span>
              <span className="text-[#00f0ff]">5 RELEASES</span>
            </div>

            <div className="grid grid-cols-5 lg:grid-cols-1 gap-1.5">
              {FLAGSHIP_DROPS.map((drop, idx) => {
                const isActive = activeDropIndex === idx;
                return (
                  <button
                    key={drop.id}
                    onClick={() => handleSelectDrop(idx)}
                    className={`text-left p-2 sm:p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                      isActive
                        ? `${drop.bgSolid} text-[#05070c] ${drop.borderSolid} shadow-md font-black`
                        : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-black ${
                        isActive ? 'bg-[#05070c] text-white' : 'bg-slate-800 text-slate-300'
                      }`}>
                        0{idx + 1}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-wide truncate hidden lg:inline">
                        {drop.title}
                      </span>
                    </div>

                    <span className="hidden lg:inline text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold"
                          style={{
                            backgroundColor: isActive ? '#05070c' : drop.solidNeonColor,
                            color: isActive ? drop.solidNeonColor : '#05070c',
                          }}>
                      {drop.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Silhouette Identity & Price */}
          <div className="p-4 rounded-2xl bg-[#090d16] border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded shadow-sm"
                style={{ backgroundColor: activeDrop.solidNeonColor, color: '#05070c' }}
              >
                {activeDrop.badge}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                BATCH: <strong className="text-white">{activeDrop.batchCode}</strong>
              </span>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-sans leading-tight">
                {activeDrop.title}
              </h1>
              <p className="text-xs text-slate-300 font-sans mt-1 line-clamp-2">
                {activeDrop.subtitle}
              </p>
            </div>

            {/* Price Tag with Strikethrough & Solid Discount Pill */}
            <div className="flex items-baseline gap-2 pt-1 border-t border-slate-800">
              <span className="text-2xl sm:text-3xl font-mono font-black text-white">
                {formatPrice(activeDrop.price)}
              </span>
              <span className="text-xs font-mono text-slate-500 line-through">
                {formatPrice(activeDrop.compareAtPrice)}
              </span>
              <span
                className="text-[10px] font-mono font-black px-2 py-0.5 rounded uppercase ml-auto"
                style={{ backgroundColor: activeDrop.secondarySolid.hex, color: '#05070c' }}
              >
                SAVE {discountPercent}%
              </span>
            </div>
          </div>

          {/* Industrial Textile Matrix Gauge */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#090d16] border border-slate-800 space-y-2.5 text-xs font-mono">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase pb-1 border-b border-slate-800">
              <span className="flex items-center gap-1.5 text-white">
                <Layers className="w-3.5 h-3.5 text-[#00f0ff]" />
                TEXTILE SPEC MATRIX
              </span>
              <span className="text-[#00ff87]">OKHLA LOOMS</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[9px] text-slate-400 uppercase block">DENSITY</span>
                <span className="font-bold text-white block mt-0.5 truncate">{activeDrop.gsmLabel}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[9px] text-slate-400 uppercase block">FIBER</span>
                <span className="font-bold text-[#faff00] block mt-0.5 truncate">{activeDrop.fiber}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[9px] text-slate-400 uppercase block">SILHOUETTE</span>
                <span className="font-bold text-[#00f0ff] block mt-0.5 truncate">{activeDrop.fit}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[9px] text-slate-400 uppercase block">CLIMATE RATING</span>
                <span className="font-bold text-[#00ff87] block mt-0.5 truncate">{activeDrop.temperatureRange}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CENTER COLUMN: MASSIVE HIGH-FASHION HERO MEDIA (5 COLS)  */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center relative">
          
          {/* Main Visual Showcase Frame */}
          <div
            className="relative w-full max-w-md aspect-[4/5] sm:aspect-[4/5] rounded-3xl overflow-hidden bg-slate-900 border-2 transition-all duration-300 shadow-2xl group"
            style={{ borderColor: activeDrop.solidNeonColor }}
          >
            {/* The High-Resolution Photography */}
            <Image
              src={activeDrop.images[activeImageIdx] || activeDrop.images[0]}
              alt={activeDrop.title}
              fill
              priority
              unoptimized
              className="object-cover object-center transition-all duration-500 group-hover:scale-105"
            />

            {/* Subtle bottom contrast scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none z-10">
              <span
                className="px-2.5 py-1 rounded text-[10px] font-mono font-black uppercase tracking-wider shadow-md"
                style={{ backgroundColor: activeDrop.solidNeonColor, color: '#05070c' }}
              >
                {activeDrop.dropNumber}
              </span>

              <button
                onClick={handleToggleFavorite}
                className="pointer-events-auto w-9 h-9 rounded-full bg-[#05070c]/80 backdrop-blur-md border border-slate-700 hover:border-[#ff007f] flex items-center justify-center transition-all shadow-md group/btn"
                title="Save to Wishlist"
              >
                <Heart
                  className={`w-4 h-4 transition-transform active:scale-125 ${
                    isFavorite ? 'fill-[#ff007f] text-[#ff007f]' : 'text-slate-300 group-hover/btn:text-[#ff007f]'
                  }`}
                />
              </button>
            </div>

            {/* Floating Live Stock Velocity Pill (Bottom Left) */}
            <div className="absolute bottom-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#05070c]/90 border border-slate-700 text-[10px] font-mono font-bold text-white shadow-lg backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#ff007f] animate-ping" />
                <span>ONLY {activeDrop.stockLeft} PIECES IN ATELIER</span>
              </span>
            </div>

            {/* Quick Look Inspect Button (Bottom Right) */}
            <div className="absolute bottom-4 right-4 z-10">
              <button
                onClick={() => setQuickViewProduct(storeProduct)}
                className="p-2.5 rounded-xl bg-[#05070c]/90 border border-slate-700 hover:border-[#00f0ff] text-slate-200 hover:text-[#00f0ff] transition-all shadow-lg backdrop-blur-md flex items-center gap-1 text-[11px] font-mono font-bold"
                title="Full Technical View"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">SPECS</span>
              </button>
            </div>
          </div>

          {/* Interactive Multi-Angle Angle Switcher Under Photo */}
          <div className="flex items-center gap-2 mt-3 z-10">
            {activeDrop.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectAngle(idx)}
                className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all flex items-center gap-1.5 ${
                  activeImageIdx === idx
                    ? 'bg-white text-[#05070c] font-black shadow-md'
                    : 'bg-[#090d16] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: activeImageIdx === idx ? activeDrop.solidNeonColor : '#64748b' }} />
                <span>ANGLE 0{idx + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: PURCHASING TERMINAL & FIT ACTIONS (3.5 C)   */}
        {/* ======================================================== */}
        <div className="lg:col-span-3 xl:col-span-4 space-y-3.5 lg:space-y-4">
          
          {/* 1. Size Selector */}
          <div className="p-4 rounded-2xl bg-[#090d16] border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase">
              <span className="text-white flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-[#00ff87]" />
                SELECT SILHOUETTE SIZE
              </span>
              <span className="text-slate-400 text-[10px]">RETAIL PRE-SHRUNK</span>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {activeDrop.sizes.map((s) => {
                const isSelected = selectedSize === s;
                return (
                  <button
                    key={s}
                    onClick={() => handleSelectSize(s)}
                    className={`py-2 rounded-xl text-xs font-mono font-black uppercase transition-all border ${
                      isSelected
                        ? `${activeDrop.bgSolid} text-[#05070c] ${activeDrop.borderSolid} shadow-md`
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            {/* 2. Colorway Swatches */}
            <div className="pt-2 border-t border-slate-800 space-y-1.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                FACTORY DYE: <strong className="text-white">{selectedColor}</strong>
              </span>
              <div className="flex flex-wrap gap-2">
                {activeDrop.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => handleSelectColor(c.name)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-all ${
                      selectedColor === c.name
                        ? 'border-white bg-slate-800 text-white font-bold'
                        : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-white/40 flex-shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-[10px]">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Primary Purchasing CTA Actions */}
          <div className="space-y-2.5">
            {/* Express Buy Button (Triggers Firebase Auth modal or Checkout directly) */}
            <button
              onClick={handleBuyNow}
              className="w-full py-4 rounded-xl bg-[#00ff87] hover:bg-[#00f0ff] text-[#05070c] hover:text-black font-mono text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-neon hover:shadow-neon-cyan active:scale-98"
            >
              <Zap className="w-4 h-4 fill-[#05070c]" />
              <span>⚡ BUY THIS PIECE (EXPRESS)</span>
            </button>

            {/* Add to Bag Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-3.5 rounded-xl border-2 font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-98 ${
                justAdded
                  ? 'bg-[#ff007f] text-white border-[#ff007f] shadow-neon-pink'
                  : 'bg-slate-900 hover:bg-[#ff007f] border-[#ff007f] text-[#ff007f] hover:text-white shadow-neon-pink-sm'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{justAdded ? '✓ ADDED TO BAG!' : `+ ADD TO BAG (${selectedSize})`}</span>
            </button>
          </div>

          {/* 4. Atelier Guarantee & Logistics Terminal */}
          <div className="p-3.5 rounded-2xl bg-[#090d16] border border-slate-800 space-y-2 text-[11px] font-mono text-slate-300">
            <div className="flex items-center gap-2 text-[#00f0ff]">
              <Truck className="w-4 h-4 flex-shrink-0 text-[#00f0ff]" />
              <span className="font-bold">FREE EXPRESS AIR FREIGHT OVER ₹999</span>
            </div>
            <div className="flex items-center gap-2 text-[#00ff87]">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-[#00ff87]" />
              <span>7-Day Doorstep Size Replacement</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 text-[#faff00]" />
              <span>GSTIN & IEC Verified Factory Invoice Included</span>
            </div>
          </div>

          {/* Quick WhatsApp Concierge Button */}
          <a
            href={`https://wa.me/919599084873?text=Hello%20Slate%20Apparels%2C%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(
              activeDrop.title
            )}%20in%20size%20${encodeURIComponent(selectedSize)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-slate-900/90 hover:bg-[#00ff87]/15 border border-[#00ff87]/50 text-[#00ff87] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-neon-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#00ff87]" />
            <span>WHATSAPP VIP CONCIERGE</span>
          </a>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. BOTTOM COMMAND BAR DOCK (DIRECT CATALOG PORTAL)       */}
      {/* ======================================================== */}
      <div className="border-t border-slate-850 bg-[#080c14] px-3 sm:px-6 py-2.5 z-20">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          
          {/* Quick Category Jump Pills (Solid Neons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
            <span className="text-[10px] text-slate-500 uppercase mr-1 hidden md:inline">QUICK JUMP:</span>
            {[
              { name: 'HOODIES', color: 'hover:border-[#ff007f] hover:text-[#ff007f]' },
              { name: 'JACKETS', color: 'hover:border-[#00f0ff] hover:text-[#00f0ff]' },
              { name: 'T-SHIRTS', color: 'hover:border-[#00ff87] hover:text-[#00ff87]' },
              { name: 'TRACKSUITS', color: 'hover:border-[#b026ff] hover:text-[#b026ff]' },
              { name: 'TRACKPANTS', color: 'hover:border-[#ff6b00] hover:text-[#ff6b00]' },
              { name: 'SWEATERS', color: 'hover:border-[#faff00] hover:text-[#faff00]' },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/shop?category=${cat.name}`}
                className={`px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300 ${cat.color} transition-all flex-shrink-0`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Primary View Catalog Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="hidden lg:flex items-center gap-2 text-[10px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-ping" />
              <span>LOOMS ACTIVE • OKHLA PHASE-1 NEW DELHI</span>
            </div>

            <Link
              href="/shop"
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-white hover:bg-[#00ff87] text-[#05070c] font-black uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-neon"
            >
              <span>BROWSE ALL 18 STYLES CATALOG</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* QUICK VIEW TECHNICAL MODAL */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* FIREBASE AUTH MODAL (TRIGGERED ON EXPRESS BUY IF UNLOGGED) */}
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
