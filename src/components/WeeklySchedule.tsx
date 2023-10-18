import React, { SyntheticEvent } from "react";
import DailySchedule from "./DailySchedule";
import { ScheduleEvent, Week } from "../../types";

type WeeklyScheduleProps = {
  week: Week | null;
  onPanelClick: (e: ScheduleEvent) => void;
};

/**
 * Seven days of the week.
 *
 * @param week - Seven lists of events.
 */
const WeeklySchedule = ({ week, onPanelClick }: WeeklyScheduleProps) => {
  const handleChildData = (e: ScheduleEvent) => {
    onPanelClick(e);
  };

  return (
    <div className="flex w-full h-full overflow-y-auto border border-black rounded">
      {week !== null ? (
        week?.map((day, i) => (
          <DailySchedule key={i} events={day} onPanelClick={handleChildData} />
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
