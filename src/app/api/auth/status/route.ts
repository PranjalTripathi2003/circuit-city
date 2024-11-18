// src/app/api/auth/status/route.ts

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/src/utils/dbConnect';
import User from '@/src/models/User';

export async function GET(request: Request) {
  try {
    await dbConnect();

    const cookie = request.headers.get('cookie');
    if (!cookie) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    const tokenMatch = cookie.match(/token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    let payload: any;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    const user = await User.findById(payload.userId).select('name email');
    if (!user) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    return NextResponse.json({ isAuthenticated: true, user }, { status: 200 });
  } catch (error) {
    console.error('Auth Status Error:', error);
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }
}