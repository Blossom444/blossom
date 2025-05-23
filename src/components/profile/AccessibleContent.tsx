'use client';

import { useState } from 'react';
import { meditations } from '@/data/meditations';
import { practices } from '@/data/practices';

interface User {
  _id: string;
  email: string;
  name: string;
  isPremium: boolean;
  role: 'user' | 'admin';
  accessibleMeditations: string[];
  accessiblePractices: string[];
}

interface AccessibleContentProps {
  user: User;
}

export default function AccessibleContent({ user }: AccessibleContentProps) {
  const [activeTab, setActiveTab] = useState<'meditations' | 'practices'>('meditations');

  const accessibleMeditations = meditations.filter(meditation => 
    user.accessibleMeditations.includes(meditation.id)
  );

  const accessiblePractices = practices.filter(practice => 
    user.accessiblePractices.includes(practice.id)
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('meditations')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'meditations'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Медитації
        </button>
        <button
          onClick={() => setActiveTab('practices')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'practices'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Практики
        </button>
      </div>

      {activeTab === 'meditations' ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">Доступні медитації</h3>
          {accessibleMeditations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {accessibleMeditations.map((meditation) => (
                <div
                  key={meditation.id}
                  className="bg-purple-50 rounded-lg p-4 hover:bg-purple-100 transition-colors"
                >
                  <h4 className="font-medium text-purple-900">{meditation.title}</h4>
                  <p className="text-sm text-purple-700 mt-2">{meditation.description}</p>
                  <div className="mt-4">
                    <a
                      href={`/meditations/${meditation.id}`}
                      className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Почати медитацію
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">У вас поки немає доступних медитацій</p>
          )}
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-4">Доступні практики</h3>
          {accessiblePractices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {accessiblePractices.map((practice) => (
                <div
                  key={practice.id}
                  className="bg-purple-50 rounded-lg p-4 hover:bg-purple-100 transition-colors"
                >
                  <h4 className="font-medium text-purple-900">{practice.title}</h4>
                  <p className="text-sm text-purple-700 mt-2">{practice.description}</p>
                  <div className="mt-4">
                    <a
                      href={`/practices/${practice.id}`}
                      className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Почати практику
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">У вас поки немає доступних практик</p>
          )}
        </div>
      )}

      {user.isPremium && (
        <div className="mt-8 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
          <h3 className="text-xl font-semibold mb-2">✨ Premium статус активний</h3>
          <p>Ви маєте доступ до всіх медитацій та практик</p>
        </div>
      )}
    </div>
  );
} 