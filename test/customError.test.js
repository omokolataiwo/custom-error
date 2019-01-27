import chai from 'chai';
import { CustomError } from '../src/CustomError';

const assert = chai.assert;

describe('CustomError', () => {
  it('must be instance of Error', () => {
    const instance = new CustomError();
    assert.isTrue(instance instanceof Error);
  });
  it('must have a default code of 500', () => {
    const instance = new CustomError();
    assert.equal(instance.code, 500);
  });
  it('can not have error code within the range of 200', () => {
    assert.throws(() => new CustomError(201, 'Successful response code'), 'Invalid error code provided.');
  });
  it('must have error message', () => {
    assert.throws(() => new CustomError(400), 'Error message not provided.');
  });
  it('must have a default error message for error code within 500', () => {
    const instance = new CustomError();
    assert.equal(instance.message, 'Internal Server Error.');
  });
  it('must not allow invalid error code', () => {
    assert.throws(() => new CustomError(20, 'Fake error code'), 'Invalid error code provided.');
  });
});
