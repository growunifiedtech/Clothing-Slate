'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { useAuth } from '@/lib/auth-context';
import { formatPrice } from '@/lib/utils';
import { CATEGORIES_LIST } from '@/lib/products-data';
import AuthModal from '@/components/auth/AuthModal';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Shield,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Sparkles,
  PhoneCall,
  SlidersHorizontal,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartTotalCount, wishlist, openCart, products } = useStore();
  const { user, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.fabric.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = CATEGORIES_LIST.filter((c) => c !== 'ALL');

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl select-none">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            
            {/* 1. Brand Logo */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-md group-hover:border-[#ff007f] group-hover:shadow-neon-pink transition-all">
                <span className="text-white font-mono font-black text-base sm:text-lg tracking-tighter">S</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#ff007f] via-[#00f0ff] to-[#00ff87] ml-0.5 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm sm:text-lg tracking-wider text-white uppercase font-sans">
                    SLATE APPARELS
                  </span>
                  <span className="text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0.5 rounded font-mono font-bold bg-gradient-to-r from-[#ff007f] to-[#b026ff] text-white shadow-neon-pink-sm hidden xs:inline-block">
                    RETAIL
                  </span>
                </div>
                <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-slate-400 uppercase hidden md:block">
                  NEW DELHI // 100% COMBED COTTON
                </span>
              </div>
            </Link>

            {/* 2. Desktop Navigation Links (Multi-Neon Spectrum) */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-mono tracking-widest uppercase">
              <Link
                href="/"
                className={`py-1 transition-colors font-bold ${
                  pathname === '/' ? 'text-[#00ff87]' : 'text-slate-300 hover:text-[#00ff87]'
                }`}
              >
                HOME
              </Link>

              <Link
                href="/shop"
                className={`py-1 transition-colors font-bold ${
                  pathname === '/shop' ? 'text-[#00f0ff]' : 'text-slate-300 hover:text-[#00f0ff]'
                }`}
              >
                COLLECTIONS
              </Link>

              {/* Categories Dropdown */}
              <div className="relative" ref={categoryMenuRef}>
                <button
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  className={`py-1 flex items-center gap-1 transition-colors font-bold ${
                    categoryDropdownOpen || pathname.includes('category')
                      ? 'text-[#ff007f]'
                      : 'text-slate-300 hover:text-[#ff007f]'
                  }`}
                >
                  <span>CATEGORIES</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoryDropdownOpen ? 'rotate-180 text-[#ff007f]' : ''}`} />
                </button>

                {categoryDropdownOpen && (
                  <div className="absolute left-0 top-full mt-3 w-64 bg-[#0d1320] border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="text-[10px] font-mono font-bold text-slate-400 uppercase px-3 py-1.5 border-b border-slate-800 flex justify-between items-center">
                      <span>Factory Silhouettes</span>
                      <Link
                        href="/shop"
                        onClick={() => setCategoryDropdownOpen(false)}
                        className="text-[#00f0ff] hover:underline"
                      >
                        VIEW ALL
                      </Link>
                    </div>

                    <div className="py-1">
                      {categories.map((cat) => {
                        const hoverColor =
                          cat.includes('HOODIE') ? 'hover:text-[#ff007f] hover:border-[#ff007f]' :
                          cat.includes('JACKET') ? 'hover:text-[#00f0ff] hover:border-[#00f0ff]' :
                          cat.includes('T-SHIRT') ? 'hover:text-[#00ff87] hover:border-[#00ff87]' :
                          cat.includes('TRACKSUIT') ? 'hover:text-[#b026ff] hover:border-[#b026ff]' :
                          cat.includes('SWEATER') ? 'hover:text-[#ff6b00] hover:border-[#ff6b00]' :
                          cat.includes('DENIM') ? 'hover:text-[#00bfff] hover:border-[#00bfff]' :
                          'hover:text-[#faff00] hover:border-[#faff00]';

                        return (
                          <Link
                            key={cat}
                            href={`/shop?category=${encodeURIComponent(cat)}`}
                            onClick={() => setCategoryDropdownOpen(false)}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono text-slate-300 hover:bg-slate-800/80 transition-colors ${hoverColor}`}
                          >
                            <span>{cat}</span>
                            <span className="text-[10px] text-slate-500">
                              {products.filter((p) => p.category === cat).length} drops
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* 3. Global Role Switcher Pill (Desktop) */}
            <div className="hidden xl:flex items-center p-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-mono">
              <Link
                href="/dashboard"
                className={`px-3 py-1 rounded-full transition-all font-bold flex items-center gap-1.5 ${
                  pathname.startsWith('/dashboard')
                    ? 'bg-gradient-to-r from-[#ff007f] to-[#ff2a85] text-white shadow-neon-pink-sm font-extrabold'
                    : 'text-slate-400 hover:text-[#ff007f]'
                }`}
              >
                <User className="w-3 h-3 text-[#ff007f]" />
                <span>USER PORTAL</span>
              </Link>

              <Link
                href="/admin"
                className={`px-3 py-1 rounded-full transition-all font-bold flex items-center gap-1.5 ${
                  pathname.startsWith('/admin')
                    ? 'bg-gradient-to-r from-[#00f0ff] to-[#00bfff] text-[#06080e] font-extrabold shadow-neon-cyan'
                    : 'text-slate-400 hover:text-[#00f0ff]'
                }`}
              >
                <Shield className="w-3 h-3 text-[#00f0ff]" />
                <span>ADMIN</span>
              </Link>
            </div>

            {/* 4. Action Icons: Search, Auth, Wishlist, Cart, Mobile Menu */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              
              {/* Desktop Search Bar (Hidden on small mobile) */}
              <div className="hidden sm:block relative" ref={searchRef}>
                <div className="flex items-center border border-slate-800 bg-slate-900/90 rounded-full px-3 py-1.5 focus-within:border-[#00f0ff] focus-within:shadow-neon-cyan-sm transition-all w-36 md:w-48 lg:w-56">
                  <Search className="w-3.5 h-3.5 text-slate-400 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search drops..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchOpen(true);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                    className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none font-sans"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setIsSearchOpen(false);
                      }}
                      className="text-slate-400 hover:text-white text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Instant Search Dropdown */}
                {isSearchOpen && searchResults.length > 0 && (
                  <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-[#0d1320] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 p-2 animate-in fade-in zoom-in-95 duration-150">
                    <div className="text-[10px] font-mono font-bold tracking-wider text-[#00f0ff] px-2 py-1 uppercase">
                      Matching Drops ({searchResults.length})
                    </div>
                    <div className="space-y-1">
                      {searchResults.map((item) => (
                        <Link
                          key={item.id}
                          href={`/product/${item.id}`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 p-2 hover:bg-slate-800/80 rounded-xl transition-colors group"
                        >
                          <div className="relative w-10 h-12 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700">
                            <Image
                              src={item.images[0]}
                              alt={item.name}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-100 truncate group-hover:text-[#00f0ff]">
                              {item.name}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-mono font-bold text-[#00ff87]">
                                {formatPrice(item.price)}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500 line-through">
                                {formatPrice(item.compareAtPrice)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="block text-center text-[11px] font-mono font-bold text-[#00f0ff] hover:underline pt-2 mt-1 border-t border-slate-800 uppercase"
                    >
                      View All Results →
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Search Icon Toggle (< sm) */}
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="sm:hidden p-2 rounded-full text-slate-300 hover:text-[#00f0ff] hover:bg-slate-800 transition-colors"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Firebase Auth Button / User Profile */}
              {user ? (
                <div className="relative flex items-center">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 hover:border-[#ff007f] hover:shadow-neon-pink-sm transition-all"
                    title="User Dashboard"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#ff007f] to-[#b026ff] text-white font-mono font-bold text-[10px] flex items-center justify-center shadow-sm">
                      {(user.displayName || user.email || user.phoneNumber || 'U').slice(0, 1).toUpperCase()}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-white max-w-[80px] truncate hidden md:inline">
                      {user.displayName || user.email?.split('@')[0] || user.phoneNumber}
                    </span>
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 hover:border-[#b026ff] text-slate-200 hover:text-[#c084fc] font-mono text-xs font-bold transition-all flex items-center gap-1.5"
                  title="Sign In / Register"
                >
                  <User className="w-3.5 h-3.5 text-[#b026ff]" />
                  <span className="hidden sm:inline">LOGIN</span>
                </button>
              )}

              {/* Wishlist Link with Neon Pink Accent */}
              <Link
                href="/dashboard?tab=wishlist"
                className="relative p-2 rounded-full text-slate-300 hover:text-[#ff007f] hover:bg-slate-800 transition-colors"
                title="Saved Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute 0 top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#ff007f] text-white text-[9px] font-mono font-black flex items-center justify-center shadow-neon-pink-sm">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Trigger Button with Neon Green/Cyan Accent */}
              <button
                onClick={openCart}
                className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-slate-900 border border-slate-700 text-white hover:border-[#00ff87] hover:shadow-neon-sm transition-all shadow-md group"
                title="View Bag"
              >
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00ff87] group-hover:scale-110 transition-transform" />
                <span className="text-xs font-mono font-bold text-[#00ff87]">{cartTotalCount}</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Open Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Full-Width Search Dropdown Bar */}
          {mobileSearchOpen && (
            <div className="sm:hidden pb-3 pt-1 border-t border-slate-800 animate-in slide-in-from-top-2 duration-150">
              <div className="flex items-center border border-slate-700 bg-slate-900 rounded-xl px-3 py-2 focus-within:border-[#00ff87]">
                <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search drops, hoodies, t-shirts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
                      setMobileSearchOpen(false);
                    }
                  }}
                  className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => {
                    if (searchQuery.trim()) {
                      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
                      setMobileSearchOpen(false);
                    } else {
                      setMobileSearchOpen(false);
                    }
                  }}
                  className="text-xs font-mono font-bold text-[#00ff87] uppercase ml-2"
                >
                  GO
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#090d16] border-b border-slate-800 px-4 py-5 space-y-4 animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
            
            {/* User Auth Card in Mobile Drawer */}
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#00ff87] text-[#06080e] font-mono font-black text-sm flex items-center justify-center">
                    {(user.displayName || user.email || 'U').slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {user.displayName || 'Client Account'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block truncate max-w-[170px]">
                      {user.email || user.phoneNumber}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#00ff87]" />
                  <span className="text-xs font-mono font-bold text-white">Client Portal Access</span>
                </div>
              )}

              {user ? (
                <button
                  onClick={logout}
                  className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>LOGOUT</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowAuthModal(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#00ff87] text-[#06080e] text-xs font-mono font-extrabold uppercase shadow-neon-sm"
                >
                  SIGN IN
                </button>
              )}
            </div>

            {/* Role Switcher Grid */}
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 text-center bg-slate-900 border border-slate-800 rounded-xl font-bold text-white flex items-center justify-center gap-1.5 hover:border-[#00ff87]"
              >
                <User className="w-3.5 h-3.5 text-[#00ff87]" />
                USER PORTAL
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 text-center bg-[#00f0ff] text-[#06080e] rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-neon-cyan"
              >
                <Shield className="w-3.5 h-3.5" />
                ADMIN CONSOLE
              </Link>
            </div>

            {/* Mobile Nav Links */}
            <div className="space-y-1 font-mono text-xs tracking-wider uppercase font-semibold text-slate-300 border-t border-slate-800 pt-3">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-2 hover:bg-slate-900 rounded-lg hover:text-[#00ff87]"
              >
                <span>HOME</span>
                <span className="text-slate-500">→</span>
              </Link>

              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-2 hover:bg-slate-900 rounded-lg hover:text-[#00ff87]"
              >
                <span>ALL COLLECTIONS</span>
                <span className="text-slate-500">→</span>
              </Link>

              {/* Mobile Categories Accordion */}
              <div>
                <button
                  onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                  className="w-full flex items-center justify-between py-2.5 px-2 hover:bg-slate-900 rounded-lg hover:text-[#00ff87]"
                >
                  <span>CATEGORIES</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileCategoryOpen ? 'rotate-180 text-[#00ff87]' : ''}`} />
                </button>

                {mobileCategoryOpen && (
                  <div className="pl-4 py-1 space-y-1 border-l-2 border-[#00ff87]/30 ml-2 mt-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        href={`/shop?category=${encodeURIComponent(cat)}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between py-1.5 px-2 text-[11px] text-slate-400 hover:text-[#00ff87]"
                      >
                        <span>{cat}</span>
                        <span className="text-[10px] text-slate-500">
                          {products.filter((p) => p.category === cat).length}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* WhatsApp Contact Button */}
            <div className="pt-3 text-xs font-mono text-slate-400 border-t border-slate-800 flex justify-between items-center">
              <span>RETAIL SUPPORT</span>
              <a
                href="https://wa.me/919599084873"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00ff87] font-bold underline flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                <span>+91 9599084873</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
    </>
  );
}
