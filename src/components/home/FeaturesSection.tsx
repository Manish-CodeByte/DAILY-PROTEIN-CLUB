import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Leaf, Calculator, Bike, Tag, HeartPulse } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'High Protein',
      description: 'Minimum 30g to 60g+ of pure high-grade protein in every single meal.',
      icon: Dumbbell,
      color: 'text-[#39D353]',
      bg: 'bg-[#39D353]/10',
      border: 'hover:border-[#39D353]/40'
    },
    {
      title: 'Fresh Ingredients',
      description: 'Fresh farm-raised chicken breast, low-fat cottage cheese & organic greens delivered daily.',
      icon: Leaf,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'hover:border-emerald-400/40'
    },
    {
      title: 'Macro Counted',
      description: 'Precise Protein, Carbs, Fats & Calorie labels calculated by certified sports nutritionists.',
      icon: Calculator,
      color: 'text-[#FF7A00]',
      bg: 'bg-[#FF7A00]/10',
      border: 'hover:border-[#FF7A00]/40'
    },
    {
      title: 'Fast Delivery',
      description: '25-35 min express delivery to all MAHE hostels & Manipal apartments.',
      icon: Bike,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      border: 'hover:border-blue-400/40'
    },
    {
      title: 'Affordable Student Pricing',
      description: 'Pocket-friendly fitness meals crafted with student & doctor budgets in mind.',
      icon: Tag,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
      border: 'hover:border-amber-400/40'
    },
    {
      title: 'Healthy Choices',
      description: 'Zero refined seed oils, low-sugar sauces, and high-fiber complex grains.',
      icon: HeartPulse,
      color: 'text-pink-400',
      bg: 'bg-pink-400/10',
      border: 'hover:border-pink-400/40'
    }
  ];

  return (
    <section className="py-20 bg-[#0B0B0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#39D353] uppercase tracking-widest block mb-2">
            Why Choose Daily Protein Club
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Nutrition Designed for Peak Human Performance
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-3 leading-relaxed">
            We bridge the gap between delicious commercial dining and disciplined athletic nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`glass-panel p-6 rounded-3xl border border-gray-800/80 transition-all duration-300 ${feat.border}`}
              >
                <div className={`w-12 h-12 rounded-2xl ${feat.bg} flex items-center justify-center mb-5`}>
                  <Icon className={`w-6 h-6 ${feat.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{feat.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
