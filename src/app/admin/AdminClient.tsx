'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isPremium: boolean;
  accessibleMeditations: string[];
  accessiblePractices: string[];
}

export default function AdminClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Помилка завантаження користувачів');
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchUsers();
    }
  }, [session]);

  const handleUpdateUser = async (userId: string, updates: Partial<User>) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();
      setUsers(users.map(user => 
        user._id === updatedUser._id ? updatedUser : user
      ));
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Помилка оновлення користувача');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Помилка видалення користувача');
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!session?.user || session.user.role !== 'admin') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Адмін панель</h1>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-4">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Користувачі</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length > 0 ? (
            <div className="grid gap-4">
              {users.map((user) => (
                <div key={user._id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">Роль:</span> {user.role}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Статус:</span>{' '}
                          {user.isPremium ? 'Premium' : 'Базовий'}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Медитації:</span>{' '}
                          {user.accessibleMeditations.length}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Практики:</span>{' '}
                          {user.accessiblePractices.length}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleUpdateUser(user._id, {
                          isPremium: !user.isPremium
                        })}
                      >
                        {user.isPremium ? 'Забрати Premium' : 'Надати Premium'}
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Видалити
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Користувачів не знайдено</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 