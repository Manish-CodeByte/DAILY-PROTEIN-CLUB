import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Flame, Activity, TrendingUp, Zap, CheckCircle2 } from 'lucide-react';
import { FITNESS_GOALS } from '../../data/fitnessGoals';
import { GoalType } from '../../types';
import { MENU_ITEMS } from '../../data/menuItems';
import { FoodCard } from '../food/FoodCard';

export const FitnessGoalsSection: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<GoalType>('Muscle Gain');

  const currentGoalInfo = FITNESS_GOALS.find(g => g.id === selectedGoal) || FITNESS_GOALS[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Dumbbell': return Dumbbell;
      case 'Flame': return Flame;
      case 'Activity': return Activity;
      case 'TrendingUp': return TrendingUp;
      case 'Zap': return Zap;
      default: return Dumbbell;
    }
  };

  const recommendedMeals = MENU_ITEMS.filter(item =>
    currentGoalInfo.recommendedMealIds.includes(item.id)
  );

  return (
    <section id="fitness" className="py-20 bg-[#070707] relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#39D353] uppercase tracking-widest block mb-2">
            Tailored Nutrition Plans
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Goal-Based Meal Recommendations
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-3 leading-relaxed">
            Select your personal fitness target to discover curated macro ratios and meal recommendations.
          </p>
        </div>

        {/* Goal Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-10">
          {FITNESS_GOALS.map((goal) => {
            const Icon = getIcon(goal.iconName);
            const isSelected = selectedGoal === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#39D353] text-black shadow-lg shadow-[#39D353]/30 scale-105'
                    : 'glass-panel text-gray-300 hover:text-white border border-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{goal.title.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Goal Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedGoal}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="glass-panel p-6 sm:p-8 rounded-3xl border border-gray-800/80 mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#39D353]/20 text-[#39D353] font-bold text-xs border border-[#39D353]/30">
                    {currentGoalInfo.id} Target
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-white">{currentGoalInfo.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed font-normal">{currentGoalInfo.description}</p>

                {/* Macro Split Badge */}
                <div className="p-4 rounded-2xl bg-[#0B0B0B] border border-gray-800 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block">Optimal Macro Ratio</span>
                    <span className="text-sm font-bold text-[#39D353]">{currentGoalInfo.macroRatio}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block">Daily Calorie Window</span>
                    <span className="text-sm font-bold text-[#FF7A00]">{currentGoalInfo.recommendedCalories}</span>
                  </div>
                </div>
              </div>

              {/* Actionable Tips */}
              <div className="space-y-3 p-5 rounded-2xl bg-[#0B0B0B]/80 border border-gray-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Pro Nutrition Guidelines</h4>
                {currentGoalInfo.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#39D353] shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Recommended Meal Cards Grid */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
            Recommended Meals for {selectedGoal}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedMeals.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
