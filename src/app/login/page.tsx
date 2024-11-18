// src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/src/app/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/src/app/context/AuthContext';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    try {
      await login(formData.email, formData.password);
      // Redirect to homepage after successful login
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  if (isAuthenticated) {
    // If already authenticated, redirect to homepage
    router.push('/');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex flex-grow">
        {/* Left Section */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center">
          <Image
            src="/images/login-image.jpg"
            alt="Tech Products"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white text-black">
          <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6">Welcome <span role="img" aria-label="wave">👋</span></h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Login
              </button>
            </form>

            <div className="mt-4 flex justify-between">
              <Link href="/forgot-password" className="text-gray-600 hover:underline">
                Forgot Password?
              </Link>
              <Link href="/register" className="text-gray-600 hover:underline">
                Register New User
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

 export default LoginPage;