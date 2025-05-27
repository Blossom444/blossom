import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    console.log('Starting registration process...');
    const { name, email, password, role = 'user' } = await request.json();
    console.log('Received data:', { name, email, role });

    // Валідація
    if (!name || !email || !password) {
      console.log('Validation failed: missing required fields');
      return NextResponse.json(
        { error: 'Всі поля обов\'язкові' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log('Validation failed: password too short');
      return NextResponse.json(
        { error: 'Пароль повинен містити мінімум 6 символів' },
        { status: 400 }
      );
    }

    // Підключення до бази даних
    console.log('Connecting to database...');
    await connectToDatabase();
    console.log('Database connection successful');

    // Перевірка чи існує користувач
    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return NextResponse.json(
        { error: 'Користувач з таким email вже існує' },
        { status: 400 }
      );
    }

    // Хешування паролю
    console.log('Hashing password...');
    const hashedPassword = await hash(password, 12);

    // Створення нового користувача
    console.log('Creating new user...');
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isPremium: role === 'admin', // Адміністратори автоматично отримують Premium
      accessibleMeditations: [],
      accessiblePractices: [],
    });
    console.log('User created successfully');

    // Видаляємо пароль з відповіді
    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json(
      { message: 'Користувача успішно створено', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error details:', error);
    return NextResponse.json(
      { error: 'Помилка при реєстрації', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 