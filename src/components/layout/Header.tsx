'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

type ChildLink = { href: string; label: string }
type NavLink =
  | { href: string; label: string; children?: never }
  | { href?: never; label: string; children: ChildLink[] }

const navLinks: NavLink[] = [
  { href: '/', label: 'Accueil' },
  {
    label: 'Nos solutions',
    children: [
      { href: '/services/particuliers', label: 'Particuliers' },
      { href: '/services/coproprietes', label: 'Copropriétés' },
      { href: '/services/professionnels', label: 'Professionnels' },
    ],
  },
  { href: '/offres', label: 'Nos offres' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/blog', label: 'Blog' },
  { href: '/zone-intervention', label: "Zone d'intervention" },
  { href: '/a-propos', label: 'À propos' },
]

function isActivePath(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/'
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(false)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  const isActiveSolutions = pathname.startsWith('/services/')

  useEffect(() => {
    setOpen(false)
    setDropdownOpen(false)
    setMobileExpanded(false)
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
            {navLinks.map((item) => {
              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
                      setDropdownOpen(true)
                    }}
                    onMouseLeave={() => {
                      hoverTimeout.current = setTimeout(() => setDropdownOpen(false), 150)
                    }}
                  >
                    <button
                      onClick={() => setDropdownOpen((v) => !v)}
                      className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        isActiveSolutions
                          ? 'bg-gradient-to-r from-[#5BBF8A] via-[#29B4C5] to-[#29ABE2] text-white shadow-sm'
                          : 'text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-[var(--shadow-sm)]'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute left-0 top-full mt-2 min-w-[180px] rounded-2xl border border-slate-100 bg-white p-1.5 shadow-[var(--shadow-card-hover)]">
                        {item.children.map(({ href, label }) => (
                          <Link
                            key={href}
                            href={href}
                            className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                              isActivePath(pathname, href)
                                ? 'bg-gradient-to-r from-[#5BBF8A] via-[#29B4C5] to-[#29ABE2] text-white'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            {label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActivePath(pathname, item.href)
                      ? 'bg-gradient-to-r from-[#5BBF8A] via-[#29B4C5] to-[#29ABE2] text-white shadow-sm'
                      : 'text-slate-600 transition-colors duration-200 hover:bg-white hover:text-slate-900 hover:shadow-[var(--shadow-sm)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
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
            {navLinks.map((item) => {
              if (item.children) {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileExpanded((v) => !v)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition-colors ${
                        isActiveSolutions
                          ? 'border-[#5BBF8A]/40 bg-[#5BBF8A]/10 text-[#5BBF8A]'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${mobileExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-200 ${
                        mobileExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="ml-4 mt-1 grid gap-1">
                          {item.children.map(({ href, label }) => (
                            <Link
                              key={href}
                              href={href}
                              onClick={() => setOpen(false)}
                              className={`rounded-xl border px-4 py-2.5 text-sm transition-colors ${
                                isActivePath(pathname, href)
                                  ? 'border-[#5BBF8A]/40 bg-[#5BBF8A]/10 font-medium text-[#5BBF8A]'
                                  : 'border-slate-100 bg-slate-50 text-slate-600 hover:bg-white'
                              }`}
                            >
                              {label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-colors ${
                    isActivePath(pathname, item.href)
                      ? 'border-[#5BBF8A]/40 bg-[#5BBF8A]/10 text-[#5BBF8A]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
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
