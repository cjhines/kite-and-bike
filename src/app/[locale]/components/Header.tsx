'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('Header');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl animate-wave">🌊</span>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent">KITE & BIKE</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Tours & Adventures</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">
              {t('home')}
            </Link>
            <Link href="/activities" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">
              {t('activities')}
            </Link>
            <Link href="/tours" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">
              {t('tours')}
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">
              {t('contact')}
            </Link>
            <LanguageSwitcher />
            <Link href="/contact" className="btn-primary text-sm">
              {t('bookNow')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in-up">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-gray-700 hover:text-cyan-600 font-medium py-2 transition-colors" onClick={() => setIsMenuOpen(false)}>
                🏠 {t('home')}
              </Link>
              <Link
                href="/activities"
                className="text-gray-700 hover:text-cyan-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}>
                🪁 {t('activities')}
              </Link>
              <Link
                href="/tours"
                className="text-gray-700 hover:text-cyan-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}>
                🗺️ {t('tours')}
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-cyan-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}>
                📞 {t('contact')}
              </Link>
              <div className="py-2">
                <LanguageSwitcher />
              </div>
              <Link href="/contact" className="btn-secondary text-center mt-2" onClick={() => setIsMenuOpen(false)}>
                {t('bookNow')} 🚀
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
