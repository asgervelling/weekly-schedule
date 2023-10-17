import React from "react";
import { PanelProps } from "./Panel";
import PanelContainer from "./PanelContainer";


/**
 * The panel for when a time slot has no CalendarEvent.
 * Nice to have for its onClick features.
 */
const EmptyPanel: React.FC<PanelProps> = ({ event, dayHeight }) => {
  return (
    <PanelContainer event={event} dayHeight={dayHeight} />
  );
};

export default EmptyPanel;