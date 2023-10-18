import React from "react";
import { PanelProps } from "./Panel";
import PanelContainer from "./PanelContainer";

/**
 * The panel for when a time slot has no ScheduleEvent.
 * Nice to have for its onClick features.
 */
const EmptyPanel = ({ event, parentHeight, onClick }: PanelProps) => {
  return (
    <PanelContainer
      event={event}
      parentHeight={parentHeight}
      onClick={onClick}
    />
  );
};

export default EmptyPanel;
