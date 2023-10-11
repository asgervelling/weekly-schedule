import { indexToTimestamp, timestampToIndex } from './time_formats';
import { TimeTableEvent } from '../../types';


/**
 * Create an array of events that has been padded with
 * empty events, so that it fills the time period 00:00 - 23:59
 */
export const padEvents = (n: number, events: TimeTableEvent[]): TimeTableEvent[] => {
  const paddedEvents: TimeTableEvent[] = [];

  /**
   * Add empty events from now until the next event
   */
  const addEmptyEvents = (start: number, end: number) => {
    if (start >= end) {
      return;
    }
    const startTime = indexToTimestamp(start, n);
    const endTime = indexToTimestamp(start + 1, n);
    const emptyEvent: TimeTableEvent = {
      title: '',
      colorHex: '',
      start: startTime,
      end: endTime,
    };
    paddedEvents.push(emptyEvent);
    addEmptyEvents(start + 1, end);
  };

  let currentIndex = 0;
  for (const event of events) {
    const eventStartIndex = timestampToIndex(event.start, n);
    const eventEndIndex = timestampToIndex(event.end, n);

    if (currentIndex < eventStartIndex) {
      addEmptyEvents(currentIndex, eventStartIndex);
    }
    
    paddedEvents.push(event);
    currentIndex = eventEndIndex;
  }

  if (currentIndex < n) {
    addEmptyEvents(currentIndex, n);
  }

  return paddedEvents;
};
