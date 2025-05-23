import { Meditation } from '@/types';

export const meditations: Meditation[] = [
  {
    id: 'meditation-1',
    title: 'Наміри на день',
    description: 'Медитація для встановлення позитивних намірів та цілей на день.',
    duration: 6,
    audioUrl: '/audio/meditations/morning-meditation.mp3',
    imageUrl: '/images/meditations/morning.jpg',
    category: 'Ранкові',
    variant: 'orange',
    isPremium: false
  },
  {
    id: 'meditation-2',
    title: 'Тут і зараз',
    description: 'Практика усвідомленості для повного занурення в теперішній момент.',
    duration: 7,
    audioUrl: '/audio/meditations/focus-meditation.mp3',
    imageUrl: '/images/meditations/focus.jpg',
    category: 'Усвідомленість',
    variant: 'blue',
    isPremium: false
  },
  {
    id: 'meditation-3',
    title: 'Внутрішня гармонія',
    description: 'Медитація для досягнення балансу між розумом та емоціями.',
    duration: 7.5,
    audioUrl: '/audio/meditations/evening-meditation.mp3',
    imageUrl: '/images/meditations/harmony.jpg',
    category: 'Вечірні',
    variant: 'purple',
    isPremium: false
  },
  {
    id: 'meditation-4',
    title: 'Глибоке розслаблення',
    description: 'Практика для повного розслаблення тіла та розуму.',
    duration: 6.5,
    audioUrl: '/audio/meditations/stress-relief.mp3',
    imageUrl: '/images/meditations/relaxation.jpg',
    category: 'Розслаблення',
    variant: 'green',
    isPremium: true
  },
  {
    id: 'meditation-5',
    title: 'Усвідомлення дня',
    description: 'Медитація для глибокого усвідомлення поточного моменту та прийняття дня таким, яким він є.',
    duration: 7.5,
    audioUrl: '/audio/meditations/meditation-5.mp3',
    imageUrl: '/images/meditations/awareness.jpg',
    category: 'Усвідомленість',
    variant: 'red',
    isPremium: true
  },
  {
    id: 'meditation-6',
    title: 'Прийняття та усвідомлення',
    description: 'Практика для розвитку навичок прийняття себе та усвідомленого проживання життя.',
    duration: 7.2,
    audioUrl: '/audio/meditations/meditation-6.mp3',
    imageUrl: '/images/meditations/acceptance.jpg',
    category: 'Саморозвиток',
    variant: 'blue',
    isPremium: true
  },
  {
    id: 'meditation-7',
    title: 'Наповнення енергією',
    description: 'Ранкова медитація для наповнення тіла та свідомості позитивною енергією та життєвою силою.',
    duration: 7.5,
    audioUrl: '/audio/meditations/meditation-7.mp3',
    imageUrl: '/images/meditations/energy.jpg',
    category: 'Енергія',
    variant: 'yellow',
    isPremium: true
  },
  {
    id: 'meditation-8',
    title: 'Для досягнення цілей',
    description: 'Медитативна практика, що допомагає зосередитись на цілях та знайти ресурси для їх досягнення.',
    duration: 9,
    audioUrl: '/audio/meditations/meditation-8.mp3',
    imageUrl: '/images/meditations/goals.jpg',
    category: 'Цілі',
    variant: 'purple',
    isPremium: true
  },
  {
    id: 'meditation-9',
    title: 'Знайомство з внутрішнім світом',
    description: 'Глибока медитація для дослідження власної свідомості та пізнання внутрішнього світу.',
    duration: 14,
    audioUrl: '/audio/meditations/meditation-9.mp3',
    imageUrl: '/images/meditations/inner-world.jpg',
    category: 'Самопізнання',
    variant: 'blue',
    isPremium: true
  },
  {
    id: 'meditation-10',
    title: 'Пізнання власного Я',
    description: 'Медитація, що допомагає зрозуміти своє справжнє я та розкрити внутрішній потенціал.',
    duration: 6,
    audioUrl: '/audio/meditations/meditation-10.mp3',
    imageUrl: '/images/meditations/self-discovery.jpg',
    category: 'Самопізнання',
    variant: 'green',
    isPremium: true
  },
  {
    id: 'meditation-11',
    title: 'Для зосередження та зняття стресу',
    description: 'Ефективна практика для покращення концентрації та звільнення від накопиченої напруги.',
    duration: 6.5,
    audioUrl: '/audio/meditations/meditation-11.mp3',
    imageUrl: '/images/meditations/focus-stress.jpg',
    category: 'Антистрес',
    variant: 'orange',
    isPremium: true
  },
  {
    id: 'meditation-12',
    title: 'Прийняття себе',
    description: 'Медитація, яка допомагає прийняти себе та розвинути безумовну любов до себе.',
    duration: 9.5,
    audioUrl: '/audio/meditations/meditation-12.mp3',
    imageUrl: '/images/meditations/self-acceptance.jpg',
    category: 'Самоприйняття',
    variant: 'yellow',
    isPremium: true
  },
  {
    id: 'meditation-13',
    title: 'Впевненість в собі',
    description: 'Практика для зміцнення впевненості в собі та розкриття свого потенціалу.',
    duration: 8,
    audioUrl: '/audio/meditations/meditation-13.mp3',
    imageUrl: '/images/meditations/confidence.jpg',
    category: 'Впевненість',
    variant: 'purple',
    isPremium: true
  },
  {
    id: 'meditation-14',
    title: 'Медитація вдячності',
    description: 'Практика для розвитку почуття вдячності та здатності цінувати кожен момент життя.',
    duration: 11.5,
    audioUrl: '/audio/meditations/meditation-14.mp3',
    imageUrl: '/images/meditations/gratitude.jpg',
    category: 'Вдячність',
    variant: 'blue',
    isPremium: true
  },
  {
    id: 'meditation-15',
    title: 'Свобода від обмежень',
    description: 'Медитація для звільнення від внутрішніх обмежень та страхів, що заважають розвитку.',
    duration: 5.5,
    audioUrl: '/audio/meditations/meditation-15.mp3',
    imageUrl: '/images/meditations/freedom.jpg',
    category: 'Свобода',
    variant: 'green',
    isPremium: true
  }
];

export const allMeditations = meditations; 