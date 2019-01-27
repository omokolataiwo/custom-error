/**
 * CustomError extends the basic functionalities of Error with various server code errors.
 * It is meant to be thrown with a string or JSON object as message.
 * Servers errors are hiden under cause property of the object.
 */
export class CustomError extends Error {
  /**
   *Creates an instance of CustomError.
   *
   * @param {number} [code=500] - Response error code
   * @param {string | object} message - Response message
   * @param {*} args - Variable length of argument
   * @memberof CustomError
   */
  constructor(code = 500, message, ...args) {
    super(args);
    // must have a valid message
    if (!this.isStringOrJSON(message) && !(code >= 500)) {
      throw new Error('Error message not provided.');
    }
    if (this.isInvalidErrorCode(code)) {
      throw new Error('Invalid error code provided.');
    }
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.message = message;
    this.code = code;
    this.date = new Date();
    // Do not expose the main cause of server error to the public for security reasons
    if (this.isServerError(code)) {
      this.cause = this.message;
      this.message = 'Internal Server Error.';
    }
  }
  /**
   * Checks is error code is a valid server response code
   *
   * @param {number} code - Server error code
   * @returns {boolean}
   * @memberof CustomError
   */
  isInvalidErrorCode(code) {
    const errorCodes = [400, 401, 402, 403, 404, 500, 501];
    return !errorCodes.includes(code);
  }
  /**
   * Check if code is server caused error.
   *
   * @param {*} code - Server response code
   * @returns {boolean}
   * @memberof CustomError
   */
  isServerError(code) {
    return [500, 501].includes(code);
  }
  /**
   * Check if error message is a type of string or JSON object
   *
   * @param {*} message - Error response message
   * @returns {boolean}
   * @memberof CustomError
   */
  isStringOrJSON(message) {
    return (
      (typeof message === 'string' && message.trim().length !== 0) ||
      Object.prototype.toString.call(message) === '[object Object]'
    );
  }
}
