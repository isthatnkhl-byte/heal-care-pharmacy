import React, { useState } from 'react';
import { CartItem } from './CartDrawer';
import { X, CheckCircle2, ShieldCheck, MapPin, Phone, User, CreditCard, DollarSign, Clock, Sparkles } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [name, setName] = useState('Nikhil Goswami');
  const [phone, setPhone] = useState('+91 98450 12890');
  const [address, setAddress] = useState('Flat 402, Lotus Palms, 12th Main, Indiranagar');
  const [pincode, setPincode] = useState('560038');
  const [notes, setNotes] = useState('Please leave with building concierge if unattended.');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('nikhil@okhdfcbank');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    total: number;
    etaMinutes: number;
  } | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = rawSubtotal >= 500;
  const deliveryFee = rawSubtotal === 0 ? 0 : isFreeShipping ? 0 : 49;
  const totalAmount = rawSubtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `HC-${Math.floor(100000 + Math.random() * 900000)}`;
      setCompletedOrder({
        orderId: generatedId,
        total: totalAmount,
        etaMinutes: 110,
      });
      onOrderSuccess(generatedId);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2B1B17]/65 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full border border-[#EBE3D8] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EBE3D8] bg-white flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-[#8C5A46] mb-0.5">
              <span>DISPENSARY CHECKOUT</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#2B1B17]">
              {completedOrder ? 'Order Confirmed' : 'Express Delivery Details'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#F4EFEA] text-[#2B1B17] flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {!completedOrder ? (
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-5">
            {/* Delivery Contact Information */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B1B17]">
                1. Recipient &amp; Delivery Address
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#736B63] block mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#736B63]" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-[#EBE3D8] rounded-xl focus:ring-1 focus:ring-[#8C5A46] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-[#736B63] block mb-1">Phone (for Pharmacist Call)</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#736B63]" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-[#EBE3D8] rounded-xl focus:ring-1 focus:ring-[#8C5A46] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#736B63] block mb-1">Apartment, Street &amp; Landmark</label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-[#736B63]" />
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-[#EBE3D8] rounded-xl focus:ring-1 focus:ring-[#8C5A46] focus:outline-none resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#736B63] block mb-1">PIN Code (Bengaluru)</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-[#EBE3D8] rounded-xl font-mono focus:ring-1 focus:ring-[#8C5A46] focus:outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <div className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 p-2 rounded-xl flex items-center gap-1.5 w-full">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>2-Hour Express Zone Active</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#736B63] block mb-1">Special Pharmacy Delivery Instructions</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Leave with security / Call upon arrival"
                  className="w-full text-xs px-3 py-2 bg-white border border-[#EBE3D8] rounded-xl focus:ring-1 focus:ring-[#8C5A46] focus:outline-none"
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3 pt-3 border-t border-[#EBE3D8]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B1B17]">
                2. Payment Method
              </h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border text-center font-semibold transition cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'bg-white border-[#8C5A46] shadow-xs text-[#2B1B17]'
                      : 'bg-white/60 border-[#EBE3D8] text-[#736B63]'
                  }`}
                >
                  <span className="block font-mono text-[10px] text-[#8C5A46]">Instant</span>
                  <span>UPI / QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-center font-semibold transition cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-white border-[#8C5A46] shadow-xs text-[#2B1B17]'
                      : 'bg-white/60 border-[#EBE3D8] text-[#736B63]'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5 mx-auto mb-0.5 text-[#8C5A46]" />
                  <span>Card / NetBanking</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border text-center font-semibold transition cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'bg-white border-[#8C5A46] shadow-xs text-[#2B1B17]'
                      : 'bg-white/60 border-[#EBE3D8] text-[#736B63]'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5 mx-auto mb-0.5 text-[#8C5A46]" />
                  <span>Pay on Delivery</span>
                </button>
              </div>

              {paymentMethod === 'upi' && (
                <div className="bg-white p-3 rounded-xl border border-[#EBE3D8] text-xs">
                  <label className="text-[11px] text-[#736B63] block mb-1">Your UPI ID / VPA</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full text-xs px-3 py-1.5 bg-[#FAF7F2] border border-[#EBE3D8] rounded-lg font-mono"
                  />
                  <p className="text-[10px] text-[#736B63] mt-1">A payment authorization request will be sent to your UPI app.</p>
                </div>
              )}
            </div>

            {/* Total & Submit */}
            <div className="pt-3 border-t border-[#EBE3D8] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#736B63] block">Payable Total ({items.length} items)</span>
                <span className="text-xl font-bold text-[#2B1B17] tabular-nums">₹{totalAmount}</span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#2B1B17] hover:bg-[#1F1310] disabled:opacity-50 text-white px-8 py-3.5 rounded-full text-xs font-semibold shadow-md transition cursor-pointer flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Confirming with Dispensary...</span>
                  </>
                ) : (
                  <span>Place Express Order (₹{totalAmount})</span>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation State */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C5A46] block mb-1">
                Prescription &amp; Formulations Order Locked
              </span>
              <h4 className="font-editorial text-3xl font-medium text-[#2B1B17]">
                Order {completedOrder.orderId} Confirmed
              </h4>
              <p className="text-xs text-[#736B63] mt-2 max-w-sm mx-auto">
                Thank you, {name}. Our Heal Care chief pharmacist has received your order and is currently assembling your batch for express dispatch.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-white p-5 rounded-2xl border border-[#EBE3D8] text-xs text-left space-y-3">
              <div className="flex justify-between border-b border-[#EBE3D8]/70 pb-2">
                <span className="text-[#736B63]">Estimated Arrival Time:</span>
                <span className="font-semibold text-emerald-800">
                  Within {completedOrder.etaMinutes} minutes
                </span>
              </div>
              <div className="flex justify-between border-b border-[#EBE3D8]/70 pb-2">
                <span className="text-[#736B63]">Delivery Destination:</span>
                <span className="text-[#2B1B17] font-medium text-right max-w-xs">{address}</span>
              </div>
              <div className="flex justify-between border-b border-[#EBE3D8]/70 pb-2">
                <span className="text-[#736B63]">Payment Method:</span>
                <span className="uppercase text-[#2B1B17] font-mono text-[11px]">{paymentMethod}</span>
              </div>
              <div className="flex justify-between font-bold text-[#2B1B17] pt-1">
                <span>Total Amount Paid:</span>
                <span className="tabular-nums">₹{completedOrder.total}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-[#2B1B17] hover:bg-[#1F1310] text-white py-3 rounded-full text-xs font-semibold cursor-pointer"
              >
                Return to Dispensary
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
