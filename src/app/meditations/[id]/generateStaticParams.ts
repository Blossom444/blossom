interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: string;
  variant: 'orange' | 'blue' | 'purple' | 'green';
  audioUrl: string;
  isPremium: boolean;
}

export const meditations: Record<string, Meditation> = {
  'meditation-1': {
    id: 'meditation-1',
    title: 'Наміри на новий день',
    description: 'Медитація для встановлення позитивних намірів та цілей на день. Допоможе сфокусуватися на важливому та налаштуватися на продуктивність.',
    duration: '15 хв',
    variant: 'orange',
    audioUrl: '/audio/morning-meditation.mp3',
    isPremium: false
  },
  'meditation-2': {
    id: 'meditation-2',
    title: 'Тут і зараз',
    description: 'Практика усвідомленості для повного занурення в теперішній момент. Допоможе відпустити тривоги про майбутнє та жаль про минуле.',
    duration: '20 хв',
    variant: 'blue',
    audioUrl: '/audio/stress-relief.mp3',
    isPremium: false
  },
  'meditation-3': {
    id: 'meditation-3',
    title: 'Внутрішня гармонія',
    description: 'Медитація для досягнення балансу між розумом та емоціями. Допоможе відновити внутрішній спокій та знайти рівновагу.',
    duration: '10 хв',
    variant: 'purple',
    audioUrl: '/audio/evening-meditation.mp3',
    isPremium: false
  },
  'meditation-4': {
    id: 'meditation-4',
    title: 'Глибоке розслаблення',
    description: 'Практика для повного розслаблення тіла та розуму. Ідеально підходить для зняття напруги та відновлення енергії.',
    duration: '12 хв',
    variant: 'green',
    audioUrl: '/audio/focus-meditation.mp3',
    isPremium: true
  }
};

export async function generateStaticParams() {
  return Object.keys(meditations).map((id) => ({
    id,
  }));
} 