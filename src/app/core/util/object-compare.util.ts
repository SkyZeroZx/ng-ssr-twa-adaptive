/**
 * The function `objectCompare` compares two objects by converting them to JSON strings and checking if
 * they are equal.
 * @param {object} objectBase - The `objectBase` parameter is the base object that you want to compare
 * with another object.
 * @param {object} objectToCompare - The object that you want to compare with the objectBase.
 * @returns a boolean value.
 */
export function objectCompare<T = object>(objectBase: T, objectToCompare: T): boolean {
	return (
		JSON.stringify(objectBase).split('').sort().join('') ===
		JSON.stringify(objectToCompare).split('').sort().join('')
	);
}
