import React from 'react';


/**
 * Seven days of the week.
 * 
 * @param days - Seven lists of events.
 */
const WeekFallback: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[480px] overflow-y-auto">
      <div className='h-full w-full bg-red-500'>YES</div>
    </div>
  );
};

export default WeekFallback;
