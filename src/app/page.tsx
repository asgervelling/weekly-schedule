import Day from '@/components/Day';
import Week from '@/components/Week';
import { randomWeek, randomDay } from '@/mockdata/event_data';
import { CalendarEvent } from '../../types';
import { parseTs } from '@/calendar/timestamps';


export default function Home() {
  const events: CalendarEvent[] = [
    {
      title: 'Event 0',
      colorHex: '#abcdef',
      start: parseTs('03:00'),
      end: parseTs('04:30'),
    },
    {
      title: 'Event 1',
      colorHex: '#127f93',
      start: parseTs('05:00'),
      end: parseTs('05:17'),
    },
    {
      title: 'Event 2',
      colorHex: '#929899',
      start: parseTs('15:51'),
      end: parseTs('23:08'),
    }
  ];
  return <Day events={events} />;
}
