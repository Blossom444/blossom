'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AudioPlayer from '@/components/AudioPlayer';
import { AuthProvider } from '@/contexts/AuthContext';

interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  isPremium: boolean;
  audioUrl: string;
  variant: 'orange' | 'blue' | 'purple' | 'green' | 'red' | 'yellow';
}

const allMeditations: Meditation[] = [
  {
    id: '1',
    title: "Спокійний вечір",
    duration: "15:00",
    description: "Медитація для розслаблення та підготовки до сну",
    variant: 'purple',
    audioUrl: "/meditations/calm-evening.mp3",
    isPremium: false,
    category: 'sleep'
  },
  {
    id: '2',
    title: "Зняття стресу",
    duration: "10:00",
    description: "Медитація для зняття напруження та стресу",
    variant: 'orange',
    audioUrl: "/meditations/stress-relief.mp3",
    isPremium: false,
    category: 'stress'
  },
  {
    id: '3',
    title: "Глибокий сон",
    duration: "20:00",
    description: "Медитація для глибокого та відновлюючого сну",
    variant: 'blue',
    audioUrl: "/meditations/deep-sleep.mp3",
    isPremium: false,
    category: 'sleep'
  },
  {
    id: '4',
    title: "Концентрація уваги",
    duration: "12:00",
    description: "Медитація для покращення концентрації та фокусу",
    variant: 'green',
    audioUrl: "/meditations/focus.mp3",
    isPremium: true,
    category: 'focus'
  },
  {
    id: '5',
    title: "Практика вдячності",
    duration: "8:00",
    description: "Медитація для розвитку почуття вдячності",
    variant: 'yellow',
    audioUrl: "/meditations/gratitude.mp3",
    isPremium: true,
    category: 'gratitude'
  },
  {
    id: '6',
    title: "Зменшення тривоги",
    duration: "15:00",
    description: "Медитація для зменшення тривожності",
    variant: 'red',
    audioUrl: "/meditations/anxiety-relief.mp3",
    isPremium: true,
    category: 'anxiety'
  },
  {
    id: '7',
    title: "Ранкова медитація",
    duration: "10:00",
    description: "Енергійна медитація для початку дня",
    variant: 'orange',
    audioUrl: "/meditations/morning.mp3",
    isPremium: true,
    category: 'focus'
  },
  {
    id: '8',
    title: "Вечірнє розслаблення",
    duration: "15:00",
    description: "Медитація для розслаблення після важкого дня",
    variant: 'purple',
    audioUrl: "/meditations/evening-relax.mp3",
    isPremium: true,
    category: 'stress'
  },
  {
    id: '9',
    title: "Медитація вдячності",
    duration: "10:00",
    description: "Практика вдячності за щоденні радощі",
    variant: 'yellow',
    audioUrl: "/meditations/daily-gratitude.mp3",
    isPremium: true,
    category: 'gratitude'
  },
  {
    id: '10',
    title: "Спокійний сон",
    duration: "20:00",
    description: "Медитація для спокійного та міцного сну",
    variant: 'blue',
    audioUrl: "/meditations/peaceful-sleep.mp3",
    isPremium: true,
    category: 'sleep'
  },
  {
    id: '11',
    title: "Зняття напруження",
    duration: "15:00",
    description: "Медитація для зняття фізичного та емоційного напруження",
    variant: 'green',
    audioUrl: "/meditations/tension-relief.mp3",
    isPremium: true,
    category: 'stress'
  },
  {
    id: '12',
    title: "Медитація фокусу",
    duration: "12:00",
    description: "Покращення концентрації та продуктивності",
    variant: 'orange',
    audioUrl: "/meditations/productivity.mp3",
    isPremium: true,
    category: 'focus'
  },
  {
    id: '13',
    title: "Зменшення тривожності",
    duration: "15:00",
    description: "Медитація для зменшення тривоги та страху",
    variant: 'red',
    audioUrl: "/meditations/anxiety.mp3",
    isPremium: true,
    category: 'anxiety'
  },
  {
    id: '14',
    title: "Вдячність за життя",
    duration: "10:00",
    description: "Медитація для розвитку вдячності за все хороше",
    variant: 'yellow',
    audioUrl: "/meditations/life-gratitude.mp3",
    isPremium: true,
    category: 'gratitude'
  },
  {
    id: '15',
    title: "Глибоке розслаблення",
    duration: "20:00",
    description: "Медитація для глибокого розслаблення та відновлення",
    variant: 'purple',
    audioUrl: "/meditations/deep-relaxation.mp3",
    isPremium: true,
    category: 'stress'
  }
];

interface PageProps {
  params: {
    id: string;
  };
}

function MeditationContent({ id }: { id: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const [meditation, setMeditation] = useState<Meditation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundMeditation = allMeditations.find(m => m.id === id);
    if (foundMeditation) {
      setMeditation(foundMeditation);
    }
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B4513]"></div>
      </div>
    );
  }

  if (!meditation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Медитацію не знайдено</h1>
          <button
            onClick={() => router.push('/meditations')}
            className="px-6 py-3 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors"
          >
            Повернутися до списку
          </button>
        </div>
      </div>
    );
  }

  const isAccessible = !meditation.isPremium || (user?.isPremium ?? false);

  if (!isAccessible) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Потрібен преміум доступ</h1>
          <p className="text-gray-600 mb-6">Ця медитація доступна тільки для преміум користувачів</p>
          <button
            onClick={() => router.push('/premium')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all"
          >
            Отримати преміум доступ
          </button>
        </div>
      </div>
    );
  }

  const convertDurationToSeconds = (duration: string) => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const getImageUrl = (variant: string) => {
    switch (variant) {
      case 'purple':
        return '/images/meditation-purple.jpg';
      case 'blue':
        return '/images/meditation-blue.jpg';
      case 'green':
        return '/images/meditation-green.jpg';
      case 'orange':
        return '/images/meditation-orange.jpg';
      case 'red':
        return '/images/meditation-red.jpg';
      case 'yellow':
        return '/images/meditation-yellow.jpg';
      default:
        return '/images/meditation-default.jpg';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="relative rounded-lg overflow-hidden shadow-xl mb-8">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={getImageUrl(meditation.variant)}
              alt={meditation.title}
              className={`w-full h-full object-cover ${meditation.isPremium ? 'filter blur-sm' : ''}`}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{meditation.title}</h1>
            <p className="text-lg opacity-90">{meditation.description}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <AudioPlayer
            audioUrl={meditation.audioUrl}
            title={meditation.title}
            initialDuration={convertDurationToSeconds(meditation.duration)}
            variant={meditation.variant}
          />
        </div>
      </div>
    </div>
  );
}

export default function MeditationPage({ params }: PageProps) {
  return (
    <AuthProvider>
      <MeditationContent id={params.id} />
    </AuthProvider>
  );
} 