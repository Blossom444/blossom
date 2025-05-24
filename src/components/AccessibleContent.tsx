'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import MeditationCard from './MeditationCard';

interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: string;
  isPremium: boolean;
  audioUrl: string;
  imageUrl: string;
  variant: 'orange' | 'blue' | 'purple' | 'green' | 'red' | 'yellow';
}

interface AccessibleContentProps {
  meditations: Meditation[];
}

interface UserData {
  id: string;
  name: string | null;
  email: string | null;
  role: 'user' | 'admin';
  isPremium: boolean;
  accessibleMeditations?: string[];
}

export default function AccessibleContent({ meditations }: AccessibleContentProps) {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user) {
        try {
          const response = await fetch('/api/users/me');
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false);
    };

    if (status !== 'loading') {
      fetchUserData();
    }
  }, [session, status]);

  if (status === 'loading' || loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-2">Завантаження...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold mb-4">Будь ласка, увійдіть в систему</h2>
        <p className="text-gray-600">
          Для доступу до медитацій вам потрібно увійти в систему або зареєструватися.
        </p>
      </div>
    );
  }

  const accessibleMeditations = meditations.filter(meditation => 
    !meditation.isPremium || 
    userData?.isPremium || 
    userData?.accessibleMeditations?.includes(meditation.id)
  );

  if (accessibleMeditations.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold mb-4">Немає доступних медитацій</h2>
        <p className="text-gray-600">
          У вас немає доступу до жодної медитації. Отримайте преміум доступ для отримання доступу до всіх медитацій.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {accessibleMeditations.map(meditation => (
        <MeditationCard
          key={meditation.id}
          meditation={meditation}
        />
      ))}
    </div>
  );
} 