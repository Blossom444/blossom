import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      role: 'user' | 'admin';
      isPremium: boolean;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    name: string | null;
    email: string | null;
    role: 'user' | 'admin';
    isPremium: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'user' | 'admin';
    isPremium: boolean;
  }
} 