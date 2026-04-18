import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'KITE & BIKE TOURS AND ADVENTURE | Watamu, Kenya',
  description:
    'Your premier destination for unforgettable experiences in Watamu, Kenya! Kite lessons, Safari Blue, tours and more. Ride the waves of adventure with us! 🌊',
  keywords: "Watamu, Kenya, kite surfing, tours, adventures, Safari Blue, Hell's Kitchen, Marafa, paddle board, snorkeling",
  openGraph: {
    title: 'KITE & BIKE TOURS AND ADVENTURE ',
    description: 'Unforgettable adventures in Watamu, Kenya! 🌴',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="pt-16 md:pt-20">
            {children}
            <Analytics />
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
