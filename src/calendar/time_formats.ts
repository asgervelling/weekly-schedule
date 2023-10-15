/**
 * Given a timestamp and a number n, calculate
 * the index of the n'th time period of the day, like
 * 
 * ('01:30', 48) -> 3
 * ('12:00', 24) -> 12
 * ('00:00', n) -> 0
 * 
 * @param timestamp Formatted like 'hh:mm', eg. '13:30'
 * @param n The number of time periods to split 24 hours into
 * @returns An index that can be used to create the timestamp
 */
export const timestampToIndex = (ts: string, n: number): number => {
  const [hours, minutes] = ts.split(":").map((str) => parseInt(str));
  const totalMinutes = hours * 60 + minutes;
  const timePeriodLength = 24 / n;
  return Math.round(totalMinutes / 60 / timePeriodLength);
};


/**
 * Given an index and a number n, create the timestamp, 'hh:mm',
 * for the i'th time period. A time period is 24/n hours long. Ex.:
 * 
 * (3, 48) -> '01:30'
 * (12, 24) -> '12:00'
 * (0, n) -> '00:00'
 * 
 * @param i 0 <= i < n
 * @param n The number of time periods to split 24 hours into
 * @returns A timestamp for the i'th time period out of 24/n
 */
export const indexToTimestamp = (i: number, n: number): string => {
  const timePeriodLength = 24 / n;
  const totalMinutes = i * timePeriodLength * 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const fmt = (n: number) => Math.round(n).toString().padStart(2, '0');
  return `${fmt(hours)}:${fmt(minutes)}`;
};


/** (10:00 + 7:15) -> 17:15 */
export const addTimestamps = (t1: string, t2: string): string => {
  const readTs = (ts: string) => {
    const [h, m] = ts.split(':').map((s) => parseInt(s));
    return [h, m * (h < 0 ? -1 : 1)]
  };
  let [h1, m1] = readTs(t1);
  let [h2, m2] = readTs(t2);
  const totalMinutes = (h1 + h2) * 60 + m1 + m2;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const fmt = (n: number) => Math.round(n).toString().padStart(2, '0');
  return `${fmt(hours)}:${fmt(minutes)}`;
}
