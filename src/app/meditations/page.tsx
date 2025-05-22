'use client';

import { useState } from 'react';
import Link from 'next/link';
import GradientCover from '@/components/GradientCover';
import { meditations, Meditation } from '@/data/meditations';
import { useAuth } from '@/contexts/AuthContext';

export default function MeditationsPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(meditations.map(m => m.category || 'Інші')))];

  // Filter meditations by category
  const filteredMeditations = selectedCategory === 'all'
    ? meditations
    : meditations.filter(m => m.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">Медитації</h1>
      
      {/* Categories filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredMeditations.map((meditation) => (
          <Link 
            key={meditation.id}
            href={`/meditations/${meditation.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-9 sm:aspect-square relative">
              <GradientCover 
                title={meditation.title}
                variant={meditation.variant}
              />
              {meditation.isPremium && (
                <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded text-sm font-medium">
                  Преміум
                </div>
              )}
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{meditation.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-2">{meditation.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{meditation.duration}</span>
                <span className="text-primary hover:text-primary-600 font-medium text-sm sm:text-base">
                  Почати →
                </span>
              </div>
              {meditation.category && (
                <div className="mt-2">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
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