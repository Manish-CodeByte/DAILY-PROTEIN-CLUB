import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ExternalLink, X, MapPin, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../../utils/constants';

export const FloatingContactWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
      
      {/* Floating Expanded Popover Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-3 w-80 bg-[#111214] rounded-3xl border border-white/10 shadow-2xl p-5 text-[#F5F5F7] space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h4 className="text-xs font-black uppercase text-[#0A84FF] tracking-wider">
                  Daily Protein Club | Manipal
                </h4>
                <p className="text-[10px] text-[#A1A1A6] font-semibold">Fast Campus & Hostel Delivery</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-[#A1A1A6] hover:text-[#F5F5F7] transition-colors"
                aria-label="Close float widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Location & Hours */}
            <div className="space-y-2 text-[11px] text-[#A1A1A6] bg-[#0A0A0C] p-3 rounded-2xl border border-white/10">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0A84FF] shrink-0 mt-0.5" />
                <span className="leading-snug text-[#F5F5F7]">177/11, Vaibhav Business Center, Eshwar Nagar, Manipal</span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-white/10 text-[#A1A1A6]">
                <Clock className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                <span>10:00 AM – 12:00 AM (Midnight) • 7 Days</span>
              </div>
            </div>

            {/* Float Action Buttons Stack */}
            <div className="grid grid-cols-2 gap-2">
              {/* Call Kitchen */}
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="py-2.5 px-3 rounded-xl bg-[#0A84FF] hover:bg-[#0071E3] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition-transform hover:scale-102"
              >
                <Phone className="w-3.5 h-3.5 fill-white" /> Call Kitchen
              </a>

              {/* WhatsApp Order */}
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi%20Daily%20Protein%20Club%20Manipal!%20I%20want%20to%20place%20an%20order.`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition-transform hover:scale-102"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-black" /> WhatsApp
              </a>

              {/* Swiggy */}
              <a
                href={RESTAURANT_INFO.swiggyUrl}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#FC8019] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity"
              >
                Swiggy <ExternalLink className="w-3 h-3" />
              </a>

              {/* Zomato */}
              <a
                href={RESTAURANT_INFO.zomatoUrl}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#CB202D] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity"
              >
                Zomato <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0A84FF] hover:bg-[#0071E3] text-white font-extrabold text-xs shadow-2xl shadow-[#0A84FF]/30 cursor-pointer border border-[#0A84FF]/40"
      >
        <div className="relative">
          <Phone className="w-4 h-4 fill-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#22D3EE] animate-ping" />
        </div>
        <span>Quick Contact</span>
      </motion.button>

    </div>
  );
};
