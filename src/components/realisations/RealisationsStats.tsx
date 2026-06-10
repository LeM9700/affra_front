import AnimatedStat from '@/components/shared/AnimatedStat'

export default function RealisationsStats() {
  return (
    <section aria-label="Chiffres clés AFFRA Réseaux">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <AnimatedStat
          value="+200"
          label="Bornes installées"
          sub="en Occitanie & PACA"
        />
        <div className="flex flex-col items-center justify-center bg-slate-800 px-6 py-10 text-center">
          <span className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            2 régions
          </span>
          <span className="mt-2 text-sm font-semibold text-slate-300">Zones d&apos;intervention</span>
          <span className="mt-0.5 text-xs text-slate-500">Occitanie &amp; PACA</span>
        </div>
      </div>
    </section>
  )
}
