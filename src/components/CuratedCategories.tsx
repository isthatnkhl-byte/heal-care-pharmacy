import React, { useState } from 'react';
import { GoldenMagicalTypography } from './GoldenMagicalTypography';
import { ArrowRight, Pill, Stethoscope, Sparkles } from 'lucide-react';

interface CuratedCategoriesProps {
  onSelectCategory: (category: string) => void;
  onOpenPrescription: () => void;
}

const DepartmentImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#F4EFEA] rounded-2xl">
      {!isLoaded && <div className="absolute inset-0 skeleton-shimmer z-0" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
          isLoaded
            ? 'opacity-100 scale-100 filter-none animate-image-spawn'
            : 'opacity-0 scale-105 blur-xs'
        }`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export const CuratedCategories: React.FC<CuratedCategoriesProps> = ({
  onSelectCategory,
  onOpenPrescription,
}) => {
  const [headlineProgress, setHeadlineProgress] = useState<number>(0);

  // Lower section cards ONLY reveal when the headline type-in finishes (progress >= 0.85 to 1.0)
  const lowerLoadProgress = Math.min(1, Math.max(0, (headlineProgress - 0.85) / 0.15));

  return (
    <section className="py-20 lg:py-24 bg-[#FAF7F2]" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8C5A46]/10 text-xs font-bold uppercase tracking-wider text-[#8C5A46] mb-3">
            <span>Essential Curations</span>
          </span>
          <div className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2B1B17] tracking-tight">
            <GoldenMagicalTypography
              as="h2"
              segments={[
                { text: 'Curated for Your Care', colorClass: 'text-[#2B1B17] font-bold' },
              ]}
              onProgressChange={(p) => setHeadlineProgress(p)}
            />
          </div>
          <div className="w-12 h-1 bg-[#8C5A46] mx-auto mt-4 mb-4 rounded-full"></div>
          <p className="text-base sm:text-lg text-[#5C5248] font-normal leading-relaxed">
            Heal Care provides genuine prescription medicines, certified clinical surgical equipment, and advanced therapeutic cosmetics.
          </p>
        </div>

        {/* 3 Core Sold Sections: Medicines, Surgical Equipment, Cosmetics */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 transition-all duration-300 ease-out"
          style={{
            opacity: lowerLoadProgress,
            transform: `translateY(${(1 - lowerLoadProgress) * 20}px)`,
            pointerEvents: lowerLoadProgress > 0.3 ? 'auto' : 'none',
          }}
        >
          {/* Department 1: Medicines */}
          <button
            onClick={() => {
              onSelectCategory('medicines');
              document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex flex-col bg-white rounded-3xl p-5 border border-[#EBE3D8]/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left cursor-pointer relative overflow-hidden"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#F4EFEA] relative mb-5">
              <DepartmentImage
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBmpv9sscldtNpyImaLoXhIP7MqR4_alPyhVyLPLIXi6QuMyBy9B7Dbn5Vu-8VNQlhlfgDdQ5x_KGnVo59yvMnYmk21Ff4OuQ7rY-7xdXNO66JEV7r6tbHcHUmblabaWvASrbxsVU5P1eXZ9tCawPAe7SqiY6nwrflr7H4jCTBOmE5fZavcGt2UnVxBlHYNyUXmdVNnUHxN6HGaXcrOvJYOtTj_JOZcD3y7Tnoyl7CnOoCm59SNAo7"
                alt="Medicines and pharmaceutical bottles neatly organized"
              />
              <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-widest bg-[#2B1B17]/85 backdrop-blur-sm text-[#FAF7F2] px-3 py-1 rounded-full flex items-center gap-1.5 z-10 shadow-xs">
                <Pill className="w-3 h-3 text-[#D97706]" />
                <span>Pharmacy</span>
              </span>
            </div>
            <div className="px-1">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#2B1B17] group-hover:text-[#8C5A46] transition-colors">
                  Medicines
                </h3>
                <ArrowRight className="w-4 h-4 text-[#8C5A46] group-hover:translate-x-1.5 transition-transform" />
              </div>
              <p className="text-xs sm:text-sm text-[#5C5248] mt-2.5 leading-relaxed font-normal">
                Authentic branded &amp; generic prescription drugs, chronic therapy medications, fever relief, and wellness formulations.
              </p>
              <div className="mt-4 pt-3 border-t border-[#EBE3D8]/80 flex items-center justify-between text-[11px] text-[#8C5A46] font-bold">
                <span>Doctor Prescriptions Verified</span>
                <span>Express 2h</span>
              </div>
            </div>
          </button>

          {/* Department 2: Surgical Equipment */}
          <button
            onClick={() => {
              onSelectCategory('surgical');
              document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex flex-col bg-white rounded-3xl p-5 border border-[#EBE3D8]/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left cursor-pointer relative overflow-hidden"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#F4EFEA] relative mb-5">
              <DepartmentImage
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd9RcvzAUUfPpcQy9X7EpP3ZcYLNNpnEIo4rffnRxWha61TnGD_fhSS0887efUC1vOsBoXBw8vRt_HTrBw-G0c04zzkSkMJ6TxEqEbnbAA3owo2LWy9v2HVXPZSnPq77Vb462_HJa97q9d9K3xp9sRgJM9iF_6BzrUWQNRl5k_iwF7N0ktXfm2LLq2I4L9ZELSDPqOyrMMeyXJhVfOEXCnWX5odYKqb2PGr9LKb5jhVv_Wgk8J7Wno"
                alt="Medical blood pressure monitor and surgical diagnostic equipment"
              />
              <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-widest bg-[#1E6F43]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1.5 z-10 shadow-xs">
                <Stethoscope className="w-3 h-3 text-emerald-200" />
                <span>Clinical</span>
              </span>
            </div>
            <div className="px-1">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#2B1B17] group-hover:text-[#8C5A46] transition-colors">
                  Surgical Equipment
                </h3>
                <ArrowRight className="w-4 h-4 text-[#8C5A46] group-hover:translate-x-1.5 transition-transform" />
              </div>
              <p className="text-xs sm:text-sm text-[#5C5248] mt-2.5 leading-relaxed font-normal">
                Hospital-grade blood pressure monitors, pulse oximeters, compressor nebulizers, sterile dressings, and mobility aids.
              </p>
              <div className="mt-4 pt-3 border-t border-[#EBE3D8]/80 flex items-center justify-between text-[11px] text-[#1E6F43] font-bold">
                <span>ISO &amp; CDSCO Certified</span>
                <span>Hospital Grade</span>
              </div>
            </div>
          </button>

          {/* Department 3: Cosmetics */}
          <button
            onClick={() => {
              onSelectCategory('cosmetics');
              document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex flex-col bg-white rounded-3xl p-5 border border-[#EBE3D8]/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left cursor-pointer relative overflow-hidden"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#F4EFEA] relative mb-5">
              <DepartmentImage
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC93wWEvQ-0DwfVmMhCv1dh7ahc__pxLEzHDkHKNTIIcpOd7XYrU4tj-8T6dAJwYOkKdOZMymcz9-vEBcJcZ6mP1SpL4Ikx0k4Kg90hI8ktbwcXGYUr_yWUnRjuiL-rRIvSDPMY0w2P7xHU-T4TcHneiDPOy92awmNIcHuukGq9NBV7mZJaIixmEy8PPq9k-JW5DonGwkOlbUPyg6Jq6mW058aOwa6yy7XG1NfvXvu7m9boXijxHLvv"
                alt="Therapeutic derma cosmetic serums and barrier repair creams"
              />
              <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-widest bg-[#8C5A46]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1.5 z-10 shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-200" />
                <span>Derma Care</span>
              </span>
            </div>
            <div className="px-1">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#2B1B17] group-hover:text-[#8C5A46] transition-colors">
                  Cosmetics
                </h3>
                <ArrowRight className="w-4 h-4 text-[#8C5A46] group-hover:translate-x-1.5 transition-transform" />
              </div>
              <p className="text-xs sm:text-sm text-[#5C5248] mt-2.5 leading-relaxed font-normal">
                Ceramide lipid barrier creams, organic aloe soothers, Kumkumadi glow oils, and broad-spectrum mineral sunscreens.
              </p>
              <div className="mt-4 pt-3 border-t border-[#EBE3D8]/80 flex items-center justify-between text-[11px] text-[#8C5A46] font-bold">
                <span>Dermatologist Approved</span>
                <span>Clean &amp; Tested</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
