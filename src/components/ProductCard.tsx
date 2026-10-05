import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [imgError, setImgError] = useState(false);
  const [addedRecently, setAddedRecently] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 1600);
  };

  const formatPetType = (pt: string) => {
    switch (pt) {
      case 'dog':
        return 'For Dogs';
      case 'cat':
        return 'For Cats';
      case 'small_pet':
        return 'Small Animals';
      default:
        return 'All Companions';
    }
  };

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-white rounded-xl border border-[#EAE3D9] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer"
    >
      {/* Top Image Container (approx 68% height) */}
      <div className="relative aspect-[4/3] bg-[#F5F2EB] overflow-hidden">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-[#8C7E72] bg-[#EFECE5]">
            <ShoppingBag className="w-10 h-10 mb-2 stroke-1" />
            <span className="text-xs uppercase tracking-wider font-medium text-center">
              {product.name}
            </span>
          </div>
        )}

        {/* Subtle subtle single tag if any */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-[#3D3730] border border-[#E0D7CB] rounded">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
            isWishlisted
              ? 'bg-[#8C6D58] text-white shadow-sm'
              : 'bg-white/80 text-[#5C564E] hover:bg-white hover:text-[#1F1E1B]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View overlay button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 backdrop-blur-sm text-[#1F1E1B] text-xs font-semibold rounded-md shadow-sm hover:bg-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#5C564E]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Clean unboxed metadata with dot separator */}
          <div className="flex items-center gap-1.5 text-xs text-[#7C6552] uppercase font-medium tracking-wider">
            <span>{formatPetType(product.petType)}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{product.category}</span>
          </div>

          {/* Product Title */}
          <h3 className="mt-1 font-semibold text-sm sm:text-base text-[#1E1C1A] leading-snug line-clamp-1 group-hover:text-[#8C6D58] transition-colors">
            {product.name}
          </h3>

          <p className="mt-1 text-xs text-[#6B645B] line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Rating and price row */}
        <div className="pt-2 border-t border-[#F2ECE3] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#6B645B]">
            <Star className="w-3.5 h-3.5 fill-[#C7974E] text-[#C7974E]" />
            <span className="font-semibold text-[#1E1C1A] tabular-nums">{product.rating.toFixed(1)}</span>
            <span>({product.reviewCount})</span>
          </div>

          <div className="flex items-baseline gap-2">
            {product.originalPrice && (
              <span className="text-xs text-[#9E9589] line-through tabular-nums">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-base font-bold text-[#1E1C1A] tabular-nums">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Quick Add CTA */}
        <button
          onClick={handleAdd}
          className={`w-full py-2.5 px-4 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer ${
            addedRecently
              ? 'bg-[#476043] text-white'
              : 'bg-[#2C2925] text-white hover:bg-[#433E38]'
          }`}
        >
          {addedRecently ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added to Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
