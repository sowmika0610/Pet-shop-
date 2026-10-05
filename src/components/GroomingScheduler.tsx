import React, { useState } from 'react';
import { Calendar, Clock, Check, Sparkles, AlertCircle, Scissors, Heart } from 'lucide-react';
import { GROOMING_SERVICES } from '../data/mockData';
import { GroomingService, GroomingBooking } from '../types';

export const GroomingScheduler: React.FC = () => {
  const [selectedService, setSelectedService] = useState<GroomingService>(GROOMING_SERVICES[0]);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form fields
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('Dog');
  const [petBreed, setPetBreed] = useState('');
  const [petWeight, setPetWeight] = useState('15 - 35 lbs (Medium)');
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 10:00 AM');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<GroomingBooking | null>(null);

  const availableSlots = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:15 PM'];
  const dates = [
    'Wednesday, Oct 7',
    'Thursday, Oct 8',
    'Friday, Oct 9',
    'Saturday, Oct 10',
    'Sunday, Oct 11',
  ];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName || !ownerName || !ownerEmail || !ownerPhone) {
      alert('Please fill out pet name, guardian name, email, and phone number.');
      return;
    }

    const booking: GroomingBooking = {
      id: `SPA-${Math.floor(100000 + Math.random() * 900000)}`,
      petName,
      petType,
      petBreed: petBreed || 'Beloved Companion',
      petWeight,
      service: selectedService,
      date: selectedDate,
      timeSlot: selectedSlot,
      ownerName,
      ownerEmail,
      ownerPhone,
      specialNotes,
      status: 'Confirmed',
      totalPrice: selectedService.price,
    };

    setConfirmedBooking(booking);
    setStep(3);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setStep(1);
    setPetName('');
    setPetBreed('');
    setOwnerName('');
    setOwnerEmail('');
    setOwnerPhone('');
    setSpecialNotes('');
  };

  return (
    <section id="grooming" className="py-16 bg-[#F4EFEA] border-t border-b border-[#E3DACD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs uppercase tracking-widest text-[#7C6552] font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6D58]" />
            <span>Fear-Free Certified Wellness Sanctuary</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A]">
            The Meadow Botanical Grooming Spa
          </h2>
          <p className="text-sm text-[#5C564E] leading-relaxed">
            One-on-one cage-free sessions with certified gentle-handling stylists, organic botanical herbal rinses, and soothing ambient soundscapes.
          </p>
        </div>

        {/* Multi-step Container */}
        {step !== 3 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 cols: Service Selection or Pet Details */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EAE3D9] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#EAE3D9] pb-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7C6552]">
                  <span className={step === 1 ? 'text-[#1F1E1B] font-bold' : ''}>1. Select Ritual</span>
                  <span>&rarr;</span>
                  <span className={step === 2 ? 'text-[#1F1E1B] font-bold' : ''}>2. Companion &amp; Guardian Info</span>
                </div>
                <div className="text-xs text-[#8C6D58] font-medium">Cage-Free · 1-on-1 Care</div>
              </div>

              {step === 1 ? (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg text-[#1E1C1A]">
                    Select a Spa Treatment
                  </h3>
                  <div className="space-y-3">
                    {GROOMING_SERVICES.map((service) => {
                      const isSelected = selectedService.id === service.id;
                      return (
                        <div
                          key={service.id}
                          onClick={() => setSelectedService(service)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#8C6D58] bg-[#FAF8F5] shadow-xs'
                              : 'border-[#EAE3D9] hover:border-[#D0C5B5] bg-white'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Scissors className="w-4 h-4 text-[#8C6D58]" />
                                <h4 className="font-semibold text-sm sm:text-base text-[#1E1C1A]">
                                  {service.name}
                                </h4>
                              </div>
                              <p className="text-xs text-[#5C564E] leading-relaxed">
                                {service.description}
                              </p>
                              <div className="text-[11px] text-[#7C6552] pt-1">
                                <strong>Includes:</strong> {service.includes.join(' · ')}
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="text-lg font-bold text-[#1E1C1A] tabular-nums">
                                ${service.price}
                              </span>
                              <span className="block text-[11px] text-[#7C6552]">
                                {service.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-[#2C2925] text-white text-xs font-semibold rounded-lg hover:bg-[#433E38] transition-colors cursor-pointer"
                    >
                      Continue with {selectedService.name} &rarr;
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBook} className="space-y-4">
                  <h3 className="font-serif text-lg text-[#1E1C1A]">
                    Tell Us About Your Companion
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-medium text-[#2C2925] mb-1">
                        Companion’s Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        placeholder="e.g. Biscuit"
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8C6D58]"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-[#2C2925] mb-1">
                        Companion Species
                      </label>
                      <select
                        value={petType}
                        onChange={(e) => setPetType(e.target.value)}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8C6D58]"
                      >
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Rabbit">Rabbit / Small Companion</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-[#2C2925] mb-1">
                        Breed or Appearance
                      </label>
                      <input
                        type="text"
                        value={petBreed}
                        onChange={(e) => setPetBreed(e.target.value)}
                        placeholder="e.g. Australian Shepherd / Domestic Shorthair"
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8C6D58]"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-[#2C2925] mb-1">
                        Weight Range
                      </label>
                      <select
                        value={petWeight}
                        onChange={(e) => setPetWeight(e.target.value)}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8C6D58]"
                      >
                        <option>Under 15 lbs (Toy / Kitten)</option>
                        <option>15 - 35 lbs (Small / Medium)</option>
                        <option>35 - 65 lbs (Large)</option>
                        <option>65+ lbs (Giant)</option>
                      </select>
                    </div>
                  </div>

                  {/* Guardian contact */}
                  <div className="pt-2 border-t border-[#EAE3D9] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block font-medium text-[#2C2925] mb-1">
                        Guardian Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8C6D58]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[#2C2925] mb-1">
                        Guardian Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={ownerEmail}
                        onChange={(e) => setOwnerEmail(e.target.value)}
                        placeholder="hello@example.com"
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8C6D58]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[#2C2925] mb-1">
                        Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        placeholder="(555) 019-2834"
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8C6D58]"
                      />
                    </div>
                  </div>

                  {/* Special health notes */}
                  <div className="text-xs">
                    <label className="block font-medium text-[#2C2925] mb-1">
                      Temperament / Special Health Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="e.g. Nervous around loud high-pitch dryers, sensitive back right paw, allergies to eucalyptus..."
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8C6D58]"
                    />
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-semibold text-[#7C6552] hover:text-[#1F1E1B] cursor-pointer"
                    >
                      &larr; Back to Treatments
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#2C2925] text-white text-xs font-semibold rounded-lg hover:bg-[#433E38] transition-colors cursor-pointer"
                    >
                      Confirm Appointment (${selectedService.price})
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right 5 cols: Appointment Time Slot & Sanctuary Standards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-[#EAE3D9] p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7C6552]">
                  <Calendar className="w-4 h-4 text-[#8C6D58]" />
                  <span>Choose Day &amp; Time Slot</span>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-medium text-[#2C2925]">
                    Select Preferred Date
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {dates.map((d) => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => setSelectedDate(d)}
                        className={`p-2.5 text-xs text-left rounded-lg border transition-colors cursor-pointer ${
                          selectedDate === d
                            ? 'bg-[#2C2925] text-white border-[#2C2925] font-semibold'
                            : 'bg-[#FAF8F5] text-[#5C564E] border-[#EAE3D9] hover:bg-white hover:text-[#1F1E1B]'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>

                  <label className="block text-xs font-medium text-[#2C2925] pt-2">
                    Available Time Slots
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-3 py-1.5 text-xs rounded-md border transition-colors cursor-pointer ${
                          selectedSlot === slot
                            ? 'bg-[#8C6D58] text-white border-[#8C6D58] font-bold'
                            : 'bg-[#FAF8F5] text-[#5C564E] border-[#EAE3D9] hover:bg-white hover:text-[#1F1E1B]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Appointment Summary Snapshot */}
                <div className="mt-4 p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D9] space-y-2 text-xs">
                  <div className="flex justify-between text-[#5C564E]">
                    <span>Treatment:</span>
                    <strong className="text-[#1E1C1A]">{selectedService.name}</strong>
                  </div>
                  <div className="flex justify-between text-[#5C564E]">
                    <span>Schedule:</span>
                    <strong className="text-[#1E1C1A]">{selectedDate} @ {selectedSlot}</strong>
                  </div>
                  <div className="flex justify-between text-[#5C564E]">
                    <span>Duration:</span>
                    <strong className="text-[#1E1C1A]">{selectedService.duration}</strong>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-[#EAE3D9] font-bold text-[#1E1C1A]">
                    <span>Total at Sanctuary:</span>
                    <span className="tabular-nums">${selectedService.price}.00</span>
                  </div>
                </div>
              </div>

              {/* Sanctuary Guarantee Callout */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E0D7CB] space-y-2 text-xs text-[#5C564E]">
                <div className="flex items-center gap-2 text-[#7C6552] font-semibold">
                  <AlertCircle className="w-4 h-4 text-[#8C6D58]" />
                  <span>The Fear-Free Meadow Promise</span>
                </div>
                <p className="leading-relaxed">
                  We never use drying cages, tranquilizers, or assembly-line rushing. Every companion receives tailored aromatherapy, organic treats with owner permission, and soothing lavender paw balms.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Step 3: Confirmed Booking Pass */
          <div className="max-w-xl mx-auto bg-white rounded-2xl border border-[#D5CABB] p-8 shadow-md text-center space-y-6">
            <div className="w-14 h-14 bg-[#EDF4EB] text-[#3C6436] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-[#7C6552] font-semibold">
                Appointment Reserved
              </div>
              <h3 className="font-serif text-2xl text-[#1E1C1A] mt-1">
                We Can’t Wait to Pamper {confirmedBooking?.petName}!
              </h3>
              <p className="text-xs text-[#5C564E] mt-1">
                A confirmation text &amp; calendar invite have been dispatched to <strong>{confirmedBooking?.ownerEmail}</strong>.
              </p>
            </div>

            {/* Ticket / Pass */}
            <div className="bg-[#FAF8F5] border border-[#EAE3D9] rounded-xl p-5 text-left text-xs space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-[#EAE3D9]">
                <span className="font-semibold text-[#7C6552]">Pass ID:</span>
                <span className="font-mono font-bold text-[#1E1C1A]">{confirmedBooking?.id}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[#7C6552] block">Pet:</span>
                  <span className="font-medium text-[#1E1C1A]">{confirmedBooking?.petName} ({confirmedBooking?.petBreed})</span>
                </div>
                <div>
                  <span className="text-[#7C6552] block">Service:</span>
                  <span className="font-medium text-[#1E1C1A]">{confirmedBooking?.service.name}</span>
                </div>
                <div>
                  <span className="text-[#7C6552] block">Date &amp; Time:</span>
                  <span className="font-medium text-[#1E1C1A]">{confirmedBooking?.date} @ {confirmedBooking?.timeSlot}</span>
                </div>
                <div>
                  <span className="text-[#7C6552] block">Location:</span>
                  <span className="font-medium text-[#1E1C1A]">The Meadow Sanctuary, 1428 Cypress Lane</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 px-4 bg-[#2C2925] text-white text-xs font-semibold rounded-lg hover:bg-[#433E38] transition-colors"
              >
                Book Another Companion
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
