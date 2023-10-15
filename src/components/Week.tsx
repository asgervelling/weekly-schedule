import React from 'react';
import Day from './Day';
import { CalendarEvent } from '../../types';


type WeekProps = {
  n: number;
  events: CalendarEvent[];
};
/**
 * 
 */
const Week: React.FC<WeekProps> = ({ n, events }) => {
  return (
    <div className="flex items-center justify-center h-[480px] overflow-y-auto text-primary">
      {Array.from({ length: 7 }).map((_, index) => (
        <Day key={index} n={n} events={events} />
      ))}
    </div>
  );
};

export default Week;
