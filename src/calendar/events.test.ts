import { CalendarEvent } from "../../types";
import { insertEvent, padEvents } from "./events";
import { parseTs } from "./timestamps";
import { createEmptyEvent } from "./events";


const testEvents: CalendarEvent[] = [
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

const emptyEvents = (): CalendarEvent[] => {
  const p = parseTs;
  return [
    createEmptyEvent(p('11:00'), p('12:00')),
    createEmptyEvent(p('11:30'), p('13:00')),
    createEmptyEvent(p('15:00'), p('16:00')),
  ]
};

const createEvent = (title: string, start: string, end: string): CalendarEvent => {
  return {
    title: title,
    colorHex: '',
    start: parseTs(start),
    end: parseTs(end),
  };
};

describe('insertEvent', () => {
  it('Case: array is empty', () => {
    const e = createEmptyEvent(parseTs('10:00'), parseTs('11:00'));
    expect(insertEvent(e, [])).toEqual([e]);
  });
  it('Case: e is before x', () => {
    const e = createEmptyEvent(parseTs('10:00'), parseTs('11:00'));
    const x = createEmptyEvent(parseTs('12:00'), parseTs('13:00'));
    expect(insertEvent(e, [x])).toEqual([e, x]);
  });
  it('Case: x contains e', () => {
    const e = createEmptyEvent(parseTs('10:00'), parseTs('11:00'));
    const x = createEmptyEvent(parseTs('09:00'), parseTs('12:00'));
    expect(insertEvent(e, [x])).toEqual([x]);
  });
  it('Case: e contains x', () => {
    const e = createEmptyEvent(parseTs('10:00'), parseTs('11:00'));
    const x = createEmptyEvent(parseTs('10:30'), parseTs('10:45'));
    expect(insertEvent(e, [x])).toEqual([e]);
  });
  it('Case: e pushes the start of x forward', () => {
    const e = createEmptyEvent(parseTs('10:00'), parseTs('11:00'));
    const x = createEmptyEvent(parseTs('10:30'), parseTs('12:00'));
    expect(insertEvent(e, [x])).toEqual([
      createEmptyEvent(parseTs('10:00'), parseTs('11:00')),
      createEmptyEvent(parseTs('11:00'), parseTs('12:00')),
    ]);
  });
  it('Case: e.start shortens x', () => {
    const e = createEmptyEvent(parseTs('10:00'), parseTs('11:00'));
    const x = createEmptyEvent(parseTs('09:00'), parseTs('10:30'));
    expect(insertEvent(e, [x])).toEqual([
      createEmptyEvent(parseTs('09:00'), parseTs('10:00')),
      createEmptyEvent(parseTs('10:00'), parseTs('11:00')),
    ]);
  });
  it('Case: e is inserted in the middle', () => {
    const e = createEmptyEvent(parseTs('10:00'), parseTs('11:00'));
    const x = createEmptyEvent(parseTs('09:00'), parseTs('10:00'));
    const y = createEmptyEvent(parseTs('11:00'), parseTs('12:00'));
    expect(insertEvent(e, [x, y])).toEqual([
      createEmptyEvent(parseTs('09:00'), parseTs('10:00')),
      createEmptyEvent(parseTs('10:00'), parseTs('11:00')),
      createEmptyEvent(parseTs('11:00'), parseTs('12:00')),
    ]);
  });
  it('Case: e is inserted in the middle, and x is overwritten', () => {
    const e = createEmptyEvent(parseTs('10:00'), parseTs('11:00'));
    const x = createEmptyEvent(parseTs('09:00'), parseTs('11:00'));
    const y = createEmptyEvent(parseTs('11:00'), parseTs('12:00'));
    expect(insertEvent(e, [x, y])).toEqual([
      createEmptyEvent(parseTs('09:00'), parseTs('10:00')),
      createEmptyEvent(parseTs('10:00'), parseTs('11:00')),
      createEmptyEvent(parseTs('11:00'), parseTs('12:00')),
    ]);
  });
  it('Case: e is inserted in the middle, and y is overwritten', () => {
    const e = createEmptyEvent(parseTs('10:00'), parseTs('11:00'));
    const x = createEmptyEvent(parseTs('09:00'), parseTs('10:00'));
    const y = createEmptyEvent(parseTs('10:30'), parseTs('12:00'));
    expect(insertEvent(e, [x, y])).toEqual([
      createEmptyEvent(parseTs('09:00'), parseTs('10:00')),
      createEmptyEvent(parseTs('10:00'), parseTs('11:00')),
      createEmptyEvent(parseTs('11:00'), parseTs('12:00')),
    ]);
  });
  it('Case: e is inserted in the middle, and x and y are overwritten', () => {
    const e = createEmptyEvent(parseTs('10:00'), parseTs('11:00'));
    const x = createEmptyEvent(parseTs('09:00'), parseTs('11:00'));
    const y = createEmptyEvent(parseTs('10:30'), parseTs('12:00'));
    expect(insertEvent(e, [x, y])).toEqual([
      createEmptyEvent(parseTs('09:00'), parseTs('10:00')),
      createEmptyEvent(parseTs('10:00'), parseTs('11:00')),
      createEmptyEvent(parseTs('11:00'), parseTs('12:00')),
    ]);
  });
  it('Case: e is inserted after x', () => {
    const e = createEvent('e', '10:00', '11:00');
    const x = createEvent('x', '08:00', '09:00');
    console.log(insertEvent(e, [x]));
    expect(insertEvent(e, [x])).toEqual([
      createEvent('x', '08:00', '09:00'),
      createEvent('e', '10:00', '11:00'),
    ]);
  });
  it('Case: e is inserted after x and y, shortening y', () => {
    const e = createEvent('e', '10:00', '11:00');
    const x = createEvent('x', '08:00', '09:00');
    const y = createEvent('y', '09:30', '10:30');
    expect(insertEvent(e, [x, y])).toEqual([
      createEvent('x', '08:00', '09:00'),
      createEvent('y', '09:30', '10:00'),
      createEvent('e', '10:00', '11:00'),
    ]);
  });
  it('Case: e is inserted between x and y, pushing y', () => {
    const e = createEvent('e', '10:00', '11:00');
    const x = createEvent('x', '08:00', '09:00');
    const y = createEvent('y', '10:30', '11:30');
    expect(insertEvent(e, [x, y])).toEqual([
      createEvent('x', '08:00', '09:00'),
      createEvent('e', '10:00', '11:00'),
      createEvent('y', '11:00', '11:30'),
    ]);
  });
});

describe('padEvents', () => {
  it('should create an array with events from 00:00 till 23:59', () => {
    const empty_event = padEvents(testEvents)[1];
    expect(empty_event.start).toEqual(parseTs('01:00'));
    // Empty events are 30 minutes long
    expect(empty_event.end).toEqual(parseTs('01:30'));
    expect(empty_event.title).toEqual('');
    expect(empty_event.colorHex).toEqual('');

    const event_b = padEvents(testEvents)[19];
    expect(event_b.start).toEqual(parseTs('10:00'));
    expect(event_b.end).toEqual(parseTs('11:00'));
    expect(event_b.title).toEqual('B');
    expect(event_b.colorHex).toEqual('');

    const event_c = padEvents(testEvents)[20];
    expect(event_c).toEqual(createEmptyEvent(parseTs('11:00'), parseTs('11:30')));
  })
})