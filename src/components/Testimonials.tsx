import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/apothecaryData';

// Expand with additional rich verified reviews for a continuous, diverse stream
const EXTENDED_TESTIMONIALS = [
  ...TESTIMONIALS,
  {
    id: 'test-4',
    name: 'Dr. Sameer Kulkarni',
    role: 'Orthopedic Surgeon',
    location: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    quote: 'The hospital-grade sterilization and batch authenticity on their surgical consumables are unmatched. They are our clinic’s primary partner for surgical dressings.',
    verified: true,
  },
  {
    id: 'test-5',
    name: 'Kavita Menon',
    role: 'Apothecary Member',
    location: 'Chennai',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    quote: 'Their Derma Radiant face serum and cold-pressed aloe formulations transformed my sensitive skin. The botanical fragrance and glass jar packaging feel like a daily sanctuary ritual.',
    verified: true,
  },
  {
    id: 'test-6',
    name: 'Vikramaditya Roy',
    role: 'Chronic Care Patient',
    location: 'Delhi NCR',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    quote: 'Ordering elderly care medications used to be stressful until we switched to Heal Care. Fast 2-hour delivery, genuine sealed medicines, and pharmacist calls make all the difference.',
    verified: true,
  },
];

export const Testimonials: React.FC = () => {
  // Duplicate array to ensure a seamless infinite left-to-right loop
  const marqueeItems = [...EXTENDED_TESTIMONIALS, ...EXTENDED_TESTIMONIALS];

  return (
    <section className="py-24 bg-[#FAF7F2] border-t border-[#EBE3D8]/80 w-full max-w-full overflow-hidden relative">
      
      {/* Warm Ambient Aura in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-amber-200/20 via-orange-100/20 to-emerald-100/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-14 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EBE3D8] text-xs font-bold uppercase tracking-wider text-[#8C5A46] shadow-xs mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8C5A46]" />
          <span>Verified Patient &amp; Doctor Reviews</span>
        </div>
        
        <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2B1B17] tracking-tight leading-tight">
          Trusted by <span className="italic font-normal text-[#8C5A46]">Thousands</span> of Families
        </h2>

        <p className="text-base sm:text-lg text-[#5C5248] max-w-2xl mx-auto mt-4 font-normal leading-relaxed">
          See why modern urban households, physicians, and dermatologists across India trust Heal Care for their clinical formulations and prompt doorstep care.
        </p>
      </div>

      {/* Infinite Left-to-Right Continuous Movement Marquee */}
      <div className="relative w-full overflow-hidden py-4">
        
        {/* Left & Right Soft Fade Gradient Masks for Seamless Edge Blending */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent z-20" />

        {/* Marquee Track: Smooth Continuous Left-to-Right Animation */}
        <div className="animate-marquee-ltr flex items-stretch gap-6 px-4">
          {marqueeItems.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              className="group relative bg-white/95 backdrop-blur-sm p-7 sm:p-8 rounded-3xl border border-[#EBE3D8] shadow-[0_4px_20px_rgba(43,27,23,0.04)] hover:shadow-[0_12px_36px_rgba(43,27,23,0.09)] hover:border-[#8C5A46]/50 transition-all duration-300 w-[350px] sm:w-[420px] shrink-0 flex flex-col justify-between cursor-default hover:-translate-y-1"
            >
              {/* Decorative Subtle Quote Watermark */}
              <Quote className="absolute top-6 right-6 w-9 h-9 text-[#8C5A46]/10 group-hover:text-[#8C5A46]/20 transition-colors pointer-events-none" />

              <div>
                {/* 5-Star Rating Strip */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="ml-2 text-xs font-bold text-[#2B1B17]">5.0</span>
                </div>

                {/* Bold, Elegant Editorial Quote */}
                <blockquote className="text-[#2B1B17] font-editorial text-lg sm:text-xl font-semibold leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </div>

              {/* Author Strip */}
              <div className="flex items-center justify-between pt-5 border-t border-[#EBE3D8]/80">
                <div className="flex items-center gap-3.5">
                  <img
                    src={testimonial.avatar}
                    alt={`${testimonial.name} avatar`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-[#EBE3D8]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#2B1B17] tracking-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-[#736B63] font-medium">
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Verified Badge */}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Trust Stat Strip */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-16 text-center text-xs text-[#736B63] font-semibold tracking-wider uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>4.9 / 5 Overall Patient Satisfaction</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8C5A46]" />
          <span>50,000+ Completed Orders</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>100% Licensed Pharmacist Supervised</span>
        </div>
      </div>
    </section>
  );
};
