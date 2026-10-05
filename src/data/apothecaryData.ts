export interface Product {
  id: string;
  name: string;
  category: 'medicines' | 'surgical' | 'cosmetics';
  categoryLabel: string;
  tag?: string;
  tagColor?: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  dosage: string;
  activeIngredients: string[];
  extractionMethod?: string;
  batchNumber: string;
  licenseNumber: string;
  inStock: boolean;
  requiresPrescription: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
  verified: boolean;
}

export interface DrugInteraction {
  drug: string;
  herb: string;
  severity: 'mild' | 'moderate' | 'caution' | 'safe';
  pharmacistAdvice: string;
  spacingRecommendation: string;
  mechanism: string;
}

export const STORE_INFO = {
  name: 'Heal Care',
  tagline: 'Medicines • Surgical Equipment • Cosmetics',
  whatsappNumber: '+91 9050178323',
  whatsappRaw: '919050178323',
  phone: '+91 9050178323',
  phoneRaw: '+919050178323',
  email: 'akashverma9928@gmail.com',
  mapUrl: 'https://maps.app.goo.gl/xDxWzPoES9SHaYps6',
  address: 'Heal Care Pharmacy, Near City Center',
};

export const PRODUCTS: Product[] = [
  // SECTION 1: MEDICINES
  {
    id: 'ashwagandha-ksm66',
    name: 'Vedic Ashwagandha KSM-66',
    category: 'medicines',
    categoryLabel: 'Medicines',
    tag: 'Bestseller',
    tagColor: 'bg-[#2B1B17] text-[#FAF7F2]',
    subtitle: 'Standardized Withanolides • 60 Vegan Caps',
    price: 599,
    originalPrice: 799,
    rating: 4.9,
    reviewsCount: 342,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzH9vZwgnc5M_VOPrLIjZU_jzTduJ7InrwQSLPqdBFe8GeALBEAEL0GNvsUQTkhcPYN0wZK5EO-wrkg8kqi_jy8HS4MvT72_NH1f-5rtvefb07StRSPJceEz4CYn5YFDgMdcezDm1W7ProQP_Ypfg8yfgrXQgncHvp8jSYcgOP09vvPYgHGh0zI8E-IuyEgfMZYDdA07toE68sAUX6wo3wTm_SxEF_XKWMc_MI5dIw81LLte4uaAhZ',
    description: 'Gold-standard full-spectrum Ashwagandha root extract concentrated to 5% withanolides. Clinically verified to promote cortisol balance, enhance cognitive resilience, and restore deep circadian rest.',
    dosage: '1 capsule twice daily with warm water or milk after meals.',
    activeIngredients: ['Organic Withania Somnifera Root Extract (600mg)', 'Piperine Extract (5mg)'],
    extractionMethod: 'Clean biological extraction preserving full spectrum',
    batchNumber: 'HC-MED-2026-08',
    licenseNumber: 'HC-PHARMA-0419',
    inStock: true,
    requiresPrescription: false,
  },
  {
    id: 'metformin-500-sr',
    name: 'Metformin Hydrochloride 500mg SR',
    category: 'medicines',
    categoryLabel: 'Medicines',
    tag: 'Clinical Rx',
    tagColor: 'bg-[#8C5A46] text-white',
    subtitle: 'Sustained Release Glycemic Care • 60 Tablets',
    price: 240,
    originalPrice: 320,
    rating: 4.9,
    reviewsCount: 215,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBmpv9sscldtNpyImaLoXhIP7MqR4_alPyhVyLPLIXi6QuMyBy9B7Dbn5Vu-8VNQlhlfgDdQ5x_KGnVo59yvMnYmk21Ff4OuQ7rY-7xdXNO66JEV7r6tbHcHUmblabaWvASrbxsVU5P1eXZ9tCawPAe7SqiY6nwrflr7H4jCTBOmE5fZavcGt2UnVxBlHYNyUXmdVNnUHxN6HGaXcrOvJYOtTj_JOZcD3y7Tnoyl7CnOoCm59SNAo7',
    description: 'First-line prescription biguanide formulation designed for sustained intestinal dissolution. Stabilizes hepatic gluconeogenesis and optimizes peripheral insulin sensitivity.',
    dosage: 'As prescribed by physician. Commonly 1 tablet twice daily with evening meals.',
    activeIngredients: ['Metformin Hydrochloride IP (500mg)'],
    batchNumber: 'HC-MED-2026-22',
    licenseNumber: 'DL-20B/21B-8902',
    inStock: true,
    requiresPrescription: true,
  },
  {
    id: 'immuno-c-effervescent',
    name: 'Immuno-C Bio-Zinc Effervescent',
    category: 'medicines',
    categoryLabel: 'Medicines',
    tag: 'Immunity',
    tagColor: 'bg-[#1E6F43] text-white',
    subtitle: 'Amla Bio-Vitamin C & Elemental Zinc • 20 Tabs',
    price: 349,
    originalPrice: 450,
    rating: 4.8,
    reviewsCount: 189,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvHieHYzz7JZNJeXj9Ib3CaFzj16HNGivUMlj2mnEs231f_FuxNy3syLgAe7fX9548HNWLWDa8DIItALiRM5hh3VPuYf5QyqqpdbOge8PysssHUNU_ojwEl7SnpNmioMpa8AaAWGNb1eMQiwgZg3cQnI8tkqVjx8bSooyyOO41_7W7FARatx3rlcmJ71B7P9InBYDRj-Oym8tgddWDrmLlSCzNNKvp4dmQ9G5fYhESmI3j4ySgYFD5',
    description: 'Natural bio-fermented Vitamin C derived from wild Amla with chelated Zinc for rapid systemic bioavailability and white blood cell defense.',
    dosage: 'Dissolve 1 tablet in 200ml cold water once daily following breakfast.',
    activeIngredients: ['Standardized Phyllanthus Emblica (1000mg)', 'Zinc Bisglycinate (15mg)', 'Vitamin D3 (400 IU)'],
    batchNumber: 'HC-MED-2026-14',
    licenseNumber: 'FSSAI-11221334000456',
    inStock: true,
    requiresPrescription: false,
  },
  {
    id: 'paracetamol-650-relief',
    name: 'Paracetamol 650mg Fast-Action',
    category: 'medicines',
    categoryLabel: 'Medicines',
    tag: 'Fever & Pain',
    tagColor: 'bg-[#2B1B17] text-white',
    subtitle: 'Rapid Antipyretic & Analgesic • 30 Tablets',
    price: 110,
    originalPrice: 145,
    rating: 4.9,
    reviewsCount: 420,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUhq3klpPY1x8z7qi1L-l98a5QfNMRUkL6kL5KQqT6lj8Cep5B23yHog5NQLywFT78wAzWMTt3gX7zRWmbawfhEk6b2e51AbyAfTkKQgEIwLTqSwXpO7Ec5iY-zvFdstV3T-0YXzmoTZ3ns_ZyNb9ZGkmRvndpd_3fIxibHkZ_37SuJY1X7i12luonkNUudSMQe7CqxoAos3joY694t25qZIheHPgzecKuV7RHtksrQ2_GJhIJEb1m',
    description: 'High-purity therapeutic formulation providing effective relief from acute pyrexia, severe tension headaches, and musculoskeletal inflammation.',
    dosage: '1 tablet every 6 to 8 hours as needed. Do not exceed 4 tablets in 24 hours.',
    activeIngredients: ['Paracetamol IP (650mg)'],
    batchNumber: 'HC-MED-2026-31',
    licenseNumber: 'DL-20B/21B-4512',
    inStock: true,
    requiresPrescription: false,
  },

  // SECTION 2: SURGICAL EQUIPMENT
  {
    id: 'digital-bp-monitor',
    name: 'Digital Upper Arm BP Monitor',
    category: 'surgical',
    categoryLabel: 'Surgical Equipment',
    tag: 'Clinical Certified',
    tagColor: 'bg-[#1E6F43] text-white',
    subtitle: 'Intellisense Cuff & Dual Memory Tracker',
    price: 1850,
    originalPrice: 2450,
    rating: 4.95,
    reviewsCount: 380,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd9RcvzAUUfPpcQy9X7EpP3ZcYLNNpnEIo4rffnRxWha61TnGD_fhSS0887efUC1vOsBoXBw8vRt_HTrBw-G0c04zzkSkMJ6TxEqEbnbAA3owo2LWy9v2HVXPZSnPq77Vb462_HJa97q9d9K3xp9sRgJM9iF_6BzrUWQNRl5k_iwF7N0ktXfm2LLq2I4L9ZELSDPqOyrMMeyXJhVfOEXCnWX5odYKqb2PGr9LKb5jhVv_Wgk8J7Wno',
    description: 'Hospital-grade automated oscillometric blood pressure monitor with arrhythmia detection, comfort-inflation cuff (22-42cm), and 99-reading dual patient memory.',
    dosage: 'Sit relaxed for 5 minutes; place cuff 2cm above elbow crease and press one-touch start.',
    activeIngredients: ['Precision Pressure Transducer', 'Latex-Free Clinical Cuff', 'USB-C / Battery Powered'],
    batchNumber: 'HC-SURG-2026-01',
    licenseNumber: 'MD-CDSCO-2024-9182',
    inStock: true,
    requiresPrescription: false,
  },
  {
    id: 'pulse-oximeter-oled',
    name: 'Fingertip Pulse Oximeter OLED',
    category: 'surgical',
    categoryLabel: 'Surgical Equipment',
    tag: 'Essential Diagnostic',
    tagColor: 'bg-[#2B1B17] text-[#FAF7F2]',
    subtitle: 'Dual-Color High Definition Display with Plethysmograph',
    price: 799,
    originalPrice: 1200,
    rating: 4.9,
    reviewsCount: 290,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfmSwBYVKcQ5CbK7Tcj0jMQbVBGhGRMJVUuQtWMESQsFNFKup0ujkfeY7i5y2uhweeGFTnClxiTFRBJ2nVsKux40X2xzYnAl_Q1nujSlIYs5lOv7mf1NE2EboKSgDTPxepDdveBVQxGJzbLGHtno-26dW8We4CrAnaPNmUFoJ0JO9UlMsT_eKwZO4oTJmEOwDLmQd00riZuesNjCQkPlD9MrIhfCfiIao70tywoCJIzlB8al01g2xw',
    description: 'Instant, reliable measurement of arterial blood oxygen saturation (SpO2) and pulse rate (PR). Features multidirectional rotation and auditory hypoxemia warning.',
    dosage: 'Insert clean dry finger into optical sensor chamber; results render in 6 seconds.',
    activeIngredients: ['Dual Wavelength Photodiode Sensor', 'Anti-Shake Processing Algorithm'],
    batchNumber: 'HC-SURG-2026-05',
    licenseNumber: 'MD-CDSCO-2024-8172',
    inStock: true,
    requiresPrescription: false,
  },
  {
    id: 'compressor-nebulizer-kit',
    name: 'Heavy-Duty Compressor Nebulizer',
    category: 'surgical',
    categoryLabel: 'Surgical Equipment',
    tag: 'Respiratory Care',
    tagColor: 'bg-[#8C5A46] text-white',
    subtitle: 'Ultra-Fine Micron Mist with Child & Adult Masks',
    price: 1650,
    originalPrice: 2200,
    rating: 4.85,
    reviewsCount: 174,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf0_Mw8PJsyLPLnUp0vD1R1U4OZyW--LvKPoUYUQfmsT9oJ93U953sAKbi-hqnAuO8dJD2hSfHT4CBlzP3LDiNOw6tMtIy_39TTgn6lig3osljw-nGs3mdUbN3yEyq60MECvVp1qg0YVPhhCnuD_9dzrYO8gWuJkP6L5AymBnoKZXMzayBiaoVHCZLWBJ0C41AZcGUOSufnYXZiPeOp8s0bR3caxmYI-o4Ds4RUQYb4RrHCDzvjuNy',
    description: 'Medical-grade continuous compressor aerosol system converting bronchodilator fluids into breathable particles (<3 microns) for asthma, bronchitis, and respiratory rehabilitation.',
    dosage: 'Pour prescribed medication into chamber, connect tubing and breathe steadily for 10-15 minutes.',
    activeIngredients: ['Oil-Free Piston Compressor Motor', 'Medical PVC Tubing', 'Dual Ergonomic Masks'],
    batchNumber: 'HC-SURG-2026-11',
    licenseNumber: 'MD-CDSCO-2023-7721',
    inStock: true,
    requiresPrescription: false,
  },
  {
    id: 'sterile-surgical-dressing-pack',
    name: 'Sterile Surgical Dressing Pack',
    category: 'surgical',
    categoryLabel: 'Surgical Equipment',
    tag: 'Hospital Pack',
    tagColor: 'bg-[#264E36] text-white',
    subtitle: '100% Cotton Gauze Swabs & Hypoallergenic Tape (100 Pcs)',
    price: 490,
    originalPrice: 650,
    rating: 4.9,
    reviewsCount: 160,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBmpv9sscldtNpyImaLoXhIP7MqR4_alPyhVyLPLIXi6QuMyBy9B7Dbn5Vu-8VNQlhlfgDdQ5x_KGnVo59yvMnYmk21Ff4OuQ7rY-7xdXNO66JEV7r6tbHcHUmblabaWvASrbxsVU5P1eXZ9tCawPAe7SqiY6nwrflr7H4jCTBOmE5fZavcGt2UnVxBlHYNyUXmdVNnUHxN6HGaXcrOvJYOtTj_JOZcD3y7Tnoyl7CnOoCm59SNAo7',
    description: 'EO-sterilized medical wound dressing kit containing 12-ply absorbent cotton gauze pads, non-adherent dressing pads, and microporous paper tape for postoperative and trauma care.',
    dosage: 'Cleanse wound thoroughly with antiseptic and apply sterile pad; secure with surgical tape.',
    activeIngredients: ['100% Pure Bleached Cotton (BP/USP)', 'Zinc Oxide Adhesive Tape'],
    batchNumber: 'HC-SURG-2026-19',
    licenseNumber: 'MD-CDSCO-2025-4109',
    inStock: true,
    requiresPrescription: false,
  },

  // SECTION 3: COSMETICS
  {
    id: 'pure-aloe-skin-gel',
    name: 'Pure Aloe & Cold-Pressed Neem Gel',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    tag: 'Organic Derma',
    tagColor: 'bg-[#264E36] text-white',
    subtitle: 'Hydrating Botanical Soother • 200ml Glass Jar',
    price: 449,
    originalPrice: 550,
    rating: 5.0,
    reviewsCount: 412,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2wB77iQILvJG13cOolAx_4J0COTZnjqrjitZNlNN9DbtkemQi92b7XdaNffKq3Qixi4o5a5KWdiHn1P61RQaV-PTsNI47Du2N5Ejmf62TqhYk2xu1gYfolNnL-ATOX7iUPg6k3oRygSUeUZ7DQHLjMBhT-94EQS0WpZ1k1bavwF93ggfqR1uxlT0GCBIzzXrtS4cap4bPO2Y-DtPtmvenHAFUfmexpL81hEOjfwVar8VPUz10IMuj',
    description: 'Cold-pressed inner-fillet aloe vera gel enriched with organic neem and rosewater hydrosol. Instantly cools erythema, locks moisture, and reinforces the compromised epidermal barrier.',
    dosage: 'Massage gently onto cleansed skin morning and night or after sun exposure.',
    activeIngredients: ['Organic Aloe Barbadensis Leaf Juice (98%)', 'Azadirachta Indica Hydrosol (1.5%)', 'Vitamin E (Tocopherol)'],
    batchNumber: 'HC-COS-2026-02',
    licenseNumber: 'COS-KA-BLR-2024-88',
    inStock: true,
    requiresPrescription: false,
  },
  {
    id: 'botanical-kumkumadi-oil',
    name: 'Kumkumadi Tailam Youth Elixir',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    tag: 'Artisanal Glow',
    tagColor: 'bg-[#D97706] text-white',
    subtitle: 'Kashmiri Saffron & Sandalwood • 30ml Dropper',
    price: 1290,
    originalPrice: 1550,
    rating: 4.95,
    reviewsCount: 310,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC93wWEvQ-0DwfVmMhCv1dh7ahc__pxLEzHDkHKNTIIcpOd7XYrU4tj-8T6dAJwYOkKdOZMymcz9-vEBcJcZ6mP1SpL4Ikx0k4Kg90hI8ktbwcXGYUr_yWUnRjuiL-rRIvSDPMY0w2P7xHU-T4TcHneiDPOy92awmNIcHuukGq9NBV7mZJaIixmEy8PPq9k-JW5DonGwkOlbUPyg6Jq6mW058aOwa6yy7XG1NfvXvu7m9boXijxHLvv',
    description: 'Precious facial elixir slow-simmered with Grade-A Kashmiri Mogra Saffron, Red Sandalwood, and pure sesame oil base to diminish hyperpigmentation and illuminate tone.',
    dosage: 'Warm 3 to 4 drops between clean palms and press gently into damp face before retiring.',
    activeIngredients: ['Crocus Sativus (Kashmiri Saffron)', 'Pterocarpus Santalinus', 'Vetiveria Zizanioides'],
    batchNumber: 'HC-COS-2026-03',
    licenseNumber: 'COS-KA-BLR-0210',
    inStock: true,
    requiresPrescription: false,
  },
  {
    id: 'spf50-mineral-sunscreen',
    name: 'SPF 50+ Invisible Zinc Sunscreen',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    tag: 'Derm Shield',
    tagColor: 'bg-[#8C5A46] text-white',
    subtitle: 'Broad Spectrum PA++++ Matte Fluid • 100ml',
    price: 680,
    originalPrice: 850,
    rating: 4.88,
    reviewsCount: 198,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvHieHYzz7JZNJeXj9Ib3CaFzj16HNGivUMlj2mnEs231f_FuxNy3syLgAe7fX9548HNWLWDa8DIItALiRM5hh3VPuYf5QyqqpdbOge8PysssHUNU_ojwEl7SnpNmioMpa8AaAWGNb1eMQiwgZg3cQnI8tkqVjx8bSooyyOO41_7W7FARatx3rlcmJ71B7P9InBYDRj-Oym8tgddWDrmLlSCzNNKvp4dmQ9G5fYhESmI3j4ySgYFD5',
    description: 'Non-comedogenic, zero-white-cast mineral sunscreen with 18% micronized Zinc Oxide, Centella Asiatica, and Niacinamide for defense against photoaging and blue light.',
    dosage: 'Apply generous two-finger length amount as the final morning step 15 minutes before sun exposure.',
    activeIngredients: ['Micronized Zinc Oxide (18%)', 'Centella Asiatica Extract (3%)', 'Niacinamide (2%)'],
    batchNumber: 'HC-COS-2026-17',
    licenseNumber: 'COS-KA-BLR-2025-114',
    inStock: true,
    requiresPrescription: false,
  },
  {
    id: 'ceramide-barrier-cream',
    name: 'Ceramide Complex Intensive Cream',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    tag: 'Barrier Repair',
    tagColor: 'bg-[#2B1B17] text-[#FAF7F2]',
    subtitle: '5 Essential Ceramides + Hyaluronic Acid • 100g',
    price: 799,
    originalPrice: 999,
    rating: 4.92,
    reviewsCount: 260,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2wB77iQILvJG13cOolAx_4J0COTZnjqrjitZNlNN9DbtkemQi92b7XdaNffKq3Qixi4o5a5KWdiHn1P61RQaV-PTsNI47Du2N5Ejmf62TqhYk2xu1gYfolNnL-ATOX7iUPg6k3oRygSUeUZ7DQHLjMBhT-94EQS0WpZ1k1bavwF93ggfqR1uxlT0GCBIzzXrtS4cap4bPO2Y-DtPtmvenHAFUfmexpL81hEOjfwVar8VPUz10IMuj',
    description: 'Clinical restorative lipid cream formulated with identical human skin ceramides (EOP, NP, AP), cholesterol, and fatty acids to heal dryness, irritation, and compromised barriers.',
    dosage: 'Smooth over cleansed face and dry areas twice daily.',
    activeIngredients: ['Ceramide Complex 1, 3, 6-II', 'Multi-Molecular Hyaluronic Acid', 'Oat Beta Glucan'],
    batchNumber: 'HC-COS-2026-25',
    licenseNumber: 'COS-KA-BLR-2025-201',
    inStock: true,
    requiresPrescription: false,
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Priya Sharma',
    role: 'Verified Patient',
    location: 'Bengaluru',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACBUJ7Hm0jzEXD8HAAmImK1rvN5z_rEGAaSYsoin6kccS-UHTdelHmHSj5CcnnzRea7Jkm-LgjsXsndYgmiJ7lRw4geyJJnuSv2s6ig2kTB0-1vrxhbkwMi0JEuHpDSFOqFBePfihfOAmpdw50lx4cCKH-gIFuiG5ZvAxYFEieb9IX3P16D2T2s9bUQAFnJV6Cl4BYL0FY3lbpRug3RuuNEWkSkG4IkXj-TkMndxl4XmFP2laW_cGY',
    rating: 5,
    quote: 'Heal Care is our family pharmacy. We order our blood pressure monitor and monthly diabetic medicines over WhatsApp, and they arrive promptly at our doorstep within 2 hours.',
    verified: true,
  },
  {
    id: 'test-2',
    name: 'Rohan Das',
    role: 'Verified Customer',
    location: 'Mumbai',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIkf95OKlVDfecABCCb9GWrjRDfX0tOntFvR5-iUgyf3Nu5djtCOy1yP2-a-G3oFxpE1kaJeEBqEWKSsHFo6cML8s18ssB77IX7E0-fTVgAEpIaopPgiXpH6hgkHShny6RlDgYMncGwjpZDlLieD23crHjiyOX1FWi_xlYMZqjC82GK4HigxGBs5Datp3CtXY_v8K0lSCKsyqplBUfABgsS4Q1612qG_Hp1mv19nVZW-XtwnYHQfvQ',
    rating: 5,
    quote: 'Excellent selection of certified surgical supplies and authentic derma cosmetics. Whenever I have a question about usage, their team is just a quick WhatsApp message or call away.',
    verified: true,
  },
  {
    id: 'test-3',
    name: 'Anjali Hegde',
    role: 'Verified Patient',
    location: 'Pune',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr1Dd2L7B90Z_9PGJscoM9quLdPnGjbOl4gZAB64ztlhYRAGlLE1uw90ArwA2K4m5XWwS70vLlSVt5B7hGHkIU0MUYNYyKpRUrVNAXlCY5muyt7w8_lhJFb6O-ssRZ81ADiWob4Ls_IWexjmqmDrdqU8cHF7uNPEHFnwa_iuD9iXWLFNG6EYm8hDcjE3To5KisTR4jFTppIXXQV0X0eHjS3Windh9rUyvHy3vwmvF9sGtClnMMgX30',
    rating: 5,
    quote: 'The prescription photo upload on WhatsApp makes ordering effortless. The pharmacists at Heal Care are responsive, empathetic, and always ensure accurate batch verification.',
    verified: true,
  }
];

