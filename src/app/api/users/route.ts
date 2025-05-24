import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { MongoClient } from 'mongodb';

export const dynamic = 'force-dynamic';

interface User {
  _id: any;
  name?: string;
  email: string;
  role?: string;
  isPremium?: boolean;
  accessibleMeditations?: string[];
  accessiblePractices?: string[];
  createdAt?: string;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
    const db = client.db();
    
    const users = await db.collection('users').find({}).toArray();
    await client.close();

    // Конвертуємо ObjectId в string та додаємо необхідні поля
    const formattedUsers = users.map((user: any) => ({
      _id: user._id.toString(),
      name: user.name || 'Unknown',
      email: user.email,
      role: user.role || 'user',
      isPremium: user.isPremium || false,
      accessibleMeditations: user.accessibleMeditations || [],
      accessiblePractices: user.accessiblePractices || [],
      createdAt: user.createdAt || new Date().toISOString()
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 