import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, RotateCcw, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';

interface PetDietQuizProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const PetDietQuiz: React.FC<PetDietQuizProps> = ({
  products,
  onAddToCart,
  onQuickView,
}) => {
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog');
  const [ageGroup, setAgeGroup] = useState<'puppy_kitten' | 'adult' | 'senior'>('adult');
  const [primaryGoal, setPrimaryGoal] = useState<'allergy' | 'mobility' | 'vitality' | 'digestion'>('allergy');
  const [submitted, setSubmitted] = useState(false);
  const [bundleAdded, setBundleAdded] = useState(false);

  // Derive recommended products based on user choices
  const recommendedProducts = React.useMemo(() => {
    let recs: Product[] = [];

    if (species === 'cat') {
      const catFood = products.find((p) => p.id === 'prod-7');
      const catCare = products.find((p) => p.id === 'prod-2');
      if (catFood) recs.push(catFood);
      if (catCare) recs.push(catCare);
    } else {
      if (primaryGoal === 'mobility' || ageGroup === 'senior') {
        const food = products.find((p) => p.id === 'prod-1');
        const joint = products.find((p) => p.id === 'prod-8');
        const bed = products.find((p) => p.id === 'prod-3');
        if (food) recs.push(food);
        if (joint) recs.push(joint);
        if (bed) recs.push(bed);
      } else if (primaryGoal === 'allergy' || primaryGoal === 'digestion') {
        const salmon = products.find((p) => p.id === 'prod-1');
        const treat = products.find((p) => p.id === 'prod-4');
        const wash = products.find((p) => p.id === 'prod-2');
        if (salmon) recs.push(salmon);
        if (treat) recs.push(treat);
        if (wash) recs.push(wash);
      } else {
        const salmon = products.find((p) => p.id === 'prod-1');
        const treat = products.find((p) => p.id === 'prod-4');
        if (salmon) recs.push(salmon);
        if (treat) recs.push(treat);
      }
    }

    return recs.slice(0, 3);
  }, [species, ageGroup, primaryGoal, products]);

  const bundleTotal = recommendedProducts.reduce((sum, p) => sum + p.price, 0);

  const handleAddBundle = () => {
    recommendedProducts.forEach((p) => onAddToCart(p));
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2000);
  };

  return (
    <section id="diet-matcher" className="py-16 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E3DACD] p-6 sm:p-10 shadow-sm space-y-8">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="text-xs uppercase tracking-widest text-[#7C6552] font-semibold flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8C6D58]" />
              <span>Interactive Companion Assessment</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1C1A]">
              Tailored Companion Nutrition Matcher
            </h2>
            <p className="text-xs sm:text-sm text-[#5C564E]">
              Answer 3 simple questions to receive a biologically aligned regimen tailored to your pet’s unique metabolic profile.
            </p>
          </div>

          {!submitted ? (
            <div className="space-y-6 max-w-2xl mx-auto">
              {/* Question 1: Species */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7C6552]">
                  1. Who are we formulating for today?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Canine Companion (Dog)', value: 'dog' },
                    { label: 'Feline Companion (Cat)', value: 'cat' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setSpecies(item.value as 'dog' | 'cat')}
                      className={`p-3.5 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                        species === item.value
                          ? 'bg-[#2C2925] text-white border-[#2C2925] shadow-xs'
                          : 'bg-[#FAF8F5] text-[#433E38] border-[#EAE3D9] hover:bg-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Life Stage */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7C6552]">
                  2. Companion’s Current Life Stage
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Puppy / Kitten (< 1 yr)', value: 'puppy_kitten' },
                    { label: 'Adult (1 – 7 yrs)', value: 'adult' },
                    { label: 'Senior (7+ yrs)', value: 'senior' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setAgeGroup(item.value as any)}
                      className={`p-3 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                        ageGroup === item.value
                          ? 'bg-[#2C2925] text-white border-[#2C2925] shadow-xs'
                          : 'bg-[#FAF8F5] text-[#433E38] border-[#EAE3D9] hover:bg-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Primary Wellness Focus */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7C6552]">
                  3. Key Wellness Target
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { label: 'Sensitive Tummy', value: 'allergy' },
                    { label: 'Joint Mobility', value: 'mobility' },
                    { label: 'Coat Luster', value: 'vitality' },
                    { label: 'Gut Balance', value: 'digestion' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setPrimaryGoal(item.value as any)}
                      className={`p-3 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                        primaryGoal === item.value
                          ? 'bg-[#8C6D58] text-white border-[#8C6D58]'
                          : 'bg-[#FAF8F5] text-[#433E38] border-[#EAE3D9] hover:bg-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 text-center">
                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="px-8 py-3.5 bg-[#2C2925] text-white text-xs font-semibold rounded-lg hover:bg-[#433E38] transition-all cursor-pointer inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Generate Recommended Protocol</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Results view */
            <div className="space-y-6">
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#EAE3D9] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#7C6552] font-semibold">
                    Personalized Recommendation
                  </div>
                  <h3 className="font-serif text-xl text-[#1E1C1A] mt-0.5">
                    Targeted {species === 'dog' ? 'Canine' : 'Feline'} Wellness Trio
                  </h3>
                  <p className="text-xs text-[#5C564E] mt-0.5">
                    Formulated with cold-pressed unadulterated nutrients for {primaryGoal} support.
                  </p>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#7C6552] hover:text-[#1F1E1B] font-semibold cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Adjust Answers</span>
                </button>
              </div>

              {/* Recommended Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 bg-white rounded-xl border border-[#EAE3D9] flex flex-col justify-between space-y-3"
                  >
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#FAF8F5]">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="text-[11px] text-[#7C6552] uppercase font-semibold">
                        {p.category} · {p.weightOrSize}
                      </div>
                      <h4 className="font-semibold text-sm text-[#1E1C1A] mt-0.5 line-clamp-1">
                        {p.name}
                      </h4>
                      <p className="text-xs text-[#5C564E] mt-1 line-clamp-2">
                        {p.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE3]">
                      <span className="text-sm font-bold text-[#1E1C1A] tabular-nums">
                        ${p.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => onQuickView(p)}
                        className="text-xs font-semibold text-[#8C6D58] hover:underline cursor-pointer"
                      >
                        Inspect Formula
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add entire bundle action */}
              <div className="pt-4 border-t border-[#EAE3D9] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#5C564E]">
                  Complete Recommended Regimen:{' '}
                  <strong className="text-base text-[#1E1C1A] tabular-nums font-bold ml-1">
                    ${bundleTotal.toFixed(2)}
                  </strong>{' '}
                  <span className="text-[#3C6436] font-medium">(Eligible for Free Refrigerated Shipping)</span>
                </div>

                <button
                  onClick={handleAddBundle}
                  className={`w-full sm:w-auto px-6 py-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    bundleAdded
                      ? 'bg-[#476043] text-white'
                      : 'bg-[#2C2925] text-white hover:bg-[#433E38]'
                  }`}
                >
                  {bundleAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>All Items Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Complete Regimen to Bag</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
