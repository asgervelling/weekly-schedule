import Week from '@/components/Week';
import { CalendarEvent } from '../../types';
import { randomWeek } from '@/mockdata/event_data';


export default function Home() {
  return <Week n={48} events={randomWeek()} />;
}
