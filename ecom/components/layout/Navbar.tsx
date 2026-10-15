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
  Layers,
  ChevronDown,
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

  // Close search dropdown on click outside
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
    { label: 'CATALOG', href: '/shop' },
    { label: 'HOODIES', href: '/shop?category=HOODIES' },
    { label: 'JACKETS', href: '/shop?category=JACKETS' },
    { label: 'T-SHIRTS', href: '/shop?category=T-SHIRTS' },
    { label: 'TRACKSUITS', href: '/shop?category=TRACKSUITS' },
    { label: 'SWEATERS', href: '/shop?category=SWEATERS' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* 1. Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-[#0b0f19] flex items-center justify-center shadow-md group-hover:shadow-neon transition-all">
              <span className="text-white font-mono font-black text-lg tracking-tighter">S</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#05f26c] ml-0.5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-wider text-slate-900 uppercase">
                  SLATE
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-[#05f26c] text-[#0b0f19] shadow-neon-sm">
                  STORE
                </span>
              </div>
              <span className="text-[9px] font-mono tracking-widest text-slate-600 uppercase hidden sm:block">
                TECH-STREETWEAR // B2B & DIRECT
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
                  className={`py-1 transition-colors relative font-semibold ${
                    isActive
                      ? 'text-slate-950 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#05f26c]'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* 3. Global Role / Dashboard Switcher Pill (The 2 Dashboards Access) */}
          <div className="hidden md:flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono">
            <Link
              href="/"
              className={`px-3 py-1 rounded-full transition-all font-semibold flex items-center gap-1.5 ${
                pathname === '/' || pathname.startsWith('/shop') || pathname.startsWith('/product')
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <span>STORE</span>
            </Link>

            <Link
              href="/dashboard"
              className={`px-3 py-1 rounded-full transition-all font-semibold flex items-center gap-1.5 ${
                pathname.startsWith('/dashboard')
                  ? 'bg-[#0b0f19] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <User className="w-3 h-3 text-[#05f26c]" />
              <span>USER PORTAL</span>
            </Link>

            <Link
              href="/admin"
              className={`px-3 py-1 rounded-full transition-all font-semibold flex items-center gap-1.5 ${
                pathname.startsWith('/admin')
                  ? 'bg-[#05f26c] text-[#0b0f19] font-bold shadow-neon-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Shield className="w-3 h-3" />
              <span>ADMIN</span>
            </Link>
          </div>

          {/* 4. Search & Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Search Input with Instant Dropdown */}
            <div className="relative" ref={searchRef}>
              <div className="flex items-center border border-slate-200 bg-slate-50/80 rounded-full px-3 py-1.5 focus-within:border-slate-400 focus-within:bg-white focus-within:shadow-sm transition-all w-32 sm:w-48 lg:w-60">
                <Search className="w-3.5 h-3.5 text-slate-500 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search drops..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-500 focus:outline-none font-sans"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                    className="text-slate-500 hover:text-slate-700 text-xs"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Instant Search Dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 p-2 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] font-mono font-bold tracking-wider text-slate-500 px-2 py-1 uppercase">
                    Matching Products ({searchResults.length})
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
                        className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors group"
                      >
                        <div className="relative w-11 h-11 bg-slate-100 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900 truncate group-hover:text-[#047857]">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-mono font-bold text-slate-900">
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
                    className="block text-center text-[11px] font-mono font-bold text-[#047857] hover:underline pt-2 mt-1 border-t border-slate-100 uppercase"
                  >
                    View All Results →
                  </Link>
                </div>
              )}
            </div>

            {/* Wishlist Link */}
            <Link
              href="/dashboard?tab=wishlist"
              className="relative p-2 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0b0f19] text-white text-[9px] font-mono font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3 py-2 rounded-full bg-[#0b0f19] text-white hover:bg-slate-800 transition-all shadow-md group"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#05f26c] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono font-bold">{cartTotalCount}</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-950"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-6 space-y-5 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-xl font-mono text-xs">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-center bg-white rounded-lg font-bold text-slate-900 shadow-sm flex items-center justify-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-[#05f26c]" />
              USER PORTAL
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-center bg-[#05f26c] rounded-lg font-bold text-[#0b0f19] flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              ADMIN CONSOLE
            </Link>
          </div>

          <div className="flex flex-col space-y-3 font-mono text-sm tracking-wider uppercase font-semibold text-slate-700">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-slate-950 flex items-center justify-between border-b border-slate-100 pb-2"
              >
                <span>{link.label}</span>
                <span className="text-slate-400">→</span>
              </Link>
            ))}
          </div>

          <div className="pt-2 text-xs font-mono text-slate-600 flex justify-between items-center">
            <span>NEED B2B BULK SUPPORT?</span>
            <a
              href="https://wa.me/919599084873"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#047857] font-bold underline"
            >
              WHATSAPP DESK
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
