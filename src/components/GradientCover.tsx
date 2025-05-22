interface GradientCoverProps {
  title: string;
  variant: 'purple' | 'blue' | 'green' | 'orange' | 'red' | 'yellow';
}

export default function GradientCover({ title, variant }: GradientCoverProps) {
  const gradients = {
    purple: 'from-purple-500 to-purple-700',
    blue: 'from-blue-500 to-blue-700',
    green: 'from-green-500 to-green-700',
    orange: 'from-orange-500 to-orange-700',
    red: 'from-red-500 to-red-700',
    yellow: 'from-yellow-500 to-yellow-700'
  };

  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradients[variant]} flex items-center justify-center p-4 text-white`}>
      <h3 className="text-xl font-semibold text-center">{title}</h3>
    </div>
  );
} 