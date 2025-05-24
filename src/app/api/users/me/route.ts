import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';

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

    return NextResponse.json({
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role,
      isPremium: session.user.isPremium,
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
} 