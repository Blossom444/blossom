'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Визначаємо інтерфейс для медитацій прямо в компоненті
interface Meditation {
  id: string;
  title: string;
  duration: string;
  description: string;
  variant: 'purple' | 'blue' | 'green' | 'orange' | 'red' | 'yellow';
  audioUrl: string;
  isPremium: boolean;
  category?: string;
}

// Статичні дані для тестування
const testMeditations: Meditation[] = [
  {
    id: 'test-1',
    title: "Тестова медитація 1",
    duration: "10 хв",
    description: "Опис медитації 1",
    variant: 'purple',
    audioUrl: "/test.mp3",
    isPremium: false,
    category: 'Тест'
  },
  {
    id: 'test-2',
    title: "Тестова медитація 2",
    duration: "15 хв",
    description: "Опис медитації 2",
    variant: 'blue',
    audioUrl: "/test.mp3",
    isPremium: true,
    category: 'Тест'
  },
  {
    id: 'test-3',
    title: "Тестова медитація 3",
    duration: "20 хв",
    description: "Опис медитації 3",
    variant: 'green',
    audioUrl: "/test.mp3",
    isPremium: false,
    category: 'Тест'
  },
  {
    id: 'test-4',
    title: "Тестова медитація 4",
    duration: "25 хв",
    description: "Опис медитації 4",
    variant: 'orange',
    audioUrl: "/test.mp3",
    isPremium: true,
    category: 'Тест'
  }
];

export default function TestMeditationsPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Форсуємо ререндер після монтування
    setLoaded(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Тестові медитації ({testMeditations.length})</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {testMeditations.map((meditation) => (
          <div key={meditation.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-br aspect-w-16 aspect-h-9 relative"
                style={{
                  backgroundColor: 
                    meditation.variant === 'purple' ? '#9061F9' :
                    meditation.variant === 'blue' ? '#3B82F6' :
                    meditation.variant === 'green' ? '#10B981' :
                    meditation.variant === 'orange' ? '#F97316' :
                    meditation.variant === 'red' ? '#EF4444' : '#F59E0B'
                }}
            >
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
                <span className="text-primary hover:text-primary-600 font-medium text-sm">
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
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Перевірка в реальному часі:</h2>
        <p className="mb-2">✅ Сторінка завантажена: {loaded ? 'Так' : 'Ні'}</p>
        <p className="mb-2">✅ Кількість тестових медитацій: {testMeditations.length}</p>
        <p className="mb-4">✅ Час завантаження: {new Date().toLocaleTimeString()}</p>
        
        <div className="flex space-x-4">
          <Link 
            href="/meditations" 
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600"
          >
            Перейти до звичайних медитацій
          </Link>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Оновити сторінку
          </button>
        </div>
      </div>
    </div>
  );
} 