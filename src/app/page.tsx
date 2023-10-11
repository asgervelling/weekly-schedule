import Calendar from "@/components/calendar";
import Row from "@/components/row";
import Grid from "@/components/row";

export default function Home() {
  const colors = ["#FFC107", "#2196F3", "#4CAF50"];
  return (
    <>
      <Row n={3} colors={colors} />
    </>
  );
}
