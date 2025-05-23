'use client';

import { useAuth } from '@/contexts/AuthContext';
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

export default function AccessibleContent({ meditations }: AccessibleContentProps) {
  const { user } = useAuth();

  if (!user) {
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
    !meditation.isPremium || user.isPremium || user.accessibleMeditations.includes(meditation.id)
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