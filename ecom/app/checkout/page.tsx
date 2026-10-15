'use client';

import React, { useState } from 'react';
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
  Zap,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, shippingFee, taxAmount, discountAmount, grandTotal, placeOrder, clearCart } = useStore();

  // Form Fields
  const [name, setName] = useState('Arjun Malhotra');
  const [email, setEmail] = useState('arjun.malhotra@retailbrands.in');
  const [phone, setPhone] = useState('+91 98110 54321');
  const [address, setAddress] = useState('B-42, Defence Colony, Flyover Road');
  const [city, setCity] = useState('New Delhi');
  const [state, setState] = useState('Delhi');
  const [pincode, setPincode] = useState('110024');

  // Payment & Options
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('UPI');
  const [shippingMethod, setShippingMethod] = useState<'AIR' | 'SURFACE'>('AIR');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick Autofill Demo
  const autofillDemo = () => {
    setName('Arjun Malhotra');
    setEmail('arjun.malhotra@retailbrands.in');
    setPhone('+91 98110 54321');
    setAddress('B-42, Defence Colony, Flyover Road');
    setCity('New Delhi');
    setState('Delhi');
    setPincode('110024');
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
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
            <Link href="/cart" className="hover:text-slate-900">
              1. SHOPPING BAG
            </Link>
            <span>→</span>
            <span className="text-[#047857] font-bold">2. ADDRESS & PAYMENT</span>
            <span>→</span>
            <span>3. CONFIRMATION</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 uppercase font-sans tracking-tight">
              EXPRESS B2B CHECKOUT
            </h1>

            <button
              type="button"
              onClick={autofillDemo}
              className="text-xs font-mono font-bold text-[#047857] bg-[#05f26c]/20 hover:bg-[#05f26c]/30 px-3.5 py-1.5 rounded-full border border-[#05f26c]/40 transition-all flex items-center gap-1.5 self-start"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>1-CLICK AUTOFILL CLIENT</span>
            </button>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Customer Info & Payment Options (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Dispatch & Contact Info */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-soft space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <h3 className="font-mono font-bold text-sm uppercase text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0b0f19] text-white flex items-center justify-center text-xs">
                      1
                    </span>
                    DISPATCH & BILLING ADDRESS
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">PAN-INDIA AIR FREIGHT</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <label className="block text-slate-600 uppercase mb-1 font-bold">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 uppercase mb-1 font-bold">Official Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 uppercase mb-1 font-bold">Phone Number (WhatsApp Updates)</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 uppercase mb-1 font-bold">Street Address, Suite / Floor</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 uppercase mb-1 font-bold">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 uppercase mb-1 font-bold">State</label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 uppercase mb-1 font-bold">Pincode</label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Payment Method Simulation */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-soft space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <h3 className="font-mono font-bold text-sm uppercase text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0b0f19] text-white flex items-center justify-center text-xs">
                      2
                    </span>
                    PAYMENT GATEWAY METHOD
                  </h3>
                  <span className="text-[10px] font-mono text-[#047857] flex items-center gap-1 font-bold">
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
                        ? 'border-slate-950 bg-slate-50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-5 h-5 text-[#047857]" />
                        <strong className="text-slate-900 font-bold">UPI / QR CODE</strong>
                      </div>
                      <span className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center">
                        {paymentMethod === 'UPI' && <span className="w-2 h-2 rounded-full bg-slate-900" />}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-sans">
                      Instant zero-convenience fee payment via Google Pay, PhonePe, Paytm, or BHIM.
                    </p>
                  </div>

                  {/* Cards */}
                  <div
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'CARD'
                        ? 'border-slate-950 bg-slate-50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-indigo-600" />
                        <strong className="text-slate-900 font-bold">CREDIT / DEBIT CARD</strong>
                      </div>
                      <span className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center">
                        {paymentMethod === 'CARD' && <span className="w-2 h-2 rounded-full bg-slate-900" />}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-sans">
                      Visa, Mastercard, RuPay & American Express with instant OTP verification.
                    </p>
                  </div>

                  {/* NetBanking */}
                  <div
                    onClick={() => setPaymentMethod('NETBANKING')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'NETBANKING'
                        ? 'border-slate-950 bg-slate-50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-amber-600" />
                        <strong className="text-slate-900 font-bold">NET BANKING</strong>
                      </div>
                      <span className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center">
                        {paymentMethod === 'NETBANKING' && <span className="w-2 h-2 rounded-full bg-slate-900" />}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-sans">
                      HDFC, ICICI, SBI, Axis, Kotak, and 50+ commercial banks supported.
                    </p>
                  </div>

                  {/* Cash on Delivery */}
                  <div
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-slate-950 bg-slate-50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-slate-800" />
                        <strong className="text-slate-900 font-bold">CASH ON DELIVERY</strong>
                      </div>
                      <span className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center">
                        {paymentMethod === 'COD' && <span className="w-2 h-2 rounded-full bg-slate-900" />}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-sans">
                      Pay upon delivery to our BlueDart air freight executive.
                    </p>
                  </div>
                </div>

                {/* Simulated UPI QR Box (if UPI selected) */}
                {paymentMethod === 'UPI' && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in">
                    <div className="w-24 h-24 bg-white border border-slate-300 rounded-lg p-2 flex items-center justify-center shadow-sm">
                      <div className="w-full h-full border-2 border-dashed border-slate-800 rounded flex items-center justify-center font-mono text-[9px] text-center font-bold">
                        SLATE UPI QR CODE
                      </div>
                    </div>
                    <div className="text-xs font-mono space-y-1">
                      <span className="text-[#047857] font-bold block">VERIFIED SLATE BUSINESS VPA:</span>
                      <strong className="text-slate-900 block font-mono text-sm">slateapparels@icici</strong>
                      <span className="text-slate-500 text-[11px] block">
                        Scan with GPay / PhonePe / Paytm or proceed below for instant approval simulation.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Summary Preview & Confirm (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft space-y-5">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <h3 className="font-mono font-bold text-sm uppercase text-slate-900">
                    ITEMS IN ORDER ({cart.length})
                  </h3>
                  <Link href="/cart" className="text-xs font-mono font-bold text-[#047857] hover:underline">
                    EDIT BAG
                  </Link>
                </div>

                {/* Line Items List */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-14 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill unoptimized className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 text-xs font-mono">
                        <h4 className="font-bold text-slate-900 truncate">{item.name}</h4>
                        <span className="text-[10px] text-slate-500 block">
                          Qty: {item.quantity} • {item.size} • {item.color}
                        </span>
                        <span className="font-bold text-slate-900">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div className="space-y-2 text-xs font-mono border-t border-slate-100 pt-3">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
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
                    <span>{shippingFee === 0 ? <strong className="text-[#047857]">FREE AIR EXPRESS</strong> : formatPrice(shippingFee)}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Apparel GST (5%):</span>
                    <span>{formatPrice(taxAmount)}</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-slate-950 pt-3 border-t border-slate-200">
                    <span>AMOUNT TO PAY:</span>
                    <span className="text-lg text-slate-950 font-mono">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full py-4 rounded-xl bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lifted disabled:opacity-50"
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
    </div>
  );
}
