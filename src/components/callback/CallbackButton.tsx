'use client'

import { CheckCircle2, Loader2, PhoneCall, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState, useTransition, type FormEvent } from 'react'

import { TrackedPhoneLink } from '@/components/attribution/TrackedLinks'
import { requestCallback, type CallbackResult } from '@/lib/actions/callback'
import { CONTACT_PHONE_DISPLAY_NATIONAL, CONTACT_PHONE_E164 } from '@/lib/contact'

/** Après une demande envoyée, le bouton disparaît pendant 30 jours sur ce navigateur. */
const SENT_KEY = 'affra_callback_sent_at'
const HIDE_AFTER_SENT_MS = 30 * 24 * 60 * 60 * 1000
/**
 * Brouillon conservé le temps de la visite (sessionStorage) : panneau ouvert, nom, téléphone.
 * Si le navigateur recharge la page (lien, retour arrière sur mobile), la saisie n'est pas perdue.
 * Le consentement n'est jamais conservé : il doit être coché volontairement à chaque envoi.
 */
const DRAFT_KEY = 'affra_callback_draft'

interface Draft {
  open: boolean
  nom: string
  telephone: string
}

function readDraft(): Draft | null {
  try {
    const raw = window.sessionStorage.getItem(DRAFT_KEY)
    if (!raw) return null
    const value: unknown = JSON.parse(raw)
    if (!value || typeof value !== 'object') return null
    const d = value as Record<string, unknown>
    return {
      open: d.open === true,
      nom: typeof d.nom === 'string' ? d.nom.slice(0, 100) : '',
      telephone: typeof d.telephone === 'string' ? d.telephone.slice(0, 30) : '',
    }
  } catch {
    return null
  }
}

function saveDraft(draft: Draft | null): void {
  try {
    if (draft) window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
    else window.sessionStorage.removeItem(DRAFT_KEY)
  } catch {
    // stockage indisponible : le brouillon ne survivra pas à un rechargement, sans autre conséquence
  }
}

type Errors = Extract<CallbackResult, { success: false }>['errors']

function sentRecently(): boolean {
  try {
    const sentAt = Number(window.localStorage.getItem(SENT_KEY))
    return Number.isFinite(sentAt) && sentAt > 0 && Date.now() - sentAt < HIDE_AFTER_SENT_MS
  } catch {
    return false
  }
}

function rememberSent(): void {
  try {
    window.localStorage.setItem(SENT_KEY, String(Date.now()))
  } catch {
    // stockage indisponible : le bouton restera simplement visible
  }
}

/**
 * Bouton fixe « Être appelé pour une visite technique gratuite », en bas à droite.
 *
 * Ouvre, sur clic uniquement, un panneau modal (nom, téléphone, consentement) devant un voile
 * « verre dépoli ». Ouvert par le visiteur lui-même, ce n'est pas un interstitiel au sens de Google.
 * Le visiteur devient un prospect identifié côté backend, pas un lead.
 */
