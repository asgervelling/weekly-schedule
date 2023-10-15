import React from 'react';
import Day from './Day';
import { CalendarEvent } from '../../types';


type WeekProps = {
  n: number;
  events: CalendarEvent[][];
};


/**
 * Seven days of the week.
 * 
 * @param n - The partition size of 24 hours split into n partitions.
 * @param n - The events for the week.
 */
const Week: React.FC<WeekProps> = ({ n, events }) => {
  return (
    <div className="flex items-center justify-center h-[480px] overflow-y-auto text-primary">
      {events.map((day, i) => (
        <Day key={i} n={n} events={day} />
      ))}
    </div>
  );
};

export default Week;
