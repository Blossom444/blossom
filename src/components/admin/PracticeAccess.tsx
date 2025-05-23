'use client';

import { useState } from 'react';
import { practices } from '@/data/practices';

interface User {
  _id: string;
  email: string;
  name: string;
  isPremium: boolean;
  role: 'user' | 'admin';
  accessibleMeditations: string[];
  accessiblePractices: string[];
}

interface PracticeAccessProps {
  users: User[];
  onUpdateUser: (userId: string, updates: Partial<User>) => Promise<void>;
}

export default function PracticeAccess({ users, onUpdateUser }: PracticeAccessProps) {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [localUsers, setLocalUsers] = useState<User[]>(users);

  const handleAccessToggle = async (userId: string, practiceId: string) => {
    const key = `${userId}-${practiceId}`;
    setLoading(prev => ({ ...prev, [key]: true }));
    try {
      const user = localUsers.find(u => u._id === userId);
      if (!user) return;

      const newAccessiblePractices = user.accessiblePractices.includes(practiceId)
        ? user.accessiblePractices.filter(id => id !== practiceId)
        : [...user.accessiblePractices, practiceId];

      // Оновлюємо локальний стан
      setLocalUsers(prevUsers => 
        prevUsers.map(u => 
          u._id === userId 
            ? { ...u, accessiblePractices: newAccessiblePractices }
            : u
        )
      );

      // Відправляємо оновлення на сервер
      await onUpdateUser(userId, { accessiblePractices: newAccessiblePractices });
    } catch (error) {
      // У випадку помилки повертаємо попередній стан
      setLocalUsers(users);
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  const toggleUserExpansion = (userId: string) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Доступ до практик</h2>
      <div className="space-y-4">
        {localUsers.map((user) => (
          <div key={user._id} className="border rounded-lg overflow-hidden">
            <div 
              className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
              onClick={() => toggleUserExpansion(user._id)}
            >
              <div className="flex items-center space-x-4">
                <span className="font-medium">{user.name}</span>
                <span className="text-sm text-gray-500">
                  {user.accessiblePractices.length} практик доступно
                </span>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                {expandedUser === user._id ? '▲' : '▼'}
              </button>
            </div>
            
            {expandedUser === user._id && (
              <div className="p-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {practices.map((practice) => (
                    <div key={practice.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <span className="font-medium">{practice.title}</span>
                      <button
                        onClick={() => handleAccessToggle(user._id, practice.id)}
                        disabled={loading[`${user._id}-${practice.id}`]}
                        className={`px-3 py-1 rounded-md text-sm ${
                          user.accessiblePractices.includes(practice.id)
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-green-600 hover:bg-green-700'
                        } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                      >
                        {loading[`${user._id}-${practice.id}`]
                          ? 'Оновлення...'
                          : user.accessiblePractices.includes(practice.id)
                          ? 'Забрати доступ'
                          : 'Надати доступ'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 