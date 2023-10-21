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

/**
 * Compress a string using gzip and then encode it as base64.
 */
const compress = (s: string): string =>
  pipe(s, pako.gzip, (compressed) =>
    Buffer.from(compressed).toString("base64")
  );

/**
 * Decode a base64 string and then decompress it using gzip.
 */
const decompress = (s: string): E.Either<Error, string> =>
  E.tryCatch(() => {
    return pipe(
      s,
      (s) => Buffer.from(s, "base64"),
      pako.ungzip,
      (s) => new TextDecoder().decode(s)
    );
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
