import { ScheduleEvent } from "../types";
import { tsToMinutes } from "./timestamps";

/**
 * Get the height of a panel in pixels
 * @param e The event to get the height of
 * @param parentHeight The height of the day in pixels
 */
export const panelHeight = (
  e: ScheduleEvent,
  parentHeight: number
): number => {
  const me = tsToMinutes(e.end) - tsToMinutes(e.start);
  const md = 24 * 60;
  return Math.round((me / md) * parentHeight);
};

/**
 * Get the top offset of a panel in pixels
 */
export const panelTop = (
  e: ScheduleEvent,
  parentHeight: number
): number => {
  const ms = tsToMinutes(e.start);
  const md = 24 * 60;
  return Math.round((ms / md) * parentHeight);
};
