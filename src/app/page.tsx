import { CalendarEvent } from '../../types';
import Day from '@/components/Day';

export default function Home() {
  const events: CalendarEvent[] = [
    {
      title: 'Meeting',
      colorHex: '#79addc',
      start: '09:00',
      end: '10:30',
    },
    {
      title: 'Write report',
      colorHex: '#ffc09f',
      start: '10:30',
      end: '15:30',
    },
    {
      title: 'Read book',
      colorHex: '#adf8b6',
      start: '20:00',
      end: '20:30',
    }
  ];
  return (
    <>
      <Day n={24} events={events} />
    </>
  );
}
