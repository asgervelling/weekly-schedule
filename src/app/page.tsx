"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { CalendarEvent } from "../../types";
import { parseTs } from "@/calendar/timestamps";
import Week from "@/components/Week";

export default function Home() {
  const [days, setDays] = useState<CalendarEvent[][] | null>(null);

  useEffect(() => {
    updateDays();
  }, []);

  const updateDays = () => {
    // const data = randomWeek();
    // setDays(data);
    const event: CalendarEvent = {
      title: "Test",
      color: "teal",
      start: parseTs("05:00"),
      end: parseTs("07:51"),
    };
    setDays([[], [], [], [event], [], [], []]);
  };

  return (
    <>
      {/* Layout: Three columns */}
      <div className="flex h-full gap-16">
        <div className="flex flex-col items-end justify-start w-1/5">
          <Button onClick={updateDays}>Click me!</Button>
        </div>
        <div className="flex flex-col items-center justify-center w-3/5">
          <Week days={days} />
        </div>
        <div className="flex flex-col items-start justify-end w-1/5">
          <Button onClick={() => console.log("Hi")}>Button 2</Button>
        </div>
      </div>
    </>
  );
}
