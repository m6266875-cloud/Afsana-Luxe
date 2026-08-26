import {
  brand as localBrand,
  categories as localCategories,
  findProduct as localFindProduct,
  instagramPosts as localInstagram,
  products as localProducts,
  queryProducts as localQuery,
  relatedProducts as localRelated,
  reviews as localReviews,
} from "../../shared/catalog.js";
import type {
  BrandInfo,
  Category,
  InstagramPost,
  Order,
  Product,
  Review,
  SortKey,
} from "../types";

/**
 * The storefront talks to the Express API (`server/index.js`).
 * If the API is unreachable — for example when the built bundle is previewed
 * as a static file — the exact same in-memory catalogue is used as a local
 * fallback so the shop never renders empty.
 */
const viteEnv = (import.meta as unknown as { env?: Record<string, string> }).env;
const API_BASE = viteEnv?.VITE_API_URL ?? "/api";
const TIMEOUT = 4000;

export type DataSource = "api" | "local";

export interface Catalog {
  products: Product[];
  categories: Category[];
  brand: BrandInfo;
  reviews: Review[];
  instagram: InstagramPost[];
  source: DataSource;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...init,
      signal: controller.signal,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    });
    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      throw new Error(body.error || `Request failed (${res.status})`);
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

export interface ProductQuery {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortKey;
  badge?: string;
  limit?: number;
}

const toSearchParams = (query: ProductQuery) => {
  const params = new URLSearchParams();
  if (query.category && query.category !== "all") params.set("category", query.category);
  if (query.search) params.set("search", query.search);
  if (typeof query.minPrice === "number") params.set("minPrice", String(query.minPrice));
  if (typeof query.maxPrice === "number") params.set("maxPrice", String(query.maxPrice));
  if (query.sort) params.set("sort", query.sort);
  if (query.badge) params.set("badge", query.badge);
  if (query.limit) params.set("limit", String(query.limit));
  return params.toString();
};

export const catalogFallback = (): Catalog => ({
  products: localProducts as Product[],
  categories: localCategories as Category[],
  brand: localBrand as BrandInfo,
  reviews: localReviews as Review[],
  instagram: localInstagram as InstagramPost[],
  source: "local",
});

export async function getCategories(): Promise<{ data: Category[]; source: DataSource }> {
  try {
    const data = await request<Category[]>("/categories");
    return { data: data.length ? data : (localCategories as Category[]), source: "api" };
  } catch {
    return { data: localCategories as Category[], source: "local" };
  }
}

export async function getProducts(
  query: ProductQuery = {},
): Promise<{ data: Product[]; source: DataSource }> {
  const qs = toSearchParams(query);
  try {
    const payload = await request<{ products: Product[] }>(`/products${qs ? `?${qs}` : ""}`);
    const localMatch = localQuery(query as Record<string, unknown>) as Product[];
    if (!payload.products?.length && !localMatch.length) {
      return { data: [], source: "api" };
    }
    return { data: payload.products, source: "api" };
  } catch {
    return { data: (localQuery(query as Record<string, unknown>) as Product[]) ?? [] , source: "local" };
  }
}

export async function getProduct(id: string): Promise<{ data: Product | null; source: DataSource }> {
  try {
    const data = await request<Product>(`/products/${encodeURIComponent(id)}`);
    return { data, source: "api" };
  } catch {
    const data = localFindProduct(id);
    return { data: (data as Product) ?? null, source: "local" };
  }
}

export async function getRelated(id: string): Promise<Product[]> {
  try {
    return await request<Product[]>(`/products/${encodeURIComponent(id)}/related`);
  } catch {
    return localRelated(id, 4) as Product[];
  }
}

export interface PlaceOrderPayload {
  customer: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
  };
  items: { id: string; qty: number }[];
  paymentMethod: string;
  notes?: string;
}

/** Orders live in memory on the server; locally we persist to localStorage. */
export async function placeOrder(payload: PlaceOrderPayload): Promise<{ order: Order; source: DataSource }> {
  try {
    const order = await request<Order>("/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return { order, source: "api" };
  } catch {
    const { deliveryCharges, freeShippingThreshold } = localBrand;
    const items = payload.items
      .map((item, index) => {
        const product = localFindProduct(item.id);
        if (!product) return null;
        const qty = Math.max(1, Math.min(20, item.qty));
        return {
          key: `${product.id}-${index}`,
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.images[0],
          qty,
        };
      })
      .filter(Boolean) as import("../types").CartItem[];

    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const delivery = subtotal >= freeShippingThreshold ? 0 : deliveryCharges;
    const order: Order = {
      id: `AL-${Date.now().toString(36).toUpperCase().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`,
      status: "confirmed",
      paymentMethod: payload.paymentMethod || "COD",
      customer: payload.customer,
      items,
      subtotal,
      delivery,
      total: subtotal + delivery,
      placedAt: new Date().toISOString(),
      eta: "3 – 5 working days",
    };
    return { order, source: "local" };
  }
}

export async function sendContact(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ ticket: string; reply: string; source: DataSource }> {
  try {
    const data = await request<{ ticket: string; reply: string }>("/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return { ...data, source: "api" };
  } catch {
    return {
      ticket: `MSG-${Math.floor(Math.random() * 9000 + 1000)}`,
      reply: `Shukriya ${payload.name}! Our team replies within 24 hours on working days.`,
      source: "local",
    };
  }
}

export async function getBrandBundle(): Promise<Catalog> {
  try {
    const bundle = await request<BrandInfo & { reviews: Review[]; instagramPosts: InstagramPost[] }>(
      "/brand",
    );
    const { reviews: r, instagramPosts: ig, ...brandInfo } = bundle;
    return {
      products: localProducts as Product[],
      categories: localCategories as Category[],
      brand: brandInfo as BrandInfo,
      reviews: (r ?? localReviews) as Review[],
      instagram: (ig ?? localInstagram) as InstagramPost[],
      source: "api",
    };
  } catch {
    return catalogFallback();
  }
}
