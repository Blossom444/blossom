'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
  isPremium: boolean;
  accessibleMeditations: string[];
  accessiblePractices: string[];
}

interface Meditation {
  _id: string;
  title: string;
  description: string;
  duration: number;
  category: string;
}

interface Practice {
  _id: string;
  title: string;
  description: string;
  duration: number;
  category: string;
}

export default function ProfileClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [practices, setPractices] = useState<Practice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Форми
  const [updateProfileForm, setUpdateProfileForm] = useState({
    name: '',
    email: '',
  });

  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users/me');
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setUpdateProfileForm({
            name: data.name,
            email: data.email,
          });

          // Отримуємо деталі медитацій
          if (data.accessibleMeditations?.length) {
            const meditationsResponse = await fetch('/api/meditations');
            if (meditationsResponse.ok) {
              const allMeditations = await meditationsResponse.json();
              const accessibleMeditations = allMeditations.filter((meditation: Meditation) =>
                data.accessibleMeditations.includes(meditation._id)
              );
              setMeditations(accessibleMeditations);
            }
          }

          // Отримуємо деталі практик
          if (data.accessiblePractices?.length) {
            const practicesResponse = await fetch('/api/practices');
            if (practicesResponse.ok) {
              const allPractices = await practicesResponse.json();
              const accessiblePractices = allPractices.filter((practice: Practice) =>
                data.accessiblePractices.includes(practice._id)
              );
              setPractices(accessiblePractices);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Помилка завантаження даних');
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchUserData();
    }
  }, [session]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/users/${userData?._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateProfileForm),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      setSuccess('Профіль успішно оновлено');
    } catch (error) {
      setError('Помилка оновлення профілю');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (changePasswordForm.newPassword !== changePasswordForm.confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: changePasswordForm.currentPassword,
          newPassword: changePasswordForm.newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      setSuccess('Пароль успішно змінено');
      setChangePasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      setError('Помилка зміни паролю');
    }
  };

  const handleNavigateToContent = (type: 'meditation' | 'practice', id: string) => {
    router.push(`/${type}s/${id}`);
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Особистий кабінет</h1>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-500 p-4 rounded-md mb-4">
          {success}
        </div>
      )}

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Профіль</TabsTrigger>
          <TabsTrigger value="meditations">Медитації</TabsTrigger>
          <TabsTrigger value="practices">Практики</TabsTrigger>
          <TabsTrigger value="settings">Налаштування</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Інформація профілю</CardTitle>
            </CardHeader>
            <CardContent>
              {userData && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Ім'я</p>
                    <p className="text-lg">{userData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-lg">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Статус</p>
                    <p className="text-lg">
                      {userData.isPremium ? 'Premium' : 'Базовий'}
                    </p>
                  </div>
                  {userData.role === 'admin' && (
                    <div>
                      <p className="text-sm font-medium">Роль</p>
                      <p className="text-lg">Адміністратор</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meditations">
          <Card>
            <CardHeader>
              <CardTitle>Доступні медитації</CardTitle>
            </CardHeader>
            <CardContent>
              {meditations.length > 0 ? (
                <div className="grid gap-4">
                  {meditations.map((meditation) => (
                    <div
                      key={meditation._id}
                      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleNavigateToContent('meditation', meditation._id)}
                    >
                      <h3 className="font-medium text-lg">{meditation.title}</h3>
                      <p className="text-gray-600 mt-1">{meditation.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>{meditation.duration} хв</span>
                        <span>{meditation.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>У вас поки немає доступних медитацій</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practices">
          <Card>
            <CardHeader>
              <CardTitle>Доступні практики</CardTitle>
            </CardHeader>
            <CardContent>
              {practices.length > 0 ? (
                <div className="grid gap-4">
                  {practices.map((practice) => (
                    <div
                      key={practice._id}
                      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleNavigateToContent('practice', practice._id)}
                    >
                      <h3 className="font-medium text-lg">{practice.title}</h3>
                      <p className="text-gray-600 mt-1">{practice.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>{practice.duration} хв</span>
                        <span>{practice.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>У вас поки немає доступних практик</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Оновити профіль</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Ім'я</Label>
                    <Input
                      id="name"
                      value={updateProfileForm.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdateProfileForm(prev => ({
                        ...prev,
                        name: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={updateProfileForm.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdateProfileForm(prev => ({
                        ...prev,
                        email: e.target.value
                      }))}
                    />
                  </div>
                  <Button type="submit">Оновити профіль</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Змінити пароль</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Поточний пароль</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={changePasswordForm.currentPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChangePasswordForm(prev => ({
                        ...prev,
                        currentPassword: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">Новий пароль</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={changePasswordForm.newPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChangePasswordForm(prev => ({
                        ...prev,
                        newPassword: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Підтвердіть новий пароль</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={changePasswordForm.confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChangePasswordForm(prev => ({
                        ...prev,
                        confirmPassword: e.target.value
                      }))}
                    />
                  </div>
                  <Button type="submit">Змінити пароль</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 