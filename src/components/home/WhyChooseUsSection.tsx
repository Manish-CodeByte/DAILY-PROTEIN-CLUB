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
      accent: '#10B981'
    },
    {
      icon: Headphones,
      title: '24/7 Nutritional Support',
      description: 'Nutritional support round the clock at your fingertips.',
      accent: '#06B6D4'
    },
    {
      icon: ShieldCheck,
      title: 'Hygienic',
      description: 'Daily sanitization, temperature checks, and contactless safe delivery.',
      accent: '#38BDF8'
    },
    {
      icon: Calendar,
      title: 'Delivery on ALL Days',
      description: 'Freshly prepared meals delivered daily to your doorstep.',
      accent: '#10B981'
    },
    {
      icon: RefreshCw,
      title: 'Daily Changing Menu',
      description: 'Thirty-day rotating menu ensures fresh flavors daily.',
      accent: '#06B6D4'
    },
    {
      icon: CheckCircle,
      title: 'No Commitments',
      description: 'Pause or resume your meal plan anytime, hassle-free.',
      accent: '#38BDF8'
    }
  ];

  return (
    <section className="py-20 text-[#F9FAFB] relative border-t border-white/10 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-cover bg-center opacity-10 filter contrast-125 mix-blend-luminosity pointer-events-none" style={{ backgroundImage: "url('/website-bg-texture.png')" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* SECTION HEADER & HERO DISH SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading & Intro */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-5"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-xs font-bold uppercase tracking-widest">
              <span>EXCELLENCE IN EVERY BITE</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-[#F9FAFB] tracking-tight leading-tight">
              Why Choose <span className="text-[#10B981]">DAILY PROTEIN CLUB?</span>
            </h2>

            <p className="text-base sm:text-lg text-[#9CA3AF] font-normal leading-relaxed max-w-xl">
              Made fresh, DAILY! Always fresh, never frozen, healthy and delicious meals crafted specifically for your fitness goals.
            </p>

            <div className="pt-2">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-black font-black text-xs uppercase tracking-wider shadow-xl shadow-[#10B981]/25 hover:scale-102 transition-all cursor-pointer"
              >
                <span>View Menu</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </motion.div>

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
                className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] rounded-full border border-[#10B981]/40 bg-black/40 p-2"
              />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#090D16]/90 backdrop-blur-md border border-[#10B981]/40 text-xs font-bold text-[#F9FAFB] whitespace-nowrap shadow-xl">
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
                className="p-6 rounded-3xl bg-[#0F172A]/70 backdrop-blur-xl border border-[#10B981]/20 hover:border-[#10B981]/60 transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${item.accent}15`, color: item.accent }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-[#F9FAFB] group-hover:text-[#10B981] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#9CA3AF] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BIG SWIGGY & ZOMATO EXPRESS ORDER BANNER */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0F172A]/80 backdrop-blur-2xl border border-[#10B981]/30 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-[#06B6D4]/15 text-[#06B6D4] border border-[#06B6D4]/30 text-xs font-bold uppercase tracking-widest">
              INSTANT EXPRESS DELIVERY
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-[#F9FAFB] tracking-tight">
              Order your favorite meals with ease through Zomato or Swiggy!
            </h3>
            <p className="text-xs sm:text-sm text-[#9CA3AF] font-normal leading-relaxed">
              Enjoy fast delivery directly to your doorstep anywhere across Manipal.
            </p>
          </div>

          {/* BIG SWIGGY & ZOMATO BRAND BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            
            {/* BIG SWIGGY BUTTON */}
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={RESTAURANT_INFO.swiggyUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto min-w-[240px] px-8 py-5 rounded-2xl bg-[#FC8019] hover:bg-[#e06d0e] text-white font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl shadow-[#FC8019]/30 transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-white text-[#FC8019] font-black text-lg flex items-center justify-center shadow-md">
                S
              </div>
              <span>Order on Swiggy</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </motion.a>

            {/* BIG ZOMATO BUTTON */}
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={RESTAURANT_INFO.zomatoUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto min-w-[240px] px-8 py-5 rounded-2xl bg-[#CB202D] hover:bg-[#b01924] text-white font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl shadow-[#CB202D]/30 transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-white text-[#CB202D] font-black text-lg flex items-center justify-center shadow-md">
                Z
              </div>
              <span>Order on Zomato</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </motion.a>

          </div>
        </div>

      </div>
    </section>
  );
};
