'use client';

import { useState, useEffect } from 'react';

export default function PracticesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Практики
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Додаткові матеріали та практики для поглиблення вашого розвитку
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Щоденні практики</h3>
            <p className="text-gray-600 mb-4">
              Короткі вправи для щоденного використання
            </p>
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
              Переглянути
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Дихальні техніки</h3>
            <p className="text-gray-600 mb-4">
              Різноманітні техніки дихання для релаксації
            </p>
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
              Переглянути
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Візуалізації</h3>
            <p className="text-gray-600 mb-4">
              Керовані візуалізації для досягнення цілей
            </p>
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
              Переглянути
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 