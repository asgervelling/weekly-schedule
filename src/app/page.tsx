"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import { emptyWeek, insertDay, insertEvent } from "@/calendar/events";
import { ScheduleEvent, Week } from "../../types";
import WeeklySchedule from "@/components/WeeklySchedule";
import ScheduleEventForm from "@/components/ScheduleEventForm";
import { DayOfWeek } from "./enums";
import { formatTs } from "@/calendar/timestamps";

const Home = () => {
  // week[Monday] = [event1, event2, ...]
  const [week, setWeek] = useState<Week>(emptyWeek());

  const addEvent = (e: ScheduleEvent, dayOfWeek: DayOfWeek) => {
    const day = insertEvent(e, week[dayOfWeek]);
    const newWeek = insertDay(day, dayOfWeek, week);
    setWeek(newWeek);
  };

  const onPanelClick = (e: ScheduleEvent) => {
    const f = formatTs;
    console.log(
      `Parent received event: ${f(e.start)} - ${f(e.end)} ${e.title}\n`
    );
    // Todo: get day of week, addEvent()
  };

  return (
    <>
      <div className="flex h-full gap-16">
        <div className="flex flex-col items-end justify-start w-1/5">
          <ScheduleEventForm onSubmit={addEvent} />
        </div>
        <div className="flex flex-col items-center justify-center w-3/5">
          <WeeklySchedule week={week} onPanelClick={onPanelClick} />
        </div>
        <div className="flex flex-col items-start justify-end w-1/5">
          <Button onClick={() => console.log("Hi")}>Button 2</Button>
        </div>
      </div>
    </>
  );
};

export default Home;
