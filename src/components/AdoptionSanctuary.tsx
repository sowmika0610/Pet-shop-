import React, { useState } from 'react';
import { Heart, Check, Sparkles, X, ShieldCheck } from 'lucide-react';
import { ADOPTION_PETS } from '../data/mockData';
import { AdoptionPet } from '../types';

export const AdoptionSanctuary: React.FC = () => {
  const [selectedPet, setSelectedPet] = useState<AdoptionPet | null>(null);
  const [inquirySent, setInquirySent] = useState(false);

  // Form states
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [housingType, setHousingType] = useState('House with Fenced Yard');
  const [hasCurrentPets, setHasCurrentPets] = useState('Yes, one dog');
  const [experience, setExperience] = useState('');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  const handleClose = () => {
    setSelectedPet(null);
    setInquirySent(false);
    setApplicantName('');
    setApplicantEmail('');
    setExperience('');
  };

  return (
    <section id="rescue" className="py-16 bg-[#FAF8F5] border-t border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAE3D9] pb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#7C6552] font-semibold flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-[#8C6D58] text-[#8C6D58]" />
              <span>Foster &amp; Adoption Sanctuary</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] mt-1">
              Forever Homes for Cherished Companions
            </h2>
            <p className="mt-1 text-sm text-[#5C564E] max-w-2xl">
              10% of every Paws &amp; Meadow sale directly funds medical rehabilitation, foster food, and veterinary checkups for rescued companions.
            </p>
          </div>

          <div className="text-xs text-[#7C6552] bg-[#EFEAE2] px-3.5 py-1.5 rounded-lg border border-[#E0D7CB] shrink-0 font-medium">
            342 Rescued &amp; Adopted in 2025–2026
          </div>
        </div>

        {/* Rescue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ADOPTION_PETS.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-2xl border border-[#EAE3D9] overflow-hidden flex flex-col sm:flex-row shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="sm:w-5/12 aspect-square sm:aspect-auto relative bg-[#F5F2EB]">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-semibold text-[#1F1E1B]">
                  {pet.age} · {pet.gender}
                </div>
              </div>

              <div className="sm:w-7/12 p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs text-[#7C6552] uppercase font-semibold">
                    {pet.species} · {pet.breed}
                  </div>
                  <h3 className="font-serif text-2xl text-[#1E1C1A] mt-1">
                    {pet.name}
                  </h3>
                  <p className="text-xs text-[#5C564E] mt-2 leading-relaxed">
                    {pet.story}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {pet.personality.map((trait) => (
                      <span
                        key={trait}
                        className="text-[11px] font-medium text-[#483F35] bg-[#F2ECE3] px-2 py-0.5 rounded"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F2ECE3] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#3C6436]">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="font-medium">Fully Vaccinated</span>
                  </div>

                  <button
                    onClick={() => setSelectedPet(pet)}
                    className="px-4 py-2 bg-[#2C2925] text-white text-xs font-semibold rounded-lg hover:bg-[#433E38] transition-colors cursor-pointer"
                  >
                    Meet &amp; Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Dialog */}
      {selectedPet && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl border border-[#EAE3D9] p-6 sm:p-8 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-[#5C564E] hover:text-[#1F1E1B] rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {!inquirySent ? (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#7C6552] font-semibold">
                    Adoption Inquiry
                  </div>
                  <h3 className="font-serif text-2xl text-[#1E1C1A] mt-1">
                    Connect with {selectedPet.name}
                  </h3>
                  <p className="text-xs text-[#5C564E] mt-0.5">
                    Our adoption coordinators will schedule a stress-free meet-and-greet at the sanctuary within 24 hours.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-medium text-[#2C2925] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8C6D58]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#2C2925] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8C6D58]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-[#2C2925] mb-1">
                        Living Environment
                      </label>
                      <select
                        value={housingType}
                        onChange={(e) => setHousingType(e.target.value)}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none"
                      >
                        <option>House with Yard</option>
                        <option>Apartment / Condo</option>
                        <option>Rural / Farm Acreage</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-[#2C2925] mb-1">
                        Current Pets at Home
                      </label>
                      <select
                        value={hasCurrentPets}
                        onChange={(e) => setHasCurrentPets(e.target.value)}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none"
                      >
                        <option>No other pets</option>
                        <option>Yes, dog(s)</option>
                        <option>Yes, cat(s)</option>
                        <option>Both dogs &amp; cats</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-[#2C2925] mb-1">
                      A few words about your lifestyle or past companion experience
                    </label>
                    <textarea
                      rows={2}
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="e.g. Work from home, love weekend park strolls..."
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8C6D58]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2.5 text-xs text-[#5C564E] hover:text-[#1F1E1B]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#2C2925] text-white text-xs font-semibold rounded-lg hover:bg-[#433E38] transition-colors cursor-pointer"
                  >
                    Submit Adoption Request
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-[#EDF4EB] text-[#3C6436] rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl text-[#1E1C1A]">
                  Thank You, {applicantName}!
                </h4>
                <p className="text-xs text-[#5C564E] leading-relaxed max-w-sm mx-auto">
                  Your inquiry to meet <strong>{selectedPet.name}</strong> has been received. Our rescue adoption counselor will contact you at <strong>{applicantEmail}</strong> by tomorrow afternoon.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-[#2C2925] text-white text-xs font-semibold rounded-lg hover:bg-[#433E38]"
                >
                  Return to Sanctuary
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
