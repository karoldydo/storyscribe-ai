/**
 * Logs an error message
 *
 * @param message message to log
 */
const logError = (message: string) => console.error(`\x1b[31m✖\x1b[0m  ${message}`);

/**
 * Logs an info message
 *
 * @param message message to log
 */
const logInfo = (message: string) => console.info(`\x1b[34m•\x1b[0m  ${message}`);

/**
 * Logs a success message
 *
 * @param message message to log
 */
const logSuccess = (message: string) => console.log(`\x1b[32m✔\x1b[0m  ${message}`);

export { logError, logInfo, logSuccess };
