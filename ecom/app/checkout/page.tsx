'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore, Order } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Building,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  MapPin,
  User,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import AuthModal from '@/components/auth/AuthModal';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const {
    cart,
    cartSubtotal,
    shippingFee,
    taxAmount,
    discountAmount,
    grandTotal,
    placeOrder,
    userProfile,
    addresses,
  } = useStore();

  const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];

  // Form Fields initialized from real user profile or saved address if present
  const [name, setName] = useState(user?.displayName || userProfile.name || defaultAddr?.fullName || '');
  const [email, setEmail] = useState(user?.email || userProfile.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || userProfile.phone || defaultAddr?.phone || '');
  const [address, setAddress] = useState(defaultAddr?.street || '');
  const [city, setCity] = useState(defaultAddr?.city || '');
  const [state, setState] = useState(defaultAddr?.state || '');
  const [pincode, setPincode] = useState(defaultAddr?.pincode || '');

  // Payment & Options
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('UPI');
  const [shippingMethod, setShippingMethod] = useState<'AIR' | 'SURFACE'>('AIR');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if Firebase auth user loads or logs in
  useEffect(() => {
    if (user) {
      if (user.displayName && !name) setName(user.displayName);
      if (user.email && !email) setEmail(user.email);
      if (user.phoneNumber && !phone) setPhone(user.phoneNumber);
    }
  }, [user]);

  // Sync if profile or address loads from localStorage
  useEffect(() => {
    if (!name && (userProfile.name || defaultAddr?.fullName)) {
      setName(userProfile.name || defaultAddr?.fullName || '');
    }
    if (!email && userProfile.email) {
      setEmail(userProfile.email);
    }
    if (!phone && (userProfile.phone || defaultAddr?.phone)) {
      setPhone(userProfile.phone || defaultAddr?.phone || '');
    }
    if (!address && defaultAddr?.street) {
      setAddress(defaultAddr.street);
      setCity(defaultAddr.city);
      setState(defaultAddr.state);
      setPincode(defaultAddr.pincode);
    }
  }, [userProfile, defaultAddr, name, email, phone, address]);

  const applySavedAddress = (addr: (typeof addresses)[0]) => {
    setName(addr.fullName);
    setPhone(addr.phone);
    setAddress(addr.street);
    setCity(addr.city);
    setState(addr.state);
    setPincode(addr.pincode);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty');
      router.push('/shop');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder = placeOrder({
        customer: {
          name,
          email,
          phone,
          address,
          city,
          state,
          pincode,
        },
        paymentMethod,
        notes: orderNotes,
      });

      setIsSubmitting(false);
      router.push(`/order-success/${newOrder.id}`);
    }, 800);
  };

  return (
    <div className="bg-[#06080e] min-h-screen py-8 sm:py-12 select-none text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
            <Link href="/cart" className="hover:text-[#00ff87] transition-colors">
              1. SHOPPING BAG
            </Link>
            <span>→</span>
            <span className="text-[#00ff87] font-bold">2. ADDRESS & PAYMENT</span>
            <span>→</span>
            <span>3. CONFIRMATION</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white uppercase font-sans tracking-tight">
              EXPRESS RETAIL CHECKOUT
            </h1>

            {addresses.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Saved Address:</span>
                <button
                  type="button"
                  onClick={() => applySavedAddress(addresses[0])}
                  className="text-xs font-mono font-bold text-[#00ff87] bg-slate-900 hover:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-700 transition-all flex items-center gap-1.5 shadow-neon-sm"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>USE SAVED ({addresses[0].type})</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Customer Info & Payment Options (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Dispatch & Contact Info */}
              <div className="bg-[#0b0f19] rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-4">
                
                {/* Auth Prompt or Authenticated Banner */}
                {!user ? (
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-between gap-3 text-xs font-mono">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Sparkles className="w-4 h-4 text-[#00ff87]" />
                      <span>Already have an account? Sign in for 1-click checkout.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAuthModal(true)}
                      className="px-3 py-1 rounded-lg bg-[#00ff87] text-[#06080e] font-extrabold uppercase text-[11px] shadow-neon-sm flex-shrink-0"
                    >
                      SIGN IN
                    </button>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Logged in as <strong>{user.displayName || user.email || user.phoneNumber}</strong></span>
                  </div>
                )}

                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <h3 className="font-mono font-bold text-sm uppercase text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#00ff87] text-[#06080e] flex items-center justify-center text-xs font-extrabold">
                      1
                    </span>
                    DELIVERY ADDRESS & CONTACT
                  </h3>
                  <span className="text-[10px] font-mono text-[#00ff87]">PAN-INDIA AIR FREIGHT</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <label className="block text-slate-400 uppercase mb-1 font-bold">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#00ff87]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 uppercase mb-1 font-bold">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#00ff87]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 uppercase mb-1 font-bold">Phone Number (WhatsApp Updates)</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#00ff87]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 uppercase mb-1 font-bold">Street Address, Flat / House / Landmark</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 301, Tower B, Palm Heights"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#00ff87]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 uppercase mb-1 font-bold">City</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. New Delhi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#00ff87]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 uppercase mb-1 font-bold">State</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Delhi"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#00ff87]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 uppercase mb-1 font-bold">Pincode</label>
                      <input
                        type="text"
                        required
                        placeholder="110025"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#00ff87]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Payment Method Simulation */}
              <div className="bg-[#0b0f19] rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <h3 className="font-mono font-bold text-sm uppercase text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#00ff87] text-[#06080e] flex items-center justify-center text-xs font-extrabold">
                      2
                    </span>
                    PAYMENT GATEWAY METHOD
                  </h3>
                  <span className="text-[10px] font-mono text-[#00ff87] flex items-center gap-1 font-bold">
                    <Lock className="w-3 h-3" />
                    256-BIT SSL ENCRYPTED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  {/* UPI QR & Instant */}
                  <div
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-[#00ff87] bg-[#00ff87]/10 shadow-neon-sm'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-5 h-5 text-[#00ff87]" />
                        <strong className="text-white font-bold">UPI / QR CODE</strong>
                      </div>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-600 flex items-center justify-center">
                        {paymentMethod === 'UPI' && <span className="w-2 h-2 rounded-full bg-[#00ff87]" />}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Instant zero-convenience fee payment via Google Pay, PhonePe, Paytm, or BHIM.
                    </p>
                  </div>

                  {/* Cards */}
                  <div
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'CARD'
                        ? 'border-[#00ff87] bg-[#00ff87]/10 shadow-neon-sm'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-[#00f0ff]" />
                        <strong className="text-white font-bold">CREDIT / DEBIT CARD</strong>
                      </div>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-600 flex items-center justify-center">
                        {paymentMethod === 'CARD' && <span className="w-2 h-2 rounded-full bg-[#00ff87]" />}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Visa, Mastercard, RuPay & American Express with instant OTP verification.
                    </p>
                  </div>

                  {/* NetBanking */}
                  <div
                    onClick={() => setPaymentMethod('NETBANKING')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'NETBANKING'
                        ? 'border-[#00ff87] bg-[#00ff87]/10 shadow-neon-sm'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-amber-400" />
                        <strong className="text-white font-bold">NET BANKING</strong>
                      </div>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-600 flex items-center justify-center">
                        {paymentMethod === 'NETBANKING' && <span className="w-2 h-2 rounded-full bg-[#00ff87]" />}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      HDFC, ICICI, SBI, Axis, Kotak, and 50+ commercial banks supported.
                    </p>
                  </div>

                  {/* Cash on Delivery */}
                  <div
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-[#00ff87] bg-[#00ff87]/10 shadow-neon-sm'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-white" />
                        <strong className="text-white font-bold">CASH ON DELIVERY</strong>
                      </div>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-600 flex items-center justify-center">
                        {paymentMethod === 'COD' && <span className="w-2 h-2 rounded-full bg-[#00ff87]" />}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Pay upon delivery to our BlueDart air freight executive.
                    </p>
                  </div>
                </div>

                {/* Simulated UPI QR Box (if UPI selected) */}
                {paymentMethod === 'UPI' && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in">
                    <div className="w-24 h-24 bg-white border border-slate-700 rounded-lg p-2 flex items-center justify-center shadow-neon-sm">
                      <div className="w-full h-full border-2 border-dashed border-slate-900 rounded flex items-center justify-center font-mono text-[9px] text-[#06080e] text-center font-bold">
                        SLATE UPI QR CODE
                      </div>
                    </div>
                    <div className="text-xs font-mono space-y-1">
                      <span className="text-[#00ff87] font-bold block">VERIFIED SLATE BUSINESS VPA:</span>
                      <strong className="text-white block font-mono text-sm">slateapparels@icici</strong>
                      <span className="text-slate-400 text-[11px] block">
                        Scan with GPay / PhonePe / Paytm or click Place Order below for instant confirmation simulation.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Summary Preview & Confirm (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#0b0f19] rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <h3 className="font-mono font-bold text-sm uppercase text-white">
                    ITEMS IN ORDER ({cart.length})
                  </h3>
                  <Link href="/cart" className="text-xs font-mono font-bold text-[#00ff87] hover:underline">
                    EDIT BAG
                  </Link>
                </div>

                {/* Line Items List */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-14 rounded-lg bg-slate-950 overflow-hidden flex-shrink-0 border border-slate-800">
                        <Image src={item.image} alt={item.name} fill unoptimized className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 text-xs font-mono">
                        <h4 className="font-bold text-white truncate">{item.name}</h4>
                        <span className="text-[10px] text-slate-400 block">
                          Qty: {item.quantity} • {item.size} • {item.color}
                        </span>
                        <span className="font-bold text-[#00ff87]">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div className="space-y-2 text-xs font-mono border-t border-slate-800 pt-3">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal:</span>
                    <span className="font-bold text-white">{formatPrice(cartSubtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#00ff87]">
                      <span>Discount Saved:</span>
                      <span className="font-bold">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-400">
                    <span>Home Delivery Freight:</span>
                    <span>{shippingFee === 0 ? <strong className="text-[#00ff87]">FREE AIR EXPRESS</strong> : formatPrice(shippingFee)}</span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>Apparel GST (5%):</span>
                    <span>{formatPrice(taxAmount)}</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-slate-800">
                    <span>AMOUNT TO PAY:</span>
                    <span className="text-xl text-[#00ff87] font-mono">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full py-4 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-neon disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>PROCESSING ORDER...</span>
                  ) : (
                    <>
                      <span>CONFIRM & PLACE ORDER</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center text-[10px] font-mono text-slate-400">
                  By placing this order you receive an official GST invoice and air tracking number via SMS & Email.
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
    </div>
  );
}
