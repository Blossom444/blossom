'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GradientCover from '@/components/GradientCover';

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
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = isMobile ? 4 : 8; // Менше медитацій на сторінці для мобільних пристроїв

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

  // Перевіряємо, чи це мобільний пристрій
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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
  
  // Визначаємо, які сторінки показувати в пагінації для мобільних
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Завжди показуємо поточну сторінку
    pageNumbers.push(currentPage);
    
    // Додаємо одну сторінку до і після поточної, якщо вони існують
    if (currentPage > 1) pageNumbers.unshift(currentPage - 1);
    if (currentPage < totalPages) pageNumbers.push(currentPage + 1);
    
    // Якщо є місце, додаємо ще по одній сторінці
    if (currentPage > 2 && pageNumbers.length < 3) pageNumbers.unshift(currentPage - 2);
    if (currentPage < totalPages - 1 && pageNumbers.length < 3) pageNumbers.push(currentPage + 2);
    
    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <GradientCover title="Медитації" variant="purple" />
      <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Медитації</h1>
          
          {/* Категорії */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#8B4513] text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category === 'all' ? 'Всі' : category}
              </button>
            ))}
          </div>

          {/* Сітка медитацій */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentMeditations.map((meditation) => (
              <div
                key={meditation.id}
                className="bg-white/5 backdrop-blur-md rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">{meditation.title}</h3>
                    <span className="text-sm text-white/60">{meditation.duration}</span>
                  </div>
                  <p className="text-white/80 text-sm mb-4">{meditation.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                      {meditation.category}
                    </span>
                    {meditation.isPremium && (
                      <span className="text-xs px-2 py-1 rounded-full bg-[#8B4513]">
                        Premium
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Пагінація */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-white/10 text-white disabled:opacity-50"
              >
                Назад
              </button>
              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === pageNum
                      ? 'bg-[#8B4513] text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-white/10 text-white disabled:opacity-50"
              >
                Вперед
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 