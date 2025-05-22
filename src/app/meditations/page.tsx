'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GradientCover from '@/components/GradientCover';
import { meditations } from '@/data/meditations';
import { useAuth } from '@/contexts/AuthContext';

export default function MeditationsPage() {
  const { user } = useAuth();
  const [showMeditations, setShowMeditations] = useState(false);

  // Примусовий ререндер для оновлення даних
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMeditations(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
        Медитації ({meditations.length})
      </h1>
      
      {!showMeditations ? (
        <div className="flex justify-center p-10">
          <p>Завантаження...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {meditations.map((meditation) => (
            <div key={meditation.id} className="bg-white rounded-lg shadow-md">
              <div className="aspect-w-16 aspect-h-9 relative">
                <GradientCover 
                  title={meditation.title}
                  variant={meditation.variant}
                  showTitle={false}
                />
                {meditation.isPremium && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-0.5 rounded text-xs font-medium">
                    Преміум
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-base font-medium mb-1">{meditation.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{meditation.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{meditation.duration}</span>
                  <Link 
                    href={`/meditations/${meditation.id}`}
                    className="text-primary hover:text-primary-600 font-medium text-sm"
                  >
                    Почати →
                  </Link>
                </div>
                {meditation.category && (
                  <div className="mt-1">
                    <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                      {meditation.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 