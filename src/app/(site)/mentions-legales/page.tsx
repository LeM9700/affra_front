import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/utils/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Mentions légales',
  description: 'Mentions légales du site AFFRA Réseaux.',
  path: '/mentions-legales',
})

export default function MentionsLegalesPage() {
  return (
    <section className="bg-slate-900 py-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-invert prose-slate">
        <h1 className="text-3xl font-bold text-white mb-8">Mentions légales</h1>
        <p className="text-amber-300 text-sm border border-amber-400/40 rounded-lg p-4 mb-8">
          Les informations juridiques marquees &quot;a completer&quot; doivent etre remplies pour la conformite legale et SEO.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">Éditeur du site</h2>
        <p className="text-slate-300">
          <strong>AFFRA Réseaux</strong><br />
          Raison sociale : AFFRA Réseaux<br />
          Forme juridique : [a completer]<br />
          SIRET : 98445144300027<br />
          Siège social : 95 A RUE DE LA HASE, 30900 NIMES, France<br />
          Téléphone : +33 7 66 30 46 87<br />
          E-mail : affrareseaux@gmail.com
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">Direction et publication</h2>
        <p className="text-slate-300">
          Gerant : Bechir BELGHITH (ne en novembre 1992)<br />
          Gerant : Sofiane FAZAZI (ne en octobre 1997)
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">Hébergement</h2>
        <p className="text-slate-300">
          Ce site est hébergé par :<br />
          <strong>Railway</strong> (backend) — Railway Corp., 340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
          <strong>Vercel</strong> (frontend) — Vercel Inc., 340 Pine Street, Suite 1270, San Francisco, CA 94104, USA
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">Propriété intellectuelle</h2>
        <p className="text-slate-300">
          L&apos;ensemble des contenus présents sur ce site (textes, images, graphismes, logo, icônes) est la propriété
          exclusive d&apos;AFFRA Réseaux ou fait l&apos;objet d&apos;une autorisation d&apos;utilisation.
          Toute reproduction, distribution, modification ou publication sans autorisation préalable est interdite.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">Responsabilité</h2>
        <p className="text-slate-300">
          AFFRA Réseaux s&apos;efforce de fournir des informations exactes et à jour. Les informations présentes sur ce
          site sont données à titre indicatif. AFFRA Réseaux ne pourra être tenu responsable des dommages directs ou
          indirects résultant de l&apos;utilisation de ce site.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">Données personnelles</h2>
        <p className="text-slate-300">
          Pour toute information relative au traitement de vos données personnelles, veuillez consulter notre{' '}
          <a href="/politique-confidentialite" className="text-emerald-400 hover:underline">
            Politique de confidentialité
          </a>.
        </p>
      </div>
    </section>
  )
}
