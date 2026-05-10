'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { devisScreen2Schema } from '@/lib/validations/devis'

type Screen2Data = z.infer<typeof devisScreen2Schema>

interface Props {
  defaultValues: Partial<Screen2Data>
  onNext: (data: Screen2Data) => void
}

const OPTIONS = [
  { value: 'maison', label: 'Maison', icon: '🏠' },
  { value: 'copropriete', label: 'Copropriété', icon: '🏢' },
  { value: 'entreprise', label: 'Entreprise', icon: '🏭' },
] as const

export default function DevisScreen2Projet({ defaultValues, onNext }: Props) {
  const { setValue, watch, handleSubmit, formState: { errors } } = useForm<Screen2Data>({
    resolver: zodResolver(devisScreen2Schema),
    defaultValues,
  })
  const selected = watch('type_client')

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800 text-center">Votre projet concerne :</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setValue('type_client', opt.value, { shouldValidate: true })}
            className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all font-semibold text-slate-700 ${
              selected === opt.value
                ? 'border-[#5BBF8A] bg-[#5BBF8A]/10 text-[#3a9e6c]'
                : 'border-slate-200 bg-white hover:border-[#5BBF8A]/50'
            }`}
          >
            <span className="text-3xl">{opt.icon}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
      {errors.type_client && <p className="text-red-500 text-xs text-center">{errors.type_client.message}</p>}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] hover:opacity-90 text-white font-bold py-3 rounded-xl transition-opacity"
      >
        Continuer
      </button>
    </form>
  )
}
