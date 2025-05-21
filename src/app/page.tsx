import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Ласкаво просимо до BLOSSOM
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Ваш простір для медитації та духовного розвитку
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/meditations"
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Почати медитацію
          </Link>
          <Link
            href="/practices"
            className="bg-white text-primary px-8 py-3 rounded-lg border-2 border-primary hover:bg-gray-50 transition-colors"
          >
            Переглянути практики
          </Link>
        </div>
      </div>
    </div>
  );
} 