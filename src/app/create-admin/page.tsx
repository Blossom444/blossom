'use client';

import { useState } from 'react';

export default function CreateAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const createAdmin = async () => {
    try {
      setIsLoading(true);
      setMessage('');

      const response = await fetch('/api/auth/create-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@blossom.com',
          password: '122222111'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create admin');
      }

      setMessage('Admin created successfully!');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to create admin');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Create Admin
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <button
            onClick={createAdmin}
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Admin'}
          </button>
          {message && (
            <p className={`mt-4 text-sm ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 