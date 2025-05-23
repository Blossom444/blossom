import { meditations as meditationsData } from '@/data/meditations';
import { Meditation } from '@/types';

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