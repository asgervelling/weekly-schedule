import React from 'react';
import { indexToTimestamp, timestampToIndex } from '@/calendar/time_formats';
import { TimeTableEvent } from '../../types';

interface RowProps {
  n: number;
  events: TimeTableEvent[];
}

const Column: React.FC<RowProps> = ({ n, events }) => {
  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `repeat(${n}, 1fr)`,
    height: '100%',
    width: '100%',
  };

  return (
    <div style={containerStyle} className='border-2'>
      {events.map((e, index) => (
        <div
          key={index}
          style={{
            backgroundColor: e.colorHex,
            gridRowStart: timestampToIndex(e.start, n),
            gridRowEnd: timestampToIndex(e.end, n),
          }}
          className='w-full h-full'
        >
          <p>{e.start}: {e.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Column;
