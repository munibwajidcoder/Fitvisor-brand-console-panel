import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FitAdvisor Partner Brand Console',
  description: 'Enterprise portal for fashion brands, retailers, and in-store boutique partners to connect brand catalogs to AI virtual try-on.',
  keywords: ['Fitvisor', 'Virtual Try-On', 'Fashion Tech', 'Brand Partner Console', 'Retail Portal'],
  authors: [{ name: 'Fitvisor Technologies' }],
  icons: {
    icon: [
      { url: '/image%20copy.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/image%20copy.png',
    apple: '/image%20copy.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href="/image%20copy.png" />
        <link rel="apple-touch-icon" href="/image%20copy.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
