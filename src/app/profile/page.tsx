// src/app/profile/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/src/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/src/app/components/Navbar';
import Footer from '@/src/app/components/Footer';

interface Order {
  _id: string;
  products: {
    product: {
      name: string;
      // Add other product fields as needed
    };
    quantity: number;
    price: number;
  }[];
  total: number;
  orderedAt: string;
}

const ProfilePage: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders', {
        method: 'GET',
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
      } else if (res.status === 401) {
        // Token might be invalid or expired
        setError('Not authenticated. Please log in again.');
        setIsAuthenticated(false);
        router.push('/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('An error occurred while fetching orders.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Navbar />
        <p className="text-center mt-10">Loading...</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-1/4 bg-black p-6">
          <h2 className="text-xl font-semibold mb-4">My Profile</h2>
          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Personal Information</h3>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">My Purchases</h3>
            {/* Add links or content related to purchases */}
            <ul className="space-y-2">
              <li>
                {/* Replace with actual links when available */}
                <button className="hover:text-gray-400 focus:outline-none">
                  View Purchases
                </button>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">My Orders</h3>
            {/* Add links or content related to orders */}
            <ul className="space-y-2">
              <li>
                {/* Replace with actual links when available */}
                <button className="hover:text-gray-400 focus:outline-none">
                  View Orders
                </button>
              </li>
            </ul>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white text-black">
          <h1 className="text-3xl font-bold mb-6">My Orders</h1>

          {error && (
            <p className="text-red-500 mb-4">
              {error}
            </p>
          )}

          {!error && orders && orders.length === 0 && (
            <p>No orders made.</p>
          )}

          {!error && orders && orders.length > 0 && (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="border rounded-lg p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    Order {order._id}
                  </h2>
                  <p className="mb-1">
                    <span className="font-semibold">Total:</span> ₹{order.total.toLocaleString('en-IN')}
                  </p>
                  <p className="mb-4">
                    <span className="font-semibold">Ordered On:</span> {new Date(order.orderedAt).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => router.push(`/orders/${order._id}`)}
                    className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none"
                  >
                    View Order
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;