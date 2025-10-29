import React from "react";

const Bar = ({ className = "" }) => (
  <div
    className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className}`}
  />
);

const CardSkeleton = () => (
  <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
    <div className="aspect-video w-full animate-pulse bg-gray-200 dark:bg-gray-700" />
    <div className="p-4 space-y-3">
      <Bar className="h-6 w-3/4" />
      <Bar className="h-4 w-full" />
      <Bar className="h-4 w-5/6" />
      <div className="flex gap-2 pt-2">
        <Bar className="h-6 w-20 rounded-full" />
        <Bar className="h-6 w-24 rounded-full" />
      </div>
    </div>
  </div>
);

const RecentWorksSkeleton = () => {
  return (
    <div className="md:grid lg:grid-cols-2 gap-5 max-w-[95%] md:max-w-[90%] lg:max-w-[85%] mx-auto bg-dark-200 dark:bg-dark-900 p-10 rounded-2xl">
      {Array.from({ length: 4 }).map((_, idx) => (
        <CardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default RecentWorksSkeleton;
