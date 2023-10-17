import React from "react";
import { ScheduleEvent } from "../../types";
import { padEvents } from "@/calendar/events";
import Panel from "./Panel";

type DailyScheduleProps = {
  events: Day;
};

/**
 * A container for events in a day
 */
const DailySchedule = ({ events }: DailyScheduleProps) => {
  const h = 960;
  return (
    <div className="flex-grow">
      {padEvents(events).map((e, i) => (
        <Panel key={i} event={e} parentHeight={h} />
      ))}
    </div>
  );
};

export default DailySchedule;
