// src/app/components/ProductGrid.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts, Product } from '@/src/utils/api';

interface ProductGridProps {
  filters: string[];
  sortOption: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ filters, sortOption }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (products.length === 0) {
    return <p className="text-center">No products found.</p>;
  }

  const filteredProducts = products.filter(product =>
    filters.length === 0 ? true : filters.includes(product.category.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'latest') {
      return b.id - a.id; // Assuming higher id is latest
    }
    if (sortOption === 'price-asc') {
      return a.price - b.price;
    }
    if (sortOption === 'price-desc') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {sortedProducts.map(product => (
        <Link key={product.id} href={`/products/${product.id}`} className="border p-4 rounded hover:shadow-lg transition-shadow duration-300">
          <div className="relative w-full h-48">
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded"
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
            />
          </div>
          <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
          <p className="text-gray-600">₹{product.price.toLocaleString('en-IN')}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">{product.category}</span>
            <span className={`text-sm ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;