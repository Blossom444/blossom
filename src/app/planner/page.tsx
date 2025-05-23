'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import PlannerCard from '@/components/PlannerCard';
import GradientCover from '@/components/GradientCover';

const planners = [
  {
    color: '#FFB6C1',
    colorName: 'Рожевий',
    imageUrl: '/images/planners/pink-planner.png',
    isAvailable: true,
    price: 1600
  },
  {
    color: '#8B4513',
    colorName: 'Коричневий',
    imageUrl: '/images/planners/brown-planner.png',
    isAvailable: true,
    price: 1600
  },
  {
    color: '#F5F5DC',
    colorName: 'Бежевий',
    imageUrl: '/images/planners/beige-planner.png',
    isAvailable: true,
    price: 1600
  },
  {
    color: '#808080',
    colorName: 'Сірий',
    imageUrl: '/images/planners/gray-planner.png',
    isAvailable: true,
    price: 1600
  }
];

export default function PlannerPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 w-full h-full">
        <Image
          src="/images/planners/planner-details.jpg"
          alt="Background"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          priority
          quality={100}
          style={{ filter: 'brightness(0.7)' }}
        />
      </div>
      
      <div className="relative min-h-screen bg-black/30 backdrop-blur-sm">
        <div className="bg-black/50 backdrop-blur-md py-6 sm:py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
                Книга змін BLOSSOM
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 drop-shadow-lg">
                Ваш особистий путівник до трансформації
              </p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <div className="prose prose-invert max-w-none mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 md:mb-6 drop-shadow-lg">
              Комплект BLOSSOM для особистісного розвитку
            </h2>
            
            <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 md:p-6 rounded-lg mb-4 sm:mb-6 md:mb-8 border border-white/20">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
                До кожного комплекту входить:
              </h3>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-white/90 text-sm sm:text-base md:text-lg">
                <li>Річний планер "Книга змін" у велюровій обкладинці на твердій підкладці</li>
                <li>Блокнот "Blossom завжди поруч"</li>
                <li>Пакет авторських Україномовних медитацій та практик</li>
                <li>Фірмова коробка для зберігання та транспортування</li>
              </ul>
            </div>

            <div className="bg-amber-500/20 backdrop-blur-md p-3 sm:p-4 md:p-6 rounded-lg mb-4 sm:mb-6 md:mb-8 border border-amber-500/30">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
                Ексклюзивний подарунок для перших 1000 покупців
              </h3>
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <p className="text-white/90 text-sm sm:text-base md:text-lg">
                  Отримайте безкоштовний доступ до колекції авторських україномовних медитацій в розробці якої брала участь наша команда спільно з:
                </p>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-white/90 text-sm sm:text-base md:text-lg">
                  <li>Професійними психологами та психотерапевтами</li>
                  <li>Авторами медитативних матеріалів</li>
                  <li>Професійною акторкою озвучки та іншими</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 md:mb-6 drop-shadow-lg">
            Оберіть свій колір планера:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {planners.map((planner) => (
              <PlannerCard
                key={planner.colorName}
                {...planner}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 