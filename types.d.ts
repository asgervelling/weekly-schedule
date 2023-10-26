export type TimeStamp = {
  h: number;
  m: number;
};

export type ScheduleEvent = {
  title: string;
  start: TimeStamp;
  end: TimeStamp;
};

export type Day = ScheduleEvent[];
export type Week = Day[];
