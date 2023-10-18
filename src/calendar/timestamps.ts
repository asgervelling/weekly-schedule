import { TimeStamp } from "../../types";


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
 * t1 + t2
 */
export const addTimestamps = (t1: TimeStamp, t2: TimeStamp): TimeStamp => {
  const m1 = tsToMinutes(t1);
  const m2 = tsToMinutes(t2);
  return minutesToTs(m1 + m2);
};


/**
 * t1 - t2
 */
export const subTimestamps = (t1: TimeStamp, t2: TimeStamp): TimeStamp => {
  const m1 = tsToMinutes(t1);
  const m2 = tsToMinutes(t2);
  return minutesToTs(m1 - m2);
}

/**
 * t1 === t2
 */
export const tsEq = (t1: TimeStamp, t2: TimeStamp): boolean => {
  return t1.h === t2.h && t1.m === t2.m;
};


/**
 * t1 < t2
 */
export const tsLt = (t1: TimeStamp, t2: TimeStamp): boolean => {
  const m1 = tsToMinutes(t1);
  const m2 = tsToMinutes(t2);
  return m1 < m2;
};


/**
 * t1 <= t2
 */
export const tsLeq = (t1: TimeStamp, t2: TimeStamp): boolean => {
  return tsLt(t1, t2) || tsEq(t1, t2);
};


/**
 * t1 > t2
 */
export const tsGt = (t1: TimeStamp, t2: TimeStamp): boolean => {
  return tsLt(t2, t1);
}


/**
 * t1 >= t2
 */
export const tsGeq = (t1: TimeStamp, t2: TimeStamp): boolean => {
  return tsLeq(t2, t1);
};

/**
 * Return the minimum of two TimeStamps
 */
export const minTs = (t1: TimeStamp, t2: TimeStamp): TimeStamp => {
  return tsLt(t1, t2) ? t1 : t2;
};

/**
 * Return the maximum of two TimeStamps
 */
export const maxTs = (t1: TimeStamp, t2: TimeStamp): TimeStamp => {
  return tsLt(t1, t2) ? t2 : t1;
}


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
  const fmt = (n: number) => Math.round(n).toString().padStart(2, "0");
  const h = ts.h < 0
    ? "-" + fmt(-ts.h)
    : fmt(ts.h);
  return `${h}:${fmt(ts.m)}`;
}


/**
 * Read a string formatted like "hh:mm" and create a TimeStamp
 */
export const parseTs = (s: string): TimeStamp => {
  const [h, m] = s.split(":").map((s) => parseInt(s));
  if (isNaN(h) || isNaN(m)) {
    throw new Error(`Invalid timestamp: ${s}`);
  }
  return { h, m };
};