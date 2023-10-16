import {
  tsToMinutes,
  minutesToTs,
  tsDiff,
  formatTs,
  parseTs,
  addTimestamps,
  tsEq,
  tsLt,
  tsLeq,
  tsGeq,
  tsGt,
} from './timestamps';


describe('tsToMinutes', () => {
  it('should convert a TimeStamp (TS) to minutes', () => {
    expect(tsToMinutes({ h: 0, m: 0 })).toBe(0);
    expect(tsToMinutes({ h: 0, m: 30 })).toBe(30);
    expect(tsToMinutes({ h: 1, m: 17 })).toBe(77);
    expect(tsToMinutes({ h: -2, m: 0 })).toBe(-120);
    expect(tsToMinutes({ h: -2, m: 22 })).toBe(-142);
  });
})

describe('minutesToTs', () => {
  it('should convert a number of minutes to a TS', () => {
    expect(minutesToTs(0)).toEqual({ h: 0, m: 0 });
    expect(minutesToTs(30)).toEqual({ h: 0, m: 30 });
    expect(minutesToTs(77)).toEqual({ h: 1, m: 17 });
    expect(minutesToTs(-142)).toEqual({ h: -2, m: 22 });
  });
});

describe('tsDiff', () => {
  it('should get the difference between two TSs', () => {
    expect(tsDiff({ h: 0, m: 0 },
                  { h: 0, m: 0 })).toEqual({ h: 0, m: 0 });
    expect(tsDiff({ h: 0, m: 0 },
                  { h: 0, m: 30 })).toEqual({ h: 0, m: 30 });
    expect(tsDiff({ h: 2, m: 27},
                  { h: 1, m: 3 })).toEqual({ h: -1, m: 24 });

  });
});

const p = parseTs;

describe('addTimestamps', () => {
  it('should add two timestamps together', () => {
    expect(addTimestamps(p('10:00'), p('7:15'))).toEqual(p('17:15'));
    expect(addTimestamps(p('10:00'), p('-7:15'))).toEqual(p('02:45'));
    expect(addTimestamps(p('10:00'), p('0:00'))).toEqual(p('10:00'));
    expect(addTimestamps(p('10:00'), p('0:01'))).toEqual(p('10:01'));
    expect(addTimestamps(p('10:00'), p('00:59'))).toEqual(p('10:59'));
    expect(addTimestamps(p('23:59'), p('0:01'))).toEqual(p('24:00'));
  })
});

describe('formatTs', () => {
  it('should format a TS as a string', () => {
    expect(formatTs({ h: 0, m: 0 })).toBe('00:00');
    expect(formatTs({ h: 0, m: 30 })).toBe('00:30');
    expect(formatTs({ h: 1, m: 17 })).toBe('01:17');
    expect(formatTs({ h: -22, m: 54 })).toBe('-22:54');
    expect(formatTs({ h: -2, m: 54 })).toBe('-02:54');
  });
});

describe('parseTs', () => {
  it('should parse a string as a TS', () => {
    expect(p('00:00')).toEqual({ h: 0, m: 0 });
    expect(p('00:30')).toEqual({ h: 0, m: 30 });
    expect(p('01:17')).toEqual({ h: 1, m: 17 });
    expect(p('-02:54')).toEqual({ h: -2, m: 54 });
    expect(p('-2:54')).toEqual({ h: -2, m: 54 });
    expect(p('-22:54')).toEqual({ h: -22, m: 54 });
    expect(p('25:00')).toEqual({ h: 25, m: 0 });
    // Raise error on invalid input:
    expect(() => parseTs('')).toThrow();
  });
});

describe('comparison functions', () => {
  const t1 = { h: 10, m: 30 };
  const t1Copy = { h: 10, m: 30 };
  const t2 = { h: 2, m: 15 };

  it('should correctly compare TimeStamps for equality', () => {
    expect(tsEq(t1, t1)).toBe(true);
    expect(tsEq(t1, t1Copy)).toBe(true);
    expect(tsEq(t1, t2)).toBe(false);
  });

  it('should correctly compare TimeStamps for less than', () => {
    expect(tsLt(t2, t1)).toBe(true);
    expect(tsLt(t1, t2)).toBe(false);
    expect(tsLt(t1, t1Copy)).toBe(false);
  });

  it('should correctly compare TimeStamps for less than or equal', () => {
    expect(tsLeq(t1, t1Copy)).toBe(true);
    expect(tsLeq(t1, t2)).toBe(false);
    expect(tsLeq(t2, t1)).toBe(true);
  });

  it('should correctly compare TimeStamps for greater than or equal', () => {
    expect(tsGeq(t1, t1Copy)).toBe(true);
    expect(tsGeq(t1, t2)).toBe(true);
    expect(tsGeq(t2, t1)).toBe(false);
  });

  it('should correctly compare TimeStamps for greater than', () => {
    expect(tsGt(t1, t1)).toBe(false);
    expect(tsGt(t1, t2)).toBe(true);
    expect(tsGt(t2, t1)).toBe(false);
  });
});

describe