import Link from 'next/link'
import SchemaOrg from '@/components/shared/SchemaOrg'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: Props) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: `https://affra-reseaux.fr${item.href}` }
        : {}),
    })),
  }

  return (
    <>
      <SchemaOrg schema={breadcrumbSchema} />
      <nav aria-label="Fil d'ariane" className="mb-8 text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-x-2">
              {index > 0 && <span aria-hidden className="text-slate-300">/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-blue-600 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-900 font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
