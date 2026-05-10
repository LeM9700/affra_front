'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { devisScreen5Schema } from '@/lib/validations/devis'

type Screen5Data = z.infer<typeof devisScreen5Schema>

interface Props {
  defaultValues: Partial<Screen5Data>
  onNext: (data: Screen5Data) => void
  onBack: () => void
}

const OPTIONS = [
  { value: 'rapidement', label: 'Rapidement', desc: '0 à 10 jours', icon: '⚡' },
  { value: 'un_deux_mois', label: 'Dans 1 à 2 mois', desc: 'Pas urgent', icon: '📅' },
  { value: 'pas_urgent', label: 'Pas urgent', desc: 'Plus de 3 mois', icon: '🗓️' },
] as const

export default function DevisScreen5Delai({ defaultValues, onNext, onBack }: Props) {
  const { setValue, watch, handleSubmit, formState: { errors } } = useForm<Screen5Data>({
    resolver: zodResolver(devisScreen5Schema),
    defaultValues,
  })
  const selected = watch('delai')

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800 text-center">Quand souhaitez-vous installer votre solution de recharge ?</h2>
      <div className="flex flex-col gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setValue('delai', opt.value, { shouldValidate: true })}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
              selected === opt.value
                ? 'border-[#5BBF8A] bg-[#5BBF8A]/10'
                : 'border-slate-200 bg-white hover:border-[#5BBF8A]/50'
            }`}
          >
            <span className="text-2xl">{opt.icon}</span>
            <div>
              <p className={`font-semibold ${selected === opt.value ? 'text-[#3a9e6c]' : 'text-slate-700'}`}>{opt.label}</p>
              <p className="text-sm text-slate-400">{opt.desc}</p>
            </div>
          </button>
        ))}
      </div>
      {errors.delai && <p className="text-red-500 text-xs text-center">{errors.delai.message}</p>}
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
