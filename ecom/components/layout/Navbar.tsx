'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Shield,
  Menu,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartTotalCount, wishlist, openCart, products } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'COLLECTIONS', href: '/shop' },
    { label: 'HOODIES', href: '/shop?category=HOODIES' },
    { label: 'JACKETS', href: '/shop?category=JACKETS' },
    { label: 'T-SHIRTS', href: '/shop?category=T-SHIRTS' },
    { label: 'TRACKSUITS', href: '/shop?category=TRACKSUITS' },
    { label: 'SWEATERS', href: '/shop?category=SWEATERS' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl transition-all select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* 1. Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-md group-hover:border-[#00ff87] group-hover:shadow-neon transition-all">
              <span className="text-white font-mono font-black text-lg tracking-tighter">S</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] ml-0.5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-wider text-white uppercase font-sans">
                  SLATE APPARELS
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-[#00ff87] text-[#04060a] shadow-neon-sm">
                  RETAIL
                </span>
              </div>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase hidden sm:block">
                NEW DELHI // 100% COMBED COTTON
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono tracking-widest uppercase">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`py-1 transition-colors relative font-bold ${
                    isActive
                      ? 'text-[#00ff87] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#00ff87] after:shadow-neon-sm'
                      : 'text-slate-300 hover:text-[#00ff87]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* 3. Global Role / Dashboard Switcher Pill */}
          <div className="hidden md:flex items-center p-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-mono">
            <Link
              href="/"
              className={`px-3 py-1 rounded-full transition-all font-bold flex items-center gap-1.5 ${
                pathname === '/' || pathname.startsWith('/shop') || pathname.startsWith('/product')
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>STORE</span>
            </Link>

            <Link
              href="/dashboard"
              className={`px-3 py-1 rounded-full transition-all font-bold flex items-center gap-1.5 ${
                pathname.startsWith('/dashboard')
                  ? 'bg-[#00ff87] text-[#06080e] shadow-neon-sm font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3 h-3 text-[#00ff87]" />
              <span>USER PORTAL</span>
            </Link>

            <Link
              href="/admin"
              className={`px-3 py-1 rounded-full transition-all font-bold flex items-center gap-1.5 ${
                pathname.startsWith('/admin')
                  ? 'bg-[#00f0ff] text-[#06080e] font-extrabold shadow-neon-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-3 h-3" />
              <span>ADMIN</span>
            </Link>
          </div>

          {/* 4. Search & Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Search Input */}
            <div className="relative" ref={searchRef}>
              <div className="flex items-center border border-slate-800 bg-slate-900/90 rounded-full px-3 py-1.5 focus-within:border-[#00ff87] focus-within:shadow-neon-sm transition-all w-32 sm:w-44 lg:w-56">
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
                  <div className="text-[10px] font-mono font-bold tracking-wider text-[#00ff87] px-2 py-1 uppercase">
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
                        <div className="relative w-11 h-14 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700">
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-100 truncate group-hover:text-[#00ff87]">
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
                    className="block text-center text-[11px] font-mono font-bold text-[#00ff87] hover:underline pt-2 mt-1 border-t border-slate-800 uppercase"
                  >
                    View All In Catalog →
                  </Link>
                </div>
              )}
            </div>

            {/* Wishlist Link */}
            <Link
              href="/dashboard?tab=wishlist"
              className="relative p-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00ff87] text-[#06080e] text-[9px] font-mono font-black flex items-center justify-center shadow-neon-sm">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900 border border-slate-700 text-white hover:border-[#00ff87] transition-all shadow-md group"
              title="View Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#00ff87] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono font-bold">{cartTotalCount}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090d16] border-b border-slate-800 px-5 py-6 space-y-5 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-900 rounded-xl font-mono text-xs border border-slate-800">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-center bg-slate-800 rounded-lg font-bold text-white shadow-sm flex items-center justify-center gap-1.5 hover:text-[#00ff87]"
            >
              <User className="w-3.5 h-3.5 text-[#00ff87]" />
              USER PORTAL
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-center bg-[#00ff87] text-[#06080e] rounded-lg font-bold flex items-center justify-center gap-1.5 shadow-neon-sm"
            >
              <Shield className="w-3.5 h-3.5" />
              ADMIN CONSOLE
            </Link>
          </div>

          <div className="flex flex-col space-y-3 font-mono text-sm tracking-wider uppercase font-semibold text-slate-300">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#00ff87] flex items-center justify-between border-b border-slate-800/80 pb-2"
              >
                <span>{link.label}</span>
                <span className="text-slate-500">→</span>
              </Link>
            ))}
          </div>

          <div className="pt-2 text-xs font-mono text-slate-400 flex justify-between items-center border-t border-slate-800">
            <span>NEED RETAIL SUPPORT?</span>
            <a
              href="https://wa.me/919599084873"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00ff87] font-bold underline"
            >
              WHATSAPP DESK
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
