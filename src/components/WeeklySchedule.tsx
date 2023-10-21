import React, { SyntheticEvent } from "react";
import DailySchedule from "./DailySchedule";
import { ScheduleEvent, Week } from "../../types";
import { DayOfWeek } from "@/app/enums";

type WeeklyScheduleProps = {
  week: Week | null;
  onPanelClick: (e: ScheduleEvent, d: DayOfWeek) => void;
};

/**
 * Seven days of the week.
 *
 * @param week - Seven lists of events.
 */
const WeeklySchedule = ({
  week,
  onPanelClick,
}: WeeklyScheduleProps) => {
  return (
    <div className="flex w-full h-full overflow-y-auto border rounded">
      {week !== null ? (
        week?.map((day, i) => (
          <DailySchedule
            key={i}
            events={day}
            dayOfWeek={i}
            onPanelClick={onPanelClick}
          />
        ))
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          Loading...
        </div>
      )}
    </div>
  );
};

export default WeeklySchedule;
