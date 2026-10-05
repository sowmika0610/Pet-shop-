import { Product, GroomingService, AdoptionPet, CustomerReview } from '../types';

// Asset references from generated images
export const HERO_IMAGE = '/src/assets/images/hero_pet_lifestyle_1791181699291.jpg';
export const PRODUCT_SHAMPOO_IMAGE = '/src/assets/images/product_botanical_shampoo_1791181723403.jpg';
export const PRODUCT_BED_IMAGE = '/src/assets/images/product_orthopedic_bed_1791181735866.jpg';
export const PRODUCT_KIBBLE_IMAGE = '/src/assets/images/product_organic_kibble_1791181746481.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Wild Pacific Salmon & Sweet Potato Kibble',
    subtitle: 'Cold-pressed whole prey dog formula with wild blueberries',
    category: 'food',
    petType: 'dog',
    price: 68.00,
    originalPrice: 76.00,
    rating: 4.9,
    reviewCount: 142,
    image: PRODUCT_KIBBLE_IMAGE,
    badge: 'Best Seller',
    inStock: true,
    weightOrSize: '12 lb Bag',
    description: 'Slowly baked at low temperatures to preserve volatile micronutrients, probiotics, and healthy omega fatty acids. Crafted with wild-caught Alaskan salmon, organic sweet potatoes, and antioxidant-rich botanicals.',
    keyFeatures: [
      'Single-source marine protein for sensitive digestions',
      'Naturally rich in EPA & DHA for brain health and coat luster',
      'Zero corn, soy, wheat, or artificial preservatives',
      'Cold-pressed with 80% whole food bioavailability'
    ],
    ingredientsOrMaterials: [
      'Wild Alaskan Salmon',
      'Organic Sweet Potato',
      'Atlantic Kelp Meal',
      'Organic Blueberries',
      'Pumpkin Seed Powder',
      'Rosemary Extract'
    ],
    dietaryTags: ['Grain-Free', 'Sensitive Tummy', 'Coat & Shine'],
    analysis: [
      { label: 'Crude Protein (min)', value: '32.0%' },
      { label: 'Crude Fat (min)', value: '16.5%' },
      { label: 'Crude Fiber (max)', value: '3.8%' },
      { label: 'Moisture (max)', value: '9.0%' },
      { label: 'Omega-3 Fatty Acids', value: '1.8%' }
    ]
  },
  {
    id: 'prod-2',
    name: 'Calming Chamomile & Lavender Botanical Wash',
    subtitle: 'Soap-free pH-balanced herbal coat bath for dogs & cats',
    category: 'grooming',
    petType: 'all',
    price: 28.50,
    rating: 4.8,
    reviewCount: 96,
    image: PRODUCT_SHAMPOO_IMAGE,
    badge: 'Artisanal Batch',
    inStock: true,
    weightOrSize: '16 fl oz / 473 ml',
    description: 'Formulated with organic steam-distilled lavender water, soothing colloidal oatmeal, and pure Roman chamomile extract. Gently lifts dander and allergens while conditioning sensitive coats.',
    keyFeatures: [
      'Neutral pH 6.8 formulated specifically for companion animal skin',
      'Tearless, biodegradable, and free of sulfates, parabens, & synthetic perfumes',
      'Infused with virgin cold-pressed jojoba oil to nourish undercoats',
      'Naturally detangles with silk amino proteins'
    ],
    ingredientsOrMaterials: [
      'Deionized Water',
      'Organic Lavender Hydrosol',
      'Colloidal Oat Flour',
      'Roman Chamomile Extract',
      'Organic Jojoba Oil',
      'Vegetable Glycerin'
    ],
    dietaryTags: ['Hypoallergenic', 'Sulfate-Free', 'Eco-Certified']
  },
  {
    id: 'prod-3',
    name: 'Nordic Orthopedic Memory Foam Lounge Bed',
    subtitle: 'Dual-density human-grade memory foam with washable linen slipcover',
    category: 'beds',
    petType: 'all',
    price: 135.00,
    originalPrice: 150.00,
    rating: 5.0,
    reviewCount: 88,
    image: PRODUCT_BED_IMAGE,
    badge: 'Veterinary Approved',
    inStock: true,
    weightOrSize: 'Medium (36" × 28" × 5")',
    description: 'Designed to relieve pressure on aging joints, hips, and spine. Features a 3-inch medical-grade memory foam base paired with a 2-inch cooling gel top layer. Wrapped in a water-resistant membrane and heavy stonewashed Belgian linen slipcover.',
    keyFeatures: [
      'Zero-sag 5-inch orthopedic dual layer tested for up to 120 lbs',
      'Machine-washable, stain-resistant natural linen cover with concealed YKK zipper',
      'Hypoallergenic waterproof inner mattress barrier protects against spills',
      'Non-skid silicone dotted bottom keeps bed stable on hardwood'
    ],
    ingredientsOrMaterials: [
      '100% Stonewashed Natural Flax Linen Cover',
      'CertiPUR-US® Certified High-Density Memory Foam',
      'Breathable Bamboo-Fiber Waterproof Liner',
      'Recycled Polyfill Bolster'
    ],
    dietaryTags: ['Joint Support', 'Orthopedic', 'Machine Washable']
  },
  {
    id: 'prod-4',
    name: 'Heritage Free-Range Duck & Cranberry Bites',
    subtitle: 'Air-dried functional reward treats for dogs & puppies',
    category: 'treats',
    petType: 'dog',
    price: 18.00,
    rating: 4.9,
    reviewCount: 114,
    image: PRODUCT_KIBBLE_IMAGE,
    inStock: true,
    weightOrSize: '8 oz Pouch',
    description: 'Single-protein duck breast air-dried for 48 hours to retain pure savory aroma. Infused with antioxidant-rich Oregon cranberries for urinary tract support and parsley for fresh breath.',
    keyFeatures: [
      '94% free-range duck meat and organs',
      'Gentle air-drying retains enzymes and natural amino acids',
      'Perfect training size: easily snaps into smaller bites',
      'Zero glycerin, corn, or artificial smoke flavoring'
    ],
    ingredientsOrMaterials: [
      'Free-Range Duck Breast',
      'Duck Liver',
      'Dried Whole Cranberries',
      'Organic Fresh Parsley',
      'Mixed Tocopherols (Vitamin E)'
    ],
    dietaryTags: ['Single Protein', 'Air-Dried', 'Training Friendly'],
    analysis: [
      { label: 'Crude Protein (min)', value: '44.0%' },
      { label: 'Crude Fat (min)', value: '20.0%' },
      { label: 'Crude Fiber (max)', value: '2.0%' }
    ]
  },
  {
    id: 'prod-5',
    name: 'Herbal Paw & Nose Restoration Balm',
    subtitle: 'Intensive moisture barrier with shea butter & calendula blossom',
    category: 'grooming',
    petType: 'all',
    price: 16.50,
    rating: 4.7,
    reviewCount: 63,
    image: PRODUCT_SHAMPOO_IMAGE,
    inStock: true,
    weightOrSize: '2.5 oz Tin',
    description: 'Deeply hydrating lick-safe salve to heal cracked paw pads, dry noses, and rough elbow calluses exposed to winter ice salt or hot summer sidewalks.',
    keyFeatures: [
      '100% lick-safe with organic edible-grade botanical waxes',
      'Soothes irritated pads within 24 to 48 hours of application',
      'Forms a breathable shield against pavement heat and de-icing salt',
      'No artificial fragrance or synthetic petroleum jelly'
    ],
    ingredientsOrMaterials: [
      'Organic Raw Shea Butter',
      'Beeswax from Sustainable Apiaries',
      'Calendula Officinalis Oil',
      'Coconut Oil',
      'Vitamin E Oil'
    ],
    dietaryTags: ['100% Lick-Safe', 'Organic Ingredients']
  },
  {
    id: 'prod-6',
    name: 'Artisanal Braided Hemp & Cotton Rope Tug',
    subtitle: 'Natural unbleached fiber dental play toy',
    category: 'accessories',
    petType: 'dog',
    price: 22.00,
    rating: 4.8,
    reviewCount: 52,
    image: PRODUCT_BED_IMAGE,
    inStock: true,
    weightOrSize: '18 inches length',
    description: 'Hand-braided in Oregon from virgin European hemp fibers and organic undyed cotton. Natural plant fibers act like dental floss to gently clean teeth during interactive play.',
    keyFeatures: [
      'Naturally antibacterial and mildew resistant',
      '100% plastic-free, dye-free, and biodegradable',
      'Triple-twisted heavy knot withstands vigorous tugging',
      'Gentle on gums and enamel compared to synthetic nylon ropes'
    ],
    ingredientsOrMaterials: [
      '100% Organic European Hemp Rope',
      'Raw Undyed Organic Cotton Core'
    ],
    dietaryTags: ['Plastic-Free', 'Dental Health', 'Biodegradable']
  },
  {
    id: 'prod-7',
    name: 'Raw Freeze-Dried Turkey & Kelp Feast for Felines',
    subtitle: 'Species-appropriate high-moisture reconstituting raw dinner',
    category: 'food',
    petType: 'cat',
    price: 42.00,
    originalPrice: 48.00,
    rating: 4.9,
    reviewCount: 78,
    image: PRODUCT_KIBBLE_IMAGE,
    badge: 'Raw Diet',
    inStock: true,
    weightOrSize: '14 oz (makes 3.5 lbs rehydrated)',
    description: 'Formulated for obligate carnivores with 98% pasture-raised turkey, organs, and bone marrow. Just add warm bone broth or water for an instant biologically appropriate feast.',
    keyFeatures: [
      'Essential taurine naturally derived from organ meats',
      'Supports optimal feline renal health and lean muscle definition',
      'No carrageenan, gums, pea protein, or potato starch filler',
      'Non-GMO verified and pathogen tested with cold pasteurization'
    ],
    ingredientsOrMaterials: [
      'Pasture-Raised Turkey with Ground Bone',
      'Turkey Heart',
      'Turkey Liver',
      'Icelandic Sea Kelp',
      'Apple Cider Vinegar',
      'Organic Pumpkin'
    ],
    dietaryTags: ['Grain-Free', 'High Protein', 'Raw Nutrition'],
    analysis: [
      { label: 'Crude Protein (min)', value: '52.0%' },
      { label: 'Crude Fat (min)', value: '24.0%' },
      { label: 'Taurine (min)', value: '0.4%' }
    ]
  },
  {
    id: 'prod-8',
    name: 'Holistic Green Lipped Mussel Joint Elixir',
    subtitle: 'Cold-extracted marine liquid supplement with native Glucosamine',
    category: 'wellness',
    petType: 'all',
    price: 38.00,
    rating: 4.9,
    reviewCount: 84,
    image: PRODUCT_SHAMPOO_IMAGE,
    inStock: true,
    weightOrSize: '8 fl oz Dropper Bottle',
    description: 'Sustainably harvested from the pristine waters of the Marlborough Sounds in New Zealand. Rich in natural glycosaminoglycans and ETA omega-3s that soothe stiffness within weeks.',
    keyFeatures: [
      'Cold-processed to retain bio-active marine liposomes',
      'Easy pump dropper directly onto wet or dry meals',
      'Remarkable mobility results for senior dogs and agile agility athletes',
      'Certified sustainable aquaculture harvest'
    ],
    ingredientsOrMaterials: [
      'Pure New Zealand Green Lipped Mussel Extract',
      'Cold-Pressed Wild Anchovy Oil',
      'Natural Rosemary Antioxidant'
    ],
    dietaryTags: ['Joint Mobility', 'Senior Pets', 'Omega-3 Rich']
  }
];

