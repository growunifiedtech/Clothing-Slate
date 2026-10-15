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
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 120800; // includes previous reconciled batch
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
      bulkTiers: [
        { minQty: 5, discountPercentage: 15, pricePerUnit: Math.round(newProdPrice * 0.85) },
        { minQty: 20, discountPercentage: 30, pricePerUnit: Math.round(newProdPrice * 0.7) },
      ],
      specifications: {
        gsm: newProdFabric,
        composition: '100% Combed Heavy Cotton',
        fit: 'Relaxed Silhouette',
      },
    });
    setShowAddProductModal(false);
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
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="bg-[#0b0f19] rounded-2xl p-6 text-white border border-slate-800 shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#05f26c] text-[#0b0f19] flex items-center justify-center font-mono font-black text-xl shadow-neon">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-wider uppercase text-white">
                  SLATE ADMIN CONSOLE
                </h1>
                <span className="w-2 h-2 rounded-full bg-[#05f26c] animate-ping" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#05f26c]">
                  LIVE SYSTEM
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                New Delhi Manufacturing Facility • Orders, Inventory & B2B Production Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
            >
              <span>VIEW STOREFRONT</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#05f26c]" />
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold transition-colors"
            >
              CUSTOMER PORTAL
            </Link>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-200 text-xs font-mono font-bold uppercase">
          {[
            { id: 'overview', label: 'OVERVIEW & ANALYTICS', icon: LayoutDashboard },
            { id: 'orders', label: `ORDERS (${orders.length})`, icon: Package },
            { id: 'products', label: `PRODUCTS & STOCK (${products.length})`, icon: Layers },
            { id: 'quotes', label: `B2B INQUIRIES (${inquiries.length})`, icon: MessageSquare },
            { id: 'customers', label: 'CLIENT DIRECTORY', icon: Users },
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
                    ? 'bg-[#0b0f19] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#05f26c]' : 'text-slate-400'}`} />
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
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase">GROSS REVENUE</span>
                  <DollarSign className="w-4 h-4 text-[#047857]" />
                </div>
                <div className="text-3xl font-mono font-extrabold text-slate-900">
                  {formatPrice(totalRevenue)}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#047857] font-bold mt-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% vs last cycle</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase">TOTAL ORDERS</span>
                  <Package className="w-4 h-4 text-slate-700" />
                </div>
                <div className="text-3xl font-mono font-extrabold text-slate-900">
                  {totalOrdersCount}
                </div>
                <span className="text-xs font-mono text-slate-500 mt-2 block">
                  {pendingOrdersCount} pending dispatch
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase">AVG ORDER VALUE</span>
                  <ShoppingBag className="w-4 h-4 text-slate-700" />
                </div>
                <div className="text-3xl font-mono font-extrabold text-slate-900">
                  {formatPrice(avgOrderValue)}
                </div>
                <span className="text-xs font-mono text-slate-500 mt-2 block">
                  Includes wholesale tier orders
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase">B2B INQUIRIES</span>
                  <Clock className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-3xl font-mono font-extrabold text-slate-900">
                  {inquiries.length}
                </div>
                <button
                  onClick={() => setActiveTab('quotes')}
                  className="text-xs font-mono text-[#047857] font-bold hover:underline mt-2 block"
                >
                  Manage Inquiries →
                </button>
              </div>
            </div>

            {/* Visual Analytics Chart: Revenue by Category */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-soft">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-mono font-bold text-base uppercase text-slate-900">
                    SALES DISTRIBUTION BY CATEGORY
                  </h3>
                  <span className="text-xs font-mono text-slate-500">Live production metrics</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#047857] bg-[#05f26c]/20 px-3 py-1 rounded-full">
                  MONTHLY VOLUME
                </span>
              </div>

              {/* Bar Visualization */}
              <div className="space-y-4 font-mono text-xs">
                {[
                  { name: 'HOODIES', revenue: 58900, count: '148 pcs', pct: 85, color: '#05f26c' },
                  { name: 'JACKETS', revenue: 42100, count: '92 pcs', pct: 68, color: '#00f0ff' },
                  { name: 'T-SHIRTS', revenue: 29800, count: '210 pcs', pct: 54, color: '#b026ff' },
                  { name: 'TRACKSUITS', revenue: 24500, count: '45 sets', pct: 44, color: '#3b82f6' },
                  { name: 'TRACKPANTS', revenue: 16700, count: '85 pcs', pct: 32, color: '#f59e0b' },
                  { name: 'SWEATERS & BEANIES', revenue: 14200, count: '110 pcs', pct: 28, color: '#10b981' },
                ].map((row) => (
                  <div key={row.name} className="space-y-1.5">
                    <div className="flex justify-between text-slate-700">
                      <span className="font-bold">{row.name}</span>
                      <span>
                        {formatPrice(row.revenue)} • <strong className="text-slate-900">{row.count}</strong>
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${row.pct}%`, backgroundColor: row.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders Quick Actions Table */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-mono font-bold text-base uppercase text-slate-900">
                  RECENT ORDERS
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-mono font-bold text-[#047857] hover:underline"
                >
                  VIEW ALL ORDERS →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400">
                      <th className="pb-3 font-bold uppercase">ORDER ID</th>
                      <th className="pb-3 font-bold uppercase">CUSTOMER</th>
                      <th className="pb-3 font-bold uppercase">ITEMS</th>
                      <th className="pb-3 font-bold uppercase">TOTAL</th>
                      <th className="pb-3 font-bold uppercase">STATUS</th>
                      <th className="pb-3 font-bold uppercase text-right">QUICK UPDATE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 font-bold text-slate-900">#{ord.id}</td>
                        <td className="py-3 text-slate-700">
                          <span className="font-bold block">{ord.customer.name}</span>
                          <span className="text-[10px] text-slate-400">{ord.customer.city}</span>
                        </td>
                        <td className="py-3 text-slate-600">
                          {ord.items.length} styles ({ord.items.reduce((s, i) => s + i.quantity, 0)} pcs)
                        </td>
                        <td className="py-3 font-bold text-slate-900">{formatPrice(ord.total)}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ord.orderStatus === 'DELIVERED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.orderStatus === 'SHIPPED'
                                ? 'bg-[#05f26c]/20 text-[#047857]'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {ord.orderStatus}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="text-xs p-1 rounded border border-slate-200 bg-white font-mono cursor-pointer"
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
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft space-y-5">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 w-full sm:w-80 bg-slate-50">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search order ID, client or AWB..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="bg-transparent text-xs w-full focus:outline-none font-mono"
                />
              </div>

              <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto font-mono text-xs">
                {['ALL', 'CONFIRMED', 'IN_PRODUCTION', 'SHIPPED', 'DELIVERED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg border uppercase transition-colors ${
                      orderStatusFilter === st
                        ? 'bg-[#0b0f19] text-white border-[#0b0f19] font-bold'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
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
                  <tr className="border-b border-slate-200 text-slate-400">
                    <th className="pb-3 font-bold uppercase">ORDER</th>
                    <th className="pb-3 font-bold uppercase">DATE</th>
                    <th className="pb-3 font-bold uppercase">CLIENT</th>
                    <th className="pb-3 font-bold uppercase">PAYMENT</th>
                    <th className="pb-3 font-bold uppercase">TOTAL</th>
                    <th className="pb-3 font-bold uppercase">CURRENT STATUS</th>
                    <th className="pb-3 font-bold uppercase text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4">
                        <span className="font-extrabold text-slate-900 block">#{ord.id}</span>
                        <span className="text-[10px] text-slate-400">{ord.trackingNumber}</span>
                      </td>
                      <td className="py-4 text-slate-600">{formatDate(ord.createdAt)}</td>
                      <td className="py-4">
                        <strong className="text-slate-900 block">{ord.customer.name}</strong>
                        <span className="text-[10px] text-slate-400">{ord.customer.phone}</span>
                      </td>
                      <td className="py-4">
                        <span className="font-bold text-slate-800">{ord.paymentMethod}</span>
                        <span className="text-[10px] text-emerald-600 block">PAID</span>
                      </td>
                      <td className="py-4 font-mono font-extrabold text-slate-900">
                        {formatPrice(ord.total)}
                      </td>
                      <td className="py-4">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className={`text-xs font-mono font-bold p-1.5 rounded border ${
                            ord.orderStatus === 'DELIVERED'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : ord.orderStatus === 'SHIPPED'
                              ? 'bg-[#05f26c]/20 text-[#047857] border-[#05f26c]'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
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
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors"
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
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft space-y-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto font-mono text-xs">
                {['ALL', 'HOODIES', 'JACKETS', 'T-SHIRTS', 'POLOS', 'TRACKSUITS', 'TRACKPANTS'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setProductCategoryFilter(c)}
                    className={`px-3 py-1.5 rounded-lg border uppercase transition-colors ${
                      productCategoryFilter === c
                        ? 'bg-[#0b0f19] text-white font-bold'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#05f26c] text-[#0b0f19] hover:bg-[#00e575] font-mono text-xs font-bold uppercase transition-all shadow-neon-sm flex items-center gap-2 flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>ADD NEW PRODUCT</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400">
                    <th className="pb-3 font-bold uppercase">PRODUCT</th>
                    <th className="pb-3 font-bold uppercase">CATEGORY</th>
                    <th className="pb-3 font-bold uppercase">RETAIL PRICE</th>
                    <th className="pb-3 font-bold uppercase">COMPARE PRICE</th>
                    <th className="pb-3 font-bold uppercase">STOCK QTY</th>
                    <th className="pb-3 font-bold uppercase text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 flex items-center gap-3">
                        <div className="relative w-11 h-14 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                          <Image src={p.images[0]} alt={p.name} fill unoptimized className="object-cover" />
                        </div>
                        <div>
                          <strong className="text-slate-900 block truncate max-w-xs">{p.name}</strong>
                          <span className="text-[10px] text-slate-400">{p.sku}</span>
                        </div>
                      </td>
                      <td className="py-3 text-slate-600">{p.category}</td>
                      <td className="py-3 font-bold text-slate-900">{formatPrice(p.price)}</td>
                      <td className="py-3 text-slate-400 line-through">{formatPrice(p.compareAtPrice)}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded font-bold ${
                            p.stockCount < 50
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
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
                            }
                          }}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                        >
                          EDIT STOCK
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove ${p.name} from store catalog?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="px-2 py-1 rounded text-red-500 hover:bg-red-50"
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
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-mono font-bold text-base uppercase text-slate-900">
                  B2B WHOLESALE & CUSTOM BRANDING INQUIRIES
                </h3>
                <span className="text-xs font-mono text-slate-500">Submitted by retail buyers</span>
              </div>
            </div>

            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold font-mono text-slate-900">
                          {inq.companyName}
                        </strong>
                        <span className="text-xs font-mono text-slate-500">({inq.contactName})</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            inq.status === 'QUOTE_ISSUED'
                              ? 'bg-[#05f26c]/20 text-[#047857]'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-500">
                        Email: {inq.email} • Phone: {inq.phone} • Submitted {formatDate(inq.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                        className="p-1.5 rounded border border-slate-300 bg-white font-mono text-xs"
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
                        className="px-3 py-1.5 rounded-lg bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WHATSAPP CLIENT</span>
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-white rounded-xl border border-slate-200 text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block">PRODUCT:</span>
                      <strong>{inq.productInterested}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">REQUESTED QUANTITY:</span>
                      <strong>{inq.estimatedQuantity} pieces</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">QUOTED REVENUE:</span>
                      <strong className="text-[#047857]">
                        {inq.quotedPrice ? formatPrice(inq.quotedPrice) : 'Pending Quote'}
                      </strong>
                    </div>
                    <div className="sm:col-span-3 pt-1 border-t border-slate-100">
                      <span className="text-slate-400">CUSTOM SPECS:</span> {inq.customizationDetails}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CLIENT DIRECTORY */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft space-y-5">
            <h3 className="font-mono font-bold text-base uppercase text-slate-900">
              REGISTERED COMMERCIAL BUYERS & CLIENTS
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400">
                    <th className="pb-3 font-bold uppercase">CLIENT NAME</th>
                    <th className="pb-3 font-bold uppercase">COMPANY</th>
                    <th className="pb-3 font-bold uppercase">CONTACT</th>
                    <th className="pb-3 font-bold uppercase">ORDERS PLACED</th>
                    <th className="pb-3 font-bold uppercase">LIFETIME SPEND</th>
                    <th className="pb-3 font-bold uppercase">TIER</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: 'Arjun Malhotra', company: 'NEOM Retail Partner LLP', email: 'arjun@retailbrands.in', phone: '+91 98110 54321', orders: 2, spent: 6796, tier: 'TIER 2 WHOLESALE' },
                    { name: 'Rohit Verma', company: 'Apex Streetwear Mumbai', email: 'rohit@apexstreet.in', phone: '+91 98200 44112', orders: 5, spent: 142500, tier: 'ENTERPRISE VIP' },
                    { name: 'Priya Sundaram', company: 'Velocity Athletic Club', email: 'priya@velocityclub.com', phone: '+91 97110 88231', orders: 1, spent: 28900, tier: 'TIER 1 CLIENT' },
                  ].map((cli, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 font-bold text-slate-900">{cli.name}</td>
                      <td className="py-3 text-slate-700">{cli.company}</td>
                      <td className="py-3 text-slate-500">
                        {cli.email}<br />{cli.phone}
                      </td>
                      <td className="py-3 font-bold text-slate-900">{cli.orders} orders</td>
                      <td className="py-3 font-bold text-[#047857]">{formatPrice(cli.spent)}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#05f26c]/20 text-[#047857]">
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
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft space-y-4">
              <h3 className="font-mono font-bold text-base uppercase text-slate-900">
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
                    className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg font-mono uppercase"
                  />
                  <input
                    type="number"
                    min="5"
                    max="50"
                    required
                    placeholder="% Off"
                    value={newCouponPercent}
                    onChange={(e) => setNewCouponPercent(Number(e.target.value))}
                    className="w-20 px-3 py-2 text-xs border border-slate-200 rounded-lg font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-mono text-xs font-bold rounded-lg transition-colors"
                  >
                    ADD
                  </button>
                </div>
              </form>

              <div className="space-y-2 pt-2 border-t border-slate-100 font-mono text-xs">
                {couponsList.map((c) => (
                  <div
                    key={c.code}
                    className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <div>
                      <strong className="text-slate-900">{c.code}</strong>
                      <span className="text-slate-400 block text-[10px]">{c.uses} redeemed times</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#05f26c]/20 text-[#047857] font-bold">
                      {c.percent}% DISCOUNT
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Store Operational Settings */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft space-y-4 font-mono text-xs">
              <h3 className="font-bold text-base uppercase text-slate-900">
                FINANCIAL RULES & TAX CONFIG
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-slate-500 block mb-1">Apparel GST Rate</label>
                  <input
                    type="text"
                    defaultValue="5% Single Piece / 12% Bulk Fabric"
                    className="w-full p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Free Express Shipping Threshold</label>
                  <input
                    type="text"
                    defaultValue="₹1,999 (Pan-India Air Freight)"
                    className="w-full p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Primary WhatsApp Desk</label>
                  <input
                    type="text"
                    defaultValue="+91 9599084873"
                    className="w-full p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <button
                onClick={() => showToast('Store settings saved')}
                className="w-full py-3 rounded-xl bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-bold uppercase transition-all mt-4"
              >
                UPDATE CONFIGURATION
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Invoice Modal for Admin */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto font-mono text-xs">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-200 pb-4 mb-4">
              <span className="text-slate-400 uppercase text-[10px]">FACTORY PACKING SLIP & INVOICE</span>
              <h3 className="text-lg font-bold text-slate-900 uppercase">ORDER #{selectedOrder.id}</h3>
              <span className="text-slate-500">Carrier: {selectedOrder.carrier} • AWB: {selectedOrder.trackingNumber}</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 mb-4">
              <div>
                <strong>Client:</strong> {selectedOrder.customer.name} ({selectedOrder.customer.phone})
              </div>
              <div>
                <strong>Address:</strong> {selectedOrder.customer.address}, {selectedOrder.customer.city}, {selectedOrder.customer.state} - {selectedOrder.customer.pincode}
              </div>
              <div>
                <strong>Payment:</strong> {selectedOrder.paymentMethod} • Status: {selectedOrder.paymentStatus}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="font-bold border-b border-slate-200 pb-1 text-slate-400">DISPATCH MANIFEST</div>
              {selectedOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-100">
                  <div>
                    <strong className="text-slate-900">{it.name}</strong>
                    <span className="text-[10px] text-slate-500 block">Size {it.size} • Color {it.color}</span>
                  </div>
                  <div className="text-right">
                    <span>{it.quantity} units</span>
                    <strong className="block text-slate-900">{formatPrice(it.price * it.quantity)}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-base font-bold text-slate-950 pt-2 border-t border-slate-200 mb-6">
              <span>TOTAL REVENUE:</span>
              <span>{formatPrice(selectedOrder.total)}</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl bg-slate-900 text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-bold uppercase transition-all flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT PACKING SLIP</span>
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-100"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-mono font-bold text-base uppercase text-slate-900">
                ADD NEW PRODUCT TO CATALOG
              </h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-slate-400 hover:text-slate-900 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-slate-500 uppercase mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Heavy Acid-Wash Streetwear Hoodie"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 uppercase mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white"
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
                  <label className="block text-slate-500 uppercase mb-1">Badge Tag</label>
                  <select
                    value={newProdBadge}
                    onChange={(e) => setNewProdBadge(e.target.value as any)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="NEW DROP">NEW DROP</option>
                    <option value="BESTSELLER">BESTSELLER</option>
                    <option value="HOT SELLER">HOT SELLER</option>
                    <option value="HEAVYWEIGHT">HEAVYWEIGHT</option>
                    <option value="LIMITED">LIMITED</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-500 uppercase mb-1">Retail Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 uppercase mb-1">Compare Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProdComparePrice}
                    onChange={(e) => setNewProdComparePrice(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 uppercase mb-1">Stock Count</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 uppercase mb-1">Fabric & GSM Specification</label>
                <input
                  type="text"
                  required
                  value={newProdFabric}
                  onChange={(e) => setNewProdFabric(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-500 uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={newProdDescription}
                  onChange={(e) => setNewProdDescription(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0b0f19] text-white hover:bg-[#05f26c] hover:text-[#0b0f19] font-bold uppercase transition-all shadow-md"
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
