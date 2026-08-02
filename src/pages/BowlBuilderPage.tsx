import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Flame, Activity, Zap, Plus, Trash2, Check, Sparkles, ShoppingBag, RotateCcw, Target } from 'lucide-react';
import { BUILDER_GOALS, PANTRY_ITEMS } from '../data/pantryData';
import { PantryItem, PantryCategory, MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';

interface SelectedPantryItem {
  item: PantryItem;
  quantity: number;
}

export const BowlBuilderPage: React.FC = () => {
  const { addToCart, setIsCartOpen } = useCart();
  
  // State
  const [selectedGoalId, setSelectedGoalId] = useState<string>('lean-bulk');
  const [activeCategoryTab, setActiveCategoryTab] = useState<PantryCategory>('proteins');
  const [vegOnlyFilter, setVegOnlyFilter] = useState(false);
  const [selectedPantryItems, setSelectedPantryItems] = useState<SelectedPantryItem[]>([
    { item: PANTRY_ITEMS.find(i => i.id === 'b2')!, quantity: 1 }, // Brown rice
    { item: PANTRY_ITEMS.find(i => i.id === 'p1')!, quantity: 1 }, // Herb grilled chicken
    { item: PANTRY_ITEMS.find(i => i.id === 'v1')!, quantity: 1 }, // Steamed broccoli
    { item: PANTRY_ITEMS.find(i => i.id === 't1')!, quantity: 1 }  // Avocado
  ]);

  const currentGoal = BUILDER_GOALS.find(g => g.id === selectedGoalId) || BUILDER_GOALS[0];

  // Helper icons for goals
  const getGoalIcon = (iconName: string) => {
    switch (iconName) {
      case 'Dumbbell': return Dumbbell;
      case 'Flame': return Flame;
      case 'Zap': return Zap;
      case 'Activity': return Activity;
      default: return Dumbbell;
    }
  };

  // Macro Calculations
  const currentProtein = selectedPantryItems.reduce((acc, p) => acc + (p.item.protein * p.quantity), 0);
  const currentCarbs = selectedPantryItems.reduce((acc, p) => acc + (p.item.carbs * p.quantity), 0);
  const currentFat = selectedPantryItems.reduce((acc, p) => acc + (p.item.fat * p.quantity), 0);
  const currentCalories = selectedPantryItems.reduce((acc, p) => acc + (p.item.calories * p.quantity), 0);
  const totalPrice = selectedPantryItems.reduce((acc, p) => acc + (p.item.price * p.quantity), 0);

  // Match Accuracy Calculation
  const proteinMatch = Math.min(100, Math.round((currentProtein / currentGoal.targetProtein) * 100));
  const carbsMatch = Math.min(100, Math.round((currentCarbs / currentGoal.targetCarbs) * 100));
  const fatMatch = Math.min(100, Math.round((currentFat / currentGoal.targetFat) * 100));
  const overallAccuracy = Math.round((proteinMatch * 0.5) + (carbsMatch * 0.3) + (fatMatch * 0.2));

  // Handlers
  const handleTogglePantryItem = (item: PantryItem) => {
    setSelectedPantryItems(prev => {
      const exists = prev.find(p => p.item.id === item.id);
      if (exists) {
        return prev.filter(p => p.item.id !== item.id);
      } else {
        return [...prev, { item, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setSelectedPantryItems(prev => {
      return prev.map(p => {
        if (p.item.id === itemId) {
          const newQty = p.quantity + delta;
          return newQty > 0 ? { ...p, quantity: newQty } : null;
        }
        return p;
      }).filter(Boolean) as SelectedPantryItem[];
    });
  };

  const handleResetBowl = () => {
    setSelectedPantryItems([]);
  };

  // Convert Bowl build to MenuItem format for Cart
  const handleAddBowlToCart = () => {
    if (selectedPantryItems.length === 0) return;

    const customBowlItem: MenuItem = {
      id: 'custom-bowl-' + Date.now(),
      name: `Custom ${currentGoal.name.split(' ')[0]} Bowl`,
      category: 'Healthy Bowls',
      price: Math.max(149, totalPrice),
      protein: currentProtein,
      calories: currentCalories,
      carbs: currentCarbs,
      fat: currentFat,
      rating: 5.0,
      reviewCount: 1,
      image: selectedPantryItems[0]?.item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
      description: `Custom Precision Bowl: ${selectedPantryItems.map(i => `${i.quantity}x ${i.item.name}`).join(', ')}`,
      ingredients: selectedPantryItems.map(i => i.item.name),
      isVegetarian: selectedPantryItems.every(i => i.item.isVegetarian)
    };

    addToCart(customBowlItem, 1, [], `Goal: ${currentGoal.name}`);
    setIsCartOpen(true);
  };

  // Category Tab Filter
  const filteredPantry = PANTRY_ITEMS.filter(item => {
    if (item.category !== activeCategoryTab) return false;
    if (vegOnlyFilter && !item.isVegetarian) return false;
    return true;
  });

  return (
    <div className="pt-24 sm:pt-28 pb-28 lg:pb-20 text-[#F9FAFB] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Precision Builder
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F9FAFB] tracking-tight">
            The Precision Bowl Builder
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-2 leading-relaxed">
            Select your target fitness goal, pick fresh ingredients from the pantry, and watch your real-time macro gauges map out your gains!
          </p>
        </div>

        {/* 3-COLUMN RESPONSIVE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ========================================================= */}
          {/* COLUMN 1: MACRO-MAPPING TARGET (Static Goal Setting)      */}
          {/* ========================================================= */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-[#0F172A]/70 backdrop-blur-2xl p-4 sm:p-5 rounded-3xl border border-[#10B981]/20 space-y-4 shadow-xl">
              
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <Target className="w-5 h-5 text-[#10B981]" />
                <h3 className="font-extrabold text-[#F9FAFB] text-sm uppercase tracking-wider">
                  1. Set Target Goal
                </h3>
              </div>

              {/* Goal Option Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {BUILDER_GOALS.map(goal => {
                  const Icon = getGoalIcon(goal.icon);
                  const isSelected = selectedGoalId === goal.id;
                  return (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoalId(goal.id)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#10B981]/15 border-[#10B981] text-[#F9FAFB] shadow-md shadow-[#10B981]/10'
                          : 'bg-[#090D16] border-white/10 text-[#9CA3AF] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-[#10B981]' : 'text-[#9CA3AF]'}`} />
                          <span className="text-xs font-bold text-[#F9FAFB]">{goal.name}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#10B981]" />}
                      </div>
                      <p className="text-[10px] text-[#9CA3AF] line-clamp-2 leading-snug">{goal.subtitle}</p>

                      {/* Goal Target Pills */}
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10 text-[10px] font-semibold text-[#9CA3AF]">
                        <span className="text-[#10B981]">P: {goal.targetProtein}g</span>
                        <span className="text-[#06B6D4]">C: {goal.targetCarbs}g</span>
                        <span className="text-[#38BDF8]">F: {goal.targetFat}g</span>
                        <span className="text-[#F9FAFB] ml-auto">{goal.targetCalories} kcal</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Accuracy Match Gauge Pill */}
              <div className="p-3.5 rounded-2xl bg-[#090D16] border border-white/10 text-center space-y-1">
                <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block">
                  Goal Match Accuracy
                </span>
                <span className="text-2xl font-black text-[#10B981] block">
                  {overallAccuracy}%
                </span>
                <span className="text-[10px] text-[#9CA3AF] block font-medium">
                  {overallAccuracy >= 90 ? '🔥 Perfect Macro Alignment!' : 'Add more ingredients to hit target'}
                </span>
              </div>

            </div>
          </div>

          {/* ========================================================= */}
          {/* COLUMN 2: INGREDIENTS PANTRY (The Options)               */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0F172A]/70 backdrop-blur-2xl p-4 sm:p-5 rounded-3xl border border-[#10B981]/20 space-y-4 shadow-xl">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-extrabold text-[#F9FAFB] text-sm uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#06B6D4]" /> 2. Pick Ingredients
                </h3>

                {/* Veg Filter Toggle */}
                <button
                  onClick={() => setVegOnlyFilter(!vegOnlyFilter)}
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold border transition-all ${
                    vegOnlyFilter
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500'
                      : 'bg-[#090D16] text-[#9CA3AF] border-white/10'
                  }`}
                >
                  🌱 Veg Only
                </button>
              </div>

              {/* Pantry Category Tabs */}
              <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-[#090D16] border border-white/10">
                {(['proteins', 'bases', 'veggies', 'toppings'] as PantryCategory[]).map(tab => {
                  const isActive = activeCategoryTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveCategoryTab(tab)}
                      className={`py-2 text-[10px] font-extrabold uppercase rounded-xl transition-all ${
                        isActive
                          ? 'bg-[#10B981] text-black shadow-md'
                          : 'text-[#9CA3AF] hover:text-[#F9FAFB]'
                      }`}
                    >
                      {tab === 'veggies' ? 'Veggies' : tab}
                    </button>
                  );
                })}
              </div>

              {/* Pantry Item Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[480px] sm:max-h-[520px] overflow-y-auto pr-1 custom-scrollbar">
                {filteredPantry.map(item => {
                  const isSelected = selectedPantryItems.some(p => p.item.id === item.id);
                  const selectedQty = selectedPantryItems.find(p => p.item.id === item.id)?.quantity || 0;

                  return (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleTogglePantryItem(item)}
                      className={`relative p-3 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#10B981]/15 border-[#10B981] shadow-md shadow-[#10B981]/10'
                          : 'bg-[#090D16] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex gap-3 items-center mb-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#F9FAFB] truncate">{item.name}</h4>
                          <span className="text-[10px] text-[#9CA3AF] block">{item.portionSize}</span>
                          <span className="text-xs font-extrabold text-[#10B981] block mt-0.5">
                            +{formatCurrency(item.price)}
                          </span>
                        </div>
                      </div>

                      {/* Item Macro Chips */}
                      <div className="grid grid-cols-4 gap-1 p-1.5 rounded-xl bg-[#0F172A] text-center text-[9px] font-bold border border-white/10">
                        <span className="text-[#10B981]">P:{item.protein}g</span>
                        <span className="text-[#06B6D4]">C:{item.carbs}g</span>
                        <span className="text-[#38BDF8]">F:{item.fat}g</span>
                        <span className="text-[#F9FAFB]">{item.calories}c</span>
                      </div>

                      {/* Select / Deselect Pill */}
                      <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/10">
                        <span className="text-[10px] font-extrabold uppercase text-[#9CA3AF]">
                          {isSelected ? `Added (${selectedQty}x)` : 'Tap to Add'}
                        </span>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-[#10B981] text-black' : 'border border-white/20 text-[#9CA3AF]'
                        }`}>
                          {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3 h-3" />}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* ========================================================= */}
          {/* COLUMN 3: LIVE BOWL & VISUAL MACRO-MAPPER (Framer Motion) */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#0F172A]/70 backdrop-blur-2xl p-4 sm:p-5 rounded-3xl border border-[#10B981]/20 space-y-5 shadow-xl">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-extrabold text-[#F9FAFB] text-sm uppercase tracking-wider flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-[#10B981]" /> 3. Live Bowl & Macro-Mapper
                </h3>
                {selectedPantryItems.length > 0 && (
                  <button
                    onClick={handleResetBowl}
                    className="text-[10px] font-semibold text-[#9CA3AF] hover:text-rose-400 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>

              {/* Visual Bowl Animation Container */}
              <div className="relative p-4 rounded-3xl bg-[#090D16] border border-white/10 min-h-[150px] flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-[#9CA3AF] font-bold uppercase text-[10px] tracking-wider">
                    Bowl Contents ({selectedPantryItems.length} items)
                  </span>
                  <span className="text-[#10B981] font-bold">{formatCurrency(totalPrice)}</span>
                </div>

                {/* Animated Flying Ingredient Badges */}
                <div className="flex flex-wrap gap-1.5 my-2">
                  <AnimatePresence>
                    {selectedPantryItems.length === 0 ? (
                      <p className="text-xs text-[#9CA3AF] italic text-center w-full py-4">
                        Your bowl is empty. Select ingredients from the pantry!
                      </p>
                    ) : (
                      selectedPantryItems.map(({ item, quantity }) => (
                        <motion.span
                          key={item.id}
                          initial={{ scale: 0, y: -10, opacity: 0 }}
                          animate={{ scale: 1, y: 0, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#0F172A] border border-white/10 text-[11px] text-[#F9FAFB] font-semibold"
                        >
                          <img src={item.image} alt={item.name} className="w-4 h-4 rounded-full object-cover" />
                          <span className="truncate max-w-[110px]">{item.name}</span>
                          <span className="text-[#10B981] font-bold">x{quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            className="text-[#9CA3AF] hover:text-rose-400 ml-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </motion.span>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* THE VISUAL MACRO-MAPPER (Framer Motion Animated Gauges in Emerald Teal Palette) */}
              <div className="p-4 rounded-3xl bg-[#090D16] border border-white/10 space-y-4">
                
                {/* Total Calories Center Counter */}
                <div className="text-center pb-3 border-b border-white/10">
                  <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block">
                    Calculated Total Calories
                  </span>
                  <div className="flex items-center justify-center gap-1 text-3xl font-black text-[#F9FAFB] mt-0.5">
                    <Flame className="w-6 h-6 text-[#10B981]" />
                    <motion.span
                      key={currentCalories}
                      initial={{ scale: 1.15 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {currentCalories}
                    </motion.span>
                    <span className="text-xs text-[#9CA3AF] font-normal">kcal</span>
                  </div>
                </div>

                {/* Animated Bar Gauges */}
                <div className="space-y-3">
                  
                  {/* Protein Bar (Emerald Green #10B981) */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-[#10B981] flex items-center gap-1">
                        <Dumbbell className="w-3.5 h-3.5" /> Protein
                      </span>
                      <span className="text-[#F9FAFB]">{currentProtein}g / <span className="text-[#9CA3AF]">{currentGoal.targetProtein}g</span></span>
                    </div>
                    <div className="relative w-full h-3 bg-[#0F172A] rounded-full overflow-hidden border border-white/10">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#10B981] to-emerald-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (currentProtein / currentGoal.targetProtein) * 100)}%` }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* Carbohydrates Bar (Cyber Teal #06B6D4) */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-[#06B6D4]">Carbohydrates</span>
                      <span className="text-[#F9FAFB]">{currentCarbs}g / <span className="text-[#9CA3AF]">{currentGoal.targetCarbs}g</span></span>
                    </div>
                    <div className="relative w-full h-3 bg-[#0F172A] rounded-full overflow-hidden border border-white/10">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#06B6D4] to-teal-300 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (currentCarbs / currentGoal.targetCarbs) * 100)}%` }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* Fats Bar (Ice Blue #38BDF8) */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-[#38BDF8]">Healthy Fats</span>
                      <span className="text-[#F9FAFB]">{currentFat}g / <span className="text-[#9CA3AF]">{currentGoal.targetFat}g</span></span>
                    </div>
                    <div className="relative w-full h-3 bg-[#0F172A] rounded-full overflow-hidden border border-white/10">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#38BDF8] to-sky-300 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (currentFat / currentGoal.targetFat) * 100)}%` }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                </div>

              </div>

              {/* Add Custom Bowl to Cart CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={selectedPantryItems.length === 0}
                onClick={handleAddBowlToCart}
                className="w-full py-4 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-black font-black text-xs uppercase tracking-wider flex items-center justify-between px-5 shadow-xl shadow-[#10B981]/25 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> Add Bowl to Cart
                </span>
                <span className="text-sm font-black">{formatCurrency(totalPrice)}</span>
              </motion.button>

            </div>
          </div>

        </div>

      </div>

      {/* MOBILE STICKY FLOATING ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-[#090D16]/98 backdrop-blur-2xl border-t border-[#10B981]/30 shadow-2xl flex items-center justify-between gap-3 text-[#F9FAFB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#F9FAFB]">
            <span className="text-[#10B981]">{currentProtein}g Protein</span>
            <span>•</span>
            <span className="text-[#06B6D4]">{currentCalories} kcal</span>
          </div>
          <span className="text-[10px] text-[#9CA3AF] font-semibold">{selectedPantryItems.length} pantry items selected</span>
        </div>

        <button
          disabled={selectedPantryItems.length === 0}
          onClick={handleAddBowlToCart}
          className="py-2.5 px-4 rounded-xl bg-[#10B981] hover:bg-[#059669] text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-[#10B981]/25 disabled:opacity-50"
        >
          <ShoppingBag className="w-4 h-4" /> Add ({formatCurrency(totalPrice)})
        </button>
      </div>
    </div>
  );
};
