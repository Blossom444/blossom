import { meditations } from './generateStaticParams';

export async function generateStaticParams() {
  return Object.keys(meditations).map((id) => ({
    id,
  }));
} 