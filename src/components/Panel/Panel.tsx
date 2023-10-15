import React from 'react';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';

import { CalendarEvent } from '../../../types';
import { isEmptyEvent } from '@/calendar/events';
import EventPanel from './EventPanel';
import EmptyPanel from './EmptyPanel';


export type PanelProps = {
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

export default Panel;
