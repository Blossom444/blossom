import Link from 'next/link';
import GradientCover from '@/components/GradientCover';

interface Meditation {
  id: string;
  title: string;
  duration: string;
  description: string;
  variant: 'purple' | 'blue' | 'green' | 'orange';
  audioUrl: string;
  isPremium: boolean;
}

export default function MeditationsPage() {
  const meditations: Meditation[] = [
    {
      id: 'meditation-1',
      title: "Наміри на новий день",
      duration: "15 хв",
      description: "Медитація для встановлення позитивних намірів та цілей на день. Допоможе сфокусуватися на важливому та налаштуватися на продуктивність.",
      variant: 'orange',
      audioUrl: "/audio/morning-meditation.mp3",
      isPremium: false
    },
    {
      id: 'meditation-2',
      title: "Тут і зараз",
      duration: "20 хв",
      description: "Практика усвідомленості для повного занурення в теперішній момент. Допоможе відпустити тривоги про майбутнє та жаль про минуле.",
      variant: 'blue',
      audioUrl: "/audio/stress-relief.mp3",
      isPremium: false
    },
    {
      id: 'meditation-3',
      title: "Внутрішня гармонія",
      duration: "10 хв",
      description: "Медитація для досягнення балансу між розумом та емоціями. Допоможе відновити внутрішній спокій та знайти рівновагу.",
      variant: 'purple',
      audioUrl: "/audio/evening-meditation.mp3",
      isPremium: false
    },
    {
      id: 'meditation-4',
      title: "Глибоке розслаблення",
      duration: "12 хв",
      description: "Практика для повного розслаблення тіла та розуму. Ідеально підходить для зняття напруги та відновлення енергії.",
      variant: 'green',
      audioUrl: "/audio/focus-meditation.mp3",
      isPremium: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">Медитації</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {meditations.map((meditation) => (
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 