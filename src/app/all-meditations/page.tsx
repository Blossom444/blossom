'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Визначаємо інтерфейс для медитацій
interface Meditation {
  id: string;
  title: string;
  duration: string;
  description: string;
  variant: 'purple' | 'blue' | 'green' | 'orange' | 'red' | 'yellow';
  isPremium: boolean;
  category?: string;
}

// Розширений список медитацій - 8 штук
const extendedMeditations: Meditation[] = [
  {
    id: 'meditation-1',
    title: "Наміри на новий день",
    duration: "15 хв",
    description: "Медитація для встановлення позитивних намірів та цілей на день.",
    variant: 'orange',
    isPremium: false,
    category: 'Ранкові'
  },
  {
    id: 'meditation-2',
    title: "Тут і зараз",
    duration: "20 хв",
    description: "Практика усвідомленості для повного занурення в теперішній момент.",
    variant: 'blue',
    isPremium: false,
    category: 'Усвідомленість'
  },
  {
    id: 'meditation-3',
    title: "Внутрішня гармонія",
    duration: "10 хв",
    description: "Медитація для досягнення балансу між розумом та емоціями.",
    variant: 'purple',
    isPremium: false,
    category: 'Вечірні'
  },
  {
    id: 'meditation-4',
    title: "Глибоке розслаблення",
    duration: "12 хв",
    description: "Практика для повного розслаблення тіла та розуму.",
    variant: 'green',
    isPremium: false,
    category: 'Розслаблення'
  },
  {
    id: 'meditation-5',
    title: "Зцілення та відновлення",
    duration: "18 хв",
    description: "Медитація для активації природних сил самозцілення організму.",
    variant: 'red',
    isPremium: false,
    category: "Здоров'я"
  },
  {
    id: 'meditation-6',
    title: "Спокійний сон",
    duration: "25 хв",
    description: "Вечірня практика для глибокого розслаблення та підготовки до здорового сну.",
    variant: 'blue',
    isPremium: false,
    category: 'Сон'
  },
  {
    id: 'meditation-7',
    title: "Енергія та бадьорість",
    duration: "10 хв",
    description: "Ранкова медитація для пробудження тіла та розуму.",
    variant: 'yellow',
    isPremium: false,
    category: 'Енергія'
  },
  {
    id: 'meditation-8',
    title: "Прийняття себе",
    duration: "15 хв",
    description: "Практика для розвитку самоприйняття та любові до себе.",
    variant: 'purple',
    isPremium: false,
    category: 'Усвідомленість'
  }
];

export default function AllMeditationsPage() {
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    setLoaded(true);
    setTime(new Date().toLocaleTimeString());
    
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Всі медитації ({extendedMeditations.length})</h1>
      
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm">✅ Сторінка завантажена: {loaded ? 'Так' : 'Ні'}</p>
        <p className="text-sm">⏰ Поточний час: {time}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {extendedMeditations.map((meditation) => (
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
      
      <div className="mt-6 flex justify-center space-x-4">
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600"
        >
          Оновити сторінку
        </button>
        <Link
          href="/meditations"
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          До звичайних медитацій
        </Link>
      </div>
    </div>
  );
} 