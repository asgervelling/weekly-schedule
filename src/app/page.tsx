"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { randomWeek } from "@/mockdata/event_data";
import { CalendarEvent } from "../../types";
import Schedule from "@/components/Schedule";


export default function Home() {
  const [days, setDays] = useState<CalendarEvent[][] | null>(null);

  useEffect(() => {
    updateDays();
  }, []);

  const updateDays = () => {
    const data = randomWeek();
    setDays(data);
  };

  return (
    <>
      {/* Layout: Three columns */}
      <div className="flex h-full gap-16">
        <div className="flex flex-col items-end justify-start w-1/5">
          <Button onClick={updateDays}>
            Click me!
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center w-3/5">
            <Schedule days={days} />
        </div>
        <div className="flex flex-col items-start justify-end w-1/5">
          <Button onClick={() => console.log("Hi")}>Button 2</Button>
        </div>
      </div>
    </>
  );
}