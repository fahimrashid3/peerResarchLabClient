import React from "react";

const SkeletonBar = ({ className = "" }) => (
  <div
    className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className}`}
  />
);

const CardSkeleton = () => (
  <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
    <div className="aspect-video w-full animate-pulse bg-gray-200 dark:bg-gray-700" />
    <div className="p-4 space-y-3">
      <SkeletonBar className="h-6 w-3/4" />
      <SkeletonBar className="h-4 w-full" />
      <SkeletonBar className="h-4 w-5/6" />
      <div className="flex gap-2 pt-2">
        <SkeletonBar className="h-6 w-20 rounded-full" />
        <SkeletonBar className="h-6 w-24 rounded-full" />
      </div>
    </div>
  </div>
);

const HeaderSkeleton = () => (
  <div className="bg-primary-900">
    <div className="text-white px-4 py-16 flex flex-col lg:flex-row items-center justify-between gap-10 max-w-7xl mx-auto">
      <div className="max-w-xl w-full space-y-6">
        <SkeletonBar className="h-10 w-3/4 bg-primary-800" />
        <SkeletonBar className="h-6 w-2/3 bg-primary-800" />
        <div className="flex gap-4 pt-2">
          <SkeletonBar className="h-10 w-10 rounded-full bg-primary-800" />
          <SkeletonBar className="h-10 w-10 rounded-full bg-primary-800" />
          <SkeletonBar className="h-10 w-10 rounded-full bg-primary-800" />
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <div className="rounded-xl overflow-hidden shadow-lg border border-primary-800">
          <div className="aspect-video w-full animate-pulse bg-primary-800" />
          <div className="p-4 space-y-3">
            <SkeletonBar className="h-6 w-3/4 bg-primary-800" />
            <SkeletonBar className="h-4 w-full bg-primary-800" />
            <SkeletonBar className="h-4 w-5/6 bg-primary-800" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PunlicationSkeliton = () => {
  return (
    <div className="pt-24">
      <HeaderSkeleton />
      <div className="max-w-7xl mx-auto bg-dark-200 rounded-lg dark:bg-dark-900">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-5 pt-5 p-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PunlicationSkeliton;
