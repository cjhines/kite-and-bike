import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText?: string;
  ctaLink?: string;
  contactText?: string;
  showScrollIndicator?: boolean;
}

export default function HeroSection({
  title,
  subtitle,
  backgroundImage,
  ctaText = 'Scopri le Avventure',
  ctaLink = '/activities',
  contactText = 'Contattaci',
  showScrollIndicator = true,
}: HeroSectionProps) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src={backgroundImage} alt="Hero background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <span className="text-6xl md:text-8xl mb-4 block animate-wave">🌊</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">{title}</h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ctaLink} className="btn-secondary text-lg px-8 py-4">
              {ctaText} 🚀
            </Link>
            <Link href="/contact" className="glass text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all">
              {contactText} 📞
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white rounded-full animate-pulse" />
          </div>
        </div>
      )}

      {/* Decorative waves */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 md:h-24">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          />
        </svg>
      </div>
    </section>
  );
}
