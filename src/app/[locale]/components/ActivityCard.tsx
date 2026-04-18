'use client';

import Image from 'next/image';

interface ActivityCardProps {
  title: string;
  description: string;
  price: string;
  duration?: string;
  image: string;
  emoji: string;
  features?: string[];
  bookNow: string;
  onBook: () => void;
}

export default function ActivityCard({ title, description, price, duration, image, emoji, features, bookNow, onBook }: ActivityCardProps) {
  return (
    <div className="card-hover bg-white rounded-2xl shadow-lg overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 img-zoom">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute top-4 left-4 text-4xl animate-float">{emoji}</span>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Features */}
        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {features.slice(0, 3).map((feature, index) => (
              <span key={index} className="text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full">
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Price & Duration */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-cyan-600">{price}</p>
            {duration && <p className="text-xs text-gray-500">⏱️ {duration}</p>}
          </div>
        </div>

        {/* Book Button */}
        <button onClick={onBook} className="w-full btn-primary text-sm py-2">
          {bookNow}
        </button>
      </div>
    </div>
  );
}
