/**
 * Custom query stringy and parse handler. Used primarily to handle array attributes on top of the default underlying implementation
 */
import { parse, stringify } from 'query-string';
import { cloneDeep, isArray } from 'lodash-es';

import { isBlank, isNumber } from './formatting.utils';

const SEPARATOR = ',';

function checkAndConvertToNumericValue(value) {
  // Check and convert numeric string values to numbers
  return isNumber(value) ? parseFloat(value) : value;
}

export function parseQuery(url) {

  const parsed = parse(url);

  for (let parameter in parsed) {
    if (parsed[parameter] !== undefined && parsed[parameter] !== null) {

      if (typeof parsed[parameter] === "string" && parsed[parameter].includes(SEPARATOR)) {
        // Split comma separated values and return array values
        parsed[parameter] = parsed[parameter].split(SEPARATOR);

        for (let key in parsed[parameter]) {
          parsed[parameter][key] = checkAndConvertToNumericValue(parsed[parameter][key]);
        }

      } else {
        parsed[parameter] = checkAndConvertToNumericValue(parsed[parameter]);
      }
    }
  }

  return parsed;
}

export function stringifyQuery(parameters) {

  const copy = cloneDeep(parameters);

  for (let parameter in copy) {
    // Exclude blank fields and primereact components markers
    if (isBlank(copy[parameter]) || parameter === '_$visited') {
      delete copy[parameter];

    } else if (isArray(copy[parameter])) {
      copy[parameter] = copy[parameter].join(SEPARATOR);
    }
  }

  return stringify(copy, { encode: false });
}
