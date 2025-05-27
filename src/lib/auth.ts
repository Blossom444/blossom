import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { connectToDatabase } from './mongodb';
import User from '@/models/User';

type UserRole = 'user' | 'admin';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('Starting authorization process...');
        console.log('Credentials received:', credentials);
        
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          throw new Error('Email та пароль обов\'язкові');
        }

        try {
          console.log('Connecting to database...');
          await connectToDatabase();
          console.log('Database connection successful');
          
          console.log('Looking for user:', credentials.email);
          const user = await User.findOne({ email: credentials.email });
          console.log('User found:', user ? 'Yes' : 'No');
          
          if (!user) {
            console.log('User not found');
            throw new Error('Користувача не знайдено');
          }

          console.log('Comparing passwords...');
          const isPasswordValid = await compare(credentials.password, user.password);
          console.log('Password valid:', isPasswordValid ? 'Yes' : 'No');
          
          if (!isPasswordValid) {
            console.log('Invalid password');
            throw new Error('Невірний пароль');
          }

          const userToReturn = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role as UserRole,
            isPremium: user.isPremium,
          };
          console.log('Returning user:', userToReturn);
          
          return userToReturn;
        } catch (error) {
          console.error('Auth error details:', error);
          throw new Error('Помилка авторизації');
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 днів
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT Callback - Token:', token);
      console.log('JWT Callback - User:', user);
      
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isPremium = user.isPremium;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session Callback - Session:', session);
      console.log('Session Callback - Token:', token);
      
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.isPremium = token.isPremium as boolean;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'blossom-secret-key-2024',
  debug: true,
}; 