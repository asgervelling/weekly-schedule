import { Day, ScheduleEvent, Week } from "../../types";
import { createEvent, eventEquals, insertDay, insertEvent, padEvents } from "./events";
import { formatTs, parseTs } from "./timestamps";
import { emptyEvent } from "./events";
import { DayOfWeek } from "../../src/app/enums";
import { act } from "react-dom/test-utils";





const printWeek = (week: Week) => {
  for (let i = 0; i < 7; i++) {
    console.log(DayOfWeek[i]);
    console.log(fmtDay(week[i]));
  }
}

const fmtDay = (day: Day) => {
  let s = "";
  for (let i = 0; i < day.length; i++) {
    s += fmtEvent(day[i]);
  }
  return s;
}

const fmtEvent = (event: ScheduleEvent) => {
  const f = formatTs;
  return `${f(event.start)} - ${f(event.end)} ${event.title}\n`;
}

const assertWeeksEqual = (actual: Week, expected: Week) => {
  for (let i = 0; i < 7; i++) {
    const actualDay = actual[i];
    const expectedDay = expected[i];
    for (const event of actualDay) {
      assertDaysEqual(actualDay, expectedDay);
    }
  }
}

const assertDaysEqual = (actual: Day, expected: Day) => {
  if (actual.length !== expected.length) {
    fail(`Expected ${expected.length} events, but got ${actual.length}`);
  }
  for (let i = 0; i < actual.length; i++) {
    const eActual = actual[i];
    const eExpected = expected[i];
    expect(eventEquals(eActual, eExpected)).toBe(true);
  }
}

describe("insertDay", () => {
  it("should insert a day into an empty week", () => {
    const day = [createEvent("A", "00:00", "01:00")];
    const week = [[], [], [], [], [], [], []];
    const expectedWeek = [[], day, [], [], [], [], []];
    assertWeeksEqual(insertDay(day, 1, week), expectedWeek);
  });
  it("should update a day with multiple events", () => {
    const alreadyThere = [createEvent("A", "00:00", "01:00")];
    const day = [
      createEvent("A", "00:00", "01:00"),
      createEvent("C", "17:00", "19:00"),
      createEvent("B", "10:00", "11:00"),
    ];
    const week = [[], [], [alreadyThere], [], [], [], []];
    const expectedWeek = [[], day, alreadyThere, [], [], [], []];
    const actualWeek = insertDay(day, 1, week);
    assertWeeksEqual(actualWeek, expectedWeek);
  });
});


