import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { userId, type, id, action } = await req.json();

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (action === 'grant') {
      if (type === 'meditation' && !user.accessibleMeditations.includes(id)) {
        user.accessibleMeditations.push(id);
      } else if (type === 'practice' && !user.accessiblePractices.includes(id)) {
        user.accessiblePractices.push(id);
      }
    } else if (action === 'revoke') {
      if (type === 'meditation') {
        user.accessibleMeditations = user.accessibleMeditations.filter(
          (meditationId: string) => meditationId !== id
        );
      } else if (type === 'practice') {
        user.accessiblePractices = user.accessiblePractices.filter(
          (practiceId: string) => practiceId !== id
        );
      }
    }

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
    console.error('Access management error:', error);
    return NextResponse.json(
      { error: 'Error managing access' },
      { status: 500 }
    );
  }
} 