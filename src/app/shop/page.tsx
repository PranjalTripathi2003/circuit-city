// src/app/shop/page.tsx
"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/src/app/components/Navbar";
import SideBarFilters from "@/src/app/components/SideBarFilters";
import ProductGrid from "@/src/app/components/ProductGrid";

const Page = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("latest");
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    if (category) {
      setFilters([category]);
    } else {
      setFilters([]);
    }
  }, [category]);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((prevFilters) =>
      prevFilters.includes(value)
        ? prevFilters.filter((filter) => filter !== value)
        : [...prevFilters, value]
    );
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="w-1/4">
            <SideBarFilters
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              currentFilters={filters}
              currentSort={sortOption}
            />
          </div>
          <div className="w-3/4">
            <ProductGrid filters={filters} sortOption={sortOption} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;