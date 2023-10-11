import Column from "@/components/column";
import { TimeTableEvent } from "../../types";

export default function Home() {
  const events: TimeTableEvent[] = [
    {
      title: "Meeting",
      colorHex: "#FFC107",
      start: "09:00",
      end: "10:30",
    },
    {
      title: "Write report",
      colorHex: "#2196F3",
      start: "10:30",
      end: "15:30",
    },
    {
      title: "Read book",
      colorHex: "#4CAF50",
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
