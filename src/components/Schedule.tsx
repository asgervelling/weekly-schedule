'use client';
import React, { useState, useEffect } from "react";
import Week from "./Week";
import { randomWeek } from "@/mockdata/event_data";
import { CalendarEvent } from "../../types";
import Button from "./Button";

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
      <Button onClick={updateWeekData}>
        Click me!
      </Button>
      {weekData && <Week days={weekData} />}
    </>
  );
};

export default Schedule;
