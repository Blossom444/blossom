import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    const mongoose = await connectToDatabase();
    const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String,
      isPremium: Boolean,
      accessibleMeditations: [String],
      accessiblePractices: [String],
      createdAt: String
    }));

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user',
      isPremium: false,
      accessibleMeditations: [],
      accessiblePractices: [],
      createdAt: new Date().toISOString()
    });

    const userResponse = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      isPremium: user.isPremium,
      accessibleMeditations: user.accessibleMeditations,
      accessiblePractices: user.accessiblePractices,
      createdAt: user.createdAt
    };

    return NextResponse.json(userResponse);
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 