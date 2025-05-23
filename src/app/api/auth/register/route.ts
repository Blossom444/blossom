import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    await connectToDatabase();

    // Перевірка чи існує користувач з таким email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse('User already exists', { status: 400 });
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення нового користувача
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user',
      isPremium: false,
      accessibleMeditations: [],
      accessiblePractices: []
    });

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
    console.error('Error registering user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 