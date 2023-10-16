import React from 'react';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';

import { CalendarEvent } from '../../../types';
import { isEmptyEvent } from '@/calendar/events';
import EventPanel from './EventPanel';
import EmptyPanel from './EmptyPanel';


export type PanelProps = {
  event: CalendarEvent;
  dayHeight: number;
};


/**
 * A panel in a day of the calendar.
 * The i'th row in a Day divided into n sections
 * of 24/n hours each.
 */
const Panel: React.FC<PanelProps> = ({ event, dayHeight }) => {
  return pipe(
    event,
    O.fromPredicate(isEmptyEvent),
    O.match(
      () => <EmptyPanel event={event} dayHeight={dayHeight} />,
      () => <EventPanel event={event} dayHeight={dayHeight} />
    )
  );
}

export default Panel;
