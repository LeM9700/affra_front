'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { devisScreen6Schema } from '@/lib/validations/devis'

type Screen6Data = z.infer<typeof devisScreen6Schema>

interface Props {
  defaultValues: Partial<Screen6Data>
  onNext: (data: Screen6Data) => void
  onBack: () => void
}

const OPTIONS = [
  { value: '0_5m', label: '0 à 5 m' },
  { value: '5_15m', label: '5 à 15 m' },
  { value: 'plus_15m', label: 'Plus de 15 m' },
  { value: 'ne_sait_pas', label: 'Je ne sais pas' },
] as const

export default function DevisScreen6Tableau({ defaultValues, onNext, onBack }: Props) {
  const { setValue, watch, handleSubmit, formState: { errors } } = useForm<Screen6Data>({
    resolver: zodResolver(devisScreen6Schema),
    defaultValues,
  })
  const selected = watch('distance_tableau')

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800 text-center">Distance entre votre tableau électrique et l&apos;emplacement souhaité ?</h2>
      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setValue('distance_tableau', opt.value, { shouldValidate: true })}
            className={`p-4 rounded-xl border-2 transition-all font-semibold text-center ${
              selected === opt.value
                ? 'border-[#5BBF8A] bg-[#5BBF8A]/10 text-[#3a9e6c]'
                : 'border-slate-200 bg-white text-slate-700 hover:border-[#5BBF8A]/50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {errors.distance_tableau && <p className="text-red-500 text-xs text-center">{errors.distance_tableau.message}</p>}
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
