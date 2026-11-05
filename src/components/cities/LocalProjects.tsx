import Image from 'next/image'
import Link from 'next/link'
import type { CityProject } from '@/lib/cities/schema'
import { formatProjectLocation, withDe } from '@/lib/cities/projects'

interface LocalProjectsProps {
  cityName: string
  projects: readonly CityProject[]
}

/**
 * Réalisations proches de la commune, avec leur vraie commune et la distance
 * (ex. « Chantier à Aigues-Vives, à 7 km »). Style des cartes « Services » de la page.
 *
 * @param props.cityName - Nom de la commune de la page.
 * @param props.projects - Réalisations résolues (voir resolveCityProjects).
 * @returns Bloc de cartes, ou rien s'il n'y a aucune réalisation proche.
 */
export default function LocalProjects({ cityName, projects }: LocalProjectsProps) {
  if (projects.length === 0) return null
  const allLocal = projects.every((p) => p.isSameCity)

  return (
    <section aria-labelledby="local-projects-title" className="mb-10">
      <h3 id="local-projects-title" className="text-lg font-semibold text-slate-800 mb-3">
        {allLocal ? `Nos réalisations à ${cityName}` : `Nos réalisations près ${withDe(cityName)}`}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            href="/realisations#nos-chantiers"
            className="flex gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
          >
            <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="80px"
                className="object-cover"
                style={{ objectPosition: project.image.position }}
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3a9e6c]">
                {formatProjectLocation(project)}
              </p>
              <p className="mt-1 font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                {project.title}
              </p>
              <p className="mt-1 text-slate-600 text-sm line-clamp-2">{project.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
