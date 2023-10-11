import Column from "@/components/column";
import { TimeTableEvent } from "../../types";

export default function Home() {
  const events: TimeTableEvent[] = [
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
      <Column n={48} events={events} />
    </>
  );
}
