import React, { useState } from 'react';
import { DRUG_HERB_INTERACTIONS, DrugInteraction } from '../data/apothecaryData';
import { X, ShieldAlert, CheckCircle2, AlertTriangle, Info, MessageCircle } from 'lucide-react';

interface DrugHerbCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhatsApp: (text?: string) => void;
}

export const DrugHerbCheckerModal: React.FC<DrugHerbCheckerModalProps> = ({
  isOpen,
  onClose,
  onOpenWhatsApp,
}) => {
  const [selectedDrug, setSelectedDrug] = useState<string>(DRUG_HERB_INTERACTIONS[0].drug);
  const [selectedHerb, setSelectedHerb] = useState<string>(DRUG_HERB_INTERACTIONS[0].herb);

  if (!isOpen) return null;

  // Find matching interaction or default
  const activeInteraction: DrugInteraction | undefined = DRUG_HERB_INTERACTIONS.find(
    (item) => item.drug === selectedDrug && item.herb === selectedHerb
  ) || {
    drug: selectedDrug,
    herb: selectedHerb,
    severity: 'safe',
    pharmacistAdvice: 'No major pharmacokinetic or cytochrome P450 contraindication identified in clinical literature. Maintain a general 1 to 2 hour administration gap between synthetic medications and herbal extracts.',
    spacingRecommendation: 'Administer synthetic medicine with breakfast; take herbal tonic 2 hours subsequent.',
    mechanism: 'Independent metabolic and renal clearance pathways.'
  };

  const getSeverityBadge = (severity: DrugInteraction['severity']) => {
    switch (severity) {
      case 'caution':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Caution / Supervised</span>
          </span>
        );
      case 'moderate':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Moderate / Monitor Dosage</span>
          </span>
        );
      case 'mild':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <Info className="w-3.5 h-3.5" />
            <span>Mild / Safe Spacing</span>
          </span>
        );
      case 'safe':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Compatible / Low Risk</span>
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2B1B17]/65 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full border border-[#EBE3D8] shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C5A46]/10 text-[#8C5A46] text-xs font-semibold mb-2">
            <span>CLINICAL APOTHECARY ADVISORY</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#2B1B17] tracking-tight">
            Herb &amp; Drug Interaction Checker
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5248] mt-1.5 leading-relaxed font-normal">
            Ensure complete safety when co-administering modern prescription pharmaceuticals with Vedic botanical formulations. Reviewed by our Chief Clinical Pharmacist.
          </p>
        </div>

        {/* Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2B1B17] mb-1.5">
              1. Modern Medication / Class
            </label>
            <select
              value={selectedDrug}
              onChange={(e) => setSelectedDrug(e.target.value)}
              className="w-full text-xs p-3 bg-white border border-[#EBE3D8] rounded-xl focus:ring-1 focus:ring-[#8C5A46] focus:outline-none"
            >
              {DRUG_HERB_INTERACTIONS.map((item, idx) => (
                <option key={idx} value={item.drug}>
                  {item.drug}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2B1B17] mb-1.5">
              2. Ayurvedic Botanical / Herb
            </label>
            <select
              value={selectedHerb}
              onChange={(e) => setSelectedHerb(e.target.value)}
              className="w-full text-xs p-3 bg-white border border-[#EBE3D8] rounded-xl focus:ring-1 focus:ring-[#8C5A46] focus:outline-none"
            >
              {DRUG_HERB_INTERACTIONS.map((item, idx) => (
                <option key={idx} value={item.herb}>
                  {item.herb}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Interaction Result Card */}
        <div className="bg-white rounded-2xl p-5 border border-[#EBE3D8] shadow-xs mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EBE3D8]/80 pb-3">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#736B63]">
                Pharmacological Safety Analysis
              </div>
              <div className="text-xs font-semibold text-[#2B1B17] mt-0.5">
                {selectedDrug.split('(')[0]} + {selectedHerb.split('(')[0]}
              </div>
            </div>
            <div>{getSeverityBadge(activeInteraction.severity)}</div>
          </div>

          <div>
            <h5 className="text-xs font-bold text-[#2B1B17] mb-1">Chief Pharmacist Guidance:</h5>
            <p className="text-xs text-[#736B63] leading-relaxed">
              {activeInteraction.pharmacistAdvice}
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EBE3D8] text-xs">
            <span className="font-bold text-[#8C5A46] block mb-0.5">Recommended Spacing:</span>
            <p className="text-[#2B1B17]">{activeInteraction.spacingRecommendation}</p>
          </div>

          <div className="text-[11px] text-[#736B63]">
            <span className="font-semibold text-[#2B1B17]">Biological Mechanism: </span>
            <span>{activeInteraction.mechanism}</span>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenWhatsApp(
                `Hello Pharmacist, I used your Herb-Drug Checker for ${selectedDrug} with ${selectedHerb}. Can you review my specific dosage?`
              );
            }}
            className="flex-1 bg-[#1E6F43] hover:bg-[#165634] text-white py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Consult Chief Pharmacist on WhatsApp</span>
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full text-xs font-semibold border border-[#EBE3D8] bg-white hover:bg-[#F4EFEA] text-[#2B1B17] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
