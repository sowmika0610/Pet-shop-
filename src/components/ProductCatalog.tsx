import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Product, PetType, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  selectedPetType: PetType;
  onSelectPetType: (type: PetType) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedPetType,
  onSelectPetType,
  onAddToCart,
  onQuickView,
  wishlistIds,
  onToggleWishlist,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [activeDietTag, setActiveDietTag] = useState<string>('all');

  const categories: { label: string; value: ProductCategory }[] = [
    { label: 'All Essentials', value: 'all' },
    { label: 'Nutrition', value: 'food' },
    { label: 'Artisanal Treats', value: 'treats' },
    { label: 'Botanical Grooming', value: 'grooming' },
    { label: 'Orthopedic Beds', value: 'beds' },
    { label: 'Accessories & Play', value: 'accessories' },
    { label: 'Holistic Wellness', value: 'wellness' },
  ];

  const petTypeOptions: { label: string; value: PetType }[] = [
    { label: 'All Pets', value: 'all' },
    { label: 'Dogs', value: 'dog' },
    { label: 'Cats', value: 'cat' },
    { label: 'Small Animals', value: 'small_pet' },
  ];

  const dietTags = ['all', 'Grain-Free', 'Sensitive Tummy', 'Joint Support', 'Coat & Shine', 'Organic'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Pet type match
        if (selectedPetType !== 'all') {
          if (p.petType !== 'all' && p.petType !== selectedPetType) {
            return false;
          }
        }

        // Category match
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Dietary tag match
        if (activeDietTag !== 'all') {
          if (!p.dietaryTags?.some((t) => t.toLowerCase().includes(activeDietTag.toLowerCase()))) {
            return false;
          }
        }

        // Search query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchSub = p.subtitle.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchIngredients = p.ingredientsOrMaterials.some((ing) =>
            ing.toLowerCase().includes(q)
          );
          if (!matchName && !matchSub && !matchDesc && !matchIngredients) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [products, selectedPetType, selectedCategory, activeDietTag, searchQuery, sortBy]);

  const handleResetFilters = () => {
    onSelectPetType('all');
    setSelectedCategory('all');
    setActiveDietTag('all');
    onSearchChange('');
    setSortBy('featured');
  };

  return (
    <section id="catalog" className="py-14 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAE3D9] pb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#7C6552] font-semibold mb-1">
              Curated Apothecary &amp; Provisions
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#1E1C1A]">
              Conscious Supplies for Daily Vitality
            </h2>
            <p className="mt-1 text-sm text-[#5C564E]">
              Every formulation is tested for pesticide purity, heavy metals, and animal palatability.
            </p>
          </div>

          <div className="text-xs text-[#7C6552] font-medium tabular-nums">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {/* Filter Bar */}
        <div className="space-y-4">
          {/* Top row: Pet Type Segmented Tabs + Search + Sort */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            {/* Functional Segmented Button Controls for Pet Type */}
            <div className="inline-flex p-1 bg-[#EFEAE2] rounded-lg border border-[#E0D7CB] overflow-x-auto">
              {petTypeOptions.map((opt) => {
                const isSelected = selectedPetType === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => onSelectPetType(opt.value)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#1F1E1B] shadow-xs'
                        : 'text-[#5C564E] hover:text-[#1F1E1B]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input & Sort Dropdown */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7C6552]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search salmon, shampoo, bed..."
                  className="w-full pl-9 pr-4 py-2 bg-white text-xs border border-[#DCD5CA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8C6D58] focus:border-[#8C6D58]"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#7C6552] hover:text-[#1F1E1B]"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 bg-white border border-[#DCD5CA] rounded-lg px-2.5 py-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#7C6552]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort products by"
                  className="text-xs text-[#2C2925] bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#2C2925] text-white border-[#2C2925]'
                      : 'bg-white text-[#5C564E] border-[#E0D7CB] hover:bg-[#F3EFE9] hover:text-[#1F1E1B]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Quick Dietary Filters (Grain-Free, Joint Support, etc.) */}
          <div className="flex items-center gap-2 text-xs pt-1">
            <span className="text-[#7C6552] font-medium shrink-0">Health Benefit:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {dietTags.map((tag) => {
                const isSelected = activeDietTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setActiveDietTag(tag)}
                    className={`px-2.5 py-1 text-[11px] rounded transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#EADDCF] text-[#43372B] font-semibold'
                        : 'text-[#6B645B] hover:text-[#1F1E1B]'
                    }`}
                  >
                    {tag === 'all' ? 'All Benefits' : tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#EAE3D9] p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#F3EFE9] text-[#7C6552] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-[#1E1C1A]">No companion items matched</h3>
            <p className="text-xs text-[#5C564E] leading-relaxed">
              We couldn’t find products matching your current filters. Try resetting to browse our entire apothecary.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#2C2925] text-white text-xs font-semibold rounded-lg hover:bg-[#433E38] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
