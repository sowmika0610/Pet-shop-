export type PetType = 'all' | 'dog' | 'cat' | 'small_pet';

export type ProductCategory = 'all' | 'food' | 'treats' | 'grooming' | 'beds' | 'accessories' | 'wellness';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  petType: PetType;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  inStock: boolean;
  weightOrSize: string;
  description: string;
  keyFeatures: string[];
  ingredientsOrMaterials: string[];
  dietaryTags?: string[];
  analysis?: { label: string; value: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface GroomingService {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  suitableFor: string;
  includes: string[];
}

export interface GroomingBooking {
  id: string;
  petName: string;
  petType: string;
  petBreed: string;
  petWeight: string;
  service: GroomingService;
  date: string;
  timeSlot: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  specialNotes?: string;
  status: 'Confirmed' | 'Pending';
  totalPrice: number;
}

export interface AdoptionPet {
  id: string;
  name: string;
  species: 'Dog' | 'Cat';
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  personality: string[];
  story: string;
  image: string;
  goodWith: string[];
  vaccinated: boolean;
  spayedNeutered: boolean;
}

export interface CustomerReview {
  id: string;
  author: string;
  petName: string;
  petBreed: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
  verified: boolean;
}
