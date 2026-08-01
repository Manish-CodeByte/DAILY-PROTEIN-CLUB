import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight } from 'lucide-react';
import { MENU_ITEMS } from '../../data/menuItems';
import { FoodCard } from '../food/FoodCard';

export const BestSellersSection: React.FC = () => {
  const bestSellers = MENU_ITEMS.filter(item => item.isBestSeller).slice(0, 8);

  return (
    <section className="py-20 bg-[#0B0B0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-[#39D353] uppercase tracking-widest block mb-2 flex items-center gap-1">
              <Flame className="w-4 h-4 text-[#FF7A00]" /> Most Ordered in Manipal
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Customer Favorite Best Sellers
            </h2>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#39D353] hover:text-white transition-colors mt-4 md:mt-0"
          >
            View All 20+ Menu Items <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
};
