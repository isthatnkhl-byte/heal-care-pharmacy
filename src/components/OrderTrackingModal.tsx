import React, { useState } from 'react';
import { X, CheckCircle2, Clock, Phone, MapPin, ShieldCheck, Thermometer, Truck } from 'lucide-react';
import { STORE_INFO } from '../data/apothecaryData';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orderId = 'HC-84291',
}) => {
  const [inputOrderId, setInputOrderId] = useState<string>(orderId);

  if (!isOpen) return null;

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

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>EXPRESS 2-HOUR COLD-CHAIN DISPATCH</span>
          </div>
          <h2 className="font-editorial text-3xl font-bold text-[#2B1B17] tracking-tight">
            Track Heal Care Order
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5248] mt-1.5 font-normal">
            Real-time fulfillment tracking from Heal Care Pharmacy.
          </p>
        </div>

        {/* Order Identifier Strip */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#EBE3D8] flex items-center justify-between mb-6 text-xs">
          <div>
            <span className="text-[#736B63] block text-[10px] uppercase font-bold tracking-wider">Order Reference</span>
            <span className="font-mono font-bold text-sm text-[#2B1B17]">{inputOrderId}</span>
          </div>
          <div className="text-right">
            <span className="text-[#736B63] block text-[10px] uppercase font-bold tracking-wider">Est. Arrival</span>
            <span className="text-emerald-700 font-bold text-xs">In ~38 minutes</span>
          </div>
        </div>

        {/* Timeline Steps */}
        <div className="space-y-4 mb-6 relative pl-6 border-l-2 border-[#8C5A46]/30 ml-3">
          {/* Step 1 */}
          <div className="relative">
            <span className="absolute -left-[31px] top-0.5 w-5 h-5 rounded-full bg-[#264E36] text-white flex items-center justify-center text-[10px]">
              ✓
            </span>
            <h4 className="text-xs font-bold text-[#2B1B17]">Doctor Rx Verification</h4>
            <p className="text-[11px] text-[#736B63]">
              Approved by Chief Pharmacist Arvind Rao (KMC 48291)
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <span className="absolute -left-[31px] top-0.5 w-5 h-5 rounded-full bg-[#264E36] text-white flex items-center justify-center text-[10px]">
              ✓
            </span>
            <h4 className="text-xs font-bold text-[#2B1B17]">Cleanroom Compounding &amp; Packaging</h4>
            <p className="text-[11px] text-[#736B63]">
              Tamper-evident sealed &amp; batch tested at 11:15 AM
            </p>
          </div>

          {/* Step 3 (Active) */}
          <div className="relative">
            <span className="absolute -left-[31px] top-0.5 w-5 h-5 rounded-full bg-[#8C5A46] text-white flex items-center justify-center text-[10px] animate-pulse">
              ●
            </span>
            <h4 className="text-xs font-bold text-[#8C5A46]">Rider Dispatched from Indiranagar Hub</h4>
            <p className="text-[11px] text-[#736B63]">
              Courier on direct temperature-controlled electric transit
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative opacity-60">
            <span className="absolute -left-[31px] top-0.5 w-5 h-5 rounded-full bg-[#EBE3D8] text-[#736B63] flex items-center justify-center text-[10px]">
              ○
            </span>
            <h4 className="text-xs font-semibold text-[#2B1B17]">Sanitized Doorstep Handover</h4>
            <p className="text-[11px] text-[#736B63]">OTP verification upon delivery</p>
          </div>
        </div>

        {/* Courier & Sensor Telemetry Card */}
        <div className="bg-white p-4 rounded-2xl border border-[#EBE3D8] space-y-3 mb-6 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F4EFEA] flex items-center justify-center font-bold text-[#2B1B17]">
                <Truck className="w-5 h-5 text-[#8C5A46]" />
              </div>
              <div>
                <div className="font-bold text-[#2B1B17]">Raghavendra S.</div>
                <div className="text-[11px] text-[#736B63]">Certified Pharmacy Courier #412</div>
              </div>
            </div>
            <a
              href={`tel:${STORE_INFO.phoneRaw}`}
              className="p-2.5 rounded-full bg-[#FAF7F2] hover:bg-[#F4EFEA] border border-[#EBE3D8] text-[#2B1B17]"
              title="Call Delivery Partner"
            >
              <Phone className="w-4 h-4 text-[#8C5A46]" />
            </a>
          </div>

          {/* Live cold chain telemetry */}
          <div className="pt-2 border-t border-[#EBE3D8]/60 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
              <Thermometer className="w-3.5 h-3.5 text-emerald-600" />
              <span>Container Temp: 20.4°C (Optimal)</span>
            </div>
            <span className="text-[#736B63]">Sensor ID: #HC-IOT-09</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#2B1B17] hover:bg-[#1F1310] text-white py-3 rounded-full text-xs font-semibold cursor-pointer"
        >
          Close Tracking
        </button>
      </div>
    </div>
  );
};
