import { motion } from "framer-motion";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Button, Pill, Reveal, SectionHeading, SmartImage, Skeleton, Stars } from "../components/ui";
import { useStore } from "../store/StoreContext";
import { formatPKR } from "../lib/format";

const promises = [
  {
    icon: "✦",
    title: "Hand-Finished",
    text: "Every piece is polished and quality-checked by our Lahore studio team.",
  },
  {
    icon: "⌘",
    title: "Anti-Tarnish Plating",
    text: "18K gold plating with a protective coat that survives Pakistani summers.",
  },
  {
    icon: "❖",
    title: "Cash on Delivery",
    text: "Order first, pay when your parcel reaches your doorstep, anywhere in Pakistan.",
  },
  {
    icon: "◇",
    title: "7 Day Returns",
    text: "Changed your mind? Return unworn pieces within seven days, no questions.",
  },
];

export default function Home() {
  const { products, categories, reviews, instagram, brand, loading } = useStore();

  const bestsellers = useMemo(
    () => products.filter((p) => p.badges.includes("bestseller")).slice(0, 4),
    [products],
  );
  const newArrivals = useMemo(
    () => [...products].sort((a, b) => +new Date(b.addedAt) - +new Date(a.addedAt)).slice(0, 4),
    [products],
  );
  const watches = useMemo(
    () => products.filter((p) => p.category === "watches").slice(0, 3),
    [products],
  );
  const jewellery = useMemo(
    () => products.filter((p) => p.category !== "watches").slice(4, 10),
    [products],
  );
  const heroProduct = watches[0] ?? products[0];
  const cheapest = products.length ? Math.min(...products.map((p) => p.price)) : 400;

  if (loading) {
    return (
      <div className="container-lux py-16">
        <Skeleton className="h-[60vh] w-full" />
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-72" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ─────────────── HERO ─────────────── */}
      <section className="relative isolate overflow-hidden bg-cocoa-950">
        <div className="absolute inset-0">
          <SmartImage
            src="/images/hero.jpg"
            alt="Afsana Luxe gold watch and bangles on chocolate silk"
            priority
            wrapperClassName="h-full w-full"
            className="scale-105 object-cover opacity-70"
            fallback="https://images.pexels.com/photos/18285660/pexels-photo-18285660.jpeg?auto=compress&cs=tinysrgb&w=1600"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cocoa-950 via-cocoa-950/85 to-cocoa-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa-950 via-transparent to-cocoa-950/40" />
        </div>

        <div className="container-lux relative flex min-h-[86vh] flex-col justify-center py-24 md:min-h-[92vh]">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="eyebrow flex items-center gap-3 text-[0.55rem] text-gold-300"
          >
            <span className="h-px w-10 bg-gold-400/70" />
            Pakistani Jewellery &amp; Watches · Est. {brand.since}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[3.2rem] leading-[0.92] font-light tracking-[0.02em] text-cream-50 uppercase sm:text-7xl lg:text-[6.5rem]"
          >
            Afsana
            <span className="block pl-[0.12em] text-gold-300 italic">Luxe</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.38 }}
            className="mt-7 max-w-md font-display text-2xl leading-snug font-light text-cream-100 italic sm:text-3xl"
          >
            “{brand.tagline}”
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.48 }}
            className="mt-5 max-w-lg text-sm leading-relaxed font-light text-cream-200/75 sm:text-[0.95rem]"
          >
            Watches, bracelets, pendants, earrings and complete jewellery sets — designed in Lahore,
            priced from {formatPKR(cheapest)} so that everyday elegance stays within reach.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.58 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button to="/shop" size="lg">
              Shop Now
            </Button>
            <Button to="/shop?category=watches" variant="outlineLight" size="lg">
              Explore Watches
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-cream-100/10 pt-6"
          >
            {[
              ["30+", "Curated pieces"],
              ["4.8★", "Average rating"],
              ["COD", "Nationwide"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-2xl text-cream-100">{value}</p>
                <p className="eyebrow mt-1 text-[0.5rem] text-cream-300/60">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* floating featured piece */}
        {heroProduct && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute right-10 bottom-16 hidden w-64 xl:block"
          >
            <Link
              to={`/product/${heroProduct.id}`}
              className="group block border border-cream-100/15 bg-cocoa-950/60 p-4 backdrop-blur-md transition hover:border-gold-400/60"
            >
              <SmartImage
                src={heroProduct.images[0]}
                alt={heroProduct.name}
                wrapperClassName="aspect-square w-full"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="mt-4">
                <Pill tone="gold">Featured</Pill>
                <p className="mt-3 font-display text-lg text-cream-100">{heroProduct.name}</p>
                <p className="mt-1 text-sm font-light text-gold-300">{formatPKR(heroProduct.price)}</p>
              </div>
            </Link>
          </motion.div>
        )}
      </section>

      {/* ─────────────── FEATURED CATEGORIES ─────────────── */}
      <section className="container-lux py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Categories"
            title="Find the piece that tells your story"
            description="Five houses of craft — from slim gold watches to complete nikkah sets, all between Rs. 400 and Rs. 2,000."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal
              key={category.id}
              delay={index * 0.07}
              className={index === 0 ? "sm:col-span-2" : ""}
            >
              <Link
                to={`/shop?category=${category.id}`}
                className="group relative block h-full min-h-[240px] overflow-hidden bg-cocoa-900"
              >
                <SmartImage
                  src={category.image}
                  alt={category.name}
                  wrapperClassName="absolute inset-0 h-full w-full"
                  className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa-950/90 via-cocoa-950/25 to-transparent" />
                <div className="relative flex h-full min-h-[240px] flex-col justify-end p-6 md:p-8">
                  <p className="eyebrow text-[0.5rem] text-gold-300">{category.tagline}</p>
                  <h3
                    className={
                      index === 0
                        ? "mt-3 font-display text-4xl font-light text-cream-50 md:text-5xl"
                        : "mt-3 font-display text-2xl font-light text-cream-50 md:text-3xl"
                    }
                  >
                    {category.name}
                  </h3>
                  <p className="mt-2 max-w-xs text-[0.82rem] leading-relaxed font-light text-cream-200/75">
                    {category.description}
                  </p>
                  <span className="eyebrow mt-5 inline-flex items-center gap-2 text-[0.55rem] text-gold-300 transition-all duration-500 group-hover:gap-4">
                    Shop {category.name}
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─────────────── BEST SELLERS ─────────────── */}
      <section className="border-y border-cream-300 bg-cream-100 py-20 md:py-28">
        <div className="container-lux">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Best Sellers"
              title="Loved across Pakistan"
              description="The pieces our customers reorder, gift and photograph the most."
            />
            <Button to="/shop" variant="outline" size="sm" className="shrink-0">
              View All
            </Button>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-7">
            {bestsellers.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} compact />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── BRAND PROMISE / ATELIER ─────────────── */}
      <section className="container-lux py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative">
              <SmartImage
                src="/images/atelier.jpg"
                alt="Afsana Luxe atelier in Lahore"
                wrapperClassName="aspect-4/5 w-full rounded-sm"
                className="object-cover"
                fallback="https://images.pexels.com/photos/13325937/pexels-photo-13325937.jpeg?auto=compress&cs=tinysrgb&w=1200"
              />
              <div className="absolute -right-4 -bottom-6 hidden bg-cream-50 px-7 py-6 shadow-luxe sm:block">
                <p className="font-display text-4xl text-cocoa-900">{products.length}</p>
                <p className="eyebrow mt-1 text-[0.5rem] text-gold-500">Pieces in stock</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <SectionHeading
              align="left"
              eyebrow="The Afsana Promise"
              title="Luxury you can feel, prices you can trust"
              description="Afsana means story — and every bracelet, pendant and watch we make is a small chapter of yours. We design in small batches, plate in 18K gold and ship with cash on delivery so you never have to take a leap of faith."
            />
            <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {promises.map((item) => (
                <div key={item.title} className="border-t border-cream-300 pt-5">
                  <span className="font-display text-2xl text-gold-500">{item.icon}</span>
                  <h3 className="mt-2 font-display text-xl text-cocoa-900">{item.title}</h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed font-light text-cocoa-500">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Button to="/about" variant="outline">
                Read Our Story
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────── NEW ARRIVALS ─────────────── */}
      <section className="bg-cream-100 py-20 md:py-28">
        <div className="container-lux">
          <Reveal>
            <SectionHeading
              eyebrow="New Arrivals"
              title="Freshly finished this season"
              description="The latest additions to the Afsana Luxe cabinet — usually gone within weeks."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-7">
            {newArrivals.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} compact />
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Button to="/shop?sort=newest" variant="outline">
              Shop New Arrivals
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ─────────────── FEATURED WATCHES (dark) ─────────────── */}
      <section className="relative overflow-hidden bg-cocoa-950 py-20 text-cream-100 md:py-28">
        <div
          aria-hidden
          className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl"
        />
        <div className="container-lux relative">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              align="left"
              tone="light"
              eyebrow="Featured Watches"
              title="Time, beautifully kept"
              description="Japanese movements, slim gold cases and straps chosen for the Pakistani climate."
            />
            <Button to="/shop?category=watches" variant="outlineLight" size="sm" className="shrink-0">
              All Watches
            </Button>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {watches.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.08}>
                <Link to={`/product/${product.id}`} className="group block">
                  <div className="relative overflow-hidden bg-cocoa-900">
                    <SmartImage
                      src={product.images[0]}
                      alt={product.name}
                      wrapperClassName="aspect-4/5 w-full"
                      className="transition-transform duration-[1200ms] group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cocoa-950/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="eyebrow absolute bottom-4 left-4 translate-y-3 text-[0.55rem] text-gold-300 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      View Details →
                    </span>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl text-cream-50">{product.name}</h3>
                      <p className="mt-1 text-[0.8rem] font-light text-cream-300/70">{product.short}</p>
                    </div>
                    <p className="shrink-0 font-display text-lg text-gold-300">
                      {formatPKR(product.price)}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── JEWELLERY COLLECTION ─────────────── */}
      <section className="container-lux py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Jewellery Collection"
            title="Bracelets, pendants & earrings"
            description="Layer them, gift them, live in them — every piece is finished by hand before it ships."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-7">
          {jewellery.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Button to="/shop?category=jewellery-sets" variant="outline">
            Discover Jewellery Sets
          </Button>
        </Reveal>
      </section>

      {/* ─────────────── WHY CHOOSE US ─────────────── */}
      <section className="border-y border-cream-300 bg-cream-200/60 py-20 md:py-28">
        <div className="container-lux">
          <Reveal>
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Six reasons our customers return"
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Accessible Luxury",
                text: "Every single price sits between Rs. 400 and Rs. 2,000 — real plating, real stones, no inflated markups.",
              },
              {
                title: "Cash on Delivery",
                text: "Pay only when your parcel arrives. Free delivery on orders above Rs. 1,500.",
              },
              {
                title: "Skin-Friendly",
                text: "Nickel-safe, hypoallergenic posts and clasps, tested for sensitive skin.",
              },
              {
                title: "Gift-Ready Packaging",
                text: "Each order arrives in the Afsana Luxe box with a care card and polishing cloth.",
              },
              {
                title: "Real Human Support",
                text: "WhatsApp our team directly — replies within hours on working days.",
              },
              {
                title: "Consistency",
                text: "Same plating thickness, same stone grade, every batch. No surprises.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="group h-full border border-cream-300 bg-cream-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-cocoa-400/50 hover:shadow-card">
                  <span className="eyebrow text-[0.5rem] text-gold-500">0{index + 1}</span>
                  <h3 className="mt-3 font-display text-2xl text-cocoa-900">{item.title}</h3>
                  <p className="mt-3 text-[0.85rem] leading-relaxed font-light text-cocoa-500">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── REVIEWS ─────────────── */}
      <section className="container-lux py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Customer Reviews"
            title="Afsana, in their words"
            description="Verified reviews from Karachi to Rawalpindi."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.name + review.product} delay={index * 0.06}>
              <figure className="flex h-full flex-col border border-cream-300 bg-cream-100 p-7">
                <Stars rating={review.rating} />
                <blockquote className="mt-4 flex-1 font-display text-lg leading-relaxed font-light text-cocoa-800 italic">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-6 border-t border-cream-300 pt-4">
                  <p className="font-display text-base text-cocoa-900">
                    {review.name} · <span className="text-cocoa-500">{review.city}</span>
                  </p>
                  <p className="eyebrow mt-1 text-[0.5rem] text-gold-500">{review.product}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─────────────── INSTAGRAM ─────────────── */}
      <section className="border-t border-cream-300 bg-cream-100 py-20 md:py-24">
        <div className="container-lux">
          <Reveal>
            <SectionHeading
              eyebrow="Instagram"
              title={`Follow ${brand.instagramHandle}`}
              description="Styling reels, unboxings and new drops — first on Instagram."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {instagram.map((post, index) => (
              <Reveal key={post.image + index} delay={index * 0.05}>
                <a
                  href={brand.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group relative block overflow-hidden"
                >
                  <SmartImage
                    src={post.image}
                    alt={post.caption}
                    wrapperClassName="aspect-square w-full"
                    className="transition-transform duration-[1100ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-cocoa-950/60 p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <p className="text-[0.7rem] leading-snug font-light text-cream-100">
                      {post.caption}
                    </p>
                    <p className="eyebrow mt-1 text-[0.5rem] text-gold-300">♥ {post.likes}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Button href={brand.instagram} variant="outline">
              Follow on Instagram
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ─────────────── FINAL CTA ─────────────── */}
      <section className="relative isolate overflow-hidden bg-cocoa-900">
        <div className="absolute inset-0">
          <SmartImage
            src="/images/cta.jpg"
            alt="Afsana Luxe jewellery flat lay"
            wrapperClassName="h-full w-full"
            className="opacity-45"
            fallback="https://images.pexels.com/photos/8656236/pexels-photo-8656236.jpeg?auto=compress&cs=tinysrgb&w=1600"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cocoa-950 via-cocoa-950/70 to-cocoa-950/20" />
        </div>
        <div className="container-lux relative py-24 text-center md:py-32">
          <Reveal>
            <p className="eyebrow text-[0.55rem] text-gold-300">Begin your afsana</p>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-[1.05] font-light text-cream-50 sm:text-5xl md:text-6xl">
              Our products add beauty to your arm.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed font-light text-cream-200/80">
              Cash on delivery across Pakistan · Free shipping over {formatPKR(brand.freeShippingThreshold)} ·
              Every piece {formatPKR(400)} – {formatPKR(2000)}.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to="/shop" size="lg">
                Shop Now
              </Button>
              <Button to="/shop?category=watches" variant="outlineLight" size="lg">
                Explore Watches
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
