'use client';

import NextError from 'next/error';

// Served by GitHub Pages as 404.html for unknown URLs. The root layout only passes children
// through, so this page needs its own <html> and <body>.
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <NextError statusCode={404} />
      </body>
    </html>
  );
}
