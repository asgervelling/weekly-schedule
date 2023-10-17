"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { Day, ScheduleEvent, Week } from "../../types";
import WeeklySchedule from "@/components/WeeklySchedule";
import { randomWeek } from "@/mockdata/event_data";
import { emptyWeek, insertEvent, padEvents } from "@/calendar/events";
import ScheduleEventForm from "@/components/ScheduleEventForm";

const Home = () => {
  const [week, setWeek] = useState<Week>(emptyWeek());

  const addEvent = (e: ScheduleEvent) => {
    // Insert an event into an array of events, using an opinionated algorithm.
    const day: Day = insertEvent(e, week[0]);

    // Insert the day into the week, creating a new Week overwriting the old one.
    const newWeek: Week = [day, ...week.slice(1)];

    // Update the state with the new week.
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
