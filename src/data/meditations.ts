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
    description: "Медитація для встановлення позитивних намірів та цілей на день. Допоможе сфокусуватися на важливому та налаштуватися на продуктивність.",
    variant: 'orange',
    audioUrl: "/audio/morning-meditation.mp3",
    isPremium: false,
    category: 'Ранкові медитації'
  },
  {
    id: 'meditation-2',
    title: "Тут і зараз",
    duration: "20 хв",
    description: "Практика усвідомленості для повного занурення в теперішній момент. Допоможе відпустити тривоги про майбутнє та жаль про минуле.",
    variant: 'blue',
    audioUrl: "/audio/stress-relief.mp3",
    isPremium: false,
    category: 'Усвідомленість'
  },
  {
    id: 'meditation-3',
    title: "Внутрішня гармонія",
    duration: "10 хв",
    description: "Медитація для досягнення балансу між розумом та емоціями. Допоможе відновити внутрішній спокій та знайти рівновагу.",
    variant: 'purple',
    audioUrl: "/audio/evening-meditation.mp3",
    isPremium: false,
    category: 'Вечірні медитації'
  },
  {
    id: 'meditation-4',
    title: "Глибоке розслаблення",
    duration: "12 хв",
    description: "Практика для повного розслаблення тіла та розуму. Ідеально підходить для зняття напруги та відновлення енергії.",
    variant: 'green',
    audioUrl: "/audio/focus-meditation.mp3",
    isPremium: true,
    category: 'Розслаблення'
  },
  {
    id: 'meditation-5',
    title: "Усвідомлення дня",
    duration: "18 хв",
    description: "Медитація для глибокого усвідомлення поточного моменту та подій дня. Допомагає краще розуміти свої емоції та реакції.",
    variant: 'red',
    audioUrl: "/audio/meditations/awareness-day.mp3",
    isPremium: true,
    category: 'Антистрес'
  },
  {
    id: 'meditation-6',
    title: "На прийняття і усвідомлення",
    duration: "25 хв",
    description: "Практика для розвитку прийняття себе та навколишнього світу. Допомагає знаходити внутрішній спокій.",
    variant: 'blue',
    audioUrl: "/audio/meditations/acceptance.mp3",
    isPremium: true,
    category: 'Сон'
  },
  {
    id: 'meditation-7',
    title: "Наповнення енергією",
    duration: "10 хв",
    description: "Енергетична медитація для відновлення життєвих сил та підвищення рівня енергії.",
    variant: 'yellow',
    audioUrl: "/audio/meditations/energy-boost.mp3",
    isPremium: true,
    category: 'Енергія'
  },
  {
    id: 'meditation-8',
    title: "На досягнення цілей",
    duration: "15 хв",
    description: "Медитація для фокусування на важливих цілях та посилення мотивації для їх досягнення.",
    variant: 'purple',
    audioUrl: "/audio/meditations/goal-achievement.mp3",
    isPremium: true,
    category: 'Концентрація'
  },
  {
    id: 'meditation-9',
    title: "Знайомство зі своїм внутрішнім світом",
    duration: "20 хв",
    description: "Подорож у свій внутрішній світ для кращого саморозуміння та самопізнання.",
    variant: 'red',
    audioUrl: "/audio/meditations/inner-world.mp3",
    isPremium: true,
    category: 'Усвідомленість'
  },
  {
    id: 'meditation-10',
    title: "Пізнання Власного Я",
    duration: "30 хв",
    description: "Глибока медитація для дослідження власної особистості та розкриття внутрішнього потенціалу.",
    variant: 'purple',
    audioUrl: "/audio/meditations/self-discovery.mp3",
    isPremium: true,
    category: 'Усвідомленість'
  },
  {
    id: 'meditation-11',
    title: "Прийняття себе",
    duration: "12 хв",
    description: "Практика для розвитку самоприйняття та любові до себе.",
    variant: 'yellow',
    audioUrl: "/audio/meditations/self-acceptance.mp3",
    isPremium: false,
    category: 'Усвідомленість'
  },
  {
    id: 'meditation-12',
    title: "Впевненість в собі",
    duration: "15 хв",
    description: "Медитація для посилення впевненості в собі та віри у власні сили.",
    variant: 'blue',
    audioUrl: "/audio/meditations/self-confidence.mp3",
    isPremium: true,
    category: 'Антистрес'
  },
  {
    id: 'meditation-13',
    title: "Медитація вдячності",
    duration: "18 хв",
    description: "Практика для розвитку почуття вдячності та позитивного світосприйняття.",
    variant: 'green',
    audioUrl: "/audio/meditations/gratitude.mp3",
    isPremium: false,
    category: 'Усвідомленість'
  },
  {
    id: 'meditation-14',
    title: "Медитація вдячності",
    duration: "22 хв",
    description: "Практика для розвитку почуття вдячності та позитивного світосприйняття.",
    variant: 'orange',
    audioUrl: "/audio/meditations/gratitude.mp3",
    isPremium: true,
    category: 'Концентрація'
  },
  {
    id: 'meditation-15',
    title: "Медитація для міцного сну",
    duration: "25 хв",
    description: "Заспокійлива медитація для глибокого розслаблення та якісного сну.",
    variant: 'purple',
    audioUrl: "/audio/meditations/deep-sleep.mp3",
    isPremium: true,
    category: 'Сон'
  }
]; 