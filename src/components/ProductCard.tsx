import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import type { Product } from "../types";
import { cn } from "../utils/cn";
import { discountPercent, formatPKR } from "../lib/format";
import { Pill, SmartImage, Stars } from "./ui";

interface ProductCardProps {
  product: Product;
  index?: number;
  compact?: boolean;
}

export default function ProductCard({ product, index = 0, compact = false }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted, setQuickView, categories } = useStore();
  const wished = isWishlisted(product.id);
  const off = discountPercent(product.price, product.oldPrice);
  const categoryName = categories.find((c) => c.id === product.category)?.name ?? product.category;
  const hoverImage = product.images[1] ?? product.images[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.35), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col"
    >
      <div className="relative overflow-hidden bg-cream-200">
        <Link to={`/product/${product.id}`} aria-label={product.name} className="block">
          <div className="relative aspect-4/5 w-full">
            <SmartImage
              src={product.images[0]}
              alt={product.name}
              wrapperClassName="absolute inset-0 h-full w-full"
              className="transition-all duration-[1100ms] ease-out group-hover:scale-[1.06]"
              fallback={hoverImage}
            />
            {hoverImage !== product.images[0] && (
              <SmartImage
                src={hoverImage}
                alt=""
                wrapperClassName="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                className="scale-[1.04]"
                fallback={product.images[0]}
              />
            )}
          </div>
        </Link>

        {/* badges */}
        <div className="pointer-events-none absolute top-3 left-3 flex flex-col items-start gap-2">
          {product.badges.includes("bestseller") && <Pill tone="dark">Bestseller</Pill>}
          {product.badges.includes("new") && <Pill tone="gold">New</Pill>}
          {off > 0 && <Pill tone="cream">−{off}%</Pill>}
        </div>

        {/* wishlist */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={cn(
            "absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-all duration-300",
            wished
              ? "bg-cocoa-900 text-gold-300"
              : "bg-cream-50/85 text-cocoa-700 hover:bg-cocoa-900 hover:text-gold-300",
          )}
        >
          <svg viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.3" className="h-4 w-4">
            <path d="M12 20s-7-4.4-7-9.3A4.1 4.1 0 0 1 12 7a4.1 4.1 0 0 1 7 3.7c0 4.9-7 9.3-7 9.3z" strokeLinecap="round" />
          </svg>
        </button>

        {/* quick view */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
          <button
            type="button"
            onClick={() => setQuickView(product)}
            className="eyebrow w-full bg-cream-50/95 py-3 text-[0.58rem] text-cocoa-800 shadow-card backdrop-blur transition hover:bg-cocoa-900 hover:text-cream-100"
          >
            Quick View
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow text-[0.55rem] text-gold-500">{categoryName}</p>
          <Stars rating={product.rating} className="opacity-80" />
        </div>

        <h3 className="mt-2 font-display text-lg leading-snug font-normal text-cocoa-900">
          <Link to={`/product/${product.id}`} className="transition-colors hover:text-gold-500">
            {product.name}
          </Link>
        </h3>

        {!compact && (
          <p className="mt-1 line-clamp-2 text-[0.8rem] leading-relaxed font-light text-cocoa-500">
            {product.short}
          </p>
        )}

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-xl text-cocoa-900">{formatPKR(product.price)}</span>
          {product.oldPrice ? (
            <span className="text-xs font-light text-cocoa-400 line-through">
              {formatPKR(product.oldPrice)}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="eyebrow mt-4 w-full border border-cocoa-900/20 py-3 text-[0.58rem] text-cocoa-800 transition-all duration-500 hover:border-cocoa-900 hover:bg-cocoa-900 hover:text-cream-100"
        >
          Add to Cart
        </button>
      </div>
    </motion.article>
  );
}
