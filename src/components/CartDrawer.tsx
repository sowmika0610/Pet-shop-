import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 65.0;
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'FREESHIP' || code === 'PAW10') {
      setAppliedPromo(code);
      setPromoCode('');
    } else {
      setPromoError('Invalid code. Try "PAW10" or "FREESHIP".');
    }
  };

  const discountAmount = appliedPromo === 'PAW10' ? subtotal * 0.1 : 0;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || appliedPromo === 'FREESHIP';
  const shippingCost = items.length === 0 ? 0 : isFreeShipping ? 0 : 7.50;
  const tax = (subtotal - discountAmount) * 0.06;
  const total = Math.max(0, subtotal - discountAmount + shippingCost + tax);

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EAE3D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8C6D58]" />
            <h3 className="font-serif text-xl text-[#1E1C1A]">Companion Bag</h3>
            <span className="text-xs text-[#7C6552] tabular-nums font-semibold">
              ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#5C564E] hover:text-[#1F1E1B] rounded-md transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#FAF8F5] px-5 py-3 border-b border-[#EAE3D9] text-xs">
          {isFreeShipping ? (
            <div className="text-[#3C6436] font-semibold flex items-center gap-1.5">
              <span>&#10003;</span>
              <span>You’ve unlocked Complimentary Artisanal Shipping!</span>
            </div>
          ) : (
            <div className="text-[#5C564E]">
              Add <strong className="text-[#1E1C1A] tabular-nums">${amountToFreeShipping.toFixed(2)}</strong> more for free chilled delivery.
            </div>
          )}
          <div className="w-full h-1.5 bg-[#EAE3D9] rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-[#8C6D58] transition-all duration-300 rounded-full"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 bg-[#FAF8F5] rounded-full flex items-center justify-center mx-auto text-[#8C7E72]">
                <ShoppingBag className="w-6 h-6 stroke-1" />
              </div>
              <h4 className="font-serif text-lg text-[#1E1C1A]">Your bag is currently empty</h4>
              <p className="text-xs text-[#5C564E] max-w-xs mx-auto">
                Explore our curated apothecary of cold-pressed feeds, botanical grooming balms, and orthopedic loungers.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-[#2C2925] text-white text-xs font-semibold rounded-lg hover:bg-[#433E38]"
              >
                Browse Provisions
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3D9]"
              >
                <div className="w-18 h-18 rounded-lg overflow-hidden bg-white shrink-0 border border-[#E0D7CB]">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[11px] text-[#7C6552] uppercase font-semibold">
                        {item.product.petType === 'all' ? 'All Pets' : item.product.petType} · {item.product.weightOrSize}
                      </div>
                      <h4 className="text-xs font-semibold text-[#1E1C1A] truncate mt-0.5">
                        {item.product.name}
                      </h4>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-[#9E9589] hover:text-[#993434] p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#F0EBE3]">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#DCD5CA] rounded bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#5C564E] hover:text-[#1F1E1B]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#5C564E] hover:text-[#1F1E1B]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-[#1E1C1A] tabular-nums">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#EAE3D9] bg-[#FAF8F5] space-y-3">
            {/* Promo Code input */}
            <div className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7C6552]" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon code (e.g. PAW10)"
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#DCD5CA] rounded-lg focus:outline-none uppercase"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3 py-1.5 bg-[#2C2925] text-white text-xs font-semibold rounded-lg hover:bg-[#433E38]"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <div className="text-[11px] text-[#3C6436] font-medium flex items-center justify-between">
                  <span>Code &apos;{appliedPromo}&apos; applied</span>
                  <button
                    onClick={() => setAppliedPromo(null)}
                    className="text-[#993434] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
              {promoError && (
                <div className="text-[11px] text-[#993434]">{promoError}</div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#5C564E] pt-2 border-t border-[#EAE3D9]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-semibold text-[#1E1C1A]">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#3C6436]">
                  <span>Discount (10%)</span>
                  <span className="tabular-nums">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Chilled Artisanal Shipping</span>
                <span className="tabular-nums">
                  {shippingCost === 0 ? (
                    <strong className="text-[#3C6436]">Free</strong>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax (6%)</span>
                <span className="tabular-nums">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1E1C1A] pt-2 border-t border-[#EAE3D9]">
                <span>Total Due</span>
                <span className="tabular-nums text-base">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={onCheckout}
              className="w-full py-3.5 px-4 bg-[#2C2925] text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-[#433E38] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#7C6552]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5A7352]" />
              <span>Bank-Grade 256-bit Secure Checkout &amp; Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
