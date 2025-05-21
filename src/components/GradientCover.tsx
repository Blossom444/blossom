interface GradientCoverProps {
  title: string;
  subtitle?: string;
}

export default function GradientCover({ title, subtitle }: GradientCoverProps) {
  return (
    <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 py-16">
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