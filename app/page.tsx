"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Star, ShoppingBag, Heart, Truck, RotateCcw, Shield, Sparkles, ChevronRight, Check, Quote } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline Data ────────────────────────────────────────────────────────────

const featuredProducts = [
  {
    id: 1,
    name: "Arc Ceramic Vase",
    category: "Home Decor",
    price: 89,
    originalPrice: 120,
    rating: 4.9,
    reviews: 214,
    badge: "Best Seller",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/assets/943370f0-d57c-45df-bd8e-b2a98e47788e/9d6ee5ac86014d2cbd56e62688567475.png",
    colors: ["#e8e0d5", "#c4b9a8", "#8a7968"],
  },
  {
    id: 2,
    name: "Linen Throw Blanket",
    category: "Textiles",
    price: 145,
    originalPrice: null,
    rating: 4.8,
    reviews: 189,
    badge: "New",
    image: "https://m.media-amazon.com/images/I/71EUmwZhM6L.jpg",
    colors: ["#d4c9b8", "#b8a898", "#f5f0e8"],
  },
  {
    id: 3,
    name: "Walnut Side Table",
    category: "Furniture",
    price: 320,
    originalPrice: 420,
    rating: 4.7,
    reviews: 97,
    badge: "Sale",
    image: "https://assets.rjimgs.com/rjimgs/rk/images/dp/wcm/202608/0002/bilquist-side-table-2-o.jpg",
    colors: ["#8b6f47", "#6b5235", "#a88b6a"],
  },
  {
    id: 4,
    name: "Matte Black Candle Set",
    category: "Lifestyle",
    price: 58,
    originalPrice: null,
    rating: 5.0,
    reviews: 312,
    badge: "Top Rated",
    image: "https://i5.walmartimages.com/asr/078704f0-9e43-40d6-b92a-655575a886e6.66cc38c0cb9d38e6b6d2d272a5811930.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    colors: ["#1a1a1a", "#3d3d3d", "#c8a96e"],
  },
  {
    id: 5,
    name: "Woven Rattan Basket",
    category: "Storage",
    price: 74,
    originalPrice: 95,
    rating: 4.6,
    reviews: 143,
    badge: null,
    image: "https://i.etsystatic.com/24758910/r/il/88650d/3200595128/il_fullxfull.3200595128_stti.jpg",
    colors: ["#c9a96e", "#b8935a", "#e8d5b0"],
  },
  {
    id: 6,
    name: "Marble Cheese Board",
    category: "Kitchen",
    price: 112,
    originalPrice: null,
    rating: 4.9,
    reviews: 276,
    badge: "New",
    image: "https://cdn.shoplightspeed.com/shops/603332/files/53044483/image.jpg",
    colors: ["#e8e4e0", "#c8c0b8", "#8a8078"],
  },
];

