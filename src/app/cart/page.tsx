// src/app/cart/page.tsx
"use client";

import React from 'react';
import Navbar from '@/src/app/components/Navbar';
import Footer from '@/src/app/components/Footer';
import { useCart } from '@/src/app/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrashAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

const CartPage: React.FC = () => {
  const { cartItems, incrementItem, decrementItem, clearCart } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const deliveryCharge = 50; // Example delivery charge
  const grandTotal = subtotal + deliveryCharge;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
        {cartItems.length > 0 ? (
          <>
            {/* Delete All Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => {
                  console.log("Delete All button clicked"); // Debugging line
                  clearCart();
                }}
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                Delete All
              </button>
            </div>

            {/* Cart Items and Summary */}
            <div className="flex flex-col md:flex-row">
              {/* Cart Items */}
              <div className="md:w-2/3">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center border-b py-4"
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={100}
                      height={100}
                      className="object-cover rounded-lg"
                    />
                    <div className="ml-4 flex-1">
                      <h2 className="text-xl font-semibold">
                        {item.product.name}
                      </h2>
                      <p className="text-gray-600">
                        ₹{item.product.price.toLocaleString('en-IN')}
                      </p>
                      <div className="flex items-center mt-2">
                        {/* Decrement Button */}
                        <button
                          onClick={() => decrementItem(item.product.id)}
                          className="px-2 py-1 bg-gray-300 rounded-l"
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        {/* Quantity Display */}
                        <span className="px-4 py-1 border-t border-b">
                          {item.quantity}
                        </span>
                        {/* Increment Button */}
                        <button
                          onClick={() => incrementItem(item.product.id)}
                          className="px-2 py-1 bg-gray-300 rounded-r"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                        {/* Remove Item Button */}
                        <button
                          onClick={() => decrementItem(item.product.id)} // Adjust as needed
                          className="ml-4 text-red-500"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="md:w-1/3 md:ml-6 mt-6 md:mt-0">
                <div className="p-4 border rounded-md bg-gray-100">
                  <h2 className="text-2xl font-semibold mb-4">
                    Order Summary
                  </h2>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Delivery Charge</span>
                    <span>₹{deliveryCharge.toLocaleString('en-IN')}</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between font-bold">
                    <span>Grand Total</span>
                    <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <Link href="/checkout">
                    <button className="mt-6 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
                      Login to Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Empty Cart View */
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-center text-gray-500">Your cart is empty.</p>
            <Link href="/shop">
              <button className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;