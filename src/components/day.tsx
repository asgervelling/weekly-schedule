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
  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: verticalLayout ? `repeat(${n}, 1fr)` : `repeat(${n}, 1fr)`,
    height: '100%',
    width: '100%',
  };

  return (
    <div style={containerStyle} className='text-primary text-xxs'>
      {padEvents(n, events).map((e, i) => (
        <Panel key={i} i={i} n={n} event={e} />
      ))}
    </div>
  );
};

export default Day;
