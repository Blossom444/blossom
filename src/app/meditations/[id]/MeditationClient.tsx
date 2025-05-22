'use client';

import AudioPlayer from '@/components/AudioPlayer';
import GradientCover from '@/components/GradientCover';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: string;
  variant: 'orange' | 'blue' | 'purple' | 'green' | 'red' | 'yellow';
  audioUrl: string;
  isPremium: boolean;
}

interface MeditationClientProps {
  meditation: Meditation;
}

const convertDurationToSeconds = (duration: string): number => {
  const minutes = parseInt(duration.split(' ')[0]);
  return minutes * 60;
};

export default function MeditationClient({ meditation }: MeditationClientProps) {
  const { hasPremiumAccess } = useAuth();
  const canAccessPremium = hasPremiumAccess();

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <Link 
        href="/meditations"
        className="inline-flex items-center text-primary hover:text-primary-600 mb-3 sm:mb-6 text-sm sm:text-base"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2"
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
        <div className="aspect-square relative">
          <GradientCover 
            title={meditation.title}
            variant={meditation.variant}
            imageUrl={`/images/meditations/${meditation.id}.jpg`}
          />
          {meditation.isPremium && (
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 text-amber-400 font-semibold text-xs sm:text-sm z-10 drop-shadow-md px-2 sm:px-3 py-0.5 sm:py-1 rounded-full backdrop-blur-sm">
              Преміум
            </div>
          )}
        </div>
        
        <div className="p-3 sm:p-6">
          <div className="mb-3 sm:mb-6">
            <h1 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4">{meditation.title}</h1>
            <p className="text-gray-600 text-sm sm:text-base">{meditation.description}</p>
          </div>

          <div className="flex items-center justify-between mb-3 sm:mb-6">
            <div className="flex items-center text-gray-500">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2"
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

          {meditation.isPremium && !canAccessPremium ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="relative">
                <AudioPlayer 
                  src={meditation.audioUrl}
                  title={meditation.title}
                  variant={meditation.variant}
                  initialDuration={convertDurationToSeconds(meditation.duration)}
                  disabled={true}
                />
                <div className="absolute inset-0 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
                  <div className="bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg text-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-700 font-medium text-sm sm:text-base">Повна версія доступна з Преміум</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50/50 backdrop-blur-sm p-3 sm:p-6 rounded-xl text-center border border-amber-200 shadow-inner">
                <h3 className="text-amber-800 font-medium mb-2 flex items-center justify-center gap-1 text-sm sm:text-base">
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                  <span>Преміум медитація</span>
                </h3>
                <p className="text-amber-700 mb-3 sm:mb-4 text-xs sm:text-sm">Ця медитація доступна у преміум версії, але ви можете послухати безкоштовні медитації</p>
                <Link
                  href="/planner"
                  className="inline-block bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full hover:from-amber-500 hover:to-amber-600 transition-all shadow-md text-sm sm:text-base"
                >
                  Отримати преміум
                </Link>
              </div>
            </div>
          ) : (
            <AudioPlayer 
              src={meditation.audioUrl}
              title={meditation.title}
              variant={meditation.variant}
              initialDuration={convertDurationToSeconds(meditation.duration)}
            />
          )}
        </div>
      </div>
    </div>
  );
} 