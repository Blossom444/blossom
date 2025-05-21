import { practicesData } from './generateStaticParams';

export async function generateStaticParams() {
  return Object.keys(practicesData).map((id) => ({
    id,
  }));
} 