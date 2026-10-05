import React, { useState } from 'react';
import { Upload, CheckCircle2, ShieldCheck, MessageCircle, FileText, Check, AlertCircle, ArrowRight, RefreshCw, Phone } from 'lucide-react';
import { SAMPLE_PRESCRIPTIONS, STORE_INFO } from '../data/apothecaryData';
import { GoldenMagicalTypography } from './GoldenMagicalTypography';

interface PrescriptionUploadWorkflowProps {
  onOpenWhatsApp: () => void;
  onAddPrescriptionItemsToCart: (items: { name: string; qty: string; price: number }[]) => void;
}

export const PrescriptionUploadWorkflow: React.FC<PrescriptionUploadWorkflowProps> = ({
  onOpenWhatsApp,
  onAddPrescriptionItemsToCart,
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [activeAnalysisStage, setActiveAnalysisStage] = useState<string>('');
  const [verifiedRx, setVerifiedRx] = useState<typeof SAMPLE_PRESCRIPTIONS[0] | null>(null);
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [headlineProgress, setHeadlineProgress] = useState<number>(0);

  // Lower section only loads when the headline type-in finishes (progress >= 0.85 to 1.0)
  const lowerLoadProgress = Math.min(1, Math.max(0, (headlineProgress - 0.85) / 0.15));

  const startAnalysis = (sampleRx = SAMPLE_PRESCRIPTIONS[0], customFileName = 'Doctor_Prescription_Slip.pdf') => {
    setSelectedFile(customFileName);
    setAnalyzing(true);
    setVerifiedRx(null);
    setShowSuccessToast(false);

    setActiveAnalysisStage('Digitizing medical script & handwriting...');
    setTimeout(() => {
      setActiveAnalysisStage(`Verifying Medical Council Reg: ${sampleRx.regNo}...`);
      setTimeout(() => {
        setActiveAnalysisStage('Cross-referencing formulation stocks & batch numbers...');
        setTimeout(() => {
          setAnalyzing(false);
          setVerifiedRx(sampleRx);
          setSelectedMedications(sampleRx.items.map((_, i) => `${i}`));
        }, 600);
      }, 600);
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      startAnalysis(SAMPLE_PRESCRIPTIONS[0], file.name);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      startAnalysis(SAMPLE_PRESCRIPTIONS[0], file.name);
    }
  };

  const toggleMedication = (indexStr: string) => {
    if (selectedMedications.includes(indexStr)) {
      setSelectedMedications(selectedMedications.filter((id) => id !== indexStr));
    } else {
      setSelectedMedications([...selectedMedications, indexStr]);
    }
  };

  const handleAddItems = () => {
    if (!verifiedRx) return;
    const itemsToAdd = verifiedRx.items
      .filter((_, idx) => selectedMedications.includes(`${idx}`))
      .map((item, idx) => ({
        name: item.name,
        qty: item.qty,
        price: idx === 0 ? 320 : idx === 1 ? 260 : 599,
      }));

    onAddPrescriptionItemsToCart(itemsToAdd);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  return (
    <section className="py-20 lg:py-24 bg-[#F5EFE8] border-y border-[#EBE3D8]" id="prescription-order">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Steps & Direct WhatsApp */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8C5A46]/10 text-[#8C5A46] text-xs font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-[#8C5A46] animate-pulse"></span>
              <span>EXPRESS 2-HOUR FULFILLMENT</span>
            </div>
            <div className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2B1B17] tracking-tight mb-4">
              <GoldenMagicalTypography
                as="h2"
                segments={[
                  { text: 'The Simplest Way to \n', colorClass: 'text-[#2B1B17] font-bold' },
                  { text: 'Order Your Medicines.', isItalic: true, colorClass: 'text-[#8C5A46] font-bold' },
                ]}
                onProgressChange={(p) => setHeadlineProgress(p)}
              />
            </div>
            {/* Lower Content */}
            <div
              className="transition-all duration-300 ease-out"
              style={{
                opacity: lowerLoadProgress,
                transform: `translateY(${(1 - lowerLoadProgress) * 16}px)`,
                pointerEvents: lowerLoadProgress > 0.3 ? 'auto' : 'none',
              }}
            >
              <p className="text-base sm:text-lg text-[#5C5248] mb-8 leading-relaxed font-normal">
                Skip pharmacy lines and complicated checkout carts. Upload a clear photograph of your prescription slip and our licensed team will handle verification, insurance coordination, and doorstep delivery.
              </p>

              {/* 4 Steps Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8">
                <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-[#EBE3D8] shadow-xs hover:border-[#8C5A46]/40 transition-colors">
                  <span className="w-8 h-8 rounded-full bg-[#2B1B17] text-[#FAF7F2] text-xs font-bold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B1B17]">Upload Rx Photo</h4>
                    <p className="text-xs text-[#5C5248] mt-1 leading-snug">Attach a photo or PDF of your doctor's note.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-[#EBE3D8] shadow-xs hover:border-[#8C5A46]/40 transition-colors">
                  <span className="w-8 h-8 rounded-full bg-[#2B1B17] text-[#FAF7F2] text-xs font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B1B17]">Quick Pharmacist Call</h4>
                    <p className="text-xs text-[#5C5248] mt-1 leading-snug">Brief confirmation call to verify dosage &amp; substitutes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-[#EBE3D8] shadow-xs hover:border-[#8C5A46]/40 transition-colors">
                  <span className="w-8 h-8 rounded-full bg-[#2B1B17] text-[#FAF7F2] text-xs font-bold flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B1B17]">Packed Under Video</h4>
                    <p className="text-xs text-[#5C5248] mt-1 leading-snug">Tamper-evident sealed packaging prepared with batch check.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-[#EBE3D8] shadow-xs hover:border-[#8C5A46]/40 transition-colors">
                  <span className="w-8 h-8 rounded-full bg-[#2B1B17] text-[#FAF7F2] text-xs font-bold flex items-center justify-center shrink-0">
                    4
                  </span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B1B17]">2-Hour Delivery</h4>
                    <p className="text-xs text-[#5C5248] mt-1 leading-snug">Delivered directly to your home with live status tracking.</p>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp & Call CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenWhatsApp}
                  className="inline-flex items-center gap-2.5 bg-[#1E6F43] hover:bg-[#165634] text-white px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp: {STORE_INFO.whatsappNumber}</span>
                </button>
                <a
                  href={`tel:${STORE_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#F4EFEA] text-[#2B1B17] border border-[#EBE3D8] px-5 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8C5A46]" />
                  <span>Call Store</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Prescription Drop Zone Card with Interactive Verification */}
          <div
            className="lg:col-span-6 transition-all duration-300 ease-out"
            style={{
              opacity: lowerLoadProgress,
              transform: `translateY(${(1 - lowerLoadProgress) * 16}px)`,
              pointerEvents: lowerLoadProgress > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-2xl border border-[#EBE3D8] relative overflow-hidden">
              {/* Corner Apothecary Mortar Motif */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#F4EFEA] rounded-full flex items-end justify-start p-4 text-[#736B63]/25 pointer-events-none">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {!verifiedRx && !analyzing && (
                <div>
                  {/* Upload Interactive Zone */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    className={`custom-dashed-border rounded-2xl p-7 sm:p-9 flex flex-col items-center text-center transition duration-300 ${
                      isDragOver ? 'bg-[#FAF0E6]' : 'bg-[#FAF8F5]/60 hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#8C5A46] mb-4 border border-[#EBE3D8]/80">
                      <Upload className="w-8 h-8" />
                    </div>
                    <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#2B1B17] mb-1.5">
                      Drop Prescription Here
                    </h3>
                    <p className="text-xs text-[#736B63] max-w-xs mb-6">
                      Drag and drop your doctor's slip or browse files. Supports high-res JPG, PNG, or PDF up to 25MB.
                    </p>

                    {/* Upload Button */}
                    <label
                      htmlFor="prescription-file"
                      className="bg-[#2B1B17] hover:bg-[#1F1310] text-white text-xs font-semibold px-8 py-3.5 rounded-full shadow-md cursor-pointer transition"
                    >
                      Browse My Files
                      <input
                        id="prescription-file"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Security Indicator */}
                    <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold text-[#736B63]">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>256-Bit SSL Encrypted &amp; HIPAA Compliant</span>
                    </div>
                  </div>

                  {/* 1-Click Interactive Test Samples */}
                  <div className="mt-6 pt-5 border-t border-[#EBE3D8]/80">
                    <p className="text-xs font-semibold text-[#2B1B17] mb-2.5 flex items-center gap-1.5">
                      <span>Quick Test with Authentic Clinical Samples:</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => startAnalysis(SAMPLE_PRESCRIPTIONS[0], 'Dr_Deshmukh_Rx_Diabetes_Ashwagandha.pdf')}
                        className="text-left text-xs bg-[#FAF7F2] hover:bg-[#F4EFEA] border border-[#EBE3D8] p-2.5 rounded-xl transition text-[#2B1B17] flex-1 cursor-pointer"
                      >
                        <div className="font-semibold text-[11px] text-[#8C5A46]">Sample Rx #1 (Allopathic &amp; Herb)</div>
                        <div className="text-[11px] text-[#736B63] truncate">Dr. Deshmukh • Metformin, Statin, Ashwagandha</div>
                      </button>
                      <button
                        onClick={() => startAnalysis(SAMPLE_PRESCRIPTIONS[1], 'Dr_Vaidya_Ayush_Prescription.pdf')}
                        className="text-left text-xs bg-[#FAF7F2] hover:bg-[#F4EFEA] border border-[#EBE3D8] p-2.5 rounded-xl transition text-[#2B1B17] flex-1 cursor-pointer"
                      >
                        <div className="font-semibold text-[11px] text-[#264E36]">Sample Rx #2 (Ayurvedic Wellness)</div>
                        <div className="text-[11px] text-[#736B63] truncate">Dr. Radhika Vaidya • Aloe, Immuno-C, Triphala</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Analyzing State */}
              {analyzing && (
                <div className="py-12 px-4 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full border-3 border-[#EBE3D8] border-t-[#8C5A46] animate-spin mb-5"></div>
                  <h3 className="font-editorial text-2xl font-medium text-[#2B1B17] mb-2">
                    Pharmacist Clinical Verification
                  </h3>
                  <p className="text-xs text-[#8C5A46] font-medium animate-pulse mb-3">
                    {activeAnalysisStage}
                  </p>
                  <p className="text-[11px] text-[#736B63] max-w-xs">
                    File: <span className="font-mono text-[#2B1B17]">{selectedFile}</span>
                  </p>
                </div>
              )}

              {/* Verified Prescription Results */}
              {verifiedRx && !analyzing && (
                <div>
                  <div className="flex items-center justify-between border-b border-[#EBE3D8] pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                        Prescription Verified
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setVerifiedRx(null);
                        setSelectedFile(null);
                      }}
                      className="text-xs text-[#736B63] hover:text-[#2B1B17] flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Upload New
                    </button>
                  </div>

                  {/* Doctor & Patient Credentials Card */}
                  <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EBE3D8] mb-4 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-[#2B1B17]">{verifiedRx.doctorName}</div>
                        <div className="text-[11px] text-[#736B63]">{verifiedRx.clinic}</div>
                        <div className="text-[10px] font-mono text-[#8C5A46] mt-0.5">Reg: {verifiedRx.regNo}</div>
                      </div>
                      <span className="text-[10px] bg-white border border-[#EBE3D8] px-2 py-0.5 rounded text-[#736B63]">
                        {verifiedRx.date}
                      </span>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-[#EBE3D8]/60 flex justify-between items-center text-[11px]">
                      <span className="text-[#736B63]">Patient: <strong className="text-[#2B1B17]">{verifiedRx.patientName}</strong></span>
                      <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                        Diagnosis: {verifiedRx.diagnosis}
                      </span>
                    </div>
                  </div>

                  {/* Extracted Medicines list */}
                  <div className="space-y-2 mb-4">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#736B63] block">
                      Prescribed Formulations &amp; Dosage ({verifiedRx.items.length})
                    </label>
                    {verifiedRx.items.map((med, idx) => {
                      const isSelected = selectedMedications.includes(`${idx}`);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleMedication(`${idx}`)}
                          className={`p-3 rounded-xl border text-xs flex items-start justify-between cursor-pointer transition ${
                            isSelected
                              ? 'bg-white border-[#8C5A46] shadow-xs'
                              : 'bg-white/50 border-[#EBE3D8] opacity-60'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleMedication(`${idx}`)}
                              className="mt-0.5 rounded text-[#8C5A46] focus:ring-[#8C5A46]"
                            />
                            <div>
                              <div className="font-semibold text-[#2B1B17]">{med.name}</div>
                              <div className="text-[11px] text-[#736B63]">{med.instructions}</div>
                            </div>
                          </div>
                          <span className="text-[11px] font-mono font-medium text-[#8C5A46] shrink-0">
                            {med.qty}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {showSuccessToast && (
                    <div className="mb-3 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>Added verified medications to your dispensary bag!</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={handleAddItems}
                      disabled={selectedMedications.length === 0}
                      className="flex-1 bg-[#2B1B17] hover:bg-[#1F1310] disabled:opacity-50 text-white py-3 rounded-full text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>Add Selected ({selectedMedications.length}) to Cart</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={onOpenWhatsApp}
                      className="bg-[#1E6F43] hover:bg-[#185A37] text-white px-5 py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Confirm via WhatsApp</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
