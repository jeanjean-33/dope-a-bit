// Ce fichier est maintenant déprécié - utilisez pillarsStorage.js à la place
// Conservé pour compatibilité avec les anciens imports

import { getPillarsList } from '../utils/pillarsStorage'

// Export pour compatibilité (fonction pour obtenir la liste à jour)
export function getPILLARS_LIST() {
  return getPillarsList()
}

// Export constant pour compatibilité (peut être obsolète)
export const PILLARS_LIST = getPillarsList()

