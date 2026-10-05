import React, { useState } from 'react';
import { MapPin, Clock, Phone, ExternalLink, MessageCircle, ArrowRight, Mail } from 'lucide-react';
import { GoldenMagicalTypography } from './GoldenMagicalTypography';
import { STORE_INFO } from '../data/apothecaryData';

interface StoreSanctuaryProps {
  onOpenConsultationModal: () => void;
}

export const StoreSanctuary: React.FC<StoreSanctuaryProps> = ({ onOpenConsultationModal }) => {
  const [headlineProgress, setHeadlineProgress] = useState<number>(0);

  // Lower section only loads when the headline type-in finishes (progress >= 0.85 to 1.0)
  const lowerLoadProgress = Math.min(1, Math.max(0, (headlineProgress - 0.85) / 0.15));

  return (
    <section className="py-20 lg:py-24 bg-white" id="store-locator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Sanctuary Information */}
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8C5A46]/10 text-xs font-bold uppercase tracking-wider text-[#8C5A46] mb-3">
              <span>Flagship Physical Dispensary</span>
            </span>
            <div className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2B1B17] tracking-tight mb-4">
              <GoldenMagicalTypography
                as="h2"
                segments={[
                  { text: 'Step Into ', colorClass: 'text-[#2B1B17] font-bold' },
                  { text: 'Heal Care Sanctuary.', isItalic: true, colorClass: 'text-[#8C5A46] font-bold' },
                ]}
                onProgressChange={(p) => setHeadlineProgress(p)}
              />
            </div>

            {/* Lower Information: Loads in cleanly when the typography completes */}
            <div
              className="transition-all duration-300 ease-out"
              style={{
                opacity: lowerLoadProgress,
                transform: `translateY(${(1 - lowerLoadProgress) * 16}px)`,
                pointerEvents: lowerLoadProgress > 0.3 ? 'auto' : 'none',
              }}
            >
              <p className="text-base sm:text-lg text-[#5C5248] mb-8 leading-relaxed font-normal">
                Welcome to Heal Care. We stock genuine prescription medicines, comprehensive clinical surgical equipment, and specialized derma cosmetics with dedicated pharmacist guidance.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F4EFEA] border border-[#EBE3D8] flex items-center justify-center shrink-0 text-[#2B1B17] mt-0.5">
                    <MapPin className="w-5 h-5 text-[#8C5A46]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B1B17]">
                      Heal Care Store Location
                    </h4>
                    <p className="text-xs text-[#736B63] mt-0.5 leading-relaxed">
                      Visit us in-store or navigate directly via Google Maps. Curbside pickup and delivery available.
                    </p>
                    <a
                      href={STORE_INFO.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C5A46] hover:text-[#2B1B17] mt-1 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Google Maps Pin ({STORE_INFO.mapUrl})</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F4EFEA] border border-[#EBE3D8] flex items-center justify-center shrink-0 text-[#2B1B17] mt-0.5">
                    <Clock className="w-5 h-5 text-[#8C5A46]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B1B17]">
                      Dispensary Hours
                    </h4>
                    <p className="text-xs text-[#736B63] mt-0.5">
                      Monday – Sunday: 8:00 AM – 11:00 PM (Emergency Desk 24/7)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F4EFEA] border border-[#EBE3D8] flex items-center justify-center shrink-0 text-[#2B1B17] mt-0.5">
                    <Phone className="w-5 h-5 text-[#8C5A46]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B1B17]">
                      Phone &amp; WhatsApp Support
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#736B63] mt-1">
                      <a href={`tel:${STORE_INFO.phoneRaw}`} className="font-semibold text-[#2B1B17] hover:text-[#8C5A46] transition">
                        Call: {STORE_INFO.phone}
                      </a>
                      <span>•</span>
                      <a
                        href={`https://wa.me/${STORE_INFO.whatsappRaw}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#1E6F43] hover:underline"
                      >
                        WhatsApp: {STORE_INFO.whatsappNumber}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F4EFEA] border border-[#EBE3D8] flex items-center justify-center shrink-0 text-[#2B1B17] mt-0.5">
                    <Mail className="w-5 h-5 text-[#8C5A46]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B1B17]">
                      Official Email
                    </h4>
                    <a href={`mailto:${STORE_INFO.email}`} className="text-xs text-[#736B63] hover:text-[#2B1B17] transition-colors mt-0.5 block">
                      {STORE_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={STORE_INFO.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#2B1B17] hover:bg-[#1F1310] text-white px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition shadow-md"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Navigate with Google Maps</span>
                </a>
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1E6F43] hover:bg-[#165634] text-white px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Store Visual / Interactive Card: Loads in cleanly when typography completes */}
          <div
            className="lg:col-span-6 transition-all duration-300 ease-out"
            style={{
              opacity: lowerLoadProgress,
              transform: `translateY(${(1 - lowerLoadProgress) * 16}px)`,
              pointerEvents: lowerLoadProgress > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#EBE3D8] bg-[#F4EFEA] p-2">
              <div className="relative h-96 w-full rounded-2xl overflow-hidden group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeDs3CVcQRFEjCYU7G7Wtk-vOseGN-Gwn8-26Vo9DXwAljIda-YKjJHWWIxYPZQMguTsmPoRxQ-VJNceXxrHdMcnXvD6JRPVt-O_BFmGUchNq4rYhN9Kaa9rvESASW_EsEGM2Yf9PzIewKg36WEka1WJY8kN0D4dPQCvK9E5V9Gc5ExaykdgV3c1MpuZhvrZmf1MNUO2Bu3sogVe1br5ZwGLSCSJWic4iSHPiXeWZaFa2zHZdaipo5"
                  alt="Heal Care physical pharmacy storefront"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/75 via-[#2B1B17]/20 to-transparent pointer-events-none"></div>

                {/* Floating Location Pin Card */}
                <div className="absolute bottom-5 left-5 right-5 glass-pill p-4 rounded-2xl border border-white/70 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2B1B17]">
                      Heal Care Pharmacy Open
                    </span>
                    <p className="text-[11px] text-[#736B63] mt-0.5">
                      Medicines • Surgical Supplies • Cosmetics
                    </p>
                  </div>
                  <a
                    href={STORE_INFO.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#2B1B17] text-white flex items-center justify-center shrink-0 hover:bg-[#8C5A46] transition shadow-md"
                    title="Open Google Maps"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
