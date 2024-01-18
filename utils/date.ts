import { DateTime } from 'luxon'

export const getTimeDifference = (utcTime: string) => {
  const postTime = DateTime.fromISO(utcTime, { zone: 'utc' })
  const currentTime = DateTime.utc()

  const diff = currentTime.diff(postTime, ['days', 'hours', 'minutes'])
  const { days = 0, hours = 0, minutes = 0 } = diff.toObject()

  if (days > 0) {
    return `${days}일 전`
  } else if (hours > 0) {
    return `${hours}시간 전`
  } else if (minutes > 0) {
    return `${minutes}분 전`
  } else {
    return '방금 전'
  }
}
