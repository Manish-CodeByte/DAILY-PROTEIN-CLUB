import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, MapPin, Phone, User, CreditCard, QrCode, Bike, Sparkles, Dumbbell } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { RESTAURANT_INFO } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

interface CheckoutModalProps {
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const { cartItems, finalTotal, totalProtein, clearCart, triggerConfetti, setIsCartOpen } = useCart();
  const [step, setStep] = useState<'details' | 'success'>('details');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [locationZone, setLocationZone] = useState(RESTAURANT_INFO.deliveryZones[0]);
  const [roomDetails, setRoomDetails] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi'>('upi');
  const [orderId, setOrderId] = useState('');

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !roomDetails) return;

    const generatedId = 'DPC-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setStep('success');
    triggerConfetti();
    clearCart();
  };

  const handleFinish = () => {
    onClose();
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative w-full max-w-lg bg-[#111214] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 overflow-hidden my-auto text-[#F5F5F7]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#0A0A0C] text-[#A1A1A6] hover:text-[#F5F5F7] border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-xl bg-[#0A84FF]/15 text-[#0A84FF]">
                <Bike className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Manipal Express Delivery</h2>
            </div>
            <p className="text-xs text-[#A1A1A6] mb-6">
              Delivering high-protein fuel to hostels & apartments across Manipal.
            </p>

            {/* Order Summary Pill */}
            <div className="bg-[#0A0A0C] p-4 rounded-2xl border border-white/10 mb-6 flex justify-between items-center">
              <div>
                <span className="text-xs text-[#A1A1A6] block">Total Items ({cartItems.length})</span>
                <span className="text-sm font-bold text-[#F5F5F7] flex items-center gap-1.5 mt-0.5">
                  <Dumbbell className="w-4 h-4 text-[#0A84FF]" /> {totalProtein}g Protein Pack
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#A1A1A6] block">Amount Payable</span>
                <span className="text-lg font-bold text-[#0A84FF]">{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-xs font-semibold text-[#A1A1A6] block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full apple-input px-3.5 py-2.5 rounded-xl text-xs pl-10"
                  />
                  <User className="w-4 h-4 text-[#A1A1A6] absolute left-3.5 top-3" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs font-semibold text-[#A1A1A6] block mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full apple-input px-3.5 py-2.5 rounded-xl text-xs pl-10"
                  />
                  <Phone className="w-4 h-4 text-[#A1A1A6] absolute left-3.5 top-3" />
                </div>
              </div>

              {/* Delivery Zone Select */}
              <div>
                <label className="text-xs font-semibold text-[#A1A1A6] block mb-1">
                  Delivery Zone in Manipal *
                </label>
                <div className="relative">
                  <select
                    value={locationZone}
                    onChange={(e) => setLocationZone(e.target.value)}
                    className="w-full apple-input px-3.5 py-2.5 rounded-xl text-xs pl-10 appearance-none bg-[#0A0A0C] text-[#F5F5F7]"
                  >
                    {RESTAURANT_INFO.deliveryZones.map((zone) => (
                      <option key={zone} value={zone} className="bg-[#0A0A0C] text-[#F5F5F7]">
                        {zone}
                      </option>
                    ))}
                  </select>
                  <MapPin className="w-4 h-4 text-[#A1A1A6] absolute left-3.5 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Hostel Block / Room Details */}
              <div>
                <label className="text-xs font-semibold text-[#A1A1A6] block mb-1">
                  Hostel Block / Room / Apartment Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Block 16, Room 304, MIT Hostels"
                  value={roomDetails}
                  onChange={(e) => setRoomDetails(e.target.value)}
                  className="w-full apple-input px-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>

              {/* Payment Method Option */}
              <div>
                <label className="text-xs font-semibold text-[#A1A1A6] block mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-[#0A84FF]/15 border-[#0A84FF] text-[#0A84FF]'
                        : 'bg-[#0A0A0C] border-white/10 text-[#A1A1A6] hover:border-white/20'
                    }`}
                  >
                    <QrCode className="w-4 h-4" /> Instant UPI / GPay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-[#0A84FF]/15 border-[#0A84FF] text-[#0A84FF]'
                        : 'bg-[#0A0A0C] border-white/10 text-[#A1A1A6] hover:border-white/20'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" /> Cash on Delivery
                  </button>
                </div>
              </div>

              {paymentMethod === 'upi' && (
                <div className="p-3 rounded-xl bg-[#0A0A0C] border border-white/10 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white p-1 shrink-0 flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-black" />
                  </div>
                  <div className="text-[11px] text-[#A1A1A6]">
                    <p className="font-semibold text-[#F5F5F7]">Scan QR code on delivery</p>
                    <p>UPI ID: <span className="text-[#0A84FF] font-mono">dailyprotein@upi</span></p>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#0A84FF] hover:bg-[#0071E3] text-white font-bold text-sm shadow-lg shadow-[#0A84FF]/25 transition-all mt-4 cursor-pointer"
              >
                Confirm Order • {formatCurrency(finalTotal)}
              </button>
            </form>
          </div>
        ) : (
          /* Order Confirmation Step */
          <div className="text-center py-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-20 h-20 rounded-full bg-[#0A84FF]/20 border border-[#0A84FF] text-[#0A84FF] flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>

            <h3 className="text-2xl font-bold text-[#F5F5F7] mb-1">Order Placed Successfully! 🎉</h3>
            <p className="text-xs text-[#A1A1A6] mb-6">
              Thank you, <span className="text-[#F5F5F7] font-semibold">{name}</span>! Your high-protein meal is being prepared fresh in our Manipal kitchen.
            </p>

            {/* Order Details Card */}
            <div className="bg-[#0A0A0C] p-5 rounded-2xl border border-white/10 text-left space-y-2 mb-6 text-xs text-[#A1A1A6]">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[#A1A1A6]">Order ID:</span>
                <span className="font-mono text-[#0A84FF] font-bold">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A1A1A6]">Delivery Address:</span>
                <span className="text-[#F5F5F7] font-medium text-right">{roomDetails}, {locationZone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A1A1A6]">Estimated Delivery Time:</span>
                <span className="text-[#22D3EE] font-bold">25 - 35 Minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A1A1A6]">Total Paid:</span>
                <span className="text-[#F5F5F7] font-bold">{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi%20Daily%20Protein%20Club,%20I%20just%20placed%20Order%20${orderId}%20for%20${locationZone}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg"
              >
                <Sparkles className="w-4 h-4" /> Track on WhatsApp
              </a>
              <button
                onClick={handleFinish}
                className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-[#F5F5F7] font-bold text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
