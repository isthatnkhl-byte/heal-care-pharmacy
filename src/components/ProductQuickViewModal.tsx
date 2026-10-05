import React, { useState } from 'react';
import { Product } from '../data/apothecaryData';
import { X, ShieldCheck, Check, MessageCircle, AlertCircle, ShoppingBag } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenWhatsApp: (customText?: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenWhatsApp,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'clinical' | 'dosage' | 'ingredients'>('clinical');
  const [added, setAdded] = useState<boolean>(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2B1B17]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-[#FAF7F2] rounded-3xl max-w-3xl w-full border border-[#EBE3D8] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#2B1B17] flex items-center justify-center shadow-sm transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left: Product Image & Badges */}
          <div className="md:col-span-5 flex flex-col">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[#EBE3D8] mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.tag && (
                <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${product.tagColor}`}>
                  {product.tag}
                </span>
              )}
            </div>

            {/* Batch & License metadata */}
            <div className="bg-white p-3 rounded-2xl border border-[#EBE3D8] text-[11px] space-y-1.5 text-[#736B63]">
              <div className="flex justify-between items-center">
                <span>Batch Number:</span>
                <span className="font-mono font-semibold text-[#2B1B17]">{product.batchNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Clinical License:</span>
                <span className="font-mono text-[#8C5A46]">{product.licenseNumber}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700 pt-1 border-t border-[#EBE3D8]/60 text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% CDSCO / AYUSH Verified</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C5A46] block mb-1">
                {product.categoryLabel}
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#2B1B17] leading-tight mb-1">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#5C5248] mb-3 font-normal">{product.subtitle}</p>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-1.5 mb-4 text-xs">
                <div className="text-amber-500 flex">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <span className="text-[#2B1B17] font-semibold tabular-nums">{product.rating}</span>
                <span className="text-[#736B63]">({product.reviewsCount} verified reviews)</span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-5 pb-4 border-b border-[#EBE3D8]">
                <span className="text-2xl font-bold text-[#2B1B17] tabular-nums">
                  ₹{product.price}
                </span>
                <span className="text-sm text-[#736B63] line-through tabular-nums">
                  ₹{product.originalPrice}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  Save {discountPercent}%
                </span>
                <span className="text-[11px] text-[#736B63] ml-auto">Taxes included</span>
              </div>

              {/* Tab Navigation for Clinical Information */}
              <div className="flex border-b border-[#EBE3D8] mb-3 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('clinical')}
                  className={`pb-2 mr-4 transition cursor-pointer ${
                    activeTab === 'clinical'
                      ? 'border-b-2 border-[#8C5A46] text-[#2B1B17]'
                      : 'text-[#736B63] hover:text-[#2B1B17]'
                  }`}
                >
                  Clinical Monograph
                </button>
                <button
                  onClick={() => setActiveTab('dosage')}
                  className={`pb-2 mr-4 transition cursor-pointer ${
                    activeTab === 'dosage'
                      ? 'border-b-2 border-[#8C5A46] text-[#2B1B17]'
                      : 'text-[#736B63] hover:text-[#2B1B17]'
                  }`}
                >
                  Dosage Guidelines
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2 transition cursor-pointer ${
                    activeTab === 'ingredients'
                      ? 'border-b-2 border-[#8C5A46] text-[#2B1B17]'
                      : 'text-[#736B63] hover:text-[#2B1B17]'
                  }`}
                >
                  Active Botanicals
                </button>
              </div>

              {/* Tab Content */}
              <div className="min-h-[110px] text-xs text-[#736B63] leading-relaxed mb-6">
                {activeTab === 'clinical' && (
                  <div>
                    <p>{product.description}</p>
                    {product.extractionMethod && (
                      <p className="mt-2 text-[11px] text-[#8C5A46] bg-[#8C5A46]/10 p-2 rounded-xl">
                        <strong>Extraction Protocol:</strong> {product.extractionMethod}
                      </p>
                    )}
                  </div>
                )}

                {activeTab === 'dosage' && (
                  <div className="bg-white p-3.5 rounded-xl border border-[#EBE3D8]">
                    <h5 className="font-semibold text-[#2B1B17] mb-1">Recommended Usage:</h5>
                    <p>{product.dosage}</p>
                    <div className="mt-2 text-[11px] flex items-center gap-1.5 text-amber-800">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Consistent administration for 4–6 weeks recommended for full therapeutic efficacy.</span>
                    </div>
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <ul className="space-y-1.5">
                    {product.activeIngredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-[#EBE3D8]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8C5A46]"></span>
                        <span className="font-medium text-[#2B1B17]">{ing}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Bottom Actions: Quantity & Buy Button */}
            <div className="space-y-3 pt-3 border-t border-[#EBE3D8]">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#EBE3D8] bg-white rounded-full p-1 text-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-full hover:bg-[#F4EFEA] flex items-center justify-center font-bold text-[#2B1B17] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold text-[#2B1B17] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-full hover:bg-[#F4EFEA] flex items-center justify-center font-bold text-[#2B1B17] cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-6 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition cursor-pointer ${
                    added ? 'bg-emerald-700 text-white' : 'bg-[#2B1B17] hover:bg-[#1F1310] text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Dispensary Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add {quantity} to Bag (₹{product.price * quantity})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick WhatsApp Advice CTA */}
              <button
                onClick={() =>
                  onOpenWhatsApp(
                    `Hello VedaPharma, I am inquiring about ${product.name} (Batch: ${product.batchNumber}). Could your chief pharmacist advise on compatibility with my current regimen?`
                  )
                }
                className="w-full text-center text-xs text-[#1E6F43] hover:underline font-semibold flex items-center justify-center gap-1.5 cursor-pointer py-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Consult Pharmacist about {product.name} on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
