"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import {
  emptyWeek,
  insertDay,
  insertEvent,
  randomNoteColor,
} from "@/calendar/events";
import { ScheduleEvent, Week } from "../../types";
import WeeklySchedule from "@/components/WeeklySchedule";
import ScheduleEventForm from "@/components/ScheduleEventForm";
import { DayOfWeek } from "./enums";
import { serialize, deserialize, createUrlFromState } from "@/calendar/urls";

type HomeProps = {
  searchParams: {
    week: string | undefined;
  };
};

const Home = ({ searchParams }: HomeProps) => {
  const [week, setWeek] = useState<Week>(deserialize(searchParams));

  /**
   * Add an event to the week
   */
  const addEvent = (e: ScheduleEvent, d: DayOfWeek) => {
    const day = insertEvent(e, week[d]);
    const newWeek = insertDay(day, d, week);
    setWeek(newWeek);
  };

  /**
   * Pass this function down the UI tree
   */
  const onPanelClick = (e: ScheduleEvent, d: DayOfWeek) => {
    const event: ScheduleEvent = {
      ...e,
      title: "New title",
      color: randomNoteColor(),
    };
    addEvent(event, d);
  };

  /**
   * Get a URL with the current week as a parameter.
   * Copy it to the clipboard
   */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(createUrlFromState(week));
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
          <Button onClick={copyToClipboard}>Copy Link</Button>
        </div>
      </div>
    </>
  );
};

export default Home;