export const DRUG_HERB_INTERACTIONS: DrugInteraction[] = [
  {
    drug: 'Blood Thinners (Warfarin / Aspirin / Clopidogrel)',
    herb: 'Curcumin / High-Dose Turmeric',
    severity: 'caution',
    pharmacistAdvice: 'Both exhibit mild anti-platelet aggregation effects. Moderate culinary use is safe; avoid high-dose (>1000mg) curcumin supplements without periodic INR monitoring.',
    spacingRecommendation: 'Take 3 hours apart from anti-coagulant medications.',
    mechanism: 'Inhibition of thromboxane A2 and cyclooxygenase enzymes.'
  },
  {
    drug: 'Metformin & Glimepiride (Diabetes)',
    herb: 'Gymnema Sylvestre (Gudmar) / Karela',
    severity: 'moderate',
    pharmacistAdvice: 'Beneficial synergistic blood glucose lowering. However, monitor fasting sugars closely during the first 14 days to prevent unexpected hypoglycemia.',
    spacingRecommendation: 'Take herbs 30 minutes before meals; take Metformin with or immediately after meals.',
    mechanism: 'Regeneration of islet beta-cells coupled with peripheral glucose uptake.'
  },
  {
    drug: 'Thyroid Hormone (Levothyroxine)',
    herb: 'Ashwagandha (KSM-66)',
    severity: 'mild',
    pharmacistAdvice: 'Ashwagandha can naturally stimulate endogenous T3 and T4 synthesis. Patients with hypothyroid on replacement therapy should recheck TSH levels after 8 weeks.',
    spacingRecommendation: 'Take Levothyroxine on empty stomach upon waking. Take Ashwagandha in evening after dinner.',
    mechanism: 'Mild stimulation of thyroidal peroxidase and glandular secretory activity.'
  },
  {
    drug: 'Antihypertensives (Amlodipine / Telmisartan)',
    herb: 'Arjuna Bark Extract',
    severity: 'moderate',
    pharmacistAdvice: 'Arjuna possesses natural inotropic properties. Safe co-administration, but monitor morning BP to ensure values do not drop below normal ranges.',
    spacingRecommendation: 'Administer 2 hours apart.',
    mechanism: 'Endothelial nitric oxide upregulation and cardio-protective glycosides.'
  }
];

