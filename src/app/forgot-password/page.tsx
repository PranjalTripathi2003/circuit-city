// src/app/forgot-password/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/src/app/components/Navbar';

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex flex-grow">
        {/* Left Section */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center">
          <Image
            src="/images/forgot-password-image.jpg" // Ensure this image exists in your public/images directory
            alt="Tech Products"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white text-black">
          <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6">Forgot Password</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Reset Password
              </button>
            </form>
            <div className="mt-4 text-center">
              <Link href="/login" className="text-gray-500 hover:underline">
                Remembered your password? Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;