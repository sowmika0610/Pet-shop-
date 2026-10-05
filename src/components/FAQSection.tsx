import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How do I transition my companion to cold-pressed nutrition?',
    answer: 'We recommend a gentle 7-day transition period. Days 1–2: 25% Paws & Meadow mixed with 75% previous food. Days 3–4: 50/50 mix. Days 5–6: 75% Paws & Meadow. Day 7+: 100% Paws & Meadow. Our cold-pressed format dissolves gently without expanding in the stomach.',
  },
  {
    question: 'What makes your Fear-Free Grooming Spa different from standard salons?',
    answer: 'We never use cage dryers, sedatives, or assembly-line multi-pet holding pens. Every companion receives dedicated one-on-one attention from a certified fear-free stylist with lavender aromatherapy, calming acoustic music, and frequent cuddles or treat breaks.',
  },
  {
    question: 'Are all your products suitable for pets with sensitive digestions?',
    answer: 'Yes! We intentionally eliminate the top common companion allergens: corn, wheat, soy, artificial dyes, poultry byproduct meal, and chemical preservatives. Our single-source wild salmon and freeze-dried turkey formulas are ideal for elimination diets.',
  },
  {
    question: 'How does your 100% Palatability & Happiness Guarantee work?',
    answer: 'If your dog or cat does not completely adore the aroma and taste of any nutrition item within 30 days, simply let our concierge team know. We will issue an immediate refund or replacement and help donate the remaining bag to a local rescue sanctuary.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 bg-[#FAF8F5] border-t border-[#EAE3D9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-1">
          <div className="text-xs uppercase tracking-widest text-[#7C6552] font-semibold">
            Common Inquiries
          </div>
          <h2 className="font-serif text-3xl text-[#1E1C1A]">
            Guardian Care &amp; Nutrition Guide
          </h2>
          <p className="text-xs sm:text-sm text-[#5C564E]">
            Everything you need to know about our standards, ingredients, and delivery guarantees.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#EAE3D9] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5]"
                >
                  <span className="font-serif text-base text-[#1E1C1A] font-medium">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#7C6552] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#1E1C1A]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-[#5C564E] leading-relaxed border-t border-[#F3EFE9] pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
