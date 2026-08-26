import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Button, Pill, Reveal, Skeleton } from "../components/ui";
import { getProducts, type DataSource } from "../lib/api";
import { formatPKR } from "../lib/format";
import { useStore } from "../store/StoreContext";
import type { Product, SortKey } from "../types";
import { cn } from "../utils/cn";

const PRICE_MIN = 400;
const PRICE_MAX = 2000;

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "name-asc", label: "Name: A – Z" },
];

const priceBands = [
  { label: "All prices", min: PRICE_MIN, max: PRICE_MAX },
  { label: "Under Rs. 800", min: PRICE_MIN, max: 799 },
  { label: "Rs. 800 – 1,200", min: 800, max: 1200 },
  { label: "Rs. 1,200 – 2,000", min: 1200, max: PRICE_MAX },
];

export default function Shop() {
  const { categories, wishlist, products: localProducts } = useStore();
  const [params, setParams] = useSearchParams();

  const category = params.get("category") ?? "all";
  const search = params.get("search") ?? "";
  const sort = (params.get("sort") as SortKey) ?? "featured";
  const wishlistOnly = params.get("filter") === "wishlist";

  const [band, setBand] = useState(0);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<DataSource>("local");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [term, setTerm] = useState(search);

  useEffect(() => setTerm(search), [search]);

  /* fetch from the Express API whenever a filter changes (debounced search) */
  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(async () => {
      setLoading(true);
      const result = await getProducts({
        category,
        search,
        sort,
        minPrice: priceBands[band].min,
        maxPrice: Math.min(maxPrice, priceBands[band].max),
      });
      if (!active) return;
      setItems(result.data);
      setSource(result.source);
      setLoading(false);
    }, search ? 280 : 0);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [category, search, sort, band, maxPrice]);

  const visible = useMemo(
    () => (wishlistOnly ? items.filter((p) => wishlist.includes(p.id)) : items),
    [items, wishlistOnly, wishlist],
  );

  const setParam = (key: string, value?: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === "all" || (key === "filter" && value !== "wishlist")) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const activeCategory = categories.find((c) => c.id === category);
  const heading = wishlistOnly ? "Your Wishlist" : (activeCategory?.name ?? "The Full Collection");

  return (
    <>
      {/* header */}
      <section className="border-b border-cream-300 bg-cream-100">
        <div className="container-lux py-14 md:py-20">
          <Reveal>
            <nav className="eyebrow flex items-center gap-2 text-[0.5rem] text-cocoa-400">
              <Link to="/" className="transition hover:text-gold-500">
                Home
              </Link>
              <span>/</span>
              <span className="text-cocoa-700">{heading}</span>
            </nav>
            <h1 className="mt-5 font-display text-4xl leading-none font-light text-cocoa-900 sm:text-5xl md:text-6xl">
              {heading}
            </h1>
            <p className="mt-4 max-w-xl text-[0.9rem] leading-relaxed font-light text-cocoa-500">
              {wishlistOnly
                ? "Pieces you have saved for later. Tap the heart on any product to add more."
                : (activeCategory?.description ??
                  "Thirty hand-finished pieces — watches, bracelets, pendants, earrings and sets — every one between Rs. 400 and Rs. 2,000.")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* toolbar */}
      <section className="sticky top-[96px] z-30 border-b border-cream-300 bg-cream-50/95 backdrop-blur-lg md:top-[110px]">
        <div className="container-lux flex flex-col gap-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex min-w-[200px] flex-1 items-center gap-3 border border-cream-300 bg-cream-50 px-4 py-2.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-4 w-4 shrink-0 text-cocoa-400">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                value={term}
                onChange={(e) => {
                  setTerm(e.target.value);
                  setParam("search", e.target.value || undefined);
                }}
                placeholder="Search pieces…"
                aria-label="Search products"
                className="w-full bg-transparent text-sm font-light text-cocoa-900 placeholder:text-cocoa-400 focus:outline-none"
              />
              {term && (
                <button
                  type="button"
                  onClick={() => {
                    setTerm("");
                    setParam("search", undefined);
                  }}
                  aria-label="Clear search"
                  className="text-xs text-cocoa-400 transition hover:text-cocoa-900"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="eyebrow hidden text-[0.5rem] text-cocoa-400 sm:block">
                Sort
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setParam("sort", e.target.value)}
                className="border border-cream-300 bg-cream-50 px-3 py-2.5 text-xs font-light text-cocoa-800 focus:border-gold-400 focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setFiltersOpen((v) => !v)}
                className="eyebrow border border-cocoa-900/20 px-4 py-2.5 text-[0.55rem] text-cocoa-800 transition hover:border-cocoa-900 lg:hidden"
              >
                Filters
              </button>
            </div>
          </div>

          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            <CategoryChip active={category === "all" && !wishlistOnly} onClick={() => setParam("category", "all")}>
              All
            </CategoryChip>
            {categories.map((c) => (
              <CategoryChip
                key={c.id}
                active={category === c.id && !wishlistOnly}
                onClick={() => setParam("category", c.id)}
              >
                {c.name}
              </CategoryChip>
            ))}
            <CategoryChip active={wishlistOnly} onClick={() => setParam("filter", wishlistOnly ? undefined : "wishlist")}>
              ♥ Wishlist ({wishlist.length})
            </CategoryChip>
          </div>

          <AnimatePresence initial={false}>
            {(
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn("flex-col gap-4 lg:flex", filtersOpen ? "flex" : "hidden")}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="no-scrollbar flex gap-2 overflow-x-auto">
                    {priceBands.map((b, i) => (
                      <button
                        key={b.label}
                        type="button"
                        onClick={() => setBand(i)}
                        className={cn(
                          "eyebrow shrink-0 border px-3 py-2 text-[0.5rem] transition",
                          band === i
                            ? "border-cocoa-900 bg-cocoa-900 text-cream-100"
                            : "border-cream-300 text-cocoa-600 hover:border-cocoa-400",
                        )}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="eyebrow shrink-0 text-[0.5rem] text-cocoa-400">Up to</span>
                    <input
                      type="range"
                      min={PRICE_MIN}
                      max={PRICE_MAX}
                      step={50}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      aria-label="Maximum price"
                      className="h-1 w-40 accent-gold-500"
                    />
                    <span className="font-display text-base whitespace-nowrap text-cocoa-900">
                      {formatPKR(maxPrice)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* grid */}
      <section className="container-lux py-12 md:py-16">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-8">
          <p className="text-sm font-light text-cocoa-500">
            Showing <strong className="font-medium text-cocoa-900">{visible.length}</strong> of{" "}
            {localProducts.length} pieces
            {search ? (
              <>
                {" "}
                for “<span className="text-cocoa-800">{search}</span>”
              </>
            ) : null}
          </p>
          <Pill tone="cream">{source === "api" ? "Live API data" : "Studio catalogue"}</Pill>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-7">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-4/5 w-full" />
                <Skeleton className="mt-4 h-3 w-1/3" />
                <Skeleton className="mt-2 h-4 w-2/3" />
                <Skeleton className="mt-3 h-4 w-1/4" />
              </div>
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="border border-cream-300 bg-cream-100 px-6 py-20 text-center">
            <p className="font-display text-3xl text-cocoa-900">Nothing matches — yet</p>
            <p className="mx-auto mt-3 max-w-md text-sm font-light text-cocoa-500">
              {wishlistOnly
                ? "Your wishlist is empty. Tap the heart on any piece to save it here."
                : "Try a different category, widen your price range, or clear the search."}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                onClick={() => {
                  setBand(0);
                  setMaxPrice(PRICE_MAX);
                  setParams(new URLSearchParams(), { replace: true });
                  setTerm("");
                }}
              >
                Reset Filters
              </Button>
              <Button to="/shop" variant="outline">
                Browse Everything
              </Button>
            </div>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-7">
            {visible.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        )}
      </section>
    </>
  );
}

function CategoryChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "eyebrow shrink-0 border px-4 py-2.5 text-[0.55rem] whitespace-nowrap transition-all duration-300",
        active
          ? "border-cocoa-900 bg-cocoa-900 text-cream-100"
          : "border-cream-300 text-cocoa-600 hover:border-cocoa-400 hover:text-cocoa-900",
      )}
    >
      {children}
    </button>
  );
}
