import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
      </div>

      {/* Title Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
      </div>

      {/* Price Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
