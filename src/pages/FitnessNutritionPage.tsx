import React from 'react';
import { FitnessGoalsSection } from '../components/home/FitnessGoalsSection';
import { NutritionGuideSection } from '../components/home/NutritionGuideSection';

export const FitnessNutritionPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-[#0B0B0B]">
      <FitnessGoalsSection />
      <NutritionGuideSection />
    </div>
  );
};
