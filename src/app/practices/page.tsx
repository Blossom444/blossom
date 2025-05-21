'use client';

import Link from 'next/link';

interface Practice {
  id: string;
  title: string;
  description: string;
  type: 'text' | 'video' | 'audio';
  isPremium: boolean;
  thumbnail?: string;
}

const practices: Practice[] = [
  {
    id: '1',
    title: 'Ранкові практики усвідомленості',
    description: 'Комплекс вправ для початку дня з енергією та ясністю розуму.',
    type: 'text',
    isPremium: false,
  },
  {
    id: '2',
    title: 'Дихальні техніки',
    description: 'Відеоурок з техніками дихання для зняття стресу та тривоги.',
    type: 'video',
    isPremium: true,
    thumbnail: '/images/breathing.jpg',
  },
  {
    id: '3',
    title: 'Медитація "Внутрішній спокій"',
    description: 'Аудіозапис медитації для глибокого розслаблення.',
    type: 'audio',
    isPremium: true,
    thumbnail: '/images/meditation.jpg',
  },
];

export default function Practices() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Практики
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {practices.map((practice) => (
          <div key={practice.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {practice.thumbnail ? (
              <div className="relative h-48 bg-gray-200">
                <img
                  src={practice.thumbnail}
                  alt={practice.title}
                  className="w-full h-full object-cover"
                />
                {practice.isPremium && (
                  <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-sm">
                    Преміум
                  </div>
                )}
              </div>
            ) : (
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {practice.type === 'text' && (
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">{practice.title}</h2>
                <span className={`px-2 py-1 rounded text-sm ${
                  practice.type === 'video' ? 'bg-blue-100 text-blue-800' :
                  practice.type === 'audio' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {practice.type === 'video' ? 'Відео' :
                   practice.type === 'audio' ? 'Аудіо' : 'Текст'}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{practice.description}</p>
              
              <Link
                href={`/practices/${practice.id}`}
                className={`block w-full text-center py-2 px-4 rounded-md transition-colors ${
                  practice.isPremium
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'border border-primary text-primary hover:bg-primary/10'
                }`}
              >
                {practice.isPremium ? 'Придбати' : 'Читати'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 