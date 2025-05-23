'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { sendTelegramMessage, testTelegramBot } from '@/utils/telegram';
import UserManagement from './admin/UserManagement';
import MeditationAccess from './admin/MeditationAccess';
import PracticeAccess from './admin/PracticeAccess';
import PremiumManagement from './admin/PremiumManagement';

interface User {
  _id: string;
  email: string;
  name: string;
  isPremium: boolean;
  role: 'user' | 'admin';
  accessibleMeditations: string[];
  accessiblePractices: string[];
}

// Список всіх медитацій
const allMeditations = [
  { id: 'meditation-1', title: 'Наміри на день' },
  { id: 'meditation-2', title: 'Тут і зараз' },
  { id: 'meditation-3', title: 'Внутрішня гармонія' },
  { id: 'meditation-4', title: 'Глибоке розслаблення' },
  { id: 'meditation-5', title: 'Усвідомлення дня' },
  { id: 'meditation-6', title: 'Прийняття та усвідомлення' },
  { id: 'meditation-7', title: 'Наповнення енергією' },
  { id: 'meditation-8', title: 'Для досягнення цілей' },
  { id: 'meditation-9', title: 'Знайомство з внутрішнім світом' },
  { id: 'meditation-10', title: 'Пізнання власного Я' },
  { id: 'meditation-11', title: 'Для зосередження та зняття стресу' },
  { id: 'meditation-12', title: 'Прийняття себе' },
  { id: 'meditation-13', title: 'Впевненість в собі' },
  { id: 'meditation-14', title: 'Медитація вдячності' },
  { id: 'meditation-15', title: 'Свобода від обмежень' }
];

// Список всіх практик
const allPractices = [
  { id: 'practice-1', title: 'Дихальна практика' },
  { id: 'practice-2', title: 'Йога для початківців' },
  { id: 'practice-3', title: 'Медитація ходьби' },
  { id: 'practice-4', title: 'Розтяжка' },
  { id: 'practice-5', title: 'Цигун' }
];

type Tab = 'users' | 'meditations' | 'practices' | 'premium';

export default function AdminPanel() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [telegramTestStatus, setTelegramTestStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login');
      return;
    }

    fetchUsers();
  }, [user, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId: string, updates: Partial<User>) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      await fetchUsers();
      await sendTelegramMessage(`User ${userId} updated with: ${JSON.stringify(updates)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      await fetchUsers();
      await sendTelegramMessage(`User ${userId} deleted`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  const handleTestTelegram = async () => {
    try {
      setTelegramTestStatus('testing');
      await testTelegramBot();
      setTelegramTestStatus('success');
    } catch (error) {
      setTelegramTestStatus('error');
      setError(error instanceof Error ? error.message : 'Failed to test Telegram bot');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Panel</h1>
      
      <div className="mb-8 flex justify-center">
        <button
          onClick={handleTestTelegram}
          disabled={telegramTestStatus === 'testing'}
          className={`px-4 py-2 rounded-md ${
            telegramTestStatus === 'success'
              ? 'bg-green-600'
              : telegramTestStatus === 'error'
              ? 'bg-red-600'
              : 'bg-blue-600'
          } text-white hover:opacity-90 transition-colors`}
        >
          {telegramTestStatus === 'testing'
            ? 'Testing Telegram...'
            : telegramTestStatus === 'success'
            ? '✅ Telegram Test Successful'
            : telegramTestStatus === 'error'
            ? '❌ Telegram Test Failed'
            : 'Test Telegram Bot'}
        </button>
      </div>

      <div className="grid gap-8">
        <UserManagement users={users} onUpdateUser={updateUser} onDeleteUser={deleteUser} />
        <MeditationAccess users={users} onUpdateUser={updateUser} />
        <PracticeAccess users={users} onUpdateUser={updateUser} />
        <PremiumManagement users={users} onUpdateUser={updateUser} />
      </div>
    </div>
  );
} 