import React from 'react';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';

import { CalendarEvent } from '../../types';
import { timestampToIndex } from '@/calendar/time_formats';
import { isEmptyEvent } from '@/calendar/events';


type PanelProps = {
  i: number;
  n: number;
  event: CalendarEvent;
};


/**
 * A panel in a day of the calendar.
 * The i'th row in a Day divided into n sections
 * of 24/n hours each.
 */
const Panel: React.FC<PanelProps> = ({ i, n, event }) => {
  return pipe(
    event,
    O.fromPredicate(isEmptyEvent),
    O.match(
      () => <EventPanel i={i} n={n} event={event} />,
      () => <EmptyPanel i={i} n={n} event={event} />
    )
  );
}


const EmptyPanel: React.FC<PanelProps> = ({ i, n, event }) => {
  return (
    <div
      key={i}
      style={{
        gridRowStart: timestampToIndex(event.start, n),
        gridRowEnd: timestampToIndex(event.end, n),
      }}
      className={`w-full h-full text-xxs ${i % 2 == 0 ?  'bg-fill': 'bg-fillLowContrast'}`}
    >
    <p className='text-muted'>{event.start} </p>
    <p className='text-primary'>{event.title}</p>
  </div>
  );
}


const EventPanel: React.FC<PanelProps> = ({ i, n, event }) => {
  return (
    <div
      key={i}
      style={{
        backgroundColor: event.colorHex,
        gridRowStart: timestampToIndex(event.start, n),
        gridRowEnd: timestampToIndex(event.end, n),
      }}
      className={'w-full h-full text-xxs'}
    >
      <p>{event.start} {event.title}</p>
    </div>
  );
}

export default Panel;










