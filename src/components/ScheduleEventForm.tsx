import { ScheduleEvent } from "../types";
import React, { useState } from "react";
import Button from "./Button";
import { createEvent } from "@/calendar/events";
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
    <div className="bg-fill ps-10 rounded">
      <InputTextField title="Title" data={title} setData={setTitle} />
      <InputTextField title="Start" data={start} setData={setStart} />
      <InputTextField title="End" data={end} setData={setEnd} />
      <label className="block">
        Day:
        <br />
        <select
          value={dayOfWeek}
          onChange={(e) => {
            setDayOfWeek(parseInt(printRet(e.target.value)));
          }}
          className="border rounded px-2 py-1"
        >
          {getEnumKeys(DayOfWeek).map((key, index) => (
            <option key={index} value={DayOfWeek[key]}>
              {key}
            </option>
          ))}
        </select>
      </label>
      <br />
      <div className="flex flex-row-reverse">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

type InputField<A> = {
  title: string;
  data: A;
  setData: (data: A) => void;
};

// This doesn't work, syntax error
const InputTextField = ({
  title,
  data,
  setData,
}: InputField<string>) => {
  return (
    <label className="block">
      {title}:
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="w-full border rounded px-2 py-1"
      />
    </label>
  );
};

export default ScheduleEventForm;
