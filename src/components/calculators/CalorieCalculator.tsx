import React, { useState } from 'react';
import { Flame } from 'lucide-react';
import { calculateTDEE } from '../../utils/formatters';

export const CalorieCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);
  const [age, setAge] = useState<number>(21);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<number>(1.55); // Moderate activity

  const { bmr, tdee } = calculateTDEE(weight, height, age, gender, activity);

  const fatLossCalories = Math.round(tdee - 450);
  const bulkingCalories = Math.round(tdee + 400);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-500">
          <Flame className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Daily Calorie & TDEE Calculator</h3>
          <p className="text-xs text-gray-400">Calculate Basal Metabolic Rate (BMR) & Total Daily Energy Expenditure (TDEE).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Controls */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Gender</label>
              <div className="grid grid-cols-2 gap-1 bg-[#0B0B0B] p-1 rounded-xl border border-gray-800 text-xs">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-1.5 rounded-lg font-semibold ${gender === 'male' ? 'bg-[#39D353] text-black' : 'text-gray-400'}`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-1.5 rounded-lg font-semibold ${gender === 'female' ? 'bg-[#39D353] text-black' : 'text-gray-400'}`}
                >
                  Female
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Age (Years)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full glass-input px-3 py-2 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full glass-input px-3 py-2 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full glass-input px-3 py-2 rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Weekly Activity Level</label>
            <select
              value={activity}
              onChange={(e) => setActivity(Number(e.target.value))}
              className="w-full glass-input px-3 py-2 rounded-xl text-xs bg-[#111827] text-white"
            >
              <option value={1.2}>Sedentary (Desk Job, little or no exercise)</option>
              <option value={1.375}>Lightly Active (Gym 1-3 days/week)</option>
              <option value={1.55}>Moderately Active (Gym 3-5 days/week)</option>
              <option value={1.725}>Very Active (Hard Gym 6-7 days/week)</option>
              <option value={1.9}>Extra Active (Athlete / Double Training)</option>
            </select>
          </div>
        </div>

        {/* Results Matrix */}
        <div className="bg-[#0B0B0B] p-6 rounded-2xl border border-gray-800 space-y-3 flex flex-col justify-center">
          <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 flex justify-between items-center text-xs">
            <span className="text-gray-400">BMR (Basal Metabolic Rate)</span>
            <span className="font-bold text-white text-sm">{bmr} kcal/day</span>
          </div>

          <div className="p-3 rounded-xl bg-[#39D353]/10 border border-[#39D353]/30 flex justify-between items-center text-xs">
            <span className="text-[#39D353] font-semibold">TDEE (Maintenance Calories)</span>
            <span className="font-extrabold text-white text-base">{tdee} kcal</span>
          </div>

          <div className="p-3 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex justify-between items-center text-xs">
            <span className="text-[#FF7A00] font-semibold">Fat Loss Target (-450 kcal)</span>
            <span className="font-bold text-white text-sm">{fatLossCalories} kcal</span>
          </div>

          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 flex justify-between items-center text-xs">
            <span className="text-blue-400 font-semibold">Clean Bulking Target (+400 kcal)</span>
            <span className="font-bold text-white text-sm">{bulkingCalories} kcal</span>
          </div>
        </div>
      </div>
    </div>
  );
};
