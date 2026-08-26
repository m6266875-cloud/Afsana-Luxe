import { motion } from "framer-motion";
import { useState } from "react";
import { Button, Reveal, SectionHeading } from "../components/ui";
import { sendContact } from "../lib/api";
import { useStore } from "../store/StoreContext";
import { cn } from "../utils/cn";

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Orders are dispatched from Lahore within 24 working hours and arrive in 3 – 5 working days nationwide via TCS or Leopards. Delivery is Rs. 199, free on orders above Rs. 1,500.",
  },
  {
    q: "Do you offer Cash on Delivery?",
    a: "Yes — Cash on Delivery is available across Pakistan. Pay the courier in cash when your parcel arrives; no advance payment is needed.",
  },
  {
    q: "Will the plating fade?",
    a: "Our pieces carry an anti-tarnish coat over 18K plating and are backed by a 6 month plating warranty (12 months on watch movements). Keep them away from perfume and water to extend their life.",
  },
  {
    q: "Can I return or exchange a piece?",
    a: "Absolutely. Unworn pieces in their original packaging can be returned within 7 days of delivery for an exchange or store credit. Message us on WhatsApp and we will arrange the pickup.",
  },
  {
    q: "Do you ship internationally?",
    a: "We currently deliver within Pakistan only. For international requests, email hello@afsanaluxe.pk and we will try to arrange a courier quote.",
  },
];

