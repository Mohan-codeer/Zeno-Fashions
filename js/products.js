/* Zeno Fasions — product catalogue.
   Swap CURRENCY to change the symbol. To use real photos, add an `image`
   field to any product (e.g. image: "assets/img/hoodie.jpg") — it replaces
   the generated illustration automatically. */

const CURRENCY = { symbol: "$", code: "USD" };
const FREE_SHIPPING_AT = 150;
const FLAT_SHIPPING = 9.99;

const CATEGORIES = [
  "Streetwear",
  "Casual",
  "Suits & Tailoring",
  "Outerwear",
  "Dresses",
  "Footwear",
  "Accessories",
];

const SIZES = {
  tops: ["S", "M", "L", "XL"],
  bottoms: ["28", "30", "32", "34"],
  suit: ["38", "40", "42", "44"],
  dress: ["XS", "S", "M", "L"],
  shoes: ["7", "8", "9", "10", "11"],
  one: ["One size"],
};

const PRODUCTS = [
  // ---- Streetwear
  { id: 1, name: "Oversized Graphic Tee", category: "Streetwear", price: 34, type: "tee", color: "#1d1d1f", accent: "#e8e2d4", bg: "#dcd7cd", sizes: SIZES.tops, tag: "New", desc: "Heavyweight cotton, dropped shoulders." },
  { id: 2, name: "Heavyweight Hoodie", category: "Streetwear", price: 78, type: "hoodie", color: "#6f7d5e", accent: "#efe9da", bg: "#d9dccb", sizes: SIZES.tops, tag: "Bestseller", desc: "480gsm brushed fleece, boxy fit." },
  { id: 3, name: "Cargo Utility Pants", category: "Streetwear", price: 82, type: "cargo", color: "#4b4b3d", accent: "#d9d4c3", bg: "#d6d3c6", sizes: SIZES.bottoms, desc: "Six pockets, tapered leg." },
  { id: 4, name: "Varsity Bomber", category: "Streetwear", price: 119, type: "bomber", color: "#7b1e2c", accent: "#efe6d2", bg: "#e5d3d1", sizes: SIZES.tops, tag: "New", desc: "Ribbed trims, satin lining." },

  // ---- Casual
  { id: 5, name: "Essential White Tee", category: "Casual", price: 24, type: "tee", color: "#f7f5f0", accent: null, bg: "#d8dde0", sizes: SIZES.tops, desc: "Everyday organic cotton." },
  { id: 6, name: "Linen Resort Shirt", category: "Casual", price: 58, type: "shirt", color: "#d8ccb2", accent: null, bg: "#e6dfd0", sizes: SIZES.tops, desc: "Breathable, relaxed collar." },
  { id: 7, name: "Washed Denim Shirt", category: "Casual", price: 62, type: "shirt", color: "#58779a", accent: null, bg: "#d3dce6", sizes: SIZES.tops, desc: "Soft-wash chambray denim." },
  { id: 8, name: "Relaxed Chinos", category: "Casual", price: 64, type: "pants", color: "#b79d73", accent: null, bg: "#e8e0d0", sizes: SIZES.bottoms, tag: "Bestseller", desc: "Stretch twill, easy taper." },

  // ---- Suits & Tailoring
  { id: 9, name: "Charcoal Two-Piece Suit", category: "Suits & Tailoring", price: 420, type: "suit", color: "#2d2f36", accent: "#7b1e2c", bg: "#d9dbe0", sizes: SIZES.suit, tag: "Bestseller", desc: "Italian wool blend, half-canvas." },
  { id: 10, name: "Navy Slim Suit", category: "Suits & Tailoring", price: 449, type: "suit", color: "#1e2d4d", accent: "#c9a24f", bg: "#d4dae6", sizes: SIZES.suit, desc: "Slim cut, notch lapel." },
  { id: 11, name: "Ivory Linen Suit", category: "Suits & Tailoring", price: 389, type: "suit", color: "#e7e0d0", accent: "#4a5d44", bg: "#e4dccb", sizes: SIZES.suit, tag: "New", desc: "Summer-weight linen blend." },
  { id: 12, name: "Black Tuxedo", category: "Suits & Tailoring", price: 560, type: "tux", color: "#101011", accent: "#2b2b2e", bg: "#d6d6d8", sizes: SIZES.suit, desc: "Satin peak lapel, evening ready." },
  { id: 13, name: "Crisp Dress Shirt", category: "Suits & Tailoring", price: 55, type: "shirt", color: "#f6f4ee", accent: null, bg: "#dfe1e4", sizes: SIZES.tops, desc: "Non-iron poplin, spread collar." },
  { id: 14, name: "Silk Tie", category: "Suits & Tailoring", price: 39, type: "tie", color: "#7b1e2c", accent: null, bg: "#e6d8d6", sizes: SIZES.one, desc: "Hand-finished woven silk." },

  // ---- Outerwear
  { id: 15, name: "Wool Overcoat", category: "Outerwear", price: 240, type: "coat", color: "#5b4b3b", accent: null, bg: "#e0d6c8", sizes: SIZES.tops, tag: "Bestseller", desc: "Double-faced wool, knee length." },
  { id: 16, name: "Classic Trench", category: "Outerwear", price: 210, type: "coat", color: "#c4a97c", accent: "#a68758", bg: "#ece3d3", sizes: SIZES.tops, desc: "Water-resistant, belted." },
  { id: 17, name: "Quilted Puffer", category: "Outerwear", price: 160, type: "puffer", color: "#2f3a4a", accent: "#e8e2d4", bg: "#d5dae2", sizes: SIZES.tops, tag: "New", desc: "Lightweight down fill." },

  // ---- Dresses
  { id: 18, name: "Satin Slip Dress", category: "Dresses", price: 96, type: "dress", color: "#6e2c4f", accent: "#e8c9d8", bg: "#e6d5dd", sizes: SIZES.dress, desc: "Bias-cut with soft sheen." },
  { id: 19, name: "Summer Wrap Dress", category: "Dresses", price: 72, type: "dress", color: "#e0a96d", accent: "#fff3df", bg: "#f0e2cf", sizes: SIZES.dress, desc: "Light viscose, adjustable wrap." },
  { id: 20, name: "Little Black Dress", category: "Dresses", price: 110, type: "dress", color: "#121213", accent: "#9a9a9e", bg: "#dcdcde", sizes: SIZES.dress, tag: "Bestseller", desc: "The one you'll wear forever." },

  // ---- Footwear
  { id: 21, name: "Court Sneakers", category: "Footwear", price: 89, type: "sneaker", color: "#f4f2ec", accent: "#2d5a45", bg: "#dfe3e0", sizes: SIZES.shoes, desc: "Clean leather, cushioned sole." },
  { id: 22, name: "Chunky Street Runner", category: "Footwear", price: 115, type: "chunky", color: "#2e2e31", accent: "#ec5a22", bg: "#dcdcdc", sizes: SIZES.shoes, tag: "New", desc: "Thick sole, mesh and suede." },
  { id: 23, name: "Leather Oxford", category: "Footwear", price: 168, type: "oxford", color: "#5a3a26", accent: null, bg: "#e5d9cc", sizes: SIZES.shoes, desc: "Goodyear-welted, hand polished." },

  // ---- Accessories
  { id: 24, name: "Six-Panel Cap", category: "Accessories", price: 28, type: "cap", color: "#1f2a44", accent: "#e8e2d4", bg: "#d5dae4", sizes: SIZES.one, desc: "Washed cotton, brass buckle." },
  { id: 25, name: "Canvas Backpack", category: "Accessories", price: 68, type: "bag", color: "#7b8068", accent: "#2b2b28", bg: "#dcdfd2", sizes: SIZES.one, desc: "Roll-top, laptop sleeve." },
  { id: 26, name: "Leather Tote", category: "Accessories", price: 130, type: "tote", color: "#a8703c", accent: "#5a3a1c", bg: "#eddfcc", sizes: SIZES.one, tag: "New", desc: "Full-grain, suede lining." },
];
