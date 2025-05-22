'use client';

import { useEffect, useState } from 'react';
import MeditationClient from './MeditationClient';

// Вбудовані дані медитацій
const hardcodedMeditations = [
  {
    id: 'meditation-1',
    title: "Наміри на новий день",
    duration: "15 хв",
    description: "Медитація для встановлення позитивних намірів та цілей на день.",
    variant: 'orange',
    audioUrl: "/audio/meditations/morning-meditation.mp3",
    isPremium: false,
    category: 'Ранкові'
  },
  {
    id: 'meditation-2',
    title: "Тут і зараз",
    duration: "20 хв",
    description: "Практика усвідомленості для повного занурення в теперішній момент.",
    variant: 'blue',
    audioUrl: "/audio/meditations/mindfulness.mp3",
    isPremium: false,
    category: 'Усвідомленість'
  },
  {
    id: 'meditation-3',
    title: "Внутрішня гармонія",
    duration: "10 хв",
    description: "Медитація для досягнення балансу між розумом та емоціями.",
    variant: 'purple',
    audioUrl: "/audio/meditations/harmony.mp3",
    isPremium: false,
    category: 'Вечірні'
  },
  {
    id: 'meditation-4',
    title: "Глибоке розслаблення",
    duration: "12 хв",
    description: "Практика для повного розслаблення тіла та розуму.",
    variant: 'green',
    audioUrl: "/audio/meditations/relaxation.mp3",
    isPremium: true,
    category: 'Розслаблення'
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
    // Знаходимо потрібну медитацію за ID
    const found = hardcodedMeditations.find(m => m.id === params.id);
    setMeditation(found || null);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Завантаження...</p>
      </div>
    );
  }

  if (!meditation) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Медитацію не знайдено</h1>
        <p className="mt-4">ID: {params.id}</p>
      </div>
    );
  }

  return <MeditationClient meditation={meditation} />;
} 