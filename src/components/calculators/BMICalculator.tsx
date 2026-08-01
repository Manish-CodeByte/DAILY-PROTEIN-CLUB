import React, { useState } from 'react';
import { Activity, Dumbbell } from 'lucide-react';
import { calculateBMI } from '../../utils/formatters';
import { MENU_ITEMS } from '../../data/menuItems';
import { FoodCard } from '../food/FoodCard';

export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);

  const result = calculateBMI(weight, height);

  // Filter recommended meals based on BMI category
  const recommendedMeals = MENU_ITEMS.filter(item => {
    if (result.category.includes('Overweight') || result.category.includes('Obese')) {
      return item.recommendedFor?.includes('Fat Loss') || item.recommendedFor?.includes('Cutting');
    }
    if (result.category.includes('Underweight')) {
      return item.recommendedFor?.includes('Bulking') || item.recommendedFor?.includes('Muscle Gain');
    }
    return item.isBestSeller;
  }).slice(0, 3);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-[#39D353]/15 text-[#39D353]">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">BMI Body Mass Index Calculator</h3>
          <p className="text-xs text-gray-400">Calculate your current BMI category and get tailored meal suggestions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Sliders / Inputs */}
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-gray-300">Height (cm)</span>
              <span className="text-[#39D353]">{height} cm</span>
            </div>
            <input
              type="range"
              min="120"
              max="220"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#39D353]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-gray-300">Weight (kg)</span>
              <span className="text-[#39D353]">{weight} kg</span>
            </div>
            <input
              type="range"
              min="40"
              max="150"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#39D353]"
            />
          </div>
        </div>

        {/* Result Badge Box */}
        <div className="bg-[#0B0B0B] p-6 rounded-2xl border border-gray-800 text-center flex flex-col items-center justify-center">
          <span className="text-xs text-gray-400 uppercase tracking-widest block mb-1">Your Calculated BMI</span>
          <span className="text-4xl font-black text-white my-1 tracking-tight">{result.bmi}</span>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold mt-2"
            style={{ backgroundColor: `${result.categoryColor}20`, color: result.categoryColor, border: `1px solid ${result.categoryColor}40` }}
          >
            {result.category}
          </span>
        </div>
      </div>

      {/* Recommended Meals */}
      <div className="pt-4 border-t border-gray-800">
        <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <Dumbbell className="w-4 h-4 text-[#39D353]" /> Recommended Meals for Your BMI Goal
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recommendedMeals.map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
