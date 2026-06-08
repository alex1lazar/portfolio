const ROMANIA_TIMEZONE = 'Europe/Bucharest';

/** 24h clock in Romania (e.g. "21:34"). */
export function formatRomaniaTime(date = new Date()) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: ROMANIA_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}
