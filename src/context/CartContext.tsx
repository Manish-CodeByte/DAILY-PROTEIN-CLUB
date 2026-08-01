import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem } from '../types';
import { RESTAURANT_INFO } from '../utils/constants';
import confetti from 'canvas-confetti';

interface ToastState {
  show: boolean;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (menuItem: MenuItem, quantity?: number, selectedAddons?: string[], specialInstructions?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  quickViewItem: MenuItem | null;
  setQuickViewItem: (item: MenuItem | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedCoupon: { code: string; discountPercent: number; maxDiscount: number } | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  finalTotal: number;
  totalProtein: number;
  totalCalories: number;
  totalCarbs: number;
  totalFat: number;
  totalItemCount: number;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  triggerConfetti: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('dpc_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('dpc_favorites');
    return saved ? JSON.parse(saved) : ['item-1', 'item-6', 'item-18'];
  });

  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number; maxDiscount: number } | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    localStorage.setItem('dpc_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('dpc_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0A84FF', '#22D3EE', '#7DD3FC', '#F5F5F7', '#FFFFFF']
      });
    } catch {
      // Fallback
    }
  };

  const addToCart = (
    menuItem: MenuItem,
    quantity = 1,
    selectedAddons: string[] = [],
    specialInstructions = ''
  ) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.menuItem.id === menuItem.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (selectedAddons.length) updated[existingIndex].selectedAddons = selectedAddons;
        if (specialInstructions) updated[existingIndex].specialInstructions = specialInstructions;
        return updated;
      }
      return [...prev, { menuItem, quantity, selectedAddons, specialInstructions }];
    });

    showToast(`Added ${menuItem.name} to cart! (+${menuItem.protein * quantity}g Protein)`);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.menuItem.id !== itemId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.menuItem.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => {
      const isFav = prev.includes(itemId);
      if (isFav) {
        showToast('Removed from favorites', 'info');
        return prev.filter(id => id !== itemId);
      } else {
        showToast('Saved to favorites! ❤️', 'success');
        return [...prev, itemId];
      }
    });
  };

  const isFavorite = (itemId: string) => favorites.includes(itemId);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const couponMatch = RESTAURANT_INFO.discountCoupons.find(c => c.code === cleanCode);

    if (!couponMatch) {
      return { success: false, message: 'Invalid coupon code. Try PROTEIN20, BULKUP15, or FIRSTCLUB.' };
    }

    if (subtotal < couponMatch.minOrder) {
      return {
        success: false,
        message: `Minimum order amount of ₹${couponMatch.minOrder} required for coupon ${cleanCode}.`
      };
    }

    setAppliedCoupon({
      code: couponMatch.code,
      discountPercent: couponMatch.discountPercent,
      maxDiscount: couponMatch.maxDiscount
    });
    triggerConfetti();
    showToast(`Coupon ${couponMatch.code} applied! Saved extra!🎉`);
    return { success: true, message: `Coupon ${couponMatch.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Macro & Financial Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon && subtotal > 0) {
    const rawDiscount = (subtotal * appliedCoupon.discountPercent) / 100;
    discountAmount = Math.min(rawDiscount, appliedCoupon.maxDiscount);
  }

  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 399 ? 0 : 35;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const totalProtein = cartItems.reduce((acc, item) => acc + item.menuItem.protein * item.quantity, 0);
  const totalCalories = cartItems.reduce((acc, item) => acc + item.menuItem.calories * item.quantity, 0);
  const totalCarbs = cartItems.reduce((acc, item) => acc + item.menuItem.carbs * item.quantity, 0);
  const totalFat = cartItems.reduce((acc, item) => acc + item.menuItem.fat * item.quantity, 0);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        favorites,
        toggleFavorite,
        isFavorite,
        quickViewItem,
        setQuickViewItem,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        deliveryFee,
        finalTotal,
        totalProtein,
        totalCalories,
        totalCarbs,
        totalFat,
        totalItemCount,
        toast,
        showToast,
        triggerConfetti
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
