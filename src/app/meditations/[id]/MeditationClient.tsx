'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AudioPlayer from '@/components/AudioPlayer';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import GradientCover from '@/components/GradientCover';

interface Meditation {
  id: string;
  title: string;
  duration: string;
  description: string;
  variant: 'purple' | 'blue' | 'green' | 'orange' | 'red' | 'yellow';
  audioUrl: string;
  isPremium: boolean;
  category: string;
}

interface MeditationClientProps {
  meditation: Meditation;
}

export default function MeditationClient({ meditation }: MeditationClientProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const router = useRouter();
  const { user } = useAuth();

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleDurationChange = (duration: number) => {
    setDuration(duration);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      setVolume(1);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  const handlePremiumAccess = () => {
    if (!user) {
      router.push('/login?redirect=/meditations');
    } else {
      router.push('/subscription');
    }
  };

  const convertDurationToSeconds = (duration: string) => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        href="/meditations"
        className="inline-flex items-center text-gray-600 hover:text-primary mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Назад до медитацій
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative aspect-video">
          <GradientCover
            title={meditation.title}
            subtitle={meditation.duration}
            variant={meditation.variant}
            imageUrl={`/images/meditations/${meditation.id}.jpg`}
          />
          {meditation.isPremium && (
            <div className="absolute top-4 right-4 bg-yellow-400 text-sm px-3 py-1 rounded-full">
              Premium
            </div>
          )}
        </div>

        <div className="p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">{meditation.title}</h1>
          <p className="text-gray-600 mb-6">{meditation.description}</p>

          {meditation.isPremium && !user?.isPremium ? (
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Преміум контент</h2>
              <p className="text-gray-600 mb-6">
                Ця медитація доступна тільки для преміум користувачів. Отримайте доступ до всіх медитацій та інших преміум функцій.
              </p>
              <button
                onClick={handlePremiumAccess}
                className="bg-[#8B4513] text-white px-6 py-3 rounded-lg hover:bg-[#6B3410] transition-colors"
              >
                {user ? 'Отримати преміум доступ' : 'Увійти для доступу'}
              </button>
            </div>
          ) : (
            <AudioPlayer
              src={meditation.audioUrl}
              title={meditation.title}
              initialDuration={convertDurationToSeconds(meditation.duration)}
              variant={meditation.variant}
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              volume={volume}
              isMuted={isMuted}
              playbackRate={playbackRate}
              onPlayPause={handlePlayPause}
              onTimeUpdate={handleTimeUpdate}
              onDurationChange={handleDurationChange}
              onVolumeChange={handleVolumeChange}
              onMuteToggle={handleMuteToggle}
              onPlaybackRateChange={handlePlaybackRateChange}
              onSeek={handleSeek}
            />
          )}
        </div>
      </div>
    </div>
  );
} 