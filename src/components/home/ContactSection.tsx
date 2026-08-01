import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../../utils/constants';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-[#0B0B0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#39D353] uppercase tracking-widest block mb-2">
            Visit & Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Daily Protein Club | Manipal
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Located in the heart of Eshwar Nagar, Manipal. Call us for instant student orders or monthly meal plans.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Cards Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-5">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#39D353]/15 text-[#39D353] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Kitchen Address</h4>
                  <p className="text-sm font-semibold text-white leading-relaxed">
                    177/11, Herga Village, Vaibhav Business Center, Eshwar Nagar, Manipal, Karnataka 576104
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 border-t border-gray-800/80 pt-5">
                <div className="p-3 rounded-2xl bg-[#FF7A00]/15 text-[#FF7A00] shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Direct Hotline</h4>
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-base font-bold text-white hover:text-[#39D353] transition-colors">
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4 border-t border-gray-800/80 pt-5">
                <div className="p-3 rounded-2xl bg-blue-500/15 text-blue-400 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Kitchen Operating Hours</h4>
                  <p className="text-sm font-semibold text-white">
                    10:00 AM – 12:00 AM (Midnight) • 7 Days a Week
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Action Buttons Grid */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="py-3.5 px-4 rounded-2xl bg-[#39D353] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#39D353]/20 hover:scale-102 transition-transform"
              >
                <Phone className="w-4 h-4 fill-black" /> Call Kitchen
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi%20Daily%20Protein%20Club%20Manipal!%20I%20want%20to%20place%20an%20order.`}
                target="_blank"
                rel="noreferrer"
                className="py-3.5 px-4 rounded-2xl bg-[#25D366] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 hover:scale-102 transition-transform"
              >
                <MessageCircle className="w-4 h-4 fill-black" /> WhatsApp Order
              </a>
              <a
                href={RESTAURANT_INFO.swiggyUrl}
                target="_blank"
                rel="noreferrer"
                className="py-3.5 px-4 rounded-2xl bg-[#FC8019] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg hover:scale-102 transition-transform"
              >
                Swiggy <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={RESTAURANT_INFO.zomatoUrl}
                target="_blank"
                rel="noreferrer"
                className="py-3.5 px-4 rounded-2xl bg-[#CB202D] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg hover:scale-102 transition-transform"
              >
                Zomato <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Map Column (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl bg-gray-900 min-h-[380px] relative">
            <iframe
              title="Daily Protein Club Manipal Location Map"
              src={RESTAURANT_INFO.mapsEmbedUrl}
              className="w-full h-full min-h-[380px] border-0 filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 left-4 p-3 rounded-2xl glass-panel text-xs text-white border border-white/10 hidden sm:block">
              <span className="font-bold block">Daily Protein Club | Manipal</span>
              <span className="text-gray-400 text-[11px]">Vaibhav Business Center, Eshwar Nagar</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
