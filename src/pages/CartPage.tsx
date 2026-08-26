import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Button, Reveal, SectionHeading, SmartImage } from "../components/ui";
import { formatPKR } from "../lib/format";
import { useStore } from "../store/StoreContext";

export default function CartPage() {
  const {
    cart,
    setQty,
    removeItem,
    clearCart,
    subtotal,
    delivery,
    total,
    brand,
    products,
    cartCount,
  } = useStore();

  const freeOver = brand.freeShippingThreshold;
  const remaining = Math.max(0, freeOver - subtotal);
  const suggestions = products.filter((p) => !cart.some((i) => i.id === p.id)).slice(0, 4);

  return (
    <>
      <section className="border-b border-cream-300 bg-cream-100">
        <div className="container-lux py-14 md:py-20">
          <Reveal>
            <p className="eyebrow text-[0.55rem] text-gold-500">Step 1 of 2</p>
            <h1 className="mt-4 font-display text-4xl leading-none font-light text-cocoa-900 sm:text-5xl md:text-6xl">
              Shopping Bag
            </h1>
            <p className="mt-4 text-sm font-light text-cocoa-500">
              {cartCount > 0
                ? `${cartCount} item${cartCount > 1 ? "s" : ""} · Cash on Delivery available`
                : "Your bag is waiting to be filled with something beautiful."}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-lux py-12 md:py-16">
        {cart.length === 0 ? (
          <div className="border border-cream-300 bg-cream-100 px-6 py-20 text-center">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-cream-300 font-display text-3xl text-cocoa-500">
              ✦
            </span>
            <h2 className="mt-6 font-display text-3xl text-cocoa-900">Your bag is empty</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed font-light text-cocoa-500">
              From Rs. 400 studs to Rs. 1,999 watches — start with our bestsellers and add beauty to
              your arm.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to="/shop">Shop the Collection</Button>
              <Button to="/shop?category=watches" variant="outline">
                Explore Watches
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
            {/* items */}
            <div>
              <div className="hidden border-b border-cream-300 pb-3 sm:grid sm:grid-cols-[1.8fr_1fr_1fr_auto] sm:gap-4">
                {["Product", "Quantity", "Total", ""].map((head) => (
                  <span key={head} className="eyebrow text-[0.5rem] text-cocoa-400">
                    {head}
                  </span>
                ))}
              </div>

              <ul className="divide-y divide-cream-300">
                {cart.map((item) => (
                  <motion.li
                    key={item.key}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-[auto_1fr] gap-4 py-6 sm:grid-cols-[1.8fr_1fr_1fr_auto] sm:items-center sm:gap-4"
                  >
                    <div className="flex gap-4 sm:col-span-1">
                      <Link to={`/product/${item.id}`} className="shrink-0">
                        <SmartImage src={item.image} alt={item.name} wrapperClassName="h-28 w-24" />
                      </Link>
                      <div>
                        <p className="eyebrow text-[0.5rem] text-gold-500">
                          {item.category.replace("-", " ")}
                        </p>
                        <Link
                          to={`/product/${item.id}`}
                          className="font-display text-lg leading-tight text-cocoa-900 transition hover:text-gold-500"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm font-light text-cocoa-500">
                          {formatPKR(item.price)} each
                        </p>
                      </div>
                    </div>

                    <div className="col-start-1 flex items-center sm:col-start-auto">
                      <div className="flex items-center border border-cream-300">
                        <button
                          type="button"
                          onClick={() => setQty(item.key, item.qty - 1)}
                          aria-label={`Decrease ${item.name}`}
                          className="h-10 w-10 text-cocoa-700 transition hover:bg-cream-200"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-sm">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(item.key, item.qty + 1)}
                          aria-label={`Increase ${item.name}`}
                          className="h-10 w-10 text-cocoa-700 transition hover:bg-cream-200"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <p className="col-start-2 self-center font-display text-xl text-cocoa-900 sm:col-start-auto">
                      {formatPKR(item.price * item.qty)}
                    </p>

                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                      className="col-start-2 flex items-center gap-1 self-center justify-self-start text-xs font-light text-cocoa-400 transition hover:text-cocoa-900 sm:col-start-auto sm:justify-self-end"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-4 w-4">
                        <path d="M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13" strokeLinecap="round" />
                      </svg>
                      Remove
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-cream-300 pt-6">
                <Button to="/shop" variant="outline" size="sm">
                  Continue Shopping
                </Button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="eyebrow text-[0.55rem] text-cocoa-400 underline decoration-cream-300 underline-offset-4 transition hover:text-cocoa-900"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* summary */}
            <aside className="h-fit border border-cream-300 bg-cream-100 p-7 lg:sticky lg:top-32">
              <h2 className="font-display text-2xl text-cocoa-900">Order Summary</h2>
              <dl className="mt-6 space-y-3 text-sm font-light">
                <div className="flex justify-between">
                  <dt className="text-cocoa-600">Subtotal ({cartCount} items)</dt>
                  <dd className="text-cocoa-900">{formatPKR(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-cocoa-600">Delivery charges</dt>
                  <dd className="text-cocoa-900">{delivery === 0 ? "Free" : formatPKR(delivery)}</dd>
                </div>
                {delivery > 0 && remaining > 0 && (
                  <p className="rounded-sm bg-gold-200/60 px-3 py-2 text-[0.75rem] leading-relaxed font-light text-cocoa-700">
                    Add {formatPKR(remaining)} more to unlock free delivery.
                  </p>
                )}
                <div className="flex justify-between border-t border-cream-300 pt-4">
                  <dt className="font-display text-xl text-cocoa-900">Total</dt>
                  <dd className="font-display text-xl text-cocoa-900">{formatPKR(total)}</dd>
                </div>
              </dl>

              <div className="mt-7 grid gap-2">
                <Button to="/checkout" className="w-full">
                  Proceed to Checkout
                </Button>
              </div>

              <ul className="mt-6 space-y-2 border-t border-cream-300 pt-5 text-[0.75rem] font-light text-cocoa-500">
                <li>✦ Cash on Delivery across Pakistan</li>
                <li>✦ Dispatched within 24 working hours</li>
                <li>✦ 7 day easy returns</li>
              </ul>
            </aside>
          </div>
        )}
      </section>

      {suggestions.length > 0 && (
        <section className="border-t border-cream-300 bg-cream-100 py-20">
          <div className="container-lux">
            <Reveal>
              <SectionHeading eyebrow="Pairs beautifully with" title="Complete your selection" />
            </Reveal>
            <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-7">
              {suggestions.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