export default function Contact() {
  const { brand, pushToast } = useStore();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<{ ticket: string; reply: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please tell us your name";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Enter a valid email address";
    if (form.message.trim().length < 10) next.message = "Please add a few more details";
    setErrors(next);
    if (Object.keys(next).length) return;

    setSending(true);
    try {
      const response = await sendContact({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || "General enquiry",
        message: form.message.trim(),
      });
      setSent({ ticket: response.ticket, reply: response.reply });
      setForm({ name: "", email: "", subject: "", message: "" });
      pushToast({ title: "Message sent", detail: response.ticket, tone: "success" });
    } catch {
      pushToast({ title: "Message could not be sent", detail: "Please try WhatsApp instead.", tone: "error" });
    } finally {
      setSending(false);
    }
  };

  const channels = [
    {
      label: "WhatsApp",
      value: brand.phone,
      href: `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
        "Assalam o Alaikum Afsana Luxe! I have a question about ",
      )}`,
      note: "Fastest replies · 11am – 9pm PKT",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-5 w-5">
          <path d="M20 12a8 8 0 0 1-11.7 7.1L4 20l1-4.1A8 8 0 1 1 20 12z" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      value: brand.instagramHandle,
      href: brand.instagram,
      note: "Styling, new drops & DMs",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-5 w-5">
          <rect x="4" y="4" width="16" height="16" rx="4.5" />
          <circle cx="12" cy="12" r="3.6" />
          <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "Email",
      value: brand.email,
      href: `mailto:${brand.email}`,
      note: "Replies within 24 working hours",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-5 w-5">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3.5 6.5l8.5 6 8.5-6" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <section className="border-b border-cream-300 bg-cream-100">
        <div className="container-lux py-16 md:py-24">
          <Reveal>
            <p className="eyebrow text-[0.55rem] text-gold-500">Contact &amp; Help</p>
            <h1 className="mt-5 max-w-2xl font-display text-4xl leading-[1.08] font-light text-cocoa-900 sm:text-5xl md:text-6xl">
              We are a message away.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed font-light text-cocoa-500">
              Questions about an order, a gift, or which watch suits your wrist? Our Lahore team
              replies on every channel — usually within the hour during business hours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-lux py-14 md:py-20">
        <div className="grid gap-4 sm:grid-cols-3">
          {channels.map((channel, index) => (
            <Reveal key={channel.label} delay={index * 0.07}>
              <a
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="group flex h-full flex-col border border-cream-300 bg-cream-100 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-cocoa-400/50 hover:shadow-card"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-300 bg-cream-50 text-cocoa-700 transition group-hover:border-gold-400 group-hover:text-gold-500">
                  {channel.icon}
                </span>
                <p className="eyebrow mt-5 text-[0.5rem] text-cocoa-400">{channel.label}</p>
                <p className="mt-2 font-display text-xl break-words text-cocoa-900">{channel.value}</p>
                <p className="mt-2 text-[0.78rem] font-light text-cocoa-500">{channel.note}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* form + business info */}
      <section className="container-lux grid gap-12 pb-20 md:pb-28 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <Reveal>
          <div className="border border-cream-300 bg-cream-50 p-7 md:p-10">
            <SectionHeading
              align="left"
              eyebrow="Write to us"
              title="Send a message"
              description="Tell us what you need and we will reply from hello@afsanaluxe.pk."
            />

            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 border border-gold-300 bg-gold-200/40 p-6"
              >
                <p className="font-display text-2xl text-cocoa-900">Message received ✦</p>
                <p className="mt-3 text-sm leading-relaxed font-light text-cocoa-700">{sent.reply}</p>
                <p className="eyebrow mt-4 text-[0.5rem] text-cocoa-500">Ticket {sent.ticket}</p>
                <button
                  type="button"
                  onClick={() => setSent(null)}
                  className="eyebrow mt-5 border-b border-cocoa-900/30 pb-1 text-[0.55rem] text-cocoa-700 transition hover:border-gold-400 hover:text-gold-500"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="eyebrow mb-2 block text-[0.5rem] text-cocoa-500" htmlFor="c-name">
                    Your Name <span className="text-gold-500">*</span>
                  </label>
                  <input
                    id="c-name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Ayesha Khan"
                    className={cn(
                      "w-full border bg-transparent px-4 py-3 text-sm font-light transition placeholder:text-cocoa-300 focus:outline-none",
                      errors.name ? "border-red-400" : "border-cream-300 focus:border-cocoa-700",
                    )}
                  />
                  {errors.name && <p className="mt-1 text-[0.7rem] text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="eyebrow mb-2 block text-[0.5rem] text-cocoa-500" htmlFor="c-email">
                    Email
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@email.com"
                    className={cn(
                      "w-full border bg-transparent px-4 py-3 text-sm font-light transition placeholder:text-cocoa-300 focus:outline-none",
                      errors.email ? "border-red-400" : "border-cream-300 focus:border-cocoa-700",
                    )}
                  />
                  {errors.email && <p className="mt-1 text-[0.7rem] text-red-500">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="eyebrow mb-2 block text-[0.5rem] text-cocoa-500" htmlFor="c-subject">
                    Subject
                  </label>
                  <input
                    id="c-subject"
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    placeholder="Order help, bulk order, collaboration…"
                    className="w-full border border-cream-300 bg-transparent px-4 py-3 text-sm font-light transition placeholder:text-cocoa-300 focus:border-cocoa-700 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="eyebrow mb-2 block text-[0.5rem] text-cocoa-500" htmlFor="c-message">
                    Message <span className="text-gold-500">*</span>
                  </label>
                  <textarea
                    id="c-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Assalam o Alaikum! I would like to know…"
                    className={cn(
                      "w-full resize-none border bg-transparent px-4 py-3 text-sm font-light transition placeholder:text-cocoa-300 focus:outline-none",
                      errors.message ? "border-red-400" : "border-cream-300 focus:border-cocoa-700",
                    )}
                  />
                  {errors.message && <p className="mt-1 text-[0.7rem] text-red-500">{errors.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" size="md" disabled={sending} className="sm:min-w-[200px]">
                    {sending ? "Sending…" : "Send Message"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-8">
            <div className="border border-cream-300 bg-cocoa-950 p-7 text-cream-100">
              <p className="eyebrow text-[0.5rem] text-gold-400">Business Information</p>
              <h2 className="mt-3 font-display text-2xl">Afsana Luxe</h2>
              <dl className="mt-6 space-y-4 text-sm font-light">
                {[
                  ["Studio", brand.address],
                  ["Hours", brand.hours],
                  ["Phone / WhatsApp", brand.phone],
                  ["Email", `${brand.email} · ${brand.supportEmail}`],
                  ["Instagram", brand.instagramHandle],
                  ["Delivery", "Rs. 199 nationwide · free above Rs. 1,500"],
                  ["Payment", "Cash on Delivery"],
                  ["Returns", "7 days on unworn pieces"],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-cream-100/10 pb-3">
                    <dt className="eyebrow text-[0.5rem] text-gold-400">{label}</dt>
                    <dd className="mt-1 text-cream-200/85">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7 flex flex-wrap gap-2">
                <Button href={`https://wa.me/${brand.whatsapp}`} size="sm" variant="gold">
                  WhatsApp Us
                </Button>
                <Button href={brand.instagram} size="sm" variant="outlineLight">
                  Instagram
                </Button>
              </div>
            </div>

            <div className="border border-cream-300 bg-cream-100 p-7">
              <p className="eyebrow text-[0.5rem] text-gold-500">Order Lookup</p>
              <p className="mt-3 text-sm leading-relaxed font-light text-cocoa-600">
                Share your order number (for example <span className="text-cocoa-900">AL-4F2K91</span>)
                on WhatsApp and we will send a live courier update.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* faq */}
      <section className="border-t border-cream-300 bg-cream-100 py-20 md:py-24">
        <div className="container-lux">
          <Reveal>
            <SectionHeading eyebrow="Help Centre" title="Frequently asked questions" />
          </Reveal>
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-cream-300 border-y border-cream-300">
            {faqs.map((faq, index) => (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-lg text-cocoa-900">{faq.q}</span>
                  <span
                    className={cn(
                      "shrink-0 text-lg text-gold-500 transition-transform duration-300",
                      openFaq === index && "rotate-45",
                    )}
                  >
                    +
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === index ? "auto" : 0, opacity: openFaq === index ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-[0.88rem] leading-relaxed font-light text-cocoa-600">
                    {faq.a}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
