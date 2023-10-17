import React from "react";
import { PanelProps } from "./Panel";
import PanelContainer from "./PanelContainer";
import { formatTs } from "@/calendar/timestamps";

/**
 * A panel with an event displayed inside it.
 */
const EventPanel: React.FC<PanelProps> = ({ event, dayHeight }) => {
  return (
    <PanelContainer event={event} dayHeight={dayHeight}>
      <p
        style={{ backgroundColor: event.color }}
        className="h-full p-1 text-xs text-primary"
      >
        <span className="text-muted">{formatTs(event.start)}</span>{" "}
        {event.title}
      </p>
    </PanelContainer>
  );
};

export default EventPanel;
