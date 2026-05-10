import type { Metadata } from 'next'
import ServiceHero from '@/components/services/ServiceHero'
import ServiceFeatures from '@/components/services/ServiceFeatures'
import CTABand from '@/components/shared/CTABand'
import { buildMetadata } from '@/lib/utils/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Infrastructure IRVE pour promoteurs immobiliers',
  description:
    "Solution d'infrastructure de recharge IRVE pour promoteurs immobiliers en Hérault (34) et Gard (30). RT 2020, pré-équipement, solution clé en main.",
  path: '/services/promoteurs',
})

const features = [
  {
    icon: '🏗️',
    title: 'Conformité RT 2020',
    description: "Intégration de l'infrastructure IRVE dès la conception pour respecter les obligations réglementaires RT 2020.",
  },
  {
    icon: '🔌',
    title: 'Pré-équipement & équipement',
    description: "Gaines, fourreaux et câblages en phase gros œuvre, puis pose des bornes en phase finition selon les besoins.",
  },
  {
    icon: '📐',
    title: 'Bureau d\'études intégré',
    description: "Dimensionnement électrique dès le DCE, coordination avec les autres corps d'état.",
  },
  {
    icon: '📋',
    title: 'Documentation réglementaire',
    description: "Attestations IRVE, CONSUEL — toute la documentation réglementaire pour la livraison du programme.",
  },
  {
    icon: '🤝',
    title: 'Interface avec les syndics',
    description: "Transfert de la gestion de l'infrastructure au syndic de copropriété à la livraison.",
  },
  {
    icon: '⚡',
    title: 'Infrastructure évolutive',
    description: "Conçu pour évoluer avec les besoins futurs des résidents sans travaux supplémentaires.",
  },
]

export default function PromoteursPage() {
  return (
    <>
      <ServiceHero
        imageSrc="/images/hero/promoteurs-hero.webp"
        imageAlt="Chantier neuf avec infrastructure IRVE intégrée"
        title="Infrastructure IRVE pour promoteurs"
        subtitle="Solution clé en main RT 2020 — pré-équipement et équipement dès la construction."
      />
      <ServiceFeatures features={features} />
      <CTABand />
    </>
  )
}
