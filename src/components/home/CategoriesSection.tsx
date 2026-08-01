import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { CategoryCard } from '../food/CategoryCard';

export const CategoriesSection: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/menu?cat=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="py-20 bg-[#070707] relative border-t border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-widest block mb-2">
              Explore Our Menu
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Fuel Your Fitness by Category
            </h2>
          </div>
          <p className="text-xs text-gray-400 max-w-sm mt-3 md:mt-0 leading-relaxed">
            Every category features distinct high-protein recipes made with raw-weighed meats, whole-grain tortillas, and fresh greens.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onClick={() => handleCategoryClick(cat.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
