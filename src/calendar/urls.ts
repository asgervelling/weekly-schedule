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
const parseJson = (json: string): E.Either<Error, Week> =>
  E.tryCatch(() => JSON.parse(json), E.toError);

// Check example:
// https://github.com/nodeca/pako/blob/master/examples/server.js
// const compress = (s: string): Uint8Array => pako.deflate(s);
const compress = (s: string): string => {
  // This function runs on the client
  const compressed = pako.gzip(s);
  const b64Encoded = Buffer.from(compressed).toString("base64");
  return b64Encoded;
};

// const decompress = (c: Uint8Array): string =>
//   pako.inflate(c, { to: "string" }).toString();

const decompress = (s: string): E.Either<Error, string> => {
  // This function runs on the server
  // https://stackoverflow.com/a/69179527/12819647
  return E.tryCatch(() => {
    const b64Encoded = Buffer.from(s, "base64");
    const decompressed = pako.ungzip(b64Encoded);
    const utf8Decoded = new TextDecoder().decode(decompressed);
    return utf8Decoded;
  }, E.toError);
};

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
 * Get everything after ?week= in the URL,
 * or none if it is empty.
 */
const getWeekParam = (searchParams: {
  week: string | undefined;
}): E.Either<Error, string> =>
  pipe(
    searchParams.week,
    E.fromNullable(new Error("Week parameter is missing")),
    E.chain(
      E.fromPredicate(
        (s) => s !== "",
        () => new Error("Week parameter is empty")
      )
    )
  );

const getWeekParamOpt = (searchParams: {
  week: string | undefined;
}): O.Option<string> =>
  pipe(
    searchParams.week,
    O.fromNullable,
    O.chain(O.fromPredicate((s) => s !== ""))
  );

const urlDecode = (s: string): E.Either<Error, string> => {
  console.log("before urlDecode", s);
  const x = E.tryCatch(() => pr(decodeURIComponent(s), "s"), E.toError);
  console.log("after urlDecode", x);
  return x;
};

/** Take a type A (general), print it and return it */
const pr = <A>(a: A, name: string): A => {
  console.log(name, a);
  return a;
};

export const getStateFromUrl = (searchParams: {
  week: string | undefined;
}): Week => {
  const o = O.fromEither(getWeekParam(searchParams));
  return O.match(
    () => emptyWeek(),
    (week) => week as Week
  )(o);
};

export const createUrlFromState = (week: Week): string => {
  const url = new URL(window.location.href);
  url.searchParams.set("week", serialize(week));
  return url.toString();
};

/**
 * Load the state of the application from the URL's searchParams.
 *
 * @param searchParams An object given to us by the router
 * @returns The state of the application, or an empty week if the URL is invalid.
 */
export const deserialize = (searchParams: {
  week: string | undefined;
}): Week => {
  return pipe(
    searchParams,
    getWeekParam,
    E.chain(decompress),
    E.chain(parseJson),
    E.match(
      (error) => {
        console.error(`Error parsing week: ${error}`);
        return emptyWeek();
      },
      (week) => week
    )
  );
};

/**
 * Create a string from the state of the application
 */
export const serialize = (week: Week): string => {
  return pipe(week, JSON.stringify, compress);
};
