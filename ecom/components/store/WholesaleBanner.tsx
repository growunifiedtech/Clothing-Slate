'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Zap, MessageSquare, ArrowRight, ShieldCheck, Tag, Sparkles, CheckCircle2, Truck } from 'lucide-react';

export default function WholesaleBanner() {
  const { submitInquiry, showToast } = useStore();
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [productInterested, setProductInterested] = useState('Oversized Heavyweight Hoodies');
  const [requestedDetails, setRequestedDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry({
      companyName: 'Retail VIP Customer',
      contactName: customerName,
      email,
      phone,
      productInterested,
      estimatedQuantity: 2,
      targetDate: 'Immediate Retail Dispatch',
      customizationDetails: requestedDetails || 'Retail customization / bundle inquiry',
    });
    setShowInquiryModal(false);
    showToast('Inquiry submitted to Slate Personalization Desk!');
    setCustomerName('');
    setEmail('');
    setPhone('');
    setRequestedDetails('');
  };

  return (
    <section className="py-16 sm:py-20 bg-[#06080e] border-y border-slate-800 select-none relative overflow-hidden">
      {/* Multi-Neon Cyber Glows */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#ff007f]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#b026ff]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-[#0b0f19] via-[#0e1424] to-[#0b0f19] rounded-3xl p-8 sm:p-12 border border-slate-700/80 shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-mono tracking-widest shadow-neon-pink-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff007f] animate-pulse" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] via-[#b026ff] to-[#00f0ff] font-extrabold">
                  RETAIL CLUB & CUSTOM PERSONALIZATION DESK
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase font-sans tracking-tight text-white leading-tight">
                PURCHASE DIRECT. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#00ff87] to-[#ff007f]">
                  WEAR LUXURY STREETWEAR.
                </span>
              </h2>

              <p className="text-sm text-slate-300 font-normal leading-relaxed max-w-xl">
                Every hoodie, tee, and jacket is manufactured with industrial precision in New Delhi. Order single pieces with free express shipping across India, or consult our desk for bespoke colorways and personalized monogram embroidery.
              </p>

              {/* 3 Retail Perks Color-Coded */}
              <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-[#00f0ff]/30 text-center shadow-neon-cyan-sm">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">RETAIL PRICING</div>
                  <div className="text-base sm:text-lg font-mono font-bold text-white">From ₹599</div>
                  <div className="text-[10px] font-mono font-bold text-[#00f0ff] mt-0.5">NO MINIMUM</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-[#ff007f]/40 text-center shadow-neon-pink-sm">
                  <div className="text-[10px] font-mono text-[#ff007f] uppercase">FREE SHIPPING</div>
                  <div className="text-base sm:text-lg font-mono font-bold text-white">Orders ₹999+</div>
                  <div className="text-[10px] font-mono font-bold text-[#ff007f] mt-0.5">EXPRESS AIR</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-[#b026ff]/40 text-center shadow-neon-purple-sm">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">EASY EXCHANGE</div>
                  <div className="text-base sm:text-lg font-mono font-bold text-white">7 Days</div>
                  <div className="text-[10px] font-mono font-bold text-[#b026ff] mt-0.5">DOORSTEP PICKUP</div>
                </div>
              </div>
            </div>

            {/* Right Action Box (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-4">
              <h3 className="font-mono font-bold text-base uppercase text-white tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ff007f]" />
                RETAIL VIP DESK & SUPPORT
              </h3>
              <p className="text-xs text-slate-300 font-light">
                Have questions about fit, sizing, or want custom personalization? Our customer team is available 7 days a week on WhatsApp.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href="https://wa.me/919599084873?text=Hello%20Slate%20Apparels%2C%20I%20have%20an%20inquiry%20regarding%20retail%20products%20and%20sizing."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00ff87] to-[#00f0ff] text-[#06080e] hover:from-[#00f0ff] hover:to-[#ff007f] hover:text-white font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-neon hover:shadow-neon-pink"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>CHAT ON WHATSAPP (+91 9599084873)</span>
                </a>

                <button
                  onClick={() => setShowInquiryModal(true)}
                  className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-[#ff007f]/10 border border-[#ff007f]/40 hover:border-[#ff007f] text-slate-200 hover:text-[#ff007f] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-neon-pink-sm"
                >
                  <Tag className="w-4 h-4 text-[#00f0ff]" />
                  <span>REQUEST BESPOKE PERSONALIZATION</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-3 border-t border-slate-800">
                <span className="text-[#00f0ff]">NEW DELHI FACTORY HUB</span>
                <span>•</span>
                <span className="text-[#00ff87]">100% SECURE PREPAID / COD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Retail Personalization Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#0b0f19] rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-700 text-white">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-mono uppercase">
                  CUSTOM PERSONALIZATION DESK
                </h3>
                <span className="text-xs text-[#00f0ff] font-mono">SLATE APPARELS NEW DELHI</span>
              </div>
              <button
                onClick={() => setShowInquiryModal(false)}
                className="text-slate-400 hover:text-white font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                    WhatsApp Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                  Product Line
                </label>
                <select
                  value={productInterested}
                  onChange={(e) => setProductInterested(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00f0ff]"
                >
                  <option value="Oversized Heavyweight Hoodies">Oversized Hoodies (380 GSM)</option>
                  <option value="Drop Shoulder T-Shirts">Drop Shoulder T-Shirts (240 GSM)</option>
                  <option value="Down Alternative Puffers">Thermal Puffer Jackets</option>
                  <option value="OmniHeat Tracksuits">OmniHeat Tracksuit Sets</option>
                  <option value="Balloon Fit Trackpants">Balloon Cut Trackpants</option>
                  <option value="Jacquard Sweaters">Jacquard Sweaters</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                  Personalization Details (Initials, Embroidery, Sizing notes)
                </label>
                <textarea
                  rows={3}
                  value={requestedDetails}
                  onChange={(e) => setRequestedDetails(e.target.value)}
                  placeholder="Tell us what you'd like customized (e.g. monogram on cuff, custom oversized chest embroidery)..."
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff007f] via-[#b026ff] to-[#00f0ff] text-white font-mono text-xs font-extrabold uppercase tracking-wider transition-all shadow-neon-pink"
              >
                SUBMIT TO PERSONALIZATION DESK
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
