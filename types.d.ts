export type TimeStamp = {
  h: number;
  m: number;
};

export type CalendarEvent = {
  title: string;
  color: string;
  start: TimeStamp;
  end: TimeStamp;
};

// export type Day = {}