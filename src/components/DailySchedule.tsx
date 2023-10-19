import React from "react";
import { Day, ScheduleEvent } from "../../types";
import { padEvents } from "@/calendar/events";
import Panel from "./Panel";
import { DayOfWeek } from "@/app/enums";

type DailyScheduleProps = {
  events: Day;
  dayOfWeek: DayOfWeek;
  onPanelClick: (e: ScheduleEvent, d: DayOfWeek) => void;
};

/**
 * A container for events in a day
 */
const DailySchedule = ({
  events,
  dayOfWeek,
  onPanelClick,
}: DailyScheduleProps) => {
  const h = 960;

  return (
    <div className="flex-grow">
      {padEvents(events).map((e, i) => (
        <Panel
          key={i}
          event={e}
          parentHeight={h}
          onClick={(e: ScheduleEvent) => onPanelClick(e, dayOfWeek)}
        />
      ))}
    </div>
  );
};

export default DailySchedule;
