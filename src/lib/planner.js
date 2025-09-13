// Core, framework-agnostic planner utilities
export const defaultDays = ['Saturday', 'Sunday']

export function createEmptySchedule(days = defaultDays) {
  return Object.fromEntries(days.map(d => [d, []]))
}

export function addItem(schedule, day, item) {
  const next = structuredClone(schedule)
  next[day] = [...next[day], item]
  return next
}

export function removeItem(schedule, day, id) {
  const next = structuredClone(schedule)
  next[day] = next[day].filter(x => x.uid !== id)
  return next
}

export function moveItem(schedule, fromDay, toDay, id, toIndex = null) {
  const next = structuredClone(schedule)
  const from = next[fromDay]
  const idx = from.findIndex(x => x.uid === id)
  if (idx === -1) return schedule
  const [it] = from.splice(idx, 1)
  if (!next[toDay]) next[toDay] = []
  if (toIndex == null || toIndex > next[toDay].length) next[toDay].push(it)
  else next[toDay].splice(toIndex, 0, it)
  return next
}

export function reorder(schedule, day, startIndex, endIndex) {
  const next = structuredClone(schedule)
  const list = next[day]
  const [removed] = list.splice(startIndex, 1)
  list.splice(endIndex, 0, removed)
  return next
}
