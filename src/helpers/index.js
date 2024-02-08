export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
}

/**
 * Checks if the contents of two arrays are equal.
 * @param {Array} arr1 - The first array to compare.
 * @param {Array} arr2 - The second array to compare.
 * @returns {boolean} Whether the arrays have equal contents.
 */
export function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const str1 = arr1.toString();
  const str2 = arr2.toString();

  return str1 === str2;
}

/**
 * Checks if two arrays of string values have the same elements, considering both content and order.
 * @param {Array} arr1 - The first array to compare.
 * @param {Array} arr2 - The second array to compare.
 * @returns {boolean} Whether the arrays have equal string values in the same order.
 */
export function arraysHaveEqualElements(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedStr1 = arr1.slice().sort().toString();
  const sortedStr2 = arr2.slice().sort().toString();

  return sortedStr1 === sortedStr2;
}
