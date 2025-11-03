"use client";
import React from "react";

const Bar = ({ className = "" }) => (
  <div
    className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className}`}
  />
);

const WorkCardSkeleton = () => (
  <div className="flex gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 animate-pulse">
    {/* Thumbnail */}
    <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg bg-gray-300 dark:bg-gray-700 flex-shrink-0" />

    {/* Text part */}
    <div className="flex-1 space-y-3">
      <Bar className="h-5 w-3/4" />
      <Bar className="h-4 w-full" />
      <Bar className="h-4 w-5/6" />
      <Bar className="h-3 w-1/2 mt-3" />
    </div>
  </div>
);

const RecentWorksSkeleton = () => {
  return (
    <div className="md:grid lg:grid-cols-2 gap-5 max-w-[95%] md:max-w-[90%] lg:max-w-[85%] mx-auto bg-dark-200 dark:bg-dark-900 p-10 rounded-2xl">
      {Array.from({ length: 6 }).map((_, idx) => (
        <WorkCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default RecentWorksSkeleton;
