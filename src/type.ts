// types.ts
export interface Medicine {
  _id?: string;
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  availability: string;
  description: string;
  prescription: boolean;
  rare: boolean;
  keywords: string[];
  manufacturer: string;
  dosage: string;
  prescriptionRequired: boolean;
  inStock: boolean;
  stockQuantity: number;
  featured: boolean;
  ingredients: string[];
  sideEffects: string[];
  warnings: string[];
  pharmacyLocations?: PharmacyLocation[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItem extends Medicine {
  quantity: number;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  confirmPassword: string;
}

export interface PharmacyLocation {
  name: string;       // Pharmacy name
  address: string;    // Address
  latitude: number;   // Coordinates for map/distance features
  longitude: number;
  phone?: string;     // Phone number
  distance?: string;  // Distance from user location
  stock: number;      // How many units available
}
