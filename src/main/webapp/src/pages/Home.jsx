import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHome } from "../slices/homeSlice";
import Hero from "../components/home/Hero";
import DealStrip from "../components/home/DealStrip";
import CategoryGrid from "../components/home/CategoryGrid";
import TrendingRow from "../components/home/TrendingRow";
import BrandRow from "../components/home/BrandRow";
import ProductCardSkeleton from "../components/skeletons/ProductCardSkeleton";

const Home = () => {
  const dispatch = useDispatch();

  const { trending, under499, brands, status } = useSelector(
    (state) => state.home
  );

  useEffect(() => {
    dispatch(fetchHome());
  }, [dispatch]);

  return (
    <div className="bg-light">

      {/* 🔥 HERO */}
      <Hero />

      {/* 🔥 DEAL STRIP */}
      {status === "loading" ? (
        <div className="container py-6">
          <ProductCardSkeleton />
        </div>
      ) : (
        <DealStrip deals={under499} />
      )}

      {/* 🔥 CATEGORY GRID */}
      <CategoryGrid />

      {/* 🔥 TRENDING ROW */}
      {status === "loading" ? (
        <div className="container py-6">
          <ProductCardSkeleton />
        </div>
      ) : (
        <TrendingRow products={trending} />
      )}

      {/* 🔥 BRANDS */}
      <BrandRow brands={brands} />

      <div className="h-10" />
    </div>
  );
};

export default Home;