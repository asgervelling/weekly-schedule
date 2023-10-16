import Day from '@/components/Day';
import Week from '@/components/Week';
import { randomWeek, randomDay } from '@/mockdata/event_data';


export default function Home() {
  return <Day events={randomDay()} />;
}
