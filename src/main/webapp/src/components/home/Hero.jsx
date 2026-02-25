import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="container py-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1e1b4b] via-[#111827] to-[#312e81] text-white shadow-2xl">

        {/* Animated Background Glow */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_30%,#ff3f6c,transparent_45%),radial-gradient(circle_at_80%_20%,#ffffff,transparent_35%)] animate-pulse" />

        <div className="relative p-8 md:p-14 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>
            <p className="inline-flex items-center gap-2 text-sm bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
              🔥 New Season Drop
            </p>

            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Premium Fashion & Gadgets{" "}
              <span className="text-pink-500">Daily Deals</span>
            </h1>

            <p className="mt-5 text-white/80 max-w-xl text-lg">
              Upgrade your store UI like Myntra. Fast checkout, trending picks, and beautifully crafted product cards.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/products")}
                className="px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 
                           text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
              >
                Shop Now
              </button>

              <button
                onClick={() => navigate("/products")}
                className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 
                           text-white font-semibold hover:bg-white/20 
                           transition-all duration-300"
              >
                View Deals
              </button>
            </div>

            {/* Stats */}
            <div className="mt-10 flex gap-10 text-sm text-white/75">
              <div>
                <p className="text-2xl font-bold text-white">10K+</p>
                <p>Products</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">24h</p>
                <p>Fast Delivery</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">100%</p>
                <p>Secure Payments</p>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL MOCK */}
          <div className="relative">
            <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-xl">

              <div className="grid grid-cols-2 gap-4">
                <div className="h-28 rounded-2xl bg-gradient-to-br from-pink-500/20 to-white/10" />
                <div className="h-28 rounded-2xl bg-gradient-to-br from-purple-500/20 to-white/10" />
                <div className="h-28 rounded-2xl bg-gradient-to-br from-blue-500/20 to-white/10" />
                <div className="h-28 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-white/10" />
              </div>

              <p className="mt-6 text-white/70 text-sm text-center">
                Clean, premium sections (Deals • Categories • Trending • Brands)
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;