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
g
export type Day = CalendarEvent[];
export type Week = Day[];
