'use client';

import AudioPlayer from '@/components/AudioPlayer';
import GradientCover from '@/components/GradientCover';
import Link from 'next/link';

interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: string;
  variant: 'orange' | 'blue' | 'purple' | 'green';
  audioUrl: string;
}

interface MeditationClientProps {
  meditation: Meditation;
}

const convertDurationToSeconds = (duration: string): number => {
  const minutes = parseInt(duration.split(' ')[0]);
  return minutes * 60;
};

export default function MeditationClient({ meditation }: MeditationClientProps) {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <Link 
        href="/meditations"
        className="inline-flex items-center text-primary hover:text-primary-600 mb-4 sm:mb-6"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Назад до медитацій
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 sm:aspect-square lg:aspect-w-16 lg:aspect-h-9">
          <GradientCover 
            title={meditation.title}
            variant={meditation.variant}
          />
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{meditation.title}</h1>
            <p className="text-gray-600 text-sm sm:text-base">{meditation.description}</p>
          </div>

          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center text-gray-500">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm sm:text-base">{meditation.duration}</span>
            </div>
          </div>

          <AudioPlayer 
            src={meditation.audioUrl}
            title={meditation.title}
            variant={meditation.variant}
            initialDuration={convertDurationToSeconds(meditation.duration)}
          />
        </div>
      </div>
    </div>
  );
} 