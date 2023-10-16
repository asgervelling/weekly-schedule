import React from 'react';
import { CalendarEvent } from '../../types';
import { padEvents } from '@/calendar/events';
import Panel from './Panel';


type DayProps = {
  events: CalendarEvent[];
};


/**
 * A container for events in a day
 */
const Day: React.FC<DayProps> = ({ events }) => {
  const h = 960;
  return (
    <div className='flex flex-col'>
      {padEvents(events).map((e, i) => (
        <Panel key={i} event={e} dayHeight={h} />
      ))}
    </div>
  );
};
  

export default Day;
