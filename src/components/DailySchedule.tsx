import React, { SyntheticEvent } from "react";
import { Day, ScheduleEvent } from "../../types";
import { isEmptyEvent, padEvents } from "@/calendar/events";
import Panel from "./Panel";

type DailyScheduleProps = {
  events: Day;
};

/**
 * A container for events in a day
 */
const DailySchedule = ({ events }: DailyScheduleProps) => {
  const h = 960;

  /**
   * We distinguish between react's SyntheticEvent and our own Event type.
   * This is a helper function to get the event info our own Event type ScheduleEvent.
   * Panels (see further down, we use that component) take as a prop a ScheduleEvent event.
   * We want this function to return that event.
   */
  const getEventInfo = (e: ScheduleEvent) => {
    console.log(e.title, e.start, e.end);
  };

  // Inside th eDailySchedule component, we use the Panel component.
  return (
    <div className="flex-grow">
      {padEvents(events).map((e, i) => (
        <Panel
          key={i}
          event={e}
          parentHeight={h}
          onClick={() => getEventInfo(e)}
        />
      ))}
    </div>
  );
};

export default DailySchedule;
