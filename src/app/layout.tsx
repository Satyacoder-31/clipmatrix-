import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicBackground from '@/components/DynamicBackground';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Clip Matrix | Viral Clipping Platform & Creator Economy Ecosystem',
  description:
    'Turn long-form videos into millions of verified views. Connect brands with top video clippers for Instagram Reels, YouTube Shorts, and TikTok with guaranteed CPM and escrow-protected payouts.',
  keywords: [
    'viral clipping agency',
    'short form video distribution',
    'reels clipping',
    'youtube shorts marketing',
    'performance cpm',
    'creator economy india',
  ],
  openGraph: {
    title: 'Clip Matrix | Premium Viral Clipping Platform',
    description: 'Transform every second of content into millions of verified views.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@600;700;800;900&family=Space+Grotesk:wght@500;600;700;800&family=Syne:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0a0e23] text-white antialiased selection:bg-purple-600 selection:text-white relative">
        <SmoothScroll>
          <ScrollProgressBar />
          <DynamicBackground />
          <Navbar />
          <main className="min-h-[calc(100vh-280px)]">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