export const GROOMING_SERVICES: GroomingService[] = [
  {
    id: 'groom-1',
    name: 'The Botanical Bath & Undercoat De-Shed',
    duration: '60 min',
    price: 65,
    description: 'Therapeutic hydro-massage bath using customized organic herbal shampoo, deep blueberry facial scrub, high-velocity warm blow dry, and 20-minute de-shedding undercoat raking.',
    suitableFor: 'All breeds, double-coated dogs & long-haired felines',
    includes: [
      'Aromatherapy calming soak',
      'Undercoat brush & carding',
      'Ear cleaning with witch hazel',
      'Nail clip & rotary edge buffing',
      'Organic paw balm treatment'
    ]
  },
  {
    id: 'groom-2',
    name: 'Signature Full Breed Styling & Spa',
    duration: '90–120 min',
    price: 95,
    description: 'Full artisanal haircut hand-scissored to your preferred breed standard or customized teddy-bear profile, complete with warm hydro-bath and coat conditioning silk treatment.',
    suitableFor: 'Poodles, Doodles, Schnauzers, Terriers, Shih Tzus & coated breeds',
    includes: [
      'Complete Botanical Bath & blow out',
      'Hand-scissored face, paws & sanitary trim',
      'Custom length full body haircut',
      'Teeth gel cleaning & fresh breath mist',
      'Conditioning leave-in silk mist'
    ]
  },
  {
    id: 'groom-3',
    name: 'Puppy & Kitten First Spa Introduction',
    duration: '45 min',
    price: 45,
    description: 'Gentle positive-reinforcement acclimation to water, dryer vibrations, and gentle touch with healthy treats and soothing cuddles. Builds lifelong calm grooming habits.',
    suitableFor: 'Companions under 6 months old',
    includes: [
      'Gentle hypoallergenic warm wash',
      'Low-noise fluff dry',
      'Light eye clearing & sanitary scissor',
      'Paw pad tickle & nail trim introduction',
      'Complimentary toy & photo milestone card'
    ]
  },
  {
    id: 'groom-4',
    name: 'Holistic Ozone & Mineral Mud Therapy',
    duration: '75 min',
    price: 85,
    description: 'Restorative dermatological spa session featuring warm Dead Sea mineral mud wrap followed by micro-bubble ozone oxygen bath. Relieves hot spots, allergies, and seasonal flaking.',
    suitableFor: 'Pets with sensitive skin, allergies, flaking, or dry coat',
    includes: [
      'Mineral rich mud application & wrap',
      'Micro-bubble deep pore oxygen rinse',
      'Calendula restorative rinse',
      'Gentle moisture sealing blow dry',
      'Herbal nose & paw restoration massage'
    ]
  }
];

