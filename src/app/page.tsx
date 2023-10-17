"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { randomWeek } from "@/mockdata/event_data";
import { CalendarEvent } from "../../types";
import Schedule from "@/components/Schedule";
import FlexRow from "@/components/FlexRow";
import FlexCol from "@/components/FlexCol";

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
      <FlexRow className="gap-16 h-[8%]">
        <FlexCol className="items-end justify-start w-1/5" />
        <FlexCol className="items-center justify-center w-3/5">
          <div className="w-full grid grid-cols-7 text-center">
            <p className="col-span-1">Monday</p>
            <p className="col-span-1">Tuesday</p>
            <p className="col-span-1">Wednesday</p>
            <p className="col-span-1">Thursday</p>
            <p className="col-span-1">Friday</p>
            <p className="col-span-1">Saturday</p>
            <p className="col-span-1">Sunday</p>
          </div>
        </FlexCol>
        <FlexCol className="items-start justify-end w-1/5" />
      </FlexRow>
      <FlexRow className="gap-16 h-[92%]">
        <FlexCol className="items-end justify-start w-1/5">
          <Button onClick={updateDays}>Click me!</Button>
        </FlexCol>
        <FlexCol className="items-center justify-center w-3/5">
          <Schedule days={days} />
        </FlexCol>
        <FlexCol className="items-start justify-end w-1/5">
          <Button onClick={() => console.log("Hi")}>Button 2</Button>
        </FlexCol>
      </FlexRow>
    </>
  );
}
