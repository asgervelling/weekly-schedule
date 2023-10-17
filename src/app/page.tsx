'use client';
import React, { useState, useEffect, Suspense } from "react";
import Week from "@/components/Week";
import WeekFallback from "@/components/WeekFallback";
import Button from "@/components/Button";
import { randomWeek } from "@/mockdata/event_data";
import { CalendarEvent } from "../../types";


export default function Home() {
  const [weekData, setWeekData] = useState<CalendarEvent[][] | null>(null);

  useEffect(() => {
    updateWeekData();
  }, []);

  const updateWeekData = () => {
    const data = randomWeek();
    setWeekData(data);
  };

  return (
    <>
      <div className='flex h-full gap-16'>
        <div className='flex flex-col items-end justify-start w-1/5'>
          <Button onClick={updateWeekData}>
            Click me!
          </Button>
        </div>
        <div className='flex flex-col items-center justify-center w-3/5'>
            {weekData !== null
              ? <Week days={weekData} />
              : <WeekFallback />}
        </div>
        <div className='flex flex-col items-start justify-end w-1/5'>
          <button>Button 2</button>
        </div>
      </div>
    </>
  );
}