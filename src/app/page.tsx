"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import { emptyWeek, insertDay, insertEvent } from "@/calendar/events";
import { ScheduleEvent, Week } from "../../types";
import WeeklySchedule from "@/components/WeeklySchedule";
import ScheduleEventForm from "@/components/ScheduleEventForm";
import { DayOfWeek } from "./enums";

const Home = () => {
  const [week, setWeek] = useState<Week>(emptyWeek());

  const addEvent = (e: ScheduleEvent, dayOfWeek: DayOfWeek) => {
    const day = insertEvent(e, week[0]);
    const newWeek = insertDay(day, dayOfWeek, week);
    setWeek(newWeek);
  };

  return (
    <>
      {/* Layout: Three columns */}
      <div className="flex h-full gap-16">
        <div className="flex flex-col items-end justify-start w-1/5">
          <ScheduleEventForm onSubmit={addEvent} />
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
