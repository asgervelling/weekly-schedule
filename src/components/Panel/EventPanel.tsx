import React from 'react';
import { PanelProps } from './Panel';
import PanelLayout from './PanelLayout';
import { formatTs } from '@/calendar/timestamps';


/**
 * A panel with an event displayed inside it.
 */
const EventPanel: React.FC<PanelProps> = ({ event, dayHeight }) => {
  return (
    <PanelLayout event={event} dayHeight={dayHeight}>
      <p style={{backgroundColor: event.colorHex}} className='h-full text-primary text-xs p-1'>
        <span className='text-muted'>{formatTs(event.start)}</span> {event.title}
      </p>
    </PanelLayout>
  );
};

export default EventPanel;