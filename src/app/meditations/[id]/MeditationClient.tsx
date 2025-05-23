'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import GradientCover from '@/components/GradientCover';
import AudioPlayer from '@/components/AudioPlayer';

interface Meditation {
  id: string;
  title: string;
  duration: string;
  description: string;
  variant: 'purple' | 'blue' | 'green' | 'orange' | 'red' | 'yellow';
  audioUrl: string;
  isPremium: boolean;
  category: string;
}

interface MeditationClientProps {
  meditation: Meditation;
}

const convertDurationToSeconds = (duration: string): number => {
  const [minutes, seconds] = duration.split(':').map(Number);
  return minutes * 60 + seconds;
};

export default function MeditationClient({ meditation }: MeditationClientProps) {
  const { hasPremiumAccess, hasMeditationAccess } = useAuth();
  const hasAccess = !meditation.isPremium || hasPremiumAccess() || hasMeditationAccess(meditation.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        href="/meditations"
        className="inline-flex items-center text-gray-600 hover:text-primary mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Назад до медитацій
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative aspect-video">
          <GradientCover
            title={meditation.title}
            subtitle={meditation.duration}
            variant={meditation.variant}
            imageUrl={`/images/meditations/${meditation.id}.jpg`}
          />
          {meditation.isPremium && (
            <div className="absolute top-4 right-4 bg-yellow-400 text-sm px-3 py-1 rounded-full">
              Premium
            </div>
          )}
        </div>

        <div className="p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">{meditation.title}</h1>
          <p className="text-gray-600 mb-6">{meditation.description}</p>

          {hasAccess ? (
            <AudioPlayer 
              src={meditation.audioUrl}
              title={meditation.title}
              initialDuration={convertDurationToSeconds(meditation.duration)}
              variant={meditation.variant}
            />
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2">Потрібен преміум доступ</h3>
              <p className="text-gray-600 mb-4">
                Ця медитація доступна тільки для користувачів з преміум доступом.
              </p>
              <Link
                href="/premium"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Отримати преміум доступ
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 