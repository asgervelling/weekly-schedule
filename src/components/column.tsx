import React from 'react';
import { CalendarEvent } from '../../types';
import Panel from './panel';
import { padEvents } from '@/calendar/events';

type ColumnProps = {
  n: number;
  events: CalendarEvent[];
};

/**
 * A container for events in a day
 */
const Column: React.FC<ColumnProps> = ({ n, events }) => {
  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `repeat(${n}, 1fr)`,
    height: '100%',
    width: '100%',
  };

  return (
    <div style={containerStyle} className='text-base text-xxs'>
      {padEvents(n, events).map((e, i) => (
        <Panel i={i} n={n} event={e} />
      ))}
    </div>
  );
};

export default Column;
