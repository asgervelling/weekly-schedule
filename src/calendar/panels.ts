import { CalendarEvent } from "../../types";
import { tsToMinutes } from "./timestamps";


/**
 * Get the height of a panel in pixels
 * @param e The event to get the height of
 * @param dayHeight The height of the day in pixels
 */
export const panelHeight = (e: CalendarEvent, dayHeight: number): number => {
  const me = tsToMinutes(e.end) - tsToMinutes(e.start);
  const md = 24 * 60;
  return Math.round(me / md * dayHeight);
};


/**
 * Get the top position of a panel in pixels
 * @param e The event to get the top position of
 * @param dayHeight The height of the day in pixels
 */
export const panelTop = (e: CalendarEvent, dayHeight: number): number => {
  return Math.round(tsToMinutes(e.start) / (24 * 60) * dayHeight);
};