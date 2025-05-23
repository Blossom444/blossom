import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
        isPremium: session.user.isPremium
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user data:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
} 