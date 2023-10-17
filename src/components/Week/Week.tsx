import React from "react";
import Day from "../Day";
import { CalendarEvent } from "../../../types";

type WeekProps = {
  days: CalendarEvent[][] | null;
};

/**
 * Seven days of the week.
 *
 * @param days - Seven lists of events.
 */
const Week: React.FC<WeekProps> = ({ days }) => {
  const renderDays = () => {
    return days?.map((day, i) => <Day key={i} events={day} />);
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
      {days !== null ? renderDays() : renderFallback()}
    </div>
  );
};

export default Week;
