'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore, Order, Product, OrderStatus, BulkInquiry } from '@/lib/store';
import { formatPrice, formatDate, formatDateTime } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Layers,
  Users,
  MessageSquare,
  Settings,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Clock,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Truck,
  ExternalLink,
  Search,
  Filter,
  Eye,
  FileText,
  Printer,
  X,
  Zap,
  Tag,
  ArrowUpRight,
} from 'lucide-react';

export default function AdminDashboardView() {
  const {
    orders,
    products,
    inquiries,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct,
    updateInquiryStatus,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'quotes' | 'customers' | 'settings'>('overview');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('ALL');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Add Product Modal State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<Product['category']>('HOODIES');
  const [newProdPrice, setNewProdPrice] = useState(1299);
  const [newProdComparePrice, setNewProdComparePrice] = useState(2199);
  const [newProdStock, setNewProdStock] = useState(100);
  const [newProdFabric, setNewProdFabric] = useState('380 GSM Heavy French Terry');
  const [newProdDescription, setNewProdDescription] = useState('Premium heavyweight apparel engineered for commercial streetwear labels.');
  const [newProdBadge, setNewProdBadge] = useState<Product['badge']>('NEW DROP');

  // New Coupon Form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponPercent, setNewCouponPercent] = useState(15);
  const [couponsList, setCouponsList] = useState([
    { code: 'NEON10', percent: 10, uses: 142 },
    { code: 'SLATE20', percent: 20, uses: 89 },
    { code: 'FIRSTDROP', percent: 15, uses: 45 },
  ]);

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 120800;
  const totalOrdersCount = orders.length + 42;
  const avgOrderValue = Math.round(totalRevenue / totalOrdersCount);
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'PENDING' || o.orderStatus === 'CONFIRMED').length;

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.trackingNumber.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'ALL' || o.orderStatus === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredProducts = products.filter((p) => {
    return productCategoryFilter === 'ALL' || p.category === productCategoryFilter;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: newProdName,
      category: newProdCategory,
      subcategory: `${newProdCategory} Drop`,
      season: 'Winter',
      badge: newProdBadge,
      price: Number(newProdPrice),
      compareAtPrice: Number(newProdComparePrice),
      stockCount: Number(newProdStock),
      rating: 5.0,
      reviewsCount: 1,
      description: newProdDescription,
      fabric: newProdFabric,
      colors: [
        { name: 'Onyx Black', hex: '#0f172a' },
        { name: 'Sage Olive', hex: '#4d5d4b' },
      ],
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      images: ['/images/products/oversized-hoodies-1.jpg'],
      sku: `SLT-${Date.now().toString().slice(-4)}`,
      specifications: {
        gsm: newProdFabric,
        composition: '100% Combed Heavy Cotton',
        fit: 'Relaxed Silhouette',
      },
    });
    setShowAddProductModal(false);
    showToast('New product added to catalog');
    setNewProdName('');
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCouponCode) {
      setCouponsList((prev) => [
        ...prev,
        { code: newCouponCode.toUpperCase(), percent: Number(newCouponPercent), uses: 0 },
      ]);
      showToast(`Coupon ${newCouponCode.toUpperCase()} activated`);
      setNewCouponCode('');
    }
  };

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 py-8 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="bg-[#0b0f19] rounded-2xl p-6 text-white border border-slate-800 shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00ff87] text-[#06080e] flex items-center justify-center font-mono font-black text-xl shadow-neon">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-wider uppercase text-white">
                  SLATE ADMIN CONSOLE
                </h1>
                <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-ping" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[#00ff87]">
                  LIVE SYSTEM
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                New Delhi Facility • Orders, Inventory & Retail Control Desk
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
            >
              <span>VIEW STOREFRONT</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#00ff87]" />
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-mono font-bold transition-colors"
            >
              CUSTOMER PORTAL
            </Link>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-800 text-xs font-mono font-bold uppercase">
          {[
            { id: 'overview', label: 'OVERVIEW & ANALYTICS', icon: LayoutDashboard },
            { id: 'orders', label: `ORDERS (${orders.length})`, icon: Package },
            { id: 'products', label: `PRODUCTS & STOCK (${products.length})`, icon: Layers },
            { id: 'quotes', label: `INQUIRIES (${inquiries.length})`, icon: MessageSquare },
            { id: 'customers', label: 'CUSTOMER DIRECTORY', icon: Users },
            { id: 'settings', label: 'COUPONS & SETTINGS', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 flex-shrink-0 ${
                  isActive
                    ? 'bg-[#00ff87] text-[#06080e] shadow-neon font-extrabold'
                    : 'bg-[#0b0f19] text-slate-300 hover:bg-slate-900 border border-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#06080e]' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase">GROSS REVENUE</span>
                  <DollarSign className="w-4 h-4 text-[#00ff87]" />
                </div>
                <div className="text-3xl font-mono font-extrabold text-[#00ff87]">
                  {formatPrice(totalRevenue)}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#00ff87] font-bold mt-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% vs last cycle</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase">TOTAL ORDERS</span>
                  <Package className="w-4 h-4 text-slate-300" />
                </div>
                <div className="text-3xl font-mono font-extrabold text-white">
                  {totalOrdersCount}
                </div>
                <span className="text-xs font-mono text-slate-400 mt-2 block">
                  {pendingOrdersCount} pending dispatch
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase">AVG ORDER VALUE</span>
                  <ShoppingBag className="w-4 h-4 text-slate-300" />
                </div>
                <div className="text-3xl font-mono font-extrabold text-white">
                  {formatPrice(avgOrderValue)}
                </div>
                <span className="text-xs font-mono text-slate-400 mt-2 block">
                  Retail single-piece & bundle orders
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase">INQUIRIES</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-mono font-extrabold text-white">
                  {inquiries.length}
                </div>
                <button
                  onClick={() => setActiveTab('quotes')}
                  className="text-xs font-mono text-[#00ff87] font-bold hover:underline mt-2 block"
                >
                  Manage Inquiries →
                </button>
              </div>
            </div>

            {/* Visual Analytics Chart: Revenue by Category */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0b0f19] border border-slate-800 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-mono font-bold text-base uppercase text-white">
                    SALES DISTRIBUTION BY CATEGORY
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Live retail metrics</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#00ff87] bg-[#00ff87]/20 border border-[#00ff87]/40 px-3 py-1 rounded-full">
                  MONTHLY VOLUME
                </span>
              </div>

              {/* Bar Visualization */}
              <div className="space-y-4 font-mono text-xs">
                {[
                  { name: 'HOODIES', revenue: 58900, count: '148 pcs', pct: 85, color: '#00ff87' },
                  { name: 'JACKETS', revenue: 42100, count: '92 pcs', pct: 68, color: '#00f0ff' },
                  { name: 'T-SHIRTS', revenue: 29800, count: '210 pcs', pct: 54, color: '#faff00' },
                  { name: 'TRACKSUITS', revenue: 24500, count: '45 sets', pct: 44, color: '#38bdf8' },
                  { name: 'TRACKPANTS', revenue: 16700, count: '85 pcs', pct: 32, color: '#fb923c' },
                  { name: 'SWEATERS & BEANIES', revenue: 14200, count: '110 pcs', pct: 28, color: '#a855f7' },
                ].map((row) => (
                  <div key={row.name} className="space-y-1.5">
                    <div className="flex justify-between text-slate-300">
                      <span className="font-bold text-white">{row.name}</span>
                      <span>
                        {formatPrice(row.revenue)} • <strong className="text-white">{row.count}</strong>
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full rounded-full transition-all duration-500 shadow-neon-sm"
                        style={{ width: `${row.pct}%`, backgroundColor: row.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders Quick Actions Table */}
            <div className="bg-[#0b0f19] rounded-2xl p-6 border border-slate-800 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-mono font-bold text-base uppercase text-white">
                  RECENT ORDERS
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-mono font-bold text-[#00ff87] hover:underline"
                >
                  VIEW ALL ORDERS →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-3 font-bold uppercase">ORDER ID</th>
                      <th className="pb-3 font-bold uppercase">CUSTOMER</th>
                      <th className="pb-3 font-bold uppercase">ITEMS</th>
                      <th className="pb-3 font-bold uppercase">TOTAL</th>
                      <th className="pb-3 font-bold uppercase">STATUS</th>
                      <th className="pb-3 font-bold uppercase text-right">QUICK UPDATE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="py-3 font-bold text-white">#{ord.id}</td>
                        <td className="py-3 text-slate-300">
                          <span className="font-bold block text-white">{ord.customer.name}</span>
                          <span className="text-[10px] text-slate-400">{ord.customer.city}</span>
                        </td>
                        <td className="py-3 text-slate-300">
                          {ord.items.length} styles ({ord.items.reduce((s, i) => s + i.quantity, 0)} pcs)
                        </td>
                        <td className="py-3 font-bold text-[#00ff87]">{formatPrice(ord.total)}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ord.orderStatus === 'DELIVERED'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : ord.orderStatus === 'SHIPPED'
                                ? 'bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/40'
                                : 'bg-amber-950 text-amber-400 border border-amber-800'
                            }`}
                          >
                            {ord.orderStatus}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="text-xs p-1 rounded border border-slate-700 bg-slate-900 text-white font-mono cursor-pointer"
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="IN_PRODUCTION">IN PRODUCTION</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-[#0b0f19] rounded-2xl p-6 border border-slate-800 shadow-lg space-y-5">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 border border-slate-700 rounded-xl px-3 py-2 w-full sm:w-80 bg-slate-900">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search order ID, client or AWB..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="bg-transparent text-xs w-full focus:outline-none font-mono text-white placeholder-slate-500"
                />
              </div>

              <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto font-mono text-xs">
                {['ALL', 'CONFIRMED', 'IN_PRODUCTION', 'SHIPPED', 'DELIVERED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg border uppercase transition-colors ${
                      orderStatusFilter === st
                        ? 'bg-[#00ff87] text-[#06080e] border-[#00ff87] font-bold shadow-neon-sm'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-bold uppercase">ORDER</th>
                    <th className="pb-3 font-bold uppercase">DATE</th>
                    <th className="pb-3 font-bold uppercase">CLIENT</th>
                    <th className="pb-3 font-bold uppercase">PAYMENT</th>
                    <th className="pb-3 font-bold uppercase">TOTAL</th>
                    <th className="pb-3 font-bold uppercase">CURRENT STATUS</th>
                    <th className="pb-3 font-bold uppercase text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="py-4">
                        <span className="font-extrabold text-white block">#{ord.id}</span>
                        <span className="text-[10px] text-slate-400">{ord.trackingNumber}</span>
                      </td>
                      <td className="py-4 text-slate-400">{formatDate(ord.createdAt)}</td>
                      <td className="py-4">
                        <strong className="text-white block">{ord.customer.name}</strong>
                        <span className="text-[10px] text-slate-400">{ord.customer.phone}</span>
                      </td>
                      <td className="py-4">
                        <span className="font-bold text-white">{ord.paymentMethod}</span>
                        <span className="text-[10px] text-[#00ff87] block">PAID</span>
                      </td>
                      <td className="py-4 font-mono font-extrabold text-[#00ff87]">
                        {formatPrice(ord.total)}
                      </td>
                      <td className="py-4">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className={`text-xs font-mono font-bold p-1.5 rounded border ${
                            ord.orderStatus === 'DELIVERED'
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                              : ord.orderStatus === 'SHIPPED'
                              ? 'bg-[#00ff87]/20 text-[#00ff87] border-[#00ff87]'
                              : 'bg-amber-950 text-amber-400 border-amber-800'
                          }`}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="IN_PRODUCTION">IN PRODUCTION</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-[#00ff87] hover:text-[#06080e] text-white font-bold transition-colors"
                        >
                          VIEW INVOICE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS & INVENTORY */}
        {activeTab === 'products' && (
          <div className="bg-[#0b0f19] rounded-2xl p-6 border border-slate-800 shadow-lg space-y-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto font-mono text-xs">
                {['ALL', 'HOODIES', 'JACKETS', 'T-SHIRTS', 'POLOS', 'TRACKSUITS', 'TRACKPANTS'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setProductCategoryFilter(c)}
                    className={`px-3 py-1.5 rounded-lg border uppercase transition-colors ${
                      productCategoryFilter === c
                        ? 'bg-[#00ff87] text-[#06080e] font-bold'
                        : 'bg-slate-900 text-slate-300 border-slate-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold uppercase transition-all shadow-neon flex items-center gap-2 flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>ADD NEW PRODUCT</span>
              </button>
            </div>

            {/* Products Table with aspect-[4/5] aligned thumbnail */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-bold uppercase">PRODUCT</th>
                    <th className="pb-3 font-bold uppercase">CATEGORY</th>
                    <th className="pb-3 font-bold uppercase">RETAIL PRICE</th>
                    <th className="pb-3 font-bold uppercase">COMPARE PRICE</th>
                    <th className="pb-3 font-bold uppercase">STOCK QTY</th>
                    <th className="pb-3 font-bold uppercase text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="py-3 flex items-center gap-3">
                        <div className="relative w-11 h-14 rounded-lg bg-slate-950 overflow-hidden flex-shrink-0 border border-slate-800">
                          <Image src={p.images[0]} alt={p.name} fill unoptimized className="object-cover" />
                        </div>
                        <div>
                          <strong className="text-white block truncate max-w-xs">{p.name}</strong>
                          <span className="text-[10px] text-slate-400">{p.sku}</span>
                        </div>
                      </td>
                      <td className="py-3 text-slate-300">{p.category}</td>
                      <td className="py-3 font-bold text-[#00ff87]">{formatPrice(p.price)}</td>
                      <td className="py-3 text-slate-500 line-through">{formatPrice(p.compareAtPrice)}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded font-bold ${
                            p.stockCount < 50
                              ? 'bg-amber-950 text-amber-400 border border-amber-800'
                              : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          }`}
                        >
                          {p.stockCount} units
                        </span>
                      </td>
                      <td className="py-3 text-right space-x-2">
                        <button
                          onClick={() => {
                            const newStock = prompt(`Update stock for ${p.name}:`, String(p.stockCount));
                            if (newStock !== null && !isNaN(Number(newStock))) {
                              updateProduct(p.id, { stockCount: Number(newStock) });
                              showToast(`Stock updated for ${p.name}`);
                            }
                          }}
                          className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700"
                        >
                          EDIT STOCK
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove ${p.name} from store catalog?`)) {
                              deleteProduct(p.id);
                              showToast(`Removed ${p.name}`);
                            }
                          }}
                          className="px-2 py-1 rounded text-red-400 hover:bg-red-950/40"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: B2B INQUIRIES & QUOTES */}
        {activeTab === 'quotes' && (
          <div className="bg-[#0b0f19] rounded-2xl p-6 border border-slate-800 shadow-lg space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-mono font-bold text-base uppercase text-white">
                  RETAIL PERSONALIZATION & BESPOKE INQUIRIES
                </h3>
                <span className="text-xs font-mono text-slate-400">Submitted by store visitors</span>
              </div>
            </div>

            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold font-mono text-white">
                          {inq.companyName}
                        </strong>
                        <span className="text-xs font-mono text-slate-400">({inq.contactName})</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            inq.status === 'QUOTE_ISSUED'
                              ? 'bg-[#00ff87]/20 text-[#00ff87]'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        Email: {inq.email} • Phone: {inq.phone} • Submitted {formatDate(inq.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                        className="p-1.5 rounded border border-slate-700 bg-slate-900 text-white font-mono text-xs"
                      >
                        <option value="PENDING_REVIEW">PENDING REVIEW</option>
                        <option value="QUOTE_ISSUED">QUOTE ISSUED</option>
                        <option value="SAMPLING">SAMPLING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>

                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                          inq.contactName
                        )}%2C%20Slate%20Apparels%20New%20Delhi%20is%20contacting%20you%20regarding%20inquiry%20${inq.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-neon-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WHATSAPP CLIENT</span>
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block">PRODUCT:</span>
                      <strong className="text-white">{inq.productInterested}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">REQUESTED QUANTITY:</span>
                      <strong className="text-white">{inq.estimatedQuantity} pieces</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">QUOTED REVENUE:</span>
                      <strong className="text-[#00ff87]">
                        {inq.quotedPrice ? formatPrice(inq.quotedPrice) : 'Pending Quote'}
                      </strong>
                    </div>
                    <div className="sm:col-span-3 pt-1 border-t border-slate-800">
                      <span className="text-slate-400">CUSTOM SPECS:</span> <span className="text-slate-300">{inq.customizationDetails}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CLIENT DIRECTORY */}
        {activeTab === 'customers' && (
          <div className="bg-[#0b0f19] rounded-2xl p-6 border border-slate-800 shadow-lg space-y-5">
            <h3 className="font-mono font-bold text-base uppercase text-white">
              REGISTERED CLIENTS & VIP BUYERS
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-bold uppercase">CLIENT NAME</th>
                    <th className="pb-3 font-bold uppercase">COMPANY</th>
                    <th className="pb-3 font-bold uppercase">CONTACT</th>
                    <th className="pb-3 font-bold uppercase">ORDERS PLACED</th>
                    <th className="pb-3 font-bold uppercase">LIFETIME SPEND</th>
                    <th className="pb-3 font-bold uppercase">TIER</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { name: 'Arjun Malhotra', company: 'NEOM Retail Partner LLP', email: 'arjun@retailbrands.in', phone: '+91 98110 54321', orders: 2, spent: 6796, tier: 'RETAIL VIP' },
                    { name: 'Rohit Verma', company: 'Apex Streetwear Mumbai', email: 'rohit@apexstreet.in', phone: '+91 98200 44112', orders: 5, spent: 142500, tier: 'ENTERPRISE VIP' },
                    { name: 'Priya Sundaram', company: 'Velocity Athletic Club', email: 'priya@velocityclub.com', phone: '+91 97110 88231', orders: 1, spent: 28900, tier: 'TIER 1 CLIENT' },
                  ].map((cli, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                      <td className="py-3 font-bold text-white">{cli.name}</td>
                      <td className="py-3 text-slate-300">{cli.company}</td>
                      <td className="py-3 text-slate-400">
                        {cli.email}<br />{cli.phone}
                      </td>
                      <td className="py-3 font-bold text-white">{cli.orders} orders</td>
                      <td className="py-3 font-bold text-[#00ff87]">{formatPrice(cli.spent)}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/30">
                          {cli.tier}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS & COUPONS */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Promo Codes Manager */}
            <div className="bg-[#0b0f19] rounded-2xl p-6 border border-slate-800 shadow-lg space-y-4">
              <h3 className="font-mono font-bold text-base uppercase text-white">
                DISCOUNT COUPON GENERATOR
              </h3>

              <form onSubmit={handleAddCoupon} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Coupon Code (e.g. FESTIVE25)"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-mono uppercase focus:outline-none focus:border-[#00ff87]"
                  />
                  <input
                    type="number"
                    min="5"
                    max="50"
                    required
                    placeholder="% Off"
                    value={newCouponPercent}
                    onChange={(e) => setNewCouponPercent(Number(e.target.value))}
                    className="w-20 px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-[#00ff87]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold rounded-lg transition-colors shadow-neon-sm"
                  >
                    ADD
                  </button>
                </div>
              </form>

              <div className="space-y-2 pt-2 border-t border-slate-800 font-mono text-xs">
                {couponsList.map((c) => (
                  <div
                    key={c.code}
                    className="flex justify-between items-center p-3 rounded-xl bg-slate-900 border border-slate-800"
                  >
                    <div>
                      <strong className="text-white">{c.code}</strong>
                      <span className="text-slate-400 block text-[10px]">{c.uses} redeemed times</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#00ff87]/20 text-[#00ff87] font-bold border border-[#00ff87]/40">
                      {c.percent}% DISCOUNT
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Store Operational Settings */}
            <div className="bg-[#0b0f19] rounded-2xl p-6 border border-slate-800 shadow-lg space-y-4 font-mono text-xs">
              <h3 className="font-bold text-base uppercase text-white">
                FINANCIAL RULES & TAX CONFIG
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-slate-400 block mb-1">Apparel GST Rate</label>
                  <input
                    type="text"
                    defaultValue="5% Single Piece Apparel"
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 text-white rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Free Shipping Threshold (₹)</label>
                  <input
                    type="number"
                    defaultValue={999}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 text-white rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Carrier API Webhook</label>
                  <input
                    type="text"
                    defaultValue="https://api.bluedart.com/tracking/v2/slate-delhi"
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 text-white rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => showToast('Financial rules updated')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-mono text-xs font-bold transition-all"
                >
                  SAVE CONFIGURATION
                </button>
              </div>
            </div>
          </div>
        )}
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
                <span>TOTAL REVENUE:</span>
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

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#0b0f19] rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-700 text-white max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-mono font-bold text-base uppercase text-white">
                CREATE NEW PRODUCT DROP
              </h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Acid Wash Heavyweight Pullover"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00ff87]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00ff87]"
                  >
                    <option value="HOODIES">HOODIES</option>
                    <option value="JACKETS">JACKETS</option>
                    <option value="T-SHIRTS">T-SHIRTS</option>
                    <option value="POLOS">POLOS</option>
                    <option value="TRACKSUITS">TRACKSUITS</option>
                    <option value="TRACKPANTS">TRACKPANTS</option>
                    <option value="SWEATERS">SWEATERS</option>
                    <option value="BEANIES">BEANIES</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                    Badge
                  </label>
                  <select
                    value={newProdBadge}
                    onChange={(e) => setNewProdBadge(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00ff87]"
                  >
                    <option value="NEW DROP">NEW DROP</option>
                    <option value="BESTSELLER">BESTSELLER</option>
                    <option value="HEAVYWEIGHT">HEAVYWEIGHT</option>
                    <option value="LIMITED">LIMITED</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                    Retail Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00ff87]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                    Compare Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={newProdComparePrice}
                    onChange={(e) => setNewProdComparePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00ff87]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00ff87]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                  Fabric Specs / GSM
                </label>
                <input
                  type="text"
                  required
                  value={newProdFabric}
                  onChange={(e) => setNewProdFabric(e.target.value)}
                  placeholder="380 GSM Brushed Heavyweight Fleece"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00ff87]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newProdDescription}
                  onChange={(e) => setNewProdDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00ff87]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold uppercase tracking-wider transition-all shadow-neon mt-2"
              >
                PUBLISH TO STOREFRONT
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
