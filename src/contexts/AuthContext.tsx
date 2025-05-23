'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { initialUsers } from '@/data/initialUsers';
import { collection, query, where, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { sendTelegramMessage } from '@/utils/telegram';
import { db } from '@/firebase/firebaseConfig';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
  logout: () => void;
  grantPremiumAccess: (userId: string) => Promise<void>;
  revokePremiumAccess: (userId: string) => Promise<void>;
  grantMeditationAccess: (targetUserId: string, meditationId: string) => Promise<void>;
  revokeMeditationAccess: (targetUserId: string, meditationId: string) => Promise<void>;
  grantPracticeAccess: (userId: string, practiceId: string) => Promise<void>;
  revokePracticeAccess: (userId: string, practiceId: string) => Promise<void>;
  hasPremiumAccess: () => boolean;
  hasMeditationAccess: (meditationId: string) => boolean;
  getAllUsers: () => User[];
  clearError: () => void;
  updateUser: (userData: Partial<User>) => void;
  isPremium: boolean;
  activatePremium: () => void;
  deactivatePremium: () => void;
  resetUserPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const foundUser = users.find(u => u.email === email);
      
      if (!foundUser) {
        throw new Error('Користувача не знайдено');
      }

      // В демо-версії не перевіряємо пароль
      const token = 'demo-token';
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setUser(foundUser);
      setError(null);
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Помилка входу');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt'>) => {
    try {
      setLoading(true);
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        accessibleMeditations: [],
      };
      setUsers([...users, newUser]);
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setError(null);
    } catch (error) {
      console.error('Registration error:', error);
      setError('Помилка реєстрації');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const grantPremiumAccess = async (userId: string) => {
    if (!user || user.role !== 'admin') {
      setError('Немає прав адміністратора');
      throw new Error('Немає прав адміністратора');
    }

    try {
      const updatedUsers = users.map((u: User) => {
        if (u.id === userId) {
          return { ...u, isPremium: true };
        }
        return u;
      });
      
      setUsers(updatedUsers);
      
      // Якщо це поточний користувач, оновлюємо його стан
      if (user.id === userId) {
        setUser({ ...user, isPremium: true });
      }
    } catch (error) {
      setError('Помилка надання преміум доступу');
      throw error;
    }
  };

  const revokePremiumAccess = async (userId: string) => {
    if (!user || user.role !== 'admin') {
      setError('Немає прав адміністратора');
      throw new Error('Немає прав адміністратора');
    }

    try {
      const updatedUsers = users.map((u: User) => {
        if (u.id === userId) {
          return { ...u, isPremium: false };
        }
        return u;
      });
      
      setUsers(updatedUsers);
      
      // Якщо це поточний користувач, оновлюємо його стан
      if (user.id === userId) {
        setUser({ ...user, isPremium: false });
      }
    } catch (error) {
      setError('Помилка відкликання преміум доступу');
      throw error;
    }
  };

  const grantMeditationAccess = async (targetUserId: string, meditationId: string) => {
    if (!user || user.role !== 'admin') {
      setError('Немає прав адміністратора');
      throw new Error('Немає прав адміністратора');
    }

    try {
      const updatedUsers = users.map((u: User) => {
        if (u.id === targetUserId) {
          const accessibleMeditations = Array.from(new Set([...u.accessibleMeditations, meditationId]));
          return { ...u, accessibleMeditations };
        }
        return u;
      });
      
      setUsers(updatedUsers);
      
      // Якщо це поточний користувач, оновлюємо його стан
      if (user.id === targetUserId) {
        const updatedUser = { 
          ...user, 
          accessibleMeditations: Array.from(new Set([...user.accessibleMeditations, meditationId]))
        };
        setUser(updatedUser);
      }
    } catch (error) {
      setError('Помилка надання доступу до медитації');
      throw error;
    }
  };

  const revokeMeditationAccess = async (targetUserId: string, meditationId: string) => {
    if (!user || user.role !== 'admin') {
      setError('Немає прав адміністратора');
      throw new Error('Немає прав адміністратора');
    }

    try {
      const updatedUsers = users.map((u: User) => {
        if (u.id === targetUserId) {
          return { 
            ...u, 
            accessibleMeditations: u.accessibleMeditations.filter(id => id !== meditationId)
          };
        }
        return u;
      });
      
      setUsers(updatedUsers);
      
      // Якщо це поточний користувач, оновлюємо його стан
      if (user.id === targetUserId) {
        const updatedUser = { 
          ...user, 
          accessibleMeditations: user.accessibleMeditations.filter(id => id !== meditationId)
        };
        setUser(updatedUser);
      }
    } catch (error) {
      setError('Помилка відкликання доступу до медитації');
      throw error;
    }
  };

  const grantPracticeAccess = async (userId: string, practiceId: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        throw new Error('Користувача не знайдено');
      }

      const userData = userDoc.data();
      const accessiblePractices = userData.accessiblePractices || [];
      
      if (!accessiblePractices.includes(practiceId)) {
        await updateDoc(userRef, {
          accessiblePractices: [...accessiblePractices, practiceId]
        });
      }
    } catch (err) {
      console.error('Error granting practice access:', err);
      throw err;
    }
  };

  const revokePracticeAccess = async (userId: string, practiceId: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        throw new Error('Користувача не знайдено');
      }

      const userData = userDoc.data();
      const accessiblePractices = userData.accessiblePractices || [];
      
      if (accessiblePractices.includes(practiceId)) {
        await updateDoc(userRef, {
          accessiblePractices: accessiblePractices.filter((id: string) => id !== practiceId)
        });
      }
    } catch (err) {
      console.error('Error revoking practice access:', err);
      throw err;
    }
  };

  const hasPremiumAccess = () => {
    return Boolean(user?.isPremium || user?.role === 'admin');
  };

  const hasMeditationAccess = (meditationId: string) => {
    if (!user) return false;
    return user.isPremium || user.role === 'admin' || user.accessibleMeditations.includes(meditationId);
  };

  const getAllUsers = () => {
    return users;
  };

  const clearError = () => {
    setError(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const isPremium = user?.isPremium || false;

  const activatePremium = () => {
    if (user) {
      updateUser({ isPremium: true });
    }
  };

  const deactivatePremium = () => {
    if (user) {
      updateUser({ isPremium: false });
    }
  };

  const resetUserPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const userRef = collection(db, 'users');
      const q = query(userRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('Користувача з такою електронною поштою не знайдено');
      }

      const userDoc = querySnapshot.docs[0];
      const newPassword = Math.random().toString(36).slice(-8); // Генеруємо випадковий пароль
      
      // Оновлюємо пароль в базі даних
      await updateDoc(doc(db, 'users', userDoc.id), {
        password: newPassword
      });

      // Відправляємо новий пароль через Telegram бота
      const message = `🔐 Відновлення паролю\n\nКористувач: ${userDoc.data().name}\nEmail: ${email}\nНовий пароль: ${newPassword}`;
      await sendTelegramMessage(message);
      
    } catch (err) {
      console.error('Error resetting password:', err);
      setError(err instanceof Error ? err.message : 'Помилка при відновленні паролю');
      throw err;
    } finally {
      setLoading(false);
    }
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
    grantMeditationAccess,
    revokeMeditationAccess,
    grantPracticeAccess,
    revokePracticeAccess,
    hasPremiumAccess,
    hasMeditationAccess,
    getAllUsers,
    clearError,
    updateUser,
    isPremium,
    activatePremium,
    deactivatePremium,
    resetUserPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 