export class CustomError extends Error {
  constructor(code = 500, customMessage, ...args) {
    super(args);
  
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.message = customMessage;
    this.code = code;
    this.date = new Date();
    // Do not expose the main cause of server to the user for security reasons
    if (code === 500) {
      this.cause = this.message;
      this.message = 'Internal Server Error';
    }
  }
}

export const handle = (error, res) => {
  if (error instanceof CustomError) {
    return res.status(error.code).json({ error: error.message });
  }
  return res.status(500).json({ error: 'Internal Server Error.' });
};
