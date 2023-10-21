import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import pako from "pako";

import { pipe } from "fp-ts/function";
import { Week } from "../../types";
import { emptyWeek } from "./events";

/**
 * Serialize and compress the state of the application
 * to a URL that can be shared with others.
 */
export const exportState = (week: Week): string => {
  const url = new URL(window.location.href);
  url.searchParams.set("week", serialize(week));
  return url.toString();
};

/**
 * Decompress and deserialize the state of the application
 * from the URL's searchParams.
 *
 * @param searchParams An object given to us by the router
 *                     representing the query string.
 * @returns A Week object on success,
 *          or an empty Week object on failure.
 */
export const importState = (searchParams: { week: string | undefined }): Week =>
  pipe(
    searchParams,
    getWeekParam,
    O.match(
      () => emptyWeek(),
      (week) => parseWeek(week)
    )
  );

/**
 * Try to parse a string as JSON.
 *
 * @param s A string that may or may not be JSON.
 * @returns Either an error or the parsed JSON.
 */
const parseJson = (json: string): E.Either<Error, Week> =>
  E.tryCatch(() => JSON.parse(json), E.toError);

const compress = (s: string): string => {
  // Check example:
  // https://github.com/nodeca/pako/blob/master/examples/server.js
  const compressed = pako.gzip(s);
  const b64Encoded = Buffer.from(compressed).toString("base64");
  return b64Encoded;
};

const decompress = (s: string): E.Either<Error, string> =>
  // This function runs on the server
  // https://stackoverflow.com/a/69179527/12819647
  E.tryCatch(() => {
    const b64Encoded = Buffer.from(s, "base64");
    const decompressed = pako.ungzip(b64Encoded);
    const utf8Decoded = new TextDecoder().decode(decompressed);
    return utf8Decoded;
  }, E.toError);

/**
 * Get the week parameter from the query string.
 *
 * @param searchParams An object given to us by the router
 *                     representing the query string.
 * @returns An option containing the week parameter, or none if it is empty.
 */
const getWeekParam = (searchParams: {
  week: string | undefined;
}): O.Option<string> =>
  pipe(
    searchParams.week,
    O.fromNullable,
    O.chain(O.fromPredicate((s) => s !== ""))
  );

/**
 * Create a week from the non-empty week parameter
 * of the URL's searchParams.
 */
const parseWeek = (weekParam: string): Week =>
  pipe(
    weekParam,
    decompress,
    E.chain(parseJson),
    E.match(
      (error) => {
        console.log(error.message);
        return emptyWeek();
      },
      (week) => week
    )
  );

/**
 * Create a string from the state of the application
 */
const serialize = (week: Week): string => pipe(week, JSON.stringify, compress);
