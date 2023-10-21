import React from "react";
import { PanelProps } from "./Panel";
import PanelContainer from "./PanelContainer";
import { formatTs } from "@/calendar/timestamps";

/**
 * A panel with an event displayed inside it.
 */
const EventPanel = ({ event, parentHeight, onClick }: PanelProps) => {
  return (
    <PanelContainer
      event={event}
      parentHeight={parentHeight}
      onClick={onClick}
    >
      <div className="border h-full max-w-full box-border rounded">
        <p className="h-full w-full p-1 text-primary">
          <span className="text-muted">{formatTs(event.start)}</span>{" "}
          {event.title}
        </p>
      </div>
    </PanelContainer>
  );
};

export default EventPanel;
