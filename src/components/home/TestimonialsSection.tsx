import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#070707] relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#39D353] uppercase tracking-widest block mb-2">
            Manipal Community Loved
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What Students & Doctors Say
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-3 leading-relaxed">
            Over 30,000+ high-protein meals served across MAHE Manipal campus. Here is what our fitness community thinks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-3xl border border-gray-800/80 flex flex-col justify-between hover:border-[#39D353]/30 transition-all duration-300"
            >
              <div>
                {/* Header Rating & Quote */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-gray-700" />
                </div>

                <p className="text-xs text-gray-300 leading-relaxed font-normal italic mb-6">
                  "{test.review}"
                </p>
              </div>

              {/* User Info */}
              <div className="pt-4 border-t border-gray-800/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1">
                      {test.name}
                      {test.verifiedUser && (
                        <span title="Verified Customer"><ShieldCheck className="w-3.5 h-3.5 text-[#39D353]" /></span>
                      )}
                    </h4>
                    <span className="text-[10px] text-gray-400 block">{test.role}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] text-gray-500 block uppercase">Favorite Meal</span>
                  <span className="text-[10px] font-semibold text-[#39D353] block truncate max-w-[100px]">
                    {test.favoriteMeal}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
