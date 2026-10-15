import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string | Date): string {
  const d = new Date(dateString);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(dateString: string | Date): string {
  const d = new Date(dateString);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function generateOrderId(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `SLT-${randomNum}`;
}

export function calculateBulkPrice(basePrice: number, quantity: number): {
  unitPrice: number;
  discountPercent: number;
  total: number;
  savings: number;
} {
  let discountPercent = 0;
  if (quantity >= 50) {
    discountPercent = 40;
  } else if (quantity >= 20) {
    discountPercent = 30;
  } else if (quantity >= 5) {
    discountPercent = 15;
  }

  const unitPrice = Math.round(basePrice * (1 - discountPercent / 100));
  const total = unitPrice * quantity;
  const originalTotal = basePrice * quantity;
  const savings = originalTotal - total;

  return { unitPrice, discountPercent, total, savings };
}
