export type TimeStamp = {
  h: number;
  m: number;
};

export type ScheduleEvent = {
  title: string;
  color: string;
  start: TimeStamp;
  end: TimeStamp;
};

export enum DayOfWeek {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6,
}

export type Day = CalendarEvent[];
export type Week = Day[];
