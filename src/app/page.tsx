import { CalendarEvent } from "../../types";
import Day from "@/components/day";

export default function Home() {
  const events: CalendarEvent[] = [
    {
      title: "Meeting",
      colorHex: "#c7e9f1",
      start: "09:00",
      end: "10:30",
    },
    {
      title: "Write report",
      colorHex: "#e6e6fa",
      start: "10:30",
      end: "15:30",
    },
    {
      title: "Read book",
      colorHex: "#c8e6c9",
      start: "20:00",
      end: "20:30",
    }
  ];
  return (
    <>
      <Day n={48} events={events} verticalLayout={true} />
    </>
  );
}
