export type TimeStamp = {
  h: number;
  m: number;
};

export type CalendarEvent = {
  title: string;
  colorHex: string;
  start: TimeStamp;
  end: TimeStamp;
};

enum DayName {
  Monday = 'MONDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
  Thursday = 'THURSDAY',
  Friday = 'FRIDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
};

export type CalendarDay = {
  // name: enum;
  events: CalendarEvent[];
};
