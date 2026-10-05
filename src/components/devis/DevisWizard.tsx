'use client'

import { useState } from 'react'
import DevisScreen1Accroche from './DevisScreen1Accroche'
import DevisScreen2Projet from './DevisScreen2Projet'
import DevisScreen3Vehicule from './DevisScreen3Vehicule'
import DevisScreen4Distance from './DevisScreen4Distance'
import DevisScreen5Delai from './DevisScreen5Delai'
import DevisScreen6Tableau from './DevisScreen6Tableau'
import DevisScreen7Coordonnees from './DevisScreen7Coordonnees'
import { submitDevis } from '@/lib/actions/devis'
import { trackEvent } from '@/lib/attribution/events'
import type { DevisFormData } from '@/types/devis'

type PartialDevis = Partial<DevisFormData>

const TOTAL_QUESTION_SCREENS = 6

export default function DevisWizard() {
  const [screen, setScreen] = useState(1)
  const [data, setData] = useState<PartialDevis>({})
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const next = (screenData: PartialDevis) => {
    setData((prev) => ({ ...prev, ...screenData }))
    setScreen((s) => s + 1)
  }

  const back = () => setScreen((s) => Math.max(s - 1, 1))

  const start = () => {
    trackEvent('QUOTE_STARTED')
    setScreen(2)
  }

  const handleSubmit = async (screenData: PartialDevis) => {
    const fullData = { ...data, ...screenData } as DevisFormData & { website?: string }
    setSubmitting(true)
    setFormError(null)
    try {
      const result = await submitDevis(fullData)
      if (result && !result.success) {
        setFormError(result.errors?.['_form']?.[0] ?? 'Une erreur est survenue. Veuillez reessayer.')
      }
    } catch {
      setFormError('Une erreur est survenue. Veuillez reessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  const showProgress = screen >= 2
  const progressStep = screen - 1
  const progressPercent = Math.round((progressStep / TOTAL_QUESTION_SCREENS) * 100)

  return (
    <div className="max-w-lg mx-auto">
      {showProgress && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Étape {progressStep} / {TOTAL_QUESTION_SCREENS}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {screen === 1 && <DevisScreen1Accroche onStart={start} />}
      {screen === 2 && <DevisScreen2Projet defaultValues={data} onNext={next} />}
      {screen === 3 && <DevisScreen3Vehicule defaultValues={data} onNext={next} onBack={back} />}
      {screen === 4 && <DevisScreen4Distance defaultValues={data} onNext={next} onBack={back} />}
      {screen === 5 && <DevisScreen5Delai defaultValues={data} onNext={next} onBack={back} />}
      {screen === 6 && <DevisScreen6Tableau defaultValues={data} onNext={next} onBack={back} />}
      {screen === 7 && (
        <DevisScreen7Coordonnees
          defaultValues={data}
          onSubmit={handleSubmit}
          onBack={back}
          submitting={submitting}
        />
      )}

      {formError && (
        <p className="mt-4 text-red-500 text-sm text-center bg-red-50 rounded-lg py-2 px-4">{formError}</p>
      )}
    </div>
  )
}
