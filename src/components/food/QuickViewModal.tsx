import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Star, Dumbbell, Flame, Check, Sparkles, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { Badge } from '../UI/Badge';

export const QuickViewModal: React.FC = () => {
  const { quickViewItem, setQuickViewItem, addToCart, isFavorite, toggleFavorite } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuickViewItem(null);
      }
    };
    if (quickViewItem) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewItem, setQuickViewItem]);

  if (!quickViewItem) return null;

  const isFav = isFavorite(quickViewItem.id);

  const addonsList = [
    { name: 'Extra 50g Grilled Chicken Breast', price: 60 },
    { name: 'Double Protein Scoop (Isolate)', price: 50 },
    { name: 'Zero Oil / Extra Clean Prep', price: 0 },
    { name: 'Extra Mint Yogurt Chutney', price: 20 }
  ];

  const toggleAddon = (name: string) => {
    setSelectedAddons(prev =>
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  const calculateAddonsCost = () => {
    return selectedAddons.reduce((acc, name) => {
      const match = addonsList.find(a => a.name === name);
      return acc + (match ? match.price : 0);
    }, 0);
  };

  const unitPrice = quickViewItem.price + calculateAddonsCost();
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(quickViewItem, quantity, selectedAddons, specialInstructions);
    setQuickViewItem(null);
    setQuantity(1);
    setSelectedAddons([]);
    setSpecialInstructions('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewItem(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-3xl bg-[#111214] rounded-3xl border border-white/10 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col md:flex-row text-[#F5F5F7]"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewItem(null)}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-white/20 text-[#A1A1A6] hover:text-[#F5F5F7] transition-colors border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column - Image & Badges */}
          <div className="md:w-1/2 relative bg-[#0A0A0C] min-h-[260px] md:min-h-full">
            <img
              src={quickViewItem.image}
              alt={quickViewItem.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111214] via-transparent to-black/30" />

            <div className="absolute top-4 left-4 flex items-center gap-2 flex-wrap z-10">
              <Badge variant={quickViewItem.isVegetarian ? 'veg' : 'nonveg'}>
                {quickViewItem.isVegetarian ? '🌱 100% Veg' : '🍗 Non-Veg'}
              </Badge>
              {quickViewItem.isBestSeller && <Badge variant="emerald">🔥 Bestseller</Badge>}
            </div>

            <button
              onClick={() => toggleFavorite(quickViewItem.id)}
              aria-label="Toggle favorite"
              className={`absolute bottom-4 left-4 p-3 rounded-full backdrop-blur-md transition-colors border border-white/10 ${
                isFav ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-black/40 text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-red-400' : ''}`} />
            </button>
          </div>

          {/* Right Column - Food Details & Form */}
          <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between custom-scrollbar">
            <div>
              <div className="flex items-center justify-between text-xs text-[#A1A1A6] mb-1">
                <span className="text-[#0A84FF] font-semibold uppercase tracking-wider">{quickViewItem.category}</span>
                <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-0.5 rounded-full text-yellow-400 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-yellow-400" />
                  <span>{quickViewItem.rating}</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-[#F5F5F7] mb-2">{quickViewItem.name}</h2>
              <p className="text-xs text-[#A1A1A6] leading-relaxed mb-4">{quickViewItem.description}</p>

              {/* Macro Specs Card */}
              <div className="bg-[#0A0A0C] rounded-2xl p-4 border border-white/10 mb-5">
                <h4 className="text-xs font-semibold text-[#A1A1A6] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0A84FF]" /> Macro Nutrition Matrix
                </h4>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-[#0A84FF]/10 border border-[#0A84FF]/20">
                    <Dumbbell className="w-4 h-4 text-[#0A84FF] mx-auto mb-1" />
                    <span className="text-sm font-bold text-[#F5F5F7] block">{quickViewItem.protein}g</span>
                    <span className="text-[10px] text-[#A1A1A6] font-medium">Protein</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/20">
                    <Flame className="w-4 h-4 text-[#22D3EE] mx-auto mb-1" />
                    <span className="text-sm font-bold text-[#F5F5F7] block">{quickViewItem.calories}</span>
                    <span className="text-[10px] text-[#A1A1A6] font-medium">Calories</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#7DD3FC]/10 border border-[#7DD3FC]/20">
                    <span className="text-sm font-bold text-[#F5F5F7] block">{quickViewItem.carbs}g</span>
                    <span className="text-[10px] text-[#A1A1A6] font-medium">Carbs</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-sm font-bold text-[#F5F5F7] block">{quickViewItem.fat}g</span>
                    <span className="text-[10px] text-[#A1A1A6] font-medium">Fat</span>
                  </div>
                </div>
              </div>

              {/* Ingredients List */}
              {quickViewItem.ingredients && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-[#A1A1A6] mb-2">Key Ingredients</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {quickViewItem.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-[#0A0A0C] text-[#A1A1A6] px-2.5 py-1 rounded-full border border-white/10"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Addons Customization */}
              <div className="mb-5">
                <h4 className="text-xs font-semibold text-[#A1A1A6] mb-2">Customize Your Meal</h4>
                <div className="space-y-2">
                  {addonsList.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.name);
                    return (
                      <button
                        key={addon.name}
                        type="button"
                        onClick={() => toggleAddon(addon.name)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition-all ${
                          isSelected
                            ? 'bg-[#0A84FF]/10 border-[#0A84FF] text-[#F5F5F7]'
                            : 'bg-[#0A0A0C] border-white/10 text-[#A1A1A6] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isSelected ? 'bg-[#0A84FF] border-[#0A84FF] text-white' : 'border-gray-600'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>{addon.name}</span>
                        </div>
                        <span className="font-semibold text-[#F5F5F7]">
                          {addon.price > 0 ? `+${formatCurrency(addon.price)}` : 'FREE'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Instructions */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-[#A1A1A6] block mb-1.5">
                  Special Kitchen Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Extra spicy, no onions, dip on the side..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full apple-input px-3 py-2 rounded-xl text-xs"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              {/* Quantity selector */}
              <div className="flex items-center gap-3 bg-[#0A0A0C] p-1.5 rounded-xl border border-white/10">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-[#A1A1A6] hover:text-[#F5F5F7] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center font-bold text-sm text-[#F5F5F7]">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-[#A1A1A6] hover:text-[#F5F5F7] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to cart button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 rounded-xl bg-[#0A84FF] hover:bg-[#0071E3] text-white font-bold text-sm flex items-center justify-between shadow-lg shadow-[#0A84FF]/20 transition-all cursor-pointer"
              >
                <span>Add to Cart</span>
                <span>{formatCurrency(totalPrice)}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
