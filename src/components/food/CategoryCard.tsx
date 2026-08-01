import React from 'react';
import { motion } from 'framer-motion';
import { CategoryInfo } from '../../types';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: CategoryInfo;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer border border-gray-800 hover:border-[#39D353]/50 shadow-xl shadow-black/50"
    >
      {/* Background Image */}
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <span className="text-xs font-semibold px-3 py-1 rounded-full glass-panel text-white border border-white/10">
            {category.itemCount} Items
          </span>
          <div className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white group-hover:bg-[#39D353] group-hover:text-black transition-all duration-300">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-[#39D353] transition-colors mb-1">
            {category.name}
          </h3>
          <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed font-normal">
            {category.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
