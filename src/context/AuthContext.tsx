'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isPremium: boolean;
  accessibleMeditations?: string[];
  accessiblePractices?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPremiumAccess: () => boolean;
  hasMeditationAccess: (meditationId: string) => boolean;
  hasPracticeAccess: (practiceId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Отримуємо дані користувача після успішного входу
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const hasPremiumAccess = () => {
    return !!user?.isPremium;
  };

  const hasMeditationAccess = (meditationId: string) => {
    return !!user?.isPremium || !!user?.accessibleMeditations?.includes(meditationId);
  };

  const hasPracticeAccess = (practiceId: string) => {
    return !!user?.isPremium || !!user?.accessiblePractices?.includes(practiceId);
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (status === 'authenticated' && session?.user) {
        try {
          const response = await fetch('/api/auth/me');
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          }
        } catch (error) {
          console.error('Auth check error:', error);
        }
      } else if (status === 'unauthenticated') {
        setUser(null);
      }
    };

    checkAuth();
  }, [session, status]);

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPremiumAccess, hasMeditationAccess, hasPracticeAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 