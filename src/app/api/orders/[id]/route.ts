// src/app/api/orders/[id]/route.ts

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/src/utils/dbConnect';
import Order from '@/src/models/Order';
import User from '@/src/models/User';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await dbConnect();

    const cookie = request.headers.get('cookie');
    if (!cookie) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const tokenMatch = cookie.match(/token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    let payload: any;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const order = await Order.findOne({ _id: id, user: user._id }).populate('products.product');

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error('Fetch Order Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}