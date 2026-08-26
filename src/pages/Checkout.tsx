import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Reveal, SmartImage } from "../components/ui";
import { formatPKR } from "../lib/format";
import { useStore } from "../store/StoreContext";
import { cn } from "../utils/cn";

type Fields = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
};

const empty: Fields = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  notes: "",
};

const cities = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Other",
];

export default function Checkout() {
  const { cart, subtotal, delivery, total, brand, cartCount, submitOrder, pushToast } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [placing, setPlacing] = useState(false);

  const update = (key: keyof Fields, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (form.fullName.trim().length < 3) next.fullName = "Please enter your full name";
    if (!/^[0-9+\-\s()]{10,20}$/.test(form.phone.trim()))
      next.phone = "Enter a valid phone number, e.g. 0300 1234567";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Enter a valid email address";
    if (form.address.trim().length < 8) next.address = "Please enter your complete address";
    if (!form.city.trim()) next.city = "Please select or type your city";
    if (form.postalCode && !/^[0-9]{4,6}$/.test(form.postalCode.trim()))
      next.postalCode = "Postal codes are 4 – 6 digits";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const placeOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    if (cart.length === 0) return;
    if (!validate()) {
      pushToast({ title: "Please check your details", tone: "error" });
      return;
    }
    setPlacing(true);
    try {
      await submitOrder({
        customer: {
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          postalCode: form.postalCode.trim(),
        },
        notes: form.notes.trim(),
      });
      pushToast({ title: "Order confirmed — shukriya!", detail: "Cash on Delivery", tone: "success" });
      navigate("/order-confirmation");
    } catch {
      pushToast({
        title: "We could not place the order",
        detail: "Please try again in a moment.",
        tone: "error",
      });
    } finally {
      setPlacing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <section className="container-lux flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <Reveal>
          <p className="eyebrow text-[0.55rem] text-gold-500">Checkout</p>
          <h1 className="mt-5 font-display text-4xl leading-tight font-light text-cocoa-900 sm:text-5xl">
            Your bag is empty
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed font-light text-cocoa-500">
            Add a piece to your bag before checking out — everything is between Rs. 400 and
            Rs. 2,000.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/shop">Shop the Collection</Button>
            <Button to="/cart" variant="outline">
              Back to Bag
            </Button>
          </div>
        </Reveal>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-cream-300 bg-cream-100">
        <div className="container-lux py-14 md:py-16">
          <Reveal>
            <p className="eyebrow text-[0.55rem] text-gold-500">Step 2 of 2</p>
            <h1 className="mt-4 font-display text-4xl leading-none font-light text-cocoa-900 sm:text-5xl">
              Checkout
            </h1>
            <p className="mt-4 text-sm font-light text-cocoa-500">
              Cash on Delivery · {cartCount} item{cartCount > 1 ? "s" : ""} ·{" "}
              {formatPKR(total)} payable on delivery
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-lux py-12 md:py-16">
        <form onSubmit={placeOrder} className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          {/* form */}
          <div className="space-y-8">
            <fieldset className="border border-cream-300 bg-cream-50 p-6 md:p-8">
              <legend className="eyebrow px-2 text-[0.55rem] text-gold-500">
                Delivery Details
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  required
                  value={form.fullName}
                  error={errors.fullName}
                  onChange={(v) => update("fullName", v)}
                  placeholder="Ayesha Khan"
                  autoComplete="name"
                />
                <Field
                  label="Phone"
                  required
                  value={form.phone}
                  error={errors.phone}
                  onChange={(v) => update("phone", v)}
                  placeholder="0300 1234567"
                  inputMode="tel"
                  autoComplete="tel"
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  error={errors.email}
                  onChange={(v) => update("email", v)}
                  placeholder="you@email.com"
                  autoComplete="email"
                  hint="Optional — used for order updates"
                />
                <div>
                  <label className="eyebrow mb-2 block text-[0.5rem] text-cocoa-500" htmlFor="city">
                    City <span className="text-gold-500">*</span>
                  </label>
                  <input
                    id="city"
                    list="city-options"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    placeholder="Lahore"
                    className={cn(
                      "w-full border bg-transparent px-4 py-3 text-sm font-light text-cocoa-900 transition placeholder:text-cocoa-300 focus:outline-none",
                      errors.city ? "border-red-400" : "border-cream-300 focus:border-cocoa-700",
                    )}
                  />
                  <datalist id="city-options">
                    {cities.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                  {errors.city && <p className="mt-1 text-[0.7rem] text-red-500">{errors.city}</p>}
                </div>
                <div className="sm:col-span-2">
                  <Field
                    label="Address"
                    required
                    value={form.address}
                    error={errors.address}
                    onChange={(v) => update("address", v)}
                    placeholder="House 12, Street 4, Gulberg III"
                    autoComplete="street-address"
                  />
                </div>
                <Field
                  label="Postal Code"
                  value={form.postalCode}
                  error={errors.postalCode}
                  onChange={(v) => update("postalCode", v)}
                  placeholder="54000"
                  inputMode="numeric"
                />
                <div>
                  <label className="eyebrow mb-2 block text-[0.5rem] text-cocoa-500" htmlFor="notes">
                    Order Notes
                  </label>
                  <input
                    id="notes"
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Gift wrap, landmark, preferred time…"
                    className="w-full border border-cream-300 bg-transparent px-4 py-3 text-sm font-light text-cocoa-900 transition placeholder:text-cocoa-300 focus:border-cocoa-700 focus:outline-none"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="border border-cream-300 bg-cream-50 p-6 md:p-8">
              <legend className="eyebrow px-2 text-[0.55rem] text-gold-500">Payment Method</legend>
              <label
                htmlFor="cod"
                className="flex cursor-pointer items-start gap-4 border border-cocoa-900/25 bg-cream-100 p-5 transition hover:border-cocoa-900"
              >
                <input
                  id="cod"
                  type="radio"
                  checked
                  readOnly
                  className="mt-1 accent-gold-500"
                  name="payment"
                />
                <span>
                  <span className="flex flex-wrap items-center gap-3">
                    <span className="font-display text-lg text-cocoa-900">Cash on Delivery</span>
                    <span className="eyebrow rounded-full bg-gold-200 px-2 py-0.5 text-[0.5rem] text-cocoa-800">
                      Recommended
                    </span>
                  </span>
                  <span className="mt-2 block text-[0.82rem] leading-relaxed font-light text-cocoa-500">
                    Pay in cash when your Afsana Luxe parcel arrives. Available across Pakistan —
                    no advance payment required.
                  </span>
                </span>
              </label>
              <p className="mt-4 text-[0.75rem] font-light text-cocoa-400">
                Online card payment and bank transfer are coming soon. WhatsApp us at{" "}
                {brand.phone} for bulk or corporate orders.
              </p>
            </fieldset>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button type="submit" size="lg" disabled={placing} className="sm:min-w-[220px]">
                {placing ? "Placing Order…" : `Place Order · ${formatPKR(total)}`}
              </Button>
              <Button to="/cart" variant="outline" size="lg">
                Back to Bag
              </Button>
            </div>
            <p className="text-[0.75rem] font-light text-cocoa-400">
              By placing this order you agree to be contacted on the number above for delivery
              confirmation.
            </p>
          </div>

          {/* summary */}
          <aside className="h-fit border border-cream-300 bg-cream-100 p-6 md:p-8 lg:sticky lg:top-32">
            <h2 className="font-display text-2xl text-cocoa-900">Order Summary</h2>

            <ul className="mt-6 space-y-4">
              {cart.map((item) => (
                <li key={item.key} className="flex gap-4">
                  <SmartImage src={item.image} alt={item.name} wrapperClassName="h-20 w-16 shrink-0" />
                  <div className="flex-1">
                    <p className="font-display text-base leading-tight text-cocoa-900">{item.name}</p>
                    <p className="mt-1 text-[0.75rem] font-light text-cocoa-500">
                      Qty {item.qty} × {formatPKR(item.price)}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm text-cocoa-900">
                    {formatPKR(item.price * item.qty)}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="mt-7 space-y-3 border-t border-cream-300 pt-5 text-sm font-light">
              <div className="flex justify-between">
                <dt className="text-cocoa-600">Subtotal</dt>
                <dd className="text-cocoa-900">{formatPKR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-cocoa-600">Delivery charges</dt>
                <dd className="text-cocoa-900">{delivery === 0 ? "Free" : formatPKR(delivery)}</dd>
              </div>
              <div className="flex justify-between border-t border-cream-300 pt-4">
                <dt className="font-display text-xl text-cocoa-900">Total payable</dt>
                <dd className="font-display text-xl text-cocoa-900">{formatPKR(total)}</dd>
              </div>
            </dl>

            <div className="mt-7 space-y-2 border-t border-cream-300 pt-5 text-[0.75rem] font-light text-cocoa-500">
              <p>✦ Delivered in 3 – 5 working days</p>
              <p>✦ 7 day returns on unworn pieces</p>
              <p>
                ✦ Need help?{" "}
                <Link
                  to="/contact"
                  className="underline decoration-cream-300 underline-offset-4 transition hover:text-cocoa-900"
                >
                  Contact us
                </Link>
              </p>
            </div>
          </aside>
        </form>
      </section>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  required,
  placeholder,
  type = "text",
  hint,
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  hint?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "numeric" | "email";
}) {
  const id = `field-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div>
      <label className="eyebrow mb-2 block text-[0.5rem] text-cocoa-500" htmlFor={id}>
        {label} {required ? <span className="text-gold-500">*</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full border bg-transparent px-4 py-3 text-sm font-light text-cocoa-900 transition placeholder:text-cocoa-300 focus:outline-none",
          error ? "border-red-400" : "border-cream-300 focus:border-cocoa-700",
        )}
      />
      {error ? (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-[0.7rem] text-red-500">
          {error}
        </motion.p>
      ) : hint ? (
        <p className="mt-1 text-[0.7rem] font-light text-cocoa-400">{hint}</p>
      ) : null}
    </div>
  );
}
