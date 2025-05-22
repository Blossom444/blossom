'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  role: 'user' | 'admin';
  isBlocked: boolean;
  lastActive: string;
}

export default function AdminPanel() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login');
      return;
    }

    // Тимчасові тестові дані
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'user1@example.com',
        name: 'Користувач 1',
        isPremium: false,
        role: 'user',
        isBlocked: false,
        lastActive: new Date().toISOString()
      },
      {
        id: '2',
        email: 'admin@blossom.com',
        name: 'Адміністратор',
        isPremium: true,
        role: 'admin',
        isBlocked: false,
        lastActive: new Date().toISOString()
      }
    ];

    setUsers(mockUsers);
    setLoading(false);
  }, [user, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Адмін-панель</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-primary/10 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Всього користувачів</p>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Преміум користувачів</p>
          <p className="text-2xl font-bold">
            {users.filter(u => u.isPremium).length}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Заблокованих</p>
          <p className="text-2xl font-bold">
            {users.filter(u => u.isBlocked).length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Користувачі</h2>
          <div className="space-y-4">
            {users.map(user => (
              <div 
                key={user.id}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <div className="flex gap-2">
                    {user.isPremium && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Преміум
                      </span>
                    )}
                    {user.role === 'admin' && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Адмін
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 