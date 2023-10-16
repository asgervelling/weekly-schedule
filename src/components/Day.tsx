"use effect";
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
  const h = 960;
  return (
    <div className='flex flex-col w-40'>
      {padEvents(n, events).map((e, i) => (
        <Panel key={i} event={e} dayHeight={h} />
      ))}
    </div>
  );
};
  

export default Day;
