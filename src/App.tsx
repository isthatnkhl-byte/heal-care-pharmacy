import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ValuePillars } from './components/ValuePillars';
import { CuratedCategories } from './components/CuratedCategories';
import { PrescriptionUploadWorkflow } from './components/PrescriptionUploadWorkflow';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { DrugHerbCheckerModal } from './components/DrugHerbCheckerModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { StoreSanctuary } from './components/StoreSanctuary';
import { BookConsultationModal } from './components/BookConsultationModal';
import { Testimonials } from './components/Testimonials';
import { WhatsAppOrderModal } from './components/WhatsAppOrderModal';
import { Footer } from './components/Footer';
import { PRODUCTS, Product, STORE_INFO } from './data/apothecaryData';
import { MessageCircle, ShoppingBag, ArrowUp, Phone } from 'lucide-react';

export default function App() {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'ashwagandha-ksm66',
      name: 'Vedic Ashwagandha KSM-66',
      subtitle: 'Standardized Withanolides • 60 Vegan Caps',
      price: 599,
      quantity: 1,
      image: PRODUCTS[0].image,
      requiresPrescription: false,
    },
  ]);

  // Modals and Drawer state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCheckerOpen, setIsCheckerOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsAppPrefill, setWhatsAppPrefill] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState('HC-84291');

  // Search and Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          subtitle: product.subtitle,
          price: product.price,
          quantity,
          image: product.image,
          requiresPrescription: product.requiresPrescription,
        },
      ];
    });
  };

  const handleAddPrescriptionItemsToCart = (
    items: { name: string; qty: string; price: number }[]
  ) => {
    setCartItems((prev) => {
      const newItems: CartItem[] = items.map((item, idx) => ({
        id: `rx-item-${Date.now()}-${idx}`,
        name: item.name,
        subtitle: `Doctor Prescribed • ${item.qty}`,
        price: item.price,
        quantity: 1,
        requiresPrescription: true,
      }));
      return [...prev, ...newItems];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenWhatsApp = (customNote?: string) => {
    setWhatsAppPrefill(customNote || '');
    setIsWhatsAppOpen(true);
  };

  const handleOrderSuccess = (orderId: string) => {
    setActiveTrackingOrderId(orderId);
    setCartItems([]);
  };

  const scrollToPrescription = () => {
    const el = document.getElementById('prescription-order');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProducts = () => {
    const el = document.getElementById('featured-products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B1B17] flex flex-col w-full max-w-full overflow-x-hidden selection:bg-[#E2D7C8] selection:text-[#2B1B17]">
      {/* Top Header - Hidden during hero scroll animation, slides down and reveals as animation nears end */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 w-full max-w-full overflow-x-hidden pt-[env(safe-area-inset-top,0px)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isNavbarVisible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <Header
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenPrescription={scrollToPrescription}
          onOpenWhatsApp={() => handleOpenWhatsApp()}
          onOpenChecker={() => setIsCheckerOpen(true)}
          onOpenTracking={() => setIsTrackingOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            scrollToProducts();
          }}
        />
      </div>

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={scrollToProducts}
          onUploadClick={scrollToPrescription}
          onNearingEndChange={setIsNavbarVisible}
        />

        {/* Value Pillars Strip */}
        <ValuePillars />

        {/* Curated Disciplines & Categories */}
        <CuratedCategories
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
          }}
          onOpenPrescription={scrollToPrescription}
        />

        {/* Prescription Upload & Instant Pharmacist Call Section */}
        <PrescriptionUploadWorkflow
          onOpenWhatsApp={() =>
            handleOpenWhatsApp('Hello Pharmacist, I have an urgent prescription for 2-hour home delivery in Bengaluru.')
          }
          onAddPrescriptionItemsToCart={handleAddPrescriptionItemsToCart}
        />

        {/* Apothecary Dispensary Products */}
        <ProductCatalog
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onQuickView={(product) => setQuickViewProduct(product)}
        />

        {/* Verified Patient Reviews */}
        <Testimonials />

        {/* Flagship Physical Sanctuary Section */}
        <StoreSanctuary
          onOpenConsultationModal={() => setIsConsultationOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrescription={scrollToPrescription}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToProducts();
        }}
      />

      {/* Floating Bottom Action Buttons: Call & WhatsApp */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex flex-col gap-2.5 sm:gap-3 pointer-events-auto">
        {/* Floating Call Button */}
        <a
          href={`tel:${STORE_INFO.phoneRaw}`}
          className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white text-[#2B1B17] border border-[#EBE3D8] hover:bg-[#FAF7F2] shadow-xl flex items-center justify-center transition-all hover:scale-105"
          title={`Call Heal Care: ${STORE_INFO.phone}`}
          aria-label="Call Heal Care"
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#8C5A46]" />
        </a>

        {/* Floating WhatsApp Quick Action */}
        <button
          onClick={() => handleOpenWhatsApp()}
          className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#1E6F43] hover:bg-[#185A37] text-white shadow-xl flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
          title={`Direct WhatsApp with Heal Care (${STORE_INFO.whatsappNumber})`}
          aria-label="Chat with Heal Care"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
        </button>

        {/* Floating Bag Indicator on mobile/scroll */}
        {cartCount > 0 && !isCartOpen && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#2B1B17] hover:bg-[#1F1310] text-white shadow-xl flex items-center justify-center transition-all hover:scale-105 cursor-pointer relative"
            title="Open Dispensary Bag"
            aria-label="Open Dispensary Bag"
          >
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute -top-1 -right-1 min-w-[18px] sm:min-w-[20px] h-4.5 sm:h-5 px-1 bg-[#8C5A46] text-white rounded-full text-[9px] sm:text-[10px] font-bold flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          </button>
        )}
      </div>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onOpenWhatsAppCheckout={() => {
          setIsCartOpen(false);
          handleOpenWhatsApp();
        }}
        onExplore={scrollToProducts}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenWhatsApp={(text) => handleOpenWhatsApp(text)}
      />

      {/* Drug & Herb Interaction Checker Modal */}
      <DrugHerbCheckerModal
        isOpen={isCheckerOpen}
        onClose={() => setIsCheckerOpen(false)}
        onOpenWhatsApp={(text) => handleOpenWhatsApp(text)}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        orderId={activeTrackingOrderId}
      />

      {/* In-Store Sanctuary Consultation Booking Modal */}
      <BookConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Direct WhatsApp Ordering Modal */}
      <WhatsAppOrderModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        cartItems={cartItems}
        prefilledNote={whatsAppPrefill}
      />
    </div>
  );
}
