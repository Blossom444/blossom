import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const updates = await req.json();

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user fields
    Object.keys(updates).forEach(key => {
      if (key !== 'password' && key !== '_id') {
        user[key] = updates[key];
      }
    });

    await user.save();

    // Remove password from response
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isPremium: user.isPremium,
      accessibleMeditations: user.accessibleMeditations,
      accessiblePractices: user.accessiblePractices,
      createdAt: user.createdAt,
    };

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('User update error:', error);
    return NextResponse.json(
      { error: 'Error updating user' },
      { status: 500 }
    );
  }
} 