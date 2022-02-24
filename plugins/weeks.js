function getWeekPeriodsInYear (app, year) {
  const weeks = []
  const today = app.$moment()
  // Get the first and last day of the year
  let currentDay = app.$moment([year, 1]).startOf('year')
  const dayOfWeek = app.$moment(currentDay).day()
  const lastDay = app.$moment([year, 1]).endOf('year')
  const weeksInYear = app.$moment(`${year}-01-01`).isoWeeksInYear()
  let daysToAdd = 7 - dayOfWeek

  for (let weekNumber = 1; weekNumber < weeksInYear + 1; weekNumber++) {
    let endOfWeek = app.$moment(currentDay).add(daysToAdd, 'days')

    if (app.$moment(endOfWeek).year() !== year) {
      endOfWeek = lastDay
    }
    weeks.push({ weekNumber, start: currentDay.toDate(), end: endOfWeek.toDate() })
    if (currentDay < today && today < endOfWeek) {
      break
    }

    currentDay = endOfWeek.add(1, 'day')
    daysToAdd = 6
  }
  return weeks
}

export default ({ app }, inject) => {
  inject('getWeekPeriodsInYear', year => getWeekPeriodsInYear(app, year))
}
