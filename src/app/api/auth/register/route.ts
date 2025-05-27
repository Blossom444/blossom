import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  // Додаємо CORS заголовки
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Обробка OPTIONS запиту для CORS
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { headers });
  }

  try {
    console.log('Starting registration process...');
    let body;
    try {
      body = await request.json();
      console.log('Received data:', body);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { error: 'Помилка обробки даних запиту' },
        { status: 400, headers }
      );
    }
    
    const { name, email, password, role = 'user' } = body;

    // Валідація
    if (!name || !email || !password) {
      console.log('Validation failed: missing required fields');
      return NextResponse.json(
        { error: 'Всі поля обов\'язкові' },
        { status: 400, headers }
      );
    }

    if (password.length < 6) {
      console.log('Validation failed: password too short');
      return NextResponse.json(
        { error: 'Пароль повинен містити мінімум 6 символів' },
        { status: 400, headers }
      );
    }

    // Підключення до бази даних
    console.log('Connecting to database...');
    try {
      const db = await connectToDatabase();
      console.log('Database connection successful');
      
      // Перевіряємо підключення
      if (!db) {
        throw new Error('Database connection failed');
      }
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: 'Помилка підключення до бази даних' },
        { status: 500, headers }
      );
    }

    // Перевірка чи існує користувач
    console.log('Checking for existing user...');
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists:', email);
        return NextResponse.json(
          { error: 'Користувач з таким email вже існує' },
          { status: 400, headers }
        );
      }
    } catch (findError) {
      console.error('Error finding user:', findError);
      return NextResponse.json(
        { error: 'Помилка пошуку користувача' },
        { status: 500, headers }
      );
    }

    // Хешування паролю
    console.log('Hashing password...');
    try {
      const hashedPassword = await hash(password, 12);

      // Створення нового користувача
      console.log('Creating new user...');
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        isPremium: role === 'admin',
        accessibleMeditations: [],
        accessiblePractices: [],
      });
      console.log('User created successfully');

      // Видаляємо пароль з відповіді
      const { password: _, ...userWithoutPassword } = user.toObject();

      return NextResponse.json(
        { message: 'Користувача успішно створено', user: userWithoutPassword },
        { status: 201, headers }
      );
    } catch (createError) {
      console.error('Error creating user:', createError);
      return NextResponse.json(
        { error: 'Помилка створення користувача' },
        { status: 500, headers }
      );
    }
  } catch (error) {
    console.error('Registration error details:', error);
    return NextResponse.json(
      { error: 'Помилка при реєстрації' },
      { status: 500, headers }
    );
  }
} 