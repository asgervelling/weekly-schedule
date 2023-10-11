import React from 'react';
import { indexToTimestamp, timestampToIndex } from '@/calendar/time_formats';
import { TimeTableEvent } from '../../types';
import Panel from './panel';

type ColumnProps = {
  n: number;
  events: TimeTableEvent[];
};

const Column: React.FC<ColumnProps> = ({ n, events }) => {
  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `repeat(${n}, 1fr)`,
    height: '100%',
    width: '100%',
  };

  return (
    <div style={containerStyle} className='border-2 border-slate-950 text-slate-950'>
      {events.map((e, i) => (
        <Panel i={i} n={n} event={e} />
      ))}
    </div>
  );
};

export default Column;
