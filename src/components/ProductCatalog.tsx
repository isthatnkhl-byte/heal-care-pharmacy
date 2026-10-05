import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../data/apothecaryData';
import { ChevronLeft, ChevronRight, Eye, Check } from 'lucide-react';
import { GoldenMagicalTypography } from './GoldenMagicalTypography';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const ProductImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#F4EFEA] rounded-2xl">
      {/* Modern subtle skeleton shimmer while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 skeleton-shimmer z-0" />
      )}
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

interface ProductCardProps {
  product: Product;
  index: number;
  isAdded: boolean;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  isAdded,
  onAddToCart,
  onQuickView,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
          } else if (entry.boundingClientRect.top > window.innerHeight) {
            // Re-arm clip animation when user scrolls above the card so it clips in again on next scroll down
            setIsRevealed(false);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [product.id]);

  const staggerDelay = (index % 4) * 80;

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-3xl p-4 border border-[#EBE3D8]/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
    >
      <div>
        {/* Image Area with Clip-In Per Item On Scroll */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F4EFEA] mb-4">
          {/* Clipping Reveal Container */}
          <div
            className="w-full h-full relative overflow-hidden rounded-2xl"
            style={{
              clipPath: isRevealed
                ? 'inset(0% 0% 0% 0% round 16px)'
                : 'inset(0% 0% 100% 0% round 16px)',
              transform: isRevealed ? 'scale(1) translateY(0)' : 'scale(1.08) translateY(10px)',
              filter: isRevealed ? 'blur(0px)' : 'blur(4px)',
              opacity: isRevealed ? 1 : 0.15,
              transition: 'clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out, filter 0.5s ease-out',
              transitionDelay: `${staggerDelay}ms`,
            }}
          >
            <ProductImage src={product.image} alt={product.name} />

            {/* Subtle luminous gold sweep hairline following clip leading edge */}
            <div
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent pointer-events-none"
              style={{
                top: isRevealed ? '100%' : '0%',
                opacity: isRevealed ? 0 : 0.85,
                transition: 'top 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out',
                transitionDelay: `${staggerDelay}ms`,
              }}
            />
          </div>

          {/* Product Tag */}
          {product.tag && (
            <span
              className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs z-10 transition-opacity duration-300 ${
                isRevealed ? 'opacity-100' : 'opacity-0'
              } ${product.tagColor || 'bg-[#2B1B17] text-[#FAF7F2]'}`}
              style={{ transitionDelay: `${staggerDelay + 100}ms` }}
            >
              {product.tag}
            </span>
          )}

          {/* Quick View Hover Button */}
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-[#2B1B17] p-2 rounded-full shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 flex items-center gap-1 text-[11px] font-semibold cursor-pointer z-10 hover:scale-105"
            title="Quick View Clinical Details"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Details</span>
          </button>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1 text-amber-500 mb-1.5 text-xs">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span className="text-[#736B63] text-[11px] ml-1 font-medium tabular-nums">
            ({product.rating} • {product.reviewsCount})
          </span>
        </div>

        {/* Product Name */}
        <h3
          onClick={() => onQuickView(product)}
          className="font-editorial text-2xl font-bold text-[#2B1B17] group-hover:text-[#8C5A46] transition-colors leading-snug cursor-pointer"
        >
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-[#5C5248] mt-1.5 line-clamp-1 font-normal">{product.subtitle}</p>
      </div>

      {/* Card Bottom Pricing & Add CTA */}
      <div className="mt-6 pt-4 border-t border-[#EBE3D8]/60 flex items-center justify-between">
        <div>
          <span className="text-xs text-[#736B63] block line-through tabular-nums">
            ₹{product.originalPrice}
          </span>
          <span className="text-lg font-bold text-[#2B1B17] tabular-nums">
            ₹{product.price}
          </span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className={`text-xs font-semibold px-4 py-2.5 rounded-full transition shadow-xs flex items-center gap-1.5 cursor-pointer ${
            isAdded
              ? 'bg-emerald-700 text-white'
              : 'bg-[#2B1B17] hover:bg-[#1F1310] text-white'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <span>Add to Cart</span>
          )}
        </button>
      </div>
    </div>
  );
};

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onAddToCart,
  onQuickView,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.activeIngredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const itemsPerPage = 4;
  const maxPage = Math.max(0, Math.ceil(filteredProducts.length / itemsPerPage) - 1);

  const displayedProducts = filteredProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNext = () => {
    setCurrentPage((prev) => (prev >= maxPage ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev <= 0 ? maxPage : prev - 1));
  };

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  return (
    <section className="py-20 lg:py-24 bg-[#FAF7F2] border-t border-[#EBE3D8]/60 w-full max-w-full overflow-hidden" id="featured-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8C5A46]/10 text-xs font-bold uppercase tracking-wider text-[#8C5A46] mb-3">
              <span>DISPENSARY FORMULATIONS</span>
            </span>
            <div className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2B1B17] tracking-tight">
              <GoldenMagicalTypography
                as="h2"
                segments={[
                  { text: 'Medicines, Surgical & \n', colorClass: 'text-[#2B1B17] font-bold' },
                  { text: 'Cosmetics.', isItalic: true, colorClass: 'text-[#8C5A46] font-bold' },
                ]}
              />
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#736B63] font-medium tabular-nums">
              Page {currentPage + 1} of {Math.max(1, maxPage + 1)}
            </span>
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition cursor-pointer ${
                currentPage === 0
                  ? 'border-[#EBE3D8] text-[#736B63]/40 cursor-not-allowed'
                  : 'border-[#EBE3D8] hover:bg-white text-[#2B1B17]'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage >= maxPage}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition cursor-pointer ${
                currentPage >= maxPage
                  ? 'border-[#EBE3D8] text-[#736B63]/40 cursor-not-allowed'
                  : 'border-[#EBE3D8] hover:bg-white text-[#2B1B17]'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lower Container: Tabs & Product Grid */}
        <div>
          {/* Category Tabs: Medicines, Surgical Equipment, Cosmetics */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-semibold scrollbar-none">
            <button
              onClick={() => {
                onSelectCategory('all');
                setCurrentPage(0);
              }}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-[#2B1B17] text-white shadow-sm'
                  : 'bg-white border border-[#EBE3D8] text-[#736B63] hover:text-[#2B1B17]'
              }`}
            >
              All Items ({products.length})
            </button>
            <button
              onClick={() => {
                onSelectCategory('medicines');
                setCurrentPage(0);
              }}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'medicines'
                  ? 'bg-[#2B1B17] text-white shadow-sm'
                  : 'bg-white border border-[#EBE3D8] text-[#736B63] hover:text-[#2B1B17]'
              }`}
            >
              Medicines ({products.filter((p) => p.category === 'medicines').length})
            </button>
            <button
              onClick={() => {
                onSelectCategory('surgical');
                setCurrentPage(0);
              }}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'surgical'
                  ? 'bg-[#2B1B17] text-white shadow-sm'
                  : 'bg-white border border-[#EBE3D8] text-[#736B63] hover:text-[#2B1B17]'
              }`}
            >
              Surgical Equipment ({products.filter((p) => p.category === 'surgical').length})
            </button>
            <button
              onClick={() => {
                onSelectCategory('cosmetics');
                setCurrentPage(0);
              }}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'cosmetics'
                  ? 'bg-[#2B1B17] text-white shadow-sm'
                  : 'bg-white border border-[#EBE3D8] text-[#736B63] hover:text-[#2B1B17]'
              }`}
            >
              Cosmetics ({products.filter((p) => p.category === 'cosmetics').length})
            </button>
          </div>

          {searchQuery && (
            <div className="mb-6 flex items-center justify-between text-xs text-[#736B63]">
              <span>
                Showing results for: <strong className="text-[#2B1B17]">"{searchQuery}"</strong> ({filteredProducts.length} items)
              </span>
            </div>
          )}

          {/* Product Cards Grid: Each item clips in on scroll */}
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {displayedProducts.map((product, idx) => (
                <ProductCard
                  key={`${selectedCategory}-${currentPage}-${product.id}`}
                  product={product}
                  index={idx}
                  isAdded={addedProductId === product.id}
                  onAddToCart={handleAdd}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#EBE3D8]">
              <p className="text-base text-[#736B63] mb-4">
                No items matched your search criteria.
              </p>
              <button
                onClick={() => {
                  onSelectCategory('all');
                }}
                className="bg-[#2B1B17] text-white text-xs font-semibold px-6 py-2.5 rounded-full cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
