// src/app/components/Navbar.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center p-4 bg-white text-black shadow-md">
      <Link href="/">
        <div className="bg-black text-white p-2 rounded text-lg font-bold cursor-pointer">
          CIRCUIT CITY.
        </div>
      </Link>

      <div className="space-x-4 flex items-center">
        <Link href="/">
          <button className="hover:text-gray-700">Home</button>
        </Link>
        <Link href="/shop">
          <button className="hover:text-gray-700">Shop</button>
        </Link>
        <Link href="/cart">
          <button className="hover:text-gray-700 relative">
            <FontAwesomeIcon icon={faShoppingCart} className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -bottom-1 -right-1 flex items-center justify-center h-4 w-4 text-[10px] font-bold text-white bg-black rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </Link>
        {isAuthenticated ? (
          <Link href="/profile">
            <button className="hover:text-gray-700">
              <FontAwesomeIcon icon={faUserCircle} className="h-5 w-5" />
            </button>
          </Link>
        ) : (
          <Link href="/login">
            <button className="bg-black text-white p-2 rounded transform transition-transform duration-200 hover:scale-110">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;