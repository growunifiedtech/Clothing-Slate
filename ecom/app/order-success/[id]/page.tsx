'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { formatPrice, formatDate } from '@/lib/utils';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Printer,
  ShieldCheck,
  User,
  ShoppingBag,
} from 'lucide-react';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params?.id as string;
  const { getOrderById, orders } = useStore();

  const order = getOrderById(orderId) || orders[0];

  if (!order) {
    return (
      <div className="min-h-screen bg-[#06080e] py-20 text-center select-none text-white">
        <h2 className="text-xl font-bold font-mono">Order not found</h2>
        <Link href="/" className="text-xs font-mono text-[#00ff87] underline mt-2 block">
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#06080e] min-h-screen py-12 sm:py-16 select-none text-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Celebration Box */}
        <div className="bg-[#0b0f19] rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl text-center space-y-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-[#00ff87]/20 text-[#00ff87] border-2 border-[#00ff87] flex items-center justify-center mx-auto shadow-neon">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-mono font-bold tracking-widest text-[#00ff87] uppercase">
            <span>ORDER DISPATCH SCHEDULED</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white uppercase font-sans tracking-tight">
            ORDER CONFIRMED!
          </h1>

          <p className="text-sm text-slate-300 font-sans max-w-md mx-auto">
            Thank you, <strong className="text-white">{order.customer.name}</strong>. Your apparel shipment is scheduled for BlueDart air courier dispatch from Okhla, New Delhi.
          </p>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 max-w-sm mx-auto text-xs font-mono">
            <div className="text-slate-400 uppercase text-[10px]">OFFICIAL SLATE ORDER NUMBER</div>
            <div className="text-xl font-extrabold font-mono text-[#00ff87] my-1">
              #{order.id}
            </div>
            <div className="text-slate-300 font-semibold text-[11px] flex items-center justify-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#00ff87]" />
              <span>BlueDart Air AWB: {order.trackingNumber}</span>
            </div>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-[#0b0f19] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-mono font-bold text-sm uppercase text-white">
                SHIPMENT SPECIFICATIONS
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Placed on {formatDate(order.createdAt)} • Payment Method: {order.paymentMethod}
              </span>
            </div>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5 text-[#00ff87]" />
              <span>PRINT TAX INVOICE</span>
            </button>
          </div>

          {/* Delivery Recipient */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-slate-400 uppercase text-[10px] block mb-1">DESTINATION ADDRESS:</span>
              <strong className="text-white block">{order.customer.name}</strong>
              <span className="text-slate-300 font-sans">{order.customer.address}</span><br />
              <span className="text-slate-300 font-sans">{order.customer.city}, {order.customer.state} - {order.customer.pincode}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] block mb-1">TRACKING & CARRIER:</span>
              <strong className="text-white block">{order.carrier}</strong>
              <span className="text-slate-300 font-mono">Air Freight Tracking: {order.trackingNumber}</span><br />
              <span className="text-[#00ff87] font-bold">Estimated Delivery: 2-3 Business Days</span>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase block">
              ITEMS IN SHIPMENT ({order.items.length})
            </span>
            {order.items.map((it, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="relative w-12 h-14 rounded-lg bg-slate-950 overflow-hidden flex-shrink-0 border border-slate-800">
                  <Image src={it.image} alt={it.name} fill unoptimized className="object-cover" />
                </div>
                <div className="flex-1 min-w-0 text-xs font-mono">
                  <h4 className="font-bold text-white truncate">{it.name}</h4>
                  <span className="text-[10px] text-slate-400 block">
                    {it.quantity}x • Size {it.size} • {it.color}
                  </span>
                  <span className="font-bold text-[#00ff87]">{formatPrice(it.price * it.quantity)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Math */}
          <div className="pt-4 border-t border-slate-800 flex justify-between items-center font-mono">
            <div>
              <span className="text-xs text-slate-400 block">TOTAL REVENUE SETTLED (GST INCL.)</span>
              <span className="text-xl font-extrabold text-[#00ff87]">{formatPrice(order.total)}</span>
            </div>

            <div className="flex gap-2">
              <Link
                href="/dashboard"
                className="px-5 py-3 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold uppercase transition-all shadow-neon flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>VIEW IN DASHBOARD</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Continue Shopping CTA */}
        <div className="text-center mt-8">
          <Link
            href="/shop"
            className="text-xs font-mono font-bold text-slate-400 hover:text-[#00ff87] underline uppercase transition-colors"
          >
            ← CONTINUE BROWSING CATALOG
          </Link>
        </div>
      </div>
    </div>
  );
}
