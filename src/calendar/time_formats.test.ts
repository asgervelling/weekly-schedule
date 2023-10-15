import {
  timestampToIndex,
  indexToTimestamp,
  addTimestamps,
} from "./time_formats";


describe('timestampToIndex', () => {
  it('should calculate the correct index for a given timestamp and number of time periods', () => {
    expect(timestampToIndex('01:30', 48)).toBe(3);
    expect(timestampToIndex('12:00', 24)).toBe(12);
    expect(timestampToIndex('00:00', 10)).toBe(0);
    expect(timestampToIndex('01:12', 120)).toBe(6);
    expect(timestampToIndex('00:01', 1440)).toBe(1);
    expect(timestampToIndex('23:59', 1440)).toBe(1439);
    expect(timestampToIndex('00:03', 480)).toBe(1);
    expect(timestampToIndex('12:03', 480)).toBe(241);
  });
});

describe('indexToTimestamp', () => {
  it('should create the correct timestamp for a given index and number of time periods', () => {
    expect(indexToTimestamp(3, 48)).toBe('01:30');
    expect(indexToTimestamp(12, 24)).toBe('12:00');
    expect(indexToTimestamp(0, 10)).toBe('00:00');
    expect(indexToTimestamp(6, 120)).toBe('01:12');
    expect(indexToTimestamp(1, 1440)).toBe('00:01');
    expect(indexToTimestamp(1439, 1440)).toBe('23:59');
    expect(indexToTimestamp(1, 480)).toBe('00:03');
    expect(indexToTimestamp(241, 480)).toBe('12:03');
  });
});

describe('addTimestamps', () => {
  it('should add two timestamps together', () => {
    expect(addTimestamps('10:00', '7:15')).toBe('17:15');
    expect(addTimestamps('10:00', '-7:15')).toBe('02:45');
    expect(addTimestamps('10:00', '0:00')).toBe('10:00');
    expect(addTimestamps('10:00', '0:01')).toBe('10:01');
    expect(addTimestamps('10:00', '00:59')).toBe('10:59');
    expect(addTimestamps('23:59', '0:01')).toBe('24:00');
  })
});