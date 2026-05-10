'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { submitTestimonial } from '@/lib/actions/testimonial'
import { testimonialSchema } from '@/lib/validations/testimonial'
import type { TestimonialFormData } from '@/types/testimonial'

const defaultValues: Partial<TestimonialFormData> = {
  source_channel: 'formulaire_web',
  type_client: 'maison',
  consent_publication: true,
}

export default function TestimonialForm() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues,
  })

  const onSubmit = async (values: TestimonialFormData) => {
    setSubmitting(true)
    setFormError(null)
    setSuccess(false)

    try {
      const result = await submitTestimonial(values)

      if (!result.success) {
        setFormError(result.errors?._form?.[0] ?? 'Une erreur est survenue. Merci de reessayer.')
        return
      }

      setSuccess(true)
      reset(defaultValues)
    } catch {
      setFormError('Une erreur est survenue. Merci de reessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
        {...register('website')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="initiales" className="block text-sm font-semibold text-slate-700 mb-1.5">Initiales *</label>
          <input id="initiales" {...register('initiales')} placeholder="Ex: M. D." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#5BBF8A]" />
          {errors.initiales && <p className="text-xs text-red-500 mt-1">{errors.initiales.message}</p>}
        </div>

        <div>
          <label htmlFor="ville" className="block text-sm font-semibold text-slate-700 mb-1.5">Ville *</label>
          <input id="ville" {...register('ville')} placeholder="Ex: Nimes" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#5BBF8A]" />
          {errors.ville && <p className="text-xs text-red-500 mt-1">{errors.ville.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="departement" className="block text-sm font-semibold text-slate-700 mb-1.5">Departement *</label>
          <select id="departement" {...register('departement')} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#5BBF8A]">
            <option value="34">34 - Herault</option>
            <option value="30">30 - Gard</option>
            <option value="13">13 - Bouches-du-Rhone</option>
          </select>
          {errors.departement && <p className="text-xs text-red-500 mt-1">{errors.departement.message}</p>}
        </div>

        <div>
          <label htmlFor="type_client" className="block text-sm font-semibold text-slate-700 mb-1.5">Type de client *</label>
          <select id="type_client" {...register('type_client')} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#5BBF8A]">
            <option value="maison">Particulier (maison)</option>
            <option value="copropriete">Copropriete</option>
            <option value="entreprise">Entreprise</option>
            <option value="autre">Autre</option>
          </select>
          {errors.type_client && <p className="text-xs text-red-500 mt-1">{errors.type_client.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="type_projet" className="block text-sm font-semibold text-slate-700 mb-1.5">Type de projet</label>
        <input id="type_projet" {...register('type_projet')} placeholder="Ex: borne 7,4 kW en maison" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#5BBF8A]" />
      </div>

      <div>
        <label htmlFor="resultat" className="block text-sm font-semibold text-slate-700 mb-1.5">Resultat concret (optionnel)</label>
        <input id="resultat" {...register('resultat')} placeholder="Ex: Installation finalisee en 1 jour" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#5BBF8A]" />
      </div>

      <div>
        <label htmlFor="temoignage" className="block text-sm font-semibold text-slate-700 mb-1.5">Votre temoignage *</label>
        <textarea id="temoignage" {...register('temoignage')} rows={6} placeholder="Decrivez votre experience avec AFFRA Reseaux..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#5BBF8A]" />
        {errors.temoignage && <p className="text-xs text-red-500 mt-1">{errors.temoignage.message}</p>}
      </div>

      <div>
        <label htmlFor="source_channel" className="block text-sm font-semibold text-slate-700 mb-1.5">Canal d&apos;origine</label>
        <select id="source_channel" {...register('source_channel')} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#5BBF8A]">
          <option value="formulaire_web">Formulaire web</option>
          <option value="email">Email</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="sms">SMS</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
        <input type="checkbox" className="mt-1" {...register('consent_publication')} />
        <span className="text-sm text-slate-700">
          J&apos;autorise la publication de ce temoignage sur le site AFFRA Reseaux, avec anonymisation (initiales + ville).
        </span>
      </label>
      {errors.consent_publication && <p className="text-xs text-red-500">{errors.consent_publication.message}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center rounded-xl bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] px-6 py-3 font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? 'Envoi en cours...' : 'Envoyer mon temoignage'}
      </button>

      {formError && <p className="text-sm text-red-500">{formError}</p>}
      {success && (
        <p className="text-sm text-green-600">
          Merci. Votre temoignage a bien ete recu et sera relu avant publication.
        </p>
      )}
    </form>
  )
}