describe("insertEvent", () => {
  it("Case: array is empty", () => {
    const e = emptyEvent("10:00", "11:00")
    assertDaysEqual(insertEvent(e, []), [e]);
    // expect(insertEvent(e, [])).toEqual([e]);
  });
  it("Case: e is before x", () => {
    const e = emptyEvent("10:00", "11:00")
    const x = emptyEvent("12:00", "13:00")
    assertDaysEqual(insertEvent(e, [x]), [e, x]);
  });
  it("Case: x contains e", () => {
    const e = emptyEvent("10:00", "11:00")
    const x = emptyEvent("09:00", "12:00")
    assertDaysEqual(insertEvent(e, [x]), [x]);
  });
  it("Case: e contains x", () => {
    const e = emptyEvent("10:00", "11:00")
    const x = emptyEvent("10:30", "10:45")
    assertDaysEqual(insertEvent(e, [x]), [e]);
  });
  it("Case: e pushes the start of x forward", () => {
    const e = emptyEvent("10:00", "11:00")
    const x = emptyEvent("10:30", "12:00")
    assertDaysEqual(insertEvent(e, [x]), [
      emptyEvent("10:00", "11:00"),
      emptyEvent("11:00", "12:00"),
    ]);
  });
  it("Case: e.start shortens x", () => {
    const e = emptyEvent("10:00", "11:00")
    const x = emptyEvent("09:00", "10:30")
    assertDaysEqual(insertEvent(e, [x]), [
      emptyEvent("09:00", "10:00"),
      emptyEvent("10:00", "11:00"),
    ]);
  });
  it("Case: e is inserted in the middle", () => {
    const e = emptyEvent("10:00", "11:00")
    const x = emptyEvent("09:00", "10:00")
    const y = emptyEvent("11:00", "12:00")
    assertDaysEqual(insertEvent(e, [x, y]), [
      emptyEvent("09:00", "10:00"),
      emptyEvent("10:00", "11:00"),
      emptyEvent("11:00", "12:00"),
    ]);
  });
  it("Case: e is inserted in the middle, and x is overwritten", () => {
    const e = emptyEvent("10:00", "11:00")
    const x = emptyEvent("09:00", "11:00")
    const y = emptyEvent("11:00", "12:00")
    assertDaysEqual(insertEvent(e, [x, y]), [
      emptyEvent("09:00", "10:00"),
      emptyEvent("10:00", "11:00"),
      emptyEvent("11:00", "12:00"),
    ]);
  });
  it("Case: e is inserted in the middle, and y is overwritten", () => {
    const e = emptyEvent("10:00", "11:00")
    const x = emptyEvent("09:00", "10:00")
    const y = emptyEvent("10:30", "12:00")
    assertDaysEqual(insertEvent(e, [x, y]), [
      emptyEvent("09:00", "10:00"),
      emptyEvent("10:00", "11:00"),
      emptyEvent("11:00", "12:00"),
    ]);
  });
  // HELLO: Above this line has already been refactored
  it("Case: e is inserted in the middle, and x and y are overwritten", () => {
    const e = emptyEvent("10:00", "11:00")
    const x = emptyEvent("09:00", "11:00")
    const y = emptyEvent("10:30", "12:00")
    assertDaysEqual(insertEvent(e, [x, y]), [
      emptyEvent("09:00", "10:00"),
      emptyEvent("10:00", "11:00"),
      emptyEvent("11:00", "12:00"),
    ]);
  });
  it("Case: e is inserted after x", () => {
    const e = createEvent("e", "10:00", "11:00");
    const x = createEvent("x", "08:00", "09:00");
    assertDaysEqual(insertEvent(e, [x]), [
      createEvent("x", "08:00", "09:00"),
      createEvent("e", "10:00", "11:00"),
    ]);
  });
  it("Case: e is inserted after x and y, shortening y", () => {
    const e = createEvent("e", "10:00", "11:00");
    const x = createEvent("x", "08:00", "09:00");
    const y = createEvent("y", "09:30", "10:30");
    assertDaysEqual(insertEvent(e, [x, y]), [
      createEvent("x", "08:00", "09:00"),
      createEvent("y", "09:30", "10:00"),
      createEvent("e", "10:00", "11:00"),
    ]);
  });
  it("Case: e is inserted between x and y, pushing y", () => {
    const e = createEvent("e", "10:00", "11:00");
    const x = createEvent("x", "08:00", "09:00");
    const y = createEvent("y", "10:30", "11:30");
    assertDaysEqual(insertEvent(e, [x, y]), [
      createEvent("x", "08:00", "09:00"),
      createEvent("e", "10:00", "11:00"),
      createEvent("y", "11:00", "11:30"),
    ]);
  });
  it("Case: e is inserted after x, overwriting y", () => {
    const e = createEvent("e", "10:00", "11:00");
    const x = createEvent("x", "09:00", "10:00");
    const y = createEvent("y", "10:00", "11:00");
    assertDaysEqual(insertEvent(e, [x, y]), [
      createEvent("x", "09:00", "10:00"),
      createEvent("e", "10:00", "11:00"),
    ]);
  });
  it("Should be inserted after x", () => {
    const e = createEvent("e", "14:00", "16:00");
    const x = createEvent("x", "10:00", "12:00");
    assertDaysEqual(insertEvent(e, [x]), [
      createEvent("x", "10:00", "12:00"),
      createEvent("e", "14:00", "16:00"),
    ]);
  });
  it("Should delete more than one event", () => {
    const e = createEvent("e", "4:15", "6:00");
    const x = createEvent("x", "04:00", "04:30");
    const y = createEvent("y", "04:30", "05:00");
    const z = createEvent("z", "05:00", "05:30");
    assertDaysEqual(insertEvent(e, [x, y, z]), [
      createEvent("x", "04:00", "04:15"),
      createEvent("e", "04:15", "06:00"),
    ]);
  });
});

const testEvents: Day = [
  createEvent("A", "00:00", "01:00"),
  createEvent("B", "10:00", "11:00"),
  createEvent("C", "17:00", "19:00"),
];

describe("padEvents", () => {
  it("should create an array with events from 00:00 till 23:59", () => {
    const empty_event = padEvents(testEvents)[1];
    expect(empty_event.start).toEqual(parseTs("01:00"));
    // Empty events are 30 minutes long
    expect(empty_event.end).toEqual(parseTs("01:30"));
    expect(empty_event.title).toEqual("");

    const event_b = padEvents(testEvents)[19];
    expect(event_b.start).toEqual(parseTs("10:00"));
    expect(event_b.end).toEqual(parseTs("11:00"));
    expect(event_b.title).toEqual("B");

    const event_c = padEvents(testEvents)[20];
    expect(event_c).toEqual(emptyEvent("11:00", "11:30"));
  })
})