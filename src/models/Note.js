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
    this.day = start.getDate()
    this.mounth = start.getMonth() + 1

    this.isTimeAm = false
    this.isTimePm = false
  }

  setDay (hour, dayWeek = this.dayWeek, day = this.day, month = this.mounth) {
    if (!hour) return console.error('not value hour')
    if (day < 0 || day > 31) return console.error('not valid day')
    if (hour < 0 || hour > 23) return console.error('not valid hour')
    if (month < 0 || month > 12) return console.error('not valid month')

    console.log(hour, day, month)
    this.hour = hour
    this.dayWeek = dayWeek
    this.day = day
    this.mounth = month
  }
}
