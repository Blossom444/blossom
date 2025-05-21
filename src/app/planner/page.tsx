'use client';

import PlannerCard from '@/components/PlannerCard';
import GradientCover from '@/components/GradientCover';
import Gallery from '@/components/Gallery';

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

const galleryImages = [
  {
    src: '/images/planners/pink-planner.png',
    alt: 'Рожевий планер BLOSSOM - вид спереду'
  },
  {
    src: '/images/planners/pink-planner-back.jpg',
    alt: 'Рожевий планер BLOSSOM - вид ззаду'
  },
  {
    src: '/images/planners/pink-planner-open.jpg',
    alt: 'Рожевий планер BLOSSOM - розгорнутий вигляд'
  },
  {
    src: '/images/planners/brown-planner.png',
    alt: 'Коричневий планер BLOSSOM - вид спереду'
  },
  {
    src: '/images/planners/brown-planner-side.jpg',
    alt: 'Коричневий планер BLOSSOM - вид збоку'
  },
  {
    src: '/images/planners/beige-planner.png',
    alt: 'Бежевий планер BLOSSOM - вид спереду'
  },
  {
    src: '/images/planners/beige-planner-desk.jpg',
    alt: 'Бежевий планер BLOSSOM на робочому столі'
  },
  {
    src: '/images/planners/gray-planner.png',
    alt: 'Сірий планер BLOSSOM - вид спереду'
  },
  {
    src: '/images/planners/gray-planner-lifestyle.jpg',
    alt: 'Сірий планер BLOSSOM у використанні'
  },
  {
    src: '/images/planners/planner-details.jpg',
    alt: 'Деталі та оздоблення планера BLOSSOM'
  },
  {
    src: '/images/planners/planner-spread.jpg',
    alt: 'Розворот планера з прикладом заповнення'
  },
  {
    src: '/images/planners/planner-accessories.jpg',
    alt: 'Планер BLOSSOM з додатковими аксесуарами'
  }
];

export default function PlannerPage() {
  return (
    <div>
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
              <li>Пакет медитацій та практик для початківців</li>
              <li>Спеціальні сторінки для планування та рефлексії</li>
            </ul>
          </div>

          {/* Галерея фотографій */}
          <div className="my-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Галерея фотографій:
            </h3>
            <Gallery images={galleryImages} />
          </div>

          <div className="bg-amber-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-amber-900 mb-4">
              Ексклюзивний подарунок для перших 1000 покупців
            </h3>
            <div className="space-y-4">
              <p className="text-gray-700">
                Отримайте безкоштовний доступ до колекції авторських україномовних медитацій, 
                створених у співпраці з професійною командою експертів:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Професійні психологи та психотерапевти</li>
                <li>Досвідчені автори медитативних практик</li>
                <li>Команда звукорежисерів та саунд-дизайнерів</li>
                <li>Професійні актори озвучування</li>
              </ul>
              <p className="text-gray-700">
                Кожна медитація пройшла ретельне тестування фокусною групою та була 
                адаптована для максимальної ефективності та комфорту користувачів.
              </p>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-2xl font-bold text-green-900 mb-2">
                  Спеціальна ціна на повний комплект
                </h3>
                <p className="text-lg text-green-800">
                  Повний комплект BLOSSOM для вашого розвитку та усвідомленості
                </p>
                <ul className="list-disc list-inside mt-4 space-y-1 text-green-700">
                  <li>Річна Книга змін у велюровій обкладинці</li>
                  <li>Блокнот "Blossom завжди поруч"</li>
                  <li>Пакет медитацій та практик для початківців</li>
                  <li className="font-medium">+ Подарунковий набір авторських медитацій</li>
                </ul>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-3xl font-bold text-green-600">1600₴</span>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                  Замовити комплект
                </button>
              </div>
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
  );
} 