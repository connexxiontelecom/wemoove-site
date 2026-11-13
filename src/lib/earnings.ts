/** PLACEHOLDER [AVG_HOURLY_EARNINGS]: average driver earnings per online hour, in naira. Replace with a real figure. */
export const AVG_HOURLY_EARNINGS = 2000;

export function weeklyEarnings(hoursPerDay: number, daysPerWeek: number): number {
  return hoursPerDay * daysPerWeek * AVG_HOURLY_EARNINGS;
}
