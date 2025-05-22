'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

// Вбудовані дані медитацій для уникнення проблем імпорту
const hardcodedMeditations = [
  {
    id: 'meditation-1',
    title: "Наміри на новий день",
    duration: "15 хв",
    description: "Медитація для встановлення позитивних намірів та цілей на день.",
    variant: 'orange',
    audioUrl: "/audio/meditations/morning-meditation.mp3",
    isPremium: false,
    category: 'Ранкові'
  },
  {
    id: 'meditation-2',
    title: "Тут і зараз",
    duration: "20 хв",
    description: "Практика усвідомленості для повного занурення в теперішній момент.",
    variant: 'blue',
    audioUrl: "/audio/meditations/mindfulness.mp3",
    isPremium: false,
    category: 'Усвідомленість'
  },
  {
    id: 'meditation-3',
    title: "Внутрішня гармонія",
    duration: "10 хв",
    description: "Медитація для досягнення балансу між розумом та емоціями.",
    variant: 'purple',
    audioUrl: "/audio/meditations/harmony.mp3",
    isPremium: false,
    category: 'Вечірні'
  },
  {
    id: 'meditation-4',
    title: "Глибоке розслаблення",
    duration: "12 хв",
    description: "Практика для повного розслаблення тіла та розуму.",
    variant: 'green',
    audioUrl: "/audio/meditations/relaxation.mp3",
    isPremium: true,
    category: 'Розслаблення'
  }
];

export default function MeditationsPage() {
  const { user } = useAuth();
  const [loaded, setLoaded] = useState(false);
  const [displayTime, setDisplayTime] = useState('');

  useEffect(() => {
    setLoaded(true);
    setDisplayTime(new Date().toLocaleTimeString());
    
    // Оновлювати час кожну секунду для демонстрації активності компонента
    const timer = setInterval(() => {
      setDisplayTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
        Медитації ({hardcodedMeditations.length})
      </h1>
      
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm">✅ Сторінка завантажена: {loaded ? 'Так' : 'Ні'}</p>
        <p className="text-sm">⏰ Час: {displayTime}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {hardcodedMeditations.map((meditation) => (
          <div key={meditation.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 relative"
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

      <div className="mt-6 flex justify-center">
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600"
        >
          Оновити сторінку
        </button>
      </div>
      
      <div className="mt-6">
        <p className="text-center text-sm text-gray-500">
          Якщо медитації не з'являються, спробуйте очистити кеш браузера або відкрити сторінку в режимі інкогніто.
        </p>
      </div>
    </div>
  );
} 