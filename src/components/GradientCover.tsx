interface GradientCoverProps {
  title: string;
  subtitle?: string;
  variant?: 'purple' | 'blue' | 'green' | 'orange' | 'red' | 'yellow';
}

export default function GradientCover({ 
  title, 
  subtitle, 
  variant = 'purple' 
}: GradientCoverProps) {
  const gradients = {
    purple: 'from-purple-500 to-purple-700',
    blue: 'from-blue-500 to-blue-700',
    green: 'from-green-500 to-green-700',
    orange: 'from-orange-500 to-orange-700',
    red: 'from-red-500 to-red-700',
    yellow: 'from-yellow-500 to-yellow-700'
  };

  return (
    <div className={`w-full py-16 bg-gradient-to-br ${gradients[variant]} flex flex-col items-center justify-center p-4 text-white`}>
      <h1 className="text-4xl font-bold text-center mb-4">{title}</h1>
        {subtitle && (
        <p className="text-xl text-center text-white/90">{subtitle}</p>
        )}
    </div>
  );
} 