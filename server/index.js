/**
 * Afsana Luxe — REST API
 * Node.js + Express, static in-memory data only (no PostgreSQL / MongoDB / Supabase).
 *
 *   cd server && npm install && npm start     →  http://localhost:5000
 *
 * Endpoints
 *   GET  /api/health
 *   GET  /api/brand
 *   GET  /api/categories
 *   GET  /api/products            ?category &search &minPrice &maxPrice &sort &badge &limit
 *   GET  /api/products/featured
 *   GET  /api/products/bestsellers
 *   GET  /api/products/new-arrivals
 *   GET  /api/products/:id
 *   GET  /api/products/:id/related
 *   POST /api/orders              { customer, items, paymentMethod }
 *   GET  /api/orders              (demo: latest in-memory orders)
 *   GET  /api/orders/:id
 *   POST /api/contact             { name, email, subject, message }
 *   GET  /api/reviews
 *   GET  /api/instagram
 */

import express from "express";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import {
  brand,
  categories,
  findProduct,
  instagramPosts,
  products,
  queryProducts,
  relatedProducts,
  reviews,
} from "../shared/catalog.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

/* ── in-memory stores (demonstration only) ───────────────────────── */
/** @type {Array<any>} */
const orders = [];
/** @type {Array<any>} */
const messages = [];

const DELIVERY_FLAT = brand.deliveryCharges;
const FREE_DELIVERY_OVER = brand.freeShippingThreshold;

const money = (n) => Math.round(Number(n) || 0);

const priceItems = (items = []) =>
  items.map((item, index) => {
    const product = findProduct(item.id);
    if (!product) {
      const err = new Error(`Product not found: ${item.id}`);
      err.status = 400;
      throw err;
    }
    const qty = Math.max(1, Math.min(20, parseInt(item.qty ?? item.quantity ?? 1, 10) || 1));
    return {
      key: `${product.id}-${index}`,
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.images[0],
      price: product.price,
      qty,
      lineTotal: product.price * qty,
    };
  });

const summarise = (items) => {
  const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FLAT;
  return { subtotal, delivery, total: subtotal + delivery };
};

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next));

/* ── meta ────────────────────────────────────────────────────────── */
app.get("/api/health", (_req, res) =>
  res.json({
    status: "ok",
    service: "afsanaluxe-api",
    products: products.length,
    categories: categories.length,
    orders: orders.length,
    time: new Date().toISOString(),
  }),
);

app.get("/api/brand", (_req, res) => res.json({ ...brand, reviews, instagramPosts }));

app.get("/api/categories", (_req, res) =>
  res.json(
    categories.map((category) => ({
      ...category,
      count: products.filter((p) => p.category === category.id).length,
      from: Math.min(...products.filter((p) => p.category === category.id).map((p) => p.price)),
    })),
  ),
);

app.get("/api/reviews", (_req, res) => res.json(reviews));
app.get("/api/instagram", (_req, res) => res.json(instagramPosts));

/* ── products ────────────────────────────────────────────────────── */
app.get("/api/products", (req, res) => {
  const { category, search, minPrice, maxPrice, sort, badge, limit } = req.query;
  res.json({
    count: queryProducts(req.query).length,
    total: products.length,
    products: queryProducts({ category, search, minPrice, maxPrice, sort, badge, limit }),
  });
});

app.get("/api/products/featured", (_req, res) =>
  res.json(queryProducts({ badge: "featured", limit: 8 })),
);
app.get("/api/products/bestsellers", (_req, res) =>
  res.json(queryProducts({ badge: "bestseller", sort: "rating", limit: 8 })),
);
app.get("/api/products/new-arrivals", (_req, res) =>
  res.json(queryProducts({ sort: "newest", limit: 8 })),
);

app.get(
  "/api/products/:id",
  asyncHandler((req, res) => {
    const product = findProduct(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    return res.json(product);
  }),
);

app.get(
  "/api/products/:id/related",
  asyncHandler((req, res) => {
    const product = findProduct(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    return res.json(relatedProducts(req.params.id, 4));
  }),
);

/* ── orders ──────────────────────────────────────────────────────── */
app.post(
  "/api/orders",
  asyncHandler((req, res) => {
    const { customer = {}, items = [], paymentMethod = "COD", notes = "" } = req.body || {};

    if (!customer.fullName?.trim()) {
      return res.status(400).json({ error: "Full name is required" });
    }
    if (!/^[0-9+\-\s()]{10,20}$/.test(String(customer.phone || ""))) {
      return res.status(400).json({ error: "A valid phone number is required" });
    }
    if (!String(customer.address || "").trim()) {
      return res.status(400).json({ error: "Delivery address is required" });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Your cart is empty" });
    }

    const priced = priceItems(items);
    const totals = summarise(priced);
    const id = `AL-${Date.now().toString(36).toUpperCase().slice(-6)}${Math.floor(
      Math.random() * 90 + 10,
    )}`;

    const order = {
      id,
      status: "confirmed",
      paymentMethod,
      notes,
      customer: {
        fullName: customer.fullName.trim(),
        phone: customer.phone.trim(),
        email: customer.email?.trim() || "",
        address: customer.address.trim(),
        city: customer.city?.trim() || "",
        postalCode: customer.postalCode?.trim() || "",
      },
      items: priced,
      ...totals,
      placedAt: new Date().toISOString(),
      eta: "3 – 5 working days",
    };

    orders.unshift(order);
    return res.status(201).json(order);
  }),
);

app.get("/api/orders", (_req, res) =>
  res.json({
    count: orders.length,
    orders: orders.map(({ items, ...rest }) => ({
      ...rest,
      itemCount: items.reduce((n, i) => n + i.qty, 0),
    })),
  }),
);

app.get(
  "/api/orders/:id",
  asyncHandler((req, res) => {
    const order = orders.find((o) => o.id.toLowerCase() === req.params.id.toLowerCase());
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.json(order);
  }),
);

/* ── contact ─────────────────────────────────────────────────────── */
app.post("/api/contact", (req, res) => {
  const { name = "", email = "", subject = "", message = "" } = req.body || {};
  if (!name.trim() || !message.trim()) {
    return res.status(400).json({ error: "Name and message are required" });
  }
  const ticket = {
    id: `MSG-${messages.length + 1}`.padEnd(8, "0"),
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim() || "General enquiry",
    message: message.trim(),
    receivedAt: new Date().toISOString(),
  };
  messages.unshift(ticket);
  return res.status(201).json({
    ok: true,
    ticket: ticket.id,
    reply: `Shukriya ${ticket.name}! Our team replies within 24 hours on working days.`,
  });
});

app.get("/api/contact", (_req, res) => res.json({ count: messages.length, messages }));

app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: `No route for ${req.method} ${req.path}` });
  }
  return next();
});

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  if (status >= 500) console.error("[afsanaluxe-api]", err);
  res.status(status).json({ error: err.message || "Something went wrong" });
});

/* ── serve the built storefront when it exists ───────────────────── */
const distDir = path.resolve(__dirname, "../dist");
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get("*", (_req, res) => res.sendFile(path.join(distDir, "index.html")));
}

app.listen(PORT, () => {
  console.log(`\n  Afsana Luxe API  →  http://localhost:${PORT}/api/health`);
  console.log(`  ${products.length} products · ${categories.length} categories · in-memory orders\n`);
});
