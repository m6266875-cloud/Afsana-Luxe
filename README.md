# Afsana Luxe — Jewellery & Watches

> _"Our products add beauty to your arm."_

A luxury Pakistani jewellery & watches storefront built with **React + Vite + Tailwind CSS + Framer Motion + React Router**, powered by a **Node.js + Express** REST API with static in-memory data (no database).

- **Brand:** Afsana Luxe · Est. 2021 · Lahore, Pakistan
- **Founder & CEO:** [@zainch8603](https://instagram.com/zainch8603)
- **Brand Manager:** [@moon_lit_vibes06](https://instagram.com/moon_lit_vibes06)
- **Catalogue:** 30 products across Watches, Bracelets, Pendants, Earrings and Jewellery Sets
- **Pricing:** every product between **Rs. 400** and **Rs. 2,000** (PKR only)

---

## 1. Frontend

```bash
npm install
npm run dev      # Vite dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

Routes (hash router, so deep links never 404 on static hosts):

| Route                 | Page                                                       |
| --------------------- | ---------------------------------------------------------- |
| `/`                   | Home — hero, categories, best sellers, new arrivals, watches, collection, why us, reviews, Instagram, final CTA |
| `/shop`               | Shop — search, category filter, price filter, sorting, wishlist view |
| `/product/:id`        | Product details — gallery, description, specs, quantity, add to cart, buy now, related |
| `/cart`               | Cart — quantity controls, remove, subtotal, delivery, total, clear cart |
| `/checkout`           | Checkout — validated form + COD + order summary            |
| `/order-confirmation` | Order confirmation with order number and full summary      |
| `/about`              | Brand story + leadership (CEO & Manager)                   |
| `/contact`            | Contact form, WhatsApp, Instagram, email, business info, FAQs |

The cart and wishlist are persisted in `localStorage` (`afsanaluxe.cart.v1`, `afsanaluxe.wishlist.v1`).

## 2. Backend (Node.js + Express, in-memory)

```bash
cd server
npm install
npm start          # http://localhost:5000  (or: npm run dev for watch mode)
```

The API serves the built storefront from `../dist` when it exists, so one process can host both.

| Method | Endpoint                        | Description                                              |
| ------ | ------------------------------- | -------------------------------------------------------- |
| GET    | `/api/health`                   | Service heartbeat (product/order counts)                 |
| GET    | `/api/brand`                    | Brand info, reviews, Instagram posts                     |
| GET    | `/api/categories`               | Categories with product counts and "from" price          |
| GET    | `/api/products`                 | Query: `category`, `search`, `minPrice`, `maxPrice`, `sort`, `badge`, `limit` |
| GET    | `/api/products/featured`        | Featured picks                                           |
| GET    | `/api/products/bestsellers`     | Best sellers                                             |
| GET    | `/api/products/new-arrivals`    | Newest first                                             |
| GET    | `/api/products/:id`             | Product details                                          |
| GET    | `/api/products/:id/related`     | Related products                                         |
| POST   | `/api/orders`                   | Place an order → validated, priced and stored in memory  |
| GET    | `/api/orders` / `/api/orders/:id` | Demo order log / single order                          |
| POST   | `/api/contact`                  | Contact form → returns a support ticket id               |

Example:

```bash
curl "http://localhost:5000/api/products?category=watches&sort=price-asc"
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customer":{"fullName":"Ayesha Khan","phone":"03001234567","address":"House 12, Gulberg III","city":"Lahore","postalCode":"54000"},"items":[{"id":"noor-classic-mesh-watch","qty":1}]}'
```

### Connecting the frontend to the API

The client calls `/api/*` on the current origin. To point it at a remote API, set `VITE_API_URL`:

```bash
echo "VITE_API_URL=https://your-api.example.com/api" > .env
```

If the API is unreachable (for example when `dist/index.html` is previewed as a static file),
the storefront automatically falls back to the same in-memory catalogue in `shared/catalog.js`,
so the shop always renders with real products, images and prices.

## 3. Project structure

```
shared/catalog.js        ← single source of truth (products, categories, reviews)
server/index.js          ← Express REST API (in-memory orders & messages)
src/
  components/            ← Navbar, Footer, ProductCard, CartDrawer, QuickView, UI primitives
  pages/                 ← Home, Shop, ProductDetails, Cart, Checkout, OrderConfirmation, About, Contact
  store/StoreContext.tsx ← cart, wishlist, orders, toasts (localStorage persisted)
  lib/api.ts             ← API client + graceful local fallback
```
