export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 w-full h-full">
        <Image
          src="/images/IMG_8991.jpg"
          alt="Background"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          priority
          quality={100}
        />
      </div>
      
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
              BLOSSOM
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 drop-shadow-lg max-w-3xl mx-auto px-4">
              Ваш особистий путівник до трансформації та розвитку
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Link 
                href="/meditations" 
                className="w-full sm:w-64 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-base sm:text-lg font-medium rounded-lg transition-all duration-300 hover:bg-white/20 hover:shadow-lg"
              >
                Почати медитацію
              </Link>
              <Link 
                href="/planner" 
                className="w-full sm:w-64 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-base sm:text-lg font-medium rounded-lg transition-all duration-300 hover:bg-white/20 hover:shadow-lg"
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