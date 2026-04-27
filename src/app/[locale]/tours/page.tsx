'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import BookingModal from '../components/BookingModal';
import { getTours } from '../_data/toursData';

export default function ToursPage() {
  const t = useTranslations('Tours');
  const tours = getTours(t);

  const [selectedTour, setSelectedTour] = useState<(typeof tours)[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingActivity, setBookingActivity] = useState<{
    name: string;
    price: string;
    duration?: string;
  } | null>(null);

  const handleViewDetails = (tour: (typeof tours)[0]) => {
    setSelectedTour(tour);
    setIsDetailOpen(true);
  };

  const handleBooking = (tour: (typeof tours)[0]) => {
    setBookingActivity({
      name: tour.title,
      price: tour.price,
      duration: tour.duration,
    });
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/fromRashid/IMG-20251203-WA0033.jpg" alt="Tours hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-5xl mb-4 block animate-wave">🗺️</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('hero.title')}</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">{t('hero.subtitle')}</p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tours.map((tour) => (
              <div key={tour.id} id={tour.id} className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group">
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative w-full md:w-2/5 h-48 md:h-auto img-zoom">
                    <Image src={tour.image} alt={tour.title} fill className="object-cover" />
                    <div className="absolute top-4 left-4 text-4xl animate-float">{tour.emoji}</div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{tour.title}</h3>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-cyan-600">{tour.price}</p>
                        {tour.priceNote && <p className="text-xs text-gray-500">{tour.priceNote}</p>}
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-3">⏱️ {tour.duration}</p>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tour.highlights.map((highlight, idx) => (
                        <span key={idx} className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full">
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleViewDetails(tour)}
                        className="flex-1 border-2 border-cyan-500 text-cyan-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-cyan-50 transition-colors">
                        {t('viewDetails')}
                      </button>
                      <button onClick={() => handleBooking(tour)} className="flex-1 btn-secondary text-sm py-2">
                        {t('bookNow')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-12 bg-gradient-sunset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-white">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{t('specialOffer.title')}</h3>
              <p className="text-white/90">{t('specialOffer.description')}</p>
            </div>
            <a
              href="https://wa.me/254746171861?text=Hello!%20I%20am%20interested%20in%20the%20combo%20tours%20package!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shrink-0">
              {t('specialOffer.button')}
            </a>
          </div>
        </div>
      </section>

      {/* Why Our Tours Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('whyChoose.title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '👨‍🏫',
                title: t('whyChoose.reasons.0.title'),
                description: t('whyChoose.reasons.0.description'),
              },
              {
                icon: '🚗',
                title: t('whyChoose.reasons.1.title'),
                description: t('whyChoose.reasons.1.description'),
              },
              {
                icon: '📱',
                title: t('whyChoose.reasons.2.title'),
                description: t('whyChoose.reasons.2.description'),
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Detail Modal */}
      {isDetailOpen && selectedTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
          <div className="absolute inset-0" onClick={() => setIsDetailOpen(false)} />

          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
            {/* Header Image */}
            <div className="relative h-48">
              <Image src={selectedTour.image} alt={selectedTour.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button
                onClick={() => setIsDetailOpen(false)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="text-4xl">{selectedTour.emoji}</span>
                <h2 className="text-2xl font-bold text-white">{selectedTour.title}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Price & Duration */}
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-cyan-100 px-4 py-2 rounded-full">
                  <span className="text-xl font-bold text-cyan-700">{selectedTour.price}</span>
                  {selectedTour.priceNote && <span className="text-sm text-cyan-600 ml-1">{selectedTour.priceNote}</span>}
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-full">
                  <span className="text-gray-700">⏱️ {selectedTour.duration}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6">{selectedTour.longDescription}</p>

              {/* What's Included */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">✅ {t('includes')}:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedTour.includes.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                      <span className="text-green-500">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">🌟 {t('highlights')}:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTour.highlights.map((highlight, idx) => (
                    <span key={idx} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={() => {
                  setIsDetailOpen(false);
                  handleBooking(selectedTour);
                }}
                className="w-full btn-secondary text-lg py-4">
                {t('bookNow')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} activity={bookingActivity} />
    </>
  );
}
