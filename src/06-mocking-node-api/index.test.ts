import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    const delay = 1000;
    const timer = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(cb, delay);

    expect(timer).toHaveBeenCalledTimes(1);
    expect(timer).toHaveBeenLastCalledWith(cb, delay);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    const delay = 1000;
    doStuffByTimeout(cb, delay);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(delay * 3);

    expect(cb).toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    const delay = 1000;
    const interval = jest.spyOn(global, 'setInterval');

    doStuffByInterval(cb, delay);

    expect(interval).toHaveBeenCalledTimes(1);
    expect(interval).toHaveBeenLastCalledWith(cb, delay);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    const delay = 1000;
    doStuffByInterval(cb, delay);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(delay * 5);

    expect(cb).toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  jest.mock('fs');
  jest.mock('fs/promises');
  jest.mock('path');
  const file = 'some-file.js';

  path.join = jest.fn();
  fs.existsSync = jest.fn();

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(file);
    expect(path.join).toBeCalledWith(__dirname, file);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(await readFileAsynchronously(file)).toBeFalsy();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue('text-text');

    expect(await readFileAsynchronously(file)).toBe('text-text');
  });
});
