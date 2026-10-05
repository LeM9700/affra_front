import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'

import { TrackedEmailLink, TrackedPhoneLink } from '@/components/attribution/TrackedLinks'
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from '@/lib/contact'

const navLinks = [
  { href: '/services/particuliers', label: 'Particuliers' },
  { href: '/services/coproprietes', label: 'Copropriétés' },
  { href: '/services/professionnels', label: 'Professionnels' },
  { href: '/services/promoteurs', label: 'Promoteurs' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/blog', label: 'Blog' },
  { href: '/zone-intervention', label: "Zone d'intervention" },
]

const legalLinks = [
  { href: '/a-propos', label: 'À propos' },
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/politique-confidentialite', label: 'Politique de confidentialité' },
  { href: '/temoignages/partager', label: 'Partager un témoignage' },
]

const certifications = [
  'Certification IRVE P1–P2–P3',
  'AFNOR NF C 15-100',
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-900 text-slate-400">
      {/* Halo décoratif */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(91,191,138,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Colonne 1 — Marque */}
          <div className="lg:col-span-1">
            <div className="mb-5 flex items-center gap-3">
              <Image
                src="/icons/affra_logo.png"
                alt="Logo AFFRA Réseaux"
                width={40}
                height={40}
                className="h-10 w-10 object-contain opacity-90"
              />
              <div>
                <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#5BBF8A]">
                  IRVE certifié
                </span>
                <span className="block text-lg font-bold text-white">AFFRA Réseaux</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 mb-5">
              Spécialiste de l&apos;installation de bornes de recharge électrique IRVE en Hérault, Gard, Vaucluse, Bouches-du-Rhône, Aude et Pyrénées-Orientales.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-[#5BBF8A]" strokeWidth={1.75} />
                Occitanie &amp; PACA
              </div>
              <TrackedPhoneLink phone={CONTACT_PHONE_E164} placement="footer" className="flex items-center gap-2 text-slate-400 transition-colors hover:text-[#5BBF8A]">
                <Phone className="h-3.5 w-3.5 flex-shrink-0 text-[#5BBF8A]" strokeWidth={1.75} />
                {CONTACT_PHONE_DISPLAY}
              </TrackedPhoneLink>
              <TrackedEmailLink email={CONTACT_EMAIL} placement="footer" className="flex items-center gap-2 text-slate-400 transition-colors hover:text-[#5BBF8A]">
                <Mail className="h-3.5 w-3.5 flex-shrink-0 text-[#5BBF8A]" strokeWidth={1.75} />
                {CONTACT_EMAIL}
              </TrackedEmailLink>
            </div>
          </div>

          {/* Colonne 2 — Navigation */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-300">Navigation</p>
            <ul className="space-y-2.5">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-[#5BBF8A]"
                  >
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0" strokeWidth={2} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Certifications */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-300">Certifications</p>
            <ul className="space-y-2.5">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#5BBF8A]" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Liens légaux + CTA */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-300">Informations</p>
            <ul className="space-y-2.5 mb-8">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 transition-colors hover:text-slate-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/devis"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:opacity-90"
            >
              Devis gratuit
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Signature gradient */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-slate-800 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} AFFRA Réseaux Tous droits réservés
          </p>
          <div className="h-px w-24 rounded-full bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2]" />
        </div>
      </div>
    </footer>
  )
}
