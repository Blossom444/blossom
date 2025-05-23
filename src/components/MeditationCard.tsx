'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface MeditationCardProps {
  meditation: {
    id: string;
    title: string;
    description: string;
    duration: number;
    category: string;
    isPremium: boolean;
    audioUrl: string;
    imageUrl: string;
    variant: 'orange' | 'blue' | 'purple' | 'green' | 'red' | 'yellow';
  };
}

export default function MeditationCard({ meditation }: MeditationCardProps) {
  const { user } = useAuth();
  const isAccessible = !meditation.isPremium || (user?.isPremium ?? false);

  const cardContent = (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={meditation.imageUrl}
            alt={meditation.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-semibold mb-1">{meditation.title}</h3>
          <p className="text-sm opacity-90 mb-2">{meditation.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm">{meditation.duration} хв</span>
            {meditation.isPremium && (
              <span className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                Premium
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (!isAccessible) {
    return (
      <div className="relative">
        {cardContent}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
          <Link
            href="/premium"
            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300"
          >
            Отримати доступ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/meditations/${meditation.id}`}>
      {cardContent}
    </Link>
  );
} 