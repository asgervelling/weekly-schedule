export type TimeStamp = {
  h: number;
  m: number;
};

export type ScheduleEvent = {
  title: string;
  start: TimeStamp;
  end: TimeStamp;
};

export type Day = CalendarEvent[];
export type Week = Day[];
