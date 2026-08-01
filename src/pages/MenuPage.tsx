import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Heart, X, Dumbbell } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuItems';
import { GoalType } from '../types';
import { FoodCard } from '../components/food/FoodCard';
import { useCart } from '../context/CartContext';

export const MenuPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [dietaryFilter, setDietaryFilter] = useState<'All' | 'Veg' | 'Non-Veg'>('All');
  const [goalFilter, setGoalFilter] = useState<string>('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'protein-high' | 'calories-low'>('popular');

  useEffect(() => {
    const cat = searchParams.get('cat');
    const filter = searchParams.get('filter');
    if (cat) setSelectedCategory(cat);
    if (filter === 'favorites') setShowFavoritesOnly(true);
  }, [searchParams]);

  const categories: string[] = ['All', 'Wraps', 'Chicken Meals', 'Rice Bowls', 'Healthy Bowls', 'Kebabs', 'Rolls', 'Salads', 'Protein Drinks'];
  const goals: string[] = ['All', 'Muscle Gain', 'Fat Loss', 'Bulking', 'Cutting', 'Maintenance'];

  // Filter Logic
  const filteredItems = MENU_ITEMS.filter((item) => {
    // Category check
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchIng = item.ingredients?.some(i => i.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchIng) return false;
    }

    // Dietary
    if (dietaryFilter === 'Veg' && !item.isVegetarian) return false;
    if (dietaryFilter === 'Non-Veg' && item.isVegetarian) return false;

    // Goal
    if (goalFilter !== 'All' && !item.recommendedFor?.includes(goalFilter as GoalType)) return false;

    // Favorites
    if (showFavoritesOnly && !favorites.includes(item.id)) return false;

    return true;
  });

  // Sorting Logic
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'protein-high': return b.protein - a.protein;
      case 'calories-low': return a.calories - b.calories;
      case 'popular':
      default:
        return (b.rating * b.reviewCount) - (a.rating * a.reviewCount);
    }
  });

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setDietaryFilter('All');
    setGoalFilter('All');
    setShowFavoritesOnly(false);
    setSearchParams({});
  };

  return (
    <div className="pt-28 pb-20 bg-[#0B0B0B] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#39D353] uppercase tracking-widest block mb-2">
            Macro-Counted Culinary Excellence
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            High-Protein Menu
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            20+ realistic macro-counted meals, protein wraps, grilled chicken breast & isolate shakes.
          </p>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-gray-800 mb-8 space-y-4">
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search wraps, chicken breast, whey shake..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass-input px-4 py-3 pl-11 rounded-2xl text-xs"
              />
              <Search className="w-4 h-4 text-gray-500 absolute left-4 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Right Controls: Sort & Favorites */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
                  showFavoritesOnly
                    ? 'bg-red-500/20 border-red-500/50 text-red-400'
                    : 'glass-panel text-gray-300 border-gray-800 hover:border-gray-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-red-500' : ''}`} />
                <span>Favorites ({favorites.length})</span>
              </button>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#39D353]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="glass-input px-3 py-2.5 rounded-2xl text-xs bg-[#111827] text-white border-gray-800 font-semibold"
                >
                  <option value="popular">Most Popular</option>
                  <option value="protein-high">Highest Protein</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="calories-low">Lowest Calories</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#39D353] text-black shadow-md shadow-[#39D353]/20'
                    : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Filters: Dietary & Goal */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-gray-800/80 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-gray-400 font-semibold">Dietary:</span>
              {(['All', 'Veg', 'Non-Veg'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDietaryFilter(d)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    dietaryFilter === d
                      ? 'bg-[#FF7A00]/20 text-[#FF7A00] border border-[#FF7A00]/40'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {d === 'Veg' ? '🌱 100% Veg' : d === 'Non-Veg' ? '🍗 Non-Veg' : 'All Diets'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-semibold">Goal:</span>
              <select
                value={goalFilter}
                onChange={(e) => setGoalFilter(e.target.value)}
                className="glass-input px-2.5 py-1 rounded-xl text-xs bg-[#111827] text-gray-300 border-gray-800"
              >
                {goals.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between mb-6 text-xs text-gray-400 px-1">
          <span>Showing <strong className="text-white">{sortedItems.length}</strong> items</span>
          {(selectedCategory !== 'All' || searchQuery || dietaryFilter !== 'All' || goalFilter !== 'All' || showFavoritesOnly) && (
            <button
              onClick={clearAllFilters}
              className="text-[#39D353] hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Menu Cards Grid */}
        {sortedItems.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-3xl border border-gray-800 my-10">
            <Dumbbell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No matching protein meals found</h3>
            <p className="text-xs text-gray-400 mb-4">Try adjusting your category, diet, or search query filters.</p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 rounded-xl bg-[#39D353] text-black text-xs font-bold"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
