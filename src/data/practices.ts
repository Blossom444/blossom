import { Practice } from '@/types';

export const practices: Practice[] = [
  {
    id: 'practice-1',
    title: 'Ранкові практики усвідомленості',
    description: 'Комплекс вправ для початку дня з енергією та ясністю розуму.',
    duration: 30,
    videoUrl: '/practices/morning-awareness.mp4',
    imageUrl: '/images/practices/morning.jpg',
    category: 'Ранкові',
    type: 'video',
    isPremium: false
  },
  {
    id: 'practice-2',
    title: 'Дихальні техніки',
    description: 'Відеоурок з техніками дихання для зняття стресу та тривоги.',
    duration: 45,
    videoUrl: '/practices/breathing-techniques.mp4',
    imageUrl: '/images/practices/breathing.jpg',
    category: 'Дихання',
    type: 'video',
    isPremium: true
  },
  {
    id: 'practice-3',
    title: 'Медитація ходьби',
    description: "Практика усвідомленої ходьби для з'єднання з природою та собою.",
    duration: 20,
    videoUrl: '/practices/walking-meditation.mp4',
    imageUrl: '/images/practices/walking.jpg',
    category: 'Медитація',
    type: 'video',
    isPremium: false
  },
  {
    id: 'practice-4',
    title: 'Розтяжка',
    description: 'Комплекс вправ для гнучкості тіла та розслаблення м\'язів.',
    duration: 25,
    videoUrl: '/practices/stretching.mp4',
    imageUrl: '/images/practices/stretching.jpg',
    category: 'Фізичні практики',
    type: 'video',
    isPremium: false
  },
  {
    id: 'practice-5',
    title: 'Цигун',
    description: "Древні китайські практики для здоров'я та довголіття.",
    duration: 40,
    videoUrl: '/practices/qigong.mp4',
    imageUrl: '/images/practices/qigong.jpg',
    category: 'Цигун',
    type: 'video',
    isPremium: true
  }
];

export const allPractices = practices; 