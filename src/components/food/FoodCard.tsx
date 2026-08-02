import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';
import { MenuItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';

interface FoodCardProps {
  item: MenuItem;
}

const FALLBACK_FOOD_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800';

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addToCart, toggleFavorite, isFavorite, setQuickViewItem } = useCart();
  const isFav = isFavorite(item.id);
  const [imgSrc, setImgSrc] = useState(item.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative bg-[#0F172A]/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-[#10B981]/20 hover:border-[#10B981]/60 transition-all duration-300 shadow-xl flex flex-col h-full"
    >
      {/* Top Food Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#090D16]">
        <img
          src={imgSrc}
          alt={item.name}
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_FOOD_IMAGE)}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/40" />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
          }}
          aria-label={`Save ${item.name} to favorites`}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all ${
            isFav ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-black/50 text-gray-300 hover:text-white border border-white/10'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-400' : ''}`} />
        </button>

        {/* Category Pill / Best Seller Tag */}
        {item.isBestSeller && (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#10B981] text-black text-[10px] font-black uppercase tracking-wider shadow-md">
            🔥 Bestseller
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Title */}
          <h3
            onClick={() => setQuickViewItem(item)}
            className="text-sm font-bold text-[#F9FAFB] group-hover:text-[#10B981] transition-colors line-clamp-1 cursor-pointer mb-1.5"
          >
            {item.name}
          </h3>

          {/* Rating & Macro Summary Line (4.8 ★ | P: 35g C: 25g | ₹299) */}
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#9CA3AF] mb-3 flex-wrap">
            <span className="flex items-center gap-0.5 text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded">
              {item.rating} <Star className="w-3 h-3 fill-amber-400 inline" />
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[#10B981] font-bold">P: {item.protein}g</span>
            <span className="text-[#06B6D4]">C: {item.carbs}g</span>
            <span className="text-white/20">|</span>
            <span className="text-[#F9FAFB] font-black">{formatCurrency(item.price)}</span>
          </div>
        </div>

        {/* Action Buttons: ADD TO CART (Emerald Green) & QUICK VIEW (Ghost Outline) */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(item)}
            className="w-full py-2 px-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-black font-black text-[11px] tracking-wide uppercase transition-all shadow-md shadow-[#10B981]/20 cursor-pointer text-center flex items-center justify-center gap-1"
          >
            <Sparkles className="w-3 h-3" /> ADD TO CART
          </motion.button>

          <button
            onClick={() => setQuickViewItem(item)}
            className="w-full py-2 px-2.5 rounded-xl bg-transparent hover:bg-white/5 text-[#F9FAFB] border border-white/20 font-extrabold text-[11px] tracking-wide uppercase transition-all text-center"
          >
            QUICK VIEW
          </button>
        </div>
      </div>
    </motion.div>
  );
};
