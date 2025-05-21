interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: string;
  variant: 'orange' | 'blue' | 'purple' | 'green';
  audioUrl: string;
}

export const meditations: Record<string, Meditation> = {
  'meditation-1': {
    id: 'meditation-1',
    title: 'Ранкова медитація',
    description: 'Почніть свій день з гармонії та спокою. Ця медитація допоможе вам налаштуватися на продуктивний день та зарядитися позитивною енергією.',
    duration: '15 хв',
    variant: 'orange',
    audioUrl: '/audio/morning-meditation.mp3'
  },
  'meditation-2': {
    id: 'meditation-2',
    title: 'Медитація для зняття стресу',
    description: 'Медитація для глибокої релаксації та відновлення внутрішнього балансу. Ця практика допоможе вам знизити рівень стресу та відновити емоційну рівновагу.',
    duration: '20 хв',
    variant: 'blue',
    audioUrl: '/audio/stress-relief.mp3'
  },
  'meditation-3': {
    id: 'meditation-3',
    title: 'Вечірня медитація',
    description: 'Заспокійлива медитація для завершення дня та підготовки до здорового сну. Допоможе розслабитися та налаштуватися на спокійний сон.',
    duration: '10 хв',
    variant: 'purple',
    audioUrl: '/audio/evening-meditation.mp3'
  },
  'meditation-4': {
    id: 'meditation-4',
    title: 'Медитація для концентрації',
    description: 'Практика для покращення ментальної ясності та концентрації. Ідеально підходить для виконання перед важливими завданнями або навчанням.',
    duration: '12 хв',
    variant: 'green',
    audioUrl: '/audio/focus-meditation.mp3'
  }
};

export async function generateStaticParams() {
  return Object.keys(meditations).map((id) => ({
    id,
  }));
} 