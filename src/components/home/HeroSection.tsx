import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, UtensilsCrossed, Dumbbell, Clock, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CATEGORIES } from '../../data/categories';
import { MENU_ITEMS } from '../../data/menuItems';
import { FoodCard } from '../food/FoodCard';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { setIsCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [scrollIndex, setScrollIndex] = useState(0);

  const bestSellerItems = MENU_ITEMS.filter(item => item.isBestSeller).slice(0, 4);

  const handleCategoryClick = (catName: string) => {
    setSelectedCategory(catName);
    if (catName === 'All') {
      navigate('/menu');
    } else {
      navigate(`/menu?cat=${encodeURIComponent(catName)}`);
    }
  };

  const nextCategorySlide = () => {
    setScrollIndex(prev => (prev + 1) % CATEGORIES.length);
  };

  const prevCategorySlide = () => {
    setScrollIndex(prev => (prev - 1 + CATEGORIES.length) % CATEGORIES.length);
  };

  return (
    <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 text-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MAIN HERO SPLIT CONTAINER */}
        <div className="relative rounded-3xl overflow-hidden bg-[#0F172A]/70 backdrop-blur-2xl border border-[#10B981]/30 shadow-2xl p-6 sm:p-10 lg:p-12 mb-8 sm:mb-12 flex flex-col justify-between">
          
          {/* Subtle Ambient Emerald Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#06B6D4]/10 rounded-full blur-3xl pointer-events-none" />

          {/* 2-Column Split Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Column: Headlines & CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DAILY PROTEIN CLUB</span>
                <span>•</span>
                <span>MANIPAL</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#F9FAFB] tracking-tight leading-tight">
                Eat Clean.<br />
                <span className="text-[#10B981]">Build Muscle.</span><br />
                Stay Consistent.
              </h1>

              <p className="text-sm sm:text-base text-[#9CA3AF] font-normal leading-relaxed max-w-xl">
                Macro-counted nutrition crafted with fresh ingredients in Manipal. Designed for students, doctors, and athletes.
              </p>

              {/* Dual CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/menu"
                    className="px-6 py-3.5 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-[#10B981]/30 transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" /> EXPLORE MENU
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsCartOpen(true)}
                  className="px-6 py-3.5 rounded-2xl bg-transparent hover:bg-white/10 text-[#F9FAFB] border border-white/20 font-extrabold text-xs uppercase tracking-wider backdrop-blur-md transition-all"
                >
                  ORDER NOW
                </motion.button>
              </div>
            </motion.div>

            {/* Right Column: Top Power Bowl Dish Display */}
            <div className="lg:col-span-5 flex justify-center relative">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative max-w-xs sm:max-w-sm"
              >
                {/* Floating Top Power Bowl PNG */}
                <img
                  src="/hero-protein-bowl.png"
                  alt="High Protein Egg, Avocado & Mushroom Power Bowl Manipal"
                  className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] rounded-full border border-[#10B981]/40 bg-black/40 p-2"
                />

                {/* Floating Macro Tag 1 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-2 left-0 sm:top-4 sm:-left-4 px-3 py-1.5 rounded-2xl bg-[#090D16]/95 backdrop-blur-md border border-[#10B981]/50 text-xs font-bold text-[#F9FAFB] shadow-xl flex items-center gap-1.5"
                >
                  <Dumbbell className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>38g Protein</span>
                </motion.div>

                {/* Floating Macro Tag 2 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-2 right-0 sm:bottom-6 sm:-right-4 px-3 py-1.5 rounded-2xl bg-[#090D16]/95 backdrop-blur-md border border-[#06B6D4]/50 text-xs font-bold text-[#F9FAFB] shadow-xl flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
                  <span>520 kcal • Clean Egg & Avocado Bowl</span>
                </motion.div>
              </motion.div>
            </div>

          </div>

          {/* Bottom 4 Hero Stats Bar */}
          <div className="relative z-10 mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#090D16]/80 border border-white/10">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <span className="text-sm font-black text-[#F9FAFB] block leading-none">4.8 ★</span>
                <span className="text-[10px] text-[#9CA3AF] font-semibold">Rating (1.2K+ Reviews)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#090D16]/80 border border-white/10">
              <div className="p-2.5 rounded-xl bg-[#10B981]/10 text-[#10B981]">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-black text-[#F9FAFB] block leading-none">30K+</span>
                <span className="text-[10px] text-[#9CA3AF] font-semibold">Meals Served</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#090D16]/80 border border-white/10">
              <div className="p-2.5 rounded-xl bg-[#06B6D4]/10 text-[#06B6D4]">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-black text-[#F9FAFB] block leading-none">50g+</span>
                <span className="text-[10px] text-[#9CA3AF] font-semibold">Protein Options</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#090D16]/80 border border-white/10">
              <div className="p-2.5 rounded-xl bg-[#38BDF8]/10 text-[#38BDF8]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-black text-[#F9FAFB] block leading-none">10 AM – 12 AM</span>
                <span className="text-[10px] text-[#9CA3AF] font-semibold">7 Days Open</span>
              </div>
            </div>

          </div>

        </div>

        {/* TOP CATEGORY QUICK PREVIEW BAR & SPECIALS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12">
          
          {/* Quick Categories Bar (8 cols) */}
          <div className="lg:col-span-8 bg-[#0F172A]/70 backdrop-blur-2xl p-5 rounded-3xl border border-[#10B981]/20 flex flex-col justify-between shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-black uppercase text-[#10B981] tracking-wider">Quick Category Explorer</h3>
                <p className="text-xs text-[#9CA3AF]">Browse macro-counted categories in Manipal</p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevCategorySlide}
                  className="p-1.5 rounded-xl bg-[#090D16] border border-white/10 text-[#9CA3AF] hover:text-[#F9FAFB]"
                  aria-label="Previous categories"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextCategorySlide}
                  className="p-1.5 rounded-xl bg-[#090D16] border border-white/10 text-[#9CA3AF] hover:text-[#F9FAFB]"
                  aria-label="Next categories"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category Quick Chips Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CATEGORIES.slice(scrollIndex, scrollIndex + 4).map(cat => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`relative p-3 rounded-2xl border text-left transition-all duration-200 overflow-hidden group cursor-pointer ${
                      isSelected
                        ? 'bg-[#10B981]/15 border-[#10B981] text-[#F9FAFB]'
                        : 'bg-[#090D16] border-white/10 text-[#9CA3AF] hover:border-white/20 hover:text-[#F9FAFB]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold truncate">{cat.name}</span>
                    </div>
                    <span className="text-[10px] text-[#9CA3AF] block">{cat.itemCount} Items</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Local Specials Blackboard Card (4 cols) */}
          <div className="lg:col-span-4 bg-[#0F172A]/70 backdrop-blur-2xl p-5 rounded-3xl border border-[#10B981]/20 shadow-xl flex flex-col justify-between">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] text-[10px] font-extrabold uppercase tracking-widest mb-2">
                DAILY LOCAL SPECIALS
              </span>
              <h4 className="text-base font-bold text-[#F9FAFB] mb-1">Manipal Campus Specials</h4>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Freshly prepared today in Eshwar Nagar kitchen with raw weight macro verification.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#9CA3AF] block uppercase tracking-wider">Chef's Special Combo</span>
                <span className="text-xs font-bold text-[#06B6D4]">Herb Chicken + Quinoa Bowl</span>
              </div>
              <Link
                to="/menu"
                className="px-3 py-1.5 rounded-xl bg-[#10B981] text-black text-[11px] font-black uppercase tracking-wider hover:bg-[#059669] transition-colors"
              >
                Order
              </Link>
            </div>
          </div>

        </div>

        {/* MANIPAL'S FAVORITES BEST SELLERS SECTION */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#10B981] uppercase tracking-widest block mb-1">
                TOP RATED BY STUDENTS & DOCTORS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F9FAFB] tracking-tight">
                MANIPAL'S FAVORITES
              </h2>
            </div>

            <Link
              to="/menu"
              className="text-xs font-extrabold text-[#10B981] hover:underline uppercase tracking-wider"
            >
              View Full Menu ➔
            </Link>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bestSellerItems.map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
