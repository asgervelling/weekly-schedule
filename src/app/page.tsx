"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { ScheduleEvent, Week } from "../../types";
import { addTimestamps, parseTs } from "@/calendar/timestamps";
import WeeklySchedule from "@/components/WeeklySchedule";
import { randomOffset, randomWeek } from "@/mockdata/event_data";
import { insertEvent } from "@/calendar/events";

export default function Home() {
  const [week, setWeek] = useState<Week | null>(null);

  useEffect(() => {
    updateWeek();
  }, []);

  const updateWeek = () => {
    setWeek(randomWeek());
  };

  return (
    <>
      {/* Layout: Three columns */}
      <div className="flex h-full gap-16">
        <div className="flex flex-col items-end justify-start w-1/5">
          <Button onClick={updateWeek}>Click me!</Button>
        </div>
        <div className="flex flex-col items-center justify-center w-3/5">
          <WeeklySchedule week={week} />
        </div>
        <div className="flex flex-col items-start justify-end w-1/5">
          <Button onClick={() => console.log("Hi")}>Button 2</Button>
        </div>
      </div>
    </>
  );
}
