import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { GroomingScheduler } from './components/GroomingScheduler';
import { PetDietQuiz } from './components/PetDietQuiz';
import { AdoptionSanctuary } from './components/AdoptionSanctuary';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/mockData';
import { Product, CartItem, PetType } from './types';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pm_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default starter item for a warm preview experience
    return [
      { product: PRODUCTS[0], quantity: 1 }
    ];
  });

  // Wishlist state with localStorage persistence
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pm_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['prod-2'];
  });

  // UI state
  const [selectedPetType, setSelectedPetType] = useState<PetType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [notification, setNotification] = useState<{ message: string; sub?: string } | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pm_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pm_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  const showNotification = (message: string, sub?: string) => {
    setNotification({ message, sub });
    setTimeout(() => {
      setNotification(null);
    }, 2800);
  };

  // Cart actions
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showNotification(`Added to Bag: ${product.name}`, `${quantity} item(s) · $${(product.price * quantity).toFixed(2)}`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleOrderComplete = () => {
    setCartItems([]);
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showNotification(`Removed from saved list`, product.name);
        return prev.filter((id) => id !== product.id);
      } else {
        showNotification(`Saved to Wishlist`, product.name);
        return [...prev, product.id];
      }
    });
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  // Navigation scroll helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#242320]">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C2925] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-[#48423A] animate-in fade-in slide-in-from-bottom-4 duration-200 max-w-sm">
          <div className="w-8 h-8 rounded-full bg-[#476043] flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-white" />
          </div>
          <div className="text-xs">
            <div className="font-semibold text-white truncate">{notification.message}</div>
            {notification.sub && (
              <div className="text-[#A89F94] text-[11px] truncate">{notification.sub}</div>
            )}
          </div>
        </div>
      )}

      {/* Top Bar Contract (3 zones) */}
      <Navbar
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* Hero Campaign Section */}
        <Hero
          onSelectPetType={(type) => {
            setSelectedPetType(type);
          }}
          onExploreClick={() => handleNavigate('catalog')}
          onBookSpaClick={() => handleNavigate('grooming')}
        />

        {/* Curated Product Catalog */}
        <ProductCatalog
          products={PRODUCTS}
          selectedPetType={selectedPetType}
          onSelectPetType={setSelectedPetType}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onQuickView={(p) => setSelectedProduct(p)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Tailored Nutrition Matcher */}
        <PetDietQuiz
          products={PRODUCTS}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onQuickView={(p) => setSelectedProduct(p)}
        />

        {/* Fear-Free Botanical Grooming Scheduler */}
        <GroomingScheduler />

        {/* Rescue & Foster Sanctuary */}
        <AdoptionSanctuary />

        {/* Guardian Customer Reviews */}
        <ReviewsSection />

        {/* Care & Nutrition FAQ */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderComplete={handleOrderComplete}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onRemoveFromWishlist={handleToggleWishlist}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />
    </div>
  );
}
