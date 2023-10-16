import {
  tsToMinutes,
  minutesToTs,
  tsDiff,
  formatTs,
  parseTs,
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
    expect(parseTs('00:00')).toEqual({ h: 0, m: 0 });
    expect(parseTs('00:30')).toEqual({ h: 0, m: 30 });
    expect(parseTs('01:17')).toEqual({ h: 1, m: 17 });
    expect(parseTs('-02:54')).toEqual({ h: -2, m: 54 });
    expect(parseTs('-2:54')).toEqual({ h: -2, m: 54 });
    expect(parseTs('-22:54')).toEqual({ h: -22, m: 54 });
    expect(parseTs('25:00')).toEqual({ h: 25, m: 0 });
    // Raise error on invalid input:
    expect(() => parseTs('')).toThrow();
  });
});