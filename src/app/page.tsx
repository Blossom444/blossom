import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Фонове зображення */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/IMG_8991.jpg"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
          quality={100}
        />
      </div>

      {/* Темний оверлей для кращої читабельності тексту */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      {/* Контент */}
      <div className="relative z-20 container mx-auto px-4 min-h-screen flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-white">
            BLOSSOM
          </h1>
          <p className="text-2xl text-white/90 mb-12">
            Ваш простір для медитації та духовного розвитку
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/meditations"
              className="bg-white/20 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-lg hover:bg-white/30 transition-all duration-300 text-lg font-medium"
            >
              Почати медитацію
            </Link>
            <Link
              href="/planner"
              className="bg-white/20 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-lg hover:bg-white/30 transition-all duration-300 text-lg font-medium"
            >
              Книга змін
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 