import React from "react";
import { CalendarEvent } from "../../types";
import Week from "./Week";
import WeekFallback from "./Week/WeekFallback";


type ScheduleProps = {
  days: CalendarEvent[][] | null;
};


const Schedule: React.FC<ScheduleProps> = ({ days }) => {
  return (
    <div className="w-full h-full">
      <div className="">

      </div>
      {days !== null
        ? <Week days={days} />
        : <WeekFallback />}
    </div>
  );
};

export default Schedule;
