import React from 'react';
import { PanelProps } from './Panel';
import { panelHeight } from '@/calendar/panels';


type PanelLayoutProps = PanelProps & {
  children?: React.ReactNode;
};


const PanelLayout: React.FC<PanelLayoutProps> = ({ event, dayHeight, children }) => {
  const gridStyle = {
    height: `${panelHeight(event, dayHeight)}px`,
  };
  
  return (
    <div
      style={gridStyle}
      className='text-xs lg:text-base text-md even:bg-fill odd:bg-fillLowContrast'
    >
      {children}
    </div>
  );
};



export default PanelLayout;
