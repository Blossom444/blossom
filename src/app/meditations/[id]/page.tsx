import { meditations } from './generateStaticParams';
import MeditationClient from './MeditationClient';

export async function generateStaticParams() {
  return Object.keys(meditations).map((id) => ({
    id,
  }));
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function MeditationPage({ params }: PageProps) {
  const meditation = meditations[params.id as keyof typeof meditations];

  if (!meditation) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Медитацію не знайдено</h1>
      </div>
    );
  }

  return <MeditationClient meditation={meditation} />;
} 