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
    /* Setting the height and width of the container. A day is supposed to be taller than its container, so we can scroll. However
    it should have full width, and days should have 1/7 width of the container. */
    <div className="flex w-full h-full overflow-y-auto border border-black rounded">
      {days.map((day, i) => (
        <Day key={i} events={day} />
      ))}
    </div>
  );
};

export default Week;
