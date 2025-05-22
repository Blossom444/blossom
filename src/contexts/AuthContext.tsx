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
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  grantPremiumAccess: (userId: string) => Promise<void>;
  revokePremiumAccess: (userId: string) => Promise<void>;
  hasPremiumAccess: () => boolean;
  getAllUsers: () => User[];
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const INITIAL_USERS: User[] = [
  {
    id: '1',
    email: 'admin@blossom.com',
    name: 'Адміністратор',
    isPremium: true,
    role: 'admin'
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Тестовий користувач',
    isPremium: false,
    role: 'user'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        // Initialize users if needed
        if (!localStorage.getItem('allUsers')) {
          localStorage.setItem('allUsers', JSON.stringify(INITIAL_USERS));
        }

        // Check for existing session
        const token = localStorage.getItem('authToken');
        if (token) {
          const userData = JSON.parse(localStorage.getItem('userData') || 'null');
          if (userData) {
            // Verify user still exists in allUsers
            const allUsers = getAllUsers();
            const existingUser = allUsers.find((u: User) => u.id === userData.id);
            if (existingUser) {
              setUser(existingUser);
            } else {
              // User no longer exists, clear session
              localStorage.removeItem('authToken');
              localStorage.removeItem('userData');
            }
          }
        }
      } catch (err) {
        setError('Помилка ініціалізації аутентифікації');
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const clearError = () => setError(null);

  const getAllUsers = () => {
    try {
      const users = JSON.parse(localStorage.getItem('allUsers') || '[]');
      return Array.isArray(users) ? users : INITIAL_USERS;
    } catch (err) {
      console.error('Error getting users:', err);
      return INITIAL_USERS;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const allUsers = getAllUsers();
      const foundUser = allUsers.find((u: User) => u.email === email);
      
      if (!foundUser) {
        throw new Error('Користувача не знайдено');
      }

      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('userData', JSON.stringify(foundUser));
      setUser(foundUser);
    } catch (error) {
      setError('Помилка входу');
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const allUsers = getAllUsers();
      
      if (allUsers.some((u: User) => u.email === email)) {
        throw new Error('Користувач з такою поштою вже існує');
      }

      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        isPremium: false,
        role: 'user'
      };

      const updatedUsers = [...allUsers, newUser];
      localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
      
      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('userData', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      setError('Помилка реєстрації');
      throw error;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      setUser(null);
    } catch (error) {
      setError('Помилка виходу');
      throw error;
    }
  };

  const grantPremiumAccess = async (targetUserId: string) => {
    if (!user || user.role !== 'admin') {
      setError('Немає прав адміністратора');
      throw new Error('Немає прав адміністратора');
    }

    try {
      const allUsers = getAllUsers();
      const updatedUsers = allUsers.map((u: User) => 
        u.id === targetUserId ? { ...u, isPremium: true } : u
      );
      
      localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
      
      // Якщо це поточний користувач, оновлюємо його стан
      if (user.id === targetUserId) {
        const updatedUser = { ...user, isPremium: true };
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      setError('Помилка надання преміум доступу');
      throw error;
    }
  };

  const revokePremiumAccess = async (targetUserId: string) => {
    if (!user || user.role !== 'admin') {
      setError('Немає прав адміністратора');
      throw new Error('Немає прав адміністратора');
    }

    try {
      const allUsers = getAllUsers();
      const updatedUsers = allUsers.map((u: User) => 
        u.id === targetUserId ? { ...u, isPremium: false } : u
      );
      
      localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
      
      // Якщо це поточний користувач, оновлюємо його стан
      if (user.id === targetUserId) {
        const updatedUser = { ...user, isPremium: false };
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      setError('Помилка відкликання преміум доступу');
      throw error;
    }
  };

  const hasPremiumAccess = () => {
    return Boolean(user?.isPremium || user?.role === 'admin');
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    grantPremiumAccess,
    revokePremiumAccess,
    hasPremiumAccess,
    getAllUsers,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 