import React from 'react';
import { CalendarEvent } from '../../types';
import { padEvents } from '@/calendar/events';
import Panel from './Panel';


type DayProps = {
  n: number;
  events: CalendarEvent[];
};


/**
 * A container for events in a day
 * 
 * @param {number} n - The partition size of 24 hours split into n partitions.
 * @param {CalendarEvent[]} events - The events for the day.
 */
const Day: React.FC<DayProps> = ({ n, events }) => {
  return (
    <div
      style={{gridTemplateRows: `repeat(${n}, 1.5rem)`}}
      className={'grid h-full w-full'}
    >
      {padEvents(n, events).map((e, i) => (
        <Panel key={i} i={i} n={n} event={e} />
      ))}
    </div>
  );
};
  

export default Day;
