export type Badge = "bestseller" | "new" | "featured";

export interface ProductDetails {
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
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  badges: Badge[];
  addedAt: string;
  short: string;
  description: string;
  images: string[];
  details: ProductDetails;
}

export interface Category {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  count?: number;
  from?: number;
}

export interface BrandInfo {
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

export interface Review {
  name: string;
  city: string;
  rating: number;
  product: string;
  text: string;
}

export interface InstagramPost {
  image: string;
  caption: string;
  likes: number;
}

export interface CartItem {
  key: string;
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  qty: number;
}

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface Order {
  id: string;
  status: string;
  paymentMethod: string;
  notes?: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
  placedAt: string;
  eta: string;
}

export type SortKey =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest"
  | "name-asc"
  | "name-desc";
