/**
 * Formats milliseconds to seconds
 *
 * @param value number in milliseconds
 * @returns Formatted time
 */
const toSeconds = (value: number) => `${(value / 1000).toFixed(2)}s`;

export { toSeconds };
