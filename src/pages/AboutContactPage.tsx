import React from 'react';
import { ContactSection } from '../components/home/ContactSection';
import { Dumbbell, Utensils, Award } from 'lucide-react';

export const AboutContactPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#0B0B0B]">
      
      {/* About Story Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#39D353] uppercase tracking-widest block mb-2">
            Our Story in Manipal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            About Daily Protein Club
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-3 leading-relaxed">
            Founded in Manipal by fitness enthusiasts and medical researchers to revolutionize clean student nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-gray-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#39D353]/15 text-[#39D353] flex items-center justify-center mx-auto">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">100% Raw Weight Weighing</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every portion of chicken breast, paneer, and mutton is weighed raw before cooking to guarantee honest macro values.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-gray-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FF7A00]/15 text-[#FF7A00] flex items-center justify-center mx-auto">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Zero Seed Oil Policy</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We exclusively use extra virgin olive oil and cold-pressed rice bran oil. Zero palm oil, hydrogenated fats, or cheap artificial colors.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-gray-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">FSSAI Certified Kitchen</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Our kitchen facility in Eshwar Nagar operates under strict hospital-grade cleanliness and food safety protocols.
            </p>
          </div>
        </div>
      </div>

      <ContactSection />
    </div>
  );
};
