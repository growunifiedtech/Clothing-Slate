'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Zap, MessageSquare, ArrowRight, ShieldCheck, Tag, Layers, CheckCircle } from 'lucide-react';

export default function WholesaleBanner() {
  const { submitInquiry, showToast } = useStore();
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [productInterested, setProductInterested] = useState('Oversized Heavyweight Hoodies');
  const [estimatedQuantity, setEstimatedQuantity] = useState(50);
  const [customizationDetails, setCustomizationDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry({
      companyName,
      contactName,
      email,
      phone,
      productInterested,
      estimatedQuantity: Number(estimatedQuantity),
      targetDate: '15 Days Delivery',
      customizationDetails,
    });
    setShowInquiryModal(false);
    setCompanyName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setCustomizationDetails('');
  };

  return (
    <section className="py-16 bg-slate-100/80 border-y border-slate-200 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0b0f19] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          {/* Subtle Cyber Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#05f26c]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-mono tracking-widest text-[#05f26c] border border-[#05f26c]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#05f26c] animate-pulse" />
                SCALING A BRAND OR RETAIL STORE?
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase font-sans tracking-tight">
                WHOLESALE TIERS & <br />
                <span className="text-[#05f26c]">PRIVATE LABEL OEM</span>
              </h2>

              <p className="text-sm text-slate-300 font-light leading-relaxed max-w-xl">
                Order directly from our New Delhi industrial manufacturing lines. Instant bulk discounts automatically apply in bag, or submit custom tech packs for woven damask labels and custom dye formulations.
              </p>

              {/* 3 Tiers Cards */}
              <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-[10px] font-mono text-slate-400">STARTER TIER</div>
                  <div className="text-lg font-mono font-bold text-white">5–19 Pcs</div>
                  <div className="text-xs font-mono font-bold text-[#05f26c] mt-0.5">15% OFF</div>
                </div>

                <div className="p-3 rounded-xl bg-white/10 border border-[#05f26c]/40 text-center shadow-neon-sm">
                  <div className="text-[10px] font-mono text-[#05f26c]">GROWTH TIER</div>
                  <div className="text-lg font-mono font-bold text-white">20–49 Pcs</div>
                  <div className="text-xs font-mono font-bold text-[#05f26c] mt-0.5">30% OFF</div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-[10px] font-mono text-slate-400">ENTERPRISE</div>
                  <div className="text-lg font-mono font-bold text-white">50+ Pcs</div>
                  <div className="text-xs font-mono font-bold text-[#05f26c] mt-0.5">40% OFF</div>
                </div>
              </div>
            </div>

            {/* Right Action Box (5 cols) */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-4">
              <h3 className="font-mono font-bold text-base uppercase text-white tracking-wider">
                GET A FAST FACTORY QUOTE
              </h3>
              <p className="text-xs text-slate-300 font-light">
                Direct manufacturing coordination with our production desk. Samples dispatched within 48 business hours.
              </p>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setShowInquiryModal(true)}
                  className="w-full py-3.5 rounded-xl bg-[#05f26c] text-[#0b0f19] hover:bg-[#00e575] font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-neon"
                >
                  <Tag className="w-4 h-4" />
                  <span>REQUEST BULK QUOTE ONLINE</span>
                </button>

                <a
                  href="https://wa.me/919599084873?text=Hello%20Slate%20Apparels%2C%20I%20am%20interested%20in%20discussing%20a%20B2B%20bulk%20apparel%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-[#05f26c]" />
                  <span>WHATSAPP PRODUCTION DESK (+91 9599084873)</span>
                </a>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-3 border-t border-white/10">
                <span>GST INVOICE PROVIDED</span>
                <span>•</span>
                <span>PAN-INDIA DISPATCH</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Quote Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-mono uppercase">
                  SUBMIT B2B BULK INQUIRY
                </h3>
                <span className="text-xs text-slate-500 font-mono">NEW DELHI FACTORY DESK</span>
              </div>
              <button
                onClick={() => setShowInquiryModal(false)}
                className="text-slate-400 hover:text-slate-900 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-700 mb-1">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Streetwear"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-700 mb-1">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-700 mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.in"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-700 mb-1">
                    WhatsApp Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-700 mb-1">
                    Product Line
                  </label>
                  <select
                    value={productInterested}
                    onChange={(e) => setProductInterested(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 bg-white"
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
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-700 mb-1">
                    Estimated Qty (Pieces)
                  </label>
                  <input
                    type="number"
                    min="5"
                    required
                    value={estimatedQuantity}
                    onChange={(e) => setEstimatedQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-700 mb-1">
                  Custom Branding Specs / Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={customizationDetails}
                  onChange={(e) => setCustomizationDetails(e.target.value)}
                  placeholder="Need custom neck labels, puff print on chest, or custom colorway..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                SUBMIT INQUIRY TO PRODUCTION
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
