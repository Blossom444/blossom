import Image from 'next/image';

interface GradientCoverProps {
  title: string;
  subtitle?: string;
  variant?: 'purple' | 'blue' | 'green' | 'orange' | 'red' | 'yellow' | 'beige';
  showTitle?: boolean;
  imageUrl?: string;
}

export default function GradientCover({ 
  title, 
  subtitle, 
  variant = 'purple',
  showTitle = true,
  imageUrl
}: GradientCoverProps) {
  const gradients = {
    purple: 'from-purple-400 to-purple-600',
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    orange: 'from-orange-400 to-orange-600',
    red: 'from-red-400 to-red-600',
    yellow: 'from-yellow-400 to-yellow-600',
    beige: 'from-[#F5F5DC] to-[#E8E4C9]'
  };

  return (
    <div className={`w-full h-full relative ${!imageUrl ? `bg-gradient-to-br ${gradients[variant]}` : ''} flex items-center justify-center p-4`}>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
          priority
        />
      )}
      <div className={`${imageUrl ? 'absolute inset-0 bg-black/40 z-10' : ''}`}></div>
      {showTitle && (
        <div className="text-center relative z-20 px-2">
          <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 drop-shadow-lg ${variant === 'beige' ? 'text-gray-800' : 'text-white'}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`text-base sm:text-lg md:text-xl drop-shadow-lg ${variant === 'beige' ? 'text-gray-700' : 'text-white/90'}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}