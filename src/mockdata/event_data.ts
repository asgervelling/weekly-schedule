import Day from "@/components/Day";
import { CalendarEvent } from "../../types";
import Week from '../components/Week';
import { addTimestamps, indexToTimestamp, timestampToIndex } from "@/calendar/time_formats";


export const randomWeek = () => {
  return Array.from({ length: 7 }, () => randomDay());
};


const randomDay = (): CalendarEvent[] => {
  const titles = ['Meeting', 'Write report', 'Read book', 'Exercise', 'Lunch', 'Coding session'];
  const colors = ['#79addc', '#ffc09f', '#adf8b6', '#f9d9a6', '#c7e9b4', '#f4cae4'];
  const startTimes = ['09:00', '10:30', '13:00', '15:30', '17:00', '18:30'];
  const endTimes = ['10:00', '11:30', '14:00', '16:30', '18:00', '19:30'];
  
  const hours = Math.floor(Math.random() * 5) - 2;
  const minutes = Math.floor(Math.random() * 60);
  const ts = `${hours}:${minutes}`
  console.log(ts);

  const events: CalendarEvent[] = randomEvents(titles, colors, startTimes, endTimes);
  return events.map((event) => (
    {
      ...event,
      start: addTimestamps(ts, event.start),
      end: addTimestamps(ts, event.end),
    }
  ));
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
    throw new Error('Lengths of arrays are not equal');
  }
  if (titles.length === 0) {
    return [];
  }

  const event: CalendarEvent = {
    title: titles[Math.floor(Math.random() * titles.length)],
    colorHex: colors[Math.floor(Math.random() * colors.length)],
    start: startTimes[0],
    end: endTimes[0],
  };

  return [event, ...randomEvents(titles.slice(1), colors.slice(1),
                                 startTimes.slice(1), endTimes.slice(1))];
}
