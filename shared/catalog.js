/**
 * Afsana Luxe — shared catalogue (single source of truth)
 * Used by the Express API (server/index.js) and, as an offline fallback,
 * by the React frontend so the storefront never renders empty.
 */

const px = (id, w = 1000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const brand = {
  name: "Afsana Luxe",
  tagline: "Our products add beauty to your arm.",
  since: 2021,
  city: "Lahore, Pakistan",
  email: "hello@afsanaluxe.pk",
  supportEmail: "care@afsanaluxe.pk",
  phone: "+92 300 1234567",
  whatsapp: "923001234567",
  instagram: "https://instagram.com/afsanaluxe",
  instagramHandle: "@afsanaluxe",
  ceo: { name: "Zain", handle: "@zainch8603", role: "Founder & CEO" },
  manager: { name: "Ayesha", handle: "@moon_lit_vibes06", role: "Brand Manager" },
  address: "Studio 12, Gulberg III, Lahore, Punjab, Pakistan",
  hours: "Mon – Sat · 11:00 AM – 9:00 PM (PKT)",
  freeShippingThreshold: 1500,
  deliveryCharges: 199,
};

export const categories = [
  {
    id: "watches",
    name: "Watches",
    tagline: "Time, beautifully kept",
    description:
      "Slim dress watches finished in gold, rose gold and midnight tones — designed for everyday grace.",
    image: "/images/watch-1.jpg",
  },
  {
    id: "bracelets",
    name: "Bracelets",
    tagline: "Beauty on your arm",
    description:
      "Feather-light chain bracelets, charm bracelets and cuffs that layer effortlessly.",
    image: px(29193418),
  },
  {
    id: "pendants",
    name: "Pendants",
    tagline: "A story at your collarbone",
    description:
      "Solitaires, pearls and celestial charms suspended on fine 18K-plated chains.",
    image: px(28985983),
  },
  {
    id: "earrings",
    name: "Earrings",
    tagline: "Light-catching finishes",
    description: "Studs, hoops and drops that move beautifully from desk to dinner.",
    image: px(20943477),
  },
  {
    id: "jewellery-sets",
    name: "Jewellery Sets",
    tagline: "Complete the afsana",
    description:
      "Matching necklace and earring sets, gift-boxed and ready for mehndis and nikkahs.",
    image: px(28985984),
  },
];

const detail = (over = {}) => ({
  material: "Brass base with 18K gold plating",
  finish: "High-polish, anti-tarnish coated",
  stones: "Hand-set AAA grade cubic zirconia",
  size: "One size · adjustable",
  weight: "18 g",
  closure: "Lobster clasp",
  packaging: "Afsana Luxe signature gift box",
  care: "Keep away from perfume and water; wipe with the enclosed cloth.",
  warranty: "6 month plating warranty",
  ...over,
});

export const products = [
  /* ─────────────── WATCHES ─────────────── */
  {
    id: "noor-classic-mesh-watch",
    name: "Noor Classic Mesh Watch",
    category: "watches",
    price: 1899,
    oldPrice: 2200,
    rating: 4.9,
    reviews: 128,
    stock: 14,
    badges: ["bestseller", "featured"],
    addedAt: "2025-11-02",
    short: "Gold mesh bracelet watch with a mother-of-pearl dial.",
    description:
      "The Noor is our most loved timepiece — a whisper-slim gold case framing a mother-of-pearl dial that shifts between cream and blush in the light. The soft mesh bracelet moulds to the wrist, so it sits comfortably from morning meetings to late-night dawaats.",
    images: ["/images/watch-1.jpg", px(13273982), px(29193418)],
    details: detail({
      material: "Stainless steel case, 18K gold plated mesh bracelet",
      stones: "Mother-of-pearl dial with crystal indices",
      size: "34 mm case · 17.5 cm adjustable mesh strap",
      weight: "42 g",
      closure: "Sliding magnetic clasp",
      movement: "Japanese quartz movement",
      warranty: "12 month movement warranty",
    }),
  },
  {
    id: "mehr-rose-gold-crystal-watch",
    name: "Mehr Rose Gold Crystal Watch",
    category: "watches",
    price: 1999,
    rating: 4.8,
    reviews: 96,
    stock: 9,
    badges: ["bestseller", "new"],
    addedAt: "2026-01-08",
    short: "Crystal-set bezel in warm rose gold on ivory leather.",
    description:
      "A halo of hand-set crystals surrounds the champagne dial of the Mehr, while the ivory leather strap keeps the look soft and feminine. Wear it alone as a statement, or stack it with the Aarzoo bracelet for a fuller arm party.",
    images: ["/images/watch-2.jpg", px(29193418), px(13273980)],
    details: detail({
      material: "Alloy case, rose gold plating, genuine leather strap",
      stones: "Crystal-set bezel",
      size: "36 mm case · 18 cm strap",
      weight: "45 g",
      closure: "Buckle clasp",
      movement: "Japanese quartz movement",
      warranty: "12 month movement warranty",
    }),
  },
  {
    id: "zarar-midnight-chronograph",
    name: "Zarar Midnight Chronograph",
    category: "watches",
    price: 1949,
    oldPrice: 2400,
    rating: 4.7,
    reviews: 74,
    stock: 11,
    badges: ["featured"],
    addedAt: "2025-12-14",
    short: "Black chronograph dial with a stitched leather strap.",
    description:
      "Designed for the man who notices detail, the Zarar pairs a matte midnight dial with three working sub-dials and a cocoa leather strap that ages beautifully. A quietly powerful gift for grooms, brothers and fathers.",
    images: [px(13273980), px(13273983)],
    details: detail({
      material: "Stainless steel case, black ion finish, leather strap",
      stones: "Luminous hands and applied markers",
      size: "42 mm case · 22 cm strap",
      weight: "78 g",
      closure: "Buckle clasp",
      movement: "Japanese chronograph movement",
      care: "Avoid submerging in water.",
      warranty: "12 month movement warranty",
    }),
  },
  {
    id: "falak-slim-gold-watch",
    name: "Falak Slim Gold Watch",
    category: "watches",
    price: 1649,
    rating: 4.6,
    reviews: 58,
    stock: 16,
    badges: [],
    addedAt: "2025-10-21",
    short: "Ultra-thin 6 mm case in polished gold.",
    description:
      "The Falak slides under a shirt cuff without a whisper. At just 6 mm thin, with a sunray brushed gold dial and matching bracelet, it is the everyday watch for women who prefer quiet luxury.",
    images: [px(13273983), "/images/watch-1.jpg"],
    details: detail({
      material: "Brass case, 18K gold plated bracelet",
      size: "32 mm case · 16.5 cm bracelet",
      weight: "38 g",
      movement: "Japanese quartz movement",
      warranty: "12 month movement warranty",
    }),
  },
  {
    id: "gul-e-rana-pearl-dial-watch",
    name: "Gul-e-Rana Pearl Dial Watch",
    category: "watches",
    price: 1799,
    rating: 4.8,
    reviews: 63,
    stock: 12,
    badges: ["new"],
    addedAt: "2026-01-19",
    short: "Pearl-white dial with cocoa leather strap.",
    description:
      "Named after the rose of the garden, Gul-e-Rana balances a pearlised dial with a rich cocoa leather strap. It is the piece our customers gift at nikkahs — timeless, feminine and never overly loud.",
    images: [px(13273982), "/images/watch-2.jpg"],
    details: detail({
      material: "Alloy case, gold plating, vegan leather strap",
      stones: "Pearl-effect dial",
      size: "34 mm case · 18 cm strap",
      weight: "40 g",
      movement: "Japanese quartz movement",
      warranty: "12 month movement warranty",
    }),
  },
  {
    id: "sitara-noir-leather-watch",
    name: "Sitara Noir Leather Watch",
    category: "watches",
    price: 1599,
    rating: 4.5,
    reviews: 41,
    stock: 18,
    badges: [],
    addedAt: "2025-09-30",
    short: "Matte black square case with gold hands.",
    description:
      "Architectural and a little bit moody, the Sitara Noir has a squared matte black case softened by slim gold hands and indices. It pairs perfectly with our Roshan Geometric Bracelet.",
    images: [px(13273983), px(13273980)],
    details: detail({
      material: "Alloy case, matte black PVD, leather strap",
      size: "30 mm square case · 17.5 cm strap",
      weight: "44 g",
      movement: "Japanese quartz movement",
      warranty: "12 month movement warranty",
    }),
  },

  /* ─────────────── BRACELETS ─────────────── */
  {
    id: "chandni-chain-bracelet",
    name: "Chandni Chain Bracelet",
    category: "bracelets",
    price: 749,
    rating: 4.7,
    reviews: 142,
    stock: 40,
    badges: ["bestseller"],
    addedAt: "2025-08-11",
    short: "Feather-light flat snake chain in gold.",
    description:
      "Chandni means moonlight, and this bracelet earns the name — a flat snake chain that glows rather than sparkles. It is the base layer of almost every wrist stack we style on Instagram.",
    images: [px(29193415), px(30746010)],
    details: detail({
      size: "16 cm + 3 cm extender chain",
      weight: "6 g",
    }),
  },
  {
    id: "aarzoo-diamond-line-bracelet",
    name: "Aarzoo Diamond-Line Bracelet",
    category: "bracelets",
    price: 1299,
    oldPrice: 1599,
    rating: 4.9,
    reviews: 187,
    stock: 24,
    badges: ["bestseller", "featured"],
    addedAt: "2025-11-27",
    short: "A continuous line of hand-set crystals.",
    description:
      "Our most gifted bracelet. Each stone is set by hand into a four-prong cup so the line reads unbroken across the wrist. Comes in the signature Afsana Luxe box with a care cloth — ready to gift as-is.",
    images: [px(28985978), px(8306528)],
    details: detail({
      size: "17 cm + 2 cm extender",
      weight: "11 g",
    }),
  },
  {
    id: "falak-arrow-cuff",
    name: "Falak Arrow Cuff",
    category: "bracelets",
    price: 999,
    rating: 4.6,
    reviews: 66,
    stock: 22,
    badges: [],
    addedAt: "2025-10-04",
    short: "Open cuff with a crystal arrow motif.",
    description:
      "A structured open cuff with a single crystal-tipped arrow, designed to sit snugly on the lower wrist. Squeeze gently to adjust the fit — no clasp, no fuss.",
    images: [px(29193418), px(13160939)],
    details: detail({
      material: "Brass cuff, 18K gold plating",
      size: "Adjustable open cuff · 6 cm diameter",
      weight: "19 g",
      closure: "Open cuff (bendable)",
    }),
  },
  {
    id: "dilbar-heart-charm-bracelet",
    name: "Dilbar Heart Charm Bracelet",
    category: "bracelets",
    price: 649,
    rating: 4.5,
    reviews: 89,
    stock: 35,
    badges: [],
    addedAt: "2025-07-19",
    short: "Delicate cable chain with three heart charms.",
    description:
      "Three tiny hearts travel along a fine cable chain — a sweet, affordable gift for sisters, best friends and bridesmaids. Also available in a two-piece gift set at checkout.",
    images: [px(30746010), px(29193417)],
    details: detail({
      size: "15.5 cm + 4 cm extender",
      weight: "5 g",
    }),
  },
  {
    id: "nigella-clover-bracelet",
    name: "Nigella Clover Bracelet",
    category: "bracelets",
    price: 899,
    rating: 4.7,
    reviews: 74,
    stock: 27,
    badges: ["new"],
    addedAt: "2026-01-12",
    short: "Four-leaf clover charms set with pastel gems.",
    description:
      "Clover motifs in iridescent pastel stones, spaced along a fine gold chain. A lucky little thing that looks far more expensive than it is.",
    images: [px(29193417), px(29193415)],
    details: detail({
      size: "16 cm + 3 cm extender",
      weight: "8 g",
    }),
  },
  {
    id: "roshan-geometric-charm-bracelet",
    name: "Roshan Geometric Charm Bracelet",
    category: "bracelets",
    price: 799,
    rating: 4.4,
    reviews: 52,
    stock: 30,
    badges: [],
    addedAt: "2025-09-06",
    short: "Circles and triangles on a bold gold chain.",
    description:
      "A modern, slightly architectural bracelet — alternating polished discs and triangles catch light from every angle. Our most unisex bracelet, and a favourite with grooms' sisters.",
    images: [px(29193415), px(13160939)],
    details: detail({
      size: "18 cm + 3 cm extender",
      weight: "14 g",
    }),
  },

  /* ─────────────── PENDANTS ─────────────── */
  {
    id: "mehrun-solitaire-pendant",
    name: "Mehrun Solitaire Pendant",
    category: "pendants",
    price: 1099,
    oldPrice: 1350,
    rating: 4.9,
    reviews: 164,
    stock: 26,
    badges: ["bestseller", "featured"],
    addedAt: "2025-11-16",
    short: "Single solitaire on a fine cable chain.",
    description:
      "One brilliant-cut stone, four delicate prongs, and a chain so fine it almost disappears against the skin. The Mehrun is the pendant equivalent of a perfect white kameez — it goes with absolutely everything.",
    images: [px(30746008), px(13325931)],
    details: detail({
      material: "Brass pendant, 18K gold plated 45 cm cable chain",
      size: "6 mm stone · 45 cm chain",
      weight: "4 g",
      closure: "Spring ring clasp",
    }),
  },
  {
    id: "gulbahar-pearl-pendant",
    name: "Gulbahar Pearl Pendant",
    category: "pendants",
    price: 899,
    rating: 4.8,
    reviews: 112,
    stock: 21,
    badges: [],
    addedAt: "2025-10-28",
    short: "Shell pearl suspended from a gold halo.",
    description:
      "A lustrous shell pearl framed in a halo of micro crystals. Pearl jewellery never leaves the Pakistani trousseau, and this is our most accessible way to wear it every day.",
    images: [px(28985983), px(28985980)],
    details: detail({
      stones: "8 mm shell pearl with cubic zirconia halo",
      size: "45 cm chain",
      weight: "6 g",
    }),
  },
  {
    id: "noor-e-sahar-rose-pearl-pendant",
    name: "Noor-e-Sahar Rose Pearl Pendant",
    category: "pendants",
    price: 799,
    rating: 4.6,
    reviews: 58,
    stock: 25,
    badges: ["new"],
    addedAt: "2026-01-22",
    short: "Rose gold setting with a blush pearl drop.",
    description:
      "Soft rose gold, a blush pearl and a chain with the faintest sparkle — Noor-e-Sahar was made for pastel chiffon and winter weddings. Photographs beautifully in natural light.",
    images: [px(28985980), px(28985983)],
    details: detail({
      material: "Brass, rose gold plating",
      stones: "Blush shell pearl",
      size: "42 cm chain + 5 cm extender",
      weight: "5 g",
    }),
  },
  {
    id: "aftab-sun-pendant",
    name: "Aftab Sun Pendant",
    category: "pendants",
    price: 1199,
    rating: 4.7,
    reviews: 69,
    stock: 17,
    badges: [],
    addedAt: "2025-12-02",
    short: "Radiant sunburst pendant set with crystals.",
    description:
      "A sculptural sunburst with crystal rays — bold enough to be the only necklace you wear. Inspired by the mosaics of Lahore's old walled city.",
    images: [px(13325937), px(13325931)],
    details: detail({
      size: "22 mm pendant · 45 cm chain",
      weight: "9 g",
    }),
  },
  {
    id: "sitara-star-pendant",
    name: "Sitara Star Pendant",
    category: "pendants",
    price: 649,
    rating: 4.5,
    reviews: 83,
    stock: 33,
    badges: [],
    addedAt: "2025-08-25",
    short: "Pavé star charm on a fine chain.",
    description:
      "A tiny pavé star that sits just below the collarbone. Layer it with the Chandni bracelet or gift it to a daughter starting her first job.",
    images: [px(13325931), px(29986286)],
    details: detail({
      size: "11 mm star · 40 cm chain",
      weight: "3 g",
    }),
  },
  {
    id: "titli-butterfly-pendant",
    name: "Titli Butterfly Pendant",
    category: "pendants",
    price: 999,
    rating: 4.8,
    reviews: 97,
    stock: 19,
    badges: ["bestseller"],
    addedAt: "2025-12-20",
    short: "Sculpted butterfly in polished gold.",
    description:
      "Our most photographed pendant. The Titli has a hand-polished body and finely textured wings that flutter when you move. A bestseller with teenagers and mothers alike.",
    images: [px(29986286), px(13325937)],
    details: detail({
      size: "16 mm butterfly · 45 cm chain",
      weight: "7 g",
    }),
  },

  /* ─────────────── EARRINGS ─────────────── */
  {
    id: "dilkhush-heart-studs",
    name: "Dilkhush Heart Studs",
    category: "earrings",
    price: 549,
    rating: 4.8,
    reviews: 203,
    stock: 48,
    badges: ["bestseller"],
    addedAt: "2025-07-02",
    short: "Gold heart studs with pavé crystals.",
    description:
      "Small enough for school runs, sparkly enough for shaadi season. The Dilkhush studs are hypoallergenic, feather-light and our single most repeated purchase.",
    images: [px(29193422), px(28389455)],
    details: detail({
      material: "Brass, 18K gold plating, surgical steel post",
      size: "9 mm stud",
      weight: "2 g (pair)",
      closure: "Push back",
    }),
  },
  {
    id: "raunak-hoop-earrings",
    name: "Raunak Hoop Earrings",
    category: "earrings",
    price: 899,
    rating: 4.7,
    reviews: 118,
    stock: 31,
    badges: [],
    addedAt: "2025-09-14",
    short: "Inside-out crystal hoops, 25 mm.",
    description:
      "Crystals set along the front and back of the hoop so they sparkle whichever way they swing. Hinged for a clean, gap-free closure.",
    images: [px(20943476), px(20943478)],
    details: detail({
      size: "25 mm diameter hoop",
      weight: "6 g (pair)",
      closure: "Hinged clasp",
    }),
  },
  {
    id: "shama-gold-drop-earrings",
    name: "Shama Gold Drop Earrings",
    category: "earrings",
    price: 1099,
    oldPrice: 1299,
    rating: 4.9,
    reviews: 87,
    stock: 20,
    badges: ["featured"],
    addedAt: "2025-11-09",
    short: "Cluster drops in pavé-set gold.",
    description:
      "Three graduated clusters of crystals create a drop that moves with you. Elegant with a saree, unexpected with a blazer — Shama is the earring we reach for when styling shoots.",
    images: [px(20943477), px(20943478)],
    details: detail({
      size: "34 mm drop",
      weight: "8 g (pair)",
      closure: "Push back",
    }),
  },
  {
    id: "mehak-solitaire-studs",
    name: "Mehak Solitaire Studs",
    category: "earrings",
    price: 499,
    rating: 4.6,
    reviews: 156,
    stock: 55,
    badges: [],
    addedAt: "2025-06-18",
    short: "Classic 6 mm solitaire studs.",
    description:
      "The everyday solitaire — a 6 mm brilliant-cut stone in a four-prong basket. An easy first gift, and the pair most customers end up buying twice.",
    images: [px(28389455), px(29193422)],
    details: detail({
      size: "6 mm stone",
      weight: "2 g (pair)",
      closure: "Push back",
    }),
  },
  {
    id: "sahil-gemstone-studs",
    name: "Sahil Gemstone Studs",
    category: "earrings",
    price: 699,
    rating: 4.4,
    reviews: 47,
    stock: 29,
    badges: ["new"],
    addedAt: "2026-01-26",
    short: "Multicolour gemstone clusters in gold.",
    description:
      "Aquamarine, peridot and champagne stones clustered together in warm gold — a little seaside, a little sunset. Limited seasonal run.",
    images: [px(17399543), px(20943476)],
    details: detail({
      stones: "Faceted glass gemstones",
      size: "10 mm cluster",
      weight: "3 g (pair)",
      closure: "Push back",
    }),
  },
  {
    id: "anmol-crystal-cluster-earrings",
    name: "Anmol Crystal Cluster Earrings",
    category: "earrings",
    price: 1199,
    rating: 4.8,
    reviews: 71,
    stock: 16,
    badges: [],
    addedAt: "2025-12-27",
    short: "Statement clusters for mehndi and nikkah.",
    description:
      "Hand-arranged crystal clusters with a soft champagne glow. Light enough to dance in all night, dramatic enough to carry a bare neck.",
    images: [px(20943478), px(8656236)],
    details: detail({
      size: "28 mm cluster",
      weight: "9 g (pair)",
      closure: "Push back",
    }),
  },

  /* ─────────────── JEWELLERY SETS ─────────────── */
  {
    id: "gulnar-floral-jewellery-set",
    name: "Gulnar Floral Jewellery Set",
    category: "jewellery-sets",
    price: 1999,
    oldPrice: 2500,
    rating: 4.9,
    reviews: 134,
    stock: 13,
    badges: ["bestseller", "featured"],
    addedAt: "2025-11-30",
    short: "Necklace and earring set with floral motifs.",
    description:
      "A matching necklace and earring set built around hand-finished floral cups set with champagne crystals. Our most requested set for mehndi and mayun — arrives in a two-tier gift box.",
    images: [px(28985984), px(8306531)],
    details: detail({
      stones: "Champagne cubic zirconia",
      size: "Necklace 42 cm + 5 cm extender · earrings 26 mm",
      weight: "34 g (set)",
      closure: "Lobster clasp · push back",
    }),
  },
  {
    id: "rooh-rose-gold-set",
    name: "Rooh Rose Gold Set",
    category: "jewellery-sets",
    price: 1899,
    rating: 4.8,
    reviews: 92,
    stock: 12,
    badges: [],
    addedAt: "2025-12-09",
    short: "Rose gold necklace and earrings against blush stones.",
    description:
      "Soft, romantic and endlessly flattering on desi skin tones. Rooh pairs a rose gold pendant necklace with matching drops — a complete look in one box.",
    images: [px(30746014), px(8306527)],
    details: detail({
      material: "Brass, rose gold plating",
      size: "Necklace 45 cm · earrings 24 mm",
      weight: "30 g (set)",
    }),
  },
  {
    id: "shahi-diamond-necklace-set",
    name: "Shahi Diamond Necklace Set",
    category: "jewellery-sets",
    price: 1799,
    rating: 4.7,
    reviews: 78,
    stock: 15,
    badges: ["featured"],
    addedAt: "2025-10-12",
    short: "Ice-white necklace and earring set.",
    description:
      "Cool, crystal-clear stones set in rhodium-finished brass give Shahi a diamond-like read under wedding lights. The set our customers borrow and never return.",
    images: [px(8306531), px(8656236)],
    details: detail({
      material: "Brass with rhodium finish",
      stones: "Ice-white cubic zirconia",
      size: "Necklace 40 cm + 5 cm extender",
      weight: "38 g (set)",
    }),
  },
  {
    id: "mahi-shell-diamond-set",
    name: "Mahi Shell Diamond Set",
    category: "jewellery-sets",
    price: 1499,
    rating: 4.6,
    reviews: 54,
    stock: 18,
    badges: [],
    addedAt: "2025-09-22",
    short: "Coastal-inspired necklace and earring duo.",
    description:
      "Styled after treasures found on the shore — a fine crystal necklace with delicate drops, photographed with shells and feathers for our summer campaign.",
    images: [px(8656236), px(8306531)],
    details: detail({
      size: "Necklace 42 cm · earrings 20 mm",
      weight: "24 g (set)",
    }),
  },
  {
    id: "angan-pendant-earring-set",
    name: "Angan Pendant & Earring Set",
    category: "jewellery-sets",
    price: 1249,
    rating: 4.7,
    reviews: 63,
    stock: 23,
    badges: ["new"],
    addedAt: "2026-01-15",
    short: "Everyday pendant with matching studs.",
    description:
      "A pendant necklace and matching stud set designed for daily wear — office, university, chai runs. Anti-tarnish coated so it keeps its shine through Pakistani summers.",
    images: [px(8306527), px(28985984)],
    details: detail({
      size: "Necklace 45 cm · studs 8 mm",
      weight: "16 g (set)",
    }),
  },
  {
    id: "motia-pearl-cascade-set",
    name: "Motia Pearl Cascade Set",
    category: "jewellery-sets",
    price: 1599,
    oldPrice: 1899,
    rating: 4.9,
    reviews: 88,
    stock: 14,
    badges: ["bestseller"],
    addedAt: "2025-11-05",
    short: "Layered pearl necklace with pearl drops.",
    description:
      "Motia (jasmine) layers three strands of shell pearls into a cascade that sits perfectly against a boat neckline. Comes with matching pearl drops — the classic nikkah look, minus the classic price.",
    images: [px(28985983), px(28985984)],
    details: detail({
      stones: "Shell pearls with cubic zirconia spacers",
      size: "Necklace 44 cm · drops 22 mm",
      weight: "41 g (set)",
    }),
  },
];

export const reviews = [
  {
    name: "Hina R.",
    city: "Karachi",
    rating: 5,
    product: "Aarzoo Diamond-Line Bracelet",
    text: "I ordered two Aarzoo bracelets and both arrived in the most beautiful boxes. The plating still looks new after three months of daily wear.",
  },
  {
    name: "Sana T.",
    city: "Lahore",
    rating: 5,
    product: "Noor Classic Mesh Watch",
    text: "The Noor watch looks far more expensive than Rs. 1,899. My colleagues genuinely asked if it was a designer piece.",
  },
  {
    name: "Mahnoor A.",
    city: "Islamabad",
    rating: 5,
    product: "Titli Butterfly Pendant",
    text: "Cash on delivery made it so easy to trust a new brand. The pendant is dainty and hasn't dulled at all.",
  },
  {
    name: "Areeba K.",
    city: "Faisalabad",
    rating: 4,
    product: "Gulnar Floral Jewellery Set",
    text: "Wore the Gulnar set at my cousin's mehndi and got so many compliments. Packaging is genuinely gift-worthy.",
  },
  {
    name: "Zoya M.",
    city: "Multan",
    rating: 5,
    product: "Dilkhush Heart Studs",
    text: "Rs. 549 for these little hearts is a steal. I've bought them three times now — once for myself, twice as gifts.",
  },
  {
    name: "Rabia S.",
    city: "Rawalpindi",
    rating: 5,
    product: "Zarar Midnight Chronograph",
    text: "Bought the Zarar for my husband. He wears it to office every single day and the strap has aged beautifully.",
  },
];

export const instagramPosts = [
  { image: px(29986286), caption: "Titli, styled three ways", likes: 1284 },
  { image: px(30746014), caption: "Rose gold hour", likes: 962 },
  { image: px(9398390), caption: "Shaadi season diaries", likes: 2140 },
  { image: px(18285660), caption: "Stacked to perfection", likes: 745 },
  { image: px(17399543), caption: "Sahil studs, sunlit", likes: 618 },
  { image: px(28985984), caption: "The Gulnar unboxing", likes: 1523 },
];

/* ─────────────── helpers shared by API + frontend ─────────────── */

export const findProduct = (id) => products.find((p) => p.id === id);

export const relatedProducts = (id, limit = 4) => {
  const product = findProduct(id);
  if (!product) return [];
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );
  const others = products.filter((p) => p.category !== product.category);
  return [...sameCategory, ...others].slice(0, limit);
};

