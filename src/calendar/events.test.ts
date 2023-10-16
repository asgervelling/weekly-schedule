import { CalendarEvent } from "../../types";
import { padEvents } from "./events";
import { parseTs } from "./timestamps";
import { createEmptyEvent } from "./events";


const events: CalendarEvent[] = [
  {
    title: 'A',
    colorHex: '',
    start: parseTs('00:00'),
    end: parseTs('01:00'),
  },
  {
    title: 'B',
    colorHex: '',
    start: parseTs('10:00'),
    end: parseTs('11:00'),
  },
  {
    title: 'C',
    colorHex: '',
    start: parseTs('17:00'),
    end: parseTs('19:00'),
  },
];

describe('padEvents', () => {
  it('should create an array with events from 00:00 till 23:59', () => {
    const empty_event = padEvents(events)[1];
    expect(empty_event.start).toEqual(parseTs('01:00'));
    // Empty events are 30 minutes long
    expect(empty_event.end).toEqual(parseTs('01:30'));
    expect(empty_event.title).toEqual('');
    expect(empty_event.colorHex).toEqual('');

    const event_b = padEvents(events)[19];
    expect(event_b.start).toEqual(parseTs('10:00'));
    expect(event_b.end).toEqual(parseTs('11:00'));
    expect(event_b.title).toEqual('B');
    expect(event_b.colorHex).toEqual('');

    const event_c = padEvents(events)[20];
    expect(event_c).toEqual(createEmptyEvent(parseTs('11:00'), parseTs('11:30')));
  })
})