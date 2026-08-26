import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { formatPKR } from "../lib/format";
import { Button, SmartImage } from "./ui";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty, removeItem, subtotal, delivery, total, brand } =
    useStore();

  const freeOver = brand.freeShippingThreshold;
  const remaining = Math.max(0, freeOver - subtotal);
  const progress = Math.min(100, (subtotal / freeOver) * 100);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[60] bg-cocoa-950/55 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-cream-50 shadow-luxe"
            aria-label="Shopping bag"
          >
            <header className="flex items-center justify-between border-b border-cream-300 px-6 py-5">
              <div>
                <p className="eyebrow text-[0.55rem] text-gold-500">Your selection</p>
                <h2 className="font-display text-2xl text-cocoa-900">Shopping Bag</h2>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close bag"
                className="flex h-9 w-9 items-center justify-center text-cocoa-700 transition hover:text-gold-500"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-5 w-5">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </header>

            {cart.length > 0 && (
              <div className="border-b border-cream-300 bg-cream-100 px-6 py-4">
                <p className="text-[0.75rem] font-light text-cocoa-600">
                  {remaining > 0 ? (
                    <>
                      Add <strong className="font-medium">{formatPKR(remaining)}</strong> more for free
                      delivery
                    </>
                  ) : (
                    <>You&apos;ve unlocked <strong className="font-medium">free delivery</strong> ✦</>
                  )}
                </p>
                <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-cream-300">
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full rounded-full bg-gold-400"
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 py-16 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-cream-300 font-display text-2xl text-cocoa-500">
                    ✦
                  </span>
                  <div>
                    <p className="font-display text-xl text-cocoa-900">Your bag is empty</p>
                    <p className="mt-2 text-sm font-light text-cocoa-500">
                      Discover pieces from Rs. 400 that add beauty to your arm.
                    </p>
                  </div>
                  <Button to="/shop" size="sm" onClick={() => setCartOpen(false)}>
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-cream-300">
                  {cart.map((item) => (
                    <motion.li
                      key={item.key}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-4 py-5"
                    >
                      <Link
                        to={`/product/${item.id}`}
                        onClick={() => setCartOpen(false)}
                        className="shrink-0"
                      >
                        <SmartImage
                          src={item.image}
                          alt={item.name}
                          wrapperClassName="h-24 w-20 rounded-sm"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="eyebrow text-[0.5rem] text-gold-500">{item.category.replace("-", " ")}</p>
                            <Link
                              to={`/product/${item.id}`}
                              onClick={() => setCartOpen(false)}
                              className="font-display text-base leading-tight text-cocoa-900 hover:text-gold-500"
                            >
                              {item.name}
                            </Link>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.key)}
                            aria-label={`Remove ${item.name}`}
                            className="text-cocoa-400 transition hover:text-cocoa-900"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-4 w-4">
                              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                            </svg>
                          </button>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-cream-300">
                            <button
                              type="button"
                              onClick={() => setQty(item.key, item.qty - 1)}
                              aria-label="Decrease quantity"
                              className="h-8 w-8 text-cocoa-700 transition hover:bg-cream-200"
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-sm">{item.qty}</span>
                            <button
                              type="button"
                              onClick={() => setQty(item.key, item.qty + 1)}
                              aria-label="Increase quantity"
                              className="h-8 w-8 text-cocoa-700 transition hover:bg-cream-200"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-display text-lg text-cocoa-900">
                            {formatPKR(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <footer className="border-t border-cream-300 bg-cream-100 px-6 py-5">
                <dl className="space-y-2 text-sm font-light">
                  <div className="flex justify-between">
                    <dt className="text-cocoa-600">Subtotal</dt>
                    <dd className="text-cocoa-900">{formatPKR(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-cocoa-600">Delivery</dt>
                    <dd className="text-cocoa-900">
                      {delivery === 0 ? "Free" : formatPKR(delivery)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-cream-300 pt-3">
                    <dt className="font-display text-lg text-cocoa-900">Total</dt>
                    <dd className="font-display text-lg text-cocoa-900">{formatPKR(total)}</dd>
                  </div>
                </dl>
                <div className="mt-5 grid gap-2">
                  <Button to="/checkout" size="md" onClick={() => setCartOpen(false)} className="w-full">
                    Checkout
                  </Button>
                  <Button to="/cart" variant="outline" size="sm" onClick={() => setCartOpen(false)} className="w-full">
                    View Full Bag
                  </Button>
                </div>
                <p className="eyebrow mt-4 text-center text-[0.5rem] text-cocoa-400">
                  Cash on Delivery · 7 day easy returns
                </p>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
