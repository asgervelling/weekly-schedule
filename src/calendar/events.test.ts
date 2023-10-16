import { CalendarEvent } from "../../types";
import { padEvents } from "./events";
import { parseTs } from "./timestamps";


const events_n24: CalendarEvent[] = [
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
    const empty_event = padEvents(24, events_n24)[1];
    expect(empty_event.title).toEqual('');
    expect(empty_event.colorHex).toEqual('');
    expect(empty_event.start).toEqual(parseTs('01:00'));
    expect(empty_event.end).toEqual(parseTs('02:00'));

    const event_b = padEvents(24, events_n24)[10];
    expect(event_b.title).toEqual('B');
    expect(event_b.colorHex).toEqual('');
    expect(event_b.start).toEqual(parseTs('10:00'));
    expect(event_b.end).toEqual(parseTs('11:00'));
  })
})