'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  // Закриваємо меню при зміні маршруту
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Блокуємо скролл коли меню відкрите
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isActive = (path: string) => pathname === path;

  const AuthButtons = () => {
    if (user) {
      console.log('Current user:', user);
      return (
        <>
          {user.role === 'admin' && (
            <Link 
              href="/admin"
              className={`${isActive('/admin') ? 'text-primary' : 'text-gray-600'} hover:text-primary transition-colors`}
            >
              Адмін-панель
            </Link>
          )}
          <Link 
            href="/profile"
            className={`${isActive('/profile') ? 'text-primary' : 'text-gray-600'} hover:text-primary transition-colors`}
          >
            Мій профіль
          </Link>
        </>
      );
    }

    return (
      <>
        <Link 
          href="/login"
          className="text-gray-600 hover:text-primary transition-colors"
        >
          Увійти
        </Link>
        <Link 
          href="/register"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Реєстрація
        </Link>
      </>
    );
  };

  const MobileAuthButtons = () => {
    if (user) {
      return (
        <>
          {user.role === 'admin' && (
            <Link 
              href="/admin"
              className={`block text-xl ${isActive('/admin') ? 'text-primary font-semibold' : 'text-gray-600'} hover:text-primary transition-colors`}
            >
              Адмін-панель
            </Link>
          )}
          <Link 
            href="/profile"
            className={`block text-xl ${isActive('/profile') ? 'text-primary font-semibold' : 'text-gray-600'} hover:text-primary transition-colors`}
          >
            Мій профіль
          </Link>
        </>
      );
    }

    return (
      <>
        <Link 
          href="/login"
          className="block text-xl text-gray-600 hover:text-primary transition-colors"
        >
          Увійти
        </Link>
        <Link 
          href="/register"
          className="block bg-primary text-white text-xl px-4 py-3 rounded-md hover:bg-primary/90 transition-colors text-center mt-8"
        >
          Реєстрація
        </Link>
      </>
    );
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-primary">
            BLOSSOM
          </Link>
          
          {/* Десктопне меню */}
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/meditations"
              className={`${isActive('/meditations') ? 'text-primary' : 'text-gray-600'} hover:text-primary transition-colors`}
            >
              Медитації
            </Link>
            <Link 
              href="/practices"
              className={`${isActive('/practices') ? 'text-primary' : 'text-gray-600'} hover:text-primary transition-colors`}
            >
              Практики
            </Link>
            <Link 
              href="/planner"
              className={`${isActive('/planner') ? 'text-primary' : 'text-gray-600'} hover:text-primary transition-colors`}
            >
              Книга Змін
            </Link>
            <AuthButtons />
          </div>

          {/* Мобільна кнопка меню */}
          <button
            className="md:hidden p-2 z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
          >
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Мобільне меню */}
        <div 
          className={`
            fixed inset-0 bg-white z-40 md:hidden
            transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="pt-20 px-4 space-y-6">
            <Link 
              href="/meditations"
              className={`block text-xl ${isActive('/meditations') ? 'text-primary font-semibold' : 'text-gray-600'} hover:text-primary transition-colors`}
            >
              Медитації
            </Link>
            <Link 
              href="/practices"
              className={`block text-xl ${isActive('/practices') ? 'text-primary font-semibold' : 'text-gray-600'} hover:text-primary transition-colors`}
            >
              Практики
            </Link>
            <Link 
              href="/planner"
              className={`block text-xl ${isActive('/planner') ? 'text-primary font-semibold' : 'text-gray-600'} hover:text-primary transition-colors`}
            >
              Книга Змін
            </Link>
            <MobileAuthButtons />
          </div>
        </div>
      </div>
    </nav>
  );
} 