import React from 'react';


/**
 * Seven days of the week.
 * 
 * @param days - Seven lists of events.
 */
const WeekFallback: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full overflow-y-auto border border-black rounded">
      Loading...
    </div>
  );
};

export default WeekFallback;
