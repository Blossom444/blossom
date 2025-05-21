interface GradientCoverProps {
  title: string;
  subtitle?: string;
  variant?: 'orange' | 'blue' | 'purple' | 'green';
}

export default function GradientCover({ title, subtitle, variant = 'purple' }: GradientCoverProps) {
  const gradientClasses = {
    orange: 'from-orange-500 to-red-600',
    blue: 'from-blue-500 to-indigo-600',
    purple: 'from-indigo-500 to-purple-600',
    green: 'from-green-500 to-teal-600'
  };

  return (
    <div className={`relative bg-gradient-to-r ${gradientClasses[variant]} py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-indigo-100">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
} 