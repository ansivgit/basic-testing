// Uncomment the code below and write your tests
import { throwError, resolveValue } from './index';
// import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const data = await resolveValue(125);
    expect(data).toBe(125);
  });

  test('should resolve provided value', async () => {
    const data = await resolveValue('someStr');
    expect(data).toBe('someStr');
  });

  test('should resolve provided value', async () => {
    const data = await resolveValue(null);
    expect(data).toBeNull();
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(throwError('msg')).toThrow('msg');
  });

  test('should throw error with message if message is not provided', () => {
    expect(throwError()).toThrow('Oops!');
  });
});
