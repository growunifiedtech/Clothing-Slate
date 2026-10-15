'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Mail, Phone, MapPin, Truck, RefreshCw, Lock } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function Footer() {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showToast('Thank you! You are now subscribed for VIP drop alerts.');
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-100 text-slate-800 border-t border-slate-200 pt-16 pb-12 select-none">
      {/* 4 Feature Value Props */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200/80 shadow-soft">
            <div className="w-10 h-10 rounded-lg bg-[#05f26c]/15 text-[#047857] flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold uppercase text-slate-900">PAN-INDIA AIR FREIGHT</h4>
              <p className="text-[11px] text-slate-500">Free delivery on orders ₹1,999+</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200/80 shadow-soft">
            <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/15 text-[#0e7490] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold uppercase text-slate-900">100% COMBED COTTON</h4>
              <p className="text-[11px] text-slate-500">Heavyweight 240–450 GSM knits</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200/80 shadow-soft">
            <div className="w-10 h-10 rounded-lg bg-[#b026ff]/15 text-[#7e22ce] flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold uppercase text-slate-900">B2B TIER DISCOUNTS</h4>
              <p className="text-[11px] text-slate-500">Auto savings up to 40% on bulk</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200/80 shadow-soft">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 text-amber-700 flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold uppercase text-slate-900">SECURE CHECKOUT</h4>
              <p className="text-[11px] text-slate-500">UPI, Cards, NetBanking & COD</p>
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
              <div className="w-7 h-7 rounded-md bg-[#0b0f19] flex items-center justify-center">
                <span className="text-white font-mono font-black text-sm">S</span>
                <span className="w-1 h-1 rounded-full bg-[#05f26c] ml-0.5" />
              </div>
              <span className="font-extrabold text-lg tracking-wider text-slate-900 uppercase">
                SLATE APPARELS
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Industrial apparel engineering, high-density combed cotton silhouettes, and private-label manufacturing headquartered in New Delhi. Direct to consumer and wholesale bulk supply.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-600">
              <span className="px-2 py-0.5 rounded bg-white border border-slate-200">GST COMPLIANT</span>
              <span className="px-2 py-0.5 rounded bg-white border border-slate-200">IEC EXPORT CERTIFIED</span>
              <span className="px-2 py-0.5 rounded bg-white border border-slate-200">UDYAM MSME</span>
            </div>
          </div>

          {/* Catalog Categories (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <h5 className="font-bold uppercase tracking-wider text-slate-900 text-[11px]">
              COLLECTIONS & DROPS
            </h5>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link href="/shop?category=HOODIES" className="hover:text-slate-900 transition-colors">
                  Heavyweight Hoodies (380 GSM)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=JACKETS" className="hover:text-slate-900 transition-colors">
                  Puffers & Varsity Jackets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=T-SHIRTS" className="hover:text-slate-900 transition-colors">
                  Drop Shoulder Oversized Tees
                </Link>
              </li>
              <li>
                <Link href="/shop?category=TRACKSUITS" className="hover:text-slate-900 transition-colors">
                  Thermal & Fleece Tracksuit Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=TRACKPANTS" className="hover:text-slate-900 transition-colors">
                  Balloon & Cargo Trackpants
                </Link>
              </li>
              <li>
                <Link href="/shop?category=SWEATERS" className="hover:text-slate-900 transition-colors">
                  Jacquard Knit Sweaters
                </Link>
              </li>
            </ul>
          </div>

          {/* Dashboards & Portals (2 cols) */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <h5 className="font-bold uppercase tracking-wider text-slate-900 text-[11px]">
              PORTALS & ACCESS
            </h5>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link href="/dashboard" className="hover:text-[#047857] font-semibold flex items-center gap-1">
                  <span>Customer Dashboard</span>
                  <ArrowUpRight className="w-3 h-3 text-[#05f26c]" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=orders" className="hover:text-slate-900 transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=wishlist" className="hover:text-slate-900 transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=quotes" className="hover:text-slate-900 transition-colors">
                  Custom Sample Quotes
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-200">
                <Link href="/admin" className="text-slate-900 font-bold hover:text-[#047857] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#05f26c]" />
                  <span>Admin Console</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact Desk (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="font-mono font-bold uppercase tracking-wider text-slate-900 text-[11px]">
              VIP DROP ALERTS
            </h5>
            <p className="text-xs text-slate-600">
              Receive secret release drops, limited stock notifications, and B2B volume pricing catalogs.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-1.5">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 font-sans"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-bold rounded-lg transition-all shadow-sm flex-shrink-0"
                >
                  JOIN
                </button>
              </div>
            </form>

            <div className="pt-2 text-xs font-mono text-slate-600 space-y-1">
              <div>
                <strong>WHATSAPP DESK:</strong>{' '}
                <a
                  href="https://wa.me/919599084873"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-900 font-bold hover:underline"
                >
                  +91 9599084873
                </a>
              </div>
              <div>
                <strong>SECONDARY DESK:</strong>{' '}
                <a
                  href="https://wa.me/919758807721"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-900 font-bold hover:underline"
                >
                  +91 9758807721
                </a>
              </div>
              <div className="text-[11px] text-slate-500">FACILITY: OKHLA IND. AREA, NEW DELHI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div>
          © {new Date().getFullYear()} SLATE APPARELS INC. ALL RIGHTS RESERVED. HIGH-PRECISION TEXTILES.
        </div>
        <div className="flex items-center gap-4">
          <Link href="/shop" className="hover:text-slate-900 transition-colors">
            SHOP STORE
          </Link>
          <span>•</span>
          <Link href="/dashboard" className="hover:text-slate-900 transition-colors">
            USER DASHBOARD
          </Link>
          <span>•</span>
          <Link href="/admin" className="text-slate-900 font-bold hover:text-[#047857] transition-colors">
            ADMIN DASHBOARD
          </Link>
        </div>
      </div>
    </footer>
  );
}
