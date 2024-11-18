// src/app/products/[id]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/src/app/components/Navbar';
import Footer from '@/src/app/components/Footer';
import { useCart } from '@/src/app/context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Product } from '@/src/data/products';
import { getProductById } from '@/src/utils/api';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(params.id);
        if (data) {
          setProduct(data);
        } else {
          console.error('Product not found.');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Product Details */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Product Image */}
          <div className="md:w-1/2 flex justify-center bg-gray-200 p-4 rounded-lg">
            <div className="relative h-[400px] w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 md:ml-8 mt-6 md:mt-0">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-4">
              <span className="font-semibold">Category:</span> {product.category}{' '}
              |{' '}
              <span className={product.inStock ? 'text-green-500' : 'text-red-500'}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </p>
            <p className="text-2xl font-semibold text-gray-800 mb-6">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <button
              onClick={() => {
                if (product.inStock) {
                  setAddedToCart(true);
                  addToCart(product);
                }
              }}
              className={`w-full py-2 rounded-lg transition-colors ${
                product.inStock
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              disabled={!product.inStock}
            >
              {addedToCart ? (
                <>
                  Added to Cart{' '}
                  <FontAwesomeIcon icon={faCheckCircle} className="inline h-5 w-5 ml-2" />
                </>
              ) : (
                'Add to Cart'
              )}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;