export const queryProducts = (q = {}) => {
  let list = [...products];

  if (q.category && q.category !== "all") {
    list = list.filter((p) => p.category === q.category);
  }
  if (q.search) {
    const term = String(q.search).toLowerCase().trim();
    list = list.filter((p) =>
      [p.name, p.short, p.description, p.category].join(" ").toLowerCase().includes(term),
    );
  }
  const min = Number.isFinite(Number(q.minPrice)) ? Number(q.minPrice) : 0;
  const max = Number.isFinite(Number(q.maxPrice)) ? Number(q.maxPrice) : Infinity;
  list = list.filter((p) => p.price >= min && p.price <= max);

  if (q.badge) list = list.filter((p) => p.badges.includes(q.badge));

  const sorters = {
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    "name-asc": (a, b) => a.name.localeCompare(b.name),
    "name-desc": (a, b) => b.name.localeCompare(a.name),
    rating: (a, b) => b.rating - a.rating,
    newest: (a, b) => new Date(b.addedAt) - new Date(a.addedAt),
    featured: (a, b) => b.badges.length - a.badges.length || b.rating - a.rating,
  };
  const sorter = sorters[q.sort] || sorters.featured;
  list.sort(sorter);

  const limit = Number(q.limit);
  if (Number.isFinite(limit) && limit > 0) list = list.slice(0, limit);

  return list;
};
