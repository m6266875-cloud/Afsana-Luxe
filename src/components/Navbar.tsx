import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { cn } from "../utils/cn";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop?category=watches", label: "Watches", match: "watches" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const marqueeItems = [
  "Cash on Delivery across Pakistan",
  "Free delivery on orders over Rs. 1,500",
  "Hand-finished in Lahore",
  "Our products add beauty to your arm.",
  "6 month plating warranty",
];

export default function Navbar() {
  const { cartCount, wishlist, setCartOpen, products } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const q = term.trim();
    if (!q) return;
    navigate(`/shop?search=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setTerm("");
  };

  const isWatchRoute = location.search.includes("category=watches");

  return (
    <header className="sticky top-0 z-50">
      {/* announcement marquee */}
      <div className="overflow-hidden border-b border-cream-300/60 bg-cocoa-950 py-2 text-cream-200">
        <div className="flex w-max animate-marquee gap-12 pr-12">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`} className="eyebrow flex items-center gap-3 text-[0.55rem] whitespace-nowrap">
              <span className="text-gold-400">✦</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-all duration-500",
          scrolled
            ? "border-cream-300/70 bg-cream-50/92 backdrop-blur-xl"
            : "border-transparent bg-cream-50",
        )}
      >
        <nav className="container-lux flex h-[68px] items-center justify-between gap-4 md:h-[78px]">
          {/* mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center text-cocoa-800 transition hover:text-gold-500 lg:hidden"
          >
            <span className="space-y-[5px]">
              <span className="block h-px w-6 bg-current" />
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-6 bg-current" />
            </span>
          </button>

          {/* desktop links */}
          <div className="hidden flex-1 items-center gap-8 lg:flex">
            {links.slice(0, 3).map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "eyebrow relative py-1 text-[0.6rem] transition-colors duration-300",
                    isActive && !link.match
                      ? "text-gold-500"
                      : link.match && isWatchRoute
                        ? "text-gold-500"
                        : "text-cocoa-700 hover:text-gold-500",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* wordmark */}
          <Link to="/" className="group flex shrink-0 flex-col items-center" aria-label="Afsana Luxe home">
            <span className="font-display text-2xl leading-none tracking-[0.16em] text-cocoa-900 uppercase md:text-[1.7rem]">
              Afsana
            </span>
            <span className="eyebrow mt-1 flex items-center gap-2 text-[0.5rem] text-gold-500">
              <span className="h-px w-4 bg-gold-400" />
              Luxe
              <span className="h-px w-4 bg-gold-400" />
            </span>
          </Link>

          {/* right cluster */}
          <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search products"
              className="flex h-10 w-10 items-center justify-center text-cocoa-800 transition hover:text-gold-500"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-[18px] w-[18px]">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>

            <Link
              to="/shop?filter=wishlist"
              aria-label="Wishlist"
              className="relative hidden h-10 w-10 items-center justify-center text-cocoa-800 transition hover:text-gold-500 sm:flex"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-[18px] w-[18px]">
                <path d="M12 20s-7-4.4-7-9.3A4.1 4.1 0 0 1 12 7a4.1 4.1 0 0 1 7 3.7c0 4.9-7 9.3-7 9.3z" strokeLinecap="round" />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-400 px-1 text-[0.55rem] font-medium text-cocoa-950">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="Open shopping bag"
              className="relative flex h-10 w-10 items-center justify-center text-cocoa-800 transition hover:text-gold-500"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-[18px] w-[18px]">
                <path d="M6 8h12l-1 12H7L6 8z" strokeLinejoin="round" />
                <path d="M9.5 8V6.5a2.5 2.5 0 0 1 5 0V8" strokeLinecap="round" />
              </svg>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-cocoa-900 px-1 text-[0.55rem] font-medium text-cream-100"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>

          {/* right desktop links */}
          <div className="hidden items-center gap-8 xl:flex">
            {links.slice(3).map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "eyebrow py-1 text-[0.6rem] transition-colors duration-300",
                    isActive ? "text-gold-500" : "text-cocoa-700 hover:text-gold-500",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-cream-300/70 bg-cream-100/70"
            >
              <form onSubmit={submitSearch} className="container-lux flex items-center gap-3 py-4">
                <input
                  autoFocus
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder={`Search ${products.length} pieces — try “pearl”, “hoops”, “watch”…`}
                  className="w-full bg-transparent py-2 font-display text-lg text-cocoa-900 placeholder:font-sans placeholder:text-sm placeholder:tracking-wide placeholder:text-cocoa-400 focus:outline-none"
                />
                <button type="submit" className="eyebrow text-[0.6rem] text-cocoa-700 hover:text-gold-500">
                  Search
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-cocoa-950/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 flex w-[84%] max-w-sm flex-col bg-cocoa-950 px-7 py-8 text-cream-100 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl tracking-[0.18em] uppercase">Afsana Luxe</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="text-cream-200 transition hover:text-gold-300"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-6 w-6">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav className="mt-12 flex flex-col gap-1">
                {[
                  { to: "/", label: "Home" },
                  { to: "/shop", label: "All Jewellery" },
                  { to: "/shop?category=watches", label: "Watches" },
                  { to: "/shop?category=bracelets", label: "Bracelets" },
                  { to: "/shop?category=pendants", label: "Pendants" },
                  { to: "/shop?category=earrings", label: "Earrings" },
                  { to: "/shop?category=jewellery-sets", label: "Jewellery Sets" },
                  { to: "/about", label: "Our Story" },
                  { to: "/contact", label: "Contact & Help" },
                ].map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.5 }}
                  >
                    <Link
                      to={item.to}
                      className="flex items-baseline justify-between border-b border-cream-100/10 py-4 font-display text-2xl font-light transition hover:text-gold-300"
                    >
                      {item.label}
                      <span className="eyebrow text-[0.5rem] text-gold-400">0{i + 1}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-1 pt-8">
                <p className="eyebrow text-[0.55rem] text-gold-400">Founder &amp; CEO</p>
                <p className="font-display text-lg">@zainch8603</p>
                <p className="eyebrow mt-4 text-[0.55rem] text-gold-400">Brand Manager</p>
                <p className="font-display text-lg">@moon_lit_vibes06</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
