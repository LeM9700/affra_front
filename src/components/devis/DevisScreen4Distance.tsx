'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { devisScreen4Schema } from '@/lib/validations/devis'

type Screen4Data = z.infer<typeof devisScreen4Schema>

interface Props {
  defaultValues: Partial<Screen4Data>
  onNext: (data: Screen4Data) => void
  onBack: () => void
}

const OPTIONS = [
  { value: '0_50', label: '0 à 50 km', desc: 'Petits trajets quotidiens' },
  { value: '50_150', label: '50 à 150 km', desc: 'Usage régulier' },
  { value: 'plus_150', label: 'Plus de 150 km', desc: 'Grands déplacements' },
] as const

export default function DevisScreen4Distance({ defaultValues, onNext, onBack }: Props) {
  const { setValue, watch, handleSubmit, formState: { errors } } = useForm<Screen4Data>({
    resolver: zodResolver(devisScreen4Schema),
    defaultValues,
  })
  const selected = watch('distance_quotidienne')

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800 text-center">Quelle distance parcourez-vous en moyenne par jour ?</h2>
      <div className="flex flex-col gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setValue('distance_quotidienne', opt.value, { shouldValidate: true })}
            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
              selected === opt.value
                ? 'border-[#5BBF8A] bg-[#5BBF8A]/10'
                : 'border-slate-200 bg-white hover:border-[#5BBF8A]/50'
            }`}
          >
            <span className={`font-semibold ${selected === opt.value ? 'text-[#3a9e6c]' : 'text-slate-700'}`}>{opt.label}</span>
            <span className="text-sm text-slate-400">{opt.desc}</span>
          </button>
        ))}
      </div>
      {errors.distance_quotidienne && <p className="text-red-500 text-xs text-center">{errors.distance_quotidienne.message}</p>}
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
