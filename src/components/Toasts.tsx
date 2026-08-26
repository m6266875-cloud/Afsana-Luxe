import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../store/StoreContext";
import { cn } from "../utils/cn";

export default function Toasts() {
  const { toasts, dismissToast } = useStore();

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[90] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex w-full max-w-sm items-start gap-3 border border-cream-100/10 bg-cocoa-950/95 px-4 py-3 shadow-luxe backdrop-blur"
            onClick={() => dismissToast(toast.id)}
          >
            <span
              className={cn(
                "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.7rem]",
                toast.tone === "success" && "bg-gold-400 text-cocoa-950",
                toast.tone === "info" && "bg-cream-200 text-cocoa-900",
                toast.tone === "error" && "bg-red-500 text-white",
              )}
            >
              {toast.tone === "success" ? "✓" : toast.tone === "error" ? "!" : "✦"}
            </span>
            <div className="min-w-0">
              <p className="text-sm text-cream-100">{toast.title}</p>
              {toast.detail ? (
                <p className="mt-0.5 truncate text-xs font-light text-cream-300/80">{toast.detail}</p>
              ) : null}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
