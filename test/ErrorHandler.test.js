import chai from 'chai';
import ErrorHandler from '../src/ErrorHandler';
import {CustomError} from '../src/CustomError';
import ServerResponseStub from './stud/ServerResponse';

const assert = chai.assert;

describe('Test Error Handler', () => {
  it('should return user generated error to the user', () => {
    const instance = new ServerResponseStub();
    const errorHandler = new ErrorHandler(instance);
    errorHandler.handle(new CustomError(404, 'Resource not found.'));
  });
});
