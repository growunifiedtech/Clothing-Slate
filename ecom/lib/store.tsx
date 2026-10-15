'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, ECOM_PRODUCTS } from './products-data';
import { generateOrderId } from './utils';

export type { Product } from './products-data';

export interface CartItem {
  id: string; // unique item key: productId-size-color
  productId: string;
  name: string;
  image: string;
  category: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  originalPrice: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  type: 'HOME' | 'OFFICE' | 'WAREHOUSE';
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'IN_PRODUCTION' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  title: string;
  time: string;
  completed: boolean;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: 'UPI' | 'CARD' | 'NETBANKING' | 'COD';
  paymentStatus: 'PAID' | 'PENDING';
  orderStatus: OrderStatus;
  trackingNumber: string;
  carrier: string;
  timeline: OrderTimelineEvent[];
  notes?: string;
}

export interface BulkInquiry {
  id: string;
  createdAt: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  productInterested: string;
  estimatedQuantity: number;
  targetDate: string;
  customizationDetails: string;
  status: 'PENDING_REVIEW' | 'QUOTE_ISSUED' | 'SAMPLING' | 'APPROVED' | 'CLOSED';
  quotedPrice?: number;
}

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (newProd: Omit<Product, 'id' | 'slug'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  shippingFee: number;
  taxAmount: number;
  discountAmount: number;
  grandTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (orderData: {
    customer: Order['customer'];
    paymentMethod: Order['paymentMethod'];
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // Addresses
  addresses: Address[];
  addAddress: (addr: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, addr: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Inquiries
  inquiries: BulkInquiry[];
  submitInquiry: (inquiry: Omit<BulkInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: BulkInquiry['status'], quotedPrice?: number) => void;

  // Global Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_COUPONS: Coupon[] = [
  { code: 'NEON10', discountPercent: 10, description: '10% OFF on all orders' },
  { code: 'SLATE20', discountPercent: 20, description: '20% OFF on orders above ₹2,500' },
  { code: 'FIRSTDROP', discountPercent: 15, description: '15% OFF for new brand launches' },
];

const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Arjun Malhotra',
    phone: '+91 98110 54321',
    street: 'B-42, Defence Colony, Flyover Road',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110024',
    isDefault: true,
    type: 'OFFICE',
  },
  {
    id: 'addr-2',
    fullName: 'Arjun Malhotra',
    phone: '+91 98110 54321',
    street: 'House 18, Block C, Vasant Vihar',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110057',
    isDefault: false,
    type: 'HOME',
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'SLT-89240',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    customer: {
      name: 'Arjun Malhotra',
      email: 'arjun.malhotra@retailbrands.in',
      phone: '+91 98110 54321',
      address: 'B-42, Defence Colony, Flyover Road',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110024',
    },
    items: [
      {
        productId: 'oversized-hoodies',
        name: 'Heavy Fleece Oversized Pullover Hoodie',
        image: '/images/products/oversized-hoodies-1.jpg',
        size: 'L',
        color: 'Jet Black',
        quantity: 2,
        price: 1499,
      },
      {
        productId: 'balloon-fit-trackpants',
        name: 'Architectural Balloon Fit Wide Trackpants',
        image: '/images/products/balloon-fit-trackpants-1.jpg',
        size: 'M',
        color: 'Pitch Black',
        quantity: 1,
        price: 999,
      },
    ],
    subtotal: 3997,
    discount: 399,
    tax: 179,
    shipping: 0,
    total: 3777,
    paymentMethod: 'UPI',
    paymentStatus: 'PAID',
    orderStatus: 'SHIPPED',
    trackingNumber: 'DEL-EXP-99201548',
    carrier: 'BlueDart Express Air',
    timeline: [
      { status: 'PENDING', title: 'Order Placed & Verified', time: '2 days ago, 10:15 AM', completed: true },
      { status: 'CONFIRMED', title: 'Payment Confirmed via UPI', time: '2 days ago, 10:16 AM', completed: true },
      { status: 'IN_PRODUCTION', title: 'Quality Audited & Packaged at Okhla Floor', time: 'Yesterday, 03:30 PM', completed: true },
      { status: 'SHIPPED', title: 'Handed to BlueDart Express Air', time: 'Today, 08:45 AM', completed: true },
      { status: 'DELIVERED', title: 'Out for Delivery to Client Address', time: 'Estimated Tomorrow', completed: false },
    ],
  },
  {
    id: 'SLT-78104',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    customer: {
      name: 'Arjun Malhotra',
      email: 'arjun.malhotra@retailbrands.in',
      phone: '+91 98110 54321',
      address: 'B-42, Defence Colony, Flyover Road',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110024',
    },
    items: [
      {
        productId: 'oversized-t-shirt-drop-shoulder',
        name: 'Oversized Heavyweight T-Shirt (Drop Shoulder)',
        image: '/images/products/oversized-t-shirt-drop-shoulder-1.jpg',
        size: 'XL',
        color: 'Sage Olive',
        quantity: 4,
        price: 799,
      },
    ],
    subtotal: 3196,
    discount: 320,
    tax: 143,
    shipping: 0,
    total: 3019,
    paymentMethod: 'CARD',
    paymentStatus: 'PAID',
    orderStatus: 'DELIVERED',
    trackingNumber: 'DTDC-AIR-4412098',
    carrier: 'DTDC Express',
    timeline: [
      { status: 'PENDING', title: 'Order Placed', time: '5 days ago', completed: true },
      { status: 'CONFIRMED', title: 'Order Confirmed', time: '5 days ago', completed: true },
      { status: 'IN_PRODUCTION', title: 'Packed & Dispatched', time: '4 days ago', completed: true },
      { status: 'SHIPPED', title: 'In Transit', time: '3 days ago', completed: true },
      { status: 'DELIVERED', title: 'Delivered & Signed', time: '2 days ago', completed: true },
    ],
  },
];

const INITIAL_INQUIRIES: BulkInquiry[] = [
  {
    id: 'INQ-1049',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    companyName: 'Apex Streetwear Mumbai',
    contactName: 'Rohit Verma',
    email: 'rohit@apexstreet.in',
    phone: '+91 98200 44112',
    productInterested: 'Oversized Heavyweight T-Shirts & Pullover Hoodies',
    estimatedQuantity: 250,
    targetDate: '15 Nov 2026',
    customizationDetails: 'Custom 50-denier woven neck labels + high-density screen printing on back.',
    status: 'QUOTE_ISSUED',
    quotedPrice: 162500,
  },
  {
    id: 'INQ-1052',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    companyName: 'Velocity Athletic Club',
    contactName: 'Priya Sundaram',
    email: 'priya@velocityclub.com',
    phone: '+91 97110 88231',
    productInterested: 'OmniHeat Thermal Reflective Tracksuit Sets',
    estimatedQuantity: 100,
    targetDate: '30 Nov 2026',
    customizationDetails: 'Embroidered crest on left chest and reflective 3M stripes on calves.',
    status: 'PENDING_REVIEW',
  },
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(ECOM_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(['oversized-hoodies', 'puffer-jackets']);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [inquiries, setInquiries] = useState<BulkInquiry[]>(INITIAL_INQUIRIES);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize from LocalStorage safely on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('slate_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('slate_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem('slate_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedProducts = localStorage.getItem('slate_products');
      if (savedProducts) setProducts(JSON.parse(savedProducts));
    } catch (e) {
      // LocalStorage error fallback
    }
  }, []);

  // Save Cart & Wishlist & Orders on update
  useEffect(() => {
    try {
      localStorage.setItem('slate_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('slate_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('slate_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('slate_products', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart Calculations
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discountAmount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;

  // Free shipping over ₹1,999, else ₹149
  const shippingFee = cartSubtotal > 1999 || cartSubtotal === 0 ? 0 : 149;
  const taxAmount = Math.round((cartSubtotal - discountAmount) * 0.05); // 5% Apparel GST
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee + taxAmount);

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    const cartItemId = `${product.id}-${size}-${color}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prevCart,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          image: product.images[0],
          category: product.category,
          size,
          color,
          quantity,
          price: product.price,
          originalPrice: product.compareAtPrice,
        },
      ];
    });

    showToast(`Added ${quantity}x ${product.name} (${size}) to Cart`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const applyCoupon = (code: string): boolean => {
    const found = DEFAULT_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (found) {
      setAppliedCoupon(found);
      showToast(`Coupon applied! ${found.discountPercent}% discount saved.`);
      return true;
    }
    showToast('Invalid promo code. Try NEON10 or SLATE20');
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const placeOrder = (orderData: {
    customer: Order['customer'];
    paymentMethod: Order['paymentMethod'];
    notes?: string;
  }): Order => {
    const newOrderId = generateOrderId();
    const now = new Date();

    const orderItems: OrderItem[] = cart.map((c) => ({
      productId: c.productId,
      name: c.name,
      image: c.image,
      size: c.size,
      color: c.color,
      quantity: c.quantity,
      price: c.price,
    }));

    const newOrder: Order = {
      id: newOrderId,
      createdAt: now.toISOString(),
      customer: orderData.customer,
      items: orderItems,
      subtotal: cartSubtotal,
      discount: discountAmount,
      tax: taxAmount,
      shipping: shippingFee,
      total: grandTotal,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'COD' ? 'PENDING' : 'PAID',
      orderStatus: 'CONFIRMED',
      trackingNumber: `EXP-${Math.floor(10000000 + Math.random() * 90000000)}`,
      carrier: 'BlueDart Express Air',
      notes: orderData.notes,
      timeline: [
        {
          status: 'PENDING',
          title: 'Order Placed',
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          completed: true,
        },
        {
          status: 'CONFIRMED',
          title: 'Payment & Details Confirmed',
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          completed: true,
        },
        {
          status: 'IN_PRODUCTION',
          title: 'Staging in Production Floor',
          time: 'Upcoming within 24h',
          completed: false,
        },
        {
          status: 'SHIPPED',
          title: 'Courier Pickup & Air Freight',
          time: 'Upcoming',
          completed: false,
        },
        {
          status: 'DELIVERED',
          title: 'Delivery to Address',
          time: 'Estimated 2-3 Business Days',
          completed: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    showToast(`Order ${newOrderId} placed successfully!`);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const nowStr = new Date().toLocaleDateString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
          });
          const updatedTimeline = ord.timeline.map((step) => {
            if (step.status === newStatus) {
              return { ...step, completed: true, time: nowStr };
            }
            return step;
          });
          return { ...ord, orderStatus: newStatus, timeline: updatedTimeline };
        }
        return ord;
      })
    );
    showToast(`Order ${orderId} status updated to ${newStatus}`);
  };

  const getOrderById = (orderId: string) => orders.find((o) => o.id === orderId);

  // Address Management
  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addr,
      id: `addr-${Date.now()}`,
    };
    if (newAddr.isDefault) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses((prev) => [...prev, newAddr]);
    }
    showToast('Shipping address saved');
  };

  const updateAddress = (id: string, updated: Partial<Address>) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return { ...a, ...updated };
        }
        if (updated.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      })
    );
    showToast('Address updated');
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('Address deleted');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    showToast('Default shipping address updated');
  };

  // Products CRUD for Admin
  const addProduct = (newProd: Omit<Product, 'id' | 'slug'>) => {
    const slug = newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = `${slug}-${Date.now().toString().slice(-4)}`;
    const fullProd: Product = {
      ...newProd,
      id,
      slug,
    };
    setProducts((prev) => [fullProd, ...prev]);
    showToast(`Product "${newProd.name}" added to inventory`);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    showToast('Product inventory updated');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog');
  };

  // Inquiries
  const submitInquiry = (inquiry: Omit<BulkInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: BulkInquiry = {
      ...inquiry,
      id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'PENDING_REVIEW',
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    showToast('Bulk inquiry submitted. Production team will respond within 4 hours.');
  };

  const updateInquiryStatus = (id: string, status: BulkInquiry['status'], quotedPrice?: number) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id
          ? { ...inq, status, ...(quotedPrice ? { quotedPrice } : {}) }
          : inq
      )
    );
    showToast(`Inquiry ${id} updated to ${status}`);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        cartTotalCount,
        cartSubtotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        shippingFee,
        taxAmount,
        discountAmount,
        grandTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        updateOrderStatus,
        getOrderById,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        inquiries,
        submitInquiry,
        updateInquiryStatus,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
