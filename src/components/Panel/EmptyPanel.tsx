import React from 'react';
import { PanelProps } from './Panel';
import PanelLayout from './PanelLayout';


/**
 * The panel for when a time slot has no CalendarEvent.
 * Nice to have for its onClick features.
 */
const EmptyPanel: React.FC<PanelProps> = ({ event, dayHeight }) => {
  return (
    <PanelLayout event={event} dayHeight={dayHeight} />
  );
};

export default EmptyPanel;