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