export const ADOPTION_PETS: AdoptionPet[] = [
  {
    id: 'adopt-1',
    name: 'Barnaby',
    species: 'Dog',
    breed: 'Golden Retriever & Hound Mix',
    age: '2 Years',
    gender: 'Male',
    personality: ['Affectionate', 'Gentle Walker', 'Loves Car Rides', 'Sunbather'],
    story: 'Barnaby was found wandering in the coastal hills. He is soulful, polite on a leash, loves resting his chin on your lap, and greets every morning with a cheerful tail wag.',
    image: HERO_IMAGE,
    goodWith: ['Other Dogs', 'Older Children', 'Cats (with slow intro)'],
    vaccinated: true,
    spayedNeutered: true
  },
  {
    id: 'adopt-2',
    name: 'Mochi & Clover',
    species: 'Cat',
    breed: 'Domestic Shorthair Bonded Siblings',
    age: '8 Months',
    gender: 'Female',
    personality: ['Inquisitive', 'Playful Pursuers', 'Synchronized Sleepers'],
    story: 'These two sweet tuxedo sisters were rescued from a barn during early spring rains. They love chasing feather wands and curl into a single purring donut at bedtime.',
    image: PRODUCT_BED_IMAGE,
    goodWith: ['Cats', 'Gentle Dogs', 'All Families'],
    vaccinated: true,
    spayedNeutered: true
  }
];

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Elena Vance',
    petName: 'Kona',
    petBreed: 'Golden Retriever (4 yrs)',
    rating: 5,
    date: '3 days ago',
    comment: 'Kona had persistent itching and hot spots on commercial food. Switching to Paws & Meadow Wild Salmon changed everything—within three weeks her coat had a glass-like shine and the scratching completely stopped.',
    productName: 'Wild Pacific Salmon & Sweet Potato Kibble',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Marcus Chen',
    petName: 'Oliver',
    petBreed: 'Scottish Fold (2 yrs)',
    rating: 5,
    date: '1 week ago',
    comment: 'The Chamomile & Lavender Wash smells like a high-end luxury spa, not fake synthetic perfume. Oliver actually relaxed during his bath! His coat has never felt this velvety soft.',
    productName: 'Calming Chamomile & Lavender Botanical Wash',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Clara & Timothy',
    petName: 'Archie',
    petBreed: 'Senior German Shepherd (10 yrs)',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The Nordic Memory Foam bed is genuine furniture-grade craftsmanship. Archie struggles with hip dysplasia, but he now sleeps soundly through the night and wakes up noticeably more agile.',
    productName: 'Nordic Orthopedic Memory Foam Lounge Bed',
    verified: true
  }
];

export const PET_DIET_PROFILES = [
  {
    id: 'profile-puppy',
    name: 'Growing Puppy & Kitten Starter',
    benefits: ['High natural DHA for cognitive development', 'Bone mineralization support', 'Gentle gentle digestion'],
    products: ['prod-1', 'prod-4']
  },
  {
    id: 'profile-sensitive',
    name: 'Allergy & Sensitive Skin Reset',
    benefits: ['Single novel protein source', 'Zero common grains or allergens', 'Omega-3 fatty acids for anti-inflammation'],
    products: ['prod-1', 'prod-2', 'prod-8']
  },
  {
    id: 'profile-senior',
    name: 'Golden Years & Senior Vitality',
    benefits: ['High glucosamine and chondroitin', 'Gentle lean protein for muscle tone', 'Weight management balance'],
    products: ['prod-3', 'prod-8', 'prod-4']
  }
];
