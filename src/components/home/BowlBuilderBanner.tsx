import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Target } from 'lucide-react';

export const BowlBuilderBanner: React.FC = () => {
  return (
    <section className="py-16 bg-[#000000] relative border-t border-b border-white/10 overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#0A84FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-[#111214] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          
          {/* Left Text & CTA */}
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A84FF]/15 text-[#0A84FF] border border-[#0A84FF]/30 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#0A84FF]" /> Interactive Feature
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F7] tracking-tight">
              Build Your Custom Precision Bowl
            </h2>

            <p className="text-xs sm:text-sm text-[#A1A1A6] leading-relaxed font-normal max-w-xl">
              Map your macros live with our interactive ingredient pantry. Select your fitness goal, pick fresh protein, bases & superfood toppings, and watch your visual macro gauges update in real-time!
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/builder"
                className="px-7 py-3.5 rounded-2xl bg-[#0A84FF] hover:bg-[#0071E3] text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-[#0A84FF]/25 hover:scale-102 transition-all"
              >
                Launch Bowl Builder <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>
            </div>
          </div>

          {/* Right Visual Preview Graphic with Power Bowl Dish */}
          <div className="lg:col-span-5 relative">
            <div className="p-5 rounded-2xl bg-[#0A0A0C] border border-white/10 space-y-4 shadow-xl">
              
              <div className="flex gap-4 items-center">
                <img
                  src="/grilled-chicken-bowl.png"
                  alt="High Protein Grilled Chicken & Avocado Bowl"
                  className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-white/10 bg-black/40 p-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center text-xs font-bold text-[#F5F5F7] mb-1">
                    <span className="flex items-center gap-1 text-[#0A84FF]">
                      <Target className="w-4 h-4" /> Lean Bulk (+Protein)
                    </span>
                    <span className="text-[#F5F5F7] font-mono">580 kcal</span>
                  </div>
                  <span className="text-[11px] text-[#A1A1A6]">Herb Grilled Chicken, Avocado & Quinoa</span>
                </div>
              </div>

              {/* Animated Mini Gauges in Apple Blue Palette */}
              <div className="space-y-2 text-[10px] font-bold">
                <div>
                  <div className="flex justify-between mb-0.5 text-[#0A84FF]">
                    <span>Protein</span>
                    <span>58g / 60g</span>
                  </div>
                  <div className="h-2 w-full bg-[#111214] rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-[#0A84FF] rounded-full w-[96%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-0.5 text-[#22D3EE]">
                    <span>Carbs</span>
                    <span>52g / 60g</span>
                  </div>
                  <div className="h-2 w-full bg-[#111214] rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-[#22D3EE] rounded-full w-[86%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-0.5 text-[#7DD3FC]">
                    <span>Fats</span>
                    <span>14g / 15g</span>
                  </div>
                  <div className="h-2 w-full bg-[#111214] rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-[#7DD3FC] rounded-full w-[93%]" />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs font-extrabold text-[#0A84FF]">
                <span>Macro Match: 96%</span>
                <span className="text-[#F5F5F7]">Live Visual Mapping 🔥</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
