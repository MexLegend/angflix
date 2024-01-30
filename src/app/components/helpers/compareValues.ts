/**
 * Compares values of type string, number, boolean, or string[] and returns a number indicating their relative order.
 *
 * @param a - First value to compare.
 * @param b - Second value to compare.
 * @returns A number indicating the relative order between the two values. Returns 0 if the values are of incompatible types.
 */
export const compareValues = <
  T extends string | number | boolean | string[] | number[]
>(
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
    return compareArrayValues(a, b);
  }

  return 0;
};

const compareArrayValues = (
  a: string[] | number[],
  b: string[] | number[]
): number => {
  const minLength = Math.min(a.length, b.length);

  for (let i = 0; i < minLength; i++) {
    if (typeof a[i] === 'string' && typeof b[i] === 'string') {
      const stringComparison = (a[i] as string).localeCompare(b[i] as string);
      if (stringComparison !== 0) {
        return stringComparison;
      }
    } else if (typeof a[i] === 'number' && typeof b[i] === 'number') {
      const diff = Number(a[i]) - Number(b[i]);
      if (diff !== 0) {
        return diff;
      }
    }
    // If elements at the same position are equal, continue to the next
  }

  // If elements up to the minimum length are equal, the shorter array comes first
  return a.length - b.length;
};
