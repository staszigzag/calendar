export function findDaysOfWeek (timestamp) {
  const d = new Date(timestamp)
  const dayWeek = d.getDay() || 7
  // дата первого дня недели
  d.setDate(d.getDate() - (dayWeek - 1))

  // числа всей недели
  const days = []
  for (let i = 0; i < 7; i++) {
    days[i] = d.getDate()
    d.setDate(d.getDate() + 1)
  }
  return days
}
