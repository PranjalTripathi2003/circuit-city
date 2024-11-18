// src/app/components/Categories.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const Categories = () => {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    // Convert category to lowercase to match data (e.g., 'Phones' -> 'phones')
    router.push(`/shop?category=${category.toLowerCase()}`);
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mt-20">Shop By Categories</h1>
      <div className="grid gap-2 grid-cols-2 grid-rows-1 mt-8 max-w-screen-lg mx-auto">
        <div
          className="relative max-w-xs mx-auto group cursor-pointer"
          onClick={() => handleCategoryClick('Phones')}
        >
          <img
            className="w-full h-full object-cover rounded-lg"
            src="/images/phones-category.jpg"
            alt="Phones"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-white text-2xl font-semibold">Phones</h2>
          </div>
        </div>
        <div
          className="relative max-w-xs mx-auto group cursor-pointer"
          onClick={() => handleCategoryClick('Laptops')}
        >
          <img
            className="w-full h-full object-cover rounded-lg"
            src="/images/laptops-category.jpg"
            alt="Laptops"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-white text-2xl font-semibold">Laptops</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;