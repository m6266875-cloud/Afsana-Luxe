import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";

/* ─────────────── image with graceful fallback ─────────────── */

const DEFAULT_FALLBACK =
  "https://images.pexels.com/photos/28985983/pexels-photo-28985983.jpeg?auto=compress&cs=tinysrgb&w=1000";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  fallback?: string;
  priority?: boolean;
  sizes?: string;
}

export function SmartImage({
  src,
  alt,
  className,
  wrapperClassName,
  fallback = DEFAULT_FALLBACK,
  priority = false,
}: SmartImageProps) {
  const [current, setCurrent] = useState(src);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCurrent(src);
    setLoaded(false);
  }, [src]);

  return (
    <span className={cn("relative block overflow-hidden bg-cream-200", wrapperClassName)}>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-cream-200 via-cream-100 to-cream-300 transition-opacity duration-700",
          loaded ? "opacity-0" : "opacity-100 animate-pulse",
        )}
      />
      <img
        src={current}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (current !== fallback) setCurrent(fallback);
          setLoaded(true);
        }}
        className={cn(
          "h-full w-full object-cover transition-[opacity,transform] duration-700",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
      />
    </span>
  );
}

/* ─────────────── scroll reveal ─────────────── */

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────── typography helpers ─────────────── */

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "eyebrow mb-4 flex items-center gap-3",
            align === "center" && "justify-center",
            tone === "dark" ? "text-gold-500" : "text-gold-300",
          )}
        >
          <span className="h-px w-8 bg-current opacity-50" />
          {eyebrow}
          <span className="h-px w-8 bg-current opacity-50" />
        </p>
      ) : null}
      <h2
        className={cn(
          "text-balance-lux text-3xl leading-[1.1] font-light sm:text-4xl md:text-[2.75rem]",
          tone === "dark" ? "text-cocoa-900" : "text-cream-100",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-[0.95rem] leading-relaxed font-light",
            tone === "dark" ? "text-cocoa-600/90" : "text-cream-300/85",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/* ─────────────── buttons ─────────────── */

type Variant = "solid" | "outline" | "outlineLight" | "gold" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden text-center font-sans uppercase tracking-[0.18em] transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  solid:
    "bg-cocoa-900 text-cream-100 hover:bg-cocoa-800 shadow-[0_18px_40px_-24px_rgba(26,17,12,0.9)] hover:shadow-[0_22px_50px_-22px_rgba(26,17,12,0.95)]",
  outline:
    "border border-cocoa-900/25 text-cocoa-900 hover:border-cocoa-900 hover:bg-cocoa-900 hover:text-cream-100",
  outlineLight:
    "border border-cream-200/40 text-cream-100 hover:border-cream-100 hover:bg-cream-100 hover:text-cocoa-900",
  gold: "bg-gold-400 text-cocoa-950 hover:bg-gold-300",
  ghost: "text-cocoa-800 hover:text-gold-500",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[0.62rem]",
  md: "px-7 py-3.5 text-[0.66rem]",
  lg: "px-9 py-4 text-[0.7rem]",
};

const shine =
  "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function Button({
  children,
  variant = "solid",
  size = "md",
  to,
  href,
  onClick,
  type = "button",
  disabled,
  className,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span aria-hidden className={shine} />
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}

/* ─────────────── bits ─────────────── */

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          className={cn(
            "h-3 w-3",
            star <= Math.round(rating) ? "fill-gold-400" : "fill-cream-300",
          )}
        >
          <path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8z" />
        </svg>
      ))}
    </span>
  );
}

export function Pill({
  children,
  tone = "gold",
  className,
}: {
  children: ReactNode;
  tone?: "gold" | "dark" | "cream";
  className?: string;
}) {
  const tones = {
    gold: "bg-gold-400/90 text-cocoa-950",
    dark: "bg-cocoa-900 text-cream-100",
    cream: "bg-cream-100/90 text-cocoa-800 border border-cocoa-900/10",
  };
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center rounded-full px-3 py-1 text-[0.55rem] backdrop-blur",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-sm bg-cream-200", className)} />;
}

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      <div className="relative h-16 w-16">
        <span className="absolute inset-0 animate-ping rounded-full border border-gold-400/50" />
        <span className="absolute inset-2 animate-pulse rounded-full border border-cocoa-400/60" />
        <span className="absolute inset-0 flex items-center justify-center font-display text-2xl text-cocoa-700">
          A
        </span>
      </div>
      <p className="eyebrow text-cocoa-500">Curating the collection…</p>
    </div>
  );
}
