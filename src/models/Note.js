// const numDays = [7, 1, 2, 3, 4, 5, 6]

export default class Note {
  constructor ({ id, title = '', startDate, endDate }) {
    this.id = id
    this.title = title
    this.timestamp = startDate * 1000
    this.end = new Date(endDate * 1000)

    const start = new Date(this.timestamp)
    this.dayWeek = start.getDay() || 7
    this.hour = start.getHours()

    this.isTimeAm = false
    this.isTimePm = false
  }

  setTime (hour, dayWeek) {
    if (hour === undefined) return console.error('not value hour')
    if (dayWeek === undefined) return console.error('not value day Week')
    if (dayWeek < 0 || dayWeek > 7) return console.error('not valid day week')
    if (hour < 0 || hour > 23) return console.error('not valid hour')

    // разница в днях
    const deltaDay = dayWeek - this.dayWeek
    const d = new Date(this.timestamp)
    d.setDate(d.getDate() + deltaDay)
    d.setHours(hour)
    d.setMinutes(0)
    // обновляем временную метку внутри заметки
    this.timestamp = d.getTime()
    console.log('new time start', d)
    this.hour = hour
    this.dayWeek = dayWeek
  }
}
