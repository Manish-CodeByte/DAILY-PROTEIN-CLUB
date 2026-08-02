import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, Headphones, ShieldCheck, Calendar, RefreshCw, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../../utils/constants';

export const WhyChooseUsSection: React.FC = () => {
  const valueProps = [
    {
      icon: Utensils,
      title: 'Made Fresh, DAILY!',
      description: 'Always fresh, never frozen, healthy and delicious meals.',
      accent: '#0A84FF'
    },
    {
      icon: Headphones,
      title: '24/7 Nutritional Support',
      description: 'Nutritional support round the clock at your fingertips.',
      accent: '#22D3EE'
    },
    {
      icon: ShieldCheck,
      title: 'Hygienic',
      description: 'Daily sanitization, temperature checks, and contactless safe delivery.',
      accent: '#7DD3FC'
    },
    {
      icon: Calendar,
      title: 'Delivery on ALL Days',
      description: 'Freshly prepared meals delivered daily to your doorstep.',
      accent: '#0A84FF'
    },
    {
      icon: RefreshCw,
      title: 'Daily Changing Menu',
      description: 'Thirty-day rotating menu ensures fresh flavors daily.',
      accent: '#22D3EE'
    },
    {
      icon: CheckCircle,
      title: 'No Commitments',
      description: 'Pause or resume your meal plan anytime, hassle-free.',
      accent: '#7DD3FC'
    }
  ];

  return (
    <section className="py-20 bg-[#000000] text-[#F5F5F7] relative border-t border-white/10 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#0A84FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* SECTION HEADER & HERO DISH SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading & Intro */}
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A84FF]/15 text-[#0A84FF] border border-[#0A84FF]/30 text-xs font-bold uppercase tracking-widest">
              <span>EXCELLENCE IN EVERY BITE</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F7] tracking-tight leading-tight">
              Why Choose <span className="text-[#0A84FF]">DAILY PROTEIN CLUB?</span>
            </h2>

            <p className="text-base sm:text-lg text-[#A1A1A6] font-normal leading-relaxed max-w-xl">
              Made fresh, DAILY! Always fresh, never frozen, healthy and delicious meals crafted specifically for your fitness goals.
            </p>

            <div className="pt-2">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#0A84FF] hover:bg-[#0071E3] text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-[#0A84FF]/25 hover:scale-102 transition-all cursor-pointer"
              >
                <span>View Menu</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>

          {/* Right Column: High Protein Power Bowl Image Display */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative max-w-xs sm:max-w-sm"
            >
              <img
                src="/hero-protein-bowl.png"
                alt="Fresh High Protein Egg & Avocado Power Bowl"
                className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] rounded-full border border-white/10 bg-black/40 p-2"
              />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#0A0A0C]/90 backdrop-blur-md border border-[#0A84FF]/40 text-xs font-bold text-[#F5F5F7] whitespace-nowrap shadow-xl">
                🥗 100% Fresh • Made Daily
              </div>
            </motion.div>
          </div>

        </div>

        {/* 6 VALUE PROPOSITIONS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {valueProps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                className="p-6 rounded-3xl bg-[#111214] border border-white/10 hover:border-[#0A84FF]/40 transition-all duration-200 shadow-xl flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: `${item.accent}15`, color: item.accent }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-[#F5F5F7] group-hover:text-[#0A84FF] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#A1A1A6] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BIG SWIGGY & ZOMATO EXPRESS ORDER BANNER */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#111214] border border-white/10 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/30 text-xs font-bold uppercase tracking-widest">
              INSTANT EXPRESS DELIVERY
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-[#F5F5F7] tracking-tight">
              Order your favorite meals with ease through Zomato or Swiggy!
            </h3>
            <p className="text-xs sm:text-sm text-[#A1A1A6] font-normal leading-relaxed">
              Enjoy fast delivery directly to your doorstep anywhere across Manipal.
            </p>
          </div>

          {/* BIG SWIGGY & ZOMATO BRAND BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            
            {/* BIG SWIGGY BUTTON */}
            <a
              href={RESTAURANT_INFO.swiggyUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto min-w-[240px] px-8 py-5 rounded-2xl bg-[#FC8019] hover:bg-[#e06d0e] text-white font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl shadow-[#FC8019]/30 hover:scale-103 transition-all cursor-pointer"
            >
              {/* Custom Swiggy S Badge */}
              <div className="w-8 h-8 rounded-xl bg-white text-[#FC8019] font-black text-lg flex items-center justify-center shadow-md">
                S
              </div>
              <span>Order on Swiggy</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>

            {/* BIG ZOMATO BUTTON */}
            <a
              href={RESTAURANT_INFO.zomatoUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto min-w-[240px] px-8 py-5 rounded-2xl bg-[#CB202D] hover:bg-[#b01924] text-white font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl shadow-[#CB202D]/30 hover:scale-103 transition-all cursor-pointer"
            >
              {/* Custom Zomato Z Badge */}
              <div className="w-8 h-8 rounded-xl bg-white text-[#CB202D] font-black text-lg flex items-center justify-center shadow-md">
                Z
              </div>
              <span>Order on Zomato</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>

          </div>
        </div>

      </div>
    </section>
  );
};
