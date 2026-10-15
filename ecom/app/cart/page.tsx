'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Truck,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotalCount,
    cartSubtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    shippingFee,
    taxAmount,
    discountAmount,
    grandTotal,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  const freeShippingThreshold = 1999;
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Indicator Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
            <span className="text-[#047857] font-bold">1. SHOPPING BAG</span>
            <span>→</span>
            <span>2. ADDRESS & PAYMENT</span>
            <span>→</span>
            <span>3. CONFIRMATION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 uppercase font-sans tracking-tight">
            YOUR SHOPPING BAG ({cartTotalCount})
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200/90 shadow-soft max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-slate-300" />
            </div>
            <h2 className="text-xl font-bold font-mono text-slate-900 uppercase">
              YOUR BAG IS CURRENTLY EMPTY
            </h2>
            <p className="text-xs text-slate-500 mt-2 font-sans max-w-sm mx-auto">
              You haven&apos;t added any production drops yet. Explore our latest heavyweight hoodies and oversized tees.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-bold uppercase transition-all shadow-md"
            >
              <span>EXPLORE DROPS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Cart Items (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Shipping Bar */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-soft">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-slate-700 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#047857]" />
                    {amountNeeded === 0 ? (
                      <strong className="text-[#047857]">YOU QUALIFIED FOR FREE EXPRESS AIR FREIGHT!</strong>
                    ) : (
                      <span>
                        Add <strong className="text-slate-900">{formatPrice(amountNeeded)}</strong> more to unlock FREE Express Shipping!
                      </span>
                    )}
                  </span>
                  <span className="font-bold text-slate-900">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#05f26c] transition-all duration-300 shadow-neon-sm"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft divide-y divide-slate-100 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <Link href={`/product/${item.productId}`}>
                          <h3 className="font-bold text-sm text-slate-900 hover:text-[#047857] transition-colors truncate">
                            {item.name}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-red-500 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mt-1">
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-bold text-slate-800">
                          {item.size}
                        </span>
                        <span>•</span>
                        <span>{item.color}</span>
                        <span>•</span>
                        <span>{formatPrice(item.price)} each</span>
                      </div>

                      {/* Quantity & Line Total */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="px-2.5 py-1 text-slate-500 hover:bg-slate-200 text-xs font-bold"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 font-mono font-bold text-xs text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="px-2.5 py-1 text-slate-500 hover:bg-slate-200 text-xs font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-base font-mono font-extrabold text-slate-900">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-slate-500 pt-2">
                <Link href="/shop" className="hover:text-slate-900 flex items-center gap-1.5 font-bold">
                  <ArrowLeft className="w-4 h-4" />
                  <span>CONTINUE SHOPPING</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft space-y-5">
                <h3 className="font-mono font-bold text-base uppercase text-slate-900 border-b border-slate-100 pb-3">
                  ORDER SUMMARY
                </h3>

                {/* Promo Code Box */}
                <div>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#05f26c]/15 border border-[#05f26c]/30 text-xs font-mono">
                      <div className="flex items-center gap-2 text-[#047857]">
                        <Tag className="w-4 h-4" />
                        <span>
                          <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discountPercent}%)
                        </span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs font-bold text-red-600 hover:underline"
                      >
                        REMOVE
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="PROMO CODE"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono uppercase focus:outline-none focus:border-slate-800"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-slate-900 text-white font-mono text-xs font-bold rounded-lg hover:bg-slate-800"
                      >
                        APPLY
                      </button>
                    </form>
                  )}
                </div>

                {/* Breakdown */}
                <div className="space-y-2 text-xs font-mono border-t border-slate-100 pt-3">
                  <div className="flex justify-between text-slate-600">
                    <span>Bag Subtotal:</span>
                    <span className="font-bold text-slate-900">{formatPrice(cartSubtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#047857]">
                      <span>Discount Saved:</span>
                      <span className="font-bold">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600">
                    <span>Shipping Freight:</span>
                    <span>
                      {shippingFee === 0 ? <strong className="text-[#047857]">FREE</strong> : formatPrice(shippingFee)}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Apparel GST (5%):</span>
                    <span>{formatPrice(taxAmount)}</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-slate-950 pt-3 border-t border-slate-200">
                    <span>ESTIMATED TOTAL:</span>
                    <span className="text-lg text-slate-950 font-mono">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full py-4 rounded-xl bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lifted"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-[#047857]" />
                  <span>GST INVOICE • 256-BIT SSL ENCRYPTED</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
