import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'AFFRA Réseaux Installation de bornes de recharge IRVE',
  description:
    'Spécialiste certifié IRVE en Hérault (34), Gard (30), Vaucluse (84), Bouches-du-Rhône (13), Aude (11) et Pyrénées-Orientales (66). Installation de bornes de recharge pour particuliers, copropriétés et professionnels.',
  metadataBase: new URL('https://affra-reseaux.fr'),
  icons: {
    icon: '/icons/affra_logo.png',
    shortcut: '/icons/affra_logo.png',
    apple: '/icons/affra_logo.png',
  },
  openGraph: {
    title: 'AFFRA Réseaux Installation de bornes de recharge IRVE',
    description:
      'Spécialiste certifié IRVE en Hérault (34), Gard (30), Vaucluse (84), Bouches-du-Rhône (13), Aude (11) et Pyrénées-Orientales (66). Installation de bornes de recharge pour particuliers, copropriétés et professionnels.',
    url: 'https://affra-reseaux.fr',
    siteName: 'AFFRA Réseaux',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/icons/affra_logo.png',
        width: 800,
        height: 800,
        alt: 'AFFRA Réseaux Installateur certifié IRVE P1–P2–P3',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'AFFRA Réseaux Installation de bornes de recharge IRVE',
    description:
      'Spécialiste certifié IRVE en Hérault (34), Gard (30), Vaucluse (84), Bouches-du-Rhône (13), Aude (11) et Pyrénées-Orientales (66). Installation de bornes de recharge pour particuliers, copropriétés et professionnels.',
    images: ['/icons/affra_logo.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="bg-[#F8FAFC] text-slate-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
