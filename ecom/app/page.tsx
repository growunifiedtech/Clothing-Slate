'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { useAuth } from '@/lib/auth-context';
import AuthModal from '@/components/auth/AuthModal';
import {
  ShoppingBag,
  ArrowRight,
  X,
  ChevronDown,
} from 'lucide-react';

export default function SingleFullScreenLandingPage() {
  const router = useRouter();
  const { openCart, cartTotalCount } = useStore();
  const { user } = useAuth();

  // Navigation Drawers / Flyout Panels
  const [activeSection, setActiveSection] = useState<'COLLECTIONS' | 'WINTER' | 'ATELIER' | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleToggleSection = (section: 'COLLECTIONS' | 'WINTER' | 'ATELIER') => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden bg-[#05070c] text-slate-100 select-none">
      
      {/* ======================================================== */}
      {/* 1. BIG FULL-SCREEN HD LANDING PAGE IMAGE (WELL ALIGNED)   */}
      {/* ======================================================== */}
      <div className="absolute inset-0 w-full h-full bg-[#05070c] overflow-hidden">
        {/* Ambient atmospheric background layer to guarantee seamless studio edges on any display */}
        <div className="absolute inset-0 w-full h-full scale-105 blur-2xl opacity-35 pointer-events-none">
          <Image
            src="/images/hero-models-crew-wide-fullbody.jpg"
            alt=""
            fill
            unoptimized
            className="object-cover object-center"
          />
        </div>

        {/* High-Definition 4K Editorial Hero Image (Heads & Shoes 100% visible) */}
        <div className="relative w-full h-full">
          <Image
            src="/images/hero-models-crew-wide-fullbody.jpg"
            alt="Slate Apparels - 4 Streetwear Models (2 Women, 2 Men)"
            fill
            priority
            unoptimized
            className="object-cover object-[50%_58%]"
          />
        </div>

        {/* Subtle top vignette to ensure navbar text is razor-sharp */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#05070c]/85 via-[#05070c]/25 to-transparent pointer-events-none z-10" />
      </div>

      {/* ======================================================== */}
      {/* 2. ONLY THE CLEAN NAVBAR AT THE TOP                      */}
      {/* ======================================================== */}
      <div className="relative z-40 px-3 sm:px-6 lg:px-8 pt-4">
        <header className="max-w-7xl mx-auto rounded-2xl bg-[#090d16]/85 backdrop-blur-md border border-slate-800/80 px-4 sm:px-6 py-2.5 sm:py-3 shadow-2xl flex items-center justify-between gap-4">
          
          {/* Brand Mark */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-black text-white group-hover:border-[#00ff87] group-hover:shadow-neon transition-all">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-wider text-white uppercase font-sans leading-none">
                SLATE APPARELS
              </span>
              <span className="text-[8px] font-mono text-slate-400 uppercase mt-0.5 hidden xs:block">
                NEW DELHI // 100% COMBED COTTON
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Where each section opens) */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3 text-xs font-mono uppercase font-bold">
            <button
              onClick={() => handleToggleSection('COLLECTIONS')}
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
              onClick={() => handleToggleSection('WINTER')}
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
              onClick={() => handleToggleSection('ATELIER')}
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

          {/* Right Action Icons: Login / Profile + Bag */}
          <div className="flex items-center gap-2">
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
      {/* 3. EXPANDABLE SECTION DRAWERS OVER THE IMAGE             */}
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

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
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
