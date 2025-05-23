'use client';

import { useState, useRef, useEffect } from 'react';
import GradientCover from './GradientCover';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  initialDuration?: number;
  variant: 'orange' | 'blue' | 'purple' | 'green' | 'red' | 'yellow';
  disabled?: boolean;
}

export default function AudioPlayer({ audioUrl, title, initialDuration = 0, variant, disabled = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(initialDuration);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    // Перевіряємо, чи це мобільний пристрій
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setError('Помилка завантаження аудіо файлу');
      setIsLoading(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audioUrl]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error('Playback error:', err);
      setError('Помилка відтворення аудіо');
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || disabled) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;
    const percentage = x / width;
    const newTime = percentage * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handlePlaybackRateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rate = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'purple':
        return 'from-purple-500 to-purple-700';
      case 'blue':
        return 'from-blue-500 to-blue-700';
      case 'green':
        return 'from-green-500 to-green-700';
      case 'orange':
        return 'from-orange-500 to-orange-700';
      case 'red':
        return 'from-red-500 to-red-700';
      case 'yellow':
        return 'from-yellow-500 to-yellow-700';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  if (error) {
    return (
      <div className="text-center p-4 bg-red-50 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg p-2 sm:p-4 shadow-md ${disabled ? 'opacity-90' : ''}`}>
      <div className="relative aspect-square mb-2 sm:mb-4 rounded-lg overflow-hidden">
        <GradientCover title={title} variant={variant} />
      </div>

      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <select
          value={playbackRate}
          onChange={handlePlaybackRateChange}
          className={`bg-gray-100 text-gray-700 px-3 py-1 rounded-lg ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
          disabled={disabled}
        >
          {playbackRates.map((rate) => (
            <option key={rate} value={rate}>
              {rate}x
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={togglePlay}
          className={`w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r ${getVariantClasses()} text-white hover:opacity-90 transition-opacity ${disabled ? 'bg-gray-400 cursor-not-allowed' : ''}`}
          disabled={disabled}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className={`w-full h-2 bg-gray-200 rounded-lg appearance-none ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!isMobile && (
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
          </svg>
        )}
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={handleVolumeChange}
          className={`w-24 h-2 bg-gray-200 rounded-lg appearance-none ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
        />
      </div>
    </div>
  );
} 