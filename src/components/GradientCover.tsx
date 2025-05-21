interface GradientCoverProps {
  title: string;
  subtitle?: string;
  variant?: 'orange' | 'blue' | 'purple' | 'green';
}

export default function GradientCover({ title, subtitle }: GradientCoverProps) {
  return (
    <div className="relative bg-black/20 backdrop-blur-sm py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4 font-serif">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-white/90 font-light">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
} 