// src/app/orders/[id]/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Navbar from '@/src/app/components/Navbar';
import Footer from '@/src/app/components/Footer';
import { useAuth } from '@/src/app/context/AuthContext';

interface Product {
  name: string;
  price: number;
  // Add other product fields as needed
}

interface Order {
  _id: string;
  products: {
    product: Product;
    quantity: number;
    price: number;
  }[];
  total: number;
  orderedAt: string;
}

const OrderDetailsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      fetchOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setOrder(data.order);
      } else if (res.status === 401) {
        setError('Not authenticated. Please log in again.');
        router.push('/login');
      } else if (res.status === 404) {
        setError('Order not found.');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to fetch order details.');
      }
    } catch (err) {
      console.error('Error fetching order:', err);
      setError('An error occurred while fetching order details.');
    } finally {
      setLoading(false);
    }
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
        {/* Main Content */}
        <main className="flex-1 p-6 bg-white text-black">
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {!error && order && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Order {order._id}</h1>
              <p className="mb-2">
                <span className="font-semibold">Total:</span> ₹{order.total.toLocaleString('en-IN')}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Ordered On:</span> {new Date(order.orderedAt).toLocaleDateString()}
              </p>

              <h2 className="text-2xl font-semibold mb-4">Products</h2>
              <ul className="space-y-4">
                {order.products.map((item, index) => (
                  <li key={index} className="border rounded-lg p-4">
                    <h3 className="text-xl font-medium">{item.product.name}</h3>
                    <p>Price: ₹{item.price.toLocaleString('en-IN')}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Subtotal: ₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default OrderDetailsPage;