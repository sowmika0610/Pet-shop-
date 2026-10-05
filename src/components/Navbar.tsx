import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, X, Menu } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  activeSection,
  onNavigate,
}) => {
  const [promoDismissed, setPromoDismissed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Shop Catalog', id: 'catalog' },
    { label: 'Grooming Spa', id: 'grooming' },
    { label: 'Diet Matcher', id: 'diet-matcher' },
    { label: 'Rescue Sanctuary', id: 'rescue' },
    { label: 'Reviews', id: 'reviews' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3D9]">
      {/* Slim Promotional Bar (≤ 40px) */}
      {!promoDismissed && (
        <div className="relative bg-[#2C2925] text-[#F3EFE9] text-xs py-2 px-4 flex items-center justify-center tracking-wide">
          <span className="truncate pr-6 text-center">
            Complimentary botanical gift & artisanal delivery on all orders over $65 · Use code <strong className="font-semibold text-[#D8CEBE]">FREESHIP</strong>
          </span>
          <button
            onClick={() => setPromoDismissed(true)}
            aria-label="Dismiss banner"
            className="absolute right-3 p-1 text-[#D8CEBE] hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single element wordmark */}
        <button
          onClick={() => handleNavClick('hero')}
          className="text-left font-serif text-2xl sm:text-2xl font-semibold tracking-tight text-[#1F1E1B] hover:text-[#50453B] transition-colors"
        >
          Paws &amp; Meadow
        </button>

        {/* Zone 2: 4-6 nav links, 1-2 word labels, single-line text links with hover underlines */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#504B44]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors relative py-1 hover:text-[#1F1E1B] whitespace-nowrap ${
                  isActive ? 'text-[#1F1E1B] font-semibold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C6D58]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#504B44] hover:text-[#1F1E1B] hover:bg-[#EFEAE2] rounded-full transition-colors"
            title="Search products"
            aria-label="Search products"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenWishlist}
            className="p-2 text-[#504B44] hover:text-[#1F1E1B] hover:bg-[#EFEAE2] rounded-full transition-colors relative"
            title="Saved items"
            aria-label="Saved items"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#8C6D58] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#2C2925] text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-[#433E38] transition-colors whitespace-nowrap"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-[#433E38] px-1.5 py-0.5 rounded text-[11px] font-bold tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#504B44] hover:text-[#1F1E1B] lg:hidden"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE3D9] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left py-2.5 text-base font-medium text-[#38342E] hover:text-[#1F1E1B] border-b border-[#F0EBE3]"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex gap-3">
            <button
              onClick={() => {
                onOpenCart();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 text-center text-sm font-medium bg-[#2C2925] text-white rounded-lg"
            >
              View Bag ({cartCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
