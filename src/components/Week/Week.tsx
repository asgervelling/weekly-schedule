import React from 'react';
import Day from '../Day';
import { CalendarEvent } from '../../../types';
import WeekContainer from './WeekContainer';


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
    <WeekContainer>
      {days.map((day, i) => (
        <Day key={i} events={day} />
      ))}
    </WeekContainer>
  );
};

export default Week;
