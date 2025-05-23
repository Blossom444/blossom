import { NextResponse } from 'next/server';
import { signIn } from 'next-auth/react';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (result?.error) {
      return new NextResponse(result.error, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging in:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 