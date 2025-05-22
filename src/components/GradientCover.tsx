import Image from 'next/image';

interface GradientCoverProps {
  title: string;
  subtitle?: string;
  variant?: 'purple' | 'blue' | 'green' | 'orange' | 'red' | 'yellow';
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
    yellow: 'from-yellow-400 to-yellow-600'
  };

  return (
    <div className={`w-full h-full relative ${!imageUrl ? `bg-gradient-to-br ${gradients[variant]}` : ''} flex items-center justify-center p-4`}>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
      <div className={`${imageUrl ? 'absolute inset-0 bg-black/30 z-10' : ''}`}></div>
      {showTitle && (
        <div className="text-center relative z-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg sm:text-xl text-white/90">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
} 