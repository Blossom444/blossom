import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email та пароль обов\'язкові');
        }

        // Тестовий адміністратор
        if (credentials.email === 'admin@blossom.com' && credentials.password === 'admin123') {
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@blossom.com',
            role: 'admin' as UserRole,
            isPremium: true,
          };
        }

        throw new Error('Невірний email або пароль');
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 днів
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isPremium = user.isPremium;
      }
      return token;
    },
    async session({ session, token }) {
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
  secret: process.env.NEXTAUTH_SECRET || 'your-super-secret-key-here',
  debug: process.env.NODE_ENV === 'development',
}; 