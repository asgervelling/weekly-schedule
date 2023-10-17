import { addTimestamps, parseTs } from "@/calendar/timestamps";
import { CalendarEvent, TimeStamp } from "../../types";



export const randomWeek = () => {
  return Array.from({ length: 7 }, () => randomDay());
};


export const randomDay = (): CalendarEvent[] => {
  const titles = ["Meeting", "Write report", "Read book", "Exercise", "Lunch", "Coding session"];
  const colors = ["#79addc", "#ffc09f", "#adf8b6", "#f9d9a6", "#c7e9b4", "#f4cae4"];
  const startTimes = ["09:00", "10:30", "13:00", "15:30", "17:00", "18:30"];
  const endTimes = ["10:00", "11:30", "14:00", "16:30", "18:00", "19:30"];
  
  const ts = randomOffset();
  const events: CalendarEvent[] = randomEvents(titles, colors, startTimes, endTimes);
  return events.map((e) => (
    {
      ...e,
      start: addTimestamps(ts, e.start),
      end: addTimestamps(ts, e.end),
    }
  ));
};


const randomOffset = (): TimeStamp => {
  const h = Math.floor(Math.random() * 5) - 2;
  const m = Math.floor(Math.random() * 60);
  return { h: h, m: m };
};


const randomEvents = (
  titles: string[],
  colors: string[],
  startTimes: string[],
  endTimes: string[]
): CalendarEvent[] => {
  if (titles.length !== colors.length ||
      titles.length !== startTimes.length ||
      titles.length !== endTimes.length) {
    throw new Error("Lengths of arrays are not equal");
  }
  if (titles.length === 0) {
    return [];
  }

  const event: CalendarEvent = {
    title: titles[Math.floor(Math.random() * titles.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    start: parseTs(startTimes[0]),
    end: parseTs(endTimes[0]),
  };

  return [event, ...randomEvents(titles.slice(1), colors.slice(1),
                                 startTimes.slice(1), endTimes.slice(1))];
}
