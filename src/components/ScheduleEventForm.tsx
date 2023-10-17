import { ScheduleEvent } from "../../types";
import { maxTs, minTs, parseTs } from "@/calendar/timestamps";
import React, { useState } from "react";
import Button from "./Button";
import { createEvent, randomNoteColor } from "@/calendar/events";
import { DayOfWeek, getEnumKeys } from "@/app/enums";

type ScheduleEventFormProps = {
  onSubmit: (event: ScheduleEvent, dayOfWeek: DayOfWeek) => void;
};

const ScheduleEventForm = ({ onSubmit }: ScheduleEventFormProps) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState(0);

  const handleSubmit = () => {
    const event = createEvent(title, start, end);
    onSubmit(event, dayOfWeek);
  };

  const printRet = (ret: any) => {
    console.log(ret);
    return ret;
  };

  return (
    <div className="bg-fill p-4 rounded">
      <label className="block">
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </label>
      <label className="block">
        Start:
        <input
          type="text"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </label>
      <label className="block">
        End:
        <input
          type="text"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </label>
      <select
        value={dayOfWeek}
        onChange={(e) => {
          setDayOfWeek(parseInt(printRet(e.target.value)));
        }}
      >
        {getEnumKeys(DayOfWeek).map((key, index) => (
          <option key={index} value={DayOfWeek[key]}>
            {key}
          </option>
        ))}
      </select>
      <br />
      <div className="flex flex-row-reverse">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default ScheduleEventForm;
