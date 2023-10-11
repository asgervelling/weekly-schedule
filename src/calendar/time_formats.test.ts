import { timestampToIndex, indexToTimestamp } from "./time_formats";


describe('timestampToIndex', () => {
    it('should calculate the correct index for a given timestamp and number of time periods', () => {
        expect(timestampToIndex('01:30', 48)).toBe(3);
        expect(timestampToIndex('12:00', 24)).toBe(12);
        expect(timestampToIndex('00:00', 10)).toBe(0);
    });
});

describe('indexToTimestamp', () => {
    it('should create the correct timestamp for a given index and number of time periods', () => {
        expect(indexToTimestamp(3, 48)).toBe('01:30');
        expect(indexToTimestamp(12, 24)).toBe('12:00');
        expect(indexToTimestamp(0, 10)).toBe('00:00');
    });
});