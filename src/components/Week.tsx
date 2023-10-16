import React from 'react';
import Day from './Day';
import { CalendarEvent } from '../../types';


type WeekProps = {
  days: CalendarEvent[][];
};


/**
 * Seven days of the week.
 * 
 * @param days - Seven lists of events.
 */
const Week: React.FC<WeekProps> = ({ days }) => {
  return (
    <div className="flex items-center justify-center h-[480px] overflow-y-auto">
      {days.map((day, i) => (
        <Day key={i} events={day} />
      ))}
    </div>
  );
};

export default Week;
