'use client';

import { useState } from 'react';

interface User {
  _id: string;
  email: string;
  name: string;
  isPremium: boolean;
  role: 'user' | 'admin';
  accessibleMeditations: string[];
  accessiblePractices: string[];
}

interface PremiumManagementProps {
  users: User[];
  onUpdateUser: (userId: string, updates: Partial<User>) => Promise<void>;
}

export default function PremiumManagement({ users, onUpdateUser }: PremiumManagementProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handlePremiumToggle = async (userId: string) => {
    try {
      setLoading(userId);
      const user = users.find(u => u._id === userId);
      if (!user) return;

      await onUpdateUser(userId, { isPremium: !user.isPremium });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Premium Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.isPremium ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.isPremium ? 'Premium' : 'Standard'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handlePremiumToggle(user._id)}
                    disabled={loading === user._id}
                    className={`px-4 py-2 rounded-md ${
                      user.isPremium
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-yellow-600 hover:bg-yellow-700'
                    } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                  >
                    {loading === user._id
                      ? 'Updating...'
                      : user.isPremium
                      ? 'Remove Premium'
                      : 'Grant Premium'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 