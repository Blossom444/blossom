'use client';

import { useState } from 'react';
import Link from 'next/link';
import GradientCover from '@/components/GradientCover';
import { meditations } from '@/data/meditations';
import { useAuth } from '@/contexts/AuthContext';

export default function MeditationsPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  console.log('All meditations:', meditations);
  console.log('Meditations length:', meditations.length);

  // Отримуємо унікальні категорії
  const categories = ['all', ...Array.from(new Set(meditations.map(m => m.category || 'Інші')))];

  // Фільтруємо медитації за категорією
  const filteredMeditations = selectedCategory === 'all'
    ? meditations
    : meditations.filter(m => m.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">Медитації</h1>
      
      {/* Фільтр категорій */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex flex-nowrap gap-2 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                ${selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {category === 'all' ? 'Всі' : category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {filteredMeditations.map((meditation) => (
          <Link 
            key={meditation.id}
            href={`/meditations/${meditation.id}`}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
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
            <div className="p-2 sm:p-3">
              <h3 className="text-sm sm:text-base font-medium mb-1 line-clamp-1">{meditation.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{meditation.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{meditation.duration}</span>
                <span className="text-primary hover:text-primary-600 font-medium text-xs sm:text-sm">
                  Почати →
                </span>
              </div>
              {meditation.category && (
                <div className="mt-1">
                  <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                    {meditation.category}
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 