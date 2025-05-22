'use client';

import { useEffect, useState } from 'react';
import MeditationClient from './MeditationClient';

// Той самий масив медитацій, що і на основній сторінці
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

interface PageProps {
  params: {
    id: string;
  };
}

export default function MeditationPage({ params }: PageProps) {
  const [meditation, setMeditation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = allMeditations.find(m => m.id === params.id);
    setMeditation(found || null);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="animate-pulse h-8 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!meditation) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Медитацію не знайдено</h1>
        <p className="mt-4">ID: {params.id}</p>
        <div className="mt-6">
          <a href="/meditations" className="text-primary hover:underline">
            ← Повернутися до списку медитацій
          </a>
        </div>
      </div>
    );
  }

  return <MeditationClient meditation={meditation} />;
} 