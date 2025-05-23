'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isPremium: boolean;
  accessibleMeditations: string[];
  accessiblePractices: string[];
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  grantAccess: (userId: string, type: 'meditation' | 'practice', id: string) => Promise<void>;
  revokeAccess: (userId: string, type: 'meditation' | 'practice', id: string) => Promise<void>;
  getAllUsers: () => Promise<User[]>;
  hasPremiumAccess: () => boolean;
  hasMeditationAccess: (meditationId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to login');
      }

      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      router.push('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      router.push('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register');
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  const grantAccess = async (userId: string, type: 'meditation' | 'practice', id: string) => {
    try {
      const response = await fetch('/api/users/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, type, id, action: 'grant' }),
      });

      if (!response.ok) {
        throw new Error('Failed to grant access');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to grant access');
      throw err;
    }
  };

  const revokeAccess = async (userId: string, type: 'meditation' | 'practice', id: string) => {
    try {
      const response = await fetch('/api/users/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, type, id, action: 'revoke' }),
      });

      if (!response.ok) {
        throw new Error('Failed to revoke access');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to revoke access');
      throw err;
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
      throw err;
    }
  };

  const hasPremiumAccess = () => {
    return !!user?.isPremium;
  };

  const hasMeditationAccess = (meditationId: string) => {
    return !!user?.isPremium || !!user?.accessibleMeditations?.includes(meditationId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        grantAccess,
        revokeAccess,
        getAllUsers,
        hasPremiumAccess,
        hasMeditationAccess,
      }}
    >
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