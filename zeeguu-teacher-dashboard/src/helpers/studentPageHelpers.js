export function secondsToHoursAndMinutes(seconds) {
  return `${Math.floor(seconds / 3600)}h ${Math.ceil((seconds / 60) % 60)}m`
}

export function millisecondsToSeconds(milliseconds) {
  return milliseconds / 1000
}
