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
  accessibleMeditations: string[];
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

export default function AdminPanel() {
  const { 
    user, 
    loading: authLoading, 
    error: authError,
    grantPremiumAccess, 
    revokePremiumAccess,
    grantMeditationAccess,
    revokeMeditationAccess,
    getAllUsers,
    clearError 
  } = useAuth();
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
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

  const handleMeditationAccessToggle = async (targetUser: User, meditationId: string) => {
    try {
      setActionInProgress(`${targetUser.id}-${meditationId}`);
      if (targetUser.accessibleMeditations.includes(meditationId)) {
        await revokeMeditationAccess(targetUser.id, meditationId);
      } else {
        await grantMeditationAccess(targetUser.id, meditationId);
      }
      await loadUsers();
      setError(null);
    } catch (err) {
      setError('Помилка зміни доступу до медитації');
      console.error('Meditation access toggle error:', err);
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

      {/* Мобільний перегляд */}
      <div className="md:hidden">
        {users.map((u) => (
          <div 
            key={u.id} 
            className={`mb-4 p-4 rounded-lg border ${actionInProgress === u.id ? 'bg-gray-50' : 'bg-white'}`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium text-gray-900">{u.name}</div>
              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {u.role === 'admin' ? 'Адмін' : 'Користувач'}
              </span>
            </div>
            
            <div className="text-sm text-gray-500 mb-2">{u.email}</div>
            
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm font-medium">Преміум статус:</div>
              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                u.isPremium ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {u.isPremium ? 'Так' : 'Ні'}
              </span>
            </div>
            
            {u.role !== 'admin' && (
              <>
                <button
                  onClick={() => handlePremiumToggle(u)}
                  disabled={actionInProgress === u.id}
                  className={`w-full px-4 py-2 rounded-md text-sm font-medium text-white mb-4 ${
                    actionInProgress === u.id
                      ? 'bg-gray-400 cursor-not-allowed'
                      : u.isPremium 
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {actionInProgress === u.id ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin h-4 w-4 mr-2 border-b-2 border-white rounded-full"></span>
                      Обробка...
                    </span>
                  ) : (
                    u.isPremium ? 'Відкликати преміум' : 'Надати преміум'
                  )}
                </button>

                <button
                  onClick={() => setSelectedUser(selectedUser?.id === u.id ? null : u)}
                  className="w-full px-4 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  {selectedUser?.id === u.id ? 'Сховати медитації' : 'Показати медитації'}
                </button>

                {selectedUser?.id === u.id && (
                  <div className="mt-4 space-y-2">
                    <h3 className="font-medium text-gray-900">Доступні медитації:</h3>
                    {allMeditations.map((meditation) => (
                      <div key={meditation.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{meditation.title}</span>
                        <button
                          onClick={() => handleMeditationAccessToggle(u, meditation.id)}
                          disabled={actionInProgress === `${u.id}-${meditation.id}`}
                          className={`px-3 py-1 rounded text-xs font-medium ${
                            actionInProgress === `${u.id}-${meditation.id}`
                              ? 'bg-gray-300 cursor-not-allowed'
                              : u.accessibleMeditations.includes(meditation.id)
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {actionInProgress === `${u.id}-${meditation.id}` ? (
                            <span className="animate-spin h-3 w-3 border-b-2 border-current rounded-full"></span>
                          ) : (
                            u.accessibleMeditations.includes(meditation.id) ? 'Відкликати' : 'Надати'
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Десктопний перегляд */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
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
                    <div className="flex items-center justify-end space-x-2">
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

                      <button
                        onClick={() => setSelectedUser(selectedUser?.id === u.id ? null : u)}
                        className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                      >
                        {selectedUser?.id === u.id ? 'Сховати медитації' : 'Медитації'}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Модальне вікно з медитаціями */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Доступні медитації для {selectedUser.name}</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {allMeditations.map((meditation) => (
                <div key={meditation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm">{meditation.title}</span>
                  <button
                    onClick={() => handleMeditationAccessToggle(selectedUser, meditation.id)}
                    disabled={actionInProgress === `${selectedUser.id}-${meditation.id}`}
                    className={`px-4 py-2 rounded text-sm font-medium ${
                      actionInProgress === `${selectedUser.id}-${meditation.id}`
                        ? 'bg-gray-300 cursor-not-allowed'
                        : selectedUser.accessibleMeditations.includes(meditation.id)
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {actionInProgress === `${selectedUser.id}-${meditation.id}` ? (
                      <span className="animate-spin h-4 w-4 border-b-2 border-current rounded-full"></span>
                    ) : (
                      selectedUser.accessibleMeditations.includes(meditation.id) ? 'Відкликати' : 'Надати'
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 