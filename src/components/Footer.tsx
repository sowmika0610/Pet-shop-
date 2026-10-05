import React, { useState } from 'react';
import { Mail, Phone, MapPin, Heart, Check, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#24211D] text-[#ECE5DC] pt-16 pb-12 border-t border-[#38332C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Ethos (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-serif text-2xl text-white">
              Paws &amp; Meadow
            </h3>
            <p className="text-xs text-[#A89F94] leading-relaxed max-w-sm">
              An independent, veterinary-guided pet apothecary and grooming sanctuary dedicated to longevity, raw nutrition purity, and restorative animal care.
            </p>
            <div className="text-xs text-[#A89F94] space-y-1 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C7974E]" />
                <span>1428 Cypress Lane, Portland, OR 97201</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C7974E]" />
                <span>(503) 847-1920 · Daily 9am – 7pm PST</span>
              </div>
            </div>
          </div>

          {/* Nav columns (2 cols each) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Pantry &amp; Care
            </h4>
            <ul className="space-y-2 text-xs text-[#A89F94]">
              <li><a href="#catalog" className="hover:text-white transition-colors">Cold-Pressed Kibble</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Raw Freeze-Dried Cat Food</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Botanical Herbal Wash</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Orthopedic Bedding</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Mobility Elixirs</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Sanctuary
            </h4>
            <ul className="space-y-2 text-xs text-[#A89F94]">
              <li><a href="#grooming" className="hover:text-white transition-colors">Fear-Free Grooming Spa</a></li>
              <li><a href="#diet-matcher" className="hover:text-white transition-colors">Companion Diet Matcher</a></li>
              <li><a href="#rescue" className="hover:text-white transition-colors">Rescue &amp; Foster Pledge</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Guardian Testimonials</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Ingredient Transparency</a></li>
            </ul>
          </div>

          {/* Newsletter (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              The Meadow Journal &amp; Secret Perks
            </h4>
            <p className="text-xs text-[#A89F94] leading-relaxed">
              Receive seasonal nutrition advice from holistic veterinarians, early access to small-batch herbal batches, and rescue updates.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-3.5 py-2.5 bg-[#2E2A25] border border-[#48423A] rounded-lg text-xs text-white placeholder-[#7C7267] focus:outline-none focus:border-[#C7974E]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#C7974E] text-[#1F1E1B] font-bold text-xs rounded-lg hover:bg-[#D8A75E] transition-colors shrink-0"
                  >
                    Subscribe
                  </button>
                </div>
                <div className="text-[11px] text-[#7C7267]">
                  No spam ever. Unsubscribe anytime with 1 click.
                </div>
              </form>
            ) : (
              <div className="p-3 bg-[#2E3B2C] text-[#B7DDB2] text-xs rounded-lg flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Welcome to the Meadow family! Check your inbox for a 15% code.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#38332C] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7C7267]">
          <div>
            &copy; {new Date().getFullYear()} Paws &amp; Meadow Co. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#A89F94] transition-colors cursor-pointer">Privacy &amp; Formulation Ethics</span>
            <span>·</span>
            <span className="hover:text-[#A89F94] transition-colors cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-[#A89F94] transition-colors cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
