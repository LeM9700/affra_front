/**
 * Communes affichées sur /zone-intervention quand l'API des zones est indisponible ou vide.
 * Chaque commune doit avoir sa page ville (vérifié par src/data/zones-fallback.test.ts).
 */
export const FALLBACK_CITIES_BY_DEPARTMENT: Readonly<Record<'30' | '34', readonly string[]>> = {
  '34': ['Montpellier', 'Lunel', 'Béziers', 'Sète', 'Ganges'],
  '30': [
    'Nîmes',
    'Alès',
    'Sommières',
    'Uzès',
    'Garons',
    'Aimargues',
    'Vauvert',
    'Le Grau-du-Roi',
    'Saint-Gilles',
    'Beaucaire',
    'Remoulins',
    'Quissac',
    'Saint-Geniès-de-Malgoirès',
    'Vergèze',
  ],
}
