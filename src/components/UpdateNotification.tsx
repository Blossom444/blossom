'use client';

import { useEffect, useState } from 'react';

export default function UpdateNotification() {
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Check for updates every 1 hour
      const interval = setInterval(checkForUpdates, 3600000);

      // Initial check
      checkForUpdates();

      return () => clearInterval(interval);
    }
  }, []);

  const checkForUpdates = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Check if there's a waiting service worker
      if (registration.waiting) {
        setShowUpdateNotification(true);
      }

      // Listen for new service workers
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setShowUpdateNotification(true);
            }
          });
        }
      });
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  };

  const updateApp = async () => {
    const registration = await navigator.serviceWorker.ready;
    
    if (registration.waiting) {
      // Send skip waiting message
      registration.waiting.postMessage({ action: 'skipWaiting' });
    }

    // Reload the page to activate the new service worker
    window.location.reload();
  };

  if (!showUpdateNotification) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-indigo-600 text-white p-4 rounded-lg shadow-lg">
      <p className="mb-2">Доступна нова версія додатку!</p>
      <button
        onClick={updateApp}
        className="bg-white text-indigo-600 px-4 py-2 rounded hover:bg-indigo-50 transition-colors"
      >
        Оновити зараз
      </button>
    </div>
  );
} 