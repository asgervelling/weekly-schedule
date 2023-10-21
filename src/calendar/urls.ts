import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import pako from "pako";

import { pipe } from "fp-ts/function";
import { Week } from "../../types";
import { emptyWeek } from "./events";

/**
 * Try to parse a string as JSON.
 *
 * @param s A string that may or may not be JSON.
 * @returns Either an error or the parsed JSON.
 */
const parseJson = (json: O.Option<string>): E.Either<Error, Week> =>
  pipe(
    json,
    O.fold(
      () => E.right(emptyWeek()), // If the option is None
      (jsonStr) => E.tryCatch(() => JSON.parse(jsonStr), E.toError)
    )
  );

// Check example:
// https://github.com/nodeca/pako/blob/master/examples/server.js
const compress = (s: string): Uint8Array => pako.deflate(JSON.stringify(s));

const decompress = (c: Uint8Array): string =>
  pako.inflate(c, { to: "string" }).toString();

/**
 * Get the week parameter from the query string.
 *
 * @param searchParams An object given to us by the router
 *                     representing the query string.
 * @returns An option containing the week parameter, or none if it is empty.
 */
const getWeekJson = (searchParams: {
  week: string | undefined;
}): O.Option<string> =>
  pipe(
    searchParams.week,
    O.fromNullable,
    O.chain(O.fromPredicate((s) => s !== ""))
  );

/**
 * Load the state of the application from the URL's searchParams.
 *
 * @param searchParams An object given to us by the router
 * @returns The state of the application, or an empty week if the URL is invalid.
 */
export const deserialize = (searchParams: { week: string | undefined }): Week =>
  pipe(
    searchParams,
    getWeekJson,
    parseJson,
    E.getOrElse((error) => {
      console.error(`Error parsing week: ${error.message}`);
      return emptyWeek();
    })
  );

/**
 * Create a string from the state of the application
 */
export const serialize = (week: Week): string => JSON.stringify(week);
