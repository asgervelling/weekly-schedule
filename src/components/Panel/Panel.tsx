import React from "react";
import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";

import { ScheduleEvent } from "../../../types";
import { isEmptyEvent } from "@/calendar/events";
import EventPanel from "./EventPanel";
import EmptyPanel from "./EmptyPanel";

export type PanelProps = {
  event: ScheduleEvent;
  parentHeight: number;
};

/**
 * A panel in a day of the calendar.
 * Its height corresponds to the duration of the event.
 * @param event - The event to display.
 * @param parentHeight - The height of the parent.
 */
const Panel = ({ event, parentHeight }: PanelProps) => {
  return pipe(
    event,
    O.fromPredicate(isEmptyEvent),
    O.match(
      () => <EventPanel event={event} parentHeight={parentHeight} />,
      () => <EmptyPanel event={event} parentHeight={parentHeight} />
    )
  );
};

export default Panel;
