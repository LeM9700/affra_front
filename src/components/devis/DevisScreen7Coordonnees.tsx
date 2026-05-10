'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { devisScreen7Schema } from '@/lib/validations/devis'
import type { DevisPayload } from '@/types/devis'

type Screen7Data = z.infer<typeof devisScreen7Schema>

interface Props {
  defaultValues: Partial<Screen7Data>
  onSubmit: (data: DevisPayload) => Promise<void>
  onBack: () => void
  submitting: boolean
}

export default function DevisScreen7Coordonnees({ defaultValues, onSubmit, onBack, submitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Screen7Data>({
    resolver: zodResolver(devisScreen7Schema),
    defaultValues,
  })

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data as DevisPayload))}
      className="space-y-5"
    >
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
      />

      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-slate-800">On vous rappelle avec une solution adaptée</h2>
      </div>

      <div>
        <label className="block text-slate-700 font-semibold mb-1.5 text-sm" htmlFor="prenom">Prénom *</label>
        <input
          id="prenom"
          {...register('prenom')}
          autoComplete="given-name"
          className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5BBF8A] focus:border-transparent transition-shadow"
          placeholder="Votre prénom"
        />
        {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom.message}</p>}
      </div>

      <div>
        <label className="block text-slate-700 font-semibold mb-1.5 text-sm" htmlFor="telephone">Téléphone *</label>
        <input
          id="telephone"
          type="tel"
          {...register('telephone')}
          autoComplete="tel"
          className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5BBF8A] focus:border-transparent transition-shadow"
          placeholder="06 XX XX XX XX"
        />
        {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone.message}</p>}
      </div>

      <div>
        <label className="block text-slate-700 font-semibold mb-1.5 text-sm" htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          autoComplete="email"
          className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5BBF8A] focus:border-transparent transition-shadow"
          placeholder="votre@email.fr"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-slate-700 font-semibold mb-1.5 text-sm" htmlFor="ville">Ville *</label>
        <input
          id="ville"
          {...register('ville')}
          autoComplete="address-level2"
          className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5BBF8A] focus:border-transparent transition-shadow"
          placeholder="Votre ville"
        />
        {errors.ville && <p className="text-red-500 text-xs mt-1">{errors.ville.message}</p>}
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors"
        >
          Retour
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] hover:opacity-90 text-white font-bold py-3 rounded-xl transition-opacity disabled:opacity-60"
        >
          {submitting ? 'Envoi…' : 'Envoyer ma demande'}
        </button>
      </div>

      <p className="text-xs text-slate-400 text-center">
        En envoyant ce formulaire, vous acceptez que vos données soient utilisées pour vous contacter dans le cadre de votre demande.{' '}
        <a href="/politique-confidentialite" className="underline hover:text-slate-600">Politique de confidentialité</a>
      </p>
    </form>
  )
}
