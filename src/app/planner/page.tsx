'use client';

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
  return (
    <div className="bg-[url('/images/planners/planner-details.jpg')] bg-cover bg-center bg-fixed min-h-screen">
      <div className="bg-white/90 min-h-screen">
        <GradientCover
          title="Книга змін BLOSSOM"
          subtitle="Ваш особистий путівник до трансформації"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-indigo max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Комплект BLOSSOM для особистісного розвитку
            </h2>
            
            <div className="bg-indigo-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-indigo-900 mb-4">
                До кожного комплекту входить:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Річний планер "Книга змін" у велюровій обкладинці на твердій підкладці</li>
                <li>Блокнот "Blossom завжди поруч"</li>
                <li>Пакет авторських Україномовних медитацій та практик</li>
                <li>Фірмова коробка для зберігання та транспортування</li>
              </ul>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-amber-900 mb-4">
                Ексклюзивний подарунок для перших 1000 покупців
              </h3>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Отримайте безкоштовний доступ до колекції авторських україномовних медитацій в розробці якої брала участь наша команда спільно з:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Професійними психологами та психотерапевтами</li>
                  <li>Авторами медитативних матеріалів</li>
                  <li>Професійною акторкою озвучки та іншими</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Оберіть свій колір планера:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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