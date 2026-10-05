import React, { useState } from 'react';
import { X, Calendar, Clock, User, CheckCircle2, MapPin, Sparkles } from 'lucide-react';

interface BookConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookConsultationModal: React.FC<BookConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [practitioner, setPractitioner] = useState<'radhika' | 'arvind'>('radhika');
  const [consultType, setConsultType] = useState('ayurvedic-pulse');
  const [patientName, setPatientName] = useState('Nikhil Goswami');
  const [patientPhone, setPatientPhone] = useState('+91 98450 12890');
  const [date, setDate] = useState('2026-10-08');
  const [timeSlot, setTimeSlot] = useState('11:30 AM');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2B1B17]/65 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full border border-[#EBE3D8] shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#2B1B17] flex items-center justify-center shadow-xs transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isBooked ? (
          <form onSubmit={handleBooking} className="space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C5A46] block mb-1">
                HEAL CARE PHARMACY &amp; CLINICAL DESK
              </span>
              <h3 className="font-editorial text-3xl font-bold text-[#2B1B17] tracking-tight">
                Book In-Store Pharmacist Consultation
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5248] mt-1.5 leading-relaxed font-normal">
                Experience custom herbal blending, holistic pulse evaluation, and modern pharmacological compatibility reviews.
              </p>
            </div>

            {/* Select Practitioner */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#2B1B17] block mb-2">
                1. Select Clinician
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPractitioner('radhika')}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                    practitioner === 'radhika'
                      ? 'bg-white border-[#8C5A46] shadow-xs'
                      : 'bg-white/60 border-[#EBE3D8]'
                  }`}
                >
                  <div className="font-semibold text-xs text-[#2B1B17]">Dr. Radhika Vaidya</div>
                  <div className="text-[11px] text-[#8C5A46]">BAMS, MD (Ayurveda)</div>
                  <div className="text-[10px] text-[#736B63] mt-1">Nadi Pariksha &amp; Herb Formulation</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPractitioner('arvind')}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                    practitioner === 'arvind'
                      ? 'bg-white border-[#8C5A46] shadow-xs'
                      : 'bg-white/60 border-[#EBE3D8]'
                  }`}
                >
                  <div className="font-semibold text-xs text-[#2B1B17]">Arvind Rao, M.Pharm</div>
                  <div className="text-[11px] text-[#8C5A46]">Chief Clinical Pharmacist</div>
                  <div className="text-[10px] text-[#736B63] mt-1">Drug Interaction &amp; Chronic Regimens</div>
                </button>
              </div>
            </div>

            {/* Select Consultation Type */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#2B1B17] block mb-1.5">
                2. Consultation Focus
              </label>
              <select
                value={consultType}
                onChange={(e) => setConsultType(e.target.value)}
                className="w-full text-xs p-3 bg-white border border-[#EBE3D8] rounded-xl focus:ring-1 focus:ring-[#8C5A46] focus:outline-none"
              >
                <option value="ayurvedic-pulse">Nadi Pariksha (Ayurvedic Pulse Diagnosis &amp; Dosha Mapping)</option>
                <option value="polypharmacy">Chronic Prescription &amp; Drug-Herb Interaction Review</option>
                <option value="skin-botanicals">Custom Botanical Skincare &amp; Cold-Pressed Oil Formulation</option>
                <option value="vitality-sleep">Circadian Sleep &amp; Cortisol Herbal Protocols</option>
              </select>
            </div>

            {/* Patient Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-[#736B63] block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#EBE3D8] rounded-xl focus:ring-1 focus:ring-[#8C5A46] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#736B63] block mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#EBE3D8] rounded-xl focus:ring-1 focus:ring-[#8C5A46] focus:outline-none"
                />
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-[#736B63] block mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#EBE3D8] rounded-xl focus:ring-1 focus:ring-[#8C5A46] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#736B63] block mb-1">Preferred Slot</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-[#EBE3D8] rounded-xl focus:ring-1 focus:ring-[#8C5A46] focus:outline-none"
                >
                  <option value="10:30 AM">10:30 AM (Morning Session)</option>
                  <option value="11:30 AM">11:30 AM (Morning Session)</option>
                  <option value="03:00 PM">03:00 PM (Afternoon Session)</option>
                  <option value="05:30 PM">05:30 PM (Evening Session)</option>
                  <option value="07:00 PM">07:00 PM (Apothecary Lounge)</option>
                </select>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 bg-[#2B1B17] hover:bg-[#1F1310] text-white py-3.5 rounded-full text-xs font-semibold shadow-md transition cursor-pointer"
              >
                Confirm Sanctuary Appointment (Complimentary)
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-full text-xs font-semibold border border-[#EBE3D8] bg-white hover:bg-[#F4EFEA] text-[#2B1B17] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation Success */
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 block mb-1">
                Consultation Reserved
              </span>
              <h4 className="font-editorial text-3xl font-medium text-[#2B1B17]">
                Appointment Confirmed
              </h4>
              <p className="text-xs text-[#736B63] mt-2 max-w-sm mx-auto">
                We look forward to welcoming you at Heal Care, {patientName}.
              </p>
            </div>

            {/* Pass details */}
            <div className="bg-white p-5 rounded-2xl border border-[#EBE3D8] text-xs text-left space-y-2.5">
              <div className="flex justify-between border-b border-[#EBE3D8]/70 pb-2">
                <span className="text-[#736B63]">Clinician:</span>
                <span className="font-semibold text-[#2B1B17]">
                  {practitioner === 'radhika' ? 'Dr. Radhika Vaidya (Consultant)' : 'Arvind Rao (Chief Pharmacist)'}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#EBE3D8]/70 pb-2">
                <span className="text-[#736B63]">Date &amp; Time:</span>
                <span className="font-bold text-[#8C5A46]">{date} at {timeSlot}</span>
              </div>
              <div className="flex justify-between border-b border-[#EBE3D8]/70 pb-2">
                <span className="text-[#736B63]">Location:</span>
                <a
                  href="https://maps.app.goo.gl/xDxWzPoES9SHaYps6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8C5A46] font-semibold underline text-right"
                >
                  Heal Care (View on Google Maps)
                </a>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#736B63]">Appointment Pass ID:</span>
                <span className="font-mono text-emerald-800 font-bold">#HC-APT-7729</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsBooked(false);
                onClose();
              }}
              className="bg-[#2B1B17] hover:bg-[#1F1310] text-white px-8 py-3 rounded-full text-xs font-semibold cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
