'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { devisScreen3Schema } from '@/lib/validations/devis'

type Screen3Data = z.infer<typeof devisScreen3Schema>

interface Props {
  defaultValues: Partial<Screen3Data>
  onNext: (data: Screen3Data) => void
  onBack: () => void
}

const OPTIONS = [
  { value: 'oui', label: 'Oui', icon: '✅' },
  { value: 'pas_encore', label: 'Pas encore', icon: '🔍' },
  { value: 'livraison_prochaine', label: 'Livraison prévue prochainement', icon: '🚗' },
] as const

export default function DevisScreen3Vehicule({ defaultValues, onNext, onBack }: Props) {
  const { setValue, watch, handleSubmit, formState: { errors } } = useForm<Screen3Data>({
    resolver: zodResolver(devisScreen3Schema),
    defaultValues,
  })
  const selected = watch('possede_vehicule')

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800 text-center">Possédez-vous un véhicule électrique ?</h2>
      <div className="flex flex-col gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setValue('possede_vehicule', opt.value, { shouldValidate: true })}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all font-semibold text-slate-700 text-left ${
              selected === opt.value
                ? 'border-[#5BBF8A] bg-[#5BBF8A]/10 text-[#3a9e6c]'
                : 'border-slate-200 bg-white hover:border-[#5BBF8A]/50'
            }`}
          >
            <span className="text-2xl">{opt.icon}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
      {errors.possede_vehicule && <p className="text-red-500 text-xs text-center">{errors.possede_vehicule.message}</p>}
      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="flex-1 border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors">
          Retour
        </button>
        <button type="submit" className="flex-1 bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] hover:opacity-90 text-white font-bold py-3 rounded-xl transition-opacity">
          Continuer
        </button>
      </div>
    </form>
  )
}
