import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
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
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group relative bg-[#111214] rounded-2xl overflow-hidden border border-white/10 hover:border-[#0A84FF]/40 transition-all duration-200 shadow-lg flex flex-col h-full"
    >
      {/* Top Food Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0A0C]">
        <img
          src={imgSrc}
          alt={item.name}
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_FOOD_IMAGE)}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111214] via-transparent to-black/40" />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
          }}
          aria-label={`Save ${item.name} to favorites`}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all ${
            isFav ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-black/40 text-gray-300 hover:text-white border border-white/10'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-400' : ''}`} />
        </button>

        {/* Category Pill / Best Seller Tag */}
        {item.isBestSeller && (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#0A84FF] text-white text-[10px] font-extrabold uppercase tracking-wider">
            Bestseller
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Title */}
          <h3
            onClick={() => setQuickViewItem(item)}
            className="text-sm font-bold text-[#F5F5F7] group-hover:text-[#0A84FF] transition-colors line-clamp-1 cursor-pointer mb-1.5"
          >
            {item.name}
          </h3>

          {/* Rating & Macro Summary Line (4.8 ★ | P: 35g C: 25g | ₹299) */}
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#A1A1A6] mb-3 flex-wrap">
            <span className="flex items-center gap-0.5 text-yellow-400 font-bold bg-yellow-500/10 px-1.5 py-0.5 rounded">
              {item.rating} <Star className="w-3 h-3 fill-yellow-400 inline" />
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[#22D3EE] font-bold">P: {item.protein}g</span>
            <span className="text-[#7DD3FC]">C: {item.carbs}g</span>
            <span className="text-white/20">|</span>
            <span className="text-[#F5F5F7] font-extrabold">{formatCurrency(item.price)}</span>
          </div>
        </div>

        {/* Action Buttons: ADD TO CART (Electric Blue) & QUICK VIEW (Ghost Outline) */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => addToCart(item)}
            className="w-full py-2 px-2.5 rounded-xl bg-[#0A84FF] hover:bg-[#0071E3] text-white font-extrabold text-[11px] tracking-wide uppercase transition-all shadow-md shadow-[#0A84FF]/20 cursor-pointer text-center"
          >
            ADD TO CART
          </motion.button>

          <button
            onClick={() => setQuickViewItem(item)}
            className="w-full py-2 px-2.5 rounded-xl bg-transparent hover:bg-white/5 text-[#F5F5F7] border border-white/15 font-extrabold text-[11px] tracking-wide uppercase transition-all text-center"
          >
            QUICK VIEW
          </button>
        </div>
      </div>
    </motion.div>
  );
};
