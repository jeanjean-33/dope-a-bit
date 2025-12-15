const PILLARS_STORAGE_KEY = 'dope-a-bit-pillars'

// Piliers par défaut
const DEFAULT_PILLARS = {
  sleep: {
    id: 'sleep',
    name: 'Hygiène du Sommeil',
    type: 'positive',
    icon: 'Moon',
    tasks: [
      'Coucher heure fixe',
      '8h sommeil',
      'Douche froide'
    ]
  },
  sport: {
    id: 'sport',
    name: 'Sport / Mouvement',
    type: 'positive',
    icon: 'Activity',
    tasks: [
      'Cardio',
      'Musculation',
      'Étirements'
    ]
  },
  learning: {
    id: 'learning',
    name: 'Apprentissage',
    type: 'positive',
    icon: 'BookOpen',
    tasks: [
      'Lecture',
      'Instrument',
      'Écriture'
    ]
  },
  nature: {
    id: 'nature',
    name: 'Exposition Nature',
    type: 'positive',
    icon: 'Sun',
    tasks: [
      'Lumière du jour',
      'Marche dehors'
    ]
  },
  overconsumption: {
    id: 'overconsumption',
    name: 'Surconsommation',
    type: 'detox',
    icon: 'ShoppingCart',
    tasks: [
      'Pas d\'achat impulsif',
      'Pas de fast-food'
    ]
  },
  substances: {
    id: 'substances',
    name: 'Substances Addictives',
    type: 'detox',
    icon: 'Flame',
    tasks: [
      'Pas d\'alcool',
      'Pas de sucre',
      'Pas de tabac'
    ]
  },
  easy_stimulation: {
    id: 'easy_stimulation',
    name: 'Stimulation Facile',
    type: 'detox',
    icon: 'Smartphone',
    tasks: [
      'Pas de doomscrolling',
      'Pas de réseaux le matin'
    ]
  }
}

export function loadPillars() {
  try {
    const stored = localStorage.getItem(PILLARS_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Convertir l'objet en format attendu
      return parsed
    }
    return DEFAULT_PILLARS
  } catch (error) {
    console.error('Error loading pillars:', error)
    return DEFAULT_PILLARS
  }
}

export function savePillars(pillars) {
  try {
    localStorage.setItem(PILLARS_STORAGE_KEY, JSON.stringify(pillars))
  } catch (error) {
    console.error('Error saving pillars:', error)
  }
}

export function getPillarsList() {
  const pillars = loadPillars()
  return Object.values(pillars)
}

export function resetPillarsToDefault() {
  savePillars(DEFAULT_PILLARS)
  return DEFAULT_PILLARS
}

export function getDefaultPillars() {
  return DEFAULT_PILLARS
}

