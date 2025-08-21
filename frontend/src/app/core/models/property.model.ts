export interface PropertyImage {
  id: number;
  image: string;
}

export interface Property {
  id?: number;
  title: string;
  propertyType: string;
  description?: string;
  district: string;
  area: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  kitchen: number;
  price: number;
  availableFrom?: string;
  genderPreference: 'boys' | 'girls' | 'unisex';
  createdAt?: string;
  updatedAt?: string;
  images: PropertyImage[];
}