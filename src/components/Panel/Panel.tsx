import React from "react";
import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";

import { CalendarEvent } from "../../../types";
import { isEmptyEvent } from "@/calendar/events";
import EventPanel from "./EventPanel";
import EmptyPanel from "./EmptyPanel";


export type PanelProps = {
  event: CalendarEvent;
  dayHeight: number;
};


/**
 * A panel in a day of the calendar.
 * Its height corresponds to the duration of the event.
 * @param event - The event to display.
 * @param dayHeight - The height of the Day component.
 */
const Panel: React.FC<PanelProps> = ({ event, dayHeight }) => {
  return pipe(
    event,
    O.fromPredicate(isEmptyEvent),
    O.match(
      () => <EventPanel event={event} dayHeight={dayHeight} />,
      () => <EmptyPanel event={event} dayHeight={dayHeight} />
    )
  );
}

export default Panel;
