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
  verticalLayout: boolean;
};


/**
 * A panel in a day of the calendar.
 * The i'th row in a Day divided into n sections
 * of 24/n hours each.
 */
const Panel: React.FC<PanelProps> = ({ i, n, event, verticalLayout }) => {
  return pipe(
    event,
    O.fromPredicate(isEmptyEvent),
    O.match(
      () => <EventPanel i={i} n={n} event={event} verticalLayout={verticalLayout} />,
      () => <EmptyPanel i={i} n={n} event={event} verticalLayout={verticalLayout} />
    )
  );
}

const EmptyPanel: React.FC<PanelProps> = ({ i, n, event, verticalLayout }) => {
  return (
    <div
      key={i}
      style={{
        ...gridStyle(verticalLayout, event, n),
      }}
      className={`text-xxs resize-none h-full w-full ${i % 2 == 0 ? 'bg-fill' : 'bg-fillLowContrast'}`}
    >
    </div>
  );
}

const EventPanel: React.FC<PanelProps> = ({ i, n, event, verticalLayout }) => {
  return (
    <div
      key={i}
      style={{
        backgroundColor: event.colorHex,
        ...gridStyle(verticalLayout, event, n),
      }}
      className={'text-xxs resize-none h-full w-full'}
    >
      <p className='text-muted'>{event.start} </p>
      <p className='text-primary'>{event.title}</p>
    </div>
  );
}


const gridStyle = (verticalLayout: boolean, event: CalendarEvent, n: number) => {
  return verticalLayout
    ? {
        gridRowStart: timestampToIndex(event.start, n),
        gridRowEnd: timestampToIndex(event.end, n),
      }
    : {
        gridColumnStart: timestampToIndex(event.start, n),
        gridColumnEnd: timestampToIndex(event.end, n),
      };
}

export default Panel;
