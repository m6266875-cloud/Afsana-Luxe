/** Type declarations for shared/catalog.js (imported as "../../shared/catalog.js"). */

export interface ProductDetail {
  material: string;
  finish: string;
  stones: string;
  size: string;
  weight: string;
  closure: string;
  packaging: string;
  care: string;
  warranty: string;
  movement?: string;
  [key: string]: string | undefined;
}

export interface CatalogProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  badges: string[];
  addedAt: string;
  short: string;
  description: string;
  images: string[];
  details: ProductDetail;
}

export interface CatalogCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface CatalogReview {
  name: string;
  city: string;
  rating: number;
  product: string;
  text: string;
}

export interface CatalogPost {
  image: string;
  caption: string;
  likes: number;
}

export interface CatalogBrand {
  name: string;
  tagline: string;
  since: number;
  city: string;
  email: string;
  supportEmail: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  instagramHandle: string;
  ceo: { name: string; handle: string; role: string };
  manager: { name: string; handle: string; role: string };
  address: string;
  hours: string;
  freeShippingThreshold: number;
  deliveryCharges: number;
}

export declare const brand: CatalogBrand;
export declare const categories: CatalogCategory[];
export declare const products: CatalogProduct[];
export declare const reviews: CatalogReview[];
export declare const instagramPosts: CatalogPost[];
export declare function findProduct(id: string): CatalogProduct | undefined;
export declare function relatedProducts(id: string, limit?: number): CatalogProduct[];
export declare function queryProducts(query?: Record<string, unknown>): CatalogProduct[];
