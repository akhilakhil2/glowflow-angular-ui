// src/app/models/product.model.ts
export interface Product {
  
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviewCount: number;
  skinType: string[];
  formulation: string;
  color: string[];
  countryOfOrigin: string;
  images: string[];
  // Make sure 'id' is here if your component expects it!
  id: string; 
}

export interface MakeupData {
  [categoryName: string]: {
    [productId: string]: Product;
  };
}