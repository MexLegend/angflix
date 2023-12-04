/**
 * Compares values of type string, number, boolean, or string[] and returns a number indicating their relative order.
 *
 * @param a - First value to compare.
 * @param b - Second value to compare.
 * @returns A number indicating the relative order between the two values. Returns 0 if the values are of incompatible types.
 */
export const compareValues = <T extends string | number | boolean | string[]>(
  a: T,
  b: T
): number => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  }

  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return Number(a) - Number(b);
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    const aString = a.join('');
    const bString = b.join('');
    return aString.localeCompare(bString);
  }

  return 0;
};
