import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { discountPercent, formatPKR } from "../lib/format";
import { Button, Pill, SmartImage, Stars } from "./ui";
import { cn } from "../utils/cn";

export default function QuickView() {
  const { quickView, setQuickView, addToCart, toggleWishlist, isWishlisted, categories } = useStore();
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setQty(1);
    setActive(0);
  }, [quickView]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQuickView(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setQuickView]);

  const product = quickView;
  const wished = product ? isWishlisted(product.id) : false;
  const off = product ? discountPercent(product.price, product.oldPrice) : 0;
  const categoryName =
    product ? (categories.find((c) => c.id === product.category)?.name ?? product.category) : "";

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickView(null)}
            className="absolute inset-0 bg-cocoa-950/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 grid max-h-[92vh] w-full max-w-4xl grid-cols-1 overflow-y-auto bg-cream-50 shadow-luxe sm:max-h-[86vh] md:grid-cols-2"
          >
            <button
              type="button"
              onClick={() => setQuickView(null)}
              aria-label="Close quick view"
              className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/90 text-cocoa-700 backdrop-blur transition hover:bg-cocoa-900 hover:text-cream-100"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-4 w-4">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            <div className="bg-cream-200 p-4 sm:p-6">
              <SmartImage
                src={product.images[active] ?? product.images[0]}
                alt={product.name}
                priority
                wrapperClassName="aspect-square w-full"
              />
              {product.images.length > 1 && (
                <div className="mt-3 flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={img + i}
                      type="button"
                      onClick={() => setActive(i)}
                      className={cn(
                        "h-16 w-16 overflow-hidden border transition",
                        active === i ? "border-cocoa-900" : "border-transparent opacity-70 hover:opacity-100",
                      )}
                    >
                      <SmartImage src={img} alt="" wrapperClassName="h-full w-full" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <p className="eyebrow text-[0.55rem] text-gold-500">{categoryName}</p>
                {off > 0 && <Pill tone="dark">Save {off}%</Pill>}
              </div>
              <h2 className="mt-3 font-display text-3xl leading-tight text-cocoa-900">{product.name}</h2>
              <div className="mt-3 flex items-center gap-3">
                <Stars rating={product.rating} />
                <span className="text-xs font-light text-cocoa-500">
                  {product.rating} · {product.reviews} reviews
                </span>
              </div>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-display text-3xl text-cocoa-900">{formatPKR(product.price)}</span>
                {product.oldPrice ? (
                  <span className="text-sm font-light text-cocoa-400 line-through">
                    {formatPKR(product.oldPrice)}
                  </span>
                ) : null}
              </div>

              <p className="mt-5 text-sm leading-relaxed font-light text-cocoa-600">{product.short}</p>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center border border-cream-300">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="h-11 w-11 text-cocoa-700 transition hover:bg-cream-200"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(20, q + 1))}
                    aria-label="Increase quantity"
                    className="h-11 w-11 text-cocoa-700 transition hover:bg-cream-200"
                  >
                    +
                  </button>
                </div>
                <Button
                  className="flex-1"
                  onClick={() => {
                    addToCart(product, qty);
                    setQuickView(null);
                  }}
                >
                  Add to Cart
                </Button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  aria-label="Toggle wishlist"
                  className={cn(
                    "flex h-[46px] w-[46px] items-center justify-center border transition",
                    wished
                      ? "border-cocoa-900 bg-cocoa-900 text-gold-300"
                      : "border-cocoa-900/20 text-cocoa-700 hover:border-cocoa-900",
                  )}
                >
                  <svg viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.3" className="h-4 w-4">
                    <path d="M12 20s-7-4.4-7-9.3A4.1 4.1 0 0 1 12 7a4.1 4.1 0 0 1 7 3.7c0 4.9-7 9.3-7 9.3z" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <Link
                to={`/product/${product.id}`}
                onClick={() => setQuickView(null)}
                className="eyebrow mt-6 self-start border-b border-cocoa-900/30 pb-1 text-[0.58rem] text-cocoa-700 transition hover:border-gold-400 hover:text-gold-500"
              >
                View full details
              </Link>

              <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-cream-300 pt-5 text-[0.75rem]">
                {[
                  ["Material", product.details.material],
                  ["Size", product.details.size],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="eyebrow text-[0.5rem] text-cocoa-400">{k}</dt>
                    <dd className="mt-1 font-light text-cocoa-700">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
