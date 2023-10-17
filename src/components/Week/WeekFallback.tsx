import React from "react";
import WeekContainer from "./WeekContainer";


/**
 * Seven days of the week.
 * 
 * @param days - Seven lists of events.
 */
const WeekFallback: React.FC = () => {
  return (
    <WeekContainer>
      <div className="flex items-center justify-center w-full h-full">
        Loading...
      </div>
    </WeekContainer>
  );
};

export default WeekFallback;