const collections = [
  {
    id: 1,
    name: "The Calm Home",
    description: "Neutral tones and organic textures for a serene living space.",
    count: 42,
    image: "http://static1.squarespace.com/static/6465e9f0c32fb30720d59d36/t/6605338475d4553e90f33c9b/1720163165345/neutral-home-decor-living-room.jpg?format=1500w",
    accent: "bg-amber-50",
  },
  {
    id: 2,
    name: "Modern Kitchen",
    description: "Functional beauty for the heart of your home.",
    count: 31,
    image: "https://st.hzcdn.com/simgs/d531529d08f92b26_14-9975/_.jpg",
    accent: "bg-slate-50",
  },
  {
    id: 3,
    name: "Outdoor Living",
    description: "Bring the warmth of inside to your outdoor spaces.",
    count: 28,
    image: "https://novalandscapedesign.com/wp-content/uploads/2023/02/patio-2.jpg",
    accent: "bg-stone-50",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Shipping Over $75",
    description:
      "Complimentary delivery on all orders above $75. Express options available at checkout.",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description:
      "Not in love? Return any item within 30 days for a full refund, no questions asked.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description:
      "Every piece is hand-selected and quality-checked before it reaches your door.",
  },
  {
    icon: Sparkles,
    title: "Curated with Care",
    description:
      "Our design team sources only the finest materials from artisans around the world.",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sophia Reeves",
    location: "San Francisco, CA",
    rating: 5,
    text: "Lumière completely transformed my living room. The Arc Vase is even more beautiful in person. The packaging was exquisite and delivery was faster than expected.",
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQGiWy7zVuQKrg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1702711854952?e=2147483647&v=beta&t=7PG_IDVERBJhpb-8o70xpemsDq9Rrn6r5F-lc9jYq_M",
    product: "Arc Ceramic Vase",
  },
  {
    id: 2,
    name: "Marcus Chen",
    location: "New York, NY",
    rating: 5,
    text: "I've ordered from dozens of home decor shops and nothing compares to the quality here. The Walnut Side Table is a masterpiece. Worth every penny.",
    avatar: "https://podcastle.org/wp-content/uploads/2024/09/photo_2024-06-24_16-15-54-660x989.jpg",
    product: "Walnut Side Table",
  },
  {
    id: 3,
    name: "Isla Hartmann",
    location: "Austin, TX",
    rating: 5,
    text: "The linen throw is impossibly soft. I bought one and immediately ordered two more as gifts. Lumière has become my go-to for anything home-related.",
    avatar: "https://picsum.photos/seed/8b07f647d5b0/800/600",
    product: "Linen Throw Blanket",
  },
];

