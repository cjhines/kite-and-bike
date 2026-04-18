'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import HeroSection from './components/HeroSection';
import ActivityCard from './components/ActivityCard';
import BookingModal from './components/BookingModal';

import { getFeaturedActivities } from './_data/featuredActivities';

export default function Home() {
  const t = useTranslations('Home');
  const tCommon = useTranslations('Common');
  const featuredActivities = getFeaturedActivities(t);

  // Stats
  const stats = [
    { value: '500+', label: t('stats.happyClients'), emoji: '😊' },
    { value: '50+', label: t('stats.toursCompleted'), emoji: '🗺️' },
    { value: '5', label: t('stats.yearsExperience'), emoji: '⭐' },
    { value: '24/7', label: t('stats.support'), emoji: '📞' },
  ];

  // Services categories
  const serviceCategories = [
    {
      title: t('services.categories.water.title'),
      description: t('services.categories.water.description'),
      icon: '🏄',
      link: '/activities',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      title: t('services.categories.tours.title'),
      description: t('services.categories.tours.description'),
      icon: '🗺️',
      link: '/tours',
      color: 'from-orange-500 to-red-500',
    },
    {
      title: t('services.categories.rentals.title'),
      description: t('services.categories.rentals.description'),
      icon: '🏍️',
      link: '/activities#rentals',
      color: 'from-green-500 to-teal-500',
    },
    {
      title: t('services.categories.photo.title'),
      description: t('services.categories.photo.description'),
      icon: '📸',
      link: '/activities#photos',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: t('services.categories.safaris.title'),
      description: t('services.categories.safaris.description'),
      icon: '🦁',
      link: '/activities#safaris',
      color: 'from-yellow-500 to-blue-500',
    },
  ];

  const [selectedActivity, setSelectedActivity] = useState<{
    name: string;
    price: string;
    duration?: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBooking = (activity: (typeof featuredActivities)[0]) => {
    setSelectedActivity({
      name: activity.title,
      price: activity.price,
      duration: activity.duration,
    });
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage="/fromRashid/waveRider.jpeg"
        ctaText={t('hero.cta')}
        ctaLink="/activities"
        contactText={t('hero.contact')}
      />

      {/* Services Categories */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('services.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('services.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((category, index) => (
              <Link key={index} href={category.link} className="group relative bg-white rounded-2xl p-6 shadow-lg card-hover text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{category.title}</h3>
                <p className="text-sm text-gray-500">{category.description}</p>
                <div className="mt-4 text-cyan-600 font-medium text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  {t('services.discoverMore')} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Activities */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('featured.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('featured.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                price={activity.price}
                duration={activity.duration}
                image={activity.image}
                emoji={activity.emoji}
                features={activity.features}
                bookNow={tCommon('bookNow')}
                onBook={() => handleBooking(activity)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/activities" className="btn-primary text-lg px-8">
              {t('featured.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-ocean">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.emoji}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('gallery.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('gallery.subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              '/fromRashid/IMG-20250119-WA0101.jpg',
              '/fromRashid/IMG-20250121-WA0015.jpg',
              '/fromRashid/IMG-20250121-WA0025.jpg',
              '/fromRashid/IMG-20250122-WA0070.jpg',
              '/fromRashid/IMG-20250903-WA0016.jpg',
              '/fromRashid/IMG-20251201-WA0009.jpg',
              '/fromRashid/IMG-20251201-WA0013.jpg',
              '/fromRashid/IMG-20251203-WA0010.jpg',
            ].map((src, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl img-zoom ${
                  index === 0 || index === 7 ? 'md:col-span-2 md:row-span-2 h-64 md:h-auto' : 'h-32 md:h-48'
                }`}>
                <Image src={src} alt={`Gallery image ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{t('whyUs.title')}</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: '🏆',
                    title: t('whyUs.reasons.experience.title'),
                    description: t('whyUs.reasons.experience.description'),
                  },
                  {
                    icon: '🛡️',
                    title: t('whyUs.reasons.safety.title'),
                    description: t('whyUs.reasons.safety.description'),
                  },
                  {
                    icon: '💰',
                    title: t('whyUs.reasons.pricing.title'),
                    description: t('whyUs.reasons.pricing.description'),
                  },
                  {
                    icon: '🤝',
                    title: t('whyUs.reasons.service.title'),
                    description: t('whyUs.reasons.service.description'),
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-2xl shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden img-zoom">
                <Image src="/fromRashid/WhatsApp Image 2025-12-03 at 11.01.31.jpeg" alt="Our team" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-sunset rounded-full flex items-center justify-center text-2xl">⭐</div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">4.9/5</div>
                    <div className="text-xs text-gray-500">{t('whyUs.rating')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-cyan-600 via-blue-600 to-cyan-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl">🌊</div>
          <div className="absolute bottom-10 right-10 text-9xl">🪁</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl">🌴</div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t('cta.title')}</h2>
          <p className="text-xl text-white/90 mb-8">{t('cta.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-cyan-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
              {t('cta.bookNow')}
            </Link>
            <a
              href="https://wa.me/254746171861"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors shadow-xl flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} activity={selectedActivity} />
    </>
  );
}
