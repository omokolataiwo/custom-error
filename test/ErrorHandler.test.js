import chai from 'chai';
import ErrorHandler from '../src/ErrorHandler';
import { CustomError } from '../src/CustomError';
import ServerResponseStub from './stud/ServerResponse';

const assert = chai.assert;
const errorHandler = new ErrorHandler(new ServerResponseStub());
let callbackEffect = '';

describe('Test Error Handler', () => {
  it('should return user generated error to the user', () => {
    const response = errorHandler.handle(
      new CustomError(404, 'Resource not found.')
    );
    assert.deepEqual(response,
      { code: 404, response: { error: 'Resource not found.' } });
  });
  it('should use callback for server errors', () => {
    const callback = () => {
      callbackEffect = 'Ignore me';
    }
    const response = errorHandler.handle(new CustomError(501, 'Password mismatch'), callback);
    assert.equal(callbackEffect, 'Ignore me');
    assert.deepEqual(response, {code: 500, response: {error: 'Internal Server Error.'}});
  })
  it.skip('should write to file if callback is not provided', () => {

  })
});
