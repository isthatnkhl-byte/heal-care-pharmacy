import React from 'react';
import { Zap, CheckCircle2, UserCheck, Lock } from 'lucide-react';

export const ValuePillars: React.FC = () => {
  const pillars = [
    {
      icon: Zap,
      title: 'Express 2-Hour Delivery',
      description: 'Rapid doorstep dispatch with temperature-controlled transit & live GPS courier tracking.',
      iconColor: 'text-[#D97706]',
      bgColor: 'bg-amber-50/80 border-amber-200/60',
      badge: 'Lightning Swift',
    },
    {
      icon: CheckCircle2,
      title: '100% Genuine & Batch-Tested',
      description: 'Direct pharmaceutical manufacturer procurement with verified QR authenticity seal.',
      iconColor: 'text-[#264E36]',
      bgColor: 'bg-emerald-50/80 border-emerald-200/60',
      badge: 'Certified Pure',
    },
    {
      icon: UserCheck,
      title: 'Licensed Pharmacist Supervision',
      description: 'Every prescription is clinically cross-checked against drug-herb contraindications.',
      iconColor: 'text-[#8C5A46]',
      bgColor: 'bg-[#F4EFEA] border-[#EBE3D8]',
      badge: 'Expert Verified',
    },
    {
      icon: Lock,
      title: 'Sterile & Discreet Packaging',
      description: 'Tamper-evident medical seals and privacy-shield wrapping honoring patient confidentiality.',
      iconColor: 'text-[#2B1B17]',
      bgColor: 'bg-[#FAF7F2] border-[#EBE3D8]',
      badge: 'Sealed & Sterile',
    },
  ];

  return (
    <section className="py-16 bg-[#FAF7F2]/80 border-b border-[#EBE3D8]/80 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white/95 backdrop-blur-sm p-6 sm:p-7 rounded-3xl border border-[#EBE3D8] shadow-[0_4px_20px_rgba(43,27,23,0.03)] hover:shadow-[0_12px_32px_rgba(43,27,23,0.08)] hover:border-[#8C5A46]/40 transition-all duration-300 hover:-translate-y-1.5 cursor-default flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-13 h-13 rounded-2xl ${pillar.bgColor} border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-xs`}>
                      <Icon className={`w-6 h-6 ${pillar.iconColor}`} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#8C5A46] border border-[#EBE3D8]/80">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#2B1B17] mb-2 tracking-tight group-hover:text-[#8C5A46] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5C5248] leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
