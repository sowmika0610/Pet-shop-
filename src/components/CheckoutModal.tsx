import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, CreditCard, Banknote, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<'shipping' | 'confirmation'>('shipping');
  const [orderNumber, setOrderNumber] = useState('');

  // Shipping form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [petCompanionName, setPetCompanionName] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'applepay'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 65;
  const shippingCost = isFreeShipping ? 0 : 7.50;
  const tax = subtotal * 0.06;
  const total = subtotal + shippingCost + tax;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = `PM-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(generatedOrderNum);
    setStep('confirmation');
  };

  const handleFinish = () => {
    onOrderComplete();
    onClose();
    setStep('shipping');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#EAE3D9] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#5C564E] hover:text-[#1F1E1B] rounded-full z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'shipping' ? (
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#7C6552] font-semibold">
                Express Checkout
              </div>
              <h3 className="font-serif text-2xl text-[#1E1C1A] mt-1">
                Companion Shipping &amp; Delivery
              </h3>
              <p className="text-xs text-[#5C564E] mt-0.5">
                Every package includes a complimentary personalized surprise treat for your pet!
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-3 text-xs">
              <div className="font-semibold text-[#1E1C1A] border-b border-[#EAE3D9] pb-1">
                1. Customer &amp; Pet Information
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#2C2925] font-medium mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#2C2925] font-medium mb-1">Companion’s Name (for treat tag)</label>
                  <input
                    type="text"
                    value={petCompanionName}
                    onChange={(e) => setPetCompanionName(e.target.value)}
                    placeholder="e.g. Kona (Golden)"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#2C2925] font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eleanor@example.com"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#2C2925] font-medium mb-1">Mobile Phone (for delivery SMS) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 432-8921"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="font-semibold text-[#1E1C1A] border-b border-[#EAE3D9] pb-1 pt-3">
                2. Shipping Destination
              </div>
              <div>
                <label className="block text-[#2C2925] font-medium mb-1">Street Address *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="742 Evergreen Terrace, Apt 3B"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#2C2925] font-medium mb-1">City / Region *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Portland"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#2C2925] font-medium mb-1">Postal Code *</label>
                  <input
                    type="text"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="97201"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Selection */}
              <div className="font-semibold text-[#1E1C1A] border-b border-[#EAE3D9] pb-1 pt-3">
                3. Payment Method
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#8C6D58] bg-[#FAF8F5] font-bold text-[#1E1C1A]'
                      : 'border-[#EAE3D9] text-[#5C564E]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-[#8C6D58]" />
                  <span>Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                    paymentMethod === 'applepay'
                      ? 'border-[#8C6D58] bg-[#FAF8F5] font-bold text-[#1E1C1A]'
                      : 'border-[#EAE3D9] text-[#5C564E]'
                  }`}
                >
                  <span className="block font-bold text-xs mb-1">&#63743; Pay</span>
                  <span>Digital Wallet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-[#8C6D58] bg-[#FAF8F5] font-bold text-[#1E1C1A]'
                      : 'border-[#EAE3D9] text-[#5C564E]'
                  }`}
                >
                  <Banknote className="w-4 h-4 mx-auto mb-1 text-[#5A7352]" />
                  <span>Pay on Delivery</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3D9] space-y-2">
                  <div>
                    <label className="block text-[#2C2925] font-medium mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2 bg-white border border-[#DCD5CA] rounded focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[#2C2925] font-medium mb-1">Expires</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full p-2 bg-white border border-[#DCD5CA] rounded focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#2C2925] font-medium mb-1">CVC</label>
                      <input
                        type="password"
                        placeholder="123"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full p-2 bg-white border border-[#DCD5CA] rounded focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-3 bg-[#EDF4EB] text-[#2C4825] rounded-xl text-[11px] leading-relaxed">
                  <strong>Cash on Delivery (COD) Activated:</strong> Hand the exact total of <strong>${total.toFixed(2)}</strong> to our courteous courier upon doorstep inspection.
                </div>
              )}
            </div>

            {/* Total breakdown */}
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE3D9] flex justify-between items-center text-xs">
              <div>
                <span className="text-[#5C564E] block">Items in Order ({items.length})</span>
                <strong className="text-base text-[#1E1C1A] tabular-nums font-bold">
                  Total Due: ${total.toFixed(2)}
                </strong>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#2C2925] text-white text-xs font-semibold rounded-lg hover:bg-[#433E38] transition-colors cursor-pointer"
              >
                Place Companion Order
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation Receipt State */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#EDF4EB] text-[#3C6436] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-10 h-10" />
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-[#7C6552] font-semibold">
                Order Confirmed &amp; Dispatched to Pantry
              </div>
              <h3 className="font-serif text-3xl text-[#1E1C1A] mt-1">
                Thank You, {fullName || 'Valued Guardian'}!
              </h3>
              <p className="text-xs text-[#5C564E] mt-1 max-w-md mx-auto">
                Order <strong>#{orderNumber}</strong> has been received and is being carefully hand-packed with eco-insulation. Tracking updates sent to <strong>{email}</strong>.
              </p>
            </div>

            {/* Receipt card */}
            <div className="bg-[#FAF8F5] border border-[#EAE3D9] rounded-xl p-5 text-left text-xs space-y-3 max-w-lg mx-auto">
              <div className="flex justify-between border-b border-[#EAE3D9] pb-2">
                <span className="text-[#7C6552]">Order Reference:</span>
                <span className="font-mono font-bold text-[#1E1C1A]">{orderNumber}</span>
              </div>
              <div className="flex justify-between border-b border-[#EAE3D9] pb-2">
                <span className="text-[#7C6552]">Estimated Delivery:</span>
                <span className="font-semibold text-[#1E1C1A]">Within 2 Business Days</span>
              </div>
              <div className="flex justify-between border-b border-[#EAE3D9] pb-2">
                <span className="text-[#7C6552]">Deliver To:</span>
                <span className="text-[#1E1C1A] text-right truncate max-w-[240px]">
                  {address}, {city} {zipCode}
                </span>
              </div>
              <div className="space-y-1 pt-1">
                <span className="text-[#7C6552] block font-medium">Included Companion Items:</span>
                {items.map((i) => (
                  <div key={i.product.id} className="flex justify-between text-[#3D3730]">
                    <span>{i.product.name} (x{i.quantity})</span>
                    <span className="font-semibold tabular-nums">${(i.product.price * i.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-[#EAE3D9] flex justify-between text-sm font-bold text-[#1E1C1A]">
                <span>Total Paid:</span>
                <span className="tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            <div>
              <button
                onClick={handleFinish}
                className="px-8 py-3 bg-[#2C2925] text-white text-xs font-semibold rounded-lg hover:bg-[#433E38] transition-colors"
              >
                Return to Storefront
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
