import React from 'react';
import { CalendarEvent } from '../../types';
import Panel from './panel';
import { padEvents } from '@/calendar/events';


type DayProps = {
  n: number;
  events: CalendarEvent[];
  verticalLayout: boolean;
};

/**
 * A container for events in a day
 * 
 * @param {number} n - The partition size of 24 hours split into n partitions.
 * @param {CalendarEvent[]} events - The events for the day.
 * @param {boolean} verticalLayout - Default: false. Indicates if the layout should be vertical.
 */
const Day: React.FC<DayProps> = ({ n, events, verticalLayout}) => {
  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: verticalLayout ? `repeat(${n}, 2rem)` : '',
    gridTemplateColumns: verticalLayout ? '' : `repeat(${n}, 3rem)`,
    overflowY: verticalLayout ? 'scroll' : 'auto',
    overflowX: verticalLayout ? 'auto' : 'scroll',
    height: '100%',
    width: '100%',
  };

  // Todo: Change this whole component to use tailwind
  return (
    <div
      style={containerStyle}
      className={``}
    >
      {padEvents(n, events).map((e, i) => (
        <Panel key={i} i={i} n={n} event={e} verticalLayout={verticalLayout} />
      ))}
    </div>
  );
};
  

export default Day;
