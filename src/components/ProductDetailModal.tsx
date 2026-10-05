import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, RotateCcw, Plus, Minus, ShoppingBag, Heart, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'analysis'>('details');
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl border border-[#EAE3D9] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#5C564E] hover:text-[#1F1E1B] bg-white/80 hover:bg-white rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image & Badges (5 cols) */}
          <div className="md:col-span-5 bg-[#F5F2EB] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EAE3D9]">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white border border-[#E8E1D5]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-[#3D3730] border border-[#E0D7CB] rounded">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Quick Guarantees */}
            <div className="mt-6 pt-4 border-t border-[#E8E1D5] space-y-2 text-xs text-[#5C564E]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#8C6D58]" />
                <span>Complimentary artisanal delivery over $65</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8C6D58]" />
                <span>100% Palatability &amp; Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#8C6D58]" />
                <span>30-Day Hassle-Free Returns</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Species */}
              <div className="flex items-center gap-2 text-xs text-[#7C6552] uppercase font-semibold tracking-wider">
                <span>{product.petType === 'all' ? 'All Companions' : product.petType}</span>
                <span aria-hidden="true">·</span>
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>{product.weightOrSize}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1C1A] leading-tight">
                {product.name}
              </h2>

              <p className="text-sm text-[#5C564E] leading-relaxed">
                {product.subtitle}
              </p>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#C7974E] text-[#C7974E]'
                          : 'text-[#DCD5CA]'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-[#1E1C1A] tabular-nums">
                  {product.rating.toFixed(1)} / 5.0
                </span>
                <span className="text-[#7C6552]">({product.reviewCount} verified pet parents)</span>
              </div>

              {/* Price & Stock */}
              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#1E1C1A] tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#9E9589] line-through tabular-nums">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="ml-auto text-xs font-semibold text-[#3C6436] bg-[#EDF4EB] px-2.5 py-1 rounded">
                  In Stock &amp; Freshly Batched
                </span>
              </div>

              {/* Dietary Tags if present */}
              {product.dietaryTags && product.dietaryTags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs text-[#5C564E]">
                  <span className="font-medium text-[#7C6552]">Highlights:</span>
                  {product.dietaryTags.map((tag) => (
                    <span key={tag} className="text-[#3D3730] font-medium">
                      {tag} ·
                    </span>
                  ))}
                </div>
              )}

              {/* Quantity Stepper & Add to Bag */}
              <div className="pt-4 border-t border-[#EAE3D9] flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-[#DCD5CA] rounded-lg bg-[#FAF8F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-2.5 text-[#5C564E] hover:text-[#1F1E1B] disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-[#1E1C1A] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 text-[#5C564E] hover:text-[#1F1E1B]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Add CTA */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-6 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    added
                      ? 'bg-[#476043] text-white'
                      : 'bg-[#2C2925] text-white hover:bg-[#433E38]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag · ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-lg border border-[#DCD5CA] transition-colors ${
                    isWishlisted ? 'bg-[#8C6D58] text-white border-[#8C6D58]' : 'text-[#5C564E] hover:bg-[#FAF8F5]'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Tabs for Details, Ingredients, Analysis */}
              <div className="pt-4 border-t border-[#EAE3D9]">
                <div className="flex items-center gap-4 border-b border-[#EAE3D9] text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 transition-colors ${
                      activeTab === 'details'
                        ? 'text-[#1F1E1B] border-b-2 border-[#8C6D58]'
                        : 'text-[#7C6552] hover:text-[#1F1E1B]'
                    }`}
                  >
                    Key Features
                  </button>
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-2 transition-colors ${
                      activeTab === 'ingredients'
                        ? 'text-[#1F1E1B] border-b-2 border-[#8C6D58]'
                        : 'text-[#7C6552] hover:text-[#1F1E1B]'
                    }`}
                  >
                    Ingredients / Craft
                  </button>
                  {product.analysis && (
                    <button
                      onClick={() => setActiveTab('analysis')}
                      className={`pb-2 transition-colors ${
                        activeTab === 'analysis'
                          ? 'text-[#1F1E1B] border-b-2 border-[#8C6D58]'
                          : 'text-[#7C6552] hover:text-[#1F1E1B]'
                      }`}
                    >
                      Guaranteed Analysis
                    </button>
                  )}
                </div>

                <div className="pt-3 text-xs text-[#5C564E] leading-relaxed min-h-[90px]">
                  {activeTab === 'details' && (
                    <ul className="space-y-1.5 list-disc list-inside">
                      {product.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="text-[#3D3730]">
                          {feat}
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'ingredients' && (
                    <div className="space-y-2">
                      <p className="font-medium text-[#1E1C1A]">Full Transparency Manifest:</p>
                      <p className="text-[#433E38]">
                        {product.ingredientsOrMaterials.join(', ')}
                      </p>
                    </div>
                  )}

                  {activeTab === 'analysis' && product.analysis && (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {product.analysis.map((item, idx) => (
                        <div key={idx} className="flex justify-between border-b border-[#F0EBE3] pb-1">
                          <span className="text-[#6B645B]">{item.label}</span>
                          <span className="font-semibold text-[#1E1C1A] tabular-nums">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
