import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { Button } from "./ui";

export default function Footer() {
  const { brand, categories, pushToast } = useStore();
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    pushToast({ title: "Welcome to the Afsana circle", detail: email.trim(), tone: "success" });
    setEmail("");
  };

  return (
    <footer className="bg-cocoa-950 text-cream-200">
      <div className="container-lux py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:pr-8">
            <Link to="/" className="inline-flex flex-col">
              <span className="font-display text-2xl tracking-[0.16em] text-cream-100 uppercase">
                Afsana Luxe
              </span>
              <span className="eyebrow mt-1 text-[0.5rem] text-gold-400">
                Jewellery &amp; Watches · Est. {brand.since}
              </span>
            </Link>
            <p className="mt-5 max-w-xs font-display text-xl leading-snug font-light text-cream-200 italic">
              “{brand.tagline}”
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed font-light text-cream-300/70">
              Hand-finished jewellery and watches for Pakistani women, delivered to your door with
              cash on delivery.
            </p>

            <form onSubmit={subscribe} className="mt-7">
              <label htmlFor="newsletter" className="eyebrow text-[0.5rem] text-gold-400">
                Join the circle
              </label>
              <div className="mt-3 flex items-center border-b border-cream-100/25 focus-within:border-gold-400">
                <input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-transparent py-2 text-sm font-light text-cream-100 placeholder:text-cream-300/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="eyebrow py-2 text-[0.55rem] whitespace-nowrap text-gold-400 transition hover:text-cream-100"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          <div>
            <h3 className="eyebrow text-[0.55rem] text-gold-400">Shop</h3>
            <ul className="mt-5 space-y-3 text-sm font-light">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/shop?category=${category.id}`}
                    className="text-cream-300/80 transition hover:text-gold-300"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/shop" className="text-cream-300/80 transition hover:text-gold-300">
                  All Pieces
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-[0.55rem] text-gold-400">Maison</h3>
            <ul className="mt-5 space-y-3 text-sm font-light">
              {[
                { to: "/about", label: "Our Story" },
                { to: "/about#leadership", label: "The Team" },
                { to: "/contact", label: "Contact & Help" },
                { to: "/cart", label: "Shopping Bag" },
                { to: "/checkout", label: "Checkout" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-cream-300/80 transition hover:text-gold-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-[0.55rem] text-gold-400">Client Care</h3>
            <ul className="mt-5 space-y-3 text-sm font-light text-cream-300/80">
              <li>{brand.address}</li>
              <li>
                <a href={`mailto:${brand.email}`} className="transition hover:text-gold-300">
                  {brand.email}
                </a>
              </li>
              <li>
                <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="transition hover:text-gold-300">
                  {brand.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${brand.whatsapp}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition hover:text-gold-300"
                >
                  WhatsApp us
                </a>
              </li>
              <li>{brand.hours}</li>
            </ul>

            <div className="mt-6 flex gap-3">
              <a
                href={brand.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center border border-cream-100/20 transition hover:border-gold-400 hover:text-gold-300"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-4 w-4">
                  <rect x="4" y="4" width="16" height="16" rx="4.5" />
                  <circle cx="12" cy="12" r="3.6" />
                  <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${brand.whatsapp}`}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center border border-cream-100/20 transition hover:border-gold-400 hover:text-gold-300"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-4 w-4">
                  <path d="M20 12a8 8 0 0 1-11.7 7.1L4 20l1-4.1A8 8 0 1 1 20 12z" strokeLinejoin="round" />
                  <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-1l-1.2-.7-1 .8c-.9-.4-1.7-1.2-2.1-2.1l.8-1L11.5 9c-.5 0-1 .4-1 .9z" strokeWidth="0.9" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-cream-100/10 pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <p className="eyebrow text-[0.5rem] text-cream-300/60">
                {brand.ceo.role} · <span className="text-gold-400">{brand.ceo.handle}</span>
              </p>
              <p className="eyebrow text-[0.5rem] text-cream-300/60">
                {brand.manager.role} · <span className="text-gold-400">{brand.manager.handle}</span>
              </p>
            </div>
            <p className="text-xs font-light text-cream-300/50">
              © {new Date().getFullYear()} Afsana Luxe. All rights reserved. Made in Pakistan.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-cream-100/10 py-5">
        <div className="container-lux flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Button href={brand.instagram} variant="ghost" size="sm" className="text-cream-300/70">
            Instagram {brand.instagramHandle}
          </Button>
          <span className="hidden h-3 w-px bg-cream-100/20 sm:block" />
          <p className="eyebrow text-[0.5rem] text-cream-300/50">
            Cash on Delivery · nationwide · {brand.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
