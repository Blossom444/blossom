'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">Blossom</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/meditations"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/meditations')
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Медитації
              </Link>
              <Link
                href="/practices"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/practices')
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Практики
              </Link>
              <Link
                href="/planner"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/planner')
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Планер Blossom
              </Link>
              {session?.user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/admin')
                      ? 'border-red-500 text-red-900'
                      : 'border-transparent text-red-500 hover:border-red-300 hover:text-red-700'
                  }`}
                >
                  Адмін панель
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {session?.user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/profile"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/profile')
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Особистий кабінет
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Вийти
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Увійти
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Зареєструватися
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
} 