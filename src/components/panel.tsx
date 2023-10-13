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

/**
 * The panel for when a time slot has no CalendarEvent.
 * Nice to have for its onClick features.
 */
const EmptyPanel: React.FC<PanelProps> = ({ i, n, event, verticalLayout }) => {
  return (
    <div
      key={i}
      style={{
        ...gridStyle(verticalLayout, event, n),
      }}
      className={`text-xs lg:text-base text-md p-1
                  ${i % 2 == 0 ? 'bg-fill' : 'bg-fillLowContrast'}
                  ${verticalLayout ? 'flex-row' : 'flex-col'}
                `}
    >
    </div>
  );
}

/**
 * A panel with an event displayed inside it.
 */
const EventPanel: React.FC<PanelProps> = ({ i, n, event, verticalLayout }) => {
  return (
    <div
      key={i}
      style={{backgroundColor: event.colorHex,
              ...gridStyle(verticalLayout, event, n)}}
      className={`flex text-xs lg:text-base p-1 text-ellipsis
                  ${verticalLayout ? 'flex-row' : 'flex-col'}`}
    >
      <p className='pl-2 text-muted'>{event.start}</p>
      <p className='pl-2 text-primary'>{event.title}</p>
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
