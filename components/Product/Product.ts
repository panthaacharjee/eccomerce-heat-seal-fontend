// types/Product.ts or wherever your Product interface is defined
export interface Product {
  id: number;
  title: string;
  productType: string;
  price: number;
  size?: string;
  image?: string; // Keep for backward compatibility
  images?: string[]; // Add this for multiple images
  description: string;
  rating: number;
  features?: string[];
}

export type SortOption =
  | "title-asc"
  | "title-desc"
  | "price-asc"
  | "price-desc"
  | "size-asc"
  | "size-desc";
