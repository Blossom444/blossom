'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  // Функція для перевірки чи користувач є адміністратором
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  const isHomePage = pathname === '/';

  const AuthButtons = () => {
    if (loading) {
      return null;
    }

    if (user) {
      return (
        <>
          {isAdmin() && (
            <Link 
              href="/admin"
              className={`${isActive('/admin') ? 'text-[#8B4513] border-b-2 border-[#8B4513]' : 'text-white hover:text-[#8B4513]'} px-3 py-2 rounded-md text-sm font-medium`}
            >
              Адмін панель
            </Link>
          )}
          <Link 
            href="/profile"
            className={`${isActive('/profile') ? 'text-[#8B4513] border-b-2 border-[#8B4513]' : 'text-white hover:text-[#8B4513]'} px-3 py-2 rounded-md text-sm font-medium`}
          >
            Мій профіль
          </Link>
          <button
            onClick={() => logout()}
            className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-[#8B4513] transition-colors duration-300"
          >
            Вийти
          </button>
        </>
      );
    }

    return (
      <>
        <Link 
          href="/login"
          className="px-4 py-2 rounded-md text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        >
          Увійти
        </Link>
        <Link 
          href="/register"
          className="px-4 py-2 rounded-md text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        >
          Реєстрація
        </Link>
      </>
    );
  };

  const MobileAuthButtons = () => {
    if (loading) {
      return null;
    }

    if (user) {
      return (
        <>
          {isAdmin() && (
            <Link 
              href="/admin"
              className={`block text-xl ${isActive('/admin') ? 'text-[#8B4513]' : 'text-white hover:text-[#8B4513]'}`}
            >
              Адмін панель
            </Link>
          )}
          <Link 
            href="/profile"
            className={`block text-xl ${isActive('/profile') ? 'text-[#8B4513]' : 'text-white hover:text-[#8B4513]'}`}
          >
            Мій профіль
          </Link>
          <button
            onClick={() => logout()}
            className="block text-xl text-white hover:text-[#8B4513]"
          >
            Вийти
          </button>
        </>
      );
    }

    return (
      <>
        <Link 
          href="/login"
          className="block text-xl text-white hover:text-[#8B4513]"
        >
          Увійти
        </Link>
        <Link 
          href="/register"
          className="block bg-white/10 backdrop-blur-md border border-white/20 text-white text-xl px-4 py-3 rounded-md hover:bg-white/20 transition-all duration-300 text-center mt-4"
        >
          Реєстрація
        </Link>
      </>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {!isHomePage && (
              <button
                onClick={() => router.back()}
                className="md:hidden text-white mr-4 hover:text-[#8B4513] transition-colors duration-300"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <Link href="/" className="text-white text-xl font-bold hover:text-[#8B4513] transition-colors duration-300">
              BLOSSOM
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/meditations"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                isActive('/meditations')
                  ? 'text-[#8B4513] border-b-2 border-[#8B4513]'
                  : 'text-white hover:text-[#8B4513]'
              }`}
            >
              Медитації
            </Link>
            <Link
              href="/planner"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                isActive('/planner')
                  ? 'text-[#8B4513] border-b-2 border-[#8B4513]'
                  : 'text-white hover:text-[#8B4513]'
              }`}
            >
              Книга змін
            </Link>
            <AuthButtons />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#8B4513] focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
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
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-50">
          <div className="px-4 pt-20 pb-3 space-y-6">
            <Link
              href="/meditations"
              className={`block text-xl ${
                isActive('/meditations')
                  ? 'text-[#8B4513]'
                  : 'text-white hover:text-[#8B4513]'
              }`}
            >
              Медитації
            </Link>
            <Link
              href="/planner"
              className={`block text-xl ${
                isActive('/planner')
                  ? 'text-[#8B4513]'
                  : 'text-white hover:text-[#8B4513]'
              }`}
            >
              Книга змін
            </Link>
            <div className="pt-4 border-t border-white/10">
              <MobileAuthButtons />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 