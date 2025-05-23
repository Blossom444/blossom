'use client';

import { useState } from 'react';
import { meditations } from '@/data/meditations';
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

interface UserManagementProps {
  users: User[];
  onUpdateUser: (userId: string, updates: Partial<User>) => Promise<void>;
  onDeleteUser: (userId: string) => Promise<void>;
}

export default function UserManagement({ users, onUpdateUser, onDeleteUser }: UserManagementProps) {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    setLoading(prev => ({ ...prev, [userId]: true }));
    try {
      await onUpdateUser(userId, { role: newRole });
    } finally {
      setLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const handleAccessToggle = async (userId: string, type: 'meditation' | 'practice', id: string) => {
    const key = `${userId}-${type}-${id}`;
    setLoading(prev => ({ ...prev, [key]: true }));
    try {
      const user = users.find(u => u._id === userId);
      if (!user) return;

      const currentAccess = type === 'meditation' 
        ? user.accessibleMeditations 
        : user.accessiblePractices;

      const newAccess = currentAccess.includes(id)
        ? currentAccess.filter(item => item !== id)
        : [...currentAccess, id];

      await onUpdateUser(userId, {
        [type === 'meditation' ? 'accessibleMeditations' : 'accessiblePractices']: newAccess
      });
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Ви впевнені, що хочете видалити цього користувача?')) {
      return;
    }

    setLoading(prev => ({ ...prev, [userId]: true }));
    try {
      await onDeleteUser(userId);
    } finally {
      setLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Управління користувачами</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ім'я</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Роль</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Медитації</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Практики</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дії</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value as 'user' | 'admin')}
                    disabled={loading[user._id]}
                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="user">Користувач</option>
                    <option value="admin">Адміністратор</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <select
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const value = e.target.value;
                        if (value) {
                          handleAccessToggle(user._id, 'meditation', value);
                        }
                      }}
                      disabled={loading[`${user._id}-meditation`]}
                    >
                      <option value="">Виберіть медитацію</option>
                      {meditations.map((meditation) => (
                        <option key={meditation.id} value={meditation.id}>
                          {meditation.title} {user.accessibleMeditations.includes(meditation.id) ? '✓' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <select
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const value = e.target.value;
                        if (value) {
                          handleAccessToggle(user._id, 'practice', value);
                        }
                      }}
                      disabled={loading[`${user._id}-practice`]}
                    >
                      <option value="">Виберіть практику</option>
                      {practices.map((practice) => (
                        <option key={practice.id} value={practice.id}>
                          {practice.title} {user.accessiblePractices.includes(practice.id) ? '✓' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    disabled={loading[user._id]}
                    className="text-red-600 hover:text-red-900 focus:outline-none focus:underline"
                  >
                    Видалити
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 