const stats = [
  { value: "12K+", label: "Happy Customers" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "340+", label: "Curated Products" },
  { value: "40+", label: "Global Artisans" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-500 font-medium">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

const badgeColors: Record<string, string> = {
  "Best Seller": "bg-indigo-100 text-indigo-700",
  New: "bg-emerald-100 text-emerald-700",
  Sale: "bg-rose-100 text-rose-700",
  "Top Rated": "bg-amber-100 text-amber-700",
};

function ProductCard({
  product,
}: {
  product: (typeof featuredProducts)[number];
}) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.1)] border border-black/5 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-slate-50 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
              badgeColors[product.badge] ?? "bg-slate-100 text-slate-700"
            }`}
          >
            {product.badge}
          </span>
        )}
        {/* Wishlist */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setWished((w) => !w)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-black/5 transition-all duration-200"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              wished ? "fill-rose-500 text-rose-500" : "text-slate-400"
            }`}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2" style={{ color: "#134bcd", fontSize: "17px" }}>
        <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="font-semibold text-slate-900 text-base leading-snug">
          {product.name}
        </h3>
        <StarRating rating={product.rating} count={product.reviews} />

        {/* Colors */}
        <div className="flex items-center gap-1.5 mt-0.5">
          {product.colors.map((color, i) => (
            <span
              key={i}
              className="w-4 h-4 rounded-full border border-black/10 shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-slate-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center bg-[#faf9f7] overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(99,102,241,0.07),transparent)]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-50/60 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-100">
                <Sparkles className="w-3.5 h-3.5" />
                New Summer Collection 2025
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight text-balance"
            >
              Living Spaces
              <br />
              <span className="text-indigo-600">Worth Loving</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-600 leading-relaxed max-w-md text-pretty"
            >
              {APP_NAME} brings together the world's finest artisan homeware.
              Each piece is chosen for its beauty, craft, and the quiet joy it
              brings to everyday life.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-3"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-[0_4px_14px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#collections"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#collections")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-white text-slate-700 font-semibold px-6 py-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Browse Collections
              </motion.a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {["Free Shipping $75+", "30-Day Returns", "Artisan Sourced"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="flex items-center gap-1.5 text-xs text-slate-500 font-medium"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    {badge}
                  </span>
                )
              )}
            </motion.div>
          </motion.div>

          {/* Right: Hero image grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative grid grid-cols-2 gap-3 lg:gap-4"
          >
            <motion.div
              variants={slideInRight}
              className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(0,0,0,0.15)] border border-black/5"
            >
              <img
                src="https://www.zevyjoy.com/wp-content/uploads/2019/09/Neutral-Touches-of-Fall-in-the-Family-Room-11.jpg"
                alt="Curated home decor arrangement"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="rounded-2xl overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(0,0,0,0.15)] border border-black/5 aspect-square"
            >
              <img
                src="http://www.moderndane.com/cdn/shop/articles/Untitled_design_67.jpg?v=1775871584"
                alt="Soft linen textiles in a bedroom"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="rounded-2xl overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(0,0,0,0.15)] border border-black/5 aspect-square"
            >
              <img
                src="https://kumohomes.com/cdn/shop/articles/SEOon_Stunning_Walnut_Furniture_Designs_by_Kumo_Home_blog1_b03888ed-78c6-4b97-9b29-86d6c04ceccc.webp?v=1748936396&width=1500"
                alt="Walnut furniture in a modern living room"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-black/5 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                <Star className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">4.9 / 5.0</p>
                <p className="text-xs text-slate-500">12,000+ reviews</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-indigo-600 py-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-indigo-500"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="flex flex-col items-center text-center px-4"
            >
              <span className="text-3xl font-bold text-white font-playfair">
                {stat.value}
              </span>
              <span className="text-indigo-200 text-sm mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Featured Products ── */}
      <section id="products" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <motion.p
                variants={fadeInUp}
                className="text-indigo-600 text-sm font-semibold uppercase tracking-widest mb-2"
              >
                Handpicked for You
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight text-balance"
              >
                Featured Products
              </motion.h2>
            </div>
            <motion.a
              variants={fadeIn}
              href="#products"
              className="inline-flex items-center gap-1.5 text-indigo-600 font-semibold text-sm hover:gap-2.5 transition-all duration-200 group"
            >
              View all products
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </motion.a>
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Collections ── */}
      <section id="collections" className="py-24 md:py-32 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeInUp}
              className="text-indigo-600 text-sm font-semibold uppercase tracking-widest mb-2"
            >
              Shop by Theme
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
            >
              Our Collections
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-slate-500 text-lg max-w-xl mx-auto text-pretty"
            >
              Thoughtfully assembled around the spaces and moments that matter
              most.
            </motion.p>
          </motion.div>

          {/* Asymmetric grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {/* Large card */}
            <motion.div
              variants={slideInLeft}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.05),0_12px_32px_-8px_rgba(0,0,0,0.12)] border border-black/5 min-h-[340px]"
            >
              <img
                src={collections[0]?.image ?? ""}
                alt={collections[0]?.name ?? ""}
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-7">
                <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest">
                  {collections[0]?.count} pieces
                </span>
                <h3 className="font-playfair text-3xl font-bold text-white mt-1 mb-2">
                  {collections[0]?.name}
                </h3>
                <p className="text-slate-300 text-sm max-w-xs">
                  {collections[0]?.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="mt-4 inline-flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-amber-50 transition-colors duration-200"
                >
                  Explore
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Stacked small cards */}
            <div className="flex flex-col gap-5">
              {collections.slice(1).map((col, i) => (
                <motion.div
                  key={col.id}
                  variants={i === 0 ? slideInRight : fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.05),0_12px_32px_-8px_rgba(0,0,0,0.12)] border border-black/5 flex-1 min-h-[155px]"
                >
                  <img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest">
                      {col.count} pieces
                    </span>
                    <h3 className="font-playfair text-xl font-bold text-white mt-0.5">
                      {col.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-white/80 text-xs mt-1 group-hover:text-white transition-colors">
                      Explore
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Value Props ── */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {valueProps.map((vp) => {
              const Icon = vp.icon;
              return (
                <motion.div
                  key={vp.title}
                  variants={fadeInUp}
                  className="flex flex-col items-start gap-3"
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-base">
                    {vp.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {vp.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── About / Brand Story ── */}
      <section id="about" className="py-24 md:py-32 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_48px_-12px_rgba(0,0,0,0.15)] border border-black/5 aspect-[4/5]">
                <img
                  src="https://www.apieceofrainbow.com/wp-content/uploads/2017/01/diy-craft-room-ideas-storage-organization-garage-workshop-furniture-woodworking-tool-organizing-hacks-apieceofrainbow-2.jpg"
                  alt="Artisan crafting homeware in a workshop"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Accent card */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="absolute -bottom-5 -right-5 bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.1)] border border-black/5 max-w-[200px]"
              >
                <p className="font-playfair text-2xl font-bold text-slate-900">
                  Since 2018
                </p>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Sourcing beauty from artisans across 18 countries.
                </p>
              </motion.div>
            </motion.div>

            {/* Text side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6"
            >
              <motion.p
                variants={fadeInUp}
                className="text-indigo-600 text-sm font-semibold uppercase tracking-widest"
              >
                Our Story
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight text-balance"
              >
                Craft, Beauty, and Intention
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-slate-600 text-lg leading-relaxed text-pretty"
              >
                {APP_NAME} was born from a simple belief: the objects we
                surround ourselves with shape how we feel. We travel the world
                to find makers who share our obsession with quality and
                thoughtful design.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-slate-500 leading-relaxed text-pretty"
              >
                From ceramic studios in Portugal to textile workshops in Kyoto,
                every piece in our collection carries a story. We work directly
                with artisans, ensuring fair wages and sustainable practices at
                every step.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col gap-3">
                {[
                  "Direct partnerships with 40+ global artisans",
                  "Sustainable packaging on every order",
                  "1% of revenue donated to craft preservation",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-indigo-600" />
                    </div>
                    <span className="text-slate-600 text-sm">{point}</span>
                  </div>
                ))}
              </motion.div>
              <motion.a
                variants={fadeInUp}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="self-start inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 md:py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeInUp}
              className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2"
            >
              Customer Love
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-white tracking-tight"
            >
              What Our Customers Say
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 flex flex-col gap-5"
              >
                <Quote className="w-8 h-8 text-indigo-400 opacity-60" />
                <p className="text-slate-300 leading-relaxed text-sm flex-1">
                  {t.text}
                </p>
                <div className="flex items-center gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.location}</p>
                  </div>
                  <span className="ml-auto text-xs text-indigo-400 font-medium bg-indigo-500/10 px-2 py-1 rounded-full">
                    {t.product}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter / Contact CTA ── */}
      <section id="contact" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl overflow-hidden px-8 py-16 md:px-16 md:py-20">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_50%,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="flex flex-col gap-5"
              >
                <motion.p
                  variants={fadeInUp}
                  className="text-amber-300 text-sm font-semibold uppercase tracking-widest"
                >
                  Stay in the Loop
                </motion.p>
                <motion.h2
                  variants={fadeInUp}
                  className="font-playfair text-4xl md:text-5xl font-bold text-white tracking-tight text-balance"
                >
                  New Arrivals, First
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-indigo-200 text-lg leading-relaxed text-pretty"
                >
                  Join 12,000+ design lovers who get early access to new
                  collections, exclusive offers, and stories from our artisans.
                </motion.p>
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-wrap gap-4"
                >
                  {[
                    "Early access to new drops",
                    "Members-only discounts",
                    "Artisan stories",
                  ].map((perk) => (
                    <span
                      key={perk}
                      className="flex items-center gap-1.5 text-indigo-200 text-sm"
                    >
                      <Check className="w-3.5 h-3.5 text-amber-300" />
                      {perk}
                    </span>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-400/20 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-7 h-7 text-emerald-300" />
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-white mb-2">
                      You're in.
                    </h3>
                    <p className="text-indigo-200 text-sm">
                      Welcome to the Lumière community. Watch your inbox for
                      something beautiful.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubscribe}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="email"
                        className="text-white text-sm font-medium"
                      >
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full bg-white/15 border border-white/25 text-white placeholder:text-indigo-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-200"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-white text-indigo-700 font-semibold py-3 rounded-xl hover:bg-amber-50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      Subscribe for Free
                    </motion.button>
                    <p className="text-indigo-300 text-xs text-center">
                      No spam, ever. Unsubscribe anytime.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}