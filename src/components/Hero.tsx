import React from 'react';
import { ArrowRight, ShieldCheck, Leaf, HeartHandshake, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';
import { PetType } from '../types';

interface HeroProps {
  onSelectPetType: (type: PetType) => void;
  onExploreClick: () => void;
  onBookSpaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectPetType,
  onExploreClick,
  onBookSpaClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column: 7 cols */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase tracking-widest text-[#7C6552] font-semibold flex items-center gap-2">
              <span>Artisanal Companion Nutrition &amp; Apothecary</span>
              <span aria-hidden="true">·</span>
              <span>Est. 2021</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] text-[#1E1C1A] leading-[1.15] max-w-2xl text-balance">
              Pure, wholesome living for your most cherished companions.
            </h1>

            <p className="text-base sm:text-lg text-[#5C564E] max-w-xl leading-relaxed">
              From cold-pressed wild salmon nutrition to calming botanical coat soaks and orthopedic sleep sanctuaries, every formula is crafted with radical ingredient transparency.
            </p>

            {/* Quick interactive pet focus selector */}
            <div className="pt-2">
              <span className="block text-xs uppercase tracking-wider text-[#7C6552] font-medium mb-2.5">
                Tailored for your companion
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Dogs & Puppies', type: 'dog' as PetType },
                  { label: 'Cats & Kittens', type: 'cat' as PetType },
                  { label: 'Small Companions', type: 'small_pet' as PetType },
                  { label: 'View All Collections', type: 'all' as PetType },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      onSelectPetType(item.type);
                      onExploreClick();
                    }}
                    className="px-3.5 py-2 text-xs font-medium bg-[#EFEAE2] hover:bg-[#E4DCCE] text-[#2C2925] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-[#2C2925] text-white text-sm font-semibold rounded-lg hover:bg-[#433E38] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Explore Curated Pantry</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onBookSpaClick}
                className="px-6 py-3.5 bg-transparent border border-[#9A8472] text-[#2C2925] text-sm font-semibold rounded-lg hover:bg-[#EFEAE2] transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#8C6D58]" />
                <span>Reserve Spa Treatment</span>
              </button>
            </div>

            {/* Editorial trust row */}
            <div className="pt-6 border-t border-[#EAE3D9] grid grid-cols-2 sm:grid-cols-4 gap-4 text-[#5C564E]">
              <div className="flex items-center gap-2 text-xs">
                <Leaf className="w-4 h-4 text-[#5A7352] shrink-0" />
                <span className="font-medium">100% Non-GMO</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#8C6D58] shrink-0" />
                <span className="font-medium">Vet-Formulated</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <HeartHandshake className="w-4 h-4 text-[#8C6D58] shrink-0" />
                <span className="font-medium">Rescue Pledge</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#8C6D58] font-bold">24h</span>
                <span className="font-medium">Artisanal Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Column: 5 cols with high aesthetic presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E0D7C9] bg-[#EFEAE2]">
              <img
                src={HERO_IMAGE}
                alt="Golden retriever dog and British shorthair cat resting peacefully in a bright Scandinavian living room"
                className="w-full h-[360px] sm:h-[440px] object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs uppercase tracking-wider text-[#EADDCF] font-semibold">
                  Spring Companion Sanctuary
                </div>
                <div className="font-serif text-lg font-medium mt-0.5">
                  Harmony, slow nutrition &amp; restorative rest
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
