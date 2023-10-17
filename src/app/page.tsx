"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { ScheduleEvent, Week } from "../../types";
import WeeklySchedule from "@/components/WeeklySchedule";
import { randomWeek } from "@/mockdata/event_data";
import { emptyWeek } from "@/calendar/events";

const Home = () => {
  const [week, setWeek] = useState<Week>(emptyWeek());

  useEffect(() => {
    updateWeek();
  }, []);

  const updateWeek = () => {
    setWeek(randomWeek());
  };

  const addEvent = (e: ScheduleEvent) => {
    console.log(e);
  };

  return (
    <>
      {/* Layout: Three columns */}
      <div className="flex h-full gap-16">
        <div className="flex flex-col items-end justify-start w-1/5">
          <Button onClick={addEvent}>Click me!</Button>
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
};

export default Home;
