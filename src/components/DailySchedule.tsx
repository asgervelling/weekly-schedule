import React from "react";
import { Day, ScheduleEvent } from "../../types";
import { padEvents } from "@/calendar/events";
import Panel from "./Panel";

type DailyScheduleProps = {
  events: Day;
  onPanelClick: (e: ScheduleEvent) => void;
};

/**
 * A container for events in a day
 */
const DailySchedule = ({ events, onPanelClick }: DailyScheduleProps) => {
  const h = 960;

  const handleChildData = (e: ScheduleEvent) => {
    onPanelClick(e);
  };

  return (
    <div className="flex-grow">
      {padEvents(events).map((e, i) => (
        <Panel key={i} event={e} parentHeight={h} onClick={handleChildData} />
      ))}
    </div>
  );
};

export default DailySchedule;
