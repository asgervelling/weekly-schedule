// https://stackoverflow.com/a/72883012/12819647
export const getEnumKeys = <T extends string>(enumVariable: { [key in T]: string | number }) => {
  return Object.keys(enumVariable).filter((key) => isNaN(Number(key))) as Array<T>;
};

export enum DayOfWeek {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6,
}
