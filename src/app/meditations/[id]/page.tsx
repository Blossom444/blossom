'use client';

import { useEffect, useState } from 'react';
import MeditationClient from './MeditationClient';

// Той самий масив медитацій, що і на основній сторінці
const allMeditations = [
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

export default function MeditationPage({ params }: PageProps) {
  return <MeditationClient id={params.id} />;
} 