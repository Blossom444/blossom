interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: string;
  variant: 'orange' | 'blue' | 'purple' | 'green' | 'red' | 'yellow';
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
  },
  'meditation-5': {
    id: 'meditation-5',
    title: 'Усвідомлення дня',
    description: 'Медитація для глибокого усвідомлення поточного моменту та подій дня. Допомагає краще розуміти свої емоції та реакції.',
    duration: '18 хв',
    variant: 'red',
    audioUrl: '/audio/meditations/awareness-day.mp3',
    isPremium: true
  },
  'meditation-6': {
    id: 'meditation-6',
    title: 'На прийняття і усвідомлення',
    description: 'Практика для розвитку прийняття себе та навколишнього світу. Допомагає знаходити внутрішній спокій.',
    duration: '25 хв',
    variant: 'blue',
    audioUrl: '/audio/meditations/acceptance.mp3',
    isPremium: true
  },
  'meditation-7': {
    id: 'meditation-7',
    title: 'Наповнення енергією',
    description: 'Енергетична медитація для відновлення життєвих сил та підвищення рівня енергії.',
    duration: '10 хв',
    variant: 'yellow',
    audioUrl: '/audio/meditations/energy-boost.mp3',
    isPremium: true
  },
  'meditation-8': {
    id: 'meditation-8',
    title: 'На досягнення цілей',
    description: 'Медитація для фокусування на важливих цілях та посилення мотивації для їх досягнення.',
    duration: '15 хв',
    variant: 'purple',
    audioUrl: '/audio/meditations/goal-achievement.mp3',
    isPremium: true
  },
  'meditation-9': {
    id: 'meditation-9',
    title: 'Знайомство зі своїм внутрішнім світом',
    description: 'Подорож у свій внутрішній світ для кращого саморозуміння та самопізнання.',
    duration: '20 хв',
    variant: 'red',
    audioUrl: '/audio/meditations/inner-world.mp3',
    isPremium: true
  },
  'meditation-10': {
    id: 'meditation-10',
    title: 'Пізнання Власного Я',
    description: 'Глибока медитація для дослідження власної особистості та розкриття внутрішнього потенціалу.',
    duration: '30 хв',
    variant: 'purple',
    audioUrl: '/audio/meditations/self-discovery.mp3',
    isPremium: true
  },
  'meditation-11': {
    id: 'meditation-11',
    title: 'Прийняття себе',
    description: 'Практика для розвитку самоприйняття та любові до себе.',
    duration: '12 хв',
    variant: 'yellow',
    audioUrl: '/audio/meditations/self-acceptance.mp3',
    isPremium: false
  },
  'meditation-12': {
    id: 'meditation-12',
    title: 'Впевненість в собі',
    description: 'Медитація для посилення впевненості в собі та віри у власні сили.',
    duration: '15 хв',
    variant: 'blue',
    audioUrl: '/audio/meditations/self-confidence.mp3',
    isPremium: true
  },
  'meditation-13': {
    id: 'meditation-13',
    title: 'Медитація вдячності',
    description: 'Практика для розвитку почуття вдячності та позитивного світосприйняття.',
    duration: '18 хв',
    variant: 'green',
    audioUrl: '/audio/meditations/gratitude.mp3',
    isPremium: false
  },
  'meditation-14': {
    id: 'meditation-14',
    title: 'Медитація вдячності',
    description: 'Практика для розвитку почуття вдячності та позитивного світосприйняття.',
    duration: '22 хв',
    variant: 'orange',
    audioUrl: '/audio/meditations/gratitude.mp3',
    isPremium: true
  },
  'meditation-15': {
    id: 'meditation-15',
    title: 'Медитація для міцного сну',
    description: 'Заспокійлива медитація для глибокого розслаблення та якісного сну.',
    duration: '25 хв',
    variant: 'purple',
    audioUrl: '/audio/meditations/deep-sleep.mp3',
    isPremium: true
  }
};

export async function generateStaticParams() {
  return Object.keys(meditations).map((id) => ({
    id,
  }));
} 