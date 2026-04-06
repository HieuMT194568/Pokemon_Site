// src/app/components/ui/PokemonDetailSkeleton.jsx
import React from 'react';

export default function Skeleton() {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 animate-pulse">
      {/* Nút Back */}
      <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-md mb-6"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cột ảnh và tên */}
        <div className="flex flex-col items-center">
          <div className="w-64 h-64 bg-gray-200 dark:bg-gray-700 rounded-full mb-6"></div>
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>

        {/* Cột thông tin (Tabs, Stats...) */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 mb-4">
            <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          </div>
          {/* Mô phỏng các dòng stats */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}