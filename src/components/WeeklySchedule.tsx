import React from "react";
import DailySchedule from "./DailySchedule";
import { Week } from "../../types";

type WeeklyScheduleProps = {
  week: Week | null;
};

/**
 * Seven days of the week.
 *
 * @param week - Seven lists of events.
 */
const WeeklySchedule = ({ week }: WeeklyScheduleProps) => {
  const renderDays = () => {
    return week?.map((day, i) => <DailySchedule key={i} events={day} />);
  };

  const renderFallback = () => {
    return (
      <div className="flex items-center justify-center w-full h-full">
        Loading...
      </div>
    );
  };

  return (
    <div className="flex w-full h-full overflow-y-auto border border-black rounded">
      {week !== null ? renderDays() : renderFallback()}
    </div>
  );
};

export default WeeklySchedule;
