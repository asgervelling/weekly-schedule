import { pipe } from "fp-ts/function";
import { Week } from "../../types";
import { emptyWeek } from "./events";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import { Either } from "fp-ts/lib/Either";

/**
 * Try to parse a string as JSON.
 *
 * @param s A string that may or may not be JSON.
 * @returns Either an error or the parsed JSON.
 */
const parseJson: (s: string) => Either<Error, Week> = E.tryCatchK(
  JSON.parse,
  E.toError
);

/**
 * Get the week parameter from the query string.
 *
 * @param searchParams An object given to us by the router
 *                     representing the query string.
 * @returns An option containing the week parameter, or none if it is empty.
 */
const getWeekJson = (searchParams: {
  week: string | undefined;
}): O.Option<string> => {
  return pipe(
    searchParams.week,
    O.fromNullable,
    O.chain(O.fromPredicate((s) => s !== ""))
  );
};

/**
 * If there are search params, try to parse them as a Week.
 * If there are no search params, return an empty Week.
 */
export const getInitialWeek = (searchParams: {
  week: string | undefined;
}): Week => {
  return pipe(
    searchParams,
    getWeekJson,
    O.match(emptyWeek, (json) =>
      pipe(
        json,
        parseJson,
        E.getOrElse((error) => {
          console.error(`Error parsing week: ${error.message}`);
          return emptyWeek();
        })
      )
    )
  );
};
