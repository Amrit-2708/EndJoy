// Very small holiday list (placeholder). Replace with a real calendar for production.
const HOLIDAYS_2025_IN = [
  '2025-01-26', // Republic Day (Sun)
  '2025-03-14', // Holi (Fri) *approx*
  '2025-04-18', // Good Friday (Fri)
  '2025-06-27', // Eid-al-Adha (Fri) *approx*
  '2025-08-15', // Independence Day (Fri)
  '2025-10-02', // Gandhi Jayanti (Thu)
  '2025-10-21', // Diwali (Tue)
  '2025-12-25', // Christmas (Thu)
]

export function suggestLongWeekends(start = new Date()) {
  const res = []
  for (const d of HOLIDAYS_2025_IN) {
    const date = new Date(d + 'T00:00:00')
    if (date < start) continue
    const dow = date.getDay() // 0 Sun ... 6 Sat
    if (dow === 5) res.push({ date: d, label: 'Holiday on Friday ➜ Fri–Sun long weekend' })
    if (dow === 1) res.push({ date: d, label: 'Holiday on Monday ➜ Sat–Mon long weekend' })
  }
  return res
}
