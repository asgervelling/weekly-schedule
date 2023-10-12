import React from 'react';
import { CalendarEvent } from '../../types';
import { timestampToIndex } from '@/calendar/time_formats';


type PanelProps = {
  i: number;
  n: number;
  event: CalendarEvent;
};


/**
 * The i'th row in a Column divided into n sections
 */
const Panel: React.FC<PanelProps> = ({ i, n, event }) => {
  return (
    <div
      key={i}
      style={{
        backgroundColor: event.colorHex,
        gridRowStart: timestampToIndex(event.start, n),
        gridRowEnd: timestampToIndex(event.end, n),
      }}
      className={`w-full h-full ${i % 2 == 0 ? 'bg-white' : 'bg-sky-50'}`}
    >
      <p className='text-xs'>{event.start}: {event.title}</p>
    </div>
  );
}

export default Panel;










