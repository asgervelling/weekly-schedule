import { match } from 'assert';
import { CalendarEvent, TimeStamp } from '../../types';
import { minutesToTs, tsToMinutes, addTimestamps, parseTs, tsLt, minTs, tsDiff, formatTs, tsLeq, tsGeq } from './timestamps';


/**
 * An empty event in the calendar, which a user may overwrite
 * with a CalendarEvent.
 */
export const createEmptyEvent = (start: TimeStamp, end: TimeStamp): CalendarEvent => {
    return { title: '', colorHex: '', start, end };
};


export const isEmptyEvent = (e: CalendarEvent) => {
  return e.title === '';
};


export const insertEvent = (e: CalendarEvent, events: CalendarEvent[]): CalendarEvent[] => {
  if (events.length === 0) {
    // base case for recursion
    return [e];
  }
  const [x, ...xs] = events;
  if (tsGeq(x.start, e.end)) {
    // e is before x, so e is inserted first
    return [e, x, ...xs];
  }

  if (tsLt(x.start, e.start) && tsLt(e.end, x.end)) {
    // e is contained in x and not inserted
    return [x, ...xs];
  }
  if (tsGeq(x.start, e.start) && tsGeq(e.end, x.end)) {
    // x is contained in e and overwritten
    return [e, ...xs];
  }
  
  if (tsGeq(x.start, e.start) && tsLt(e.start, x.end)) {
    // e pushes the start of x forward
    const newX = { ...x, start: e.end };
    return [e, newX, ...xs];
  }
  if (tsLeq(x.start, e.start) && tsGeq(e.end, x.end)) {
    // e's start shortens x
    const newX = { ...x, end: e.start };
    return [newX, ...insertEvent(e, xs)]
  }
  throw new Error('Case not handled');
};


/**
 * Create an array of events that has been padded with
 * empty events, so that it fills the time period 00:00 - 23:59
 */
export const padEvents = (events: CalendarEvent[]): CalendarEvent[] => {
  const paddedEvents: CalendarEvent[] = [];

  /**
   * Add empty events from now until the next event.
   * The empty events have a length in minutes of
   * min(30 minutes, time to next event)
   */
  const addEmptyEvents = (start: TimeStamp, end: TimeStamp): void => {
    if (tsToMinutes(start) >= tsToMinutes(end)) {
      return;
    }
    let delta = minTs(minutesToTs(30), tsDiff(start, end));
    if (tsToMinutes(start) % 30 !== 0) {
      delta = minutesToTs(30 - tsToMinutes(start) % 30);
    }
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
