import React, { useState } from 'react';
import { X, Trash2, ArrowRight, MessageCircle, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';

export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  quantity: number;
  image?: string;
  requiresPrescription?: boolean;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onOpenWhatsAppCheckout: () => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onOpenWhatsAppCheckout,
  onExplore,
}) => {
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string>('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round(rawSubtotal * appliedDiscount);
  const freeShippingThreshold = 500;
  const isFreeShipping = rawSubtotal >= freeShippingThreshold;
  const shippingFee = rawSubtotal === 0 ? 0 : isFreeShipping ? 0 : 49;
  const grandTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'VEDA15') {
      setAppliedDiscount(0.15);
      setCouponMessage('VEDA15 applied: 15% Apothecary Discount!');
    } else if (couponCode.trim().toUpperCase() === 'EXPRESS') {
      setAppliedDiscount(0.1);
      setCouponMessage('EXPRESS applied: 10% Welcome Discount!');
    } else {
      setCouponMessage('Invalid coupon code. Try VEDA15 for 15% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#2B1B17]/60 backdrop-blur-xs flex justify-end">
      {/* Background click overlay */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] border-l border-[#EBE3D8] shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#EBE3D8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#2B1B17] text-[#FAF7F2] flex items-center justify-center font-bold text-xs">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-medium text-[#2B1B17] leading-none">
                Dispensary Bag
              </h3>
              <p className="text-[11px] text-[#736B63] mt-0.5">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your order
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#F4EFEA] text-[#2B1B17] flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Strip */}
        <div className="bg-[#F4EFEA] px-5 py-3 border-b border-[#EBE3D8] text-xs">
          {isFreeShipping ? (
            <div className="text-emerald-800 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Free 2-Hour Express Delivery Unlocked!</span>
            </div>
          ) : (
            <div>
              <div className="flex justify-between text-[11px] text-[#736B63] mb-1">
                <span>Add ₹{freeShippingThreshold - rawSubtotal} more for Free Express Delivery</span>
                <span className="font-bold text-[#2B1B17]">₹{rawSubtotal} / ₹{freeShippingThreshold}</span>
              </div>
              <div className="w-full h-1.5 bg-[#EBE3D8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#8C5A46] transition-all duration-300 rounded-full"
                  style={{ width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3.5 rounded-2xl border border-[#EBE3D8] shadow-xs flex items-center gap-3.5"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-[#F4EFEA] shrink-0 border border-[#EBE3D8]/60"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-editorial text-lg font-medium text-[#2B1B17] leading-tight truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#736B63] truncate">{item.subtitle}</p>
                  <div className="text-xs font-bold text-[#2B1B17] mt-1 tabular-nums">
                    ₹{item.price * item.quantity}
                    {item.quantity > 1 && (
                      <span className="text-[10px] text-[#736B63] font-normal ml-1">
                        (₹{item.price} each)
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-[#736B63] hover:text-red-700 transition p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center border border-[#EBE3D8] rounded-full bg-[#FAF7F2] p-0.5 text-xs">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-5 h-5 rounded-full hover:bg-white flex items-center justify-center font-bold text-[#2B1B17] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-semibold text-[#2B1B17] tabular-nums text-xs">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-5 h-5 rounded-full hover:bg-white flex items-center justify-center font-bold text-[#2B1B17] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F4EFEA] text-[#8C5A46] flex items-center justify-center mx-auto mb-4 border border-[#EBE3D8]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h4 className="font-editorial text-2xl text-[#2B1B17] mb-1">
                Your Bag is Empty
              </h4>
              <p className="text-xs text-[#736B63] max-w-xs mx-auto mb-6">
                Discover authentic ayurvedic single herbs and verified pharmaceutical formulations.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExplore();
                }}
                className="bg-[#2B1B17] hover:bg-[#1F1310] text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-sm cursor-pointer"
              >
                Browse Best-Sellers
              </button>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 bg-white border-t border-[#EBE3D8] space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#736B63]" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon: VEDA15"
                  className="w-full text-xs pl-8 pr-3 py-2 bg-[#FAF7F2] border border-[#EBE3D8] rounded-xl uppercase tracking-wider font-mono focus:outline-none focus:ring-1 focus:ring-[#8C5A46]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#F4EFEA] hover:bg-[#EBE3D8] text-[#2B1B17] text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Apply
              </button>
            </form>
            {couponMessage && (
              <p className="text-[11px] text-[#8C5A46] font-medium -mt-2">{couponMessage}</p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#736B63] pt-1 border-t border-[#EBE3D8]/60">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#2B1B17] font-semibold tabular-nums">₹{rawSubtotal}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Apothecary Discount (15%)</span>
                  <span className="font-semibold tabular-nums">-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express 2-Hour Delivery</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[10px]">FREE</span>
                  ) : (
                    <span className="text-[#2B1B17] tabular-nums">₹{shippingFee}</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#2B1B17] pt-2 border-t border-[#EBE3D8]">
                <span>Total Amount</span>
                <span className="tabular-nums">₹{grandTotal}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full bg-[#2B1B17] hover:bg-[#1F1310] text-white py-3.5 rounded-full text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenWhatsAppCheckout}
                className="w-full bg-[#1E6F43] hover:bg-[#185A37] text-white py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Instant Checkout on WhatsApp</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#736B63] uppercase tracking-wider font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Certified Tamper-Evident Packaging</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
