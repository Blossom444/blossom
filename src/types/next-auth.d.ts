import 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    isPremium: boolean;
    accessibleMeditations?: string[];
    accessiblePractices?: string[];
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'user' | 'admin';
    isPremium: boolean;
    accessibleMeditations?: string[];
    accessiblePractices?: string[];
  }
} 