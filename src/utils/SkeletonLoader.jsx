import React from "react";

const SkeletonLoader = () => (
  <div className="relative flex items-center justify-center h-64 w-full">
    <div className="absolute flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div className="animate-pulse flex space-x-4">
      <div className="rounded bg-gray-200 h-64 w-full"></div>
    </div>
  </div>
);

export default SkeletonLoader;
