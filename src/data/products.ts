// src/data/products.ts

export interface Product {
  id: number;
  // documentId?: string; // Remove or comment out if not present in Strapi
  name: string;
  price: number;
  image: string;
  tag?: string;
  category?: string;
  inStock: boolean;
  description?: string;
}