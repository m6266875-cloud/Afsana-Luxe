import { motion } from "framer-motion";
import { Button, Reveal, SmartImage } from "../components/ui";
import { formatPKR, orderDate } from "../lib/format";
import { useStore } from "../store/StoreContext";

export default function OrderConfirmation() {
  const { lastOrder, brand } = useStore();

  if (!lastOrder) {
    return (
      <section className="container-lux flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <Reveal>
          <p className="eyebrow text-[0.55rem] text-gold-500">Order Confirmation</p>
          <h1 className="mt-5 font-display text-4xl leading-tight font-light text-cocoa-900 sm:text-5xl">
            No recent order found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed font-light text-cocoa-500">
            Once you place an order it will appear here with your order number and delivery details.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/shop">Shop the Collection</Button>
            <Button to="/contact" variant="outline">
              Contact Support
            </Button>
          </div>
        </Reveal>
      </section>
    );
  }

  const order = lastOrder;

  return (
    <>
      <section className="relative overflow-hidden bg-cocoa-950 py-20 text-cream-100 md:py-28">
        <div
          aria-hidden
          className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gold-500/15 blur-3xl"
        />
        <div className="container-lux relative text-center">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold-400/60 bg-gold-400/10"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-8 w-8 text-gold-300">
              <path d="M4 12.5l5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="eyebrow mt-8 text-[0.55rem] text-gold-300"
          >
            Order confirmed · Shukriya!
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-[1.1] font-light sm:text-5xl md:text-6xl"
          >
            Thank you, {order.customer.fullName.split(" ")[0]}.
            <span className="block text-gold-300 italic">Your afsana begins.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.8 }}
            className="mx-auto mt-6 max-w-xl text-sm leading-relaxed font-light text-cream-200/80"
          >
            Order <strong className="font-medium text-cream-100">{order.id}</strong> is confirmed and
            will be dispatched from our Lahore studio within 24 working hours. Pay{" "}
            {formatPKR(order.total)} in cash on delivery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <Button to="/shop" size="lg">
              Continue Shopping
            </Button>
            <Button
              href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
                `Assalam o Alaikum! I just placed order ${order.id} on Afsana Luxe.`,
              )}`}
              variant="outlineLight"
              size="lg"
            >
              Track on WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="container-lux py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div>
            <div className="grid gap-px overflow-hidden border border-cream-300 bg-cream-300 sm:grid-cols-3">
              {[
                ["Order Number", order.id],
                ["Placed On", orderDate(order.placedAt)],
                ["Estimated Delivery", order.eta],
              ].map(([label, value]) => (
                <div key={label} className="bg-cream-100 p-5">
                  <p className="eyebrow text-[0.5rem] text-cocoa-400">{label}</p>
                  <p className="mt-2 font-display text-lg text-cocoa-900">{value}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-12 font-display text-2xl text-cocoa-900">Your Pieces</h2>
            <ul className="mt-6 divide-y divide-cream-300 border-y border-cream-300">
              {order.items.map((item) => (
                <li key={item.key} className="flex gap-4 py-5">
                  <SmartImage src={item.image} alt={item.name} wrapperClassName="h-24 w-20 shrink-0" />
                  <div className="flex-1">
                    <p className="font-display text-lg leading-tight text-cocoa-900">{item.name}</p>
                    <p className="mt-1 text-[0.78rem] font-light text-cocoa-500">
                      Qty {item.qty} · {formatPKR(item.price)} each
                    </p>
                  </div>
                  <p className="shrink-0 font-display text-lg text-cocoa-900">
                    {formatPKR(item.price * item.qty)}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-3 text-sm font-light">
              <div className="flex justify-between">
                <dt className="text-cocoa-600">Subtotal</dt>
                <dd className="text-cocoa-900">{formatPKR(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-cocoa-600">Delivery charges</dt>
                <dd className="text-cocoa-900">
                  {order.delivery === 0 ? "Free" : formatPKR(order.delivery)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-cream-300 pt-4">
                <dt className="font-display text-xl text-cocoa-900">Total (COD)</dt>
                <dd className="font-display text-xl text-cocoa-900">{formatPKR(order.total)}</dd>
              </div>
            </dl>
          </div>

          <aside className="h-fit space-y-8 border border-cream-300 bg-cream-100 p-7">
            <div>
              <p className="eyebrow text-[0.5rem] text-gold-500">Delivering To</p>
              <address className="mt-3 text-sm leading-relaxed font-light text-cocoa-700 not-italic">
                <strong className="font-medium text-cocoa-900">{order.customer.fullName}</strong>
                <br />
                {order.customer.address}
                <br />
                {order.customer.city}
                {order.customer.postalCode ? ` · ${order.customer.postalCode}` : ""}
                <br />
                {order.customer.phone}
                {order.customer.email ? (
                  <>
                    <br />
                    {order.customer.email}
                  </>
                ) : null}
              </address>
            </div>

            <div className="border-t border-cream-300 pt-6">
              <p className="eyebrow text-[0.5rem] text-gold-500">Payment</p>
              <p className="mt-3 text-sm font-light text-cocoa-700">
                {order.paymentMethod} — please keep {formatPKR(order.total)} ready for the courier.
              </p>
            </div>

            {order.notes ? (
              <div className="border-t border-cream-300 pt-6">
                <p className="eyebrow text-[0.5rem] text-gold-500">Your Notes</p>
                <p className="mt-3 text-sm font-light text-cocoa-700">{order.notes}</p>
              </div>
            ) : null}

            <div className="border-t border-cream-300 pt-6">
              <p className="eyebrow text-[0.5rem] text-gold-500">Need Help?</p>
              <p className="mt-3 text-[0.8rem] leading-relaxed font-light text-cocoa-500">
                WhatsApp us at {brand.phone} with your order number, or email {brand.supportEmail}.
              </p>
              <div className="mt-5 grid gap-2">
                <Button to="/contact" variant="outline" size="sm" className="w-full">
                  Contact &amp; Help
                </Button>
                <Button to="/shop" size="sm" className="w-full">
                  Keep Shopping
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
