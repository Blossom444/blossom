'use client';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AccessibleContent from '@/components/profile/AccessibleContent';
import GradientCover from '@/components/GradientCover';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isPremium: boolean;
  accessibleMeditations: string[];
  accessiblePractices: string[];
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'content'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchUser();
    }
  }, [status, router]);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/users/me');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUser(data);
      setEditedName(data.name);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch('/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
      setError('');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <GradientCover title="Особистий кабінет" variant="purple" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex space-x-4 border-b border-gray-200 mb-6">
              <button
                className={`pb-2 px-4 ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                Профіль
              </button>
              <button
                className={`pb-2 px-4 ${
                  activeTab === 'content'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('content')}
              >
                Доступний контент
              </button>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
                {error}
              </div>
            )}

            {activeTab === 'profile' ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Інформація профілю</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ім'я</label>
                      {isEditing ? (
                        <div className="mt-1 flex space-x-2">
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          />
                          <button
                            onClick={handleUpdateProfile}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Зберегти
                          </button>
                          <button
                            onClick={() => {
                              setIsEditing(false);
                              setEditedName(user.name);
                            }}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Скасувати
                          </button>
                        </div>
                      ) : (
                        <div className="mt-1 flex justify-between items-center">
                          <p className="text-lg text-gray-900">{user.name}</p>
                          <button
                            onClick={() => setIsEditing(true)}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            Редагувати
                          </button>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Статус</label>
                      <p className="mt-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.isPremium
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {user.isPremium ? 'Premium' : 'Базовий'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <AccessibleContent user={user} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 