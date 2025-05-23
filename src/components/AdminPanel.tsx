'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { sendTelegramMessage } from '@/utils/telegram';

interface User {
  id: string;
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
    clearError,
    resetUserPassword
  } = useAuth();
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const router = useRouter();
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [resetPasswordStatus, setResetPasswordStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(null);
  const [showMeditationDropdown, setShowMeditationDropdown] = useState<string | null>(null);
  const [showPracticeDropdown, setShowPracticeDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'admin') {
        router.push('/');
        return;
      }
      console.log('AdminPanel mounted, loading users...');
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
      console.log('Loading users...');
      const allUsers = getAllUsers();
      console.log('Loaded users:', allUsers);
      
      if (!Array.isArray(allUsers)) {
        console.error('Invalid users data:', allUsers);
        setError('Помилка формату даних користувачів');
        return;
      }

      setUsers(allUsers);
      setError(null);
    } catch (err) {
      console.error('Error loading users:', err);
      setError('Помилка завантаження користувачів');
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (user: User) => {
    try {
      setLoading(true);
      setError(null);
      
      // Оновлюємо статус преміум в базі даних
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        isPremium: !user.isPremium
      });

      // Оновлюємо локальний стан
      setUsers(users.map(u => 
        u.id === user.id ? { ...u, isPremium: !u.isPremium } : u
      ));

      // Відправляємо повідомлення через Telegram
      const message = `🔄 Зміна преміум статусу\n\nКористувач: ${user.name}\nEmail: ${user.email}\nНовий статус: ${!user.isPremium ? 'Premium' : 'Звичайний'}`;
      await sendTelegramMessage(message);

    } catch (err) {
      console.error('Error updating user:', err);
      setError(err instanceof Error ? err.message : 'Помилка при оновленні користувача');
    } finally {
      setLoading(false);
    }
  };

  const handlePremiumToggle = async (targetUser: User) => {
    try {
      setActionInProgress(targetUser.id);
      console.log('Toggling premium access for user:', targetUser.id);
      
      if (targetUser.isPremium) {
        await revokePremiumAccess(targetUser.id);
      } else {
        await grantPremiumAccess(targetUser.id);
      }
      
      // Оновлюємо локальний стан
      setUsers(users.map(u => 
        u.id === targetUser.id ? { ...u, isPremium: !u.isPremium } : u
      ));

      // Відправляємо повідомлення через Telegram
      const message = `🔄 Зміна преміум статусу\n\nКористувач: ${targetUser.name}\nEmail: ${targetUser.email}\nНовий статус: ${!targetUser.isPremium ? 'Premium' : 'Звичайний'}`;
      await sendTelegramMessage(message);

      setError(null);
    } catch (err) {
      console.error('Premium access toggle error:', err);
      setError('Помилка зміни статусу преміум доступу');
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

      // Оновлюємо локальний стан
      setUsers(users.map(u => {
        if (u.id === targetUser.id) {
          const meditation = allMeditations.find(m => m.id === meditationId);
          const accessibleMeditations = u.accessibleMeditations.includes(meditationId)
            ? u.accessibleMeditations.filter(id => id !== meditationId)
            : [...u.accessibleMeditations, meditationId];
          
          return { ...u, accessibleMeditations };
        }
        return u;
      }));

      // Відправляємо повідомлення через Telegram
      const meditation = allMeditations.find(m => m.id === meditationId);
      const message = `🎯 Зміна доступу до медитації\n\nКористувач: ${targetUser.name}\nEmail: ${targetUser.email}\nМедитація: ${meditation?.title}\nДія: ${targetUser.accessibleMeditations.includes(meditationId) ? 'Відкликано доступ' : 'Надано доступ'}`;
      await sendTelegramMessage(message);

      setError(null);
    } catch (err) {
      setError('Помилка зміни доступу до медитації');
      console.error('Meditation access toggle error:', err);
    } finally {
      setActionInProgress(null);
    }
  };

  const handlePracticeAccessToggle = async (targetUser: User, practiceId: string) => {
    try {
      setActionInProgress(`${targetUser.id}-${practiceId}`);
      
      if (targetUser.accessiblePractices.includes(practiceId)) {
        await revokePracticeAccess(targetUser.id, practiceId);
      } else {
        await grantPracticeAccess(targetUser.id, practiceId);
      }

      // Оновлюємо локальний стан
      setUsers(users.map(u => {
        if (u.id === targetUser.id) {
          const practice = allPractices.find(p => p.id === practiceId);
          const accessiblePractices = u.accessiblePractices.includes(practiceId)
            ? u.accessiblePractices.filter(id => id !== practiceId)
            : [...u.accessiblePractices, practiceId];
          
          return { ...u, accessiblePractices };
        }
        return u;
      }));

      // Відправляємо повідомлення через Telegram
      const practice = allPractices.find(p => p.id === practiceId);
      const message = `🎯 Зміна доступу до практики\n\nКористувач: ${targetUser.name}\nEmail: ${targetUser.email}\nПрактика: ${practice?.title}\nДія: ${targetUser.accessiblePractices.includes(practiceId) ? 'Відкликано доступ' : 'Надано доступ'}`;
      await sendTelegramMessage(message);

      setError(null);
    } catch (err) {
      setError('Помилка зміни доступу до практики');
      console.error('Practice access toggle error:', err);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleResetPassword = async () => {
    if (!resetPasswordEmail) {
      setResetPasswordStatus('error');
      setResetPasswordError('Будь ласка, введіть email користувача');
      return;
    }

    try {
      setResetPasswordStatus('loading');
      console.log('Attempting to reset password for:', resetPasswordEmail);
      await resetUserPassword(resetPasswordEmail);
      console.log('Password reset successful');
      setResetPasswordStatus('success');
      setResetPasswordEmail('');
      setResetPasswordError('');
    } catch (err) {
      console.error('Error resetting password:', err);
      setResetPasswordStatus('error');
      setResetPasswordError(err instanceof Error ? err.message : 'Помилка при відновленні паролю');
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Панель адміністратора</h1>
      
      {/* Password Reset Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Відновлення паролю</h2>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email користувача
            </label>
            <input
              type="email"
              value={resetPasswordEmail}
              onChange={(e) => setResetPasswordEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введіть email користувача"
            />
          </div>
          <button
            onClick={handleResetPassword}
            disabled={resetPasswordStatus === 'loading'}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resetPasswordStatus === 'loading' ? 'Відновлення...' : 'Відновити пароль'}
          </button>
        </div>
        {resetPasswordError && (
          <p className="mt-2 text-red-600 text-sm">{resetPasswordError}</p>
        )}
        {resetPasswordStatus === 'success' && (
          <p className="mt-2 text-green-600 text-sm">
            Пароль успішно відновлено. Новий пароль надіслано через Telegram.
          </p>
        )}
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Список користувачів</h2>
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ім'я
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Доступ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дії
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.isPremium ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.isPremium ? 'Premium' : 'Звичайний'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <div className="relative">
                        <button
                          onClick={() => setShowMeditationDropdown(showMeditationDropdown === user.id ? null : user.id)}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                        >
                          Медитації
                        </button>
                        {showMeditationDropdown === user.id && (
                          <div className="absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200">
                            <div className="p-2 max-h-60 overflow-y-auto">
                              {allMeditations.map((meditation) => (
                                <label key={meditation.id} className="flex items-center p-2 hover:bg-gray-50 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={user.accessibleMeditations.includes(meditation.id)}
                                    onChange={() => handleMeditationAccessToggle(user, meditation.id)}
                                    className="mr-2"
                                  />
                                  <span className="text-sm">{meditation.title}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => setShowPracticeDropdown(showPracticeDropdown === user.id ? null : user.id)}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded hover:bg-purple-200 transition-colors"
                        >
                          Практики
                        </button>
                        {showPracticeDropdown === user.id && (
                          <div className="absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200">
                            <div className="p-2 max-h-60 overflow-y-auto">
                              {allPractices.map((practice) => (
                                <label key={practice.id} className="flex items-center p-2 hover:bg-gray-50 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={user.accessiblePractices?.includes(practice.id)}
                                    onChange={() => handlePracticeAccessToggle(user, practice.id)}
                                    className="mr-2"
                                  />
                                  <span className="text-sm">{practice.title}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handlePremiumToggle(user)}
                      disabled={actionInProgress === user.id}
                      className={`px-3 py-1 rounded ${
                        user.isPremium
                          ? 'bg-red-100 text-red-800 hover:bg-red-200'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      } transition-colors`}
                    >
                      {user.isPremium ? 'Деактивувати Premium' : 'Активувати Premium'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 