import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Toast: React.FC = () => {
  const { toast } = useCart();

  return (
    <AnimatePresence>
      {toast?.show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-white/10 shadow-2xl bg-[#111214] text-[#F5F5F7] max-w-sm"
        >
          {toast.type === 'info' ? (
            <Info className="w-5 h-5 text-[#22D3EE] shrink-0" />
          ) : toast.type === 'warning' ? (
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-[#0A84FF] shrink-0" />
          )}
          <p className="text-sm font-medium text-[#F5F5F7] leading-snug">{toast.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
