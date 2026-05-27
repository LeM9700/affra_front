import AnimatedStat from '@/components/shared/AnimatedStat'

const stats = [
  { value: '200+', label: 'Bornes installées', sub: 'en Occitanie & PACA' },
  { value: '5 ans', label: "d'expérience IRVE", sub: 'certifiée AFNOR' },
  { value: '6', label: 'Départements', sub: 'Occitanie & PACA' },
  { value: '100%', label: 'Clients satisfaits', sub: 'avis vérifiés' },
]

export default function ChiffresSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-20">
      {/* Halos décoratifs */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-64 w-64 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(91,191,138,0.15) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 bottom-0 h-64 w-64 translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(41,171,226,0.12) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          AFFRA Réseaux en chiffres
        </p>

        <div className="grid grid-cols-2 gap-px bg-slate-800/60 md:grid-cols-4 rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} {...stat} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}
