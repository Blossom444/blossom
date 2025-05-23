'use client';

import { useState } from 'react';
import { meditations } from '@/data/meditations';

interface User {
  _id: string;
  email: string;
  name: string;
  isPremium: boolean;
  role: 'user' | 'admin';
  accessibleMeditations: string[];
  accessiblePractices: string[];
}

interface MeditationAccessProps {
  users: User[];
  onUpdateUser: (userId: string, updates: Partial<User>) => Promise<void>;
}

export default function MeditationAccess({ users, onUpdateUser }: MeditationAccessProps) {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [localUsers, setLocalUsers] = useState<User[]>(users);

  const handleAccessToggle = async (userId: string, meditationId: string) => {
    const key = `${userId}-${meditationId}`;
    setLoading(prev => ({ ...prev, [key]: true }));
    try {
      const user = localUsers.find(u => u._id === userId);
      if (!user) return;

      const newAccessibleMeditations = user.accessibleMeditations.includes(meditationId)
        ? user.accessibleMeditations.filter(id => id !== meditationId)
        : [...user.accessibleMeditations, meditationId];

      // Оновлюємо локальний стан
      setLocalUsers(prevUsers => 
        prevUsers.map(u => 
          u._id === userId 
            ? { ...u, accessibleMeditations: newAccessibleMeditations }
            : u
        )
      );

      // Відправляємо оновлення на сервер
      await onUpdateUser(userId, { accessibleMeditations: newAccessibleMeditations });
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
      <h2 className="text-2xl font-bold mb-4">Доступ до медитацій</h2>
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
                  {user.accessibleMeditations.length} медитацій доступно
                </span>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                {expandedUser === user._id ? '▲' : '▼'}
              </button>
            </div>
            
            {expandedUser === user._id && (
              <div className="p-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {meditations.map((meditation) => (
                    <div key={meditation.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <span className="font-medium">{meditation.title}</span>
                      <button
                        onClick={() => handleAccessToggle(user._id, meditation.id)}
                        disabled={loading[`${user._id}-${meditation.id}`]}
                        className={`px-3 py-1 rounded-md text-sm ${
                          user.accessibleMeditations.includes(meditation.id)
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-green-600 hover:bg-green-700'
                        } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                      >
                        {loading[`${user._id}-${meditation.id}`]
                          ? 'Оновлення...'
                          : user.accessibleMeditations.includes(meditation.id)
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