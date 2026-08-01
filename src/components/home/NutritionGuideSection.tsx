import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Flame, PieChart, Sparkles, ChevronDown, Check } from 'lucide-react';
import { NUTRITION_TOPICS } from '../../data/nutritionTips';

export const NutritionGuideSection: React.FC = () => {
  const [activeTopicId, setActiveTopicId] = useState<string>(NUTRITION_TOPICS[0].id);
  const [openAccordionIdx, setOpenAccordionIdx] = useState<number | null>(0);

  const activeTopic = NUTRITION_TOPICS.find(t => t.id === activeTopicId) || NUTRITION_TOPICS[0];

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return ShieldCheck;
      case 'Flame': return Flame;
      case 'PieChart': return PieChart;
      case 'Sparkles': return Sparkles;
      default: return ShieldCheck;
    }
  };

  return (
    <section id="nutrition" className="py-20 bg-[#0B0B0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-widest block mb-2">
            Science-Backed Fitness Knowledge
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive Nutrition Masterclass
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-3 leading-relaxed">
            Understand the science behind protein synthesis, caloric balance, and athletic macro splits.
          </p>
        </div>

        {/* Topic Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {NUTRITION_TOPICS.map((topic) => {
            const Icon = getTopicIcon(topic.icon);
            const isSelected = activeTopicId === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  setActiveTopicId(topic.id);
                  setOpenAccordionIdx(0);
                }}
                className={`p-5 rounded-3xl text-left border transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#111827] border-[#39D353] shadow-lg shadow-[#39D353]/15'
                    : 'glass-panel border-gray-800/80 hover:border-gray-700'
                }`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-3 ${
                  isSelected ? 'bg-[#39D353] text-black' : 'bg-gray-800 text-gray-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{topic.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{topic.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Topic Content Window */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gray-800">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <span className="text-xs font-bold text-[#39D353] uppercase tracking-wider block mb-1">
                {activeTopic.subtitle}
              </span>
              <h3 className="text-2xl font-extrabold text-white">{activeTopic.title}</h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed font-normal">
                {activeTopic.summary}
              </p>
            </div>

            {/* Accordion List for Details */}
            <div className="space-y-3 pt-4 border-t border-gray-800">
              {activeTopic.details.map((detail, idx) => {
                const isOpen = openAccordionIdx === idx;
                return (
                  <div key={idx} className="rounded-2xl bg-[#0B0B0B] border border-gray-800 overflow-hidden">
                    <button
                      onClick={() => setOpenAccordionIdx(isOpen ? null : idx)}
                      className="w-full p-4 flex items-center justify-between text-left text-sm font-bold text-white hover:text-[#39D353] transition-colors"
                    >
                      <span>{detail.heading}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#39D353]' : 'text-gray-500'}`} />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-4 pb-4 text-xs text-gray-300 space-y-3"
                        >
                          <p className="leading-relaxed">{detail.content}</p>
                          <div className="space-y-1.5 pt-2">
                            {detail.bulletPoints.map((bp, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-2 text-gray-300">
                                <Check className="w-3.5 h-3.5 text-[#39D353] shrink-0 mt-0.5" />
                                <span>{bp}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
