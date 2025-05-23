'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import GradientCover from '@/components/GradientCover';
import MeditationCard from '@/components/MeditationCard';

interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: string;
  isPremium: boolean;
  audioUrl: string;
  imageUrl: string;
  variant: 'orange' | 'blue' | 'purple' | 'green' | 'red' | 'yellow';
}

export default function MeditationsPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = [
    { id: 'all', name: 'Всі' },
    { id: 'stress', name: 'Стрес' },
    { id: 'sleep', name: 'Сон' },
    { id: 'anxiety', name: 'Тривога' },
    { id: 'focus', name: 'Концентрація' },
    { id: 'gratitude', name: 'Вдячність' }
  ];

  const meditations: Meditation[] = [
    {
      id: '1',
      title: 'Спокійний вечір',
      description: 'Медитація для розслаблення та підготовки до сну',
      duration: 15,
      category: 'sleep',
      isPremium: false,
      audioUrl: '/meditations/calm-evening.mp3',
      imageUrl: '/images/meditation-1.jpg',
      variant: 'purple'
    },
    {
      id: '2',
      title: 'Зняття стресу',
      description: 'Медитація для зняття напруження та стресу',
      duration: 10,
      category: 'stress',
      isPremium: true,
      audioUrl: '/meditations/stress-relief.mp3',
      imageUrl: '/images/meditation-2.jpg',
      variant: 'orange'
    },
    {
      id: '3',
      title: 'Глибокий сон',
      description: 'Медитація для глибокого та відновлюючого сну',
      duration: 20,
      category: 'sleep',
      isPremium: false,
      audioUrl: '/meditations/deep-sleep.mp3',
      imageUrl: '/images/meditation-3.jpg',
      variant: 'blue'
    },
    {
      id: '4',
      title: 'Концентрація уваги',
      description: 'Медитація для покращення концентрації та фокусу',
      duration: 12,
      category: 'focus',
      isPremium: true,
      audioUrl: '/meditations/focus.mp3',
      imageUrl: '/images/meditation-4.jpg',
      variant: 'green'
    },
    {
      id: '5',
      title: 'Практика вдячності',
      description: 'Медитація для розвитку почуття вдячності',
      duration: 8,
      category: 'gratitude',
      isPremium: false,
      audioUrl: '/meditations/gratitude.mp3',
      imageUrl: '/images/meditation-5.jpg',
      variant: 'yellow'
    },
    {
      id: '6',
      title: 'Зменшення тривоги',
      description: 'Медитація для зменшення тривожності',
      duration: 15,
      category: 'anxiety',
      isPremium: true,
      audioUrl: '/meditations/anxiety-relief.mp3',
      imageUrl: '/images/meditation-6.jpg',
      variant: 'red'
    },
    {
      id: '7',
      title: 'Ранкова медитація',
      description: 'Енергійна медитація для початку дня',
      duration: 10,
      category: 'focus',
      isPremium: false,
      audioUrl: '/meditations/morning.mp3',
      imageUrl: '/images/meditation-7.jpg',
      variant: 'orange'
    },
    {
      id: '8',
      title: 'Вечірнє розслаблення',
      description: 'Медитація для розслаблення після важкого дня',
      duration: 15,
      category: 'stress',
      isPremium: true,
      audioUrl: '/meditations/evening-relax.mp3',
      imageUrl: '/images/meditation-8.jpg',
      variant: 'purple'
    },
    {
      id: '9',
      title: 'Медитація вдячності',
      description: 'Практика вдячності за щоденні радощі',
      duration: 10,
      category: 'gratitude',
      isPremium: false,
      audioUrl: '/meditations/daily-gratitude.mp3',
      imageUrl: '/images/meditation-9.jpg',
      variant: 'yellow'
    },
    {
      id: '10',
      title: 'Спокійний сон',
      description: 'Медитація для спокійного та міцного сну',
      duration: 20,
      category: 'sleep',
      isPremium: true,
      audioUrl: '/meditations/peaceful-sleep.mp3',
      imageUrl: '/images/meditation-10.jpg',
      variant: 'blue'
    },
    {
      id: '11',
      title: 'Зняття напруження',
      description: 'Медитація для зняття фізичного та емоційного напруження',
      duration: 15,
      category: 'stress',
      isPremium: false,
      audioUrl: '/meditations/tension-relief.mp3',
      imageUrl: '/images/meditation-11.jpg',
      variant: 'green'
    },
    {
      id: '12',
      title: 'Медитація фокусу',
      description: 'Покращення концентрації та продуктивності',
      duration: 12,
      category: 'focus',
      isPremium: true,
      audioUrl: '/meditations/productivity.mp3',
      imageUrl: '/images/meditation-12.jpg',
      variant: 'orange'
    },
    {
      id: '13',
      title: 'Зменшення тривожності',
      description: 'Медитація для зменшення тривоги та страху',
      duration: 15,
      category: 'anxiety',
      isPremium: false,
      audioUrl: '/meditations/anxiety.mp3',
      imageUrl: '/images/meditation-13.jpg',
      variant: 'red'
    },
    {
      id: '14',
      title: 'Вдячність за життя',
      description: 'Медитація для розвитку вдячності за все хороше',
      duration: 10,
      category: 'gratitude',
      isPremium: true,
      audioUrl: '/meditations/life-gratitude.mp3',
      imageUrl: '/images/meditation-14.jpg',
      variant: 'yellow'
    },
    {
      id: '15',
      title: 'Глибоке розслаблення',
      description: 'Медитація для глибокого розслаблення та відновлення',
      duration: 20,
      category: 'stress',
      isPremium: false,
      audioUrl: '/meditations/deep-relaxation.mp3',
      imageUrl: '/images/meditation-15.jpg',
      variant: 'purple'
    }
  ];

  const filteredMeditations = selectedCategory === 'all'
    ? meditations
    : meditations.filter(m => m.category === selectedCategory);

  const totalPages = Math.ceil(filteredMeditations.length / itemsPerPage);
  const paginatedMeditations = filteredMeditations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <GradientCover title="Медитації" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Медитації</h1>
        
        {/* Категорії */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-[#8B4513] text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Сітка медитацій */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedMeditations.map(meditation => (
            <MeditationCard
              key={meditation.id}
              meditation={meditation}
              isAccessible={!!user && (!meditation.isPremium || user.isPremium)}
            />
          ))}
        </div>

        {/* Пагінація */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-all duration-300"
            >
              Попередня
            </button>
            <span className="px-4 py-2 text-white">
              Сторінка {currentPage} з {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-all duration-300"
            >
              Наступна
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 