export interface Meditation {
  id: string;
  title: string;
  duration: string;
  description: string;
  variant: 'purple' | 'blue' | 'green' | 'orange' | 'red' | 'yellow';
  audioUrl: string;
  isPremium: boolean;
  category?: string;
}

export const meditations: Meditation[] = [
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