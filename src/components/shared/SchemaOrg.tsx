import { serializeJsonLd } from '@/lib/schema/json-ld'

interface SchemaOrgProps {
  /** Objet (ou liste d'objets) schema.org ; toute donnée externe y est échappée. */
  schema: object
}

/**
 * Injecte un bloc JSON-LD dans la page.
 * Seul point d'entrée autorisé pour du JSON-LD : la sérialisation passe par `serializeJsonLd`,
 * qui neutralise toute tentative de fermer la balise <script> depuis les données.
 *
 * @param props.schema - Données structurées à injecter.
 * @returns Balise <script type="application/ld+json">.
 */
export default function SchemaOrg({ schema }: SchemaOrgProps) {
  return (
    <script
      type="application/ld+json"
      // Sûr : contenu échappé par serializeJsonLd (pas de "<" possible dans la sortie).
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  )
}
