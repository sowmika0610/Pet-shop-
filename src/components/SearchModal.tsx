import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const matches = searchTerm.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.dietaryTags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl border border-[#EAE3D9] shadow-2xl p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center">
          <Search className="w-5 h-5 absolute left-3 text-[#7C6552]" />
          <input
            autoFocus
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search companion food, shampoo, beds, supplements..."
            className="w-full pl-10 pr-10 py-3 bg-[#FAF8F5] border border-[#DCD5CA] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8C6D58]"
          />
          <button
            onClick={onClose}
            className="absolute right-3 p-1 text-[#7C6552] hover:text-[#1F1E1B]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs text-[#7C6552]">
          <span>Popular:</span>
          {['Salmon Kibble', 'Lavender Shampoo', 'Orthopedic Bed', 'Duck Bites', 'Green Lipped Mussel'].map(
            (term) => (
              <button
                key={term}
                onClick={() => setSearchTerm(term)}
                className="px-2 py-0.5 bg-[#FAF8F5] hover:bg-[#EFEAE2] rounded border border-[#EAE3D9] text-[#433E38] transition-colors cursor-pointer"
              >
                {term}
              </button>
            )
          )}
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto space-y-2 pt-2 border-t border-[#EAE3D9]">
          {searchTerm.trim() ? (
            matches.length > 0 ? (
              matches.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#EAE3D9] transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shrink-0 border border-[#E0D7CB]">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#1E1C1A] truncate">{p.name}</h4>
                    <p className="text-[11px] text-[#7C6552]">
                      {p.category} · ${p.price.toFixed(2)}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7C6552]" />
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-[#7C6552]">
                No items matched &ldquo;{searchTerm}&rdquo;. Try another term.
              </div>
            )
          ) : (
            <div className="text-center py-6 text-xs text-[#7C6552]">
              Type a product name, ingredient, or companion condition above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
