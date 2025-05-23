import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await connectToDatabase();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email,
      password: hashedPassword,
      role: 'admin',
      isPremium: true,
    });

    // Remove password from response
    const adminWithoutPassword = {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      isPremium: admin.isPremium,
      accessibleMeditations: admin.accessibleMeditations,
      accessiblePractices: admin.accessiblePractices,
      createdAt: admin.createdAt,
    };

    return NextResponse.json(adminWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Admin creation error:', error);
    return NextResponse.json(
      { error: 'Error creating admin' },
      { status: 500 }
    );
  }
} 