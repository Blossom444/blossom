import Link from 'next/link';
import GradientCover from '@/components/GradientCover';

interface Meditation {
  id: string;
  title: string;
  duration: string;
  description: string;
  variant: 'purple' | 'blue' | 'green' | 'orange';
  audioUrl: string;
}

export default function MeditationsPage() {
  const meditations: Meditation[] = [
    {
      id: 'meditation-1',
      title: "Ранкова медитація",
      duration: "15 хв",
      description: "Почніть свій день з гармонії та спокою",
      variant: 'orange',
      audioUrl: "/audio/morning-meditation.mp3"
    },
    {
      id: 'meditation-2',
      title: "Медитація для зняття стресу",
      duration: "20 хв",
      description: "Звільніться від напруги та тривоги",
      variant: 'blue',
      audioUrl: "/audio/stress-relief.mp3"
    },
    {
      id: 'meditation-3',
      title: "Вечірня медитація",
      duration: "10 хв",
      description: "Заспокійливий практика перед сном",
      variant: 'purple',
      audioUrl: "/audio/evening-meditation.mp3"
    },
    {
      id: 'meditation-4',
      title: "Медитація для концентрації",
      duration: "12 хв",
      description: "Підвищіть ясність розуму та зосередженість",
      variant: 'green',
      audioUrl: "/audio/focus-meditation.mp3"
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
            <div className="aspect-w-16 aspect-h-9 sm:aspect-square">
              <GradientCover 
                title={meditation.title}
                variant={meditation.variant}
              />
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