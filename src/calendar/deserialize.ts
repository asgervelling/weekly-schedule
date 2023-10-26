import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import pako from "pako";

import { pipe } from "fp-ts/function";
import { Week } from "../types";
import { emptyWeek } from "./events";

/**
 * Decompress and deserialize the state of the application
 * from the URL's searchParams.
 *
 * @param searchParams An object given to us by the router
 *                     representing the query string.
 * @returns A Week object on success,
 *          or an empty Week object on failure.
 */
export const deserialize = (searchParams: {
  week: string | undefined;
}): Week =>
  pipe(
    searchParams,
    getWeekParam,
    O.match(
      () => emptyWeek(),
      (week) => decompressState(week)
    )
  );

/**
 * Get the week parameter from the query string.
 *
 * @param searchParams An object given to us by the router
 *                     representing the query string.
 * @returns An option containing the week parameter,
 *          or none if it is empty.
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
 * Previously called deserialize.
 * Decompress and deserialize the state of the application
 * from the URL's searchParams.
 *
 * @param searchParams An object given to us by the router
 *                     representing the query string.
 * @returns A Week object on success,
 *          or an empty object on failure.
 */
const decompressState = <T>(urlParams: string): T =>
  pipe(
    urlParams,
    decompress,
    E.chain(parseJson<T>),
    E.match(
      (error) => {
        console.log(error.message);
        return {} as T;
      },
      (week) => week
    )
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
 * Try to parse a string as JSON.
 *
 * @param s A string that may or may not be JSON.
 * @returns Either an error or the parsed JSON.
 */
const parseJson = <T>(json: string): E.Either<Error, T> =>
  E.tryCatch(() => JSON.parse(json), E.toError);
