import { DayOfWeek } from "@/app/enums";
import { Day, ScheduleEvent, TimeStamp, Week } from "../types";
import {
  minutesToTs,
  tsToMinutes,
  addTimestamps,
  parseTs,
  tsLt,
  minTs,
  tsDiff,
  tsGeq,
  tsEq,
  formatTs,
} from "./timestamps";
import { emptyEventLength } from "./settings";

/**
 * The preferred way to create an event. Example:
 * createEvent("Meeting", "09:00", "10:00")
 */
export const createEvent = (
  title: string,
  start: string,
  end: string
): ScheduleEvent => {
  const p = parseTs;
  const endTime = tsEq(p(end), p("00:00")) ? p("23:59") : p(end);
  if (tsLt(endTime, p(start))) {
    throw new Error("End time must be after start time");
  }
  return {
    title,
    start: p(start),
    end: endTime,
  };
};

/**
 * An empty event in the calendar, which a user may overwrite
 * with a non-empty one.
 */
export const emptyEvent = (
  start: string | TimeStamp,
  end: string | TimeStamp
): ScheduleEvent => {
  const f = (x: string | TimeStamp): string =>
    typeof x === "string" ? x : formatTs(x);
  return createEvent("", f(start), f(end));
};

/**
 * Compares everything but color
 */
export const eventEquals = (
  e1: ScheduleEvent,
  e2: ScheduleEvent
): boolean => {
  return (
    e1.title === e2.title &&
    tsEq(e1.start, e2.start) &&
    tsEq(e1.end, e2.end)
  );
};

/**
 * Create a Week with no events.
 */
export const emptyWeek = (): Week => {
  return [[], [], [], [], [], [], []];
};

export const isEmptyEvent = (e: ScheduleEvent) => {
  return e.title === "";
};

/**
 * Create a new Week with the given Day inserted.
 */
export const insertDay = (
  day: Day,
  dayOfWeek: DayOfWeek,
  week: Week
): Week => {
  const newWeek = [...week];
  newWeek[dayOfWeek] = day;
  return newWeek;
};

/**
 * Insert an event into an array of events,
 * using an opinionated algorithm.
 */
export const insertEvent = (e: ScheduleEvent, events: Day): Day => {
  if (events.length === 0) {
    // base case for recursion
    return [e];
  }
  const [x, ...xs] = events;
  if (tsLt(e.end, x.start)) {
    // e is before x, so e is inserted first
    return [e, x, ...xs];
  }
  if (tsGeq(e.start, x.end)) {
    // e is after x, so x is inserted first
    return [x, ...insertEvent(e, xs)];
  }

  if (tsLt(x.start, e.start) && tsLt(e.end, x.end)) {
    // x starts earlier and ends later than e.
    // e is not inserted
    return [x, ...xs];
  }
  if (tsGeq(x.start, e.start) && tsGeq(e.end, x.end)) {
    // e starts earlier and ends later than x.
    // x is overwritten
    return insertEvent(e, xs);
  }

  if (tsGeq(x.start, e.start) && tsLt(e.start, x.end)) {
    // e pushes the start of x forward
    const newX = { ...x, start: e.end };
    return [e, newX, ...xs];
  }
  if (tsLt(x.start, e.start) && tsGeq(e.end, x.end)) {
    // e's start pushes back the end of x
    const newX = { ...x, end: e.start };
    return [newX, ...insertEvent(e, xs)];
  }

  console.log("Warning: Case not handled");
  return [];
};

/**
 * Create an array of events that has been padded with
 * empty events, so that it fills the time period 00:00 - 23:59
 */
export const padEvents = (events: Day): Day => {
  const paddedEvents: Day = [];

  /**
   * Add empty events from now until the next event.
   * The empty events have a length in minutes of
   * min(emptyEventLength minutes, time to next event)
   */
  const addEmptyEvents = (start: TimeStamp, end: TimeStamp): void => {
    if (tsToMinutes(start) >= tsToMinutes(end)) {
      return;
    }
    let delta = minTs(
      minutesToTs(emptyEventLength),
      tsDiff(start, end)
    );
    if (tsToMinutes(start) % emptyEventLength !== 0) {
      delta = minutesToTs(
        emptyEventLength - (tsToMinutes(start) % emptyEventLength)
      );
    }
    const t1 = addTimestamps(start, delta);
    paddedEvents.push(emptyEvent(start, t1));
    addEmptyEvents(t1, end);
  };

  let currentTs = parseTs("00:00");
  for (const e of events) {
    if (tsLt(currentTs, e.start)) {
      addEmptyEvents(currentTs, e.start);
    }
    paddedEvents.push(e);
    currentTs = e.end;
  }
  if (tsLt(currentTs, parseTs("23:59"))) {
    addEmptyEvents(currentTs, parseTs("23:59"));
  }
  return paddedEvents;
};
