// Rashid's Google Maps listing ("Kite And Bike Watamu kenia", Garoda, Watamu)
export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Kite%20And%20Bike%20Watamu%20kenia&query_place_id=ChIJIS4AtiB_FRgRRbVzHxEvXEQ';

const EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986!2d39.9885447!3d-3.3747159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18157f20b6002e21%3A0x445c2f111f73b545!2sKite%20And%20Bike%20Watamu%20kenia!5e0!3m2!1sen!2sit!4v1702400000000!5m2!1sen!2sit';

interface LocationMapProps {
  // Sizing and spacing, e.g. "h-64 md:h-80 mb-6"
  className?: string;
}

export default function LocationMap({ className = '' }: LocationMapProps) {
  return (
    <div className={`relative rounded-2xl overflow-hidden bg-gray-200 ${className}`}>
      <iframe
        src={EMBED_URL}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="KITE & BIKE TOURS AND ADVENTURE Location"
      />
    </div>
  );
}
