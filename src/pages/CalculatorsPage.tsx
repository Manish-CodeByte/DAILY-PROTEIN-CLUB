import React, { useState } from 'react';
import { BMICalculator } from '../components/calculators/BMICalculator';
import { ProteinCalculator } from '../components/calculators/ProteinCalculator';
import { CalorieCalculator } from '../components/calculators/CalorieCalculator';
import { Activity, Dumbbell, Flame } from 'lucide-react';

export const CalculatorsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bmi' | 'protein' | 'calorie'>('protein');

  return (
    <div className="pt-28 pb-20 bg-[#0B0B0B] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#39D353] uppercase tracking-widest block mb-2">
            Precision Fitness Tools
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Interactive Fitness Calculators
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Calculate your BMI, Daily Protein target, BMR, and TDEE to get custom meal plan recommendations.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          <button
            onClick={() => setActiveTab('protein')}
            className={`px-6 py-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all ${
              activeTab === 'protein'
                ? 'bg-[#39D353] text-black shadow-lg shadow-[#39D353]/30 scale-105'
                : 'glass-panel text-gray-300 border border-gray-800 hover:border-gray-700'
            }`}
          >
            <Dumbbell className="w-4 h-4" /> Protein Target Calculator
          </button>

          <button
            onClick={() => setActiveTab('bmi')}
            className={`px-6 py-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all ${
              activeTab === 'bmi'
                ? 'bg-[#39D353] text-black shadow-lg shadow-[#39D353]/30 scale-105'
                : 'glass-panel text-gray-300 border border-gray-800 hover:border-gray-700'
            }`}
          >
            <Activity className="w-4 h-4" /> BMI Body Mass Index
          </button>

          <button
            onClick={() => setActiveTab('calorie')}
            className={`px-6 py-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all ${
              activeTab === 'calorie'
                ? 'bg-[#39D353] text-black shadow-lg shadow-[#39D353]/30 scale-105'
                : 'glass-panel text-gray-300 border border-gray-800 hover:border-gray-700'
            }`}
          >
            <Flame className="w-4 h-4" /> BMR & TDEE Calorie Calculator
          </button>
        </div>

        {/* Tab Content */}
        <div className="max-w-5xl mx-auto">
          {activeTab === 'protein' && <ProteinCalculator />}
          {activeTab === 'bmi' && <BMICalculator />}
          {activeTab === 'calorie' && <CalorieCalculator />}
        </div>

      </div>
    </div>
  );
};
