import { meditations as meditationsData } from '@/data/meditations';

export interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: string;
  variant: 'orange' | 'blue' | 'purple' | 'green' | 'red' | 'yellow';
  audioUrl: string;
  isPremium: boolean;
  category?: string;
}

// Конвертуємо масив в об'єкт для легшого доступу
export const meditations: Record<string, Meditation> = meditationsData.reduce((acc, meditation) => {
  acc[meditation.id] = meditation;
  return acc;
}, {} as Record<string, Meditation>);

export function generateStaticParams() {
  return Object.keys(meditations).map((id) => ({
    id,
  }));
} 