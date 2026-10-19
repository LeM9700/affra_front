import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AttributionTracker from '@/components/attribution/AttributionTracker'
import PreviewBanner from '@/components/layout/PreviewBanner'
import { IS_PREVIEW } from '@/lib/site-env'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'AFFRA Réseaux Installation de bornes de recharge IRVE',
  description:
    'Spécialiste certifié IRVE dans le Gard (30) et l’Hérault (34). Installation de bornes de recharge pour particuliers et petites entreprises.',
  metadataBase: new URL('https://affra-reseaux.fr'),
  // Pré-production : jamais indexée par les moteurs de recherche.
  ...(IS_PREVIEW && { robots: { index: false, follow: false } }),
  icons: {
    icon: '/icons/affra_logo.png',
    shortcut: '/icons/affra_logo.png',
    apple: '/icons/affra_logo.png',
  },
  openGraph: {
    title: 'AFFRA Réseaux Installation de bornes de recharge IRVE',
    description:
      'Spécialiste certifié IRVE dans le Gard (30) et l’Hérault (34). Installation de bornes de recharge pour particuliers et petites entreprises.',
    url: 'https://affra-reseaux.fr',
    siteName: 'AFFRA Réseaux',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/og/og-default.png',
        width: 1200,
        height: 630,
        alt: 'AFFRA Réseaux — Installateur certifié IRVE dans le Gard et l’Hérault',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AFFRA Réseaux Installation de bornes de recharge IRVE',
    description:
      'Spécialiste certifié IRVE dans le Gard (30) et l’Hérault (34). Installation de bornes de recharge pour particuliers et petites entreprises.',
    images: ['/images/og/og-default.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_URL ?? 'https://affra-api.up.railway.app'} />
      </head>
      <body className="bg-[#F8FAFC] text-slate-900 antialiased font-sans">
        <PreviewBanner />
        {children}
        <AttributionTracker />
      </body>
    </html>
  );
}
