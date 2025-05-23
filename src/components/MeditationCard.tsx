'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

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
  imageUrl?: string;
}

interface MeditationCardProps {
  meditation: Meditation;
}

export default function MeditationCard({ meditation }: MeditationCardProps) {
  const { user } = useAuth();
  const isAccessible = !meditation.isPremium || user?.isPremium;

  return (
    <Link 
      href={isAccessible ? `/meditations/${meditation.id}` : '/subscription'}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {meditation.imageUrl && (
        <div className="relative h-48 w-full">
          <img
            src={meditation.imageUrl}
            alt={meditation.title}
            className="w-full h-full object-cover"
          />
          {meditation.isPremium && (
            <div className="absolute top-2 right-2">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                Premium
              </span>
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{meditation.title}</h3>
          <span className="text-sm text-gray-500">{meditation.duration} хв</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{meditation.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {meditation.category}
          </span>
          <button
            className={`px-4 py-2 rounded-lg text-white transition-colors ${
              isAccessible
                ? 'bg-[#8B4513] hover:bg-[#6B3410]'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isAccessible ? 'Слухати' : 'Преміум'}
          </button>
        </div>
      </div>
    </Link>
  );
} 