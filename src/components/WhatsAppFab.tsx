import { motion } from "framer-motion";
import { useStore } from "../store/StoreContext";

/** Floating WhatsApp concierge — appears after the first scroll. */
export default function WhatsAppFab() {
  const { brand } = useStore();
  const href = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
    "Assalam o Alaikum Afsana Luxe! I have a question about your jewellery.",
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with Afsana Luxe on WhatsApp"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="group fixed right-4 bottom-20 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-cocoa-950 text-gold-300 shadow-luxe ring-1 ring-gold-400/40 transition-colors hover:bg-cocoa-900 sm:right-6 sm:bottom-6"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-5 w-5">
        <path d="M20 12a8 8 0 0 1-11.7 7.1L4 20l1-4.1A8 8 0 1 1 20 12z" strokeLinejoin="round" />
        <path
          d="M9.2 9.3c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-1l-1.2-.7-1 .8c-.9-.4-1.7-1.2-2.1-2.1l.8-1-0.7-1.2c-.5 0-1 .4-1 .9z"
          strokeWidth="0.9"
        />
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-sm bg-cocoa-950 px-3 py-2 text-[0.65rem] tracking-wide text-cream-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
        Chat with us
      </span>
    </motion.a>
  );
}
