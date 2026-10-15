'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, ShieldCheck } from 'lucide-react';

export default function CartDrawer() {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    closeCart,
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

  const [couponCode, setCouponCode] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 1999;
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none animate-in fade-in duration-200">
      {/* Dimmed Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between">
          
          {/* 1. Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0b0f19] text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#05f26c]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 font-mono">
                  YOUR BAG ({cartTotalCount})
                </h3>
                <span className="text-[10px] font-mono text-slate-500">READY FOR DISPATCH</span>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-200/60 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Free Shipping Progress Bar */}
          <div className="px-5 py-3 bg-slate-100/80 border-b border-slate-200">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-700 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#047857]" />
                {amountNeeded === 0 ? (
                  <strong className="text-[#047857]">YOU UNLOCKED FREE EXPRESS SHIPPING!</strong>
                ) : (
                  <span>
                    Add <strong className="text-slate-900">{formatPrice(amountNeeded)}</strong> more for FREE shipping
                  </span>
                )}
              </span>
              <span className="font-bold text-slate-900">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#05f26c] transition-all duration-300 shadow-neon-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 3. Cart Items Scroll View */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8 text-slate-300" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 font-mono text-sm uppercase">Your bag is empty</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Explore our latest heavyweight hoodies, drop shoulder t-shirts, and technical outerwear.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-lg bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-bold transition-all shadow-md"
                >
                  EXPLORE DROPS
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 rounded-lg bg-slate-200 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-slate-900 truncate leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 mt-1">
                        <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-semibold text-slate-700">
                          {item.size}
                        </span>
                        <span>•</span>
                        <span className="truncate">{item.color}</span>
                      </div>
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                      <div className="flex items-center border border-slate-200 bg-white rounded-md overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="px-2 py-1 text-slate-500 hover:bg-slate-100 transition-colors text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="px-2 py-1 text-slate-500 hover:bg-slate-100 transition-colors text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-slate-900">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[10px] font-mono text-slate-400">
                            {formatPrice(item.price)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 4. Footer & Checkout Actions (Visible only if cart has items) */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
              {/* Promo Coupon Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#05f26c]/15 border border-[#05f26c]/30 text-xs font-mono">
                    <div className="flex items-center gap-2 text-[#047857]">
                      <Tag className="w-4 h-4" />
                      <span>
                        CODE: <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discountPercent}%)
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
                      placeholder="Promo code (e.g. NEON10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg font-mono uppercase focus:outline-none focus:border-slate-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-800 text-white hover:bg-slate-900 font-mono text-xs font-bold rounded-lg transition-colors"
                    >
                      APPLY
                    </button>
                  </form>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs font-mono pt-2 border-t border-slate-200">
                <div className="flex justify-between text-slate-600">
                  <span>Bag Subtotal:</span>
                  <span className="font-semibold text-slate-900">{formatPrice(cartSubtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#047857]">
                    <span>Coupon Discount:</span>
                    <span className="font-bold">-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Shipping Freight:</span>
                  <span>{shippingFee === 0 ? <strong className="text-[#047857]">FREE</strong> : formatPrice(shippingFee)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Estimated GST (5%):</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>

                <div className="flex justify-between text-sm font-bold text-slate-950 pt-2 border-t border-slate-200">
                  <span>GRAND TOTAL:</span>
                  <span className="text-base text-slate-950 font-mono">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 rounded-xl bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lifted"
                >
                  <span>CHECKOUT NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#047857]" />
                  <span>256-BIT ENCRYPTED RAZORPAY & UPI READY</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
