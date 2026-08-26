import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Button, Pill, Reveal, SectionHeading, Skeleton, SmartImage, Stars } from "../components/ui";
import { getProduct, getRelated } from "../lib/api";
import { discountPercent, formatPKR } from "../lib/format";
import { useStore } from "../store/StoreContext";
import { cn } from "../utils/cn";
import NotFound from "./NotFound";

export default function ProductDetails() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted, categories, brand, setCartOpen } = useStore();

  const [product, setProduct] = useState<import("../types").Product | null>(null);
  const [related, setRelated] = useState<import("../types").Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [tab, setTab] = useState<"details" | "care" | "delivery">("details");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setQty(1);
    setActiveImage(0);
    (async () => {
      const [result, relatedResult] = await Promise.all([getProduct(id), getRelated(id)]);
      if (!active) return;
      setProduct(result.data);
      setRelated(relatedResult);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [id]);

  const categoryName = useMemo(
    () => categories.find((c) => c.id === product?.category)?.name ?? product?.category ?? "",
    [categories, product],
  );

  if (loading) {
    return (
      <div className="container-lux grid gap-10 py-16 md:grid-cols-2">
        <Skeleton className="aspect-square w-full" />
        <div className="space-y-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  if (!product) return <NotFound />;

  const off = discountPercent(product.price, product.oldPrice);
  const wished = isWishlisted(product.id);
  const freeOver = brand.freeShippingThreshold;

  const buyNow = () => {
    addToCart(product, qty);
    setCartOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      <section className="border-b border-cream-300 bg-cream-100">
        <div className="container-lux flex flex-wrap items-center gap-2 py-4">
          <nav className="eyebrow flex flex-wrap items-center gap-2 text-[0.5rem] text-cocoa-400">
            <Link to="/" className="transition hover:text-gold-500">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop" className="transition hover:text-gold-500">
              Shop
            </Link>
            <span>/</span>
            <Link to={`/shop?category=${product.category}`} className="transition hover:text-gold-500">
              {categoryName}
            </Link>
            <span>/</span>
            <span className="text-cocoa-700">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="container-lux grid gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-16">
        {/* gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden bg-cream-200">
            <SmartImage
              src={product.images[activeImage]}
              alt={product.name}
              priority
              wrapperClassName="aspect-square w-full"
              className="object-cover transition-transform duration-[1400ms] hover:scale-105"
              fallback={product.images[1] ?? product.images[0]}
            />
            <div className="pointer-events-none absolute top-4 left-4 flex flex-col gap-2">
              {product.badges.includes("bestseller") && <Pill tone="dark">Bestseller</Pill>}
              {product.badges.includes("new") && <Pill tone="gold">New</Pill>}
              {off > 0 && <Pill tone="cream">Save {off}%</Pill>}
            </div>
          </div>

          {product.images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={cn(
                    "overflow-hidden border transition-all duration-300",
                    activeImage === i
                      ? "border-cocoa-900"
                      : "border-cream-300 opacity-70 hover:opacity-100",
                  )}
                >
                  <SmartImage src={img} alt="" wrapperClassName="aspect-square w-full" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* info */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow text-[0.55rem] text-gold-500">{categoryName}</p>
          <h1 className="mt-3 font-display text-4xl leading-[1.08] font-light text-cocoa-900 sm:text-5xl">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2">
              <Stars rating={product.rating} />
              <span className="text-xs font-light text-cocoa-500">
                {product.rating} · {product.reviews} reviews
              </span>
            </span>
            <span className="eyebrow text-[0.5rem] text-cocoa-400">
              {product.stock > 0 ? `${product.stock} in stock` : "Made to order"}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-4xl text-cocoa-900">{formatPKR(product.price)}</span>
            {product.oldPrice ? (
              <span className="text-base font-light text-cocoa-400 line-through">
                {formatPKR(product.oldPrice)}
              </span>
            ) : null}
            {off > 0 ? (
              <span className="eyebrow bg-gold-200 px-2 py-1 text-[0.5rem] text-cocoa-800">
                Save {off}%
              </span>
            ) : null}
          </div>

          <p className="mt-6 text-[0.95rem] leading-relaxed font-light text-cocoa-600">
            {product.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-cream-300">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="h-12 w-12 text-lg text-cocoa-700 transition hover:bg-cream-200"
              >
                −
              </button>
              <span className="w-12 text-center text-sm">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(20, q + 1))}
                aria-label="Increase quantity"
                className="h-12 w-12 text-lg text-cocoa-700 transition hover:bg-cream-200"
              >
                +
              </button>
            </div>

            <Button onClick={() => addToCart(product, qty)} className="flex-1 sm:flex-none sm:px-10">
              Add to Cart
            </Button>
            <Button variant="gold" onClick={buyNow} className="flex-1 sm:flex-none sm:px-10">
              Buy Now
            </Button>

            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
              className={cn(
                "flex h-[50px] w-[50px] items-center justify-center border transition-all duration-300",
                wished
                  ? "border-cocoa-900 bg-cocoa-900 text-gold-300"
                  : "border-cocoa-900/20 text-cocoa-700 hover:border-cocoa-900",
              )}
            >
              <svg viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.3" className="h-5 w-5">
                <path d="M12 20s-7-4.4-7-9.3A4.1 4.1 0 0 1 12 7a4.1 4.1 0 0 1 7 3.7c0 4.9-7 9.3-7 9.3z" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="mt-8 grid gap-3 border-y border-cream-300 py-6 sm:grid-cols-2">
            {[
              ["Delivery", `Rs. 199 nationwide · free above ${formatPKR(freeOver)}`],
              ["Payment", "Cash on Delivery"],
              ["Packaging", product.details.packaging],
              ["Warranty", product.details.warranty],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="eyebrow text-[0.5rem] text-cocoa-400">{label}</p>
                <p className="mt-1 text-[0.85rem] font-light text-cocoa-700">{value}</p>
              </div>
            ))}
          </div>

          {/* tabs */}
          <div className="mt-8">
            <div className="flex gap-6 border-b border-cream-300">
              {(
                [
                  ["details", "Product Details"],
                  ["care", "Care"],
                  ["delivery", "Shipping"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className={cn(
                    "eyebrow -mb-px border-b-2 pb-3 text-[0.55rem] transition",
                    tab === key
                      ? "border-gold-400 text-cocoa-900"
                      : "border-transparent text-cocoa-400 hover:text-cocoa-700",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="pt-6">
              {tab === "details" && (
                <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {Object.entries(product.details)
                    .filter(([, value]) => Boolean(value))
                    .map(([key, value]) => (
                      <div key={key} className="border-b border-cream-200 pb-3">
                        <dt className="eyebrow text-[0.5rem] text-cocoa-400">
                          {key.replace(/([A-Z])/g, " $1")}
                        </dt>
                        <dd className="mt-1 text-[0.85rem] font-light text-cocoa-700">{value}</dd>
                      </div>
                    ))}
                </dl>
              )}
              {tab === "care" && (
                <ul className="space-y-3 text-[0.85rem] font-light text-cocoa-600">
                  <li>· {product.details.care}</li>
                  <li>· Store in the pouch provided, away from direct sunlight.</li>
                  <li>· Put jewellery on after applying lotion, perfume or hairspray.</li>
                  <li>· Wipe gently with the enclosed cloth after each wear.</li>
                </ul>
              )}
              {tab === "delivery" && (
                <ul className="space-y-3 text-[0.85rem] font-light text-cocoa-600">
                  <li>· Dispatched from Lahore within 24 working hours.</li>
                  <li>· 3 – 5 working days nationwide (TCS / Leopards).</li>
                  <li>· Delivery Rs. 199 · free on orders above {formatPKR(freeOver)}.</li>
                  <li>· Cash on Delivery available across Pakistan.</li>
                  <li>· 7 day returns on unworn pieces in original packaging.</li>
                </ul>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* related */}
      <section className="border-t border-cream-300 bg-cream-100 py-20">
        <div className="container-lux">
          <Reveal>
            <SectionHeading
              eyebrow="You may also love"
              title="Complete the look"
              description={`More pieces from ${categoryName || "the collection"} and beyond.`}
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-7">
            {related.map((item, index) => (
              <ProductCard key={item.id} product={item} index={index} compact />
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Button to="/shop" variant="outline">
              Continue Shopping
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
