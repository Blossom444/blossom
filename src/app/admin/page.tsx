'use client';

import AdminPanel from '@/components/AdminPanel';

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Адмін панель</h1>
      <AdminPanel />
    </div>
  );
} 