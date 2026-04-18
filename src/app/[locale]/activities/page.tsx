'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import BookingModal from '../components/BookingModal';
import { getKiteActivities, getRentals, getPhotoPackages, getSafaris } from '../_data/activitiesData';

export default function ActivitiesPage() {
  const t = useTranslations('Activities');

  const kiteActivities = getKiteActivities(t);
  const rentals = getRentals(t);
  const safaris = getSafaris(t);
  const photoPackages = getPhotoPackages(t);

  const [selectedActivity, setSelectedActivity] = useState<{
    name: string;
    price: string;
    duration?: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const handleBooking = (activity: { title: string; price: string; duration?: string }) => {
    setSelectedActivity({
      name: activity.title,
      price: activity.price,
      duration: activity.duration,
    });
    setIsModalOpen(true);
  };

  const tabs = [
    { id: 'all', label: t('tabs.all'), emoji: '✨' },
    { id: 'kite', label: t('tabs.kite'), emoji: '🪁' },
    { id: 'rentals', label: t('tabs.rentals'), emoji: '🏄' },
    { id: 'photos', label: t('tabs.photos'), emoji: '📸' },
    { id: 'safari', label: t('tabs.safari'), emoji: '🦁' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/fromRashid/IMG-20251201-WA0068.jpg" alt="Activities hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-5xl mb-4 block animate-wave">🪁</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('hero.title')}</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">{t('hero.subtitle')}</p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-16 md:top-20 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 py-4 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id ? 'bg-cyan-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                <span>{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Kite Lessons Section */}
      {(activeTab === 'all' || activeTab === 'kite') && (
        <section id="kite" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-5xl mb-4 block">🪁</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('kite.title')}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t('kite.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kiteActivities.map((activity) => (
                <div key={activity.id} className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                  <div className="bg-gradient-ocean p-6 text-center">
                    <span className="text-4xl">🪁</span>
                    <h3 className="text-xl font-bold text-white mt-2">{activity.title}</h3>
                    <p className="text-white/80 text-sm mt-1">⏱️ {activity.duration}</p>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {activity.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-cyan-600">{activity.price}</p>
                      <button onClick={() => handleBooking(activity)} className="btn-primary text-sm py-2 px-4">
                        {t('bookNow')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Rentals Section */}
      {(activeTab === 'all' || activeTab === 'rentals') && (
        <section id="rentals" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-5xl mb-4 block">🏄</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('rentals.title')}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t('rentals.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rentals.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-3xl">{item.emoji}</span>
                        <h3 className="text-lg font-bold text-gray-800 mt-2">{item.title}</h3>
                        <p className="text-sm text-gray-500">⏱️ {item.duration}</p>
                      </div>
                      <p className="text-2xl font-bold text-cyan-600">{item.price}</p>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <button onClick={() => handleBooking(item)} className="w-full btn-secondary text-sm py-2">
                      {t('bookNow')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Safari Section */}
      {(activeTab === 'all' || activeTab === 'safari') && (
        <section id="rentals" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-5xl mb-4 block">🦁</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('safari.title')}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t('safari.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safaris.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-3xl">{item.emoji}</span>
                        <h3 className="text-lg font-bold text-gray-800 mt-2">{item.title}</h3>
                        <p className="text-sm text-gray-500">⏱️ {item.duration}</p>
                      </div>
                      <p className="text-2xl font-bold text-cyan-600">{item.price}</p>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <button onClick={() => handleBooking(item)} className="w-full btn-secondary text-sm py-2">
                      {t('bookNow')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Photo Packages Section */}
      {(activeTab === 'all' || activeTab === 'photos') && (
        <section id="photos" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-5xl mb-4 block">📸</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('photos.title')}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t('photos.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {photoPackages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                  <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-7xl">{pkg.emoji}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pkg.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-purple-600">{pkg.price}</p>
                        <p className="text-xs text-gray-500">{pkg.priceNote}</p>
                      </div>
                      <button
                        onClick={() => handleBooking({ ...pkg, duration: undefined })}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity">
                        {t('bookNow')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Info Banner */}
      <section className="py-8 bg-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-white">
              <span className="text-3xl">💡</span>
              <p className="font-medium">{t('features.banner')}</p>
            </div>
            <a
              href="https://wa.me/254746171861"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors flex items-center gap-2 shrink-0">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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
