'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Повний список всіх медитацій
const allMeditations = [
  {
    id: 'meditation-1',
    title: "Наміри на день",
    duration: "6:00",
    description: "Медитація для встановлення позитивних намірів та цілей на день.",
    variant: 'orange',
    audioUrl: "/audio/meditations/morning-meditation.mp3",
    isPremium: false,
    category: 'Ранкові'
  },
  {
    id: 'meditation-2',
    title: "Тут і зараз",
    duration: "7:00",
    description: "Практика усвідомленості для повного занурення в теперішній момент.",
    variant: 'blue',
    audioUrl: "/audio/meditations/focus-meditation.mp3",
    isPremium: false,
    category: 'Усвідомленість'
  },
  {
    id: 'meditation-3',
    title: "Внутрішня гармонія",
    duration: "7:30",
    description: "Медитація для досягнення балансу між розумом та емоціями.",
    variant: 'purple',
    audioUrl: "/audio/meditations/evening-meditation.mp3",
    isPremium: false,
    category: 'Вечірні'
  },
  {
    id: 'meditation-4',
    title: "Глибоке розслаблення",
    duration: "6:50",
    description: "Практика для повного розслаблення тіла та розуму.",
    variant: 'green',
    audioUrl: "/audio/meditations/stress-relief..mp3",
    isPremium: true,
    category: 'Розслаблення'
  },
  {
    id: 'meditation-5',
    title: "Усвідомлення дня",
    duration: "7:30",
    description: "Медитація для глибокого усвідомлення поточного моменту та прийняття дня таким, яким він є.",
    variant: 'red',
    audioUrl: "/audio/meditations/meditation-5.mp3",
    isPremium: true,
    category: 'Усвідомленість'
  },
  {
    id: 'meditation-6',
    title: "Прийняття та усвідомлення",
    duration: "7:20",
    description: "Практика для розвитку навичок прийняття себе та усвідомленого проживання життя.",
    variant: 'blue',
    audioUrl: "/audio/meditations/meditation-6.mp3",
    isPremium: true,
    category: 'Саморозвиток'
  },
  {
    id: 'meditation-7',
    title: "Наповнення енергією",
    duration: "7:30",
    description: "Ранкова медитація для наповнення тіла та свідомості позитивною енергією та життєвою силою.",
    variant: 'yellow',
    audioUrl: "/audio/meditations/meditation-7.mp3",
    isPremium: true,
    category: 'Енергія'
  },
  {
    id: 'meditation-8',
    title: "Для досягнення цілей",
    duration: "9:00",
    description: "Медитативна практика, що допомагає зосередитись на цілях та знайти ресурси для їх досягнення.",
    variant: 'purple',
    audioUrl: "/audio/meditations/meditation-8.mp3",
    isPremium: true,
    category: 'Цілі'
  },
  {
    id: 'meditation-9',
    title: "Знайомство з внутрішнім світом",
    duration: "14:00",
    description: "Глибока медитація для дослідження власної свідомості та пізнання внутрішнього світу.",
    variant: 'blue',
    audioUrl: "/audio/meditations/meditation-9.mp3",
    isPremium: true,
    category: 'Самопізнання'
  },
  {
    id: 'meditation-10',
    title: "Пізнання власного Я",
    duration: "6:02",
    description: "Медитація, що допомагає зрозуміти своє справжнє я та розкрити внутрішній потенціал.",
    variant: 'green',
    audioUrl: "/audio/meditations/meditation-10.mp3",
    isPremium: true,
    category: 'Самопізнання'
  },
  {
    id: 'meditation-11',
    title: "Для зосередження та зняття стресу",
    duration: "6:27",
    description: "Ефективна практика для покращення концентрації та звільнення від накопиченої напруги.",
    variant: 'orange',
    audioUrl: "/audio/meditations/meditation-11.mp3",
    isPremium: true,
    category: 'Антистрес'
  },
  {
    id: 'meditation-12',
    title: "Прийняття себе",
    duration: "9:31",
    description: "Медитація, яка допомагає прийняти себе та розвинути безумовну любов до себе.",
    variant: 'yellow',
    audioUrl: "/audio/meditations/meditation-12.mp3",
    isPremium: true,
    category: 'Самоприйняття'
  },
  {
    id: 'meditation-13',
    title: "Впевненість в собі",
    duration: "8:06",
    description: "Практика для зміцнення впевненості в собі та розкриття свого потенціалу.",
    variant: 'purple',
    audioUrl: "/audio/meditations/meditation-13.mp3",
    isPremium: true,
    category: 'Впевненість'
  },
  {
    id: 'meditation-14',
    title: "Медитація вдячності",
    duration: "11:40",
    description: "Практика для розвитку почуття вдячності та здатності цінувати кожен момент життя.",
    variant: 'blue',
    audioUrl: "/audio/meditations/meditation-14.mp3",
    isPremium: true,
    category: 'Вдячність'
  },
  {
    id: 'meditation-15',
    title: "Свобода від обмежень",
    duration: "5:35",
    description: "Медитація для звільнення від внутрішніх обмежень та страхів, що заважають розвитку.",
    variant: 'green',
    audioUrl: "/audio/meditations/meditation-15.mp3",
    isPremium: true,
    category: 'Свобода'
  }
];

export default function MeditationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const itemsPerPage = 8; // Кількість медитацій на сторінці

  // Усі унікальні категорії для фільтра
  const categories = ['all', ...Array.from(new Set(allMeditations.map(m => m.category)))];

  // Фільтруємо медитації за категорією
  const filteredMeditations = selectedCategory === 'all'
    ? allMeditations
    : allMeditations.filter(m => m.category === selectedCategory);

  // Рахуємо загальну кількість сторінок
  const totalPages = Math.ceil(filteredMeditations.length / itemsPerPage);

  // Отримуємо медитації для поточної сторінки
  const currentMeditations = filteredMeditations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Скидаємо сторінку на першу при зміні категорії
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Функції навігації
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
        Медитації ({filteredMeditations.length})
      </h1>
      
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
      
      {/* Відображення інформації про сторінки */}
      <div className="mb-4 text-sm text-gray-500 flex justify-between items-center">
        <div>
          Сторінка {currentPage} з {totalPages}
        </div>
        <div>
          Показано {currentMeditations.length} з {filteredMeditations.length} медитацій
        </div>
      </div>
      
      {/* Сітка медитацій */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentMeditations.map((meditation) => (
          <Link 
            key={meditation.id}
            href={`/meditations/${meditation.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              <Image
                src={`/images/meditations/${meditation.id}.jpg`}
                alt={meditation.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {meditation.isPremium && (
                <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-0.5 rounded text-xs font-medium z-10">
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
          </Link>
        ))}
      </div>
      
      {/* Пагінація */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          <button 
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Назад
          </button>
          
          {/* Кнопки номерів сторінок */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-8 h-8 rounded-md ${page === currentPage ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {page}
            </button>
          ))}
          
          <button 
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Далі
          </button>
        </div>
      </div>
    </div>
  );
} 