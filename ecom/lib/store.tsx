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

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  gstin?: string;
  companyName?: string;
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

  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Global Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_COUPONS: Coupon[] = [
  { code: 'NEON10', discountPercent: 10, description: '10% OFF on all retail orders' },
  { code: 'SLATE20', discountPercent: 20, description: '20% OFF on retail orders above ₹2,500' },
  { code: 'FIRSTDROP', discountPercent: 15, description: '15% OFF on your first purchase' },
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(ECOM_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [inquiries, setInquiries] = useState<BulkInquiry[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    gstin: '',
    companyName: '',
  });
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize from LocalStorage safely on mount and purge any legacy mock data
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('slate_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('slate_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem('slate_orders');
      if (savedOrders) {
        const parsedOrders: Order[] = JSON.parse(savedOrders);
        // Purge dummy/mock orders from earlier development versions
        const cleaned = parsedOrders.filter(
          (o) => o.id !== 'SLT-89240' && o.id !== 'SLT-78104' && o.customer?.name !== 'Arjun Malhotra'
        );
        setOrders(cleaned);
        localStorage.setItem('slate_orders', JSON.stringify(cleaned));
      }

      const savedAddresses = localStorage.getItem('slate_addresses');
      if (savedAddresses) {
        const parsedAddresses: Address[] = JSON.parse(savedAddresses);
        const cleaned = parsedAddresses.filter((a) => a.fullName !== 'Arjun Malhotra');
        setAddresses(cleaned);
        localStorage.setItem('slate_addresses', JSON.stringify(cleaned));
      }

      const savedInquiries = localStorage.getItem('slate_inquiries');
      if (savedInquiries) {
        const parsedInquiries: BulkInquiry[] = JSON.parse(savedInquiries);
        const cleaned = parsedInquiries.filter(
          (i) => i.id !== 'INQ-1049' && i.id !== 'INQ-1052' && i.companyName !== 'Apex Streetwear Mumbai'
        );
        setInquiries(cleaned);
        localStorage.setItem('slate_inquiries', JSON.stringify(cleaned));
      }

      const savedProfile = localStorage.getItem('slate_user_profile');
      if (savedProfile) {
        const parsedProfile: UserProfile = JSON.parse(savedProfile);
        if (parsedProfile.name !== 'Arjun Malhotra') {
          setUserProfile(parsedProfile);
        }
      }

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
      localStorage.setItem('slate_addresses', JSON.stringify(addresses));
    } catch (e) {}
  }, [addresses]);

  useEffect(() => {
    try {
      localStorage.setItem('slate_inquiries', JSON.stringify(inquiries));
    } catch (e) {}
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('slate_user_profile', JSON.stringify(userProfile));
    } catch (e) {}
  }, [userProfile]);

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

  // Free retail express delivery over ₹999, else ₹99 standard shipping
  const shippingFee = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 99;
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

    showToast(`Added ${quantity}x ${product.name} (${size}) to Bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from bag');
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
  }) => {
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
      trackingNumber: `BD-AIR-${Math.floor(10000000 + Math.random() * 90000000)}`,
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
          title: 'Payment & Order Details Verified',
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          completed: true,
        },
        {
          status: 'IN_PRODUCTION',
          title: 'Quality Check & Packaged at Okhla Hub',
          time: 'Within 24 Hours',
          completed: false,
        },
        {
          status: 'SHIPPED',
          title: 'Dispatched via BlueDart Express Air',
          time: 'Upcoming',
          completed: false,
        },
        {
          status: 'DELIVERED',
          title: 'Delivered to Destination',
          time: 'Estimated 2-3 Business Days',
          completed: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Automatically update user profile with genuine customer details if not yet configured
    setUserProfile((prev) => ({
      ...prev,
      name: prev.name || orderData.customer.name,
      email: prev.email || orderData.customer.email,
      phone: prev.phone || orderData.customer.phone,
    }));

    clearCart();
    setAppliedCoupon(null);
    showToast(`Order #${newOrderId} placed successfully!`);

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
    showToast(`Order ${orderId} updated to ${newStatus}`);
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
    showToast('Delivery address saved');
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
    showToast('Address removed');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    showToast('Default delivery address updated');
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
    showToast('Inquiry submitted to Slate Concierge Desk.');
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

  // User Profile
  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...profile };
      return updated;
    });
    showToast('Profile updated successfully');
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
        userProfile,
        updateUserProfile,
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
