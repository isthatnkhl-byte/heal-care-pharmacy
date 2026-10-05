import React, { useState } from 'react';
import { X, MessageCircle, Send, ShieldCheck, Check, Phone } from 'lucide-react';
import { CartItem } from './CartDrawer';
import { STORE_INFO } from '../data/apothecaryData';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems?: CartItem[];
  prefilledNote?: string;
}

export const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({
  isOpen,
  onClose,
  cartItems = [],
  prefilledNote = '',
}) => {
  const defaultMessage = cartItems.length > 0
    ? `Hello Heal Care, I would like to place an order for the following items:\n\n${cartItems
        .map((item, idx) => `${idx + 1}. ${item.name} (${item.subtitle}) x ${item.quantity} - ₹${item.price * item.quantity}`)
        .join('\n')}\n\nTotal: ₹${cartItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)}\n\nPlease advise payment details and delivery schedule.`
    : prefilledNote || `Hello Heal Care, I would like to order medicines / surgical supplies / cosmetics. Please assist me with verification and delivery.`;

  const [message, setMessage] = useState<string>(defaultMessage);
  const [patientName, setPatientName] = useState<string>('');
  const [area, setArea] = useState<string>('');

  if (!isOpen) return null;

  const handleLaunchWhatsApp = () => {
    const headerDetails = patientName || area ? `Name: ${patientName || 'Customer'}\nLocation: ${area || 'Delivery Address'}\n\n` : '';
    const fullText = encodeURIComponent(`${headerDetails}${message}`);
    const whatsappUrl = `https://wa.me/${STORE_INFO.whatsappRaw}?text=${fullText}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2B1B17]/65 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full border border-[#EBE3D8] shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#2B1B17] flex items-center justify-center shadow-xs transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#1E6F43] text-white flex items-center justify-center shadow-sm">
            <MessageCircle className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#2B1B17] leading-tight">
              Order on WhatsApp
            </h3>
            <p className="text-xs text-[#736B63] flex items-center gap-1.5 mt-0.5">
              <span>Direct to Heal Care:</span>
              <strong className="text-[#1E6F43] font-semibold">{STORE_INFO.whatsappNumber}</strong>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2B1B17] mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EBE3D8] bg-white text-[#2B1B17] focus:outline-none focus:ring-1 focus:ring-[#8C5A46]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2B1B17] mb-1">
                Delivery Area / Pincode
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. Sector 14 / Pin 122001"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EBE3D8] bg-white text-[#2B1B17] focus:outline-none focus:ring-1 focus:ring-[#8C5A46]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2B1B17] mb-1">
              Order Details &amp; Notes
            </label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full text-xs p-3.5 rounded-xl border border-[#EBE3D8] bg-white text-[#2B1B17] focus:outline-none focus:ring-1 focus:ring-[#8C5A46] font-sans resize-none leading-relaxed"
            />
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#EBE3D8] text-[11px] text-[#736B63] space-y-1">
            <div className="flex items-center gap-1.5 text-[#1E6F43] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Licensed Pharmacist Verification</span>
            </div>
            <p>
              Send your prescription photo or requirement list directly. Our pharmacist will confirm stock and dispatch.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleLaunchWhatsApp}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1E6F43] hover:bg-[#165634] text-white py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Open WhatsApp Chat</span>
            </button>
            <a
              href={`tel:${STORE_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F4EFEA] text-[#2B1B17] border border-[#EBE3D8] px-5 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#8C5A46]" />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
