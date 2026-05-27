'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/services/particuliers', label: 'Particuliers' },
  { href: '/services/coproprietes', label: 'Copropriétés' },
  { href: '/services/professionnels', label: 'Professionnels' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/blog', label: 'Blog' },
  { href: '/zone-intervention', label: "Zone d'intervention" },
]

function isActivePath(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/'
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(15,23,42,0.06),0_4px_16px_rgba(15,23,42,0.04)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <Image
              src="/icons/affra_logo.png"
              alt="Logo AFFRA Réseaux"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
              priority
            />
            
          </Link>

          <nav className="hidden xl:flex items-center gap-1 rounded-full border border-slate-100 bg-slate-50/80 p-1.5 shadow-[var(--shadow-sm)]">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActivePath(pathname, href)
                    ? 'bg-gradient-to-r from-[#5BBF8A] via-[#29B4C5] to-[#29ABE2] text-white shadow-sm'
                    : 'text-slate-600 transition-colors duration-200 hover:bg-white hover:text-slate-900 hover:shadow-[var(--shadow-sm)]'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
              <span className="h-2 w-2 rounded-full bg-[#5BBF8A] shadow-[0_0_8px_rgba(91,191,138,0.6)]" />
              Occitanie & PACA
            </div>
            <Link
              href="/devis"
              className="hidden sm:inline-flex items-center rounded-full bg-gradient-to-r from-[#5BBF8A] via-[#29B4C5] to-[#29ABE2] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
              style={{ boxShadow: 'var(--shadow-green)' }}
            >
              Demander un devis
            </Link>

            <button
              type="button"
              className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 xl:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <span className="relative h-4 w-5">
                <span
                  className={`absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                    open ? 'translate-y-[7px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] block h-0.5 w-5 rounded-full bg-current transition-opacity duration-300 ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                    open ? '-translate-y-[7px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-x-0 top-full border-b border-slate-200 bg-white/96 backdrop-blur-xl transition-all duration-300 xl:hidden ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          id="mobile-navigation"
          className={`mx-auto max-w-7xl overflow-hidden px-4 transition-[max-height,opacity,transform] duration-300 ease-out sm:px-6 lg:px-8 ${
            open ? 'max-h-[80vh] translate-y-0 opacity-100' : 'max-h-0 -translate-y-2 opacity-0'
          }`}
        >
          <nav className="grid gap-2 py-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-colors ${
                  isActivePath(pathname, href)
                    ? 'border-[#5BBF8A]/40 bg-[#5BBF8A]/10 text-[#5BBF8A]'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/devis"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#5BBF8A] via-[#29B4C5] to-[#29ABE2] px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Demander un devis
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}