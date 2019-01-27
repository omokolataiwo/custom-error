import { ServerResponse } from 'http';
import { CustomError } from './CustomError';

export default class ErrorHandler {
  constructor(response) {
    this.response = response;
    
    if (!(response instanceof ServerResponse)) {
      throw new Error('Invalid server response type');
    }
  }
  handle(error, callback) {
    const isCustomError = error instanceof CustomError;
    if (isCustomError && !error.isServerError()) {
      return this.response.status(error.code).json({ error: error.message });
    }
    if (callback && typeof callback === 'function') {
      callback(error.message);
    } else {
      // asynchronously write to file.
    }
    return this.response.status(500).json({ error: 'Internal Server Error.' });
  }
  writeErrorMessageToFile() {
    // Write error to file in root directory
  }
}
