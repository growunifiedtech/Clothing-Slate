'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Mail, Phone, MapPin, Truck, RefreshCw, Lock, MessageSquare } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function Footer() {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showToast('Thank you! You are now subscribed to Slate retail drop alerts.');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#090d16] text-slate-300 border-t border-slate-800 select-none relative">
      {/* Top Multi-Neon Gradient Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#ff007f] via-[#00f0ff] to-[#00ff87]" />

      {/* 4 Feature Value Props */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 border-b border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-dark-card hover:border-[#00f0ff]/50 hover:shadow-neon-cyan transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/15 text-[#00f0ff] flex items-center justify-center flex-shrink-0 shadow-neon-cyan-sm">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold uppercase text-white">PAN-INDIA DISPATCH</h4>
              <p className="text-[11px] text-slate-400">Free delivery on orders ₹999+</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-dark-card hover:border-[#00ff87]/50 hover:shadow-neon transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#00ff87]/15 text-[#00ff87] flex items-center justify-center flex-shrink-0 shadow-neon-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold uppercase text-white">100% COMBED COTTON</h4>
              <p className="text-[11px] text-slate-400">220–450 GSM pure knitwear</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-dark-card hover:border-[#faff00]/50 hover:shadow-neon-yellow transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#faff00]/15 text-[#faff00] flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold uppercase text-white">EASY REPLACEMENT</h4>
              <p className="text-[11px] text-slate-400">7-day hassle-free size exchange</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-dark-card hover:border-[#ff007f]/50 hover:shadow-neon-pink transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#ff007f]/15 text-[#ff007f] flex items-center justify-center flex-shrink-0 shadow-neon-pink-sm">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold uppercase text-white">SECURE CHECKOUT</h4>
              <p className="text-[11px] text-slate-400">UPI, Cards, NetBanking & COD</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Manifesto (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center shadow-neon-pink-sm">
                <span className="text-white font-mono font-black text-sm">S</span>
                <span className="w-1 h-1 rounded-full bg-[#ff007f] ml-0.5 animate-pulse" />
              </div>
              <span className="font-extrabold text-lg tracking-wider text-white uppercase font-sans">
                SLATE APPARELS
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              WHERE IDEAS BECOME APPAREL. High-density combed cotton silhouettes, precision cut-and-sew manufacturing, and direct retail sales from New Delhi.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[#00f0ff]">GST REGISTERED</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[#00ff87]">UDYAM MSME</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[#ff007f]">EXPORT READY</span>
            </div>
          </div>

          {/* Catalog Categories (3 cols) with signature category colors */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <h5 className="font-bold uppercase tracking-wider text-white text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff007f]" />
              RETAIL COLLECTIONS
            </h5>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/shop?category=HOODIES" className="hover:text-[#ff007f] transition-colors">
                  Heavyweight Hoodies (340–420 GSM)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=JACKETS" className="hover:text-[#00f0ff] transition-colors">
                  Varsity, Puffer & Selvedge Denim
                </Link>
              </li>
              <li>
                <Link href="/shop?category=T-SHIRTS" className="hover:text-[#00ff87] transition-colors">
                  Drop Shoulder & Biowash Tees
                </Link>
              </li>
              <li>
                <Link href="/shop?category=TRACKSUITS" className="hover:text-[#b026ff] transition-colors">
                  Omniheat & Fleece Tracksuit Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=TRACKPANTS" className="hover:text-[#00bfff] transition-colors">
                  Balloon & Jogger Fit Trackpants
                </Link>
              </li>
              <li>
                <Link href="/shop?category=SWEATERS" className="hover:text-[#ff6b00] transition-colors">
                  Jacquard Knit Sweaters
                </Link>
              </li>
              <li>
                <Link href="/shop?category=BEANIES" className="hover:text-[#ff1493] transition-colors">
                  Ribbed Foldover Beanies
                </Link>
              </li>
            </ul>
          </div>

          {/* Dashboards & Support (2 cols) */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <h5 className="font-bold uppercase tracking-wider text-white text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
              MY ACCOUNT
            </h5>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/dashboard" className="text-slate-200 hover:text-[#ff007f] font-semibold flex items-center gap-1 transition-colors">
                  <span>Customer Portal</span>
                  <ArrowUpRight className="w-3 h-3 text-[#ff007f]" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=orders" className="hover:text-[#00f0ff] transition-colors">
                  Track My Order
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=wishlist" className="hover:text-[#ff007f] transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=addresses" className="hover:text-[#b026ff] transition-colors">
                  Saved Addresses
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <Link href="/admin" className="text-white font-bold hover:text-[#00f0ff] flex items-center gap-1.5 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse shadow-neon-cyan-sm" />
                  <span>Admin Console</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Business Coordinates (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="font-mono font-bold uppercase tracking-wider text-white text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
              NEW DELHI FACILITY & DESK
            </h5>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Plot No. 27, Basement, Street No. 19, Zakir Nagar, Okhla, New Delhi - 110025
            </p>

            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div>
                <span className="text-slate-500 block text-[10px]">PRIMARY RETAIL WHATSAPP:</span>
                <a
                  href="https://wa.me/919599084873"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold hover:text-[#00ff87] flex items-center gap-1 mt-0.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#00ff87]" />
                  <span>+91 9599084873</span>
                </a>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">SECONDARY WHATSAPP:</span>
                <a
                  href="https://wa.me/919758807721"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold hover:text-[#00f0ff] flex items-center gap-1 mt-0.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>+91 9758807721</span>
                </a>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">OFFICIAL EMAIL:</span>
                <a
                  href="mailto:slateapparels@gmail.com"
                  className="text-white hover:text-[#ff007f] font-semibold transition-colors"
                >
                  slateapparels@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div>
          © {new Date().getFullYear()} SLATE APPARELS. ALL RIGHTS RESERVED. RETAIL & DIRECT EXPORT.
        </div>
        <div className="flex items-center gap-4">
          <Link href="/shop" className="hover:text-[#00f0ff] transition-colors">
            SHOP RETAIL
          </Link>
          <span>•</span>
          <Link href="/dashboard" className="hover:text-[#ff007f] transition-colors">
            USER PORTAL
          </Link>
          <span>•</span>
          <Link href="/admin" className="text-[#00f0ff] font-bold hover:text-[#00ff87] transition-colors">
            ADMIN CONSOLE
          </Link>
        </div>
      </div>
    </footer>
  );
}
