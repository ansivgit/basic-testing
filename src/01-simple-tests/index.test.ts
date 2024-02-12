// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const simpleNumbers = { a: 9, b: 3, action: '' };

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ ...simpleNumbers, action: Action.Add });
    expect(result).toBe(12);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({
      ...simpleNumbers,
      action: Action.Subtract,
    });
    expect(result).toBe(6);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({
      ...simpleNumbers,
      action: Action.Multiply,
    });
    expect(result).toBe(27);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({
      ...simpleNumbers,
      action: Action.Divide,
    });
    expect(result).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      ...simpleNumbers,
      action: Action.Exponentiate,
    });
    expect(result).toBe(729);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ ...simpleNumbers, action: '%%' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: true, b: '55', action: Action.Add });
    expect(result).toBeNull();
  });
});
