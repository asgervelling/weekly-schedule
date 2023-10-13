import React from 'react';
import { CalendarEvent } from '../../types';
import Panel from './panel';
import { padEvents } from '@/calendar/events';


/**
 * @param {number} n - The partition size of 24 hours split into n partitions.
 * @param {CalendarEvent[]} events - The events for the day.
 * @param {boolean} verticalLayout - Default: false. Indicates if the layout should be vertical.
 */
type DayProps = {
  n: number;
  events: CalendarEvent[];
  verticalLayout: boolean;
};

/**
 * A container for events in a day
 */
const Day: React.FC<DayProps> = ({ n, events, verticalLayout}) => {
  /* 
  Our day needs to be scrollable somehow. That may fix other issues.
  To make it scrollable, it probably needs to just be horizontal. Scrolling sideways is nasty.
  To fix the zoom problem, here's what should happen when we resize the window or zoom in.

  - Start and End increase and decrease, respectively
  - The median is the current time of day
  */
  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: verticalLayout ? `repeat(${n}, 1fr)` : '',
    gridTemplateColumns: verticalLayout ? '' : `repeat(${n}, 1fr)`,
  };

  return (
    <div style={containerStyle} className='text-primary text-xxs h-full w-full'>
      {padEvents(n, events).map((e, i) => (
        <Panel key={i} i={i} n={n} event={e} verticalLayout={verticalLayout} />
      ))}
    </div>
  );
};

export default Day;
