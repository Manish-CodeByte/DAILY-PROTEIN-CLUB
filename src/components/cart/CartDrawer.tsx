import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Dumbbell, Flame } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { CheckoutModal } from './CheckoutModal';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    deliveryFee,
    finalTotal,
    totalProtein,
    totalCalories,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const freeDeliveryThreshold = 399;
  const progressToFreeDelivery = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  if (!isCartOpen) return null;

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-screen max-w-md bg-[#111214] border-l border-white/10 shadow-2xl flex flex-col justify-between text-[#F5F5F7]"
            >
              {/* Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0A0A0C]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#0A84FF]/15 text-[#0A84FF]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#F5F5F7] text-base">Your Protein Cart</h3>
                    <p className="text-xs text-[#A1A1A6]">{cartItems.length} unique items</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Close cart drawer"
                  className="p-2 rounded-full hover:bg-white/10 text-[#A1A1A6] hover:text-[#F5F5F7] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Delivery Bar & Macro Summary */}
              {cartItems.length > 0 && (
                <div className="bg-[#0A0A0C] p-4 border-b border-white/10 space-y-3">
                  {/* Free Delivery Progress */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-[#A1A1A6]">
                        {subtotal >= freeDeliveryThreshold
                          ? '🎉 FREE Delivery Unlocked!'
                          : `Add ${formatCurrency(freeDeliveryThreshold - subtotal)} for FREE Delivery`}
                      </span>
                      <span className="text-[#0A84FF] font-bold">{Math.round(progressToFreeDelivery)}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#22D3EE] to-[#0A84FF] transition-all duration-300"
                        style={{ width: `${progressToFreeDelivery}%` }}
                      />
                    </div>
                  </div>

                  {/* Macro Total Bar */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-[#0A84FF]/10 border border-[#0A84FF]/20">
                      <Dumbbell className="w-4 h-4 text-[#0A84FF]" />
                      <div>
                        <span className="text-[10px] text-[#A1A1A6] block leading-tight">Total Protein</span>
                        <span className="text-sm font-bold text-[#F5F5F7]">{totalProtein}g</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/20">
                      <Flame className="w-4 h-4 text-[#22D3EE]" />
                      <div>
                        <span className="text-[10px] text-[#A1A1A6] block leading-tight">Total Calories</span>
                        <span className="text-sm font-bold text-[#F5F5F7]">{totalCalories} kcal</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Cart Items List */}
              <div className="flex-grow p-5 overflow-y-auto space-y-4 custom-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-[#0A0A0C] flex items-center justify-center text-[#A1A1A6] mb-4 border border-white/10">
                      <ShoppingBag className="w-10 h-10 text-[#0A84FF]" />
                    </div>
                    <h4 className="text-lg font-bold text-[#F5F5F7] mb-1">Your cart is empty</h4>
                    <p className="text-xs text-[#A1A1A6] max-w-xs mb-6">
                      Add some high-protein wraps, rice bowls, or isolate shakes to fuel your goals!
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 rounded-xl bg-[#0A84FF] text-white font-semibold text-xs hover:bg-[#0071E3] transition-all shadow-lg shadow-[#0A84FF]/20"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  cartItems.map(({ menuItem, quantity, selectedAddons, specialInstructions }) => (
                    <div
                      key={menuItem.id}
                      className="flex gap-3 p-3 rounded-2xl bg-[#0A0A0C] border border-white/10 items-center justify-between"
                    >
                      {/* Image */}
                      <img
                        src={menuItem.image}
                        alt={menuItem.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#F5F5F7] truncate">{menuItem.name}</h4>
                        <div className="flex items-center gap-2 text-[10px] text-[#0A84FF] font-semibold mt-0.5">
                          <span>{menuItem.protein * quantity}g Protein</span>
                          <span>•</span>
                          <span className="text-[#A1A1A6]">{menuItem.calories * quantity} kcal</span>
                        </div>

                        {selectedAddons && selectedAddons.length > 0 && (
                          <p className="text-[10px] text-[#A1A1A6] truncate mt-0.5">
                            + {selectedAddons.join(', ')}
                          </p>
                        )}
                        {specialInstructions && (
                          <p className="text-[10px] text-cyan-400/80 italic truncate">
                            "{specialInstructions}"
                          </p>
                        )}

                        <span className="text-xs font-bold text-[#F5F5F7] block mt-1">
                          {formatCurrency(menuItem.price * quantity)}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeFromCart(menuItem.id)}
                          aria-label={`Remove ${menuItem.name}`}
                          className="text-[#A1A1A6] hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-1.5 bg-[#111214] px-2 py-1 rounded-lg border border-white/10">
                          <button
                            onClick={() => updateQuantity(menuItem.id, -1)}
                            aria-label="Decrease quantity"
                            className="text-[#A1A1A6] hover:text-[#F5F5F7] p-0.5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#F5F5F7] w-4 text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(menuItem.id, 1)}
                            aria-label="Increase quantity"
                            className="text-[#A1A1A6] hover:text-[#F5F5F7] p-0.5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Coupon & Financial Footer */}
              {cartItems.length > 0 && (
                <div className="p-5 border-t border-white/10 bg-[#0A0A0C] space-y-4">
                  {/* Coupon form */}
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0A84FF]/10 border border-[#0A84FF]/30 text-xs">
                      <div className="flex items-center gap-2 text-[#0A84FF] font-semibold">
                        <Tag className="w-4 h-4" />
                        <span>Code {appliedCoupon.code} applied ({appliedCoupon.discountPercent}% OFF)</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-[#A1A1A6] hover:text-[#F5F5F7] underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Coupon (e.g. PROTEIN20)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          className="w-full apple-input px-3 py-2 text-xs rounded-xl pr-8 uppercase"
                        />
                        <Tag className="w-3.5 h-3.5 text-[#A1A1A6] absolute right-3 top-2.5" />
                      </div>
                      <button
                        type="submit"
                        className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#0A84FF] hover:text-white text-xs font-bold text-[#F5F5F7] transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponError && <p className="text-[11px] text-red-400">{couponError}</p>}

                  {/* Summary Breakdown */}
                  <div className="space-y-1.5 text-xs text-[#A1A1A6]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-[#F5F5F7] font-medium">{formatCurrency(subtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#0A84FF]">
                        <span>Discount</span>
                        <span>-{formatCurrency(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className="text-[#F5F5F7] font-medium">
                        {deliveryFee === 0 ? <span className="text-[#0A84FF]">FREE</span> : formatCurrency(deliveryFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#F5F5F7] pt-2 border-t border-white/10">
                      <span>Total Amount</span>
                      <span className="text-[#0A84FF]">{formatCurrency(finalTotal)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-3.5 rounded-2xl bg-[#0A84FF] hover:bg-[#0071E3] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0A84FF]/20 transition-all cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </AnimatePresence>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
      )}
    </>
  );
};
