import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { name, isPremium, accessibleMeditations, accessiblePractices } = await request.json();

    await connectToDatabase();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Оновлення полів, якщо вони надані
    if (name) user.name = name;
    if (typeof isPremium === 'boolean') user.isPremium = isPremium;
    if (Array.isArray(accessibleMeditations)) user.accessibleMeditations = accessibleMeditations;
    if (Array.isArray(accessiblePractices)) user.accessiblePractices = accessiblePractices;

    await user.save();

    // Видалення пароля з відповіді
    const userWithoutPassword = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isPremium: user.isPremium,
      accessibleMeditations: user.accessibleMeditations,
      accessiblePractices: user.accessiblePractices
    };

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error updating user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 