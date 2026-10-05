import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onAddToCart: (product: Product) => void;
  onRemoveFromWishlist: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onAddToCart,
  onRemoveFromWishlist,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl border border-[#EAE3D9] shadow-2xl p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#5C564E] hover:text-[#1F1E1B] rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#8C6D58] fill-[#8C6D58]" />
          <h3 className="font-serif text-2xl text-[#1E1C1A]">Saved Essentials</h3>
          <span className="text-xs text-[#7C6552] tabular-nums font-semibold">
            ({wishlistProducts.length})
          </span>
        </div>

        <div className="max-h-[60vh] overflow-y-auto space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#5C564E] space-y-2">
              <p>No saved favorites yet.</p>
              <p>Click the heart icon on any product to save it for your companion.</p>
            </div>
          ) : (
            wishlistProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between gap-3 p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3D9]"
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-white shrink-0">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-[#1E1C1A] truncate">{p.name}</h4>
                  <div className="text-[11px] text-[#7C6552]">
                    ${p.price.toFixed(2)} · {p.weightOrSize}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(p);
                    }}
                    className="p-2 bg-[#2C2925] text-white rounded-lg hover:bg-[#433E38] transition-colors"
                    title="Add to bag"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(p)}
                    className="p-2 text-[#9E9589] hover:text-[#993434] transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlistProducts.length > 0 && (
          <div className="pt-2 border-t border-[#EAE3D9] flex justify-end">
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => onAddToCart(p));
                onClose();
              }}
              className="px-5 py-2.5 bg-[#2C2925] text-white text-xs font-semibold rounded-lg hover:bg-[#433E38] transition-colors"
            >
              Add All to Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
