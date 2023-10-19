import { pipe } from "fp-ts/function";
import { Week } from "../../types";
import { emptyWeek } from "./events";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import { Either } from "fp-ts/lib/Either";

/**
 * Get the query string from search parameters, if it exists.
 *
 * @param searchParams - An object containing the 'week' parameter.
 * @returns Either an error or the query string.
 */
function getURLParams(queryString: string): Either<Error, string> {
  return E.fromPredicate(
    (value) => typeof value === "string" && value !== "",
    () => new Error(`Invalid parameter in query string: ${queryString}`)
  )(queryString);
}

const parseJson: (s: string) => Either<Error, Week> = E.tryCatchK(
  JSON.parse,
  E.toError
);

const getQueryString = (searchParams: {
  week: string | undefined;
}): O.Option<string> => {
  return O.fromNullable(searchParams.week);
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
    getQueryString,
    O.match(emptyWeek, (s) =>
      pipe(
        s,
        getURLParams,
        E.chain(parseJson),
        E.getOrElse((error) => {
          console.error(`Error parsing week: ${error.message}`);
          return emptyWeek();
        })
      )
    )
  );
};
