import { ScheduleEvent } from "../../types";
import { parseTs } from "@/calendar/timestamps";
import React, { useState } from "react";
import Button from "./Button";
import { randomNoteColor } from "@/calendar/events";

type ScheduleEventFormProps = {
  onSubmit: (event: ScheduleEvent) => void;
};

const ScheduleEventForm = ({ onSubmit }: ScheduleEventFormProps) => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = () => {
    const event: ScheduleEvent = {
      title,
      color: randomNoteColor(),
      start: parseTs(start),
      end: parseTs(end),
    };
    onSubmit(event);
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
      <br />
      <div className="flex flex-row-reverse">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default ScheduleEventForm;
