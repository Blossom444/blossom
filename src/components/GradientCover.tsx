interface GradientCoverProps {
  variant?: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
}

const gradients = {
  purple: 'from-primary-100 to-primary-600',
  blue: 'from-blue-100 to-blue-600',
  green: 'from-green-100 to-green-600',
  orange: 'from-orange-100 to-orange-600',
};

export default function GradientCover({ variant = 'purple', title }: GradientCoverProps) {
  const gradientClasses = gradients[variant];

  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradientClasses} flex items-center justify-center p-4`}>
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-white font-medium text-lg">{title}</h3>
      </div>
    </div>
  );
} 