export default function CallbackButton() {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(true)
  const [open, setOpen] = useState(false)
  const [fields, setFields] = useState({ nom: '', telephone: '' })
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [pending, startTransition] = useTransition()
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const ids = { panel: useId(), title: useId(), nom: useId(), tel: useId(), consent: useId() }

  // Lu après l'hydratation : localStorage / sessionStorage n'existent pas côté serveur.
  useEffect(() => {
    setHidden(sentRecently())
    const draft = readDraft()
    if (draft) {
      setFields({ nom: draft.nom, telephone: draft.telephone })
      setOpen(draft.open)
    }
  }, [])

  // Le brouillon suit l'état du panneau et la saisie ; il est effacé après l'envoi.
  useEffect(() => {
    if (sent) return saveDraft(null)
    if (open || fields.nom || fields.telephone) saveDraft({ open, ...fields })
  }, [open, fields, sent])

  // Panneau ouvert = fenêtre modale : focus sur le panneau lui-même (pas sur un champ, pour ne pas
  // ouvrir le clavier du téléphone : le visiteur touche le champ quand il le souhaite), Échap pour
  // fermer, Tab qui reste dans le panneau, et page derrière bloquée (pas de défilement sous le voile).
  useEffect(() => {
    if (!open) return
    panelRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        if (sent) setHidden(true)
        // Le bouton réapparaît à la fermeture : on lui rend le focus.
        window.setTimeout(() => buttonRef.current?.focus(), 0)
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea, select',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      // Le focus démarre sur le panneau lui-même : Maj+Tab depuis là doit rester dans le panneau.
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      root.style.overflow = previousOverflow
    }
  }, [open, sent])

  if (hidden && !sent) return null

  const close = () => {
    setOpen(false)
    if (sent) setHidden(true)
    // Le bouton réapparaît à la fermeture : on lui rend le focus (navigation au clavier).
    window.setTimeout(() => buttonRef.current?.focus(), 0)
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setErrors({})
    startTransition(async () => {
      const result = await requestCallback({
        nom: fields.nom,
        telephone: fields.telephone,
        consent: form.get('consent') === 'on',
        website: String(form.get('website') ?? ''),
        pagePath: pathname ?? undefined,
      })
      if (result.success) {
        rememberSent()
        setSent(true)
      } else {
        setErrors(result.errors)
      }
    })
  }

  const fieldError = (name: keyof Errors, id: string) =>
    errors[name]?.length ? (
      <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
        {errors[name]![0]}
      </p>
    ) : null

  return (
    <>
      {/* Voile « verre dépoli » : la page reste visible, floutée et éclaircie. Un clic ou un tap en dehors
          du panneau le ferme (onClick et non onPointerDown : évite un « clic fantôme » sur la page dessous). */}
      {open && (
        <div
          aria-hidden="true"
          onClick={close}
          className="animate-callback-overlay fixed inset-0 z-[60] bg-gradient-to-br from-white/45 via-white/20 to-sky-100/35 backdrop-blur-md backdrop-saturate-150 print:hidden"
        />
      )}
      <div
        className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 flex flex-col items-end gap-3 print:hidden ${
          open ? 'z-[70]' : 'z-40'
        }`}
      >
        {open && (
          <div
            ref={panelRef}
            id={ids.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={ids.title}
            tabIndex={-1}
            className="animate-callback-panel outline-none w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-white/70 bg-white/95 p-5 shadow-[0_24px_64px_rgba(15,23,42,0.22)] ring-1 ring-slate-900/5"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h2 id={ids.title} className="text-base font-bold leading-snug text-slate-900">
                {sent ? 'Demande envoyée' : 'Visite technique gratuite'}
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Fermer"
                className="-m-1 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#29B4C5]"
              >
                <X className="h-4 w-4" strokeWidth={2.25} />
              </button>
            </div>

            {sent ? (
              <div className="flex items-start gap-3 text-sm text-slate-600" role="status">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#5BBF8A]" strokeWidth={2.25} />
                <p>Merci ! Un technicien AFFRA RESEAUX vous rappelle très vite pour organiser la visite.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-3">
                <p className="text-sm text-slate-500">Laissez votre numéro : nous vous rappelons pour convenir d&apos;une visite à domicile.</p>

                {/* Champ piège : invisible pour les humains, rempli par les robots. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label>
                    Site web
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div>
                  <label htmlFor={ids.nom} className="mb-1 block text-xs font-semibold text-slate-700">
                    Nom
                  </label>
                  <input
                    id={ids.nom}
                    name="nom"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={100}
                    value={fields.nom}
                    onChange={(e) => setFields((f) => ({ ...f, nom: e.target.value }))}
                    aria-invalid={Boolean(errors.nom?.length)}
                    aria-describedby={errors.nom?.length ? `${ids.nom}-error` : undefined}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#29B4C5] focus:ring-2 focus:ring-[#29B4C5]/20"
                  />
                  {fieldError('nom', ids.nom)}
                </div>

                <div>
                  <label htmlFor={ids.tel} className="mb-1 block text-xs font-semibold text-slate-700">
                    Téléphone
                  </label>
                  <input
                    id={ids.tel}
                    name="telephone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    maxLength={30}
                    placeholder="06 12 34 56 78"
                    value={fields.telephone}
                    onChange={(e) => setFields((f) => ({ ...f, telephone: e.target.value }))}
                    aria-invalid={Boolean(errors.telephone?.length)}
                    aria-describedby={errors.telephone?.length ? `${ids.tel}-error` : undefined}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#29B4C5] focus:ring-2 focus:ring-[#29B4C5]/20"
                  />
                  {fieldError('telephone', ids.tel)}
                </div>

                <div>
                  <label htmlFor={ids.consent} className="flex items-start gap-2 text-xs leading-relaxed text-slate-500">
                    <input
                      id={ids.consent}
                      name="consent"
                      type="checkbox"
                      required
                      aria-invalid={Boolean(errors.consent?.length)}
                      aria-describedby={errors.consent?.length ? `${ids.consent}-error` : undefined}
                      className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#29B4C5]"
                    />
                    <span>
                      J&apos;accepte d&apos;être rappelé par AFFRA RESEAUX et que ma visite du site soit associée à ma demande.{' '}
                      {/* Nouvel onglet : le formulaire reste ouvert et rempli derrière. */}
                      <a
                        href="/politique-confidentialite"
                        target="_blank"
                        rel="noopener"
                        className="underline hover:text-slate-700"
                      >
                        En savoir plus<span className="sr-only"> (nouvel onglet)</span>
                      </a>
                    </span>
                  </label>
                  {fieldError('consent', ids.consent)}
                </div>

                {errors._form?.length ? (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700" role="alert">
                    {errors._form[0]}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] px-4 py-3 text-sm font-bold text-white shadow-[var(--shadow-green)] transition hover:shadow-[var(--shadow-green-hover)] disabled:opacity-70"
                >
                  {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <PhoneCall className="h-4 w-4" strokeWidth={2.25} />}
                  {pending ? 'Envoi…' : 'Être rappelé'}
                </button>

                <p className="text-center text-xs text-slate-400">
                  Ou appelez-nous :{' '}
                  <TrackedPhoneLink phone={CONTACT_PHONE_E164} placement="callback_panel" className="font-semibold text-slate-600 hover:text-[#29ABE2]">
                    {CONTACT_PHONE_DISPLAY_NATIONAL}
                  </TrackedPhoneLink>
                </p>
              </form>
            )}
          </div>
        )}

        {/* Masqué pendant que le panneau est ouvert : on le ferme avec la croix ou Échap. */}
        {!sent && !open && (
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={false}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] py-3 pl-4 pr-5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(41,171,226,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(41,171,226,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B4C5]"
          >
            <PhoneCall className="h-4 w-4 flex-shrink-0" strokeWidth={2.25} />
            <span className="sm:hidden">Visite technique gratuite</span>
            <span className="hidden sm:inline">Être appelé pour une visite technique gratuite</span>
          </button>
        )}
      </div>
    </>
  )
}
