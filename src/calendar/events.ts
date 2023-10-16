import { indexToTimestamp } from './time_formats';
import { CalendarEvent, TimeStamp } from '../../types';
import { minutesToTs, tsToMinutes, addTimestamps, parseTs, tsLt } from './timestamps';


/**
 * An empty event in the calendar, which a user may overwrite
 * with a CalendarEvent.
 */
const createEmptyEvent = (start: TimeStamp, end: TimeStamp): CalendarEvent => {
    return { title: '', colorHex: '', start, end };
};


export const isEmptyEvent = (e: CalendarEvent) => {
  return e.title === '';
};


/**
 * Create an array of events that has been padded with
 * empty events, so that it fills the time period 00:00 - 23:59
 */
export const padEvents = (n: number, events: CalendarEvent[]): CalendarEvent[] => {
  console.log(n, events);
  const paddedEvents: CalendarEvent[] = [];

  /**
   * Add empty events from now until the next event
   */
  const addEmptyEvents = (start: TimeStamp, end: TimeStamp): void => {
    if (tsToMinutes(start) >= tsToMinutes(end)) {
      return;
    }
    const delta = minutesToTs(Math.round(24 * 60 / n));
    const t1 = addTimestamps(start, delta);
    paddedEvents.push(createEmptyEvent(start, t1));
    addEmptyEvents(t1, end);
  };

  let currentTs = parseTs('00:00');
  for (const e of events) {
    if (tsLt(currentTs, e.start)) {
      addEmptyEvents(currentTs, e.start);
    }
    paddedEvents.push(e);
    currentTs = e.end;
  }
  if (tsLt(currentTs, parseTs('23:59'))) {
    addEmptyEvents(currentTs, parseTs('23:59'));
  }
  return paddedEvents;
};
