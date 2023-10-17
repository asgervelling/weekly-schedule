import { ScheduleEvent } from "../../types";
import { tsToMinutes } from "./timestamps";


/**
 * Get the height of a panel in pixels
 * @param e The event to get the height of
 * @param parentHeight The height of the day in pixels
 */
export const panelHeight = (e: ScheduleEvent, parentHeight: number): number => {
  const me = tsToMinutes(e.end) - tsToMinutes(e.start);
  const md = 24 * 60;
  return Math.round(me / md * parentHeight);
};
