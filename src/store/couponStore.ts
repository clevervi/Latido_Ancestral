import { create } from 'zustand';

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  expiresAt?: Date;
  usageLimit?: number;
  usedCount: number;
}

interface CouponStore {
  appliedCoupon: Coupon | null;
  availableCoupons: Coupon[];
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  validateCoupon: (code: string, cartTotal: number) => { valid: boolean; message?: string };
  calculateDiscount: (cartTotal: number) => number;
}

// Cupones de ejemplo
const mockCoupons: Coupon[] = [
  { code: 'BIENVENIDO10', type: 'percentage', value: 10, minPurchase: 50000, usedCount: 0 },
  { code: 'VERANO20', type: 'percentage', value: 20, minPurchase: 100000, maxDiscount: 50000, usedCount: 0 },
  { code: 'ENVIOGRATIS', type: 'fixed', value: 15000, minPurchase: 80000, usedCount: 0 },
  { code: 'PRIMERACOMPRA', type: 'percentage', value: 15, minPurchase: 30000, usageLimit: 1, usedCount: 0 },
];

export const useCouponStore = create<CouponStore>((set, get) => ({
  appliedCoupon: null,
  availableCoupons: mockCoupons,
  
  applyCoupon: (code) => {
    const coupon = get().availableCoupons.find((c) => c.code === code.toUpperCase());
    if (coupon) {
      set({ appliedCoupon: coupon });
      return true;
    }
    return false;
  },
  
  removeCoupon: () => {
    set({ appliedCoupon: null });
  },
  
  validateCoupon: (code, cartTotal) => {
    const coupon = get().availableCoupons.find((c) => c.code === code.toUpperCase());
    
    if (!coupon) {
      return { valid: false, message: 'Cupón no válido' };
    }
    
    if (coupon.minPurchase && cartTotal < coupon.minPurchase) {
      return { 
        valid: false, 
        message: `Compra mínima de $${coupon.minPurchase.toLocaleString('es-CO')} requerida` 
      };
    }
    
    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      return { valid: false, message: 'Cupón expirado' };
    }
    
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return { valid: false, message: 'Cupón ya utilizado' };
    }
    
    return { valid: true };
  },
  
  calculateDiscount: (cartTotal) => {
    const { appliedCoupon } = get();
    if (!appliedCoupon) return 0;
    
    let discount = 0;
    if (appliedCoupon.type === 'percentage') {
      discount = cartTotal * (appliedCoupon.value / 100);
      if (appliedCoupon.maxDiscount) {
        discount = Math.min(discount, appliedCoupon.maxDiscount);
      }
    } else {
      discount = appliedCoupon.value;
    }
    
    return discount;
  },
}));
