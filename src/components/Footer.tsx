import React, { useState } from 'react';
import { CheckCircle2, Copy, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { STORE_INFO } from '../data/apothecaryData';

interface FooterProps {
  onOpenPrescription: () => void;
  onOpenTracking: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrescription,
  onOpenTracking,
  onSelectCategory,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  const copyCoupon = () => {
    navigator.clipboard.writeText('HEAL10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-[#2B1B17] text-[#E8DFD5] pt-16 pb-12 border-t border-[#2B1B17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand & Ethos */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-white/10 text-[#FAF7F2] flex items-center justify-center font-editorial text-xl font-bold">
                <svg className="w-5 h-5 text-[#E7DEC8]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-editorial text-2xl text-white font-medium">{STORE_INFO.name}</span>
            </div>
            <p className="text-xs text-[#BFB3A6] leading-relaxed max-w-sm mb-6">
              Your trusted partner for certified prescription medicines, hospital-grade surgical equipment, and premium therapeutic derma cosmetics. Swift 2-hour doorstep fulfillment and licensed pharmacist support.
            </p>

            {/* Direct Contact Buttons (ONLY WhatsApp and Mobile Call - No Instagram, Facebook, LinkedIn) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={`https://wa.me/${STORE_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#1E6F43] hover:bg-[#165634] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xs transition"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp: {STORE_INFO.whatsappNumber}</span>
              </a>
              <a
                href={`tel:${STORE_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-full text-xs font-semibold transition"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Call: {STORE_INFO.phone}</span>
              </a>
            </div>

            {/* Direct Email Address */}
            <div className="mt-4 flex items-center gap-2 text-xs text-[#BFB3A6]">
              <Mail className="w-3.5 h-3.5 text-[#E7DEC8]" />
              <a href={`mailto:${STORE_INFO.email}`} className="hover:text-white transition-colors underline decoration-white/30">
                {STORE_INFO.email}
              </a>
            </div>
          </div>

          {/* Links: Sold Departments */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Departments</h4>
            <ul className="space-y-2.5 text-xs text-[#BFB3A6]">
              <li>
                <button
                  onClick={() => onSelectCategory('medicines')}
                  className="hover:text-white transition-colors cursor-pointer text-left font-medium"
                >
                  Medicines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('surgical')}
                  className="hover:text-white transition-colors cursor-pointer text-left font-medium"
                >
                  Surgical Equipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('cosmetics')}
                  className="hover:text-white transition-colors cursor-pointer text-left font-medium"
                >
                  Cosmetics
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrescription}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Prescription Upload
                </button>
              </li>
              <li>
                <a
                  href={STORE_INFO.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3 text-[#D97706]" />
                  <span>Google Maps Location</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Links: Patient Care */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Support &amp; Contact</h4>
            <ul className="space-y-2.5 text-xs text-[#BFB3A6]">
              <li>
                <a
                  href={`tel:${STORE_INFO.phoneRaw}`}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>Call {STORE_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-emerald-300"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp Chat</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${STORE_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  Email: {STORE_INFO.email}
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Track Express Order
                </button>
              </li>
              <li>
                <a
                  href={STORE_INFO.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Open in Google Maps
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
              Stay Connected with Heal Care
            </h4>
            <p className="text-xs text-[#BFB3A6] mb-4">
              Get stock updates for critical medicines, surgical diagnostics, and dermatological offers.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#8C5A46] focus:border-[#8C5A46]"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-[#FAF7F2] text-[#2B1B17] text-xs font-bold px-6 py-2.5 rounded-full transition shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="bg-white/10 p-3 rounded-2xl border border-white/20 text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to Heal Care!</span>
                </div>
                <div className="flex items-center justify-between bg-black/30 p-2 rounded-xl">
                  <span className="font-mono text-emerald-300 font-bold">Code: HEAL10</span>
                  <button
                    onClick={copyCoupon}
                    className="text-[11px] bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded flex items-center gap-1 text-white cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied ? 'Copied!' : 'Copy 10% Off'}</span>
                  </button>
                </div>
              </div>
            )}
            <span className="text-[10px] text-white/40 block mt-2">
              Questions? Call or WhatsApp us directly at {STORE_INFO.phone}.
            </span>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#A89C8F]">
          <p>© 2026 {STORE_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href={STORE_INFO.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Find Us on Google Maps
            </a>
            <span>•</span>
            <a href={`tel:${STORE_INFO.phoneRaw}`} className="hover:text-white transition-colors">
              Call: {STORE_INFO.phone}
            </a>
            <span>•</span>
            <a href={`mailto:${STORE_INFO.email}`} className="hover:text-white transition-colors">
              {STORE_INFO.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-widest uppercase">Verified Care</span>
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono">UPI</span>
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono">CASH</span>
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono">CARDS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
