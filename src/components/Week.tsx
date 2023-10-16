import React from 'react';
import Day from './Day';
import { CalendarEvent } from '../../types';


type WeekProps = {
  n: number;
  days: CalendarEvent[][];
};


/**
 * Seven days of the week.
 * 
 * @param days - Seven lists of events.
 */
const Week: React.FC<WeekProps> = ({ n, days }) => {
  return (
    <div className="flex items-center justify-center h-[480px] overflow-y-auto text-primary">
      {days.map((day, i) => (
        <Day key={i} events={day} />
      ))}
    </div>
  );
};

export default Week;
