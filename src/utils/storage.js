const STORAGE_KEY = 'dope-a-bit-data'

export function loadData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch (error) {
    console.error('Error loading data:', error)
    return {}
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving data:', error)
  }
}

export function getDayData(dateKey) {
  const data = loadData()
  return data[dateKey] || {}
}

export function saveDayData(dateKey, dayData) {
  const data = loadData()
  data[dateKey] = dayData
  saveData(data)
}

export function getAllData() {
  return loadData()
}

