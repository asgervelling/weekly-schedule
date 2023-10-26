import pako from "pako";
import { Week } from "../types";

/**
 * Serialize and compress the state of the application
 * to a URL that can be shared with others.
 */
export const serialize = (week: Week): string => {
  const url = new URL(window.location.href);
  url.searchParams.set("week", compressState(week));
  return url.toString();
};

/**
 * Compress an object to JSON, then compress it.
 */
const compressState = <T>(t: T): string => {
  return compress(JSON.stringify(t));
};

/**
 * Compress a string using gzip and then encode it in base64.
 */
const compress = (s: string): string =>
  Buffer.from(pako.gzip(s)).toString("base64");
