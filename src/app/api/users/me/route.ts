import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Повертаємо дані користувача з сесії
    return NextResponse.json({
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role || 'user',
      isPremium: session.user.isPremium || false,
    });
  } catch (error) {
    console.error('Error in /api/users/me:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 