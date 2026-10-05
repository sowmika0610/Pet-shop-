import React, { useState } from 'react';
import { Star, ShieldCheck, Heart, ThumbsUp, MessageSquare } from 'lucide-react';
import { REVIEWS } from '../data/mockData';
import { CustomerReview } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(REVIEWS);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newPet, setNewPet] = useState('');
  const [newBreed, setNewBreed] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newProduct, setNewProduct] = useState('Wild Pacific Salmon & Sweet Potato Kibble');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newPet || !newComment) return;

    const rev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      petName: newPet,
      petBreed: newBreed || 'Beloved Companion',
      rating: newRating,
      date: 'Just now',
      comment: newComment,
      productName: newProduct,
      verified: true,
    };

    setReviewsList([rev, ...reviewsList]);
    setShowAddReview(false);
    setNewAuthor('');
    setNewPet('');
    setNewBreed('');
    setNewComment('');
  };

  return (
    <section id="reviews" className="py-16 bg-[#F4EFEA] border-t border-[#E3DACD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E3DACD] pb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#7C6552] font-semibold">
              Guardian Testimonials
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] mt-1">
              Real Stories of Vitality &amp; Joy
            </h2>
            <p className="mt-1 text-sm text-[#5C564E] max-w-xl">
              Over 2,400 companions thrive on Paws &amp; Meadow botanical regimens. Read verified experiences from their human guardians.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddReview(!showAddReview)}
              className="px-4 py-2.5 bg-[#2C2925] text-white text-xs font-semibold rounded-lg hover:bg-[#433E38] transition-colors cursor-pointer"
            >
              {showAddReview ? 'Cancel' : 'Share Companion Story'}
            </button>
          </div>
        </div>

        {/* Add Review Dialog / Drawer */}
        {showAddReview && (
          <form
            onSubmit={handleAddReview}
            className="bg-white p-6 rounded-2xl border border-[#DCD5CA] shadow-sm max-w-2xl mx-auto space-y-4"
          >
            <h3 className="font-serif text-xl text-[#1E1C1A]">Share Your Experience</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-[#2C2925] mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Jordan Hayes"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium text-[#2C2925] mb-1">Companion’s Name *</label>
                <input
                  type="text"
                  required
                  value={newPet}
                  onChange={(e) => setNewPet(e.target.value)}
                  placeholder="e.g. Jasper"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium text-[#2C2925] mb-1">Breed &amp; Age</label>
                <input
                  type="text"
                  value={newBreed}
                  onChange={(e) => setNewBreed(e.target.value)}
                  placeholder="e.g. Beagle (3 yrs)"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium text-[#2C2925] mb-1">Rating</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none"
                >
                  <option value={5}>5 Stars - Life Changing</option>
                  <option value={4}>4 Stars - Great Quality</option>
                  <option value={3}>3 Stars - Good</option>
                </select>
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-medium text-[#2C2925] mb-1">
                Your Review &amp; Companion’s Transformation *
              </label>
              <textarea
                required
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Tell us what you noticed after switching to Paws & Meadow..."
                className="w-full p-2.5 bg-[#FAF8F5] border border-[#DCD5CA] rounded-lg focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#2C2925] text-white text-xs font-semibold rounded-lg hover:bg-[#433E38] transition-colors"
              >
                Post Guardian Review
              </button>
            </div>
          </form>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-[#EAE3D9] p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-[#C7974E] text-[#C7974E]'
                            : 'text-[#DCD5CA]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#7C6552]">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#433E38] leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#F2ECE3] space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-[#1E1C1A]">
                    {rev.author}
                  </div>
                  {rev.verified && (
                    <div className="flex items-center gap-1 text-[11px] text-[#3C6436]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Guardian</span>
                    </div>
                  )}
                </div>
                <div className="text-[#7C6552]">
                  Companion: <strong className="text-[#3D3730]">{rev.petName}</strong> · {rev.petBreed}
                </div>
                <div className="text-[11px] text-[#8C7E72] truncate">
                  Purchased: {rev.productName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
