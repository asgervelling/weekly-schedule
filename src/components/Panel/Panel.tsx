import React from 'react';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';

import { CalendarEvent } from '../../../types';
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

/**
 * The panel for when a time slot has no CalendarEvent.
 * Nice to have for its onClick features.
 */
const EmptyPanel: React.FC<PanelProps> = ({ i, n, event }) => {
  const gridStyle = {
    gridRowStart: timestampToIndex(event.start, n),
    gridRowEnd: timestampToIndex(event.end, n),
  };
  return (
    <div
      key={i}
      style={gridStyle}
      className={`flex-row text-xs lg:text-base text-md p-1
                  ${i % 2 == 0 ? 'bg-fill' : 'bg-fillLowContrast'}`}
    >
    </div>
  );
}

/**
 * A panel with an event displayed inside it.
 */
const EventPanel: React.FC<PanelProps> = ({ i, n, event }) => {
  const gridStyle = {
    gridRowStart: timestampToIndex(event.start, n),
    gridRowEnd: timestampToIndex(event.end, n),
    backgroundColor: event.colorHex,
  };
  return (
    <div
      key={i}
      style={gridStyle}
      className={`flex-row lg:text-base p-1 text-ellipsis`}
    >
      <p className='pl-2 text-primary text-xs'>
        <span className='text-muted'>{event.start}:</span> {event.title}
      </p>
    </div>
  );
}

export default Panel;
