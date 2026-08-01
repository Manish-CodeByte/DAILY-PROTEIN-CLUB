import React, { useState } from 'react';
import { Dumbbell, Sparkles } from 'lucide-react';
import { GoalType } from '../../types';
import { MENU_ITEMS } from '../../data/menuItems';
import { FoodCard } from '../food/FoodCard';

export const ProteinCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(72);
  const [goal, setGoal] = useState<GoalType>('Muscle Gain');

  const getProteinMultiplier = () => {
    switch (goal) {
      case 'Muscle Gain': return 2.2;
      case 'Fat Loss': return 2.0;
      case 'Bulking': return 2.0;
      case 'Cutting': return 2.4;
      default: return 1.6;
    }
  };

  const dailyProtein = Math.round(weight * getProteinMultiplier());
  const proteinPerMeal = Math.round(dailyProtein / 4);

  const matchingMeals = MENU_ITEMS.filter(m => m.recommendedFor?.includes(goal)).slice(0, 3);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-[#FF7A00]/15 text-[#FF7A00]">
          <Dumbbell className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Daily Protein Requirement Calculator</h3>
          <p className="text-xs text-gray-400">Calculate exact grams of protein needed daily based on your fitness objective.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-2">Select Your Fitness Goal</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Muscle Gain', 'Fat Loss', 'Bulking', 'Cutting', 'Maintenance'] as GoalType[]).map(g => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                    goal === g
                      ? 'bg-[#39D353]/15 border-[#39D353] text-[#39D353]'
                      : 'bg-[#0B0B0B] border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-gray-300">Body Weight</span>
              <span className="text-[#39D353]">{weight} kg</span>
            </div>
            <input
              type="range"
              min="40"
              max="140"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#39D353]"
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-[#0B0B0B] p-6 rounded-2xl border border-gray-800 flex flex-col justify-center space-y-4">
          <div className="text-center">
            <span className="text-xs text-gray-400 uppercase tracking-widest block">Daily Target Protein</span>
            <span className="text-4xl font-black text-[#39D353] my-1 block">{dailyProtein}g</span>
            <span className="text-xs text-gray-400">({getProteinMultiplier()}g per kg bodyweight)</span>
          </div>

          <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-between text-xs">
            <span className="text-gray-300">Protein Target Per Meal (4 Meals)</span>
            <span className="font-bold text-white text-sm">{proteinPerMeal}g / meal</span>
          </div>
        </div>
      </div>

      {/* Suggested meals */}
      <div className="pt-4 border-t border-gray-800">
        <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#FF7A00]" /> Ideal Daily Protein Club Meals for {goal}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {matchingMeals.map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
