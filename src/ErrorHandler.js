import { ServerResponse } from 'http';
import { CustomError } from './CustomError';

export default class ErrorHandler {
  constructor(response) {
    this.response = response;
    
    if (!(response instanceof ServerResponse)) {
      throw new Error('Invalid server response type');
    }
  }
  handle(error, writeToFile=true) {
    if (error instanceof CustomError && !error.isServerError()) {
      return this.response.status(error.code).json({ error: error.message });
    }
    writeToFile && this.writeErrorMessageToFile();
    return this.response.status(500).json({ error: 'Internal Server Error.' });
  }
  writeErrorMessageToFile() {
    // Write error to file in root directory
  }
}
