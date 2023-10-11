import React from 'react';
import { TimeTableEvent } from '../../types';
import { timestampToIndex } from '@/calendar/time_formats';


type PanelProps = {
  i: number;
  n: number;
  event: TimeTableEvent;
};


const Panel: React.FC<PanelProps> = ({ i, n, event }) => {
  return (
    <div
      key={i}
      style={{
        backgroundColor: event.colorHex,
        gridRowStart: timestampToIndex(event.start, n),
        gridRowEnd: timestampToIndex(event.end, n),
      }}
      className='w-full h-full'
    >
      <p>{event.start}: {event.title}</p>
    </div>
  );
}

export default Panel;