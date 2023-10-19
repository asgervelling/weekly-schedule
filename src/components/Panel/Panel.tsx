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
  onClick: (e: ScheduleEvent) => void;
};

/**
 * A panel in a day of the calendar.
 * Its height corresponds to the duration of the event.
 * @param event - The event to display.
 * @param parentHeight - The height of the parent.
 * @param onClick - The function to call when the panel is clicked.
 */
const Panel = ({ event, parentHeight, onClick }: PanelProps) => {
  return pipe(
    event,
    O.fromPredicate(isEmptyEvent),
    O.match(
      () => (
        <EventPanel
          event={event}
          parentHeight={parentHeight}
          onClick={onClick}
        />
      ),
      () => (
        <EmptyPanel
          event={event}
          parentHeight={parentHeight}
          onClick={onClick}
        />
      )
    )
  );
};

export default Panel;
