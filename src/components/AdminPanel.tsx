'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  role: 'user' | 'admin';
}

export default function AdminPanel() {
  const { 
    user, 
    loading: authLoading, 
    error: authError,
    grantPremiumAccess, 
    revokePremiumAccess, 
    getAllUsers,
    clearError 
  } = useAuth();
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'admin') {
        router.push('/');
        return;
      }
      loadUsers();
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (authError) {
      setError(authError);
      clearError();
    }
  }, [authError, clearError]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const allUsers = getAllUsers();
      setUsers(allUsers);
      setError(null);
    } catch (err) {
      setError('Помилка завантаження користувачів');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePremiumToggle = async (targetUser: User) => {
    try {
      setActionInProgress(targetUser.id);
      if (targetUser.isPremium) {
        await revokePremiumAccess(targetUser.id);
      } else {
        await grantPremiumAccess(targetUser.id);
      }
      await loadUsers();
      setError(null);
    } catch (err) {
      setError('Помилка зміни статусу преміум доступу');
      console.error('Premium access toggle error:', err);
    } finally {
      setActionInProgress(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Завантаження...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        <p className="font-medium">Доступ заборонено</p>
        <p className="mt-2">Тільки адміністратори мають доступ до цієї сторінки.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Управління користувачами</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center justify-between">
          <p>{error}</p>
          <button 
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Користувач
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Роль
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Преміум
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дії
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u.id} className={actionInProgress === u.id ? 'bg-gray-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{u.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{u.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {u.role === 'admin' ? 'Адмін' : 'Користувач'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    u.isPremium ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {u.isPremium ? 'Так' : 'Ні'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {u.role !== 'admin' && (
                    <button
                      onClick={() => handlePremiumToggle(u)}
                      disabled={actionInProgress === u.id}
                      className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                        actionInProgress === u.id
                          ? 'bg-gray-400 cursor-not-allowed'
                          : u.isPremium 
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {actionInProgress === u.id ? (
                        <span className="flex items-center">
                          <span className="animate-spin h-4 w-4 mr-2 border-b-2 border-white rounded-full"></span>
                          Обробка...
                        </span>
                      ) : (
                        u.isPremium ? 'Відкликати преміум' : 'Надати преміум'
                      )}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 