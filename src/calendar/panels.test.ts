import { ScheduleEvent } from "../../types";
import { panelHeight } from "./panels";


const e0: ScheduleEvent = {
  title: "",
  color: "",
  start: { h: 0, m: 0 },
  end: { h: 12, m: 0 },
};
const e1: ScheduleEvent = {
  title: "",
  color: "",
  start: { h: 0, m: 0 },
  end: { h: 5, m: 7 },
};
const e2: ScheduleEvent = {
  title: "",
  color: "",
  start: { h: 13, m: 57 },
  end: { h: 15, m: 6 },
};
const e3: ScheduleEvent = {
  title: "",
  color: "",
  start: { h: 22, m: 58 },
  end: { h: 23, m: 59 },
};

describe("panelHeight", () => {
  it("should get the height of a panel in pixels", () => {
    expect(panelHeight(e0, 100)).toBe(50);
    expect(panelHeight(e1, 100)).toBe(21);
    expect(panelHeight(e1, 200)).toBe(43);
    expect(panelHeight(e2, 1473)).toBe(71);
  });
});
