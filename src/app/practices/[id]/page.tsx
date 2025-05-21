import { practicesData } from './generateStaticParams';
import PracticeClient from './PracticeClient';

export async function generateStaticParams() {
  return Object.keys(practicesData).map((id) => ({
    id,
  }));
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function PracticePage({ params }: PageProps) {
  const practiceData = practicesData[params.id as keyof typeof practicesData];

  if (!practiceData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Практику не знайдено</h1>
      </div>
    );
  }

  return <PracticeClient practiceData={practiceData} />;
} 