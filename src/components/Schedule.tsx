'use client';
import React, { useState, useEffect, Suspense } from "react";
import Week from "@/components/Week";
import WeekFallback from "./WeekFallback";
import Button from "@/components/Button";
import { randomWeek } from "@/mockdata/event_data";
import { CalendarEvent } from "../../types";

const Schedule: React.FC = () => {
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
      <Button onClick={updateWeekData}>
        Click me!
      </Button>
      {weekData !== null
        ? <Week days={weekData} />
        : <WeekFallback />}
    </>
  );
}

export default Schedule;
