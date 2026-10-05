'use client'

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'

import { trackEvent } from '@/lib/attribution/events'
import type { ClientEventType } from '@/lib/attribution/types'

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

interface TrackedContactLinkProps extends AnchorProps {
  href: string
  eventType: ClientEventType
  /** Emplacement du lien (footer, cta_band, blog_article…) — jamais de donnée personnelle. */
  placement: string
  children: ReactNode
}

/**
 * Lien de contact suivi. Le tracking est envoyé en sendBeacon (fire-and-forget) et
 * la navigation native du lien n'est jamais bloquée ni retardée (pas de preventDefault).
 */
function TrackedContactLink({ href, eventType, placement, onClick, children, ...rest }: TrackedContactLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(eventType, { placement })
    onClick?.(e)
  }
  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}

interface TrackedPhoneLinkProps extends AnchorProps {
  /** Numéro au format E.164, ex. +33766304687 */
  phone: string
  placement: string
  children: ReactNode
}

export function TrackedPhoneLink({ phone, ...props }: TrackedPhoneLinkProps) {
  return <TrackedContactLink href={`tel:${phone}`} eventType="PHONE_CLICK" {...props} />
}

interface TrackedEmailLinkProps extends AnchorProps {
  email: string
  placement: string
  children: ReactNode
}

export function TrackedEmailLink({ email, ...props }: TrackedEmailLinkProps) {
  return <TrackedContactLink href={`mailto:${email}`} eventType="EMAIL_CLICK" {...props} />
}

// WhatsApp : aucun lien sur le site à ce jour. Le jour où un lien wa.me est ajouté :
// export function TrackedWhatsAppLink(...) → <TrackedContactLink eventType="WHATSAPP_CLICK" … />
