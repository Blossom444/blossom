'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const defaultContextValue: AuthContextType = {
  user: null,
  loading: true,
  login: async () => {
    throw new Error('AuthContext not initialized');
  },
  register: async () => {
    throw new Error('AuthContext not initialized');
  },
  logout: async () => {
    throw new Error('AuthContext not initialized');
  },
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Перевіряємо, чи є збережений токен
    const token = localStorage.getItem('authToken');
    if (token) {
      // TODO: Валідація токену на сервері
      const userData = JSON.parse(localStorage.getItem('userData') || 'null');
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // TODO: Замінити на реальний API-запит
      const mockUser: User = {
        id: '1',
        email,
        name: 'Адміністратор',
        isPremium: false,
        role: email === 'admin@blossom.com' ? 'admin' : 'user'
      };
      
      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('userData', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Помилка входу');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // TODO: Замінити на реальний API-запит
      const mockUser: User = {
        id: '1',
        email,
        name,
        isPremium: false,
        role: 'user'
      };
      
      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('userData', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Помилка реєстрації');
    }
  };

  const logout = async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    console.warn('useAuth was called outside of AuthProvider. Using default context value.');
    return defaultContextValue;
  }
  return context;
} 