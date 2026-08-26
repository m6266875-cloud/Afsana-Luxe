import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getBrandBundle,
  getCategories,
  getProducts,
  placeOrder as apiPlaceOrder,
  type DataSource,
} from "../lib/api";
import type { BrandInfo, CartItem, Category, InstagramPost, Order, Product, Review } from "../types";

const CART_KEY = "afsanaluxe.cart.v1";
const WISHLIST_KEY = "afsanaluxe.wishlist.v1";
const ORDER_KEY = "afsanaluxe.lastOrder.v1";

interface Toast {
  id: number;
  title: string;
  detail?: string;
  tone: "success" | "info" | "error";
}

interface StoreValue {
  products: Product[];
  categories: Category[];
  brand: BrandInfo;
  reviews: Review[];
  instagram: InstagramPost[];
  loading: boolean;
  source: DataSource;

  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  delivery: number;
  total: number;
  addToCart: (product: Product, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;

  wishlist: string[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;

  lastOrder: Order | null;
  submitOrder: (payload: {
    customer: {
      fullName: string;
      phone: string;
      email: string;
      address: string;
      city: string;
      postalCode: string;
    };
    notes?: string;
  }) => Promise<Order>;

  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  quickView: Product | null;
  setQuickView: (product: Product | null) => void;
  toasts: Toast[];
  pushToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — cart still works for this session */
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brand, setBrand] = useState<BrandInfo | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [instagram, setInstagram] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<DataSource>("local");

  const [cart, setCart] = useState<CartItem[]>(() => read<CartItem[]>(CART_KEY, []));
  const [wishlist, setWishlist] = useState<string[]>(() => read<string[]>(WISHLIST_KEY, []));
  const [lastOrder, setLastOrder] = useState<Order | null>(() => read<Order | null>(ORDER_KEY, null));

  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  /* ── catalogue from the Express API (with local fallback) ── */
  useEffect(() => {
    let active = true;
    (async () => {
      const [bundle, categoryResult, productResult] = await Promise.all([
        getBrandBundle(),
        getCategories(),
        getProducts({ sort: "featured" }),
      ]);
      if (!active) return;
      setProducts(productResult.data.length ? productResult.data : bundle.products);
      setBrand(bundle.brand);
      setReviews(bundle.reviews);
      setInstagram(bundle.instagram);
      setSource(bundle.source);
      if (categoryResult.data.length) setCategories(categoryResult.data);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => write(CART_KEY, cart), [cart]);
  useEffect(() => write(WISHLIST_KEY, wishlist), [wishlist]);
  useEffect(() => {
    if (lastOrder) write(ORDER_KEY, lastOrder);
  }, [lastOrder]);

  /* lock body scroll while an overlay is open */
  useEffect(() => {
    const locked = cartOpen || quickView !== null;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, quickView]);

  const pushToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-2), { ...toast, id }]);
    window.setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToCart = useCallback(
    (product: Product, qty = 1) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, qty: Math.min(20, item.qty + qty) }
              : item,
          );
        }
        return [
          ...prev,
          {
            key: `${product.id}-${prev.length}`,
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.images[0],
            qty: Math.min(20, Math.max(1, qty)),
          },
        ];
      });
      pushToast({
        title: "Added to your bag",
        detail: `${product.name} · Qty ${qty}`,
        tone: "success",
      });
      setCartOpen(true);
    },
    [pushToast],
  );

  const setQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((item) => item.key !== key)
        : prev.map((item) => (item.key === key ? { ...item, qty: Math.min(20, qty) } : item)),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((prev) => {
        const exists = prev.includes(product.id);
        pushToast({
          title: exists ? "Removed from wishlist" : "Saved to wishlist",
          detail: product.name,
          tone: exists ? "info" : "success",
        });
        return exists ? prev.filter((id) => id !== product.id) : [...prev, product.id];
      });
    },
    [pushToast],
  );

  const subtotal = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.qty, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart]);
  const deliveryCharges = brand?.deliveryCharges ?? 199;
  const freeOver = brand?.freeShippingThreshold ?? 1500;
  const delivery = subtotal === 0 || subtotal >= freeOver ? 0 : deliveryCharges;

  const submitOrder = useCallback<StoreValue["submitOrder"]>(
    async ({ customer, notes }) => {
      const { order, source: orderSource } = await apiPlaceOrder({
        customer,
        items: cart.map((i) => ({ id: i.id, qty: i.qty })),
        paymentMethod: "Cash on Delivery",
        notes,
      });
      setLastOrder(order);
      setCart([]);
      void orderSource;
      return order;
    },
    [cart],
  );

  const value: StoreValue = {
    products,
    categories: categories.length ? categories : [],
    brand:
      brand ??
      ({
        name: "Afsana Luxe",
        tagline: "Our products add beauty to your arm.",
        since: 2021,
        city: "Lahore, Pakistan",
        email: "hello@afsanaluxe.pk",
        supportEmail: "care@afsanaluxe.pk",
        phone: "+92 300 1234567",
        whatsapp: "923001234567",
        instagram: "https://instagram.com/afsanaluxe",
        instagramHandle: "@afsanaluxe",
        ceo: { name: "Zain", handle: "@zainch8603", role: "Founder & CEO" },
        manager: { name: "Ayesha", handle: "@moon_lit_vibes06", role: "Brand Manager" },
        address: "Studio 12, Gulberg III, Lahore, Punjab, Pakistan",
        hours: "Mon – Sat · 11:00 AM – 9:00 PM (PKT)",
        freeShippingThreshold: 1500,
        deliveryCharges: 199,
      } as BrandInfo),
    reviews,
    instagram,
    loading,
    source,
    cart,
    cartCount,
    subtotal,
    delivery,
    total: subtotal + delivery,
    addToCart,
    setQty,
    removeItem,
    clearCart,
    isInCart: (id) => cart.some((item) => item.id === id),
    wishlist,
    toggleWishlist,
    isWishlisted: (id) => wishlist.includes(id),
    lastOrder,
    submitOrder,
    cartOpen,
    setCartOpen,
    quickView,
    setQuickView,
    toasts,
    pushToast,
    dismissToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

/** Convenience hook for the resolved category list (adds "all"). */
export function useCategoryOptions() {
  const { categories } = useStore();
  return categories;
}
