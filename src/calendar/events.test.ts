import { CalendarEvent } from "../../types";
import { padEvents } from "./events";


const events_n24: CalendarEvent[] = [
  {
    title: 'A',
    colorHex: '',
    start: '00:00',
    end: '01:00',
  },
  {
    title: 'B',
    colorHex: '',
    start: '10:00',
    end: '11:00',
  },
  {
    title: 'C',
    colorHex: '',
    start: '17:00',
    end: '19:00',
  },
];

describe('padEvents', () => {
  it('should create an array with events from 00:00 till 23:59', () => {
    const empty_event = padEvents(24, events_n24)[1];
    expect(empty_event.title).toBe('');
    expect(empty_event.colorHex).toBe('');
    expect(empty_event.start).toBe('01:00');
    expect(empty_event.end).toBe('02:00');

    const event_b = padEvents(24, events_n24)[10];
    expect(event_b.title).toBe('B');
    expect(event_b.colorHex).toBe('');
    expect(event_b.start).toBe('10:00');
    expect(event_b.end).toBe('11:00');
  })
})