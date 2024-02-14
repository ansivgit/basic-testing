import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  return {
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const endPoint = '/users';
  let getMocked: jest.Mock, createMocked: jest.Mock;

  beforeEach(() => {
    getMocked = jest.fn(() => Promise.resolve({ data: ['users'] }));
    createMocked = jest.fn().mockReturnValue({
      get: getMocked,
    });
    axios.create = createMocked;
    axios.get = getMocked;
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(endPoint);
    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(endPoint);
    expect(axios.get).toHaveBeenCalledWith(endPoint);
  });

  test('should return response data', async () => {
    const res = await throttledGetDataFromApi(endPoint);
    expect(res).toEqual(['users']);
  });
});
