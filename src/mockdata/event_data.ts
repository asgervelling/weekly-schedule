import { addTimestamps, parseTs } from "@/calendar/timestamps";
import { Day, ScheduleEvent, TimeStamp } from "../../types";

export const randomWeek = () => {
  return Array.from({ length: 7 }, () => randomDay());
};

export const randomOffset = (): TimeStamp => {
  const h = Math.floor(Math.random() * 5) - 2;
  const m = Math.floor(Math.random() * 60);
  return { h: h, m: m };
};

export const randomDay = (): Day => {
  const titles = [
    "Meeting",
    "Write report",
    "Read book",
    "Exercise",
    "Lunch",
    "Coding session",
  ];
  const startTimes = [
    "09:00",
    "10:30",
    "13:00",
    "15:30",
    "17:00",
    "18:30",
  ];
  const endTimes = [
    "10:00",
    "11:30",
    "14:00",
    "16:30",
    "18:00",
    "21:30",
  ];

  const ts = randomOffset();
  const events: Day = randomEvents(titles, startTimes, endTimes);
  return events.map((e) => ({
    ...e,
    start: addTimestamps(ts, e.start),
    end: addTimestamps(ts, e.end),
  }));
};

const randomEvents = (
  titles: string[],
  startTimes: string[],
  endTimes: string[]
): Day => {
  if (
    titles.length !== startTimes.length ||
    titles.length !== endTimes.length
  ) {
    throw new Error("Lengths of arrays are not equal");
  }
  if (titles.length === 0) {
    return [];
  }

  const event: ScheduleEvent = {
    title: titles[Math.floor(Math.random() * titles.length)],
    start: parseTs(startTimes[0]),
    end: parseTs(endTimes[0]),
  };

  return [
    event,
    ...randomEvents(
      titles.slice(1),
      startTimes.slice(1),
      endTimes.slice(1)
    ),
  ];
};
