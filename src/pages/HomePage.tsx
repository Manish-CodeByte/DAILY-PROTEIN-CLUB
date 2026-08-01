import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { CategoriesSection } from '../components/home/CategoriesSection';
import { BestSellersSection } from '../components/home/BestSellersSection';
import { BowlBuilderBanner } from '../components/home/BowlBuilderBanner';
import { FitnessGoalsSection } from '../components/home/FitnessGoalsSection';
import { NutritionGuideSection } from '../components/home/NutritionGuideSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { FAQSection } from '../components/home/FAQSection';
import { ContactSection } from '../components/home/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <BestSellersSection />
      <BowlBuilderBanner />
      <FitnessGoalsSection />
      <NutritionGuideSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
};
