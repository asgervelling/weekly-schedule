import { CalendarEvent, TimeStamp } from "../../types";


// const panelHeight = (e: CalendarEvent): number => {
//   const m_e = tsToMinutes(tsDiff(e.start, e.end));
//   const m_d = 24 * 60;
//   const h_d = 100;
//   return Math.round(m_e / m_d * h_d);
// };


/**
 * Get the total length of a TimeStamp in minutes
 */
export const tsToMinutes = (ts: TimeStamp): number => {
  return ts.h * 60 + (ts.h < 0 ? -ts.m : ts.m);
};

/**
 * Create a TimeStamp from a number of minutes
 */
export const minutesToTs = (minutes: number): TimeStamp => {
  const sign = Math.sign(minutes);
  const h = sign * Math.floor(Math.abs(minutes) / 60);
  const m = Math.abs(minutes) % 60;
  return { h, m };
};


/**
 * Get the difference between two TimeStamps
 */
export const tsDiff = (t0: TimeStamp, t1: TimeStamp): TimeStamp => {
  const m0 = tsToMinutes(t0);
  const m1 = tsToMinutes(t1);
  return minutesToTs(m1 - m0);
};


/**
 * Format a TimeStamp as a string
 */
export const formatTs = (ts: TimeStamp): string => {
  const fmt = (n: number) => Math.round(n).toString().padStart(2, '0');
  const h = ts.h < 0
    ? '-' + fmt(-ts.h)
    : fmt(ts.h);
  return `${h}:${fmt(ts.m)}`;
}


/**
 * Read a string formatted like 'hh:mm' and create a TimeStamp
 */
export const parseTs = (s: string): TimeStamp => {
  const [h, m] = s.split(':').map((s) => parseInt(s));
  if (isNaN(h) || isNaN(m)) {
    throw new Error(`Invalid timestamp: ${s}`);
  }
  return { h, m };
};