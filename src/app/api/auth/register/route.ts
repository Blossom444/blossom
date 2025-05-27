import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Валідація
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Всі поля обов\'язкові' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Пароль повинен містити мінімум 6 символів' },
        { status: 400 }
      );
    }

    // Підключення до бази даних
    await connectToDatabase();

    // Перевірка чи існує користувач
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Користувач з таким email вже існує' },
        { status: 400 }
      );
    }

    // Хешування паролю
    const hashedPassword = await hash(password, 12);

    // Створення нового користувача
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Видаляємо пароль з відповіді
    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json(
      { message: 'Користувача успішно створено', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Помилка при реєстрації' },
      { status: 500 }
    );
  }
} 