import { CalendarEvent } from "../../types";
import { panelHeight } from "./panels";


const e0: CalendarEvent = {
  title: '',
  colorHex: '',
  start: { h: 0, m: 0 },
  end: { h: 12, m: 0 },
};
const e1: CalendarEvent = {
  title: '',
  colorHex: '',
  start: { h: 0, m: 0 },
  end: { h: 5, m: 7 },
};

describe('panelHeight', () => {
  it('should get the height of a panel in pixels', () => {
    expect(panelHeight(e0, 100)).toBe(50);
    expect(panelHeight(e1, 100)).toBe(21);
  });
});