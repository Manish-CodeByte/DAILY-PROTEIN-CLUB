import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-gray-800/60 rounded-xl ${className}`}
    />
  );
};

export const FoodCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#121824] rounded-2xl overflow-hidden border border-gray-800 p-4 space-y-4">
      <Skeleton className="w-full aspect-[4/3] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="w-3/4 h-4 rounded-lg" />
        <Skeleton className="w-1/2 h-3 rounded-lg" />
      </div>
      <div className="grid grid-cols-2 gap-2 pt-2">
        <Skeleton className="w-full h-8 rounded-xl" />
        <Skeleton className="w-full h-8 rounded-xl" />
      </div>
    </div>
  );
};
