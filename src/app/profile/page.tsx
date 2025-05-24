'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  isPremium: boolean;
}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users/me');
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Особистий кабінет</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Профіль</TabsTrigger>
          <TabsTrigger value="meditations">Мої медитації</TabsTrigger>
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
              <CardTitle>Мої медитації</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Тут будуть відображатися ваші медитації</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Налаштування</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  Змінити пароль
                </Button>
                <Button variant="outline" className="w-full">
                  Оновити профіль
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 