'use client';

import { useState } from 'react';
import MeditationCard from './MeditationCard';

interface Meditation {
  id: string;
  title: string;
  duration: number;
  description: string;
  variant: 'orange' | 'blue' | 'purple' | 'green' | 'red' | 'yellow';
  audioUrl?: string;
  videoUrl?: string;
  isPremium: boolean;
  category: string;
}

interface User {
  accessibleMeditations: string[];
  accessiblePractices: string[];
  isPremium: boolean;
}

interface AccessibleContentProps {
  user: User;
}

export default function AccessibleContent({ user }: AccessibleContentProps) {
  const [activeTab, setActiveTab] = useState<'meditations' | 'practices'>('meditations');

  const meditations: Meditation[] = [
    {
      id: '1',
      title: 'Спокійне дихання',
      duration: 10,
      description: 'Медитація для заспокоєння та зосередження',
      variant: 'purple',
      audioUrl: '/meditations/breathing.mp3',
      isPremium: false,
      category: 'Дихання'
    },
    {
      id: '2',
      title: 'Глибока релаксація',
      duration: 15,
      description: 'Медитація для глибокого розслаблення',
      variant: 'purple',
      audioUrl: '/meditations/relaxation.mp3',
      isPremium: true,
      category: 'Релаксація'
    },
    // Додайте більше медитацій за потреби
  ];

  const practices: Meditation[] = [
    {
      id: '1',
      title: 'Йога для початківців',
      duration: 20,
      description: 'Базові асани для початківців',
      variant: 'purple',
      videoUrl: '/practices/yoga-basics.mp4',
      isPremium: false,
      category: 'Йога'
    },
    {
      id: '2',
      title: 'Розтяжка',
      duration: 15,
      description: 'Комплекс вправ для розтяжки',
      variant: 'purple',
      videoUrl: '/practices/stretching.mp4',
      isPremium: true,
      category: 'Розтяжка'
    },
    // Додайте більше практик за потреби
  ];

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          className={`pb-2 px-4 ${
            activeTab === 'meditations'
              ? 'border-b-2 border-purple-600 text-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('meditations')}
        >
          Медитації
        </button>
        <button
          className={`pb-2 px-4 ${
            activeTab === 'practices'
              ? 'border-b-2 border-purple-600 text-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('practices')}
        >
          Практики
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'meditations' ? (
          meditations.map((meditation) => (
            <MeditationCard
              key={meditation.id}
              meditation={meditation}
              isAccessible={user.isPremium || user.accessibleMeditations.includes(meditation.id)}
            />
          ))
        ) : (
          practices.map((practice) => (
            <MeditationCard
              key={practice.id}
              meditation={practice}
              isAccessible={user.isPremium || user.accessiblePractices.includes(practice.id)}
            />
          ))
        )}
      </div>
    </div>
  );
} 