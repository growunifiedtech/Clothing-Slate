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
  } = useStore();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  // New Address Form State
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrState, setNewAddrState] = useState('');
  const [newAddrPincode, setNewAddrPincode] = useState('');
  const [newAddrType, setNewAddrType] = useState<'HOME' | 'OFFICE' | 'WAREHOUSE'>('HOME');

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

  // Calculations for stats
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const activeShipments = orders.filter((o) => o.orderStatus === 'SHIPPED' || o.orderStatus === 'IN_PRODUCTION').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 sm:py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & User Identity Bar */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0b0f19] text-white flex items-center justify-center font-mono font-bold text-xl shadow-md border-2 border-[#05f26c]">
              AM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-sans text-slate-950 uppercase">
                  Arjun Malhotra
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#05f26c]/20 text-[#047857] border border-[#05f26c]/40">
                  TIER 2 WHOLESALE PARTNER
                </span>
              </div>
              <p className="text-xs font-mono text-slate-500 mt-0.5">
                NEOM Retail Partner • arjun.malhotra@retailbrands.in • +91 98110 54321
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/shop"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-semibold transition-colors"
            >
              BROWSE CATALOG
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 rounded-xl bg-[#05f26c] text-[#0b0f19] hover:bg-[#00e575] text-xs font-mono font-bold transition-all shadow-neon-sm flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>ADMIN CONSOLE</span>
            </Link>
          </div>
        </div>

        {/* Layout Grid: Left Sidebar Tabs (3 cols) + Right Content View (9 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-soft space-y-1">
              {[
                { id: 'overview', label: 'OVERVIEW', icon: User },
                { id: 'orders', label: `MY ORDERS (${orders.length})`, icon: Package },
                { id: 'addresses', label: `SAVED ADDRESSES (${addresses.length})`, icon: MapPin },
                { id: 'wishlist', label: `WISHLIST (${wishlist.length})`, icon: Heart },
                { id: 'quotes', label: `CUSTOM QUOTES (${inquiries.length})`, icon: Clock },
                { id: 'settings', label: 'ACCOUNT SETTINGS', icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                      isActive
                        ? 'bg-[#0b0f19] text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#05f26c]' : 'text-slate-400'}`} />
                      <span>{tab.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Support Widget Box */}
            <div className="p-5 rounded-2xl bg-[#0b0f19] text-white border border-slate-200 shadow-soft space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#05f26c] uppercase block font-bold">
                DIRECT MANUFACTURING CONTACT
              </span>
              <h4 className="text-xs font-mono font-bold uppercase text-white">
                DEDICATED ACCOUNT DESK
              </h4>
              <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                Connect with our production managers in New Delhi for custom dye-lots, bulk line allocation, and shipping manifests.
              </p>
              <a
                href="https://wa.me/919599084873?text=Hello%20Slate%20Apparels%2C%20I%20am%20Arjun%20Malhotra%20inquiring%20about%20my%20orders."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg bg-[#05f26c] text-[#0b0f19] hover:bg-[#00e575] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-neon-sm"
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
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">
                      TOTAL ORDERS
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-slate-900">
                      {orders.length}
                    </div>
                    <span className="text-[10px] font-mono text-[#047857] font-semibold mt-1 block">
                      All time verified
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">
                      LIFETIME SPEND
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-slate-900">
                      {formatPrice(totalSpent)}
                    </div>
                    <span className="text-[10px] font-mono text-[#047857] font-semibold mt-1 block">
                      Wholesale Tier 2
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">
                      ACTIVE SHIPMENTS
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-[#047857] flex items-center gap-1.5">
                      <span>{activeShipments}</span>
                      <Truck className="w-4 h-4 text-[#047857]" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                      BlueDart Express
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">
                      SAVED IN WISHLIST
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-slate-900">
                      {wishlist.length}
                    </div>
                    <button
                      onClick={() => setActiveTab('wishlist')}
                      className="text-[10px] font-mono text-[#047857] font-bold hover:underline mt-1 block"
                    >
                      View Items →
                    </button>
                  </div>
                </div>

                {/* Latest Active Order Banner with Stepper */}
                {orders.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-soft">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-base font-extrabold text-slate-900">
                            LATEST SHIPMENT: #{orders[0].id}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              orders[0].orderStatus === 'DELIVERED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-[#05f26c]/20 text-[#047857]'
                            }`}
                          >
                            {orders[0].orderStatus}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-slate-500">
                          Placed on {formatDate(orders[0].createdAt)} • Courier: {orders[0].carrier} ({orders[0].trackingNumber})
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedOrder(orders[0])}
                        className="px-4 py-2 rounded-xl bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] text-xs font-mono font-bold transition-all"
                      >
                        VIEW INVOICE & RECEIPT
                      </button>
                    </div>

                    {/* Interactive Tracking Stepper */}
                    <div className="py-6">
                      <div className="relative flex items-center justify-between max-w-2xl mx-auto">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />

                        {orders[0].timeline.map((step, idx) => {
                          const isDone = step.completed;
                          return (
                            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                                  isDone
                                    ? 'bg-[#05f26c] text-[#0b0f19] shadow-neon-sm ring-4 ring-white'
                                    : 'bg-slate-200 text-slate-500 ring-4 ring-white'
                                }`}
                              >
                                {isDone ? '✓' : idx + 1}
                              </div>
                              <span className="text-[10px] font-mono font-bold text-slate-900 mt-2 max-w-[80px] leading-tight">
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
                    <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {orders[0].items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200"
                        >
                          <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h5 className="text-xs font-bold text-slate-900 truncate">
                              {item.name}
                            </h5>
                            <span className="text-[10px] font-mono text-slate-500">
                              Qty: {item.quantity} • Size: {item.size} • {item.color}
                            </span>
                            <div className="text-xs font-mono font-bold text-slate-900 mt-0.5">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: MY ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-mono font-bold text-base uppercase text-slate-900">
                    ORDER HISTORY ({orders.length})
                  </h3>
                  <Link
                    href="/shop"
                    className="text-xs font-mono font-bold text-[#047857] hover:underline uppercase"
                  >
                    + NEW REORDER
                  </Link>
                </div>

                {orders.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                    <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <h4 className="font-bold font-mono text-slate-800 text-sm">No orders yet</h4>
                    <p className="text-xs text-slate-500 mt-1">Place your first order from our catalog.</p>
                  </div>
                ) : (
                  orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-soft space-y-4 hover:border-slate-400 transition-all"
                    >
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-base font-extrabold text-slate-900">
                              ORDER #{ord.id}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                                ord.orderStatus === 'DELIVERED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : ord.orderStatus === 'SHIPPED'
                                  ? 'bg-[#05f26c]/20 text-[#047857]'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {ord.orderStatus}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-slate-500">
                            Placed on {formatDateTime(ord.createdAt)} • Paid via {ord.paymentMethod}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-base font-mono font-extrabold text-slate-950">
                              {formatPrice(ord.total)}
                            </div>
                            <span className="text-[10px] font-mono text-slate-500">
                              {ord.items.length} unique style{ord.items.length > 1 ? 's' : ''}
                            </span>
                          </div>

                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
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
                            className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                          >
                            <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                              <Image
                                src={it.image}
                                alt={it.name}
                                fill
                                unoptimized
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h5 className="text-xs font-bold text-slate-900 truncate">
                                {it.name}
                              </h5>
                              <span className="text-[10px] font-mono text-slate-500 block">
                                {it.quantity}x • {it.size} • {it.color}
                              </span>
                              <span className="text-xs font-mono font-bold text-slate-900">
                                {formatPrice(it.price * it.quantity)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer Tracking Info */}
                      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-slate-600 gap-2">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-[#047857]" />
                          <span>
                            Tracking: <strong>{ord.trackingNumber}</strong> ({ord.carrier})
                          </span>
                        </div>
                        <span className="text-slate-500">
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
                  <h3 className="font-mono font-bold text-base uppercase text-slate-900">
                    SAVED DELIVERY ADDRESSES ({addresses.length})
                  </h3>
                  <button
                    onClick={() => setShowAddAddressModal(true)}
                    className="px-4 py-2 rounded-xl bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-bold uppercase transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ADD NEW ADDRESS</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                        addr.isDefault
                          ? 'bg-white border-[#05f26c] ring-2 ring-[#05f26c]/30 shadow-soft'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                            {addr.type}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] font-mono font-bold text-[#047857] flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              DEFAULT
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-sm text-slate-900">{addr.fullName}</h4>
                        <p className="text-xs text-slate-600 font-sans mt-1 leading-relaxed">
                          {addr.street}<br />
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <p className="text-xs font-mono text-slate-500 mt-2">
                          Phone: {addr.phone}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                        {!addr.isDefault ? (
                          <button
                            onClick={() => setDefaultAddress(addr.id)}
                            className="text-slate-700 hover:text-slate-950 font-bold underline"
                          >
                            Set as Default
                          </button>
                        ) : (
                          <span className="text-[#047857] font-bold">Primary Dispatch</span>
                        )}

                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                <h3 className="font-mono font-bold text-base uppercase text-slate-900 mb-2">
                  SAVED ITEMS ({wishlistProducts.length})
                </h3>

                {wishlistProducts.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                    <Heart className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <h4 className="font-bold font-mono text-slate-800 text-sm">Your wishlist is empty</h4>
                    <p className="text-xs text-slate-500 mt-1">Tap the heart on any product card to save it here.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-4 rounded-2xl bg-white border border-slate-200 shadow-soft flex flex-col justify-between"
                      >
                        <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 mb-3">
                          <Image
                            src={prod.images[0]}
                            alt={prod.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>

                        <div>
                          <span className="text-[10px] font-mono text-slate-500 uppercase">
                            {prod.category}
                          </span>
                          <h4 className="font-bold text-xs text-slate-900 line-clamp-1 mt-0.5">
                            {prod.name}
                          </h4>
                          <div className="text-sm font-mono font-bold text-slate-900 mt-1">
                            {formatPrice(prod.price)}
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-slate-100 flex gap-2">
                          <button
                            onClick={() => addToCart(prod, prod.sizes[0], prod.colors[0].name, 1)}
                            className="flex-1 py-2 rounded-lg bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-[11px] font-bold transition-all flex items-center justify-center gap-1.5"
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
                  <h3 className="font-mono font-bold text-base uppercase text-slate-900">
                    CUSTOM B2B SAMPLE QUOTES ({inquiries.length})
                  </h3>
                  <a
                    href="https://wa.me/919599084873"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold text-[#047857] hover:underline uppercase"
                  >
                    + NEW FACTORY INQUIRY
                  </a>
                </div>

                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-slate-900">
                              INQUIRY #{inq.id}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                                inq.status === 'QUOTE_ISSUED'
                                  ? 'bg-[#05f26c]/20 text-[#047857]'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {inq.status}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-slate-500">
                            Submitted on {formatDate(inq.createdAt)} • Contact: {inq.contactName}
                          </span>
                        </div>

                        {inq.quotedPrice && (
                          <div className="text-right">
                            <span className="text-[10px] font-mono text-slate-400 uppercase block">QUOTED TOTAL</span>
                            <span className="text-base font-mono font-extrabold text-[#047857]">
                              {formatPrice(inq.quotedPrice)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-slate-50 p-3 rounded-xl border border-slate-100">
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
                        <span className="text-[11px] font-mono text-slate-500">
                          Production Desk Status: Verified by New Delhi Okhla Unit
                        </span>
                        <a
                          href={`https://wa.me/919599084873?text=Hello%20Slate%20Apparels%2C%20following%20up%20on%20my%20inquiry%20${inq.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-[#05f26c] hover:text-[#0b0f19] text-xs font-mono font-bold transition-all flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>DISCUSS ON WHATSAPP</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: ACCOUNT SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-6">
                <h3 className="font-mono font-bold text-base uppercase text-slate-900 border-b border-slate-200 pb-3">
                  PROFILE & TAX CREDENTIALS
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <label className="block text-slate-500 uppercase mb-1">Company / Trading Entity</label>
                    <input
                      type="text"
                      defaultValue="NEOM Retail Partner LLP"
                      className="w-full p-2.5 border border-slate-200 rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 uppercase mb-1">GSTIN Number</label>
                    <input
                      type="text"
                      defaultValue="07AABCN1234F1Z8"
                      className="w-full p-2.5 border border-slate-200 rounded-lg font-mono uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 uppercase mb-1">Primary Email</label>
                    <input
                      type="email"
                      defaultValue="arjun.malhotra@retailbrands.in"
                      className="w-full p-2.5 border border-slate-200 rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 uppercase mb-1">Dispatch Contact Number</label>
                    <input
                      type="tel"
                      defaultValue="+91 98110 54321"
                      className="w-full p-2.5 border border-slate-200 rounded-lg font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-mono">
                    Changes reflect on all future tax invoices.
                  </span>
                  <button
                    onClick={() => showToast('Profile settings saved')}
                    className="px-6 py-2.5 rounded-xl bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-bold transition-all shadow-sm"
                  >
                    SAVE CHANGES
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invoice & Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable Tax Invoice Header */}
            <div className="border-b border-slate-200 pb-5 mb-5 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  ORIGINAL TAX INVOICE
                </span>
                <h3 className="text-xl font-bold font-mono text-slate-900 uppercase">
                  SLATE APPARELS NEW DELHI
                </h3>
                <p className="text-xs font-mono text-slate-500 mt-0.5">
                  GSTIN: 07AAACS1429K1Z5 • IEC: 0514088921
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-mono font-bold text-slate-900">#{selectedOrder.id}</span>
                <span className="text-xs font-mono text-slate-500 block">
                  Date: {formatDate(selectedOrder.createdAt)}
                </span>
              </div>
            </div>

            {/* Billed To */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-5 text-xs font-mono grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 block mb-1">BILLED & SHIPPED TO:</span>
                <strong className="text-slate-900 block">{selectedOrder.customer.name}</strong>
                <span>{selectedOrder.customer.address}</span><br />
                <span>{selectedOrder.customer.city}, {selectedOrder.customer.state} - {selectedOrder.customer.pincode}</span><br />
                <span>Phone: {selectedOrder.customer.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">DISPATCH METHOD:</span>
                <strong className="text-slate-900 block">{selectedOrder.carrier}</strong>
                <span>Air Waybill: {selectedOrder.trackingNumber}</span><br />
                <span>Payment: {selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</span>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="space-y-3 mb-5">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase grid grid-cols-12 pb-2 border-b border-slate-200">
                <div className="col-span-6">ITEM</div>
                <div className="col-span-2 text-center">QTY</div>
                <div className="col-span-2 text-right">PRICE</div>
                <div className="col-span-2 text-right">TOTAL</div>
              </div>

              {selectedOrder.items.map((it, idx) => (
                <div key={idx} className="text-xs font-mono grid grid-cols-12 items-center py-1.5 border-b border-slate-100">
                  <div className="col-span-6">
                    <span className="font-bold text-slate-900 block truncate">{it.name}</span>
                    <span className="text-[10px] text-slate-500">{it.size} • {it.color}</span>
                  </div>
                  <div className="col-span-2 text-center text-slate-700">{it.quantity}</div>
                  <div className="col-span-2 text-right text-slate-700">{formatPrice(it.price)}</div>
                  <div className="col-span-2 text-right font-bold text-slate-900">
                    {formatPrice(it.price * it.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Math */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1.5 text-xs font-mono text-slate-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-slate-900 font-bold">{formatPrice(selectedOrder.subtotal)}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-[#047857]">
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
              <div className="flex justify-between text-base font-bold text-slate-950 pt-2 border-t border-slate-200">
                <span>TOTAL PAID:</span>
                <span className="text-[#0b0f19]">{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl bg-slate-900 text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT TAX INVOICE</span>
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-mono text-xs font-bold hover:bg-slate-100"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-mono font-bold text-base uppercase text-slate-900">
                ADD NEW SHIPPING ADDRESS
              </h3>
              <button
                onClick={() => setShowAddAddressModal(false)}
                className="text-slate-400 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAddress} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-700 mb-1">
                  Full Name / Contact Person
                </label>
                <input
                  type="text"
                  required
                  value={newAddrName}
                  onChange={(e) => setNewAddrName(e.target.value)}
                  placeholder="e.g. Arjun Malhotra"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={newAddrPhone}
                  onChange={(e) => setNewAddrPhone(e.target.value)}
                  placeholder="+91 98110 54321"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-700 mb-1">
                  Street Address / Floor / Building
                </label>
                <input
                  type="text"
                  required
                  value={newAddrStreet}
                  onChange={(e) => setNewAddrStreet(e.target.value)}
                  placeholder="e.g. B-42, Defence Colony, Flyover Road"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddrCity}
                    onChange={(e) => setNewAddrCity(e.target.value)}
                    placeholder="New Delhi"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddrState}
                    onChange={(e) => setNewAddrState(e.target.value)}
                    placeholder="Delhi"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddrPincode}
                    onChange={(e) => setNewAddrPincode(e.target.value)}
                    placeholder="110024"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-700 mb-1">
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
                          ? 'bg-[#0b0f19] text-white border-[#0b0f19]'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md mt-2"
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