export const SAMPLE_PRESCRIPTIONS = [
  {
    id: 'sample-rx-1',
    doctorName: 'Dr. Vikram Deshmukh, MD (Medicine)',
    regNo: 'KMC / 48291 / 2008',
    clinic: 'City Care Specialty Clinic',
    date: '04 Oct 2026',
    patientName: 'Arunav Sengupta (54y / M)',
    diagnosis: 'Type 2 Diabetes Mellitus & Hypertension',
    items: [
      { name: 'Metformin Hydrochloride 500mg SR', qty: '60 Tablets', instructions: '1 Tab twice daily after meals' },
      { name: 'Paracetamol 650mg Fast-Action', qty: '30 Tablets', instructions: '1 Tab as needed for headache' },
      { name: 'Digital Upper Arm BP Monitor', qty: '1 Unit', instructions: 'Daily morning and evening tracking' }
    ]
  },
  {
    id: 'sample-rx-2',
    doctorName: 'Dr. Radhika Verma, MD (Dermatology)',
    regNo: 'DMC / 09214 / 2012',
    clinic: 'Heal Care Clinical Skin Center',
    date: '02 Oct 2026',
    patientName: 'Meera Krishnan (32y / F)',
    diagnosis: 'Dry Sensitive Skin & Post-Inflammatory Erythema',
    items: [
      { name: 'Ceramide Complex Intensive Cream', qty: '100g Jar', instructions: 'Apply twice daily on clean skin' },
      { name: 'SPF 50+ Invisible Zinc Sunscreen', qty: '100ml Fluid', instructions: 'Apply every morning before sun' },
      { name: 'Immuno-C Bio-Zinc Effervescent', qty: '20 Tablets', instructions: '1 Tab dissolved in water daily' }
    ]
  }
];
