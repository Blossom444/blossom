'use client';

import Link from 'next/link';

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
  isAccessible: boolean;
}

export default function MeditationCard({ meditation, isAccessible }: MeditationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {meditation.imageUrl && (
        <img
          src={meditation.imageUrl}
          alt={meditation.title}
          className="w-full h-40 object-cover mb-4"
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{meditation.title}</h3>
          <span className="text-sm text-gray-500">{meditation.duration} хв</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{meditation.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
            {meditation.category}
          </span>
          {meditation.isPremium && (
            <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              Premium
            </span>
          )}
        </div>
        <div className="mt-4">
          {isAccessible ? (
            <Link
              href={`/meditations/${meditation.id}`}
              className="block w-full text-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Почати медитацію
            </Link>
          ) : (
            <Link
              href="/premium"
              className="block w-full text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
            >
              Отримати доступ
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 