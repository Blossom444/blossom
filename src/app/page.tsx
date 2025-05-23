'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    const img = new window.Image();
    img.src = '/images/IMG_8991.jpg';
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative">
      <div 
        className={`absolute inset-0 bg-[url('/images/IMG_8991.jpg')] bg-cover bg-center bg-fixed transition-opacity duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ filter: 'brightness(0.5)' }}
      />
      
      <div className="relative min-h-screen flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              BLOSSOM
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-12 drop-shadow-lg max-w-3xl mx-auto">
              Ваш особистий путівник до трансформації та розвитку
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/meditations" 
                className="w-full sm:w-64 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg font-medium rounded-lg transition-all duration-300 hover:bg-white/20 hover:shadow-lg"
              >
                Почати медитацію
              </Link>
              <Link 
                href="/planner" 
                className="w-full sm:w-64 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg font-medium rounded-lg transition-all duration-300 hover:bg-white/20 hover:shadow-lg"
              >
                Книга змін
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 