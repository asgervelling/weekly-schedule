'use client';
import React, { useState, useEffect } from "react";
import Week from "./Week";
import { randomWeek } from "@/mockdata/event_data";
import { CalendarEvent } from "../../types";

const Schedule: React.FC = () => {
  const [weekData, setWeekData] = useState<CalendarEvent[][] | null>(null);

  useEffect(() => {
    setWeekData(randomWeek());
  }, []);

  const updateWeekData = () => {
    setWeekData(randomWeek());
  };

  return (
    <>
      <button onClick={updateWeekData}>
        Click me!
      </button>
      {weekData && <Week days={weekData} />}
    </>
  );
};

export default Schedule;
