import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const headersList = headers();
    const token = headersList.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Тут буде ваша логіка отримання даних користувача
    // Наразі повертаємо тестові дані
    return NextResponse.json({
      _id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
      isPremium: false,
      accessibleMeditations: [],
      accessiblePractices: [],
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 