export interface PropertyImage {
  id: number;
  image: string;
}

export interface Property {
  id: number;
  title: string;
  propertyType: string;
  description?: string;
  bedrooms: number;
  bathrooms: number;
  kitchen: number;
  district: string;
  area: string;
  address: string;
  price: number;
  availableFrom?: string;
  genderPreference: 'boys' | 'girls' | 'unisex';
  isAvailable: boolean;
  uploadedByName: string;
  createdAt?: string;
  updatedAt?: string;
  images: PropertyImage[];
}