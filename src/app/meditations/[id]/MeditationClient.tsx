'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AudioPlayer from '@/components/AudioPlayer';
import Link from 'next/link';
import GradientCover from '@/components/GradientCover';

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

const allMeditations: Meditation[] = [
  {
    id: '1',
    title: 'Спокійний вечір',
    description: 'Медитація для розслаблення та підготовки до сну',
    duration: 15,
    category: 'sleep',
    isPremium: false,
    audioUrl: '/meditations/calm-evening.mp3',
    imageUrl: '/images/meditations/meditation-1.jpg',
    variant: 'purple'
  },
  // ... інші медитації ...
];

export default function MeditationClient({ id }: { id: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const [meditation, setMeditation] = useState<Meditation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundMeditation = allMeditations.find(m => m.id === id);
    if (foundMeditation) {
      setMeditation(foundMeditation);
    }
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B4513]"></div>
      </div>
    );
  }

  if (!meditation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Медитацію не знайдено</h1>
          <button
            onClick={() => router.push('/meditations')}
            className="px-6 py-3 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors"
          >
            Повернутися до списку
          </button>
        </div>
      </div>
    );
  }

  const isAccessible = !meditation.isPremium || (user?.isPremium ?? false);

  if (!isAccessible) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Потрібен преміум доступ</h1>
          <p className="text-gray-600 mb-6">Ця медитація доступна тільки для преміум користувачів</p>
          <button
            onClick={() => router.push('/premium')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all"
          >
            Отримати преміум доступ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="relative rounded-lg overflow-hidden shadow-xl mb-8">
          <img
            src={meditation.imageUrl}
            alt={meditation.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{meditation.title}</h1>
            <p className="text-lg opacity-90">{meditation.description}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <AudioPlayer
            audioUrl={meditation.audioUrl}
            title={meditation.title}
          />
        </div>
      </div>
    </div>
  );
} 