'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useStore, Order, Address, BulkInquiry } from '@/lib/store';
import { formatPrice, formatDate, formatDateTime } from '@/lib/utils';
import {
  Package,
  Heart,
  MapPin,
  Clock,
  User,
  Settings,
  ChevronRight,
  Truck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Zap,
  ShoppingBag,
  FileText,
  Printer,
  X,
  Sparkles,
} from 'lucide-react';

export default function UserDashboardView() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'wishlist' | 'quotes' | 'settings'>(
    initialTab as any
  );

  const {
    orders,
    wishlist,
    products,
    addresses,
    addAddress,
    deleteAddress,
    setDefaultAddress,
    inquiries,
    addToCart,
    showToast,
    userProfile,
    updateUserProfile,
  } = useStore();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  // Profile Form State
  const [profileName, setProfileName] = useState(userProfile.name);
  const [profileEmail, setProfileEmail] = useState(userProfile.email);
  const [profilePhone, setProfilePhone] = useState(userProfile.phone);
  const [profileGstin, setProfileGstin] = useState(userProfile.gstin || '');
  const [profileCompany, setProfileCompany] = useState(userProfile.companyName || '');

  // New Address Form State
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrState, setNewAddrState] = useState('');
  const [newAddrPincode, setNewAddrPincode] = useState('');
  const [newAddrType, setNewAddrType] = useState<'HOME' | 'OFFICE' | 'WAREHOUSE'>('HOME');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
      gstin: profileGstin,
      companyName: profileCompany,
    });
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({
      fullName: newAddrName,
      phone: newAddrPhone,
      street: newAddrStreet,
      city: newAddrCity,
      state: newAddrState,
      pincode: newAddrPincode,
      isDefault: addresses.length === 0,
      type: newAddrType,
    });
    setShowAddAddressModal(false);
    setNewAddrName('');
    setNewAddrPhone('');
    setNewAddrStreet('');
    setNewAddrCity('');
    setNewAddrState('');
    setNewAddrPincode('');
  };

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  // Calculations for real live stats
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const activeShipments = orders.filter((o) => o.orderStatus === 'SHIPPED' || o.orderStatus === 'IN_PRODUCTION').length;

  const getInitials = (nameStr: string) => {
    if (!nameStr.trim()) return 'SA';
    const parts = nameStr.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 py-8 sm:py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top User Identity Bar */}
        <div className="bg-[#0b0f19] rounded-2xl p-6 border border-slate-800 shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-[#00ff87] flex items-center justify-center font-mono font-bold text-xl shadow-neon-sm border-2 border-[#00ff87]">
              {getInitials(userProfile.name)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-sans text-white uppercase">
                  {userProfile.name ? userProfile.name : 'MY CUSTOMER ACCOUNT'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/40">
                  RETAIL STORE MEMBER
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                {userProfile.email ? userProfile.email : 'Personalize your details in settings'}
                {userProfile.phone ? ` • ${userProfile.phone}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/shop"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono font-semibold transition-colors"
            >
              BROWSE CATALOG
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] text-xs font-mono font-extrabold transition-all shadow-neon flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>ADMIN CONSOLE</span>
            </Link>
          </div>
        </div>

        {/* Layout Grid: Left Sidebar Tabs (3 cols) + Right Content View (9 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-[#0b0f19] rounded-2xl p-3 border border-slate-800 shadow-xl space-y-1">
              {[
                { id: 'overview', label: 'OVERVIEW', icon: User },
                { id: 'orders', label: `MY ORDERS (${orders.length})`, icon: Package },
                { id: 'addresses', label: `SAVED ADDRESSES (${addresses.length})`, icon: MapPin },
                { id: 'wishlist', label: `WISHLIST (${wishlist.length})`, icon: Heart },
                { id: 'quotes', label: `INQUIRIES (${inquiries.length})`, icon: Clock },
                { id: 'settings', label: 'PROFILE SETTINGS', icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                      isActive
                        ? 'bg-[#00ff87] text-[#06080e] shadow-neon font-extrabold'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#06080e]' : 'text-slate-500'}`} />
                      <span>{tab.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#06080e]' : 'text-slate-500'}`} />
                  </button>
                );
              })}
            </div>

            {/* Support Widget Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-[#0b0f19] to-[#0d1320] text-white border border-slate-800 shadow-xl space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#00ff87] uppercase block font-bold">
                RETAIL HELPDESK
              </span>
              <h4 className="text-xs font-mono font-bold uppercase text-white">
                CUSTOMER CONCIERGE
              </h4>
              <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                Connect with our New Delhi team for order modifications, address updates, or custom personalizations.
              </p>
              <a
                href="https://wa.me/919599084873?text=Hello%20Slate%20Apparels%2C%20I%20have%20an%20inquiry%20regarding%20my%20orders."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-neon"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WHATSAPP SUPPORT</span>
              </a>
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 4 KPI Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#0b0f19] border border-slate-800 shadow-lg">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">
                      TOTAL ORDERS
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-white">
                      {orders.length}
                    </div>
                    <span className="text-[10px] font-mono text-[#00ff87] font-semibold mt-1 block">
                      Lifetime Verified
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0b0f19] border border-slate-800 shadow-lg">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">
                      LIFETIME SPEND
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-white">
                      {formatPrice(totalSpent)}
                    </div>
                    <span className="text-[10px] font-mono text-[#00ff87] font-semibold mt-1 block">
                      Settled Invoices
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0b0f19] border border-slate-800 shadow-lg">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">
                      ACTIVE SHIPMENTS
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-[#00ff87] flex items-center gap-1.5">
                      <span>{activeShipments}</span>
                      <Truck className="w-4 h-4 text-[#00ff87]" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                      BlueDart Express
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0b0f19] border border-slate-800 shadow-lg">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">
                      SAVED IN WISHLIST
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-white">
                      {wishlist.length}
                    </div>
                    <button
                      onClick={() => setActiveTab('wishlist')}
                      className="text-[10px] font-mono text-[#00ff87] font-bold hover:underline mt-1 block"
                    >
                      View Items →
                    </button>
                  </div>
                </div>

                {/* Latest Active Order Banner with Stepper */}
                {orders.length > 0 ? (
                  <div className="bg-[#0b0f19] rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-base font-extrabold text-white">
                            LATEST SHIPMENT: #{orders[0].id}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              orders[0].orderStatus === 'DELIVERED'
                                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                                : 'bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/40'
                            }`}
                          >
                            {orders[0].orderStatus}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-slate-400">
                          Placed on {formatDate(orders[0].createdAt)} • Courier: {orders[0].carrier} ({orders[0].trackingNumber})
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedOrder(orders[0])}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-[#00ff87] hover:text-[#06080e] text-white text-xs font-mono font-bold transition-all border border-slate-700"
                      >
                        VIEW INVOICE & RECEIPT
                      </button>
                    </div>

                    {/* Interactive Tracking Stepper */}
                    <div className="py-6">
                      <div className="relative flex items-center justify-between max-w-2xl mx-auto">
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0" />

                        {orders[0].timeline.map((step, idx) => {
                          const isDone = step.completed;
                          return (
                            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                                  isDone
                                    ? 'bg-[#00ff87] text-[#06080e] shadow-neon ring-4 ring-[#0b0f19]'
                                    : 'bg-slate-800 text-slate-500 ring-4 ring-[#0b0f19]'
                                }`}
                              >
                                {isDone ? '✓' : idx + 1}
                              </div>
                              <span className="text-[10px] font-mono font-bold text-white mt-2 max-w-[80px] leading-tight">
                                {step.status}
                              </span>
                              <span className="text-[9px] font-mono text-slate-400 mt-0.5 max-w-[90px] truncate">
                                {step.time}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Order Line Items Previews */}
                    <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {orders[0].items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800"
                        >
                          <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-800">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h5 className="text-xs font-bold text-white truncate">
                              {item.name}
                            </h5>
                            <span className="text-[10px] font-mono text-slate-400">
                              Qty: {item.quantity} • Size: {item.size} • {item.color}
                            </span>
                            <div className="text-xs font-mono font-bold text-[#00ff87] mt-0.5">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#0b0f19] rounded-2xl p-10 border border-slate-800 shadow-xl text-center space-y-3">
                    <Package className="w-10 h-10 text-slate-600 mx-auto mb-1" />
                    <h3 className="font-mono font-bold text-base uppercase text-white">
                      NO ACTIVE SHIPMENTS
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans">
                      When you place an order on the store, live BlueDart tracking checkpoints and digital tax invoices will appear here.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold uppercase transition-all shadow-neon"
                    >
                      <span>EXPLORE RETAIL DROPS</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: MY ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-mono font-bold text-base uppercase text-white">
                    ORDER HISTORY ({orders.length})
                  </h3>
                  <Link
                    href="/shop"
                    className="text-xs font-mono font-bold text-[#00ff87] hover:underline uppercase"
                  >
                    + NEW ORDER
                  </Link>
                </div>

                {orders.length === 0 ? (
                  <div className="p-12 text-center bg-[#0b0f19] rounded-2xl border border-slate-800 shadow-xl space-y-3">
                    <Package className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                    <h4 className="font-bold font-mono text-white text-base">NO ORDERS RECORDED YET</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans">
                      Your complete order history, BlueDart tracking manifests, and printable GST tax invoices will be cataloged here once you check out.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 mt-2 px-6 py-2.5 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold uppercase transition-all shadow-neon"
                    >
                      <span>START SHOPPING</span>
                    </Link>
                  </div>
                ) : (
                  orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-[#0b0f19] rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-lg space-y-4 hover:border-slate-700 transition-all"
                    >
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-base font-extrabold text-white">
                              ORDER #{ord.id}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                                ord.orderStatus === 'DELIVERED'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                  : ord.orderStatus === 'SHIPPED'
                                  ? 'bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/40'
                                  : 'bg-amber-950 text-amber-400 border border-amber-800'
                              }`}
                            >
                              {ord.orderStatus}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-slate-400">
                            Placed on {formatDateTime(ord.createdAt)} • Paid via {ord.paymentMethod}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-base font-mono font-extrabold text-[#00ff87]">
                              {formatPrice(ord.total)}
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">
                              {ord.items.length} style{ord.items.length > 1 ? 's' : ''}
                            </span>
                          </div>

                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white hover:bg-[#00ff87] hover:text-[#06080e] font-mono text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>INVOICE</span>
                          </button>
                        </div>
                      </div>

                      {/* Line Items */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {ord.items.map((it, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800"
                          >
                            <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-800">
                              <Image
                                src={it.image}
                                alt={it.name}
                                fill
                                unoptimized
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h5 className="text-xs font-bold text-white truncate">
                                {it.name}
                              </h5>
                              <span className="text-[10px] font-mono text-slate-400 block">
                                {it.quantity}x • {it.size} • {it.color}
                              </span>
                              <span className="text-xs font-mono font-bold text-[#00ff87]">
                                {formatPrice(it.price * it.quantity)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer Tracking Info */}
                      <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-slate-300 gap-2">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-[#00ff87]" />
                          <span>
                            Tracking: <strong className="text-white">{ord.trackingNumber}</strong> ({ord.carrier})
                          </span>
                        </div>
                        <span className="text-slate-400">
                          Destination: {ord.customer.city}, {ord.customer.state} ({ord.customer.pincode})
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 3: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-mono font-bold text-base uppercase text-white">
                    SAVED DELIVERY ADDRESSES ({addresses.length})
                  </h3>
                  <button
                    onClick={() => setShowAddAddressModal(true)}
                    className="px-4 py-2 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold uppercase transition-all shadow-neon flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ADD NEW ADDRESS</span>
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="p-12 text-center bg-[#0b0f19] rounded-2xl border border-slate-800 shadow-xl space-y-3">
                    <MapPin className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                    <h4 className="font-bold font-mono text-white text-base">NO SAVED ADDRESSES</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans">
                      Add your home or workplace delivery address to enjoy 1-click expedited checkout.
                    </p>
                    <button
                      onClick={() => setShowAddAddressModal(true)}
                      className="inline-flex items-center gap-2 mt-2 px-6 py-2.5 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold uppercase transition-all shadow-neon"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>ADD YOUR ADDRESS</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                          addr.isDefault
                            ? 'bg-[#0b0f19] border-[#00ff87] ring-1 ring-[#00ff87]/40 shadow-neon-sm'
                            : 'bg-[#0b0f19] border-slate-800'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 border border-slate-700 text-slate-300">
                              {addr.type}
                            </span>
                            {addr.isDefault && (
                              <span className="text-[10px] font-mono font-bold text-[#00ff87] flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                DEFAULT
                              </span>
                            )}
                          </div>

                          <h4 className="font-bold text-sm text-white">{addr.fullName}</h4>
                          <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed">
                            {addr.street}<br />
                            {addr.city}, {addr.state} - {addr.pincode}
                          </p>
                          <p className="text-xs font-mono text-slate-400 mt-2">
                            Phone: {addr.phone}
                          </p>
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                          {!addr.isDefault ? (
                            <button
                              onClick={() => setDefaultAddress(addr.id)}
                              className="text-slate-400 hover:text-[#00ff87] font-bold underline"
                            >
                              Set as Default
                            </button>
                          ) : (
                            <span className="text-[#00ff87] font-bold">Primary Delivery</span>
                          )}

                          <button
                            onClick={() => deleteAddress(addr.id)}
                            className="text-slate-500 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                <h3 className="font-mono font-bold text-base uppercase text-white mb-2">
                  SAVED ITEMS ({wishlistProducts.length})
                </h3>

                {wishlistProducts.length === 0 ? (
                  <div className="p-12 text-center bg-[#0b0f19] rounded-2xl border border-slate-800 shadow-xl space-y-3">
                    <Heart className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                    <h4 className="font-bold font-mono text-white text-base">YOUR WISHLIST IS EMPTY</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans">
                      Tap the heart icon on any product in the catalog to curate your favorite silhouettes here.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 mt-2 px-6 py-2.5 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold uppercase transition-all shadow-neon"
                    >
                      <span>EXPLORE CATALOG</span>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-4 rounded-2xl bg-[#0b0f19] border border-slate-800 shadow-lg flex flex-col justify-between"
                      >
                        <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-950 mb-3 border border-slate-800">
                          <Image
                            src={prod.images[0]}
                            alt={prod.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>

                        <div>
                          <span className="text-[10px] font-mono text-[#00ff87] uppercase font-bold">
                            {prod.category}
                          </span>
                          <h4 className="font-bold text-xs text-white line-clamp-1 mt-0.5">
                            {prod.name}
                          </h4>
                          <div className="text-sm font-mono font-bold text-white mt-1">
                            {formatPrice(prod.price)}
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-slate-800 flex gap-2">
                          <button
                            onClick={() => addToCart(prod, prod.sizes[0], prod.colors[0].name, 1)}
                            className="flex-1 py-2 rounded-lg bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-[11px] font-extrabold transition-all flex items-center justify-center gap-1.5 shadow-neon-sm"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>MOVE TO BAG</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: CUSTOM QUOTES */}
            {activeTab === 'quotes' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-mono font-bold text-base uppercase text-white">
                    PERSONALIZATION & CUSTOM INQUIRIES ({inquiries.length})
                  </h3>
                  <a
                    href="https://wa.me/919599084873"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold text-[#00ff87] hover:underline uppercase"
                  >
                    + NEW INQUIRY
                  </a>
                </div>

                {inquiries.length === 0 ? (
                  <div className="p-12 text-center bg-[#0b0f19] rounded-2xl border border-slate-800 shadow-xl space-y-3">
                    <Clock className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                    <h4 className="font-bold font-mono text-white text-base">NO INQUIRIES SUBMITTED YET</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans">
                      Need custom monogram embroidery, specific fabric formulations, or private label drops? Reach out directly via our personalization desk.
                    </p>
                    <a
                      href="https://wa.me/919599084873?text=Hello%20Slate%20Apparels%2C%20I%20have%20a%20custom%20personalization%20request."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-2 px-6 py-2.5 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold uppercase transition-all shadow-neon"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WHATSAPP CONCIERGE</span>
                    </a>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-5 rounded-2xl border border-slate-800 bg-[#0b0f19] shadow-lg space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-sm text-white">
                                INQUIRY #{inq.id}
                              </span>
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                                  inq.status === 'QUOTE_ISSUED'
                                    ? 'bg-[#00ff87]/20 text-[#00ff87]'
                                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                                }`}
                              >
                                {inq.status}
                              </span>
                            </div>
                            <span className="text-xs font-mono text-slate-400">
                              Submitted on {formatDate(inq.createdAt)} • Contact: {inq.contactName}
                            </span>
                          </div>

                          {inq.quotedPrice && (
                            <div className="text-right">
                              <span className="text-[10px] font-mono text-slate-400 uppercase block">QUOTED TOTAL</span>
                              <span className="text-base font-mono font-extrabold text-[#00ff87]">
                                {formatPrice(inq.quotedPrice)}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <div>
                            <span className="text-slate-400">PRODUCT:</span> {inq.productInterested}
                          </div>
                          <div>
                            <span className="text-slate-400">QUANTITY:</span> {inq.estimatedQuantity} pieces
                          </div>
                          <div className="sm:col-span-2">
                            <span className="text-slate-400">SPECS:</span> {inq.customizationDetails}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <span className="text-[11px] font-mono text-slate-400">
                            Production Desk Status: Verified by New Delhi Okhla Unit
                          </span>
                          <a
                            href={`https://wa.me/919599084873?text=Hello%20Slate%20Apparels%2C%20following%20up%20on%20my%20inquiry%20${inq.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white hover:bg-[#00ff87] hover:text-[#06080e] text-xs font-mono font-bold transition-all flex items-center gap-1.5"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>DISCUSS ON WHATSAPP</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 6: ACCOUNT SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-[#0b0f19] rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
                <div>
                  <h3 className="font-mono font-bold text-base uppercase text-white pb-1">
                    PROFILE & CONTACT CREDENTIALS
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Configure your genuine contact details. These will be automatically populated on your tax invoices and BlueDart delivery manifests.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <label className="block text-slate-400 uppercase mb-1">Your Full Name</label>
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 text-white rounded-lg font-mono focus:outline-none focus:border-[#00ff87]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 uppercase mb-1">Company / Label Name (Optional)</label>
                      <input
                        type="text"
                        value={profileCompany}
                        onChange={(e) => setProfileCompany(e.target.value)}
                        placeholder="Individual / Label / Brand"
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 text-white rounded-lg font-mono focus:outline-none focus:border-[#00ff87]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 text-white rounded-lg font-mono focus:outline-none focus:border-[#00ff87]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 uppercase mb-1">WhatsApp Mobile Number</label>
                      <input
                        type="tel"
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 text-white rounded-lg font-mono focus:outline-none focus:border-[#00ff87]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 uppercase mb-1">GSTIN Number (Optional)</label>
                      <input
                        type="text"
                        value={profileGstin}
                        onChange={(e) => setProfileGstin(e.target.value.toUpperCase())}
                        placeholder="e.g. 07AAACS1429K1Z5"
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 text-white rounded-lg font-mono uppercase focus:outline-none focus:border-[#00ff87]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-mono">
                      Stored securely in your local browser session.
                    </span>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold transition-all shadow-neon"
                    >
                      SAVE PROFILE
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invoice & Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#0b0f19] rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-700 text-white max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-900 border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable Tax Invoice Header */}
            <div className="border-b border-slate-800 pb-5 mb-5 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#00ff87] uppercase font-bold">
                  ORIGINAL RETAIL TAX INVOICE
                </span>
                <h3 className="text-xl font-bold font-mono text-white uppercase">
                  SLATE APPARELS NEW DELHI
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  GSTIN: 07AAACS1429K1Z5 • IEC: 0514088921 • UDYAM-DL-08-0024891
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-mono font-bold text-white">#{selectedOrder.id}</span>
                <span className="text-xs font-mono text-slate-400 block">
                  Date: {formatDate(selectedOrder.createdAt)}
                </span>
              </div>
            </div>

            {/* Billed To */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 mb-5 text-xs font-mono grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 block mb-1">BILLED & SHIPPED TO:</span>
                <strong className="text-white block">{selectedOrder.customer.name}</strong>
                <span className="text-slate-300">{selectedOrder.customer.address}</span><br />
                <span className="text-slate-300">{selectedOrder.customer.city}, {selectedOrder.customer.state} - {selectedOrder.customer.pincode}</span><br />
                <span className="text-slate-400">Phone: {selectedOrder.customer.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">DISPATCH METHOD:</span>
                <strong className="text-white block">{selectedOrder.carrier}</strong>
                <span className="text-slate-300">Air Waybill: {selectedOrder.trackingNumber}</span><br />
                <span className="text-slate-300">Payment: {selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</span>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="space-y-3 mb-5">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase grid grid-cols-12 pb-2 border-b border-slate-800">
                <div className="col-span-6">ITEM</div>
                <div className="col-span-2 text-center">QTY</div>
                <div className="col-span-2 text-right">PRICE</div>
                <div className="col-span-2 text-right">TOTAL</div>
              </div>

              {selectedOrder.items.map((it, idx) => (
                <div key={idx} className="text-xs font-mono grid grid-cols-12 items-center py-2 border-b border-slate-800/60">
                  <div className="col-span-6">
                    <span className="font-bold text-white block truncate">{it.name}</span>
                    <span className="text-[10px] text-slate-400">{it.size} • {it.color}</span>
                  </div>
                  <div className="col-span-2 text-center text-slate-300">{it.quantity}</div>
                  <div className="col-span-2 text-right text-slate-300">{formatPrice(it.price)}</div>
                  <div className="col-span-2 text-right font-bold text-[#00ff87]">
                    {formatPrice(it.price * it.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Math */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5 text-xs font-mono text-slate-300 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-white font-bold">{formatPrice(selectedOrder.subtotal)}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-[#00ff87]">
                  <span>Promo Discount:</span>
                  <span>-{formatPrice(selectedOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Freight Shipping:</span>
                <span>{selectedOrder.shipping === 0 ? 'FREE' : formatPrice(selectedOrder.shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>Apparel GST (5%):</span>
                <span>{formatPrice(selectedOrder.tax)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                <span>TOTAL SETTLED:</span>
                <span className="text-[#00ff87] font-mono">{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold uppercase transition-all flex items-center justify-center gap-2 shadow-neon"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT TAX INVOICE</span>
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 font-mono text-xs font-bold hover:bg-slate-800"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#0b0f19] rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-700 text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-mono font-bold text-base uppercase text-white">
                ADD NEW SHIPPING ADDRESS
              </h3>
              <button
                onClick={() => setShowAddAddressModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAddress} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                  Full Name / Contact Person
                </label>
                <input
                  type="text"
                  required
                  value={newAddrName}
                  onChange={(e) => setNewAddrName(e.target.value)}
                  placeholder="Contact / Recipient Name"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00ff87]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={newAddrPhone}
                  onChange={(e) => setNewAddrPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00ff87]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                  Street Address / Flat / Building
                </label>
                <input
                  type="text"
                  required
                  value={newAddrStreet}
                  onChange={(e) => setNewAddrStreet(e.target.value)}
                  placeholder="e.g. Flat 402, Green Avenue, Okhla"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00ff87]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddrCity}
                    onChange={(e) => setNewAddrCity(e.target.value)}
                    placeholder="New Delhi"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00ff87]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddrState}
                    onChange={(e) => setNewAddrState(e.target.value)}
                    placeholder="Delhi"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00ff87]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddrPincode}
                    onChange={(e) => setNewAddrPincode(e.target.value)}
                    placeholder="110025"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00ff87]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                  Address Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['HOME', 'OFFICE', 'WAREHOUSE'].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setNewAddrType(t as any)}
                      className={`py-2 text-xs font-mono font-bold rounded-lg border uppercase transition-colors ${
                        newAddrType === t
                          ? 'bg-[#00ff87] text-[#06080e] border-[#00ff87]'
                          : 'bg-slate-900 text-slate-300 border-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold uppercase tracking-wider transition-all shadow-neon mt-2"
              >
                SAVE ADDRESS
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
