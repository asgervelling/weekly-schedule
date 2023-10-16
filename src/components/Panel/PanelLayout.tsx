import { timestampToIndex } from '@/calendar/time_formats';
import React from 'react';
import { CalendarEvent } from '../../../types';


type PanelLayoutProps = {
  children?: React.ReactNode;
  n: number;
  event: CalendarEvent;
};


const PanelLayout: React.FC<PanelLayoutProps> = ({ children, n, event }) => {
  const gridStyle = {
    gridRowStart: timestampToIndex(event.start, n),
    gridRowEnd: timestampToIndex(event.end, n),
  };
  
  return (
    <div
      style={gridStyle}
      className='h-[37px] flex-row text-xs lg:text-base text-md
                  even:bg-fill odd:bg-fillLowContrast'
    >
      {children}
    </div>
  );
};

export default PanelLayout;
