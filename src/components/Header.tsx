import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, FileText, MessageCircle, Phone, X, ShieldCheck, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../data/apothecaryData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenPrescription: () => void;
  onOpenWhatsApp: () => void;
  onOpenChecker: () => void;
  onOpenTracking: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenPrescription,
  onOpenWhatsApp,
  onOpenChecker,
  onOpenTracking,
  searchQuery,
  onSearchChange,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full max-w-full overflow-x-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
      {/* Top Slim Utility Ribbon - Single-line on mobile, full on desktop */}
      <aside
        aria-label="Announcement"
        className="glass-ribbon text-[#E6DDD3] py-1 sm:py-1.5 px-3 sm:px-4 text-[10px] sm:text-[11px] font-medium tracking-wide transition-all duration-300 relative z-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-1.5 truncate">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">Express 2-hr delivery in Bengaluru • Medicines &amp; Surgical</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] opacity-90 shrink-0">
            <button
              type="button"
              onClick={onOpenTracking}
              className="hover:text-white transition-colors cursor-pointer text-[#E6DDD3]/80 hover:text-white"
            >
              Track Order
            </button>
            <span aria-hidden="true" className="opacity-30">·</span>
            <button
              type="button"
              onClick={onOpenChecker}
              className="hover:text-white transition-colors cursor-pointer text-[#E6DDD3]/80 hover:text-white"
            >
              Drug-Herb Checker
            </button>
            <span aria-hidden="true" className="opacity-30">·</span>
            <a
              href={`tel:${STORE_INFO.phoneRaw}`}
              className="hover:text-white transition-colors flex items-center gap-1.5 text-amber-300 font-semibold"
            >
              <Phone className="w-3 h-3" />
              <span>Call: {STORE_INFO.phone}</span>
            </a>
          </div>

          {/* Compact Phone link on mobile */}
          <div className="sm:hidden flex items-center shrink-0">
            <a
              href={`tel:${STORE_INFO.phoneRaw}`}
              className="text-amber-300 font-bold hover:text-amber-200 transition-colors flex items-center gap-1 text-[10px]"
            >
              <Phone className="w-2.5 h-2.5" />
              <span>Call Store</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Clean Luxury Navbar - Glass Morpho & Transparent */}
      <header
        className={`w-full max-w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? 'glass-morpho-scrolled' : 'glass-morpho'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 h-14 sm:h-18 transition-all duration-300">
          
          {/* Brand Logo: Heal Care */}
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none shrink-0"
          >
            <div className="relative shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#2B1B17]/90 text-[#FAF7F2] flex items-center justify-center font-editorial text-lg sm:text-xl font-bold tracking-tight shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all duration-300 ring-1 ring-white/60 group-hover:ring-[#8C5A46]/60 backdrop-blur-xs">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E7DEC8]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="absolute -inset-1 rounded-full bg-amber-400/20 blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-xl sm:text-2xl tracking-tight text-[#2B1B17] font-semibold leading-none group-hover:text-[#8C5A46] transition-colors duration-200">
                Heal Care
              </span>
              <span className="hidden sm:block text-[9px] uppercase tracking-widest text-[#736B63] font-semibold mt-1">
                Apothecary &amp; Modern Medicine
              </span>
            </div>
          </a>

          {/* Primary Navigation Links for Desktop */}
          <nav className="hidden lg:flex items-center space-x-1 text-xs font-semibold text-[#2B1B17]/90 tracking-wide">
            <a
              href="#featured-products"
              onClick={() => onSelectCategory('all')}
              className="px-3.5 py-1.5 rounded-full hover:bg-white/60 hover:text-[#8C5A46] transition-all duration-200 cursor-pointer backdrop-blur-xs"
            >
              All Formulations
            </a>
            <a
              href="#featured-products"
              onClick={() => onSelectCategory('medicines')}
              className="px-3.5 py-1.5 rounded-full hover:bg-white/60 hover:text-[#8C5A46] transition-all duration-200 cursor-pointer backdrop-blur-xs"
            >
              Medicines
            </a>
            <a
              href="#featured-products"
              onClick={() => onSelectCategory('surgical')}
              className="px-3.5 py-1.5 rounded-full hover:bg-white/60 hover:text-[#8C5A46] transition-all duration-200 cursor-pointer backdrop-blur-xs"
            >
              Surgical Equipment
            </a>
            <a
              href="#featured-products"
              onClick={() => onSelectCategory('cosmetics')}
              className="px-3.5 py-1.5 rounded-full hover:bg-white/60 hover:text-[#8C5A46] transition-all duration-200 cursor-pointer backdrop-blur-xs"
            >
              Cosmetics
            </a>
            <a
              href="#store-locator"
              className="px-3.5 py-1.5 rounded-full hover:bg-white/60 hover:text-[#8C5A46] transition-all duration-200 backdrop-blur-xs"
            >
              Store Sanctuary
            </a>
          </nav>

          {/* Search & Action Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Desktop / Tablet Expanding Search Bar */}
            <div className="hidden sm:flex relative items-center">
              <div
                className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  searchExpanded ? 'w-48 sm:w-60' : 'w-28 sm:w-40'
                } relative`}
              >
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#736B63] transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => setSearchExpanded(true)}
                  onBlur={() => !searchQuery && setSearchExpanded(false)}
                  placeholder="Search catalog..."
                  className="w-full text-xs pl-8 pr-7 py-1.5 rounded-full bg-white/45 hover:bg-white/65 focus:bg-white/85 backdrop-blur-md border border-white/60 focus:border-[#8C5A46]/60 text-[#2B1B17] placeholder:text-[#736B63]/75 focus:outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#736B63] hover:text-[#2B1B17] transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Search Toggle Button */}
            <button
              type="button"
              onClick={() => {
                setMobileSearchOpen(!mobileSearchOpen);
                if (mobileMenuOpen) setMobileMenuOpen(false);
              }}
              className="sm:hidden p-2 text-[#2B1B17] rounded-full bg-white/40 hover:bg-white/80 border border-white/60 transition-all duration-200 backdrop-blur-md shrink-0"
              aria-label="Search catalog"
            >
              <Search className="w-4 h-4 text-[#736B63]" />
            </button>

            {/* Quick Upload Prescription Button */}
            <button
              type="button"
              onClick={onOpenPrescription}
              className="hidden sm:inline-flex items-center gap-1.5 bg-white/50 hover:bg-white/85 backdrop-blur-md text-[#2B1B17] border border-white/70 px-3 py-1.5 sm:px-3.5 rounded-full text-xs font-semibold tracking-wide shadow-xs hover:shadow hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shrink-0"
              title="Upload Prescription"
            >
              <FileText className="w-3.5 h-3.5 text-[#8C5A46]" />
              <span className="hidden md:inline">Upload Rx</span>
            </button>

            {/* WhatsApp Quick Action Button */}
            <button
              type="button"
              onClick={onOpenWhatsApp}
              className="hidden md:inline-flex items-center gap-1.5 bg-[#1E6F43]/90 hover:bg-[#1E6F43] backdrop-blur-md text-white border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-xs hover:shadow hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shrink-0"
              title="Order on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </button>

            {/* Cart Icon with Live Count Badge */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2 text-[#2B1B17] rounded-full bg-white/40 hover:bg-white/80 border border-white/60 transition-all duration-200 cursor-pointer hover:scale-105 backdrop-blur-md shadow-xs shrink-0"
              title="Shopping Bag"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {cartCount > 0 ? (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-4.5 px-1 bg-[#8C5A46] text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-xs animate-pulse">
                  {cartCount}
                </span>
              ) : (
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#8C5A46]" />
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (mobileSearchOpen) setMobileSearchOpen(false);
              }}
              className="lg:hidden p-2 text-[#2B1B17] rounded-full bg-white/40 hover:bg-white/80 border border-white/60 transition-all duration-200 backdrop-blur-md shrink-0"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {mobileSearchOpen && (
          <div className="sm:hidden px-4 py-2.5 bg-white/90 backdrop-blur-xl border-t border-white/60 shadow-md">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#736B63]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search medicines, equipment, cosmetics..."
                className="w-full text-xs pl-9 pr-8 py-2 rounded-full bg-white/80 border border-black/10 text-[#2B1B17] placeholder:text-[#736B63] focus:outline-none focus:ring-1 focus:ring-[#8C5A46]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#736B63]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Dropdown Drawer - Frosted Glass */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/85 backdrop-blur-2xl border-t border-white/50 px-4 pt-3 pb-5 space-y-3 shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-3 gap-2 pb-3 border-b border-white/40">
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('medicines');
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 bg-white/60 backdrop-blur-md rounded-xl text-xs font-semibold text-[#2B1B17] text-center border border-white/60 hover:bg-white/90 transition-colors"
              >
                Medicines
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('surgical');
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 bg-white/60 backdrop-blur-md rounded-xl text-xs font-semibold text-[#2B1B17] text-center border border-white/60 hover:bg-white/90 transition-colors"
              >
                Surgical
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('cosmetics');
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 bg-white/60 backdrop-blur-md rounded-xl text-xs font-semibold text-[#2B1B17] text-center border border-white/60 hover:bg-white/90 transition-colors"
              >
                Cosmetics
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  onOpenPrescription();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#8C5A46] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Upload Prescription Slip</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenWhatsApp();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#1E6F43] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Chat on WhatsApp</span>
              </button>
              <a
                href={`tel:${STORE_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-white/70 backdrop-blur-md border border-white/60 text-[#2B1B17] rounded-xl text-xs font-semibold hover:bg-white/90 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#8C5A46]" />
                <span>Call Store: {STORE_INFO.phone}</span>
              </a>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onOpenTracking();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 text-center text-xs font-medium text-[#736B63] bg-white/40 rounded-lg hover:bg-white/60"
                >
                  Track Order
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onOpenChecker();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 text-center text-xs font-medium text-[#736B63] bg-white/40 rounded-lg hover:bg-white/60"
                >
                  Drug Checker